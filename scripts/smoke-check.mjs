import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const expectedFiles = [
  "out/index.html",
  "out/products.html",
  "out/contact.html",
  "out/press.html",
  "out/privacy.html",
  "out/terms.html",
  "out/sitemap.xml",
  "out/robots.txt",
];

const forbiddenEverywhere = [
  { pattern: ["@vercel", "analytics"].join("/"), label: "Vercel Analytics package" },
  { pattern: "<" + "Analytics", label: "Analytics component" },
  { pattern: "'unsafe" + "-eval'", label: "general eval-enabled CSP token" },
];

const corsHeaderName = [
  "Access",
  "Control",
  "Allow",
  "Origin",
].join("-");

const guardedSourceFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "components/SiteFooter.tsx",
  "package.json",
  "vercel.json",
];

const documentationFiles = [
  "SECURITY.md",
  "DEPLOYMENT_NOTES.md",
];

const missingFiles = expectedFiles.filter((file) => !existsSync(join(root, file)));
if (missingFiles.length > 0) {
  throw new Error(`Missing expected build output: ${missingFiles.join(", ")}`);
}

for (const sourceFile of [...guardedSourceFiles, ...documentationFiles]) {
  const filePath = join(root, sourceFile);
  if (!existsSync(filePath)) {
    continue;
  }
  const content = readFileSync(filePath, "utf8");
  for (const forbidden of forbiddenEverywhere) {
    if (content.includes(forbidden.pattern)) {
      throw new Error(`${forbidden.label} found in ${sourceFile}`);
    }
  }
}

for (const sourceFile of guardedSourceFiles) {
  const content = readFileSync(join(root, sourceFile), "utf8");
  if (content.includes(corsHeaderName)) {
    throw new Error(`Wildcard CORS header rule found in ${sourceFile}`);
  }
}

const vercelConfig = JSON.parse(
  readFileSync(join(root, "vercel.json"), "utf8"),
);
const globalHeaderRule = vercelConfig.headers?.find(
  (rule) => rule.source === "/(.*)",
);
const productionHeaders = new Map(
  globalHeaderRule?.headers?.map(({ key, value }) => [key, value]) ?? [],
);
const requiredProductionHeaders = [
  "Content-Security-Policy",
  "X-Frame-Options",
  "X-Content-Type-Options",
  "Strict-Transport-Security",
  "Referrer-Policy",
  "Permissions-Policy",
];

for (const header of requiredProductionHeaders) {
  if (!productionHeaders.has(header)) {
    throw new Error(`Missing production security header: ${header}`);
  }
}

const homepage = readFileSync(join(root, "out/index.html"), "utf8");
const h1 = homepage.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
const h1Text = h1.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

if (h1Text !== "Building software that explores complex systems.") {
  throw new Error(`Homepage H1 does not match the approved V2 thesis: ${h1Text}`);
}
if (!homepage.includes("Reed Creative Labs")) {
  throw new Error("Homepage is missing the Reed Creative Labs identity");
}

const builtText = [
  "out/index.html",
  "out/contact.html",
  "out/press.html",
  "out/privacy.html",
  "out/terms.html",
].map((file) => readFileSync(join(root, file), "utf8")).join("\n");

if (
  builtText.includes(["@vercel", "analytics"].join("/")) ||
  builtText.includes("<" + "Analytics")
) {
  throw new Error("Analytics reference found in build output");
}

console.log("Smoke checks passed.");
