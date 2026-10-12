import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Re-export the October 12 native captures without cropping or retouching.
const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/export-phase-media.mjs <capture-directory>");
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const records = [];
for (const game of ["breaker", "shift", "court"]) {
  const filename = `phase_${game}_gameplay_1920x1080.png`;
  const input = await readFile(path.join(source, filename));
  const metadata = await sharp(input).metadata();
  if (metadata.width !== 1920 || metadata.height !== 1080) {
    throw new Error(`Unexpected capture dimensions: ${filename}`);
  }
  const outputs = [
    [`public/images/projects/phase-${game}-2026-10-12.webp`, await sharp(input).webp({ quality: 88, effort: 6 }).toBuffer()],
    [`public/images/social/phase-${game}-2026-10-12.jpg`, await sharp(input).resize(1200, 630, { fit: "contain", background: "#05090d" }).jpeg({ quality: 90, mozjpeg: true }).toBuffer()],
  ];
  if (game === "breaker") outputs.push(["public/images/social/phase-arcade-2026-10-12.jpg", outputs[1][1]]);
  const exported = [];
  for (const [file, bytes] of outputs) {
    await writeFile(file, bytes);
    const { width, height } = await sharp(bytes).metadata();
    exported.push({ file, width, height, bytes: bytes.length, sha256: hash(bytes) });
  }
  records.push({ source: filename, sourceSha256: hash(input), outputs: exported });
}
await writeFile("docs/phase-media-2026-10-12.json", JSON.stringify(records, null, 2) + "\n");
console.log(JSON.stringify(records, null, 2));
