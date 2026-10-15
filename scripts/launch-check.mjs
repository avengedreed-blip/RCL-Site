import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  forgefieldItch,
  forgefieldTrailer,
  forgefieldLaunch,
  forgefieldReleaseDate,
  forgefieldPrice,
  forgefieldWorlds,
  getSteamStoreUrl,
  getLaunchCampaign,
  forgefieldCampaign,
} from "../content/forgefield.ts";
import { getProject, getProjectDateLabel } from "../content/projects.ts";

const project = getProject("forgefield");
assert.equal(
  project.status,
  "public-release",
);
assert.equal(project.launch, forgefieldLaunch);
assert.equal(forgefieldLaunch.releaseDate, "2026-10-19");
assert.equal(forgefieldLaunch.price, 4.99);
assert.equal(forgefieldLaunch.currency, "USD");
assert.equal(getProjectDateLabel(project), "Available on itch.io");
assert.equal(
  getSteamStoreUrl(forgefieldLaunch),
  "https://store.steampowered.com/app/5356880/",
);
const released = getLaunchCampaign({ ...forgefieldLaunch, state: "released" });
assert.equal(released.ctaLabel, "Get FORGEFIELD on Steam");
assert.equal(released.heading, "Available now on Steam");
assert.doesNotMatch(released.summary, /Coming|Wishlist/);
const pastButUnreleased = getLaunchCampaign({
  ...forgefieldLaunch,
  releaseDate: "2000-01-01",
  state: "coming-soon",
});
assert.equal(pastButUnreleased.released, false);
assert.equal(pastButUnreleased.ctaLabel, "Wishlist on Steam");
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
  if (route !== "press" || !forgefieldCampaign.released)
    assert.ok(html.includes(forgefieldReleaseDate), `${route}: release date`);
  assert.ok(html.includes(forgefieldPrice), `${route}: price`);
  assert.doesNotMatch(
    html,
    /Launching Soon|No release date has been announced|a release date have not|Windows 10\/11|October 14, 2026|2026-10-14/i,
  );
  if (route !== "press")
    assert.ok(
      html.includes(`dateTime="${forgefieldLaunch.releaseDate}"`),
      `${route}: semantic date`,
    );
  assert.ok(html.includes("Available now on itch.io") || html.includes("Available Now on itch.io"));
  if (route !== "press") {
    assert.ok(html.includes(`href="${forgefieldItch.url}"`), `${route}: itch.io purchase link`);
    assert.ok(
      html.includes(forgefieldCampaign.ctaLabel),
      route + ": launch CTA",
    );
    assert.ok(
      html.includes('href="' + getSteamStoreUrl(forgefieldLaunch) + '"'),
      route + ": canonical Steam URL",
    );
  }
  if (!forgefieldCampaign.released)
    assert.doesNotMatch(html, /Available now on Steam|Get FORGEFIELD on Steam/);
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
assert.equal(schema.releaseDate, undefined, "Do not present Steam date as the overall release date");
assert.equal(schema.operatingSystem, "Windows 11 x64");
assert.equal(schema.applicationCategory, "EntertainmentApplication");
assert.equal(schema.aggregateRating, undefined);
assert.equal(schema.review, undefined);
assert.deepEqual(schema.sameAs, [forgefieldItch.url, getSteamStoreUrl(forgefieldLaunch)]);
assert.equal(schema.subjectOf.url, forgefieldTrailer.watchUrl);
if (!forgefieldCampaign.released) {
  assert.equal(schema.offers.url, forgefieldItch.url);
  assert.equal(schema.offers.availability, "https://schema.org/InStock");
  assert.equal(schema.offers.price, forgefieldItch.price.toFixed(2));
}
if (forgefieldCampaign.released) {
  assert.equal(schema.offers.price, forgefieldLaunch.price.toFixed(2));
  assert.equal(schema.offers.priceCurrency, forgefieldLaunch.currency);
  assert.equal(schema.offers.url, forgefieldLaunch.steamUrl);
}
for (const world of forgefieldWorlds) assert.ok(detail.includes(world), world);
const llms = readFileSync("out/llms.txt", "utf8");
assert.ok(
  llms.includes("https://reedcreativelabs.com/projects/forgefield") &&
    !llms.includes("October 14"),
  "Discovery copy points to current product availability",
);
console.log(
  "Steam launch checks passed: date, price, platforms, worlds, metadata, and store-link gating.",
);

assert.match(detail, /rel="noopener noreferrer"/);
assert.match(
  detail,
  /rel="canonical" href="https:\/\/reedcreativelabs\.com\/projects\/forgefield"/,
);
for (const property of [
  "og:title",
  "og:description",
  "og:image",
  "twitter:card",
])
  assert.ok(detail.includes(property), property);
