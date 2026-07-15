import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "out");

function fail(message) {
  throw new Error(message);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const requiredRoutes = ["privacy", "terms", "accessibility", "security"];
const requiredFooterLinks = requiredRoutes.map((route) => `href="/${route}"`);

for (const route of requiredRoutes) {
  const file = join(out, `${route}.html`);
  if (!existsSync(file)) fail(`Missing trust route output: /${route}`);
  const html = readFileSync(file, "utf8");
  for (const required of [
    `https://reedcreativelabs.com/${route}`,
    'rel="canonical"',
    'property="og:image"',
    'name="twitter:image"',
  ]) {
    if (!html.includes(required)) fail(`Missing ${required} in /${route}`);
  }
}

const securityTxt = join(out, ".well-known", "security.txt");
if (!existsSync(securityTxt)) fail("Missing /.well-known/security.txt");
const securityText = readFileSync(securityTxt, "utf8");
for (const field of ["Contact:", "Expires:", "Canonical:", "Policy:"]) {
  if (!securityText.includes(field)) fail(`security.txt is missing ${field}`);
}
const expires = securityText.match(/^Expires:\s*(.+)$/m)?.[1];
if (!expires || Number.isNaN(Date.parse(expires)) || Date.parse(expires) <= Date.now()) {
  fail("security.txt has an invalid or expired Expires value");
}

const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
for (const route of requiredRoutes) {
  if (!sitemap.includes(`https://reedcreativelabs.com/${route}`)) {
    fail(`Sitemap is missing /${route}`);
  }
}
for (const internalDocument of ["LAUNCH_READINESS", "THIRD_PARTY_NOTICES"]) {
  if (sitemap.includes(internalDocument)) {
    fail(`Sitemap exposes internal document ${internalDocument}`);
  }
}

const htmlFiles = walk(out).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const link of requiredFooterLinks) {
    if (!html.includes(link)) fail(`${file} is missing footer link ${link}`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (
      reference.startsWith("#") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("tel:") ||
      reference.startsWith("data:") ||
      reference.startsWith("http://") ||
      reference.startsWith("https://") ||
      reference.startsWith("//")
    ) {
      continue;
    }

    const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!clean.startsWith("/")) continue;

    const relative = clean.replace(/^\/+/, "");
    const target =
      clean === "/"
        ? join(out, "index.html")
        : /\.[a-z0-9]+$/i.test(relative)
          ? join(out, relative)
          : join(out, `${relative.replace(/\/$/, "")}.html`);

    if (!existsSync(target)) {
      fail(`${file} references missing internal target ${reference}`);
    }
  }
}

const publicHtml = htmlFiles.map((file) => readFileSync(file, "utf8")).join("\n");
for (const prohibited of ["®", "registered trademark", "Registered Trademark"]) {
  if (publicHtml.includes(prohibited)) fail(`Unsupported trademark claim found: ${prohibited}`);
}

const privacy = readFileSync(join(out, "privacy.html"), "utf8");
for (const phrase of [
  "Effective:",
  "Vercel",
  "Cookies, storage, and analytics",
  "Children and families",
  "separately distributed products",
]) {
  if (!privacy.includes(phrase)) fail(`Privacy Policy is missing ${phrase}`);
}

const terms = readFileSync(join(out, "terms.html"), "utf8");
for (const phrase of [
  "Sending an inquiry does not create a client relationship",
  "Coming Soon",
  "RCL Science Lab is educational software",
  "does not currently offer direct checkout",
]) {
  if (!terms.includes(phrase)) fail(`Website Terms are missing ${phrase}`);
}

console.log(`Trust checks passed across ${htmlFiles.length} generated pages.`);
