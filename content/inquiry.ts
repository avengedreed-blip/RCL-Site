import { studioEmail } from "./contact.ts";

// Delivery is deliberately email-only until a managed provider is selected,
// configured, disclosed in the privacy policy, and verified with a real inbox.
// Never put provider credentials here: this module is included in the browser.
export const inquiryDelivery = { mode: "email-draft", recipient: studioEmail } as const;
export const projectTypes = ["Business website", "Front-end application", "Business automation", "Agency partnership", "Scientific / technical visualization", "Other / discuss fit"] as const;
export const budgetBands = ["Under $1,000", "$1,000–$3,000", "$3,000–$6,000", "$6,000–$10,000", "$10,000+", "Need help scoping"] as const;
export const timelines = ["Within a month", "1–3 months", "3–6 months", "Flexible / exploring"] as const;
