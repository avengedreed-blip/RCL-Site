export type ProductLaunch = {
  state: "coming-soon" | "released";
  releaseDate: string;
  price: number;
  currency: string;
  storefront: string;
  steamUrl: string | null;
};

// Owner-announced planned date; no launch time has been confirmed.
// Change state to "released" only after verifying actual public Steam availability.
// A scheduled date does not automatically switch the site to "available now".
export const forgefieldLaunch: ProductLaunch = {
  state: "coming-soon",
  releaseDate: "2026-10-19",
  price: 4.99,
  currency: "USD",
  storefront: "Steam",
  steamUrl: "https://store.steampowered.com/app/5356880/",
};

// Owner-supplied destinations; itch.io purchase listing verified October 14, 2026.
export const forgefieldItch = {
  url: "https://reed-creative-labs.itch.io/forgefield",
  price: 4.99,
  currency: "USD",
} as const;

export const forgefieldTrailer = {
  title: "FORGEFIELD | Official Launch Trailer | 9 Living Worlds",
  watchUrl: "https://www.youtube.com/watch?v=IoJ5lge2tWI",
  embedUrl: "https://www.youtube-nocookie.com/embed/IoJ5lge2tWI?autoplay=0&playsinline=1&rel=0",
} as const;

export function formatLaunchDate(launch: ProductLaunch) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${launch.releaseDate}T12:00:00Z`));
}

export function formatLaunchPrice(launch: ProductLaunch) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: launch.currency,
  }).format(launch.price);
}

export function getSteamStoreUrl(launch: ProductLaunch) {
  if (!launch.steamUrl) return null;
  try {
    const url = new URL(launch.steamUrl);
    return url.protocol === "https:" &&
      url.hostname === "store.steampowered.com" &&
      !url.port &&
      !url.username &&
      !url.password &&
      /^\/app\/[1-9]\d*(?:\/[^?#]*)?$/.test(url.pathname)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export const forgefieldReleaseDate = formatLaunchDate(forgefieldLaunch);
export const forgefieldPrice = formatLaunchPrice(forgefieldLaunch);
export function getLaunchCampaign(launch: ProductLaunch) {
  const released = launch.state === "released";
  const date = formatLaunchDate(launch);
  const price = formatLaunchPrice(launch);
  return {
    released,
    heading: released ? "Available now on Steam" : "Coming to Steam",
    dateLabel: released ? "Released on Steam" : "Launching on Steam",
    priceLabel: released ? "Price · USD" : "Launch price · USD",
    ctaLabel: released
      ? "Get FORGEFIELD on Steam"
      : "Wishlist on Steam",
    summary: released
      ? `Available now on Steam for ${price} USD.`
      : `Coming to Steam ${date} for ${price} USD. Wishlist now.`,
    statusLabel: released ? "Available now on Steam" : `Steam Release: ${date}`,
  };
}

export const forgefieldCampaign = getLaunchCampaign(forgefieldLaunch);
export const forgefieldLaunchSummary = `Available now on itch.io. ${forgefieldCampaign.summary}`;

// Verified against Forgefield's built-in scene catalog, 2026-09-30.
// Strange Attractors is a legacy alias for Corona, not an additional world.
export const forgefieldWorlds = [
  "Eventide",
  "Genesis",
  "Gravitas",
  "Abyssal",
  "Synapse",
  "Quantum Garden",
  "Corona",
  "Ember",
  "Polar Night",
] as const;
