import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { Anthropic } from "@anthropic-ai/sdk";
import OpenAI from "openai";
import Stripe from "stripe";
import express from "express";

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
const freeRenderUsed = new Set<string>();

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
        // Free render: allow one per IP
        if (freeRenderUsed.has(clientIp)) {
          return res.status(402).json({ error: "Free render used. Please purchase credits to continue." });
        }
        freeRenderUsed.add(clientIp);
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
        if (freeRenderUsed.has(clientIp)) {
          return res.status(402).json({ error: "Free render used. Please purchase credits to continue." });
        }
        freeRenderUsed.add(clientIp);
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

  return `Create a photorealistic top-down isometric 3D architectural cutaway render of this exact floor plan. Bird's-eye view at 30-degree isometric angle, miniature architectural maquette/diorama style.

This is a ${numFloors}-floor ${propertyType}.
${renderInstr}

PRECISE ROOM LAYOUT:${floorLayouts}
${outdoorDesc ? `\nOUTDOOR AREAS:${outdoorDesc}` : ""}

CRITICAL ACCURACY REQUIREMENTS:
1. The room layout MUST match the floor plan exactly — same rooms, same positions, same proportional sizes
2. Rooms that are labeled as adjacent MUST share walls in the render
3. The overall floor shape MUST be correct (rectangular, L-shaped, etc.)
4. Larger rooms must appear proportionally larger than smaller rooms
5. Stairs must be in the correct position
6. Garden/outdoor areas must be in the correct position (front or rear)

STYLE:
- Remove all text labels and measurements
- Warm hardwood floors, white/cream walls, soft ambient lighting
- Appropriate furniture in each room (bed in bedroom, sofa in living room, dining table, kitchen appliances)
- Plants, artwork, decorative details for realism
- Soft shadows, clean architectural visualization
- Professional quality, crisp edges
- If multiple floors, show them stacked with slight vertical separation`;
}

// --- Image generation with OpenAI GPT-Image-1 via Responses API ---
async function generateRenderImage(
  prompt: string,
  floorPlanBase64: string,
  mimeType: string
): Promise<string> {
  // Use a chat model (gpt-4.1) with image_generation tool
  // Pass the floor plan as input_image reference for accurate rendering
  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_image",
            image_url: `data:${mimeType};base64,${floorPlanBase64}`,
          },
          {
            type: "input_text",
            text: prompt,
          },
        ],
      },
    ],
    tools: [{ type: "image_generation", quality: "medium", size: "1024x1024" }],
  } as any);

  // Extract the generated image from the response
  const imageOutput = (response as any).output.find(
    (o: any) => o.type === "image_generation_call"
  );

  if (!imageOutput || !imageOutput.result) {
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

    const renderBase64 = await generateRenderImage(prompt, base64Image, mimeType);
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
      // Extract floor plan image URL from Rightmove
      const match = html.match(/property-floorplan[^"]*\.jpeg/);
      if (match) {
        floorPlanUrl = `https://media.rightmove.co.uk/${match[0]}`;
      }
      // Fallback: look for floorplan in JSON data
      if (!floorPlanUrl) {
        const jsonMatch = html.match(/"floorplans"\s*:\s*\[(.*?)\]/s);
        if (jsonMatch) {
          const urlMatch = jsonMatch[1].match(/"url"\s*:\s*"([^"]+)"/);
          if (urlMatch) floorPlanUrl = urlMatch[1];
        }
      }
    } else if (sourceType === "zoopla") {
      // Extract floor plan image URL from Zoopla
      const match = html.match(/lid\.zoocdn\.com\/u\/\d+\/\d+\/[a-f0-9]+\.jpg/);
      if (match) {
        floorPlanUrl = `https://${match[0]}`;
      }
    }

    if (!floorPlanUrl) {
      storage.updateRender(renderId, { status: "failed" });
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
    storage.updateRender(renderId, { status: "failed" });
  }
}
