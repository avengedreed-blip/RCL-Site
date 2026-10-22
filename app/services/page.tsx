import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/ButtonLink";
import { InquiryCta, ServiceOffers, StudioProcess } from "@/components/CommercialSections";
import { StructuredData } from "@/components/StructuredData";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Business Websites, Front-End Development & Automation", description: "Websites, front-end applications, business automation, agency implementation, and scientific visualization. Clear project scopes for US clients nationwide.", path: "/services" });

export default function ServicesPage() {
  return <main id="main-content" tabIndex={-1} className="commercial-page">
    <StructuredData data={{ "@context": "https://schema.org", "@type": "Service", name: "Websites and creative technology", provider: { "@type": "Organization", name: "Reed Creative Labs", url: absoluteUrl() }, areaServed: { "@type": "Country", name: "United States" }, url: absoluteUrl("/services") }} />
    <PageHeader eyebrow="Studio services" title="Websites and software." body="Development for businesses and creative agencies across the US. From a company website to a custom interface, the scope starts with what people need to accomplish." />
    <div className="v2-container commercial-actions"><ButtonLink href="/contact" variant="contact">Start a Project</ButtonLink><ButtonLink href="/work" variant="secondary">Explore Our Work</ButtonLink></div>
    <section className="v2-container commercial-section" aria-labelledby="offers-title"><div className="commercial-section-head"><div><p className="v2-eyebrow">Scope & investment</p><h2 id="offers-title">What a project can include.</h2></div><p>These are initial planning ranges in USD, not fixed quotes or established package prices. Final pricing follows a written scope. Content, complexity, integrations, and review rounds affect the estimate; third-party fees and ongoing support are scoped separately.</p></div><ServiceOffers detailed /></section>
    <section className="commercial-band"><div className="v2-container commercial-section commercial-two-column"><div><p className="v2-eyebrow">Platform fit</p><h2>Keep the infrastructure proportionate.</h2><p>Our preference is front-end development on managed platforms, using existing APIs and minimal custom backend infrastructure. Your domain, hosting, and platform accounts should stay under your control.</p><p>Windows desktop apps, mobile apps, maintenance, AI integrations, and platform-based e-commerce are considered by inquiry, subject to fit and availability.</p></div><div><h3>What sits outside the standard offer</h3><p>Full-scale backend SaaS, bespoke payment systems, 24/7 IT operations, regulated healthcare or financial systems, and safety-critical industrial control.</p><p>Commerce projects use established checkout providers. Hosting, licenses, content creation, maintenance, and support responsibilities are agreed separately. No ongoing service or response-time commitment is implied.</p><Link href="/agency-partners" className="commercial-text-link">Building for a client? Explore agency partnerships ↗</Link></div></div></section>
    <section className="v2-container commercial-section"><div className="commercial-section-head"><div><p className="v2-eyebrow">Delivery</p><h2>From brief to handoff.</h2></div><p>Scope, ownership, review points, and acceptance criteria are agreed before implementation.</p></div><StudioProcess /></section>
    <InquiryCta />
  </main>;
}
