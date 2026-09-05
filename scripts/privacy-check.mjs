import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { sanitizePerformanceEvent } from "../lib/privacy-metrics.ts";
import { staticPagePaths } from "../lib/site-routes.ts";
import { projects } from "../content/projects.ts";

const origin = "https://reedcreativelabs.com";
const paths = [...staticPagePaths, ...projects.map((project) => project.route)];
for (const route of paths) {
  const event = { type: "vital", url: origin + route + "?email=private@example.com#secret", route: "/private" };
  const result = sanitizePerformanceEvent(event, paths, origin);
  assert.equal(result.url, origin + route);
  assert.equal(result.route, route);
  assert.ok(event.url.includes("?"), "Filtering must not mutate the SDK event");
}
for (const url of [
  "not-a-url",
  origin + "/private@example.com",
  origin + "/projects/unknown-person",
  origin + "/contact/private@example.com",
  "https://user:password@reedcreativelabs.com/contact",
  "https://another-site.example/contact",
  "http://reedcreativelabs.com/contact",
]) {
  assert.equal(sanitizePerformanceEvent({ url }, paths, origin), null);
}
const llms = readFileSync(new URL("../public/llms.txt", import.meta.url), "utf8");
assert.ok(llms.startsWith("# Reed Creative Labs\n"));
for (const section of llms.split(/^## .+$/m).slice(1)) {
  for (const line of section.trim().split("\n").filter(Boolean)) {
    assert.match(line, /^- \[[^\]]+\]\(https:\/\/reedcreativelabs\.com[^)]+\): /);
    const url = new URL(line.match(/\]\(([^)]+)\)/)[1]);
    assert.ok(paths.includes(url.pathname), "llms.txt must link to published pages");
  }
}
console.log(`Privacy and llms.txt checks passed for ${paths.length} public routes.`);
