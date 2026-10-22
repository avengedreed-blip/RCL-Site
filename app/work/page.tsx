import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { InquiryCta } from "@/components/CommercialSections";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Selected Work & Portfolio",
  description: "Client website implementation, original RCL products, and internal technical demonstrations. Explore real work from Reed Creative Labs.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <main id="main-content" tabIndex={-1} className="commercial-page">
      <PageHeader eyebrow="Work / Portfolio" title="Selected work." body="A website for a family roastery. A native application built around simulation. The studio’s own web platform. Different briefs, with the implementation open to explore." />

      <section className="v2-container commercial-section commercial-section--first commercial-case" aria-labelledby="coffee-work-title">
        <div className="commercial-case-heading">
          <p className="v2-eyebrow">01 / Client work</p>
          <h2 id="coffee-work-title">Brotherhood Coffee Co.</h2>
          <p>A website that connects the roastery’s story, its coffee, and a route to order.</p>
        </div>
        <a href="https://www.brotherhoodcoffeeco.com/" className="commercial-case-image" rel="noopener noreferrer" aria-label="Visit the Brotherhood Coffee website">
          <Image src="/images/work/brotherhood-website-2026-10-21.jpg" width={1440} height={1000} sizes="(min-width: 1000px) 65vw, 94vw" alt="Brotherhood Coffee website with the roastery’s own photography, company story, and Shop Coffee action." />
        </a>
        <div className="commercial-case-detail">
          <p>The site brings together the coffee catalog, company story, wholesale information, and inquiry paths. Customers order through the business’s existing Square storefront.</p>
          <dl className="commercial-facts">
            <div><dt>Implementation</dt><dd>Semantic HTML, CSS, and JavaScript</dd></div>
            <div><dt>Scope</dt><dd>Responsive pages, product imagery, navigation, and email inquiry preparation</dd></div>
            <div><dt>Platform approach</dt><dd>Static website with managed checkout</dd></div>
          </dl>
          <a href="https://www.brotherhoodcoffeeco.com/" className="commercial-text-link" rel="noopener noreferrer">Visit Brotherhood Coffee ↗</a>
        </div>
      </section>

      <section className="commercial-band">
        <div className="v2-container commercial-section commercial-product-study" aria-labelledby="forgefield-work-title">
          <Link href="/projects/forgefield" className="commercial-case-image" aria-label="Explore Forgefield">
            <Image src="/images/projects/forgefield-eventide-2026-09-20-1600.webp" width={1600} height={888} sizes="(min-width: 1000px) 55vw, 94vw" alt="Eventide’s copper accretion disk and polar jets in the native Forgefield application." />
          </Link>
          <div><p className="v2-eyebrow">02 / Original RCL product · Released</p><h2 id="forgefield-work-title">Forgefield</h2><p>Nine procedural worlds for Windows, built with modern Fortran, OpenGL compute and rendering shaders, and a native launcher.</p><p>The product page includes application captures, footage, and technical context. Available now on Steam and itch.io.</p><p className="commercial-note">Native application capture · September 2026 build</p><Link href="/projects/forgefield" className="commercial-text-link">Explore the product & technology ↗</Link></div>
        </div>
      </section>

      <section className="v2-container commercial-section commercial-two-column" aria-labelledby="studio-work-title">
        <div><p className="v2-eyebrow">03 / Internal RCL project · Live studio website</p><h2 id="studio-work-title">Reed Creative Labs</h2><p>This site combines Next.js, React, and TypeScript with a Fortran/WebAssembly simulation and WebGL2 rendering. Static HTML, reduced-motion handling, and a still-image fallback preserve access to the content.</p><p className="commercial-note">Desktop and mobile captures of the October 2026 studio website.</p><Link href="/science-lab" className="commercial-text-link">Explore the technical work ↗</Link></div>
        <div className="commercial-site-captures"><Image src="/images/work/rcl-studio-desktop-2026-10-21.jpg" width={1440} height={1000} sizes="(min-width: 800px) 40vw, 90vw" alt="October 2026 RCL desktop website with a black-hole visualization." /><Image src="/images/work/rcl-studio-mobile-2026-10-21.jpg" width={390} height={1000} sizes="140px" alt="October 2026 mobile RCL website with readable text and a static simulation image." /></div>
      </section>

      <section className="commercial-band">
        <div className="v2-container commercial-section commercial-product-study" aria-labelledby="arcade-work-title">
          <Link href="/projects/phase-arcade-volume-1" className="commercial-case-image"><Image src="/images/projects/phase-breaker-2026-10-12.webp" width={1920} height={1080} sizes="(min-width: 1000px) 55vw, 94vw" alt="Phase Breaker gameplay from the October 12, 2026 development build." /></Link>
          <div><p className="v2-eyebrow">04 / Original RCL product · Upcoming</p><h2 id="arcade-work-title">Phase Arcade</h2><p>Three arcade games. One collection. Featuring Phase Breaker, Phase Shift, and Phase Court.</p><p>Windows release targeted for late October 2026. Android and iOS to follow.</p><Link href="/projects/phase-arcade-volume-1" className="commercial-text-link">Explore Phase Arcade ↗</Link></div>
        </div>
      </section>
      <div className="v2-container commercial-explore"><p>More original software, games, and archived technical studies.</p><Link href="/products" className="commercial-text-link">Games & Products ↗</Link></div>
      <InquiryCta />
    </main>
  );
}
