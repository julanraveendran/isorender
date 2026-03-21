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
  const analysisPrompt = `You are an expert architectural floor plan analyzer. Analyze this floor plan image in extreme detail and extract ALL information.

You MUST output valid JSON with the following structure:
{
  "propertyName": "name/address if visible, or null",
  "numberOfFloors": number,
  "totalFloorArea": { "sqm": number or null, "sqft": number or null },
  "propertyType": "detached/semi-detached/terraced/flat/bungalow/etc",
  "overallShape": "rectangular/L-shaped/T-shaped/U-shaped/irregular",
  "compassOrientation": "which side is north, if shown, or null",
  "floors": [
    {
      "name": "Ground Floor / First Floor / etc",
      "shape": "rectangular/L-shaped/etc",
      "rooms": [
        {
          "name": "room name exactly as labeled",
          "dimensions": { "metric": "3.5m x 4.2m", "imperial": "11'6\" x 13'9\"" },
          "position": "front-left/rear-center/etc relative to the floor",
          "relativePosition": "north of kitchen, east of hallway, etc",
          "features": ["bay window", "fireplace", "en-suite", "built-in wardrobe", etc],
          "doors": ["door to hallway on north wall", "door to garden on south wall"],
          "windows": ["window on east wall", "bay window on south wall"]
        }
      ],
      "spatialFlow": "Detailed description: You enter through the front door into the hallway. On your immediate left is the living room. Straight ahead the hallway leads to the kitchen at the rear...",
      "stairs": { "position": "where stairs are located", "direction": "going up to first floor / coming down from first floor" }
    }
  ],
  "entrancePosition": "front-center / side / rear",
  "garden": { "front": "description or null", "rear": "description or null", "side": "description or null" },
  "parking": "driveway/garage/none/etc",
  "specialFeatures": ["conservatory", "bay windows", "loft conversion", etc],
  "detailedSpatialDescription": "A comprehensive natural language description of the entire property layout, optimized for image generation. Describe the exact spatial relationships, flow between rooms, and positioning as if guiding someone through the property. Include every room, its size, what's adjacent to it, and the overall shape. This should be detailed enough that someone could recreate the floor plan from this description alone."
}

Instructions:
1. Read EVERY text label on the floor plan carefully
2. Note EVERY dimension shown (convert between metric and imperial if only one is shown)
3. Describe the EXACT spatial relationship between every room
4. Describe the shape of each floor (rectangular, L-shaped, etc.)
5. Note which side is north if a compass is shown
6. Describe the entrance position and the flow through the entire property
7. Be extremely precise about left/right/top/bottom positioning
8. Include ALL rooms, even small ones like cupboards, utility rooms, WCs

Output ONLY the JSON, no other text.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
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
  const overallShape = analysis.overallShape || "rectangular";

  let floorDescriptions = "";
  for (const floor of floors) {
    const roomDetails = (floor.rooms || []).map((room: any) => {
      const dims = room.dimensions?.metric || room.dimensions?.imperial || "";
      const pos = room.position || room.relativePosition || "";
      const features = (room.features || []).join(", ");
      let desc = `${room.name} (${dims})`;
      if (pos) desc += ` at ${pos}`;
      if (features) desc += ` with ${features}`;
      return desc;
    }).join(" → ");

    floorDescriptions += `\n${floor.name}: ${floor.shape || ""} layout. `;
    if (floor.spatialFlow) {
      floorDescriptions += floor.spatialFlow + " ";
    }
    floorDescriptions += `Rooms: ${roomDetails}. `;
    if (floor.stairs) {
      floorDescriptions += `Stairs: ${floor.stairs.position || ""} ${floor.stairs.direction || ""}. `;
    }
  }

  const entrance = analysis.entrancePosition ? `Entrance at ${analysis.entrancePosition}. ` : "";
  const garden = analysis.garden
    ? Object.entries(analysis.garden)
        .filter(([_, v]) => v)
        .map(([k, v]) => `${k} garden: ${v}`)
        .join(". ")
    : "";
  const special = (analysis.specialFeatures || []).join(", ");
  const spatialDesc = analysis.detailedSpatialDescription || "";

  return `Transform this 2D floor plan into a photorealistic isometric 3D cutaway render. This is a ${numFloors}-floor ${overallShape} ${propertyType}.

${entrance}${spatialDesc}

Floor-by-floor layout:${floorDescriptions}

${garden ? `Outdoor areas: ${garden}. ` : ""}${special ? `Special features: ${special}. ` : ""}

Requirements:
- Accurately recreate the EXACT room layout, walls, doors, and windows as described above
- Position every room precisely according to the spatial relationships described
- Remove all text labels and measurements
- Add realistic modern furniture appropriate to each room (beds in bedrooms, sofa in living room, dining table in dining room, kitchen appliances, bathroom fixtures)
- Use photorealistic materials: warm hardwood floors, white/cream walls, marble countertops, plush rugs
- Include warm ambient lighting from windows, ceiling lights casting soft shadows
- Add decorative details: plants, books, artwork, throw pillows, kitchen accessories
- Clean architectural visualization style with soft global illumination
- Miniature diorama/dollhouse aesthetic with crisp edges and subtle depth of field
- Bird's eye 30-degree isometric angle
- Professional quality, high resolution
- If multiple floors, render them stacked vertically with slight separation so interiors are visible`;
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
