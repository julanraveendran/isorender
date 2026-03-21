// Node.js wrapper for image generation via the Python SDK
// Uses a subprocess call to the Python generate_image.py script

import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);

export async function generate_image(prompt, options = {}) {
  const { aspect_ratio = "4:3", image_bytes = null } = options;

  // Write a temp Python script that uses the SDK
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const tempScript = path.join(scriptDir, "_gen_temp.py");
  const outputPath = path.join(scriptDir, `_gen_output_${Date.now()}.png`);

  let inputImageArg = "";
  let inputImagePath = "";
  if (image_bytes) {
    inputImagePath = path.join(scriptDir, `_gen_input_${Date.now()}.png`);
    fs.writeFileSync(inputImagePath, image_bytes);
    inputImageArg = `"${inputImagePath}"`;
  }

  const script = `
import asyncio
import sys
import base64

sys.path.insert(0, "${scriptDir.replace(/\\/g, "/")}")
from generate_image import generate_image

async def main():
    prompt = """${prompt.replace(/"/g, '\\"').replace(/\n/g, "\\n")}"""
    image_bytes = None
    ${image_bytes ? `
    with open("${inputImagePath.replace(/\\/g, "/")}", "rb") as f:
        image_bytes = f.read()
    ` : ""}
    result = await generate_image(
        prompt,
        image_bytes=image_bytes,
        aspect_ratio="${aspect_ratio}",
    )
    with open("${outputPath.replace(/\\/g, "/")}", "wb") as f:
        f.write(result)

asyncio.run(main())
`;

  fs.writeFileSync(tempScript, script);

  try {
    await execFileAsync("python3", [tempScript], { timeout: 120000 });
    const result = fs.readFileSync(outputPath);
    return result;
  } finally {
    // Cleanup
    try { fs.unlinkSync(tempScript); } catch {}
    try { fs.unlinkSync(outputPath); } catch {}
    if (inputImagePath) {
      try { fs.unlinkSync(inputImagePath); } catch {}
    }
  }
}
