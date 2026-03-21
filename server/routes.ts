import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import multer from "multer";
// Image generation handled via generate_image_node.js -> Python SDK
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
    const base64Image = imageBuffer.toString("base64");
    const floorPlanDataUrl = `data:${mimeType};base64,${base64Image}`;

    // Update immediately with floor plan so user sees it
    storage.updateRender(renderId, {
      floorPlanUrl: floorPlanDataUrl,
      status: "processing",
    });

    // Generate the isometric 3D render using image-to-image
    const { generate_image } = await import("../generate_image_node.js");

    const prompt = `Transform this 2D architectural floor plan into a stunning photorealistic top-down isometric 3D cutaway render. Create a beautiful miniature architectural maquette/diorama viewed from a bird's eye 30-degree isometric angle.

Requirements:
- Accurately recreate the exact room layout, walls, doors, and windows shown in the floor plan
- Remove all text labels and measurements from the image
- Add realistic, tasteful modern furniture in every room (beds, sofas, dining tables, kitchen appliances, bathroom fixtures)
- Use photorealistic materials: warm hardwood floors, white/cream walls, marble countertops, plush rugs
- Include warm ambient lighting from windows, ceiling lights casting soft shadows
- Add small decorative details: plants, books, artwork, throw pillows, kitchen accessories
- Clean architectural visualization style with soft global illumination
- Miniature diorama/dollhouse aesthetic with crisp edges and subtle depth of field
- Professional quality, high resolution, polished output
- If multiple floors shown, render them stacked or side by side in the same isometric view`;

    const renderImageBytes = await generate_image(prompt, {
      aspect_ratio: "1:1",
      image_bytes: imageBuffer,
      image_media_type: mimeType,
    });
    const renderBase64 = Buffer.from(renderImageBytes).toString("base64");
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

    // Now process it like a regular upload
    await processFloorPlan(renderId, imgBuffer, "image/jpeg");
  } catch (e: any) {
    console.error("URL processing failed:", e);
    storage.updateRender(renderId, { status: "failed" });
  }
}
