import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const out = join(root, "out");

function fail(message) {
  throw new Error(message);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const child = join(directory, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
}

const requiredPages = [
  "index.html",
  "services.html",
  "about.html",
  "about/founder.html",
  "contact.html",
  "press.html",
  "privacy.html",
  "terms.html",
  "accessibility.html",
  "security.html",
  "404.html",
];

for (const page of requiredPages) {
  if (!existsSync(join(out, page))) {
    fail(`Missing commercial-review page: ${page}`);
  }
}

const services = readFileSync(join(out, "services.html"), "utf8");
for (const discipline of [
  "Premium Websites",
  "Custom Software",
  "Desktop Applications",
  "Data Visualization",
]) {
  if (!services.includes(discipline)) {
    fail(`Services page is missing discipline: ${discipline}`);
  }
}
for (const boundary of [
  "written scope",
  "Regulated medical, legal, or financial systems",
  "always-on cloud infrastructure",
  "scoped separately",
]) {
  if (!services.includes(boundary)) {
    fail(`Services page is missing boundary language: ${boundary}`);
  }
}

const contact = readFileSync(join(out, "contact.html"), "utf8");
for (const contactRequirement of [
  "mailto:reedcreativelabs@gmail.com",
  "reedcreativelabs@gmail.com",
  "Direct contact without an on-site form",
]) {
  if (!contact.includes(contactRequirement)) {
    fail(`Contact page is missing: ${contactRequirement}`);
  }
}
if (/<form[\s>]/i.test(contact)) {
  fail("Contact page unexpectedly contains an on-site form");
}

const htmlFiles = walk(out).filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const route = relative(out, file);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) {
    fail(`${route} contains ${h1Count} h1 elements`);
  }
  if (!html.includes('href="#main-content"')) {
    fail(`${route} is missing the skip-to-content link`);
  }
  if (!/<main[^>]+id="main-content"/i.test(html)) {
    fail(`${route} is missing the main-content target`);
  }
  if (/href=(?:""|'')/i.test(html) || html.includes('href="#"')) {
    fail(`${route} contains an empty or placeholder link`);
  }
}

const publicBundle = walk(out)
  .filter((file) => /\.(?:html|css|js|json|xml|txt)$/i.test(file))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

for (const prohibitedReference of [
  "phase-arcade-card.jpg",
  "rcl-hero-cinematic.jpg",
  "rcl-technical-orb.jpg",
  "red-atmosphere.jpg",
  "red-floor-glow.jpg",
  "red-grid-tech.jpg",
  "misread-card.jpg",
  "talk-to-me-card.jpg",
  "phase-breaker-coming-soon.jpg",
]) {
  if (publicBundle.includes(prohibitedReference)) {
    fail(`Public bundle references prohibited legacy media: ${prohibitedReference}`);
  }
}

for (const unverifiedProfile of [
  "linkedin.com/",
  "facebook.com/",
  "instagram.com/",
  "x.com/",
  "twitter.com/",
]) {
  if (publicBundle.includes(unverifiedProfile)) {
    fail(`Public bundle contains an unverified social profile: ${unverifiedProfile}`);
  }
}

for (const placeholder of ["lorem ipsum", "example.com", "TODO:", "FIXME:"]) {
  if (publicBundle.toLowerCase().includes(placeholder.toLowerCase())) {
    fail(`Public bundle contains placeholder text: ${placeholder}`);
  }
}

console.log(
  `Commercial checks passed across ${htmlFiles.length} generated pages.`,
);
