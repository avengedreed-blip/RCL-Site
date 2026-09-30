export type ProductLaunch = {
  releaseDate: string;
  price: number;
  currency: string;
  storefront: string;
  steamUrl: string | null;
};

// Owner-announced launch plan. Add the verified public app URL here when ready.
// A scheduled date does not automatically switch the site to "available now".
export const forgefieldLaunch: ProductLaunch = {
  releaseDate: "2026-10-14",
  price: 4.99,
  currency: "USD",
  storefront: "Steam",
  steamUrl: null,
};

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
export const forgefieldLaunchSummary = `Coming to Steam ${forgefieldReleaseDate} for ${forgefieldPrice} USD.`;

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
