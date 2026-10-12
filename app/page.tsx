import {
  forgefieldLaunch,
  forgefieldReleaseDate,
  forgefieldPrice,
  forgefieldLaunchSummary,
  forgefieldCampaign,
} from "@/content/forgefield";
import { ForgefieldSteamLink } from "@/components/ForgefieldSteamLink";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ForgefieldShowcase } from "@/components/ForgefieldShowcase";
import { PhaseArcadeShowcase } from "@/components/PhaseArcadeShowcase";
import { FortranFlowHero } from "@/components/FortranFlowHero";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reed Creative Labs | Software, Simulation & Interactive Systems",
  description: `Forgefield: real-time generative particle worlds. ${forgefieldLaunchSummary} From Reed Creative Labs, a software and creative technology studio.`,
  path: "/",
  image: {
    url: "/images/social/forgefield-2026-09-20.jpg",
    alt: "Forgefield Eventide: a live-rendered black-hole world from Reed Creative Labs.",
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
      <section className="v2-hero forgefield-campaign-hero">
        <div className="v2-container v2-hero__layout">
          <div className="v2-hero__copy v2-hero__copy--enter">
            <Logo
              className="v2-hero__logo"
              imageClassName="v2-hero__logo-image"
              priority
            />
            <p className="v2-eyebrow">RCL flagship · Windows 11</p>
            <h1>FORGEFIELD</h1>
            <p className="forgefield-deck">Nine worlds. Your desktop, alive.</p>
            <p className="v2-hero__body">
              Real-time animated wallpapers and screensavers for Windows.
              Procedural worlds, rendered live on your desktop.
            </p>
            <p className="forgefield-hero-launch">
              <span>{forgefieldCampaign.dateLabel}</span>
              <time dateTime={forgefieldLaunch.releaseDate}>
                {forgefieldReleaseDate}
              </time>
              <strong>{forgefieldPrice} USD</strong>
            </p>
            <div className="v2-action-row">
              <ForgefieldSteamLink />
              <ButtonLink
                href="/projects/forgefield"
                variant="ghost"
                prefetch={false}
              >
                Explore the Worlds
              </ButtonLink>
            </div>
            <p className="v2-hero__principle">
              Original software from RCL.{" "}
              <Link href="/services">Explore studio services</Link>.
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

      <PhaseArcadeShowcase />

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
            <div className="v2-capabilities__partner">
              <p>Building for a client?</p>
              <Link className="text-link" href="/agency-partners">
                Explore agency partnerships
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
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
