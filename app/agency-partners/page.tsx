import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { StructuredData } from "@/components/StructuredData";
import { partnershipModels, partnershipProcess, partnershipServices } from "@/content/agency-partners";
import { forgefieldLaunchSummary } from "@/content/forgefield";
import { partnershipContactHref } from "@/content/contact";
import { absoluteUrl, buildMetadata, siteName } from "@/lib/seo";
import styles from "./agency-partners.module.css";

export const metadata: Metadata = buildMetadata({
  title: "Agency Partnerships & White-Label Development",
  description: "A founder-led technical partner for creative agencies and design studios. White-label web development, design implementation, and focused custom software by RCL.",
  path: "/agency-partners",
  image: { url: "/social-preview.jpg", alt: "Reed Creative Labs — independent software and engineering studio.", width: 1200, height: 630 },
});

export default function AgencyPartnersPage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Agency development partnerships",
        serviceType: "White-label web development and technical implementation",
        description: "Project-based web development, design implementation, and custom software for creative agencies and design studios.",
        url: absoluteUrl("/agency-partners"),
        provider: { "@type": "Organization", name: siteName, url: absoluteUrl() },
      }} />

      <section className={`v2-container ${styles.hero}`} aria-labelledby="agency-title">
        <Reveal className={styles.heroCopy}>
          <Link href="/services" className={styles.breadcrumb}>Studio services /</Link>
          <p className="v2-eyebrow">Agency partnerships</p>
          <h1 id="agency-title">Your vision.<br /><span>Our technical execution.</span></h1>
          <p className={styles.lead}>
            A development partner for creative agencies, design studios, and
            businesses. RCL turns considered ideas into custom websites,
            interactive experiences, and focused software—behind the scenes or
            alongside your team.
          </p>
          <div className={styles.actions}>
            <ButtonLink href={partnershipContactHref} variant="contact">Discuss a Partnership</ButtonLink>
            <Link href="#selected-work" className={styles.secondaryLink}>Explore Our Work <ArrowUpRight aria-hidden="true" size={17} /></Link>
          </div>
          <p className={styles.heroNote}>Remote-first. Serving agencies nationwide. Direct technical collaboration.</p>
        </Reveal>
        <Reveal className={styles.brief} delay={0.08}>
          <div className={styles.briefHeading}><span>Creative intent → Working product</span><span aria-hidden="true">RCL /</span></div>
          <dl>
            <div><dt><span aria-hidden="true">01</span> Your direction</dt><dd>Brand, designs, goals.<br />The vision stays yours.</dd></div>
            <div><dt><span aria-hidden="true">02</span> Our implementation</dt><dd>Code, interaction, validation.<br />The details get built.</dd></div>
            <div><dt><span aria-hidden="true">03</span> A considered handoff</dt><dd>Agreed deliverables, documentation,<br />and a clear next step.</dd></div>
          </dl>
          <p>One point of contact.<br />A clearly defined piece of work.</p>
        </Reveal>
      </section>

      <section id="selected-work" className={`v2-container ${styles.section}`} aria-labelledby="agency-work-title">
        <div className={styles.sectionHead}>
          <div><p className="v2-eyebrow">Selected technical work</p><h2 id="agency-work-title">The work behind the offer.</h2></div>
          <p>Explore the implementation, not just the promise. These are RCL-owned projects, presented as technical evidence rather than client case studies.</p>
        </div>
        <div className={styles.workGrid}>
          <article className={styles.work}>
            <Link href="/" className={styles.workImage} aria-label="Explore the RCL website">
              <Image src="/images/work/rcl-studio-desktop-2026-10-21.jpg" width={1440} height={1000} sizes="(min-width: 768px) 46vw, 92vw" alt="The RCL studio homepage, with its custom black-hole visualization and commercial services introduction." />
              <span aria-hidden="true"><ArrowUpRight size={22} /></span>
            </Link>
            <p className={styles.workType}>Live studio website / RCL-owned</p>
            <h3>Reed Creative Labs</h3>
            <p>A custom Next.js and TypeScript site with responsive art direction, a Fortran/WebAssembly simulation, and a WebGL2 renderer. HTML content and motion fallbacks keep the site useful beyond the visual effect.</p>
            <p className={styles.caption}>Studio website capture from October 2026.</p>
            <Link href="/" className="text-link">Explore the live website <ArrowUpRight aria-hidden="true" /></Link>
          </article>
          <article className={styles.work}>
            <Link href="/projects/forgefield" className={styles.workImage} aria-label="Explore Forgefield technical work">
              <Image src="/images/projects/forgefield-eventide-2026-09-20.webp" width={2560} height={1440} sizes="(min-width: 768px) 46vw, 92vw" alt="Eventide in Forgefield: a copper accretion ring and polar jets rendered by the native Windows application." />
              <span aria-hidden="true"><ArrowUpRight size={22} /></span>
            </Link>
            <p className={styles.workType}>Original product / RCL-owned</p>
            <h3>Forgefield</h3>
            <p>Procedural desktop worlds built with modern Fortran, OpenGL compute and rendering shaders, and a native Windows launcher. Evidence of simulation, graphics, and performance-focused engineering.</p>
            <p className={styles.caption}>{forgefieldLaunchSummary}</p>
            <Link href="/projects/forgefield" className="text-link">Explore the product & technology <ArrowUpRight aria-hidden="true" /></Link>
          </article>
        </div>
      </section>

      <section className={styles.band} aria-labelledby="agency-services-title">
        <div className={`v2-container ${styles.section}`}>
          <div className={styles.sectionHead}>
            <div><p className="v2-eyebrow">Where RCL fits</p><h2 id="agency-services-title">From your designs<br />to working software.</h2></div>
            <p>Bring an established design, a defined software need, or a specific technical problem. We shape an implementation around what the project actually requires.</p>
          </div>
          <div className={styles.serviceList}>
            {partnershipServices.map((service, index) => (
              <article key={service.title} className={styles.service}>
                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                <h3>{service.title}</h3>
                <div><p>{service.body}</p><p className={styles.detail}>{service.details}</p></div>
              </article>
            ))}
          </div>
          <p className={styles.scopeNote}>Platform requirements, third-party services, validation, and support are agreed in scope. <Link href="/services">See the full service boundaries.</Link></p>
        </div>
      </section>

      <section className={`v2-container ${styles.section}`} aria-labelledby="agency-models-title">
        <div className={styles.sectionHead}>
          <div><p className="v2-eyebrow">Ways to work together</p><h2 id="agency-models-title">A partnership that fits the project.</h2></div>
          <p>Work behind your brand, alongside your designers, or on a defined technical workstream. Planning range: $60–$100/hour or scoped project pricing. Final terms, availability, and confidentiality are agreed in writing.</p>
        </div>
        <div className={styles.models}>
          {partnershipModels.map((model, index) => (
            <article key={model.title}><span className={styles.number} aria-hidden="true">0{index + 1}</span><h3>{model.title}</h3><p>{model.body}</p></article>
          ))}
        </div>
        <div className={styles.contextCta}><p>Have a brief or a design ready to discuss?</p><Link href={partnershipContactHref} className={styles.secondaryLink}>Talk through the fit <ArrowUpRight aria-hidden="true" size={17} /></Link></div>
      </section>

      <section className={styles.band} aria-labelledby="agency-process-title">
        <div className={`v2-container ${styles.section}`}>
          <div className={styles.sectionHead}><div><p className="v2-eyebrow">From introduction to handoff</p><h2 id="agency-process-title">How a partnership starts.</h2></div></div>
          <ol className={styles.process}>
            {partnershipProcess.map((step, index) => (
              <li key={step.title}><span className={styles.number} aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`v2-container ${styles.section} ${styles.studio}`} aria-labelledby="agency-studio-title">
        <div><p className="v2-eyebrow">Your technical contact</p><h2 id="agency-studio-title">Work directly<br />with Aaron Reed.</h2><p>The founder responsible for implementation is also your technical point of contact. Review the work, discuss tradeoffs, and agree on the next steps with the person building it.</p><Link href="/about/founder" className="text-link">Meet the founder <ArrowUpRight aria-hidden="true" /></Link></div>
        <div className={styles.capabilities}>
          <h3>Tools grounded in the work</h3>
          <dl>
            <div><dt>Web implementation</dt><dd>Next.js, React, TypeScript, JavaScript, HTML, CSS.</dd></div>
            <div><dt>Original software & graphics</dt><dd>Fortran, C, C#, OpenGL, WebAssembly. Demonstrated in RCL&apos;s own product and website engineering.</dd></div>
            <div><dt>Delivery practice</dt><dd>Git, GitHub, automated checks, browser validation, and documented handoff. AI-assisted development with human review and responsibility.</dd></div>
          </dl>
          <p>Tools follow the brief. Platform fit and technical requirements are reviewed for each engagement.</p>
        </div>
      </section>

      <section className={`v2-container ${styles.closing}`} aria-labelledby="agency-contact-title">
        <div><p className="v2-eyebrow">Your next project</p><h2 id="agency-contact-title">Need a technical partner?</h2><p>Share what you&apos;re building, what you already have, and where you need development support. We&apos;ll discuss scope, fit, and availability.</p></div>
        <div><ButtonLink href={partnershipContactHref} variant="contact">Discuss a Partnership</ButtonLink><p className={styles.closingNote}>Prepare a project brief or email the studio directly.</p></div>
      </section>
    </main>
  );
}
