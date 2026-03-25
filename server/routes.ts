import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { Anthropic } from "@anthropic-ai/sdk";
import OpenAI from "openai";
import Stripe from "stripe";
import express from "express";
import axios from "axios";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const anthropic = new Anthropic(); // uses ANTHROPIC_API_KEY env var
const openai = new OpenAI(); // uses OPENAI_API_KEY env var

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { price: number; credits: number; name: string }> = {
  starter: { price: 700, credits: 10, name: "Starter" }, // £7 in pence
  professional: { price: 1900, credits: 50, name: "Professional" },
  agency: { price: 4900, credits: 150, name: "Agency" },
};

// Track free renders by IP (in-memory, resets on restart)
const freeRenderCount = new Map<string, number>();
const MAX_FREE_RENDERS = 3;

export function registerRoutes(server: Server, app: Express) {
  // --- Stripe webhook (needs raw body, registered before json parsing is fine
  //     because index.ts already captures rawBody via verify callback) ---
  app.post("/api/stripe/webhook", async (req, res) => {
    try {
      const sig = req.headers["stripe-signature"] as string;
      const rawBody = req.rawBody as Buffer;

      if (!sig || !rawBody) {
        return res.status(400).json({ error: "Missing signature or body" });
      }

      const event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email || session.metadata?.email;
        const planId = session.metadata?.planId;

        if (email && planId && PLANS[planId]) {
          const plan = PLANS[planId];
          const existing = storage.getUserByEmail(email);

          if (existing) {
            storage.updateUserCredits(email, existing.credits + plan.credits);
          } else {
            storage.createUser({
              email,
              credits: plan.credits,
              plan: planId,
              stripeCustomerId: session.customer as string | null,
              createdAt: new Date().toISOString(),
            });
          }
        }
      }

      res.json({ received: true });
    } catch (e: any) {
      console.error("Stripe webhook error:", e.message);
      res.status(400).json({ error: e.message });
    }
  });

  // --- Stripe create checkout session ---
  app.post("/api/stripe/create-checkout", async (req, res) => {
    try {
      const { planId, successUrl, cancelUrl } = z.object({
        planId: z.enum(["starter", "professional", "agency"]),
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
      }).parse(req.body);

      const plan = PLANS[planId];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{
          price_data: {
            currency: "gbp",
            product_data: {
              name: `IsoRender ${plan.name} - ${plan.credits} credits`,
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        }],
        metadata: { planId },
        customer_email: req.body.email || undefined,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      res.json({ url: session.url });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // --- User credits ---
  app.get("/api/user/credits", async (req, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.query);
      const user = storage.getUserByEmail(email);
      if (!user) {
        return res.json({ credits: 0 });
      }
      res.json({ credits: user.credits, plan: user.plan });
    } catch (e: any) {
      res.status(400).json({ error: e.message || "Invalid email" });
    }
  });

  // Waitlist signup
  app.post("/api/waitlist", async (req, res) => {
    try {
      const { email } = z.object({ email: z.string().email() }).parse(req.body);
      const existing = storage.getWaitlistEntry(email);
      if (existing) {
        return res.json({ success: true, message: "Already on the waitlist" });
      }
      storage.addToWaitlist({ email, createdAt: new Date().toISOString() });
      res.json({ success: true, message: "Added to waitlist" });
    } catch (e: any) {
      res.status(400).json({ error: e.message || "Invalid email" });
    }
  });

  // Upload floor plan and generate 3D render
  app.post("/api/render/upload", upload.single("floorplan"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Credit check
      const email = req.body.email as string | undefined;
      const clientIp = req.ip || req.socket.remoteAddress || "unknown";

      if (email) {
        const user = storage.getUserByEmail(email);
        if (!user || user.credits <= 0) {
          return res.status(402).json({ error: "No credits remaining. Please purchase a plan." });
        }
        storage.deductCredit(email);
      } else {
        // Free renders: allow MAX_FREE_RENDERS per IP
        const count = freeRenderCount.get(clientIp) || 0;
        if (count >= MAX_FREE_RENDERS) {
          return res.status(402).json({
            error: "You've used all 3 free renders. Purchase credits to continue generating stunning 3D renders.",
            freeRendersUsed: count,
            creditsRemaining: 0,
            requiresPayment: true,
          });
        }
        freeRenderCount.set(clientIp, count + 1);
      }

      const render = storage.createRender({
        sourceType: "upload",
        status: "analyzing",
        createdAt: new Date().toISOString(),
      });

      // Process in background
      processFloorPlan(render.id, req.file.buffer, req.file.mimetype).catch(console.error);

      res.json({ id: render.id, status: "analyzing" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Generate from Rightmove/Zoopla URL
  app.post("/api/render/url", async (req, res) => {
    try {
      const { url, email } = z.object({
        url: z.string().url(),
        email: z.string().email().optional(),
      }).parse(req.body);

      let sourceType = "upload";
      if (url.includes("rightmove.co.uk")) sourceType = "rightmove";
      else if (url.includes("zoopla.co.uk")) sourceType = "zoopla";
      else {
        return res.status(400).json({ error: "Please provide a Rightmove or Zoopla URL" });
      }

      // Credit check
      const clientIp = req.ip || req.socket.remoteAddress || "unknown";

      if (email) {
        const user = storage.getUserByEmail(email);
        if (!user || user.credits <= 0) {
          return res.status(402).json({ error: "No credits remaining. Please purchase a plan." });
        }
        storage.deductCredit(email);
      } else {
        const count = freeRenderCount.get(clientIp) || 0;
        if (count >= MAX_FREE_RENDERS) {
          return res.status(402).json({
            error: "You've used all 3 free renders. Purchase credits to continue generating stunning 3D renders.",
            freeRendersUsed: count,
            creditsRemaining: 0,
            requiresPayment: true,
          });
        }
        freeRenderCount.set(clientIp, count + 1);
      }

      const render = storage.createRender({
        sourceType,
        sourceUrl: url,
        status: "analyzing",
        createdAt: new Date().toISOString(),
      });

      // Process in background
      processFromUrl(render.id, url, sourceType).catch(console.error);

      res.json({ id: render.id, status: "analyzing" });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // Check render status
  app.get("/api/render/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const render = storage.getRender(id);
    if (!render) {
      return res.status(404).json({ error: "Render not found" });
    }
    res.json(render);
  });

  // Get recent renders
  app.get("/api/renders", async (_req, res) => {
    const renders = storage.getRecentRenders(20);
    res.json(renders);
  });
}

// --- Step 1: Analyze floor plan with Claude ---
async function analyzeFloorPlan(base64Image: string, mimeType: string): Promise<{
  analysis: Record<string, any>;
  description: string;
}> {
  const analysisPrompt = `You are an expert architectural floor plan analyst. Your task is to produce an EXTREMELY precise spatial analysis that will be used to generate a 3D isometric render. ACCURACY IS CRITICAL — every room must be in the correct position relative to every other room.

Analyze this floor plan and output valid JSON:

{
  "propertyName": "address/name if visible or null",
  "totalArea": { "sqm": number, "sqft": number },
  "numberOfFloors": number,
  "propertyType": "terraced/semi-detached/detached/flat/etc",
  "compass": "which direction is north (top/right/etc) or null",
  "floors": [
    {
      "name": "Ground Floor",
      "overallWidthM": number,
      "overallDepthM": number,
      "shape": "rectangular/L-shaped/T-shaped",
      "shapeDescription": "Describe the exact outline shape. E.g. 'Main rectangle 10m wide x 8m deep with a rear-left extension 4m wide x 3m deep'",
      "rooms": [
        {
          "name": "exact name from floor plan label",
          "widthM": number,
          "depthM": number,
          "widthFt": "imperial width",
          "depthFt": "imperial depth",
          "gridPosition": {
            "description": "PRECISE position within the floor. Use compass directions and fractions. E.g. 'occupies the entire front-left quadrant' or 'rear-center, behind the kitchen'",
            "xFromLeft": "percentage from left wall (0%=left edge, 100%=right edge) where room CENTER is",
            "yFromFront": "percentage from front wall (0%=front, 100%=rear) where room CENTER is",
            "widthPercent": "room width as percentage of total floor width",
            "depthPercent": "room depth as percentage of total floor depth"
          },
          "adjacentTo": ["list of rooms that share a wall with this room"],
          "doorConnections": ["room names this room has a door to"],
          "windowWalls": ["north", "south", "east", "west" — which walls have windows"],
          "features": ["bay window", "fireplace", etc]
        }
      ],
      "hallway": {
        "description": "Describe the hallway/corridor path. E.g. 'Runs front-to-back along the right side, from entrance to rear'",
        "position": "right-side / center / left-side / none"
      },
      "stairs": {
        "position": "where stairs are (e.g. 'center-right, between hallway and kitchen')",
        "direction": "up/down"
      },
      "walkthrough": "Write a precise walkthrough: 'Enter through the FRONT door into a hallway running along the RIGHT side. Immediately to the LEFT is the Reception Room (6.48m x 4.94m) which spans the full depth of the left portion. The hallway continues past the stairs on the RIGHT to the Kitchen at the REAR-CENTER...'"
    }
  ],
  "outdoor": {
    "frontGarden": { "exists": boolean, "widthM": number, "depthM": number, "description": "string" },
    "rearGarden": { "exists": boolean, "widthM": number, "depthM": number, "description": "string" }
  },
  "renderInstructions": "Write a VERY detailed paragraph describing exactly how to render this property as a 3D isometric cutaway. Describe the EXACT layout as if you're describing a miniature model from above at a 30-degree angle. Be obsessively precise about which rooms are next to which, their proportional sizes, and the overall shape. Mention every room by name, its exact position, and what it contains. This paragraph alone should be enough to recreate the floor plan accurately."
}

CRITICAL RULES:
1. Read EVERY label and dimension on the floor plan. Do not guess or approximate.
2. For gridPosition, think of the floor as a coordinate grid. Front=bottom of plan (where entrance is). Rear=top. Left and Right from the perspective of someone ENTERING the front door.
3. Room proportions matter! If the Reception Room is 6.48m wide and the Kitchen is 5.91m wide, note they are NEARLY the same width.
4. Note which rooms share walls (adjacentTo). This is critical for accurate placement.
5. The renderInstructions field is the most important — it must be detailed enough that an artist could draw the floor plan from it alone.
6. Include outdoor areas (gardens, driveways) with their exact dimensions.
7. Note the EXACT position of stairs, hallways, and corridors.

Output ONLY valid JSON.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 6000,
    messages: [{
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
            data: base64Image,
          },
        },
        { type: "text", text: analysisPrompt },
      ],
    }],
  });

  const textContent = response.content.find(c => c.type === "text");
  const rawText = textContent?.text || "{}";

  // Extract JSON from response (handle potential markdown code blocks)
  let jsonStr = rawText;
  const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  let analysis: Record<string, any>;
  try {
    analysis = JSON.parse(jsonStr);
  } catch {
    console.error("Failed to parse Claude analysis JSON, using raw text");
    analysis = { rawAnalysis: rawText, detailedSpatialDescription: rawText };
  }

  const description = analysis.detailedSpatialDescription || rawText;

  return { analysis, description };
}

// --- Step 2: Build image generation prompt from analysis ---
function buildRenderPrompt(analysis: Record<string, any>): string {
  const floors = analysis.floors || [];
  const numFloors = analysis.numberOfFloors || floors.length || 1;
  const propertyType = analysis.propertyType || "residential property";

  // Build precise room layout description per floor
  let floorLayouts = "";
  for (const floor of floors) {
    floorLayouts += `\n\n### ${floor.name} (${floor.overallWidthM || "?"}m wide × ${floor.overallDepthM || "?"}m deep, ${floor.shape || "rectangular"}):`;
    floorLayouts += `\nShape: ${floor.shapeDescription || floor.shape || "rectangular"}`;
    if (floor.walkthrough) {
      floorLayouts += `\nLayout: ${floor.walkthrough}`;
    }
    for (const room of (floor.rooms || [])) {
      const gp = room.gridPosition || {};
      floorLayouts += `\n- ${room.name}: ${room.widthM || "?"}m × ${room.depthM || "?"}m (${room.widthFt || ""} × ${room.depthFt || ""}), positioned at ${gp.description || room.name}. Adjacent to: ${(room.adjacentTo || []).join(", ")}. ${(room.features || []).length > 0 ? "Features: " + room.features.join(", ") + "." : ""}`;
    }
    if (floor.stairs) {
      floorLayouts += `\n- Staircase at ${floor.stairs.position || "center"}, going ${floor.stairs.direction || "up"}`;
    }
  }

  // Outdoor areas
  let outdoorDesc = "";
  const outdoor = analysis.outdoor || {};
  if (outdoor.frontGarden?.exists) {
    outdoorDesc += `\nFront: ${outdoor.frontGarden.description || "garden"} (${outdoor.frontGarden.widthM || "?"}m × ${outdoor.frontGarden.depthM || "?"}m)`;
  }
  if (outdoor.rearGarden?.exists) {
    outdoorDesc += `\nRear: ${outdoor.rearGarden.description || "garden"} (${outdoor.rearGarden.widthM || "?"}m × ${outdoor.rearGarden.depthM || "?"}m)`;
  }

  // The render instructions from Claude's analysis (most important part)
  const renderInstr = analysis.renderInstructions || "";

  return `IMPORTANT: You are looking at a 2D floor plan image. Your task is to transform this EXACT floor plan into a photorealistic 3D isometric cutaway render. You MUST faithfully reproduce EVERY room shown in the floor plan — same rooms, same positions, same proportional sizes. Do NOT invent rooms or rearrange the layout.

This is a ${numFloors}-floor ${propertyType}.

${renderInstr}

EVERY ROOM ON EVERY FLOOR (you must include ALL of these):${floorLayouts}
${outdoorDesc ? `\nOUTDOOR AREAS (include these):${outdoorDesc}` : ""}

MANDATORY RULES:
1. EVERY room listed above MUST appear in the render at the correct position
2. Room sizes MUST be proportionally correct (a 5m room must look bigger than a 3m room)
3. Rooms sharing walls (adjacentTo) MUST be next to each other
4. ${numFloors > 1 ? `Show all ${numFloors} floors stacked vertically with slight separation between them, like an exploded architectural diagram. EACH floor must be visible with all its rooms.` : "Show the single floor with all rooms visible."}
5. The staircase MUST appear on each floor connecting them
6. Include appropriate furniture: beds in bedrooms, sofa in lounge, kitchen appliances in kitchen, sink in bathrooms, car in garage
7. Bathrooms/en-suites/shower rooms must show toilet, sink, and shower/bath fixtures
8. The garage (if present) should show a car or empty space with concrete floor

STYLE: Bird's-eye 30-degree isometric angle, miniature diorama/dollhouse aesthetic, warm hardwood floors, white walls, soft lighting, no text labels, professional architectural visualization quality.`;
}

// --- Resize image to reduce base64 size for API requests ---
async function resizeImageForApi(imageBuffer: Buffer, maxDim: number = 512): Promise<{ base64: string; mime: string }> {
  // Use sharp if available, otherwise just compress via re-encoding
  // For simplicity, we'll use a canvas-free approach: just return a smaller version
  // by converting to JPEG with lower quality
  try {
    const sharp = (await import('sharp')).default;
    const resized = await sharp(imageBuffer)
      .resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 60 })
      .toBuffer();
    return { base64: resized.toString('base64'), mime: 'image/jpeg' };
  } catch {
    // If sharp not available, return original but warn about size
    console.warn('sharp not available, using original image size');
    return { base64: imageBuffer.toString('base64'), mime: 'image/jpeg' };
  }
}

// --- Image generation with OpenAI GPT-Image-1 via Responses API ---
async function generateRenderImage(
  prompt: string,
  floorPlanBase64: string,
  mimeType: string,
  imageBuffer: Buffer
): Promise<string> {
  // Resize the floor plan image to reduce base64 size (avoids 422 errors)
  const resized = await resizeImageForApi(imageBuffer, 512);

  // Send BOTH the floor plan image (as visual reference) AND the detailed text prompt
  // This way the model can SEE the actual layout while following the precise instructions
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_image",
            image_url: `data:${resized.mime};base64,${resized.base64}`,
          },
          {
            type: "input_text",
            text: prompt,
          },
        ],
      },
    ],
    tools: [{ type: "image_generation", quality: "high", size: "1024x1024" }],
  } as any);

  // Extract the generated image from the response
  const imageOutput = (response as any).output.find(
    (o: any) => o.type === "image_generation_call"
  );

  if (!imageOutput || !imageOutput.result) {
    console.error("OpenAI response output:", JSON.stringify((response as any).output?.map((o: any) => ({ type: o.type, text: o.text?.substring(0, 300) }))));
    throw new Error("No image generated — check OpenAI API response");
  }

  return imageOutput.result; // base64 string
}

// --- Two-step render pipeline ---
async function processFloorPlan(renderId: number, imageBuffer: Buffer, mimeType: string) {
  try {
    const base64Image = imageBuffer.toString("base64");
    const floorPlanDataUrl = `data:${mimeType};base64,${base64Image}`;

    // Update with floor plan image immediately
    storage.updateRender(renderId, {
      floorPlanUrl: floorPlanDataUrl,
      status: "analyzing",
    });

    // Step 1: Analyze with Claude
    console.log(`Render ${renderId}: Step 1 - Analyzing floor plan with Claude...`);
    const { analysis, description } = await analyzeFloorPlan(base64Image, mimeType);

    // Store analysis in propertyDetails
    storage.updateRender(renderId, {
      propertyAddress: analysis.propertyName || null,
      propertyDetails: JSON.stringify(analysis),
      status: "rendering",
    });

    // Step 2: Generate image with OpenAI GPT-Image-1 (image-to-image)
    console.log(`Render ${renderId}: Step 2 - Generating isometric render with GPT-Image-1...`);
    const prompt = buildRenderPrompt(analysis);

    const renderBase64 = await generateRenderImage(prompt, base64Image, mimeType, imageBuffer);
    const renderDataUrl = `data:image/png;base64,${renderBase64}`;

    storage.updateRender(renderId, {
      renderUrl: renderDataUrl,
      floorPlanUrl: floorPlanDataUrl,
      status: "completed",
    });
    console.log(`Render ${renderId} completed successfully`);
  } catch (e: any) {
    console.error("Render failed:", e);
    storage.updateRender(renderId, { status: "failed" });
  }
}

async function processFromUrl(renderId: number, url: string, sourceType: string) {
  try {
    // Fetch floor plan from the property listing
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
    });
    const html = await response.text();

    let floorPlanUrl: string | null = null;

    if (sourceType === "rightmove") {
      // Method 1: Look for floorplan in JSON-LD or embedded JSON data
      const jsonMatches = html.match(/"floorplans?"?\s*:\s*\[([^\]]+)\]/gi);
      if (jsonMatches) {
        for (const match of jsonMatches) {
          const urlMatch = match.match(/"(https?:\/\/[^"]*(?:floorplan|floor-plan)[^"]*\.(?:jpg|jpeg|png|gif|webp)[^"]*)"/i);
          if (urlMatch) { floorPlanUrl = urlMatch[1]; break; }
        }
      }

      // Method 2: Look for floor plan image URLs in any img tags or data attributes
      if (!floorPlanUrl) {
        const imgMatches = html.match(/https?:\/\/media\.rightmove\.co\.uk[^"'\s]*(?:floorplan|_FLP_)[^"'\s]*/gi);
        if (imgMatches && imgMatches.length > 0) { floorPlanUrl = imgMatches[0]; }
      }

      // Method 3: Look for any rightmove media URL with floor plan indicators
      if (!floorPlanUrl) {
        const mediaMatch = html.match(/https?:\/\/[^"'\s]*rightmove[^"'\s]*(?:floorplan|floor-plan|_FLP_)[^"'\s]*\.(jpg|jpeg|png|gif|webp)/gi);
        if (mediaMatch && mediaMatch.length > 0) { floorPlanUrl = mediaMatch[0]; }
      }

      // Method 4: Original pattern as last fallback
      if (!floorPlanUrl) {
        const match = html.match(/property-floorplan[^"]*\.jpeg/);
        if (match) { floorPlanUrl = `https://media.rightmove.co.uk/${match[0]}`; }
      }
    } else if (sourceType === "zoopla") {
      // Extract floor plan image URL from Zoopla
      const match = html.match(/lid\.zoocdn\.com\/u\/\d+\/\d+\/[a-f0-9]+\.jpg/);
      if (match) {
        floorPlanUrl = `https://${match[0]}`;
      }
    }

    if (!floorPlanUrl) {
      console.error(`Failed to extract floor plan from ${sourceType} URL: ${url}`);
      storage.updateRender(renderId, {
        status: "failed",
        propertyDetails: JSON.stringify({
          error: `Could not find a floor plan image on this ${sourceType} listing. The page may not contain a floor plan, or the listing format may have changed.`,
          sourceUrl: url,
        }),
      });
      return;
    }

    // Download the floor plan image
    const imgResponse = await fetch(floorPlanUrl);
    const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());

    // Update with the extracted floor plan
    storage.updateRender(renderId, {
      floorPlanUrl: floorPlanUrl,
      sourceUrl: url,
    });

    // Now process it through the two-step pipeline
    await processFloorPlan(renderId, imgBuffer, "image/jpeg");
  } catch (e: any) {
    console.error("URL processing failed:", e);
    storage.updateRender(renderId, {
      status: "failed",
      propertyDetails: JSON.stringify({
        error: `Failed to process the property listing: ${e.message}`,
        sourceUrl: url,
      }),
    });
  }
}

// ============================================
// Meshy AI Photo-to-3D Walkthrough Routes
// ============================================

const MESHY_API_KEY = process.env.MESHY_API_KEY;
const MESHY_API_URL = "https://api.meshy.ai/v2";

// In-memory task storage for 3D generation
const photo3DTasks = new Map<string, {
  id: string;
  status: string;
  imageUrl: string;
  prompt?: string;
  modelUrl?: string;
  error?: string;
  createdAt: string;
}>();

// POST /api/render/photo-to-3d - Submit image for 3D generation
app.post("/api/render/photo-to-3d", upload.single("image"), async (req, res) => {
  try {
    // Credit check
    const email = req.body.email as string | undefined;
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";

    let creditDeducted = false;

    if (email) {
      const user = storage.getUserByEmail(email);
      if (!user || user.credits <= 0) {
        return res.status(402).json({ error: "No credits remaining. Please purchase a plan." });
      }
      storage.deductCredit(email);
      creditDeducted = true;
    } else {
      // Free renders: allow MAX_FREE_RENDERS per IP
      const count = freeRenderCount.get(clientIp) || 0;
      if (count >= MAX_FREE_RENDERS) {
        return res.status(402).json({
          error: "You've used all 3 free renders. Purchase credits to continue.",
          freeRendersUsed: count,
          creditsRemaining: 0,
          requiresPayment: true,
        });
      }
      freeRenderCount.set(clientIp, count + 1);
      creditDeducted = true;
    }

    if (!req.file && !req.body.imageUrl) {
      return res.status(400).json({ error: "Image file or imageUrl required" });
    }

    // Upload image to get a URL (or use provided URL)
    let imageUrl = req.body.imageUrl as string;
    
    if (!imageUrl && req.file) {
      // For now, require external URL or handle file upload differently
      // In production, you'd upload to S3/Cloudflare R2 and get a public URL
      return res.status(400).json({ 
        error: "Please provide an imageUrl. File upload requires S3 integration.",
        note: "Upload your image to a cloud service and provide the public URL"
      });
    }

    const prompt = req.body.prompt || "A modern interior room with walls, floor, furniture, and realistic lighting";

    if (!MESHY_API_KEY) {
      return res.status(500).json({ error: "MESHY_API_KEY not configured" });
    }

    // Call Meshy AI API
    const response = await axios.post(
      `${MESHY_API_URL}/image-to-3d`,
      {
        image_url: imageUrl,
        enable_pbr: true,
        prompt: prompt
      },
      {
        headers: {
          "Authorization": `Bearer ${MESHY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const { result, task_id } = response.data;

    if (task_id) {
      const taskData = {
        id: task_id,
        status: result === "SUCCEEDED" ? "succeeded" : "processing",
        imageUrl,
        prompt,
        createdAt: new Date().toISOString()
      };
      photo3DTasks.set(task_id, taskData);

      // Create render record
      const render = storage.createRender({
        sourceType: "photo-to-3d",
        status: "processing",
        propertyDetails: JSON.stringify({ taskId: task_id, prompt }),
        createdAt: new Date().toISOString(),
      });

      return res.json({
        success: true,
        taskId: task_id,
        status: "processing",
        renderId: render.id,
        message: "3D walkthrough generation started"
      });
    }

    return res.status(500).json({ error: "Failed to start 3D generation" });

  } catch (error: any) {
    console.error("Meshy API error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to start 3D generation",
      details: error.response?.data?.message || error.message
    });
  }
});

// GET /api/render/photo-to-3d/:taskId - Check generation status
app.get("/api/render/photo-to-3d/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const cachedTask = photo3DTasks.get(taskId);

    if (!cachedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (!MESHY_API_KEY) {
      return res.status(500).json({ error: "MESHY_API_KEY not configured" });
    }

    // Check Meshy API for status
    const response = await axios.get(
      `${MESHY_API_URL}/image-to-3d/${taskId}`,
      {
        headers: {
          "Authorization": `Bearer ${MESHY_API_KEY}`
        }
      }
    );

    const meshyStatus = response.data.status;
    const modelUrl = response.data.model_url;
    const error = response.data.error;

    // Update cached task
    const updatedTask = {
      ...cachedTask,
      status: meshyStatus === "SUCCEEDED" ? "succeeded" : 
              meshyStatus === "FAILED" ? "failed" : "processing",
      modelUrl: modelUrl || undefined,
      error: error || undefined
    };
    photo3DTasks.set(taskId, updatedTask);

    // Update render in storage
    const renders = storage.getRenders();
    const render = renders.find(r => 
      r.propertyDetails && 
      JSON.parse(r.propertyDetails).taskId === taskId
    );
    
    if (render) {
      storage.updateRender(render.id, {
        status: meshyStatus === "SUCCEEDED" ? "completed" : 
                meshyStatus === "FAILED" ? "failed" : "processing",
        renderUrl: modelUrl || undefined
      });
    }

    return res.json({
      taskId,
      status: meshyStatus,
      modelUrl: modelUrl || null,
      error: error || null,
      progress: response.data.progress || null
    });

  } catch (error: any) {
    console.error("Status check error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to check task status",
      details: error.response?.data?.message || error.message
    });
  }
});
