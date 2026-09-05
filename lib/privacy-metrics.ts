type PerformanceEvent = { url: string; route?: string };

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
