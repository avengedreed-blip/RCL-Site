import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, readdir, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { gzipSync } from "node:zlib";
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
    res.setHeader("Content-Type", mime[path.extname(target)] || "application/octet-stream");
    res.end(body);
  } catch {
    res.writeHead(500).end();
  }
});
await stat(path.join(root, "index.html"));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;

const output = "output/playwright/agency";
await mkdir(output, { recursive: true });
let browser;
try {
  browser = await chromium.launch({ headless: true, ...(process.env.RCL_BROWSER_CHANNEL ? { channel: process.env.RCL_BROWSER_CHANNEL } : {}) });
  const errors = [];
  const measurements = [];
  for (const width of [320, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    const response = await page.goto(base + "/agency-partners", { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), "https://reedcreativelabs.com/agency-partners");
    assert.match(await page.title(), /Agency Partnerships.*Reed Creative Labs/);
    assert.ok((await page.locator('meta[name="description"]').getAttribute("content")).length > 100);
    assert.equal(await page.locator('meta[property="og:url"]').getAttribute("content"), "https://reedcreativelabs.com/agency-partners");
    assert.equal(await page.locator("main canvas, main video").count(), 0, "No additional graphics runtime");
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
      assert.ok(await image.evaluate(element => element.naturalWidth > 0 && getComputedStyle(element).objectFit === "contain"));
    }
    const overflow = await page.locator("main h1, main h2, main h3, main p, main a, main li, main dd").evaluateAll(elements => elements.filter(e => {
      const b = e.getBoundingClientRect(); return b.left < -1 || b.right > innerWidth + 1 || e.scrollWidth > e.clientWidth + 2;
    }).map(e => e.textContent.slice(0, 70)));
    assert.deepEqual(overflow, [], `Agency layout at ${width}px`);
    await page.evaluate(() => scrollTo(0, 0));
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } })).violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
    assert.deepEqual(violations, [], `Agency accessibility at ${width}px`);
    assert.ok(await page.locator(".reveal-enter").evaluateAll(es => es.every(e => getComputedStyle(e).animationDelay === "0s")));
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${output}/agency-${width}.png`, fullPage: true });
    if (width === 1440) await page.screenshot({ path: `${output}/agency-hero.png` });
    measurements.push({ width, height: await page.locator("main").evaluate(e => e.offsetHeight), axeViolations: violations.length });
    const discuss = page.getByRole("link", { name: "Discuss a Partnership", exact: true }).first();
    await discuss.focus();
    assert.notEqual(await discuss.evaluate(e => getComputedStyle(e).outlineStyle), "none");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").innerText(), "Explore Our Work");
    await page.keyboard.press("Enter");
    await page.waitForURL(base + "/agency-partners#selected-work");
    assert.ok((await page.locator("#selected-work").boundingBox()).y >= 0);
    await discuss.click();
    await page.waitForURL(base + "/contact#agency-inquiry");
    await page.waitForLoadState("networkidle");
    const email = page.getByRole("link", { name: "Email About a Partnership", exact: true });
    assert.equal(await email.getAttribute("href"), "mailto:reedcreativelabs@gmail.com?subject=Agency%20partnership%20inquiry");
    await email.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    assert.notEqual(await email.evaluate(e => getComputedStyle(e).outlineStyle), "none");
    const box = await email.boundingBox();
    assert.ok(box.height >= 44 && box.x >= 0 && box.x + box.width <= width);
    await page.screenshot({ path: `${output}/contact-${width}.png` });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  await page.goto(base + "/agency-partners", { waitUntil: "networkidle" });
  const links = await page.locator("main a").evaluateAll(es => es.map(e => e.getAttribute("href")));
  for (const href of new Set(links)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const url = new URL(href, base + "/agency-partners");
    const response = await page.request.get(url.href);
    assert.equal(response.status(), 200, href);
    if (url.hash) assert.ok((await response.text()).includes(`id="${url.hash.slice(1)}"`), href);
  }
  const schema = await page.locator('main script[type="application/ld+json"]').textContent();
  assert.equal(JSON.parse(schema)["@type"], "Service");
  assert.ok((await (await page.request.get(base + "/sitemap.xml")).text()).includes("https://reedcreativelabs.com/agency-partners"));
  for (const route of ["/", "/services", "/contact"]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    assert.ok(await page.locator('footer a[href="/agency-partners"]').count());
    if (route !== "/contact") assert.ok(await page.locator('main a[href="/agency-partners"]').count());
    if (route === "/") {
      const fresh = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
      const homeResponse = await fresh.goto(base, { waitUntil: "networkidle" });
      // Compare initial document entry scripts; prefetches for other routes are timing-dependent.
      const scripts = [...(await homeResponse.text()).matchAll(/<script src="([^"]+)"/g)].map(match => match[1]);
      let gzip = 0;
      for (const src of scripts) gzip += gzipSync(await readFile(path.join(root, src))).length;
      measurements.push({ homeJsGzip: gzip });
      const baseline = JSON.parse(await readFile(`${output}/baseline.json`, "utf8").catch(() => "null"));
      console.log(JSON.stringify({ homeJsGzip: gzip, baseline: baseline?.homeJsGzip }));
      if (baseline) assert.ok(gzip <= baseline.homeJsGzip + 1024, "No material homepage JS growth");
      await fresh.screenshot({ path: `${output}/home-after.png` });
      await fresh.close();
    }
  }
  const noJS = await browser.newPage({ javaScriptEnabled: false });
  await noJS.goto(base + "/agency-partners");
  assert.ok(await noJS.getByRole("link", { name: "Discuss a Partnership", exact: true }).first().isVisible());
  assert.ok(await noJS.getByRole("heading", { name: "Your vision. Our technical execution." }).isVisible());
  assert.deepEqual(errors, []);
  await writeFile(`${output}/results.json`, JSON.stringify(measurements, null, 2));
  console.log("Agency checks passed: five viewport sizes, axe, keyboard/CTA flow, email destination, all internal links, metadata, schema, sitemap, no-JS and homepage JS measurement.");
  console.log(JSON.stringify(measurements));
} finally { await browser?.close(); server.close(); }
