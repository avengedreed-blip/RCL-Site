import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProjectInquiry } from "@/components/ProjectInquiry";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ButtonLink } from "@/components/ButtonLink";
import { studioEmail, studioEmailHref, partnershipEmailHref } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Start a Project", description: "Discuss a website, front-end application, automation, technical visualization, or agency partnership with Reed Creative Labs. Serving US clients nationwide.", path: "/contact" });
export default function ContactPage() {
  return <main id="main-content" tabIndex={-1} className="commercial-page"><PageHeader eyebrow="Start a Project" title="What are you working on?" body="Share the goal, the constraints, and where you need help. RCL works directly with businesses and creative agencies nationwide, remotely from South Carolina." />
    <section id="agency-inquiry" className="v2-container commercial-section commercial-section--first commercial-contact-grid" aria-label="Project and partnership inquiries"><ProjectInquiry /><aside className="commercial-contact-aside"><p className="v2-eyebrow">Direct contact</p><h2>Prefer a conversation by email?</h2><a className="commercial-email" href={studioEmailHref}>{studioEmail}</a><CopyEmailButton email={studioEmail} /><p>You can email a brief directly. Useful starting points include your audience, existing website or designs, priorities, timing, and budget.</p><h3>Agency partnerships</h3><p>Tell us about your team, the implementation work, and whether you need white-label support. Confidentiality, capacity, and handoff are discussed before work begins.</p><ButtonLink href={partnershipEmailHref} variant="secondary">Email About a Partnership</ButtonLink><Link href="/agency-partners" className="commercial-text-link">How partnerships work ↗</Link><h3>Product, press, or security inquiry?</h3><p>Use the same email address and name the product or topic in your subject. Please do not include passwords or sensitive records.</p><p className="commercial-note">No automatic delivery confirmation is available on this page. Your email app handles sending.</p></aside></section>
  </main>;
}
