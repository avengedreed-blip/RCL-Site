import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { chromium, firefox, webkit } from "playwright";
import { createRequire } from "node:module";
import { featuredProjects, projects } from "../content/projects.ts";
import { staticPagePaths } from "../lib/site-routes.ts";

const require = createRequire(import.meta.url);
const root = path.resolve("out");
// Windows exports nest segment files; Vercel's Linux build flattens these URLs.
const segmentAliases = new Map();
for (const entry of await readdir(root, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
  const file = path.join(entry.parentPath, entry.name);
  const relative = path.relative(root, file).split(path.sep).join("/");
  const start = relative.indexOf("__next.");
  if (start >= 0) segmentAliases.set("/" + relative.slice(0, start) + relative.slice(start).replaceAll("/", "."), file);
}
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain", ".xml": "application/xml", ".wasm": "application/wasm", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let target = segmentAliases.get(pathname) ?? path.resolve(root, "." + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    if (target === root) target = path.join(root, "index.html");
    else if (!path.extname(target)) target += ".html";
    let body = await readFile(target).catch(() => null);
    if (!body) {
      target = path.join(root, "404.html");
      body = await readFile(target);
      res.statusCode = 404;
    }
    res.setHeader("Content-Type", mime[path.extname(target)] || "application/octet-stream");
    res.end(body);
  } catch {
    res.writeHead(500).end();
  }
});
await stat(path.join(root, "index.html"));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const errors = [];
let browser;
try {
  const engine = process.env.RCL_BROWSER_ENGINE ?? "chromium";
  const browserType = { chromium, firefox, webkit }[engine];
  assert.ok(browserType, "RCL_BROWSER_ENGINE must be chromium, firefox, or webkit");
  browser = await browserType.launch({
    headless: true,
    ...(engine !== "chromium" ? {} : process.env.RCL_BROWSER_CHANNEL
      ? { channel: process.env.RCL_BROWSER_CHANNEL }
      : { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }),
  });
  const page = await browser.newPage({ reducedMotion: "reduce" });
  page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.request().isNavigationRequest()) errors.push(response.status() + " " + response.url());
  });
  const routes = [...staticPagePaths, ...projects.map((project) => project.route)];
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, route);
      assert.equal(await page.locator("h1").count(), 1, route);
      assert.equal(await page.locator("main").count(), 1, route);
      assert.ok(await page.locator(".reveal-enter").evaluateAll((elements) => elements.every((element) => getComputedStyle(element).animationDelay === "0s")), route + ": reduced motion must not delay content");
      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
      const violations = await page.evaluate(async () => (await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] }, rules: { "label-content-name-mismatch": { enabled: true } } })).violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })));
      assert.deepEqual(violations, [], `${route} at ${width}: accessibility`);
    }
  }
  for (const width of [320, 360, 430, 720, 768, 820, 1024, 1100, 1180, 1280, 1366, 1920, 2560]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/products", "/services", ...featuredProjects.map((project) => project.route)]) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => [...document.querySelectorAll("main h1, main h2, main h3, main p, main a, main li")].filter((e) => !e.closest('[aria-hidden="true"]') && !e.classList.contains("sr-only") && e.getClientRects().length && getComputedStyle(e).visibility !== "hidden").filter((e) => { const b = e.getBoundingClientRect(); return b.left < -1 || b.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 2; }).map((e) => e.textContent.trim().slice(0, 80)));
      assert.deepEqual(overflow, [], `${route} at ${width}: overflow`);
    }
  }
  await page.goto(base + "/products", { waitUntil: "networkidle" });
  for (const project of projects) {
    await page.locator(`main a[href="${project.route}"]`).first().click();
    await page.waitForURL(base + project.route);
    assert.equal((await page.locator("h1").innerText()).toLowerCase(), project.name.toLowerCase());
    await page.goBack({ waitUntil: "networkidle" });
    await page.waitForURL(base + "/products");
    await page.waitForLoadState("networkidle");
  }
  await page.goto(base + "/contact", { waitUntil: "networkidle" });
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("Permission denied")) } }));
  await page.getByRole("button", { name: /copy email/i }).click();
  assert.match(await page.getByRole("status").innerText(), /Copy unavailable/);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => {} } }));
  await page.getByRole("button", { name: /copy email/i }).click();
  assert.match(await page.getByRole("status").innerText(), /copied/);
  await page.goto(base + "/", { waitUntil: "networkidle" });
  if (engine === "webkit" && process.platform === "win32") {
    console.log("Windows WebKit: native Tab traversal is unavailable in this runner; testing skip-link keyboard activation.");
    await page.getByRole("link", { name: "Skip to content" }).focus();
  } else {
    await page.keyboard.press("Tab");
  }
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("href")), "#main-content");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "main-content");

  // Delay Wasm to exercise preference changes during asynchronous initialization.
  const motion = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  motion.on("pageerror", (error) => errors.push(`motion ${motion.url()}: ${error.message}`));
  let releaseWasm;
  await motion.route("**/*.wasm", (route) => new Promise((resolve) => {
    releaseWasm = async () => { await route.continue(); resolve(); };
  }));
  await motion.goto(base + "/?heroQuality=low");
  await motion.waitForFunction(() => document.querySelector(".fortran-flow-hero")?.dataset.heroInitializationStage === "loading-fortran-wasm");
  await motion.emulateMedia({ reducedMotion: "reduce" });
  await motion.waitForFunction(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  await releaseWasm();
  await motion.waitForFunction(() => document.querySelector(".fortran-flow-hero")?.dataset.heroMode === "reduced");
  assert.equal(await motion.locator(".fortran-flow-hero").getAttribute("data-hero-mode"), "reduced");
  await motion.waitForLoadState("networkidle");
  await motion.unroute("**/*.wasm");
  await motion.emulateMedia({ reducedMotion: "no-preference" });
  await motion.goto(base + "/?heroQuality=low");
  await motion.getByRole("button", { name: "Pause simulation" }).waitFor();
  await motion.getByRole("button", { name: "Pause simulation" }).click();
  assert.equal(await motion.locator(".fortran-flow-hero").getAttribute("data-hero-activity"), "paused");
  await motion.setViewportSize({ width: 1440, height: 900 });
  await motion.waitForTimeout(100);
  assert.equal(await motion.locator(".fortran-flow-hero").getAttribute("data-hero-activity"), "paused");
  await motion.getByRole("button", { name: "Resume simulation" }).click();
  assert.equal(await motion.locator(".fortran-flow-hero").getAttribute("data-hero-activity"), "running");
  await motion.evaluate(() => scrollTo(0, 2400));
  await motion.waitForFunction(() => document.querySelector(".fortran-flow-hero")?.dataset.heroActivity === "paused");
  await motion.evaluate(() => scrollTo(0, 0));
  await motion.waitForFunction(() => document.querySelector(".fortran-flow-hero")?.dataset.heroActivity === "running");
  await motion.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  assert.equal(await motion.locator(".fortran-flow-hero").getAttribute("data-hero-activity"), "paused");
  await motion.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  assert.equal(await motion.locator(".fortran-flow-hero").getAttribute("data-hero-activity"), "running");
  await motion.waitForLoadState("networkidle");
  await motion.goto(base + "/?heroFailure=initialization");
  await motion.waitForFunction(() => document.querySelector(".fortran-flow-hero")?.dataset.heroMode === "fallback");
  const noGraphics = await browser.newPage({ viewport: { width: 1280, height: 600 } });
  await noGraphics.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type === "webgl2" ? null : original.call(this, type, ...args);
    };
  });
  await noGraphics.goto(base + "/");
  await noGraphics.waitForFunction(() => document.querySelector(".fortran-flow-hero")?.dataset.heroMode === "fallback");
  assert.match(await noGraphics.locator("h1").innerText(), /complex systems/);
  const noJS = await browser.newPage({ javaScriptEnabled: false });
  await noJS.goto(base + "/services");
  assert.match(await noJS.locator("h1").innerText(), /Custom software/);
  assert.ok(await noJS.locator('a[href="/contact"]').count());
  await noJS.goto(base + "/");
  assert.equal(await noJS.locator(".hero-system-field__image").count(), 1);
  assert.equal((await noJS.locator(".fortran-flow-hero__caption").innerText()).toLowerCase(), "simulation field\ndeterministic renderer still");
  await page.goto(base + "/does-not-exist");
  assert.match(await page.locator("h1").innerText(), /route ends/i);
  assert.equal(await page.locator('link[rel="canonical"]').count(), 0);
  assert.deepEqual(errors, []);
  console.log(`Browser checks passed (${engine}): ${routes.length} routes, axe at desktop/mobile, responsive bounds, all product links, keyboard, clipboard, motion, async cancellation, no-WebGL, no-JS and 404.`);
} catch (error) {
  for (const context of browser?.contexts() ?? []) {
    for (const page of context.pages()) {
      console.error("Browser failure context", page.url(), await page.locator(".fortran-flow-hero").evaluateAll((elements) => elements.map((element) => ({ ...element.dataset }))).catch(() => []));
    }
  }
  throw error;
} finally {
  await browser?.close();
  server.close();
}
