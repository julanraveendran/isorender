// Node.js wrapper for image generation via the Python SDK
// Uses a subprocess call to the Python generate_image.py script

import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execFileAsync = promisify(execFile);
const scriptDir = path.resolve(".");

export async function generate_image(prompt, options = {}) {
  const {
    aspect_ratio = "1:1",
    image_bytes = null,
    image_media_type = "image/png",
  } = options;

  const timestamp = Date.now();
  const outputPath = path.join(scriptDir, `_gen_output_${timestamp}.png`);

  let inputImagePath = "";
  if (image_bytes) {
    inputImagePath = path.join(scriptDir, `_gen_input_${timestamp}.png`);
    fs.writeFileSync(inputImagePath, image_bytes);
  }

  // Escape prompt for Python string
  const escapedPrompt = prompt
    .replace(/\\/g, "\\\\")
    .replace(/"""/g, '\\"\\"\\"')
    .replace(/\n/g, "\\n");

  const script = `
import asyncio
import sys
import os

sys.path.insert(0, "${scriptDir.replace(/\\/g, "/")}")
from generate_image import generate_image

async def main():
    prompt = """${escapedPrompt}"""
    image_bytes = None
    image_media_type = "${image_media_type}"
    ${
      image_bytes
        ? `
    with open("${inputImagePath.replace(/\\/g, "/")}", "rb") as f:
        image_bytes = f.read()
    `
        : ""
    }
    result = await generate_image(
        prompt,
        image_bytes=image_bytes,
        ${image_bytes ? `image_media_type=image_media_type,` : ""}
        aspect_ratio="${aspect_ratio}",
    )
    with open("${outputPath.replace(/\\/g, "/")}", "wb") as f:
        f.write(result)
    print(f"Image generated: {len(result)} bytes")

asyncio.run(main())
`;

  const tempScript = path.join(scriptDir, `_gen_temp_${timestamp}.py`);
  fs.writeFileSync(tempScript, script);

  try {
    console.log(`Starting image generation (aspect: ${aspect_ratio}, has input image: ${!!image_bytes})...`);
    const { stdout, stderr } = await execFileAsync("python3", [tempScript], {
      timeout: 180000, // 3 minute timeout for image generation
      maxBuffer: 10 * 1024 * 1024,
    });
    if (stdout) console.log("Python stdout:", stdout.trim());
    if (stderr) console.log("Python stderr:", stderr.trim());

    if (!fs.existsSync(outputPath)) {
      throw new Error("Image generation failed - no output file produced");
    }
    const result = fs.readFileSync(outputPath);
    console.log(`Image generated successfully: ${result.length} bytes`);
    return result;
  } catch (err) {
    console.error("Image generation error:", err.message);
    if (err.stderr) console.error("Python stderr:", err.stderr);
    throw err;
  } finally {
    // Cleanup temp files
    try { fs.unlinkSync(tempScript); } catch {}
    try { fs.unlinkSync(outputPath); } catch {}
    if (inputImagePath) {
      try { fs.unlinkSync(inputImagePath); } catch {}
    }
  }
}
