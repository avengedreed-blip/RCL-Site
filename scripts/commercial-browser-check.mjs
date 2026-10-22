import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, readdir, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium } from "playwright";
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
    const config = JSON.parse(await readFile("vercel.json", "utf8"));
    for (const header of config.headers.find(rule => rule.source === "/(.*)").headers) res.setHeader(header.key, header.value);
    res.setHeader("Content-Type", mime[path.extname(target)] || "application/octet-stream");
    res.end(body);
  } catch {
    res.writeHead(500).end();
  }
});
await stat(path.join(root, "index.html"));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const output = "output/playwright/commercial";
await mkdir(output, { recursive: true });
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.RCL_BROWSER_CHANNEL ? { channel: process.env.RCL_BROWSER_CHANNEL } : {}) });
  const errors = [], results = [];
  const routes = ["/", "/services", "/agency-partners", "/work", "/science-lab", "/contact"];
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    page.on("pageerror", e => errors.push(e.message));
    page.on("response", r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    for (const route of routes) {
      assert.equal((await page.goto(base + route, { waitUntil: "networkidle" })).status(), 200);
      assert.equal(await page.locator("h1").count(), 1);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://reedcreativelabs.com" + (route === "/" ? "" : route));
      for (const img of await page.locator('main img:not([aria-hidden="true"] img)').all()) { if (await img.evaluate(x => !!x.closest('[aria-hidden="true"]'))) continue; await img.scrollIntoViewIfNeeded(); await img.evaluate(x => x.decode()); }
      const overflow = await page.locator("main h1, main h2, main h3, main p, main a, main label, main input, main select, main textarea").evaluateAll(es => es.filter(e => !e.closest('[aria-hidden="true"]')).filter(e => { const r = e.getBoundingClientRect(); return r.left < -1 || r.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 2; }).map(e => e.textContent.slice(0, 70)));
      assert.deepEqual(overflow, [], `${route} at ${width}: overflow`);
      await page.evaluate(() => scrollTo({ top: 0, left: 0, behavior: "instant" }));
      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
      const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } })).violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })));
      assert.deepEqual(violations, [], `${route} at ${width}: axe`);
      await page.screenshot({ path: `${output}/${route === "/" ? "home" : route.slice(1)}-${width}.png`, fullPage: true });
      if (route === "/") await page.screenshot({ path: `${output}/hero-${width}.png` });
      results.push({ route, width, axeViolations: 0, overflow: 0 });
    }
    await page.goto(base, { waitUntil: "networkidle" });
    const nav = page.locator(".commercial-nav:visible");
    const hire = nav.locator("summary").filter({ hasText: "Hire RCL" });
    await hire.focus(); await page.keyboard.press("Enter");
    assert.ok(await nav.getByRole("link", { name: "Services", exact: true }).isVisible());
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").innerText(), "Services");
    await page.keyboard.press("Escape");
    assert.ok(await hire.evaluate(e => e === document.activeElement && !e.parentElement.open));
    await hire.click(); await nav.getByRole("link", { name: "Agency Partners", exact: true }).click();
    await page.waitForURL(base + "/agency-partners");
    await page.getByRole("link", { name: "Discuss a Partnership", exact: true }).first().click();
    await page.waitForURL(base + "/contact#agency-inquiry");
    await page.waitForFunction(() => document.querySelector('[name="type"]')?.value === "Agency partnership");
    assert.equal(await page.locator('[name="type"]').inputValue(), "Agency partnership");
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await page.goto(base + "/contact", { waitUntil: "networkidle" });
  const outgoing = [];
  page.on("request", r => {
    // Next may issue same-origin HEAD prefetches as links become visible.
    if (!["GET", "HEAD"].includes(r.method()) || !r.url().startsWith(base) || /test%40|test@example|Local%20Test/i.test(r.url() + (r.postData() ?? ""))) outgoing.push(`${r.method()} ${r.url()}`);
  });
  await page.getByRole("button", { name: "Prepare Email Draft" }).click();
  assert.equal(await page.locator(".inquiry-result").count(), 0);
  assert.equal(await page.locator(":focus").getAttribute("name"), "name");
  await page.getByLabel("Name", { exact: true }).fill("Local Test");
  await page.getByLabel("Business email").fill("test@example.org");
  await page.getByLabel("Project type").selectOption("Business website");
  await page.getByLabel("Approximate budget").selectOption("Under $1,000");
  await page.getByLabel("Desired timeline").selectOption("Flexible / exploring");
  await page.getByLabel("Brief requirements").fill("A local test of the project inquiry draft, without delivery.");
  await page.locator('[name="acknowledgment"]').check();
  await page.getByRole("button", { name: "Prepare Email Draft" }).click();
  assert.match(await page.locator(".inquiry-form [role=status]").innerText(), /Nothing has been sent/);
  assert.ok(await page.locator(".inquiry-result").evaluate(e => e === document.activeElement));
  const href = await page.getByRole("link", { name: "Open Email App", exact: true }).getAttribute("href");
  assert.equal(new URL(href).pathname, "reedcreativelabs@gmail.com");
  assert.match(new URL(href).searchParams.get("body"), /Local Test/);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("test denial")) } }));
  await page.getByRole("button", { name: "Copy Draft", exact: true }).click();
  assert.match(await page.locator(".inquiry-form [role=status]").innerText(), /Copy is unavailable/);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.copiedDraft = text; } } }));
  await page.getByRole("button", { name: "Copy Draft", exact: true }).click();
  assert.match(await page.evaluate(() => window.copiedDraft), /Local Test/);
  assert.match(await page.locator(".inquiry-form [role=status]").innerText(), /Draft copied/);
  await page.getByLabel("Brief requirements").fill("Updated local project description for validation.");
  assert.equal(await page.locator(".inquiry-result").count(), 0, "Editing invalidates an old draft");
  assert.deepEqual(outgoing, [], "Draft preparation sends no requests");
  assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
  await page.getByRole("button", { name: "Prepare Email Draft" }).click();
  await page.screenshot({ path: `${output}/inquiry-draft-390.png`, fullPage: true });
  for (const route of routes) {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}: 200% text zoom`);
  }
  const noJS = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noJS.goto(base + "/contact");
  assert.ok(await noJS.getByRole("button", { name: "Prepare Email Draft" }).isDisabled());
  assert.ok(await noJS.locator(`main a[href="mailto:reedcreativelabs@gmail.com"]`).isVisible());
  await noJS.goto(base);
  await noJS.locator(".commercial-nav:visible summary").filter({ hasText: "Explore RCL" }).click();
  assert.ok(await noJS.locator(".commercial-nav:visible").getByRole("link", { name: "Science Lab" }).isVisible());
  assert.deepEqual(errors, []);
  await writeFile(`${output}/results.json`, JSON.stringify({ results, form: "validation, draft, clipboard success/failure, edit invalidation, no network/storage", navigation: "keyboard, Escape, partnership selection, no-JS", errors }, null, 2));
  console.log("Commercial browser checks passed: 6 routes × 5 widths, axe, images, metadata, keyboard, inquiry states, privacy, zoom, and no-JS fallback.");
} finally { await browser?.close(); server.close(); }
