import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  featuredProjects,
  getProject,
  projects,
} from "../content/projects.ts";

const root = process.cwd();
const out = join(root, "out");

function fail(message) {
  throw new Error(message);
}

function routeFile(pathname) {
  if (pathname === "/") return join(out, "index.html");
  return join(out, `${pathname.replace(/^\//, "")}.html`);
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const retiredProducts = [
  { name: ["RCL", "Workspace"].join(" "), slug: ["rcl", "workspace"].join("-") },
  { name: ["Ec", "ho"].join(""), slug: ["ec", "ho"].join("") },
];
const retiredIncludedGame = ["Phase", "Defense"].join(" ");

for (const retired of retiredProducts) {
  if (
    projects.some(
      (project) =>
        project.name === retired.name ||
        project.slug === retired.slug ||
        project.route.includes(retired.slug),
    )
  ) {
    fail(`${retired.name} remains in the public project model`);
  }
}

const expectedFeatured = ["forge", "phase-arcade-volume-1", "rcl-science-lab"];
if (featuredProjects.map((project) => project.slug).join(",") !== expectedFeatured.join(",")) {
  fail("Featured hierarchy must be Forge, Phase Arcade Volume I, then RCL Science Lab");
}

const forge = getProject("forge");
if (!forge || forge.status !== "active-development" || forge.roadmapGroup !== "active-development") {
  fail("Forge must exist as Active Development");
}

const phaseArcade = getProject("phase-arcade-volume-1");
if (!phaseArcade) fail("Phase Arcade Volume I is missing");
if (phaseArcade.includedGames?.join(",") !== "phase-shift,phase-breaker,phase-court") {
  fail("Phase Arcade Volume I must contain Phase Shift, Phase Breaker, and Phase Court in order");
}
if (phaseArcade.includedGames.length !== 3) {
  fail("Phase Arcade Volume I must contain exactly three games");
}
if (!phaseArcade.platforms.includes("PC") || !phaseArcade.platforms.includes("VR")) {
  fail("Phase Arcade Volume I must expose PC and VR support");
}

for (const slug of ["phase-arcade-volume-2", "pigs-can-fly"]) {
  const project = getProject(slug);
  if (!project || project.status !== "active-development" || project.roadmapGroup !== "active-development") {
    fail(`${slug} must exist as Active Development`);
  }
  if (project.category !== "game" && project.category !== "game-collection") {
    fail(`${project.name} must remain in the games catalog`);
  }
}

if (getProject("pigs-can-fly")?.name !== "Pigs Can Fly?") {
  fail("Pigs Can Fly? must preserve its question mark");
}
if (projects.some((project) => project.name === retiredIncludedGame)) {
  fail(`${retiredIncludedGame} remains in the public project model`);
}

const vercelConfig = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
const requiredRedirects = new Map([
  ["/projects/rcl-workspace", "/projects"],
  ["/projects/echo", "/projects"],
  ["/projects/phase-defense", "/projects"],
  ["/privacy-policy", "/privacy"],
]);

for (const [source, destination] of requiredRedirects) {
  const redirect = vercelConfig.redirects?.find(
    (entry) => entry.source === source && entry.destination === destination,
  );
  if (!redirect?.permanent) {
    fail(`Missing permanent redirect: ${source} -> ${destination}`);
  }
}

for (const file of [
  "public/images/projects/rcl-workspace-start-screen.jpg",
  "public/images/projects/rcl-workspace-dashboard.jpg",
  "public/images/projects/rcl-workspace-dashboard-v2.jpg",
  "public/images/projects/echo-start-screen.jpg",
  "public/images/projects/echo-editor-screen.jpg",
  "public/images/projects/phase-defense-gameplay-card.jpg",
  "public/images/home/echo-card.jpg",
]) {
  if (existsSync(join(root, file))) fail(`Retired public asset remains: ${file}`);
}

for (const file of [
  "public/images/social/forge.jpg",
  "public/images/social/phase-arcade-volume-1.jpg",
  "public/images/social/rcl-science-lab.jpg",
  "public/images/social/phase-shift.jpg",
  "public/images/social/phase-breaker.jpg",
  "public/images/social/phase-court.jpg",
  "public/images/social/phase-arcade-volume-2.jpg",
  "public/images/social/phase-breaker-coming-soon.jpg",
  "public/images/social/pigs-can-fly.jpg",
  "public/images/projects/phase-shift-gameplay-01.webp",
  "public/images/projects/phase-breaker-gameplay-01.webp",
  "public/images/projects/phase-court-gameplay-01.webp",
  "public/images/projects/rcl-science-lab-observatory.jpg",
  "public/images/projects/rcl-science-lab-protostar-formation.jpg",
  "public/images/projects/rcl-science-lab-catalog-browser.jpg",
]) {
  if (!existsSync(join(root, file))) fail(`Required portfolio asset is missing: ${file}`);
}

for (const file of [
  "public/images/projects/forge-engineering-thread.webp",
  "public/images/projects/pigs-can-fly-production-art.webp",
]) {
  if (existsSync(join(root, file))) fail(`Unfinished product preview remains public: ${file}`);
}

if (!existsSync(out)) {
  console.log(`Portfolio source checks passed: ${projects.length} products, ${featuredProjects.length} featured.`);
  process.exit(0);
}

const sitemapFile = join(out, "sitemap.xml");
if (!existsSync(sitemapFile)) fail("Missing sitemap.xml");
const sitemap = readFileSync(sitemapFile, "utf8");

if (!existsSync(join(out, "404.html"))) fail("Missing branded 404 output");

if (sitemap.includes("/privacy-policy")) {
  fail("The non-canonical privacy alias remains in the sitemap");
}
if (!sitemap.includes("https://reedcreativelabs.com/privacy")) {
  fail("The canonical privacy route is missing from the sitemap");
}

for (const project of projects) {
  const pageFile = routeFile(project.route);
  if (!existsSync(pageFile)) fail(`Missing product route output: ${project.route}`);
  if (!sitemap.includes(`https://reedcreativelabs.com${project.route}`)) {
    fail(`Sitemap is missing ${project.route}`);
  }

  const html = readFileSync(pageFile, "utf8");
  for (const required of [
    `>${project.name}<`,
    `https://reedcreativelabs.com${project.route}`,
    'rel="canonical"',
    'property="og:image"',
    'name="twitter:image"',
  ]) {
    if (!html.includes(required)) fail(`Missing ${required} in ${project.route}`);
  }

  const structuredDataScripts = [...html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )];
  if (structuredDataScripts.length === 0) {
    fail(`Missing JSON-LD in ${project.route}`);
  }
  for (const script of structuredDataScripts) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      fail(`Invalid JSON-LD in ${project.route}: ${error.message}`);
    }
  }
}

for (const retired of retiredProducts) {
  if (sitemap.includes(`/projects/${retired.slug}`)) {
    fail(`${retired.name} remains in the sitemap`);
  }
  if (existsSync(routeFile(`/projects/${retired.slug}`))) {
    fail(`${retired.name} route was still generated`);
  }
}

if (sitemap.includes("/projects/phase-defense")) {
  fail("The retired included-game route remains in the sitemap");
}

const publicHtml = walk(out)
  .filter((file) => file.endsWith(".html"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

for (const retired of [...retiredProducts.map((item) => item.name), retiredIncludedGame]) {
  if (publicHtml.includes(retired)) fail(`Retired public reference remains: ${retired}`);
}
if (publicHtml.includes('href="#"')) fail("Placeholder public link found");

const homepage = readFileSync(routeFile("/"), "utf8");
const positions = expectedFeatured.map((slug) => homepage.indexOf(`data-product-slug="${slug}"`));
if (positions.some((position) => position < 0)) fail("Homepage is missing a required featured product");
if (!(positions[0] < positions[1] && positions[1] < positions[2])) {
  fail("Homepage featured products are not in the required order");
}

const productsPage = readFileSync(routeFile("/projects"), "utf8");
for (const slug of expectedFeatured) {
  const occurrences = productsPage.match(new RegExp(`data-product-slug="${slug}"`, "g"))?.length ?? 0;
  if (occurrences !== 1) {
    fail(`Featured product ${slug} appears ${occurrences} times on the Products page`);
  }
}

const forgePage = readFileSync(routeFile("/projects/forge"), "utf8");
for (const required of [
  "Interface preview coming soon",
  "Dale",
  "Iris",
  "Victor",
  "Active Development",
]) {
  if (!forgePage.includes(required)) fail(`Forge page is missing ${required}`);
}
if (forgePage.includes("/images/projects/forge-")) {
  fail("Forge page must not expose unfinished product screenshots");
}

const phaseArcadePage = readFileSync(routeFile("/projects/phase-arcade-volume-1"), "utf8");
for (const required of [
  "Phase Shift",
  "Phase Breaker",
  "Phase Court",
  "Desktop + VR",
  "/images/projects/phase-shift-gameplay-01.webp",
  "/images/projects/phase-breaker-gameplay-01.webp",
  "/images/projects/phase-court-gameplay-01.webp",
]) {
  if (!phaseArcadePage.includes(required)) fail(`Phase Arcade page is missing ${required}`);
}

const scienceLabPage = readFileSync(routeFile("/projects/rcl-science-lab"), "utf8");
for (const screenshot of [
  "rcl-science-lab-observatory.jpg",
  "rcl-science-lab-protostar-formation.jpg",
  "rcl-science-lab-catalog-browser.jpg",
]) {
  if (!scienceLabPage.includes(screenshot)) {
    fail(`RCL Science Lab is missing approved screenshot ${screenshot}`);
  }
}

console.log(`Portfolio checks passed: ${projects.length} products, ${featuredProjects.length} featured.`);
