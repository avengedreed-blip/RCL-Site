import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { FortranFlowHero } from "@/components/FortranFlowHero";
import { InquiryCta, ServiceOffers, StudioProcess, WorkPreview } from "@/components/CommercialSections";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Reed Creative Labs | Websites & Creative Technology", description: "Premium business websites, front-end applications, practical automation, agency implementation, and technical visualization. Serving US clients nationwide.", path: "/" });

export default function HomePage() {
  return <main id="main-content" tabIndex={-1} className="commercial-page">
    <section className="v2-hero commercial-hero" aria-labelledby="home-title">
      <div className="v2-container v2-hero__layout"><div className="v2-hero__copy v2-hero__copy--enter">
        <p className="v2-eyebrow">Creative technology & software development</p>
        <h1 id="home-title">Software that looks exceptional.<br /><span>Works even better.</span></h1>
        <p className="v2-hero__body">Reed Creative Labs builds premium websites, interactive applications, and practical business tools for companies and creative agencies nationwide.</p>
        <div className="commercial-actions"><ButtonLink href="/contact" variant="contact">Start a Project</ButtonLink><ButtonLink href="/work" variant="secondary">Explore Our Work</ButtonLink></div>
        <p className="commercial-note">Founder-led. Remote-first. Serving clients across the US.</p>
      </div><FortranFlowHero /></div>
    </section>
    <section className="v2-container commercial-section" aria-labelledby="services-title"><div className="commercial-section-head"><div><p className="v2-eyebrow">What we build</p><h2 id="services-title">Websites, interfaces,<br />and automation.</h2></div><p>Front-end development, established platforms, and existing APIs keep the work practical and maintainable. Start with the part of your business that needs a better tool.</p></div><ServiceOffers /></section>
    <section className="commercial-band"><div className="v2-container commercial-section" aria-labelledby="work-title"><div className="commercial-section-head"><div><p className="v2-eyebrow">Selected work</p><h2 id="work-title">A roastery website.<br />A world on your desktop.</h2></div><Link href="/work" className="commercial-text-link">Explore Our Work <span aria-hidden="true">↗</span></Link></div><WorkPreview /></div></section>
    <section className="v2-container commercial-section" aria-labelledby="process-title"><div className="commercial-section-head"><div><p className="v2-eyebrow">Working together</p><h2 id="process-title">From the first brief to handoff.</h2></div><p>Work directly with the person building your project, from the first technical conversation through handoff.</p></div><StudioProcess /></section>
    <section className="v2-container commercial-partnership" aria-labelledby="partner-title"><div><p className="v2-eyebrow">For creative agencies</p><h2 id="partner-title">Your creative vision.<br />Our technical execution.</h2><p>Bring your designs, client brief, or overflow work. RCL can implement behind your brand or collaborate alongside your team.</p></div><div className="commercial-actions"><ButtonLink href="/contact#agency-inquiry" variant="contact">Discuss a Partnership</ButtonLink><Link href="/agency-partners" className="commercial-text-link">How partnerships work <span aria-hidden="true">↗</span></Link></div></section>
    <section className="v2-container commercial-explore" aria-label="Explore RCL"><p>The studio also builds its own games, software, and experimental visual systems.</p><div><Link href="/products" className="commercial-text-link">Games & Products ↗</Link><Link href="/science-lab" className="commercial-text-link">Science Lab ↗</Link></div></section>
    <InquiryCta />
  </main>;
}
