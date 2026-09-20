import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ForgefieldShowcase } from "@/components/ForgefieldShowcase";
import { FortranFlowHero } from "@/components/FortranFlowHero";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reed Creative Labs | Software, Simulation & Interactive Systems",
  description:
    "The studio behind Forgefield, living procedural worlds for Windows. Reed Creative Labs builds unusual software, premium websites, and focused custom systems.",
  path: "/",
  image: {
    url: "/og-image.jpg",
    alt: "Reed Creative Labs social preview with dark, silver, and gold branding.",
    width: 1200,
    height: 630,
  },
});

const capabilities = [
  {
    title: "Software Development",
    body: "Desktop applications, cross-platform tools, and focused internal software.",
  },
  {
    title: "Scientific Simulation",
    body: "Physics models, scientific visualization, numerical work, and educational software.",
  },
  {
    title: "AI Solutions",
    body: "Practical AI integrations, engineering workflows, automation, and internal tools.",
  },
  {
    title: "Interactive Media",
    body: "Games, simulations, visualization, and learning experiences.",
  },
  {
    title: "Websites",
    body: "Performance-focused websites and maintainable web applications.",
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-home">
      <section className="v2-hero">
        <div className="v2-container v2-hero__layout">
          <div className="v2-hero__copy v2-hero__copy--enter">
            <Logo
              className="v2-hero__logo"
              imageClassName="v2-hero__logo-image"
              priority
            />
            <p className="v2-eyebrow">
              Reed Creative Labs · Software Engineering Studio · South Carolina
            </p>
            <h1>Building software that explores complex systems.</h1>
            <p className="v2-hero__body v2-hero__services-copy">
              The studio behind Forgefield. Original software and real-time
              systems, alongside premium websites and focused custom software.
            </p>
            <div className="v2-action-row">
              <ButtonLink href="#featured-products">
                Explore Forgefield
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                View Services
              </ButtonLink>
            </div>
            <p className="v2-hero__principle">
              Runtime simulation, not pre-rendered media.
            </p>
          </div>
          <FortranFlowHero />
        </div>
      </section>

      <section
        id="featured-products"
        className="forgefield-home"
        aria-labelledby="featured-products-title"
      >
        <ForgefieldShowcase />
        <div className="v2-container forgefield-more">
          <p>
            Explore the studio’s range through selected R&amp;D and smaller
            mobile projects.
          </p>
          <Link className="text-link" href="/products">
            More from RCL
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="v2-section-band" aria-labelledby="capabilities-title">
        <div className="v2-container v2-capabilities">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Studio capabilities</p>
            <h2 id="capabilities-title">From product work to your project.</h2>
            <p>
              The same systems thinking informs client work: define the problem,
              build carefully, and verify behavior. Privacy, ownership, and
              maintainability stay part of the brief.
            </p>
            <Link className="text-link" href="/services">
              Explore studio services
              <ArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
          <div className="v2-capabilities__list">
            {capabilities.map((capability, index) => (
              <Reveal
                key={capability.title}
                className="v2-capability-row"
                delay={Math.min(index * 0.035, 0.12)}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="v2-container v2-contact-cta"
        aria-labelledby="contact-title"
      >
        <Reveal className="v2-contact-cta__layout">
          <div>
            <p className="v2-eyebrow">Start a conversation</p>
            <h2 id="contact-title">Have a system worth building?</h2>
          </div>
          <ButtonLink href="/contact" variant="contact">
            Contact the Studio
          </ButtonLink>
        </Reveal>
      </section>
    </main>
  );
}
