import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { Anthropic } from "@anthropic-ai/sdk";
import { z } from "zod";
import fs from "fs";
import path from "path";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

export function registerRoutes(server: Server, app: Express) {
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

      const render = storage.createRender({
        sourceType: "upload",
        status: "processing",
        createdAt: new Date().toISOString(),
      });

      // Process in background
      processFloorPlan(render.id, req.file.buffer, req.file.mimetype).catch(console.error);

      res.json({ id: render.id, status: "processing" });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Generate from Rightmove/Zoopla URL
  app.post("/api/render/url", async (req, res) => {
    try {
      const { url } = z.object({ url: z.string().url() }).parse(req.body);

      let sourceType = "upload";
      if (url.includes("rightmove.co.uk")) sourceType = "rightmove";
      else if (url.includes("zoopla.co.uk")) sourceType = "zoopla";
      else {
        return res.status(400).json({ error: "Please provide a Rightmove or Zoopla URL" });
      }

      const render = storage.createRender({
        sourceType,
        sourceUrl: url,
        status: "processing",
        createdAt: new Date().toISOString(),
      });

      // Process in background
      processFromUrl(render.id, url, sourceType).catch(console.error);

      res.json({ id: render.id, status: "processing" });
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

async function processFloorPlan(renderId: number, imageBuffer: Buffer, mimeType: string) {
  try {
    const client = new Anthropic();
    const base64Image = imageBuffer.toString("base64");

    // Step 1: Analyze the floor plan with Claude
    const analysis = await client.messages.create({
      model: "claude_sonnet_4_6",
      max_tokens: 2000,
      messages: [{
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mimeType as any, data: base64Image }
          },
          {
            type: "text",
            text: `Analyze this floor plan image in detail. Extract:
1. Room layout (names, dimensions, positions)
2. Number of floors
3. Total area if shown
4. Key features (kitchen, bathrooms, bedrooms, etc.)
5. A detailed text description of the spatial layout suitable for generating a 3D isometric render.

Provide the description as a detailed prompt for generating a photorealistic isometric 3D cutaway visualization of this floor plan. Include specific furniture, materials, lighting, and color details for each room. Make it extremely detailed.`
          }
        ]
      }]
    });

    const analysisText = analysis.content[0].type === "text" ? analysis.content[0].text : "";

    // Step 2: Generate the isometric 3D render
    const { generate_image } = await import("../generate_image_node.js");
    const prompt = `Create a stunning photorealistic isometric 3D cutaway view of an apartment/house based on this floor plan description. Bird's eye view at a 30-degree isometric angle. Show all rooms with realistic furniture, hardwood/tile floors, white walls, warm lighting from windows. Include: ${analysisText.substring(0, 800)}. Style: architectural visualization, miniature diorama feel, soft shadows, warm color palette, high detail. No text or labels.`;

    const renderImageBytes = await generate_image(prompt, { aspect_ratio: "4:3" });
    const renderBase64 = Buffer.from(renderImageBytes).toString("base64");
    const renderDataUrl = `data:image/png;base64,${renderBase64}`;

    storage.updateRender(renderId, {
      renderUrl: renderDataUrl,
      floorPlanUrl: `data:${mimeType};base64,${base64Image}`,
      propertyDetails: JSON.stringify({ analysis: analysisText.substring(0, 500) }),
      status: "completed",
    });
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

    // Now process it like a regular upload
    await processFloorPlan(renderId, imgBuffer, "image/jpeg");
  } catch (e: any) {
    console.error("URL processing failed:", e);
    storage.updateRender(renderId, { status: "failed" });
  }
}
