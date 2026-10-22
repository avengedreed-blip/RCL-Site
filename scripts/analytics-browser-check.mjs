import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

// Run against an existing export. Stub provider scripts: never send test telemetry.
const expected = process.argv.includes("--production");
const conversions = process.argv.includes("--conversions");
const root = path.resolve("out");
const server = createServer(async (req, res) => {
  try {
    const pathname = new URL(req.url, "http://localhost").pathname;
    let file = path.resolve(root, "." + pathname);
    if (file === root) file = path.join(root, "index.html");
    else if (!path.extname(file)) file += ".html";
    if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
    const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".wasm": "application/wasm" };
    res.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
    res.end(await readFile(file));
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.RCL_BROWSER_CHANNEL ? { channel: process.env.RCL_BROWSER_CHANNEL } : {}),
  });
  for (const signal of ["none", "dnt", "gpc"]) {
    const context = await browser.newContext();
    await context.addInitScript(signal => {
      Object.defineProperty(navigator, "doNotTrack", { get: () => signal === "dnt" ? "1" : null });
      Object.defineProperty(navigator, "globalPrivacyControl", { get: () => signal === "gpc" });
    }, signal);
    const page = await context.newPage();
    const scripts = [];
    await page.route("**/_vercel/**", route => {
      scripts.push(new URL(route.request().url()).pathname);
      return route.fulfill({ contentType: "text/javascript", body: "/* Provider stub; telemetry disabled. */" });
    });
    // Analytics lives in the shared layout; use a static route so this check
    // does not depend on the homepage graphics workload on CI runners.
    await page.goto(base + "/contact", { waitUntil: "networkidle" });
    assert.equal(scripts.includes("/_vercel/insights/script.js"), expected);
    if (expected) {
      const result = await page.evaluate(() => {
        const hook = window.vaq.find(([type]) => type === "beforeSend")[1];
        const origin = "https://reedcreativelabs.com";
        return {
          clean: hook({ type: "pageview", url: origin + "/contact?email=private@example.com#secret" }),
          unknown: hook({ type: "pageview", url: origin + "/private@example.com" }),
          custom: hook({ type: "event", url: origin + "/" }),
          pageviews: window.vaq.filter(([type]) => type === "pageview").length,
          local: localStorage.length,
          session: sessionStorage.length,
        };
      });
      assert.deepEqual(result.clean, signal === "none" ? { type: "pageview", url: "https://reedcreativelabs.com/contact" } : null);
      assert.equal(result.unknown, null);
      assert.deepEqual(result.custom, conversions && signal === "none" ? { type: "event", url: "https://reedcreativelabs.com/" } : null);
      if (conversions) {
        const events = await page.evaluate(() => {
          // Prevent navigation at window after the document tracking listener.
          window.addEventListener("click", event => event.preventDefault(), { once: true });
          const link = document.createElement("a");
          link.href = "/contact#agency-inquiry";
          document.body.append(link); link.click(); link.remove();
          return window.vaq.filter(([type]) => type === "event").map(([, payload]) => payload);
        });
        if (signal === "none") {
          assert.equal(events.length, 1);
          assert.equal(events[0].name, "partnership_inquiry");
          assert.ok(!events[0].data || Object.keys(events[0].data).length === 0);
        } else assert.deepEqual(events, []);
      }
      assert.ok(result.pageviews >= 1, "Next.js SDK must queue the page view");
      assert.equal(result.local, 0);
      assert.equal(result.session, 0);
      assert.deepEqual(await context.cookies(), []);
    }
    await context.close();
  }
  console.log(`Analytics browser checks passed (${expected ? "production" : "non-production"}; provider stubbed).`);
} finally {
  await browser?.close();
  server.close();
}
