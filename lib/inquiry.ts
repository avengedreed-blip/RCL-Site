import { inquiryDelivery, projectTypes, budgetBands, timelines } from "../content/inquiry.ts";

export function prepareInquiry(data: FormData): { body: string; href: string } | { error: string } {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  if (value("website")) return { error: "Unable to prepare this inquiry. Please email the studio directly." };
  const name = value("name"), email = value("email"), company = value("company"), brief = value("brief");
  const type = value("type"), budget = value("budget"), timeline = value("timeline");
  if (!name || name.length > 100 || /[\r\n]/.test(name) || company.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || brief.length < 20 || brief.length > 1500 || data.get("acknowledgment") !== "on" || !projectTypes.some(x => x === type) || !budgetBands.some(x => x === budget) || !timelines.some(x => x === timeline)) {
    return { error: "Please complete the required fields, use a valid email address, and describe the project in 20–1,500 characters." };
  }
  const subject = type === "Agency partnership" ? "Agency partnership inquiry" : `Project inquiry: ${type}`;
  const body = `Name: ${name}\nCompany: ${company || "Not provided"}\nBusiness email: ${email}\nProject type: ${type}\nBudget: ${budget}\nTimeline: ${timeline}\n\n${brief}`;
  return { body, href: `mailto:${inquiryDelivery.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
