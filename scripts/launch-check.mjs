import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  forgefieldLaunch,
  forgefieldReleaseDate,
  forgefieldPrice,
  forgefieldWorlds,
  getSteamStoreUrl,
} from "../content/forgefield.ts";
import { getProject, getProjectDateLabel } from "../content/projects.ts";

const project = getProject("forgefield");
assert.equal(project.status, "scheduled");
assert.equal(project.launch, forgefieldLaunch);
assert.equal(forgefieldLaunch.releaseDate, "2026-10-14");
assert.equal(forgefieldLaunch.price, 4.99);
assert.equal(forgefieldLaunch.currency, "USD");
assert.equal(getProjectDateLabel(project), "Steam Release: October 14, 2026");
assert.deepEqual(project.platforms, ["Windows 11 x64"]);
assert.equal(forgefieldWorlds.length, 9);
assert.ok(forgefieldWorlds.includes("Corona"));
assert.ok(!forgefieldWorlds.includes("Strange Attractors"));

// Synthetic URL fixtures exercise gating; they are never published.
for (const steamUrl of [
  null,
  "",
  "not-a-url",
  "https://example.com/app/123/",
  "http://store.steampowered.com/app/123/",
  "https://store.steampowered.com/app/0/",
  "https://store.steampowered.com/search/",
  "https://user:pass@store.steampowered.com/app/123/",
]) {
  assert.equal(getSteamStoreUrl({ ...forgefieldLaunch, steamUrl }), null);
}
assert.equal(
  getSteamStoreUrl({
    ...forgefieldLaunch,
    steamUrl: "https://store.steampowered.com/app/123/Example/",
  }),
  "https://store.steampowered.com/app/123/Example/",
);

for (const route of ["index", "products", "projects/forgefield", "press"]) {
  const html = readFileSync(`out/${route}.html`, "utf8");
  assert.ok(html.includes(forgefieldReleaseDate), `${route}: release date`);
  assert.ok(html.includes(forgefieldPrice), `${route}: price`);
  assert.doesNotMatch(
    html,
    /Launching Soon|No release date has been announced|a release date have not|Windows 10\/11|Wishlist on Steam/i,
  );
  if (route !== "press")
    assert.ok(
      html.includes(`dateTime="${forgefieldLaunch.releaseDate}"`),
      `${route}: semantic date`,
    );
  if (!getSteamStoreUrl(forgefieldLaunch))
    assert.doesNotMatch(html, /href="https:\/\/store\.steampowered\.com/);
}
const detail = readFileSync("out/projects/forgefield.html", "utf8");
const schema = [
  ...detail.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ),
]
  .map((match) => JSON.parse(match[1]))
  .find((data) => data.name === "Forgefield");
assert.deepEqual(schema["@type"], ["SoftwareApplication", "Product"]);
assert.equal(schema.releaseDate, forgefieldLaunch.releaseDate);
assert.equal(schema.operatingSystem, "Windows 11 x64");
assert.equal(schema.applicationCategory, "EntertainmentApplication");
assert.equal(schema.aggregateRating, undefined);
assert.equal(schema.review, undefined);
if (!getSteamStoreUrl(forgefieldLaunch))
  assert.equal(
    schema.offers,
    undefined,
    "No storefront offer before a verified store URL",
  );
for (const world of forgefieldWorlds) assert.ok(detail.includes(world), world);
const llms = readFileSync("out/llms.txt", "utf8");
assert.ok(
  llms.includes(forgefieldReleaseDate) && llms.includes(forgefieldPrice),
  "Static discovery copy matches central release data",
);
console.log(
  "Steam launch checks passed: date, price, platforms, worlds, metadata, and store-link gating.",
);
