type PerformanceEvent = { url: string; route?: string };

// Web Analytics deliberately accepts page views only, with no custom payloads.
export function sanitizeAnalyticsEvent(
  event: { type: string; url: string },
  allowedPaths: readonly string[],
  origin: string,
  privacy: { doNotTrack?: string | null; globalPrivacyControl?: unknown } = {},
): { type: "pageview"; url: string } | null {
  if (
    event.type !== "pageview" ||
    privacy.doNotTrack === "1" ||
    privacy.globalPrivacyControl === true
  ) return null;

  const clean = sanitizePerformanceEvent(event, allowedPaths, origin);
  return clean ? { type: "pageview", url: clean.url } : null;
}

// Only published page paths are eligible; arbitrary 404 URLs can contain PII.
export function sanitizePerformanceEvent<T extends PerformanceEvent>(
  event: T,
  allowedPaths: readonly string[],
  origin: string,
): T | null {
  try {
    const url = new URL(event.url);
    if (
      url.origin !== origin ||
      url.username ||
      url.password ||
      !allowedPaths.includes(url.pathname)
    ) return null;

    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString(), route: url.pathname };
  } catch {
    return null;
  }
}
