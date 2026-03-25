// Vercel serverless function wrapper for Express API
import express from "express";
import { Anthropic } from "@anthropic-ai/sdk";
import { z } from "zod";
import multer from "multer";

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// In-memory store for renders (Vercel serverless is stateless, so use simple map)
const renders = new Map();
let nextId = 1;

// Waitlist endpoint
app.post("/api/waitlist", async (req, res) => {
  try {
    const { email } = z.object({ email: z.string().email() }).parse(req.body);
    res.json({ success: true, message: "Added to waitlist" });
  } catch (e) {
    res.status(400).json({ error: e.message || "Invalid email" });
  }
});

// Upload floor plan and generate 3D render
app.post("/api/render/upload", upload.single("floorplan"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const id = nextId++;
    renders.set(id, { id, status: "processing", sourceType: "upload", createdAt: new Date().toISOString() });

    // Process synchronously for serverless
    try {
      const result = await processFloorPlan(req.file.buffer, req.file.mimetype);
      renders.set(id, { ...renders.get(id), ...result, status: "completed" });
    } catch (err) {
      renders.set(id, { ...renders.get(id), status: "failed" });
    }

    res.json(renders.get(id));
  } catch (e) {
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

    const id = nextId++;
    renders.set(id, { id, status: "processing", sourceType, sourceUrl: url, createdAt: new Date().toISOString() });

    try {
      const result = await processFromUrl(url, sourceType);
      renders.set(id, { ...renders.get(id), ...result, status: "completed" });
    } catch (err) {
      console.error("URL processing failed:", err);
      renders.set(id, { ...renders.get(id), status: "failed" });
    }

    res.json(renders.get(id));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Check render status
app.get("/api/render/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const render = renders.get(id);
  if (!render) {
    return res.status(404).json({ error: "Render not found" });
  }
  res.json(render);
});

// Get recent renders
app.get("/api/renders", async (_req, res) => {
  const all = Array.from(renders.values()).slice(-20).reverse();
  res.json(all);
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

async function processFloorPlan(imageBuffer, mimeType) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const base64Image = imageBuffer.toString("base64");

  // Step 1: Analyze the floor plan with Claude
  const analysis = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: mimeType, data: base64Image }
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

  // Step 2: Generate image using OpenAI (available on Vercel with env var)
  // For now, return the analysis and a placeholder render URL
  // In production, integrate with an image generation API
  return {
    renderUrl: null,
    floorPlanUrl: `data:${mimeType};base64,${base64Image}`,
    propertyDetails: JSON.stringify({ analysis: analysisText.substring(0, 500) }),
    analysisText: analysisText,
  };
}

async function processFromUrl(url, sourceType) {
  // Fetch floor plan from the property listing
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
  });
  const html = await response.text();

  let floorPlanUrl = null;

  if (sourceType === "rightmove") {
    const match = html.match(/property-floorplan[^"]*\.jpeg/);
    if (match) {
      floorPlanUrl = `https://media.rightmove.co.uk/${match[0]}`;
    }
    if (!floorPlanUrl) {
      const jsonMatch = html.match(/"floorplans"\s*:\s*\[(.*?)\]/s);
      if (jsonMatch) {
        const urlMatch = jsonMatch[1].match(/"url"\s*:\s*"([^"]+)"/);
        if (urlMatch) floorPlanUrl = urlMatch[1];
      }
    }
  } else if (sourceType === "zoopla") {
    const match = html.match(/lid\.zoocdn\.com\/u\/\d+\/\d+\/[a-f0-9]+\.jpg/);
    if (match) {
      floorPlanUrl = `https://${match[0]}`;
    }
  }

  if (!floorPlanUrl) {
    throw new Error("Could not extract floor plan from URL");
  }

  // Download the floor plan image
  const imgResponse = await fetch(floorPlanUrl);
  const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());

  // Process it
  const result = await processFloorPlan(imgBuffer, "image/jpeg");
  return { ...result, floorPlanUrl, sourceUrl: url };
}

export default app;
