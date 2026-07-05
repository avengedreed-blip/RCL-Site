import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const source = process.argv[2];

if (!source) {
  throw new Error("Usage: node scripts/generate-logo-assets.mjs <source-logo.png>");
}

const root = process.cwd();
const siteBlack = "#050505";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function makeIco(entries) {
  const headerSize = 6;
  const entrySize = 16;
  const header = Buffer.alloc(headerSize + entries.length * entrySize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = header.length;
  const chunks = [header];

  entries.forEach((entry, index) => {
    const pos = headerSize + index * entrySize;
    header.writeUInt8(entry.width >= 256 ? 0 : entry.width, pos);
    header.writeUInt8(entry.height >= 256 ? 0 : entry.height, pos + 1);
    header.writeUInt8(0, pos + 2);
    header.writeUInt8(0, pos + 3);
    header.writeUInt16LE(1, pos + 4);
    header.writeUInt16LE(32, pos + 6);
    header.writeUInt32LE(entry.buffer.length, pos + 8);
    header.writeUInt32LE(offset, pos + 12);
    chunks.push(entry.buffer);
    offset += entry.buffer.length;
  });

  return Buffer.concat(chunks);
}

async function ensureDir(file) {
  mkdirSync(dirname(join(root, file)), { recursive: true });
}

async function readRgba(file) {
  const image = sharp(file).ensureAlpha();
  const metadata = await image.metadata();
  const buffer = await image.raw().toBuffer();
  return { buffer, width: metadata.width, height: metadata.height };
}

function findBounds({ buffer, width, height }, options = {}) {
  const {
    minY = 0,
    maxY = height,
    threshold = 96,
    padding = 34,
  } = options;
  let left = width;
  let top = height;
  let right = 0;
  let bottom = 0;

  for (let y = minY; y < maxY; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const r = buffer[index];
      const g = buffer[index + 1];
      const b = buffer[index + 2];
      const a = buffer[index + 3];
      if (a > 0 && Math.max(r, g, b) >= threshold) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (left > right || top > bottom) {
    throw new Error("Could not find visible logo bounds.");
  }

  return {
    left: clamp(left - padding, 0, width - 1),
    top: clamp(top - padding, 0, height - 1),
    width: clamp(right - left + padding * 2, 1, width),
    height: clamp(bottom - top + padding * 2, 1, height),
  };
}

async function transparentLogo(file, bounds) {
  const cropped = await sharp(file)
    .extract(bounds)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const data = cropped.data;
  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const alpha = data[i + 3];
    const logoAlpha = clamp(Math.round(((max - 42) / 100) * 255), 0, 255);
    data[i + 3] = Math.min(alpha, logoAlpha);
  }

  return sharp(data, {
    raw: {
      width: cropped.info.width,
      height: cropped.info.height,
      channels: 4,
    },
  });
}

async function writePng(file, image, width) {
  await ensureDir(file);
  await image
    .clone()
    .resize({ width, withoutEnlargement: true })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(join(root, file));
}

async function makeSquarePng(image, size, logoWidth) {
  const logo = await image
    .clone()
    .resize({ width: logoWidth, withoutEnlargement: true })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: siteBlack,
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function makeSocial(file, image) {
  const logo = await image
    .clone()
    .resize({ width: 960, withoutEnlargement: true })
    .png()
    .toBuffer();

  const background = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stop-color="#151619"/>
          <stop offset="58%" stop-color="#08090a"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#glow)"/>
    </svg>
  `);

  await sharp(background)
    .composite([{ input: logo, gravity: "center" }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(join(root, file));
}

const rgba = await readRgba(source);
const fullBounds = findBounds(rgba, { threshold: 92, padding: 46 });
const markBounds = findBounds(rgba, {
  maxY: Math.floor(rgba.height * 0.64),
  threshold: 92,
  padding: 44,
});

const fullLogo = await transparentLogo(source, fullBounds);
const markLogo = await transparentLogo(source, markBounds);

await writePng("public/images/rcl-logo-full.png", fullLogo, 1200);
await writePng("public/images/rcl-logo-mark.png", markLogo, 720);
await makeSocial("public/og-image.jpg", fullLogo);
await makeSocial("public/social-preview.jpg", fullLogo);

const favicon16 = await makeSquarePng(markLogo, 16, 15);
const favicon32 = await makeSquarePng(markLogo, 32, 29);
const favicon48 = await makeSquarePng(markLogo, 48, 43);
const apple = await makeSquarePng(markLogo, 180, 154);

writeFileSync(join(root, "public/favicon-16x16.png"), favicon16);
writeFileSync(join(root, "public/favicon-32x32.png"), favicon32);
writeFileSync(join(root, "public/apple-touch-icon.png"), apple);
writeFileSync(join(root, "public/favicon.ico"), makeIco([
  { width: 16, height: 16, buffer: favicon16 },
  { width: 32, height: 32, buffer: favicon32 },
  { width: 48, height: 48, buffer: favicon48 },
]));

console.log(JSON.stringify({
  source,
  fullBounds,
  markBounds,
}, null, 2));
