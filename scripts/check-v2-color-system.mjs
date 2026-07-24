import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sources = new Map(
  await Promise.all(
    [
      "app/globals.css",
      "app/layout.tsx",
      "components/ButtonLink.tsx",
      "components/CopyEmailButton.tsx",
      "components/HeroSystemField.tsx",
      "components/Logo.tsx",
      "components/SectionHeader.tsx",
      "lib/hero-flow/shaders.ts",
    ].map(async (relativePath) => [
      relativePath,
      await readFile(path.join(root, relativePath), "utf8"),
    ]),
  ),
);

const styles = sources.get("app/globals.css");
const buttons = sources.get("components/ButtonLink.tsx");
const fallback = sources.get("components/HeroSystemField.tsx");
const shaders = sources.get("lib/hero-flow/shaders.ts");
const fallbackAsset = await readFile(
  path.join(root, "public", "images", "home", "forgefield-eventide-static.webp"),
);

const forbiddenLegacyValues = [
  "#d2733b",
  "#ee9a52",
  "#b86434",
  "#e39a61",
  "#5f2b1a",
  "#7b572e",
  "#d9d3c7",
  "#f0ece3",
  "#9d9689",
  "#fffaf0",
  "#fff7e5",
  "210, 115, 59",
  "238, 154, 82",
  "95, 43, 26",
  "123, 87, 46",
  "burntCopper",
  "sepia(",
];

for (const [relativePath, source] of sources) {
  for (const forbidden of forbiddenLegacyValues) {
    if (source.toLowerCase().includes(forbidden.toLowerCase())) {
      throw new Error(
        `V2 color guard found rejected legacy value "${forbidden}" in ${relativePath}.`,
      );
    }
  }
}

for (const token of [
  "--color-graphite-950",
  "--color-graphite-900",
  "--color-graphite-850",
  "--color-graphite-800",
  "--color-graphite-700",
  "--color-bg-primary",
  "--color-bg-secondary",
  "--color-bg-elevated",
  "--color-surface-graphite",
  "--color-surface-raised",
  "--color-text-primary",
  "--color-text-secondary",
  "--color-text-muted",
  "--color-accent-gold",
  "--color-accent-gold-bright",
  "--color-accent-gold-dark",
  "--color-accent-copper",
  "--color-accent-copper-bright",
  "--color-accent-copper-dark",
  "--color-border-subtle",
  "--color-border-accent",
  "--color-focus",
  "--color-glow-gold",
  "--color-glow-copper",
]) {
  if (!styles.includes(`${token}:`)) {
    throw new Error(`V2 color guard is missing semantic token ${token}.`);
  }
}

if (buttons.includes("bg-rcl-copper")) {
  throw new Error("Primary controls must not use a copper surface fill.");
}

for (const requirement of [
  "var(--color-graphite-850)",
  "rgb(var(--color-accent-gold-rgb) / 0.13)",
  "focus-visible:outline-rcl-gold",
]) {
  if (!styles.includes(requirement) && !buttons.includes(requirement)) {
    throw new Error(`V2 control hierarchy is missing "${requirement}".`);
  }
}

if (!sources.get("app/layout.tsx").includes('themeColor: "#050607"')) {
  throw new Error("Browser theme color must use the Graphite 900 field.");
}

for (const requirement of [
  "vec3(0.0012, 0.0015, 0.0017)",
  "vec3 deepCopper = vec3(0.105, 0.012, 0.008)",
  "vec3 copper = vec3(0.68, 0.14, 0.025)",
  "vec3 moltenGold = vec3(1.02, 0.48, 0.10)",
  "vec3 ivory = vec3(1.12, 0.96, 0.74)",
  "vec3(1.0, 0.96, 0.84)",
]) {
  if (!shaders.includes(requirement)) {
    throw new Error(`Live hero palette is missing "${requirement}".`);
  }
}

if (!fallback.includes("/images/home/forgefield-eventide-static.webp")) {
  throw new Error("Fallback hero does not use the renderer-derived WebP.");
}
if (
  fallbackAsset.length < 10_000 ||
  fallbackAsset.toString("ascii", 0, 4) !== "RIFF" ||
  fallbackAsset.toString("ascii", 8, 12) !== "WEBP"
) {
  throw new Error("Renderer-derived fallback WebP is missing or invalid.");
}

function readHexToken(token) {
  const match = styles.match(
    new RegExp(`${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*(#[0-9a-fA-F]{6})`),
  );
  if (!match) {
    throw new Error(`Unable to read hex value for ${token}.`);
  }
  return match[1];
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return (
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  );
}

function contrast(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)
  );
}

const graphite = readHexToken("--color-graphite-900");
const contrastRequirements = [
  ["--color-text-primary", 7],
  ["--color-text-secondary", 7],
  ["--color-text-muted", 4.5],
  ["--color-accent-gold", 4.5],
  ["--color-accent-gold-bright", 7],
  ["--color-accent-copper-bright", 4.5],
];

for (const [token, minimum] of contrastRequirements) {
  const ratio = contrast(readHexToken(token), graphite);
  if (ratio < minimum) {
    throw new Error(
      `${token} contrast ${ratio.toFixed(2)}:1 is below ${minimum}:1 on Graphite 900.`,
    );
  }
}

console.log("V2 semantic color and contrast guards passed.");
