import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { featuredProjects, getProject, projects } from "../content/projects.ts";
import {
  getProjectScreenshots,
  getProjectSocialImage,
} from "../lib/project-media.ts";
import { flagshipSectionDensity } from "../components/product-pages/flagship-section-density.ts";

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
  {
    name: ["RCL", "Workspace"].join(" "),
    slug: ["rcl", "workspace"].join("-"),
  },
  { name: ["Ec", "ho"].join(""), slug: ["ec", "ho"].join("") },
];
retiredProducts.push(
  { name: "Forge", slug: "forge" },
  { name: "Storm Lab", slug: "storm-lab" },
  { name: "RCL Science Lab", slug: "rcl-science-lab" },
);
const retiredIncludedGame = ["Phase", "Defense"].join(" ");
const allowedStatuses = new Set([
  "concept",
  "research",
  "prototype",
  "active-development",
  "launching-soon",
  "final-testing",
  "private-beta",
  "public-release",
  "production",
  "archived",
]);

for (const project of projects) {
  if (!allowedStatuses.has(project.status)) {
    fail(`${project.name} uses unsupported public status ${project.status}`);
  }
}

for (const retired of retiredProducts) {
  if (
    projects.some(
      (project) =>
        project.name === retired.name ||
        project.slug === retired.slug ||
        project.route === `/projects/${retired.slug}`,
    )
  ) {
    fail(`${retired.name} remains in the public project model`);
  }
}

const expectedFeatured = [
  "forgefield",
  "phase-arcade-volume-1",
  "project-load-bearing",
  "static-drift",
];

const expectedFlagshipDensity = {
  hero: "expansive",
  mission: "standard",
  status: "compact",
  "current-focus": "compact",
  roadmap: "standard",
  features: "compact",
  engineering: "compact",
  gallery: "expansive",
  "final-cta": "expansive",
};

if (
  JSON.stringify(flagshipSectionDensity) !==
  JSON.stringify(expectedFlagshipDensity)
) {
  fail(
    "Flagship section density hierarchy has drifted from the approved editorial rhythm",
  );
}

if (
  featuredProjects.map((project) => project.slug).join(",") !==
  expectedFeatured.join(",")
) {
  fail(
    "Featured hierarchy must be Forgefield, Phase Arcade Volume I, Project Load Bearing, then Static Drift",
  );
}

function technicalValues(project) {
  if (!project?.technicalProfile) return [];

  return Object.entries(project.technicalProfile)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([, value]) => value);
}

for (const slug of expectedFeatured) {
  const project = getProject(slug);
  const profile = project?.technicalProfile;

  if (!project || !profile) {
    fail(`${slug} is missing its centralized technical profile`);
  }
  if (!profile.summary.trim() || !profile.verifiedOn.trim()) {
    fail(`${slug} is missing its technical summary or verification date`);
  }
  if (profile.compactFields.length === 0) {
    fail(`${slug} has no compact technical fields for Home and Products`);
  }

  for (const [key, value] of Object.entries(profile)) {
    if (Array.isArray(value) && value.some((item) => !item.trim())) {
      fail(`${slug} has an empty value in technicalProfile.${key}`);
    }
  }
}

const technicalExpectations = new Map([
  ["project-load-bearing", ["Fortran", "C++", "Unreal Engine 5.8", "C ABI"]],
  [
    "forgefield",
    [
      "Fortran 2018",
      "C11",
      "C#",
      ".NET 10 / WPF",
      "OpenGL 4.6 Core",
      "GLSL",
      "OpenGL compute shaders",
    ],
  ],
  ["static-drift", ["C++20", "Kotlin", "OpenGL", "GLSL", "JNI", "Android TV"]],
  [
    "phase-arcade-volume-1",
    ["GDScript", "Godot 4.7", "Godot Forward+", "OpenXR", "Windows PC", "PCVR"],
  ],
]);

for (const [slug, expectedValues] of technicalExpectations) {
  const project = getProject(slug);
  const values = technicalValues(project);

  for (const expected of expectedValues) {
    if (!values.includes(expected)) {
      fail(`${slug} is missing verified technical value ${expected}`);
    }
  }
}

for (const prohibited of [
  ["phase-arcade-volume-1", "Fortran"],
  ["phase-arcade-volume-1", "Linux"],
  ["static-drift", "HDR"],
  ["project-load-bearing", "Dynamic collapse"],
]) {
  const [slug, value] = prohibited;
  if (technicalValues(getProject(slug)).includes(value)) {
    fail(
      `${slug} presents unverified or inactive technology as current: ${value}`,
    );
  }
}

const forgefield = getProject("forgefield");
if (
  !forgefield ||
  forgefield.status !== "launching-soon" ||
  forgefield.presentationTier !== "flagship" ||
  forgefield.showcaseMedia?.kind !== "approved-image" ||
  forgefield.showcaseMedia.src !==
    "/images/projects/forgefield-eventide-2026-09.webp"
) {
  fail(
    "Forgefield must lead with Launching Soon and current September native media",
  );
}
const expectedWorlds = [
  "eventide",
  "polar-night",
  "corona",
  "gravitas",
  "synapse",
  "ember",
];
const expectedCaptures = expectedWorlds.map(
  (world) => `/images/projects/forgefield-${world}-2026-09.webp`,
);
const captures = getProjectScreenshots("forgefield");
if (
  captures.map((image) => image.src).join(",") !== expectedCaptures.join(",")
) {
  fail("Forgefield must use only the selected September native captures");
}
for (const capture of captures) {
  if (!capture.alt || !capture.caption || capture.caption.length < 25) {
    fail(
      "Forgefield captures must describe the world shown, with meaningful alt text and captions",
    );
  }
}
for (const slug of ["project-load-bearing", "static-drift"]) {
  const project = getProject(slug);
  if (
    !project ||
    project.status !== "active-development" ||
    project.roadmapGroup !== "active-development"
  ) {
    fail(`${slug} must remain in development, not near-release`);
  }
  if (
    project.showcaseMedia?.kind !== "placeholder" ||
    getProjectScreenshots(project.visual).length
  ) {
    fail(`${slug} must not publish unapproved development media`);
  }
}
if (getProject("static-drift")?.name !== "Static Drift")
  fail("Static Drift canonical name changed");

const phaseArcade = getProject("phase-arcade-volume-1");
if (!phaseArcade) fail("Phase Arcade Volume I is missing");
if (phaseArcade.status !== "final-testing")
  fail("Phase Arcade must remain in Final Testing");
if (
  phaseArcade.showcaseMedia?.src !==
  "/images/projects/phase-breaker-gameplay-01.webp"
) {
  fail("Phase Arcade must retain its approved Phase Breaker showcase");
}
if (
  phaseArcade.includedGames?.join(",") !==
  "phase-shift,phase-breaker,phase-court"
) {
  fail(
    "Phase Arcade Volume I must contain Phase Shift, Phase Breaker, and Phase Court in order",
  );
}
if (phaseArcade.includedGames.length !== 3) {
  fail("Phase Arcade Volume I must contain exactly three games");
}
if (
  !phaseArcade.platforms.includes("PC") ||
  !phaseArcade.platforms.includes("VR")
) {
  fail("Phase Arcade Volume I must expose PC and VR support");
}

for (const slug of ["phase-arcade-volume-2", "pigs-can-fly"]) {
  const project = getProject(slug);
  if (
    !project ||
    project.status !== "active-development" ||
    project.roadmapGroup !== "active-development"
  ) {
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

const vercelConfig = JSON.parse(
  readFileSync(join(root, "vercel.json"), "utf8"),
);
const requiredRedirects = new Map([
  ["/projects", "/products"],
  ["/projects/", "/products"],
  ["/projects/rcl-workspace", "/products"],
  ["/projects/echo", "/products"],
  ["/projects/phase-defense", "/products"],
  ["/projects/forge", "/products"],
  ["/projects/storm-lab", "/products"],
  ["/projects/forgefield-tv", "/projects/static-drift"],
  ["/projects/static-drift-tv", "/projects/static-drift"],
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

const scienceRedirect = vercelConfig.redirects.find(
  (entry) => entry.source === "/projects/rcl-science-lab",
);
if (
  scienceRedirect?.destination !== "/products" ||
  scienceRedirect.permanent !== false
) {
  fail("The withdrawn Science Lab route must temporarily redirect to Products");
}

for (const file of [
  "public/images/projects/forge-clean-session.png",
  "public/images/social/forge.jpg",
  "public/images/social/rcl-science-lab.jpg",
  "public/images/projects/rcl-science-lab-observatory.jpg",
  "public/images/projects/rcl-science-lab-protostar-formation.jpg",
  "public/images/projects/rcl-science-lab-catalog-browser.jpg",
  "public/images/projects/rcl-workspace-start-screen.jpg",
  "public/images/projects/rcl-workspace-dashboard.jpg",
  "public/images/projects/rcl-workspace-dashboard-v2.jpg",
  "public/images/projects/echo-start-screen.jpg",
  "public/images/projects/echo-editor-screen.jpg",
  "public/images/projects/phase-defense-gameplay-card.jpg",
  "public/images/home/echo-card.jpg",
]) {
  if (existsSync(join(root, file)))
    fail(`Retired public asset remains: ${file}`);
}

for (const file of [
  "public/images/home/phase-arcade-card.jpg",
  "public/images/home/rcl-hero-cinematic.jpg",
  "public/images/home/rcl-technical-orb.jpg",
  "public/images/home/red-atmosphere.jpg",
  "public/images/home/red-floor-glow.jpg",
  "public/images/home/red-grid-tech.jpg",
  "public/images/projects/misread-card.jpg",
  "public/images/projects/talk-to-me-card.jpg",
  "public/images/social/phase-breaker-coming-soon.jpg",
]) {
  if (existsSync(join(root, file))) {
    fail(`Prohibited legacy visual asset remains public: ${file}`);
  }
}

for (const project of projects) {
  const paths = [
    getProjectSocialImage(project.slug),
    ...(project.showcaseMedia?.kind === "approved-image"
      ? [project.showcaseMedia.src]
      : []),
    ...getProjectScreenshots(project.visual).map((image) => image.src),
  ];
  for (const path of paths) {
    if (!existsSync(join(root, "public", path)))
      fail(`Required portfolio asset is missing: ${path}`);
  }
}

if (!existsSync(join(root, "docs", "RCL_V2_MEDIA_INVENTORY.md"))) {
  fail("Missing V2 media provenance inventory");
}

for (const file of [
  "public/images/projects/forge-engineering-thread.webp",
  "public/images/projects/pigs-can-fly-production-art.webp",
]) {
  if (existsSync(join(root, file)))
    fail(`Unfinished product preview remains public: ${file}`);
}

if (!existsSync(out)) {
  console.log(
    `Portfolio source checks passed: ${projects.length} products, ${featuredProjects.length} featured.`,
  );
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

if (!sitemap.includes("https://reedcreativelabs.com/products")) {
  fail("The canonical Products catalog is missing from the sitemap");
}
if (sitemap.includes("<loc>https://reedcreativelabs.com/projects</loc>")) {
  fail("The retired /projects catalog URL remains in the sitemap");
}
if (!existsSync(routeFile("/products"))) {
  fail("The canonical /products catalog output is missing");
}
if (existsSync(routeFile("/projects"))) {
  fail("A duplicate static /projects catalog output was generated");
}

for (const project of projects) {
  const pageFile = routeFile(project.route);
  if (!existsSync(pageFile))
    fail(`Missing product route output: ${project.route}`);
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
    if (!html.includes(required))
      fail(`Missing ${required} in ${project.route}`);
  }

  if (
    expectedFeatured.includes(project.slug) &&
    !html.includes("Project status") &&
    !html.includes("PROJECT STATUS")
  ) {
    fail(
      `Featured product page is missing its project status section: ${project.route}`,
    );
  }
  if (
    expectedFeatured.includes(project.slug) &&
    !html.includes(`data-technical-profile="${project.slug}"`)
  ) {
    fail(
      `Featured product page is missing its technical profile: ${project.route}`,
    );
  }

  const structuredDataScripts = [
    ...html.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ];
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
  if (
    sitemap.includes(
      `<loc>https://reedcreativelabs.com/projects/${retired.slug}</loc>`,
    )
  ) {
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

for (const retired of [
  ...retiredProducts.map((item) => item.name),
  retiredIncludedGame,
]) {
  if (new RegExp(`\\b${retired}\\b`).test(publicHtml))
    fail(`Retired public reference remains: ${retired}`);
}
if (publicHtml.includes('href="#"')) fail("Placeholder public link found");

const homepage = readFileSync(routeFile("/"), "utf8");
const homeSource = readFileSync(join(root, "app", "page.tsx"), "utf8");
const globalCss = readFileSync(join(root, "app", "globals.css"), "utf8");
const heroMediaSource = readFileSync(
  join(root, "components", "HeroSystemField.tsx"),
  "utf8",
);
const expectedHomeTitle =
  "<title>Reed Creative Labs | Software, Simulation &amp; Interactive Systems</title>";

if (!homepage.includes(expectedHomeTitle)) {
  fail("Homepage title does not match the approved post-launch title");
}
if (!homepage.includes('class="v2-hero__copy v2-hero__copy--enter"')) {
  fail("Homepage hero copy is missing its first-paint-safe entrance class");
}
if (homeSource.includes('<Reveal className="v2-hero__copy">')) {
  fail("Homepage hero copy regressed to the opacity-zero Reveal wrapper");
}
if (
  !globalCss.includes("@keyframes hero-copy-enter") ||
  !globalCss.includes("opacity: 0.88")
) {
  fail("Homepage hero entrance no longer guarantees readable initial opacity");
}
if (
  !heroMediaSource.includes(
    'className="hero-system-field" aria-hidden="true"',
  ) ||
  !heroMediaSource.includes('alt=""')
) {
  fail(
    "Decorative hero fallback image must remain hidden from assistive technology",
  );
}
const positions = expectedFeatured.map((slug) =>
  homepage.indexOf(`data-product-slug="${slug}"`),
);
if (positions.some((position) => position < 0))
  fail("Homepage is missing a required featured product");
if (
  positions.some(
    (position, index) => index > 0 && position <= positions[index - 1],
  )
) {
  fail("Homepage featured products are not in the required order");
}

const productsPage = readFileSync(routeFile("/products"), "utf8");
for (const project of featuredProjects) {
  const label = new RegExp(`aria-label="[^"]+: ${project.name}"`);
  if (!label.test(homepage) || !label.test(productsPage)) {
    fail(`Missing unique featured-product accessible name for ${project.name}`);
  }
}
for (const [slug, treatment] of [
  ["forgefield", "lead"],
  ["phase-arcade-volume-1", "feature"],
  ["project-load-bearing", "development"],
  ["static-drift", "brief"],
]) {
  if (getProject(slug)?.chapterTreatment !== treatment)
    fail(`Incorrect editorial weight for ${slug}`);
  for (const html of [homepage, productsPage]) {
    if (
      !html.includes(
        `data-product-slug="${slug}" data-treatment="${treatment}"`,
      )
    )
      fail(`Missing rendered editorial weight for ${slug}`);
  }
}
for (const slug of ["project-load-bearing", "static-drift"]) {
  const html = readFileSync(routeFile(`/projects/${slug}`), "utf8");
  if (html.includes('data-flagship-section="gallery"'))
    fail(`${slug} must not have an empty gallery`);
}
const forgefieldHtml = readFileSync(routeFile("/projects/forgefield"), "utf8");
if (!forgefieldHtml.includes("September 2026 pre-release Windows build"))
  fail("Gallery must retain shared dated build context");
if (!forgefieldHtml.includes('data-gallery-layout="worlds"'))
  fail("Forgefield requires its world gallery");
for (const label of [
  "Verified product media",
  "Current approved capture",
  "Public media review",
  "No concept imagery substituted",
]) {
  if (publicHtml.includes(label))
    fail(`Internal media approval language leaked publicly: ${label}`);
}
if (
  homepage.includes('class="v2-studio-statement"') ||
  homepage.includes('id="research-title"')
)
  fail("Homepage should not reintroduce multiple closing statements");
const servicesHtml = readFileSync(routeFile("/services"), "utf8");
for (const text of [
  "Internal RCL project",
  "WebAssembly",
  "reduced-motion",
  "rcl-site-desktop-2026-09.webp",
  "rcl-site-mobile-2026-09.webp",
]) {
  if (!servicesHtml.includes(text))
    fail(`Internal case study missing provenance or context: ${text}`);
}
if (publicHtml.includes('href="/projects"')) {
  fail("A public link still targets the retired /projects catalog URL");
}
for (const slug of expectedFeatured) {
  const occurrences =
    productsPage.match(new RegExp(`data-product-slug="${slug}"`, "g"))
      ?.length ?? 0;
  if (occurrences !== 1) {
    fail(
      `Featured product ${slug} appears ${occurrences} times on the Products page`,
    );
  }
}

const forgefieldPage = readFileSync(routeFile("/projects/forgefield"), "utf8");
for (const screenshot of expectedCaptures) {
  if (!forgefieldPage.includes(screenshot))
    fail(`Forgefield is missing capture ${screenshot}`);
}
const pressPage = readFileSync(routeFile("/press"), "utf8");
const discovery = readFileSync(join(root, "public", "llms.txt"), "utf8");
for (const [slug, status] of [
  ["forgefield", "Launching Soon"],
  ["phase-arcade-volume-1", "Final Testing"],
  ["project-load-bearing", "Active Development"],
  ["static-drift", "Active Development"],
]) {
  const project = getProject(slug);
  for (const [label, html] of [
    ["Home", homepage],
    ["Products", productsPage],
    ["Press", pressPage],
    ["detail", readFileSync(routeFile(project.route), "utf8")],
  ]) {
    if (!html.includes(project.name) || !html.includes(status))
      fail(`${label} omits ${project.name} or ${status}`);
  }
  if (!discovery.includes(`https://reedcreativelabs.com${project.route}`))
    fail(`llms.txt omits ${project.route}`);
}
for (const retired of retiredProducts) {
  if (new RegExp(`\\b${retired.name}\\b`).test(discovery))
    fail(`llms.txt contains ${retired.name}`);
}
for (const obsolete of [
  "Forgefield TV",
  "Static Drift TV",
  "Strange Attractors",
]) {
  if (publicHtml.includes(obsolete) || discovery.includes(obsolete))
    fail(`Stale public terminology: ${obsolete}`);
}

const phaseArcadePage = readFileSync(
  routeFile("/projects/phase-arcade-volume-1"),
  "utf8",
);
for (const required of [
  "Phase Shift",
  "Phase Breaker",
  "Phase Court",
  "Final Testing",
  "Desktop and VR",
  "/images/projects/phase-shift-gameplay-01.webp",
  "/images/projects/phase-breaker-gameplay-01.webp",
  "/images/projects/phase-court-gameplay-02.webp",
]) {
  if (!phaseArcadePage.includes(required))
    fail(`Phase Arcade page is missing ${required}`);
}

console.log(
  `Portfolio checks passed: ${projects.length} products, ${featuredProjects.length} featured.`,
);
