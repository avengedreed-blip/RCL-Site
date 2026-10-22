// Fixed names only. Never return URLs, query strings, subjects, or form values.
export function conversionForLink(href: string, origin: string): "contact_click" | "partnership_inquiry" | "product_outbound" | null {
  try {
    const url = new URL(href, origin);
    if (url.protocol === "mailto:" && url.pathname === "reedcreativelabs@gmail.com") {
      return url.searchParams.get("subject") === "Agency partnership inquiry" ? "partnership_inquiry" : "contact_click";
    }
    if (url.origin === origin && url.pathname === "/contact") return url.hash === "#agency-inquiry" ? "partnership_inquiry" : "contact_click";
    if (url.protocol === "https:" && (url.hostname === "store.steampowered.com" || url.hostname === "reed-creative-labs.itch.io" || url.hostname === "play.google.com" || url.hostname === "apps.apple.com")) return "product_outbound";
  } catch { /* Invalid destinations are not measured. */ }
  return null;
}
