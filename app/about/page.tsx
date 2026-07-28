import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Logo } from "@/components/Logo";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Reed Creative Labs is a veteran-founded, family-built software and engineering studio creating privacy-conscious software, simulations, games, websites, and custom tools.",
  path: "/about",
  image: {
    url: "/social-preview.jpg",
    alt: "Reed Creative Labs dark, silver, and gold studio preview.",
    width: 1200,
    height: 630,
  },
});

const disciplines = [
  {
    title: "AI and engineering tools",
    body: "Systems that help inspect, plan, build, audit, and maintain complex technical work.",
  },
  {
    title: "Scientific software",
    body: "Numerical models and visual systems that make complex behavior observable and teachable.",
  },
  {
    title: "Desktop applications",
    body: "Purpose-built software where local control, performance, and continuity matter.",
  },
  {
    title: "Interactive media",
    body: "Games and simulations built around clear mechanics, feedback, and real-time systems.",
  },
];

const technologyNotes = [
  {
    label: "Web",
    body: "TypeScript, React, Next.js, and static deployment when a smaller runtime surface is the right fit.",
  },
  {
    label: "Numerical",
    body: "Modern Fortran, WebAssembly, and dedicated simulation kernels where the mathematics benefits from a clear boundary.",
  },
  {
    label: "Desktop",
    body: "Native and cross-platform application stacks selected around distribution, performance, and maintainability.",
  },
  {
    label: "Interactive",
    body: "Real-time engines and custom rendering chosen for the requirements of each game, simulation, or visualization.",
  },
];

const principles = [
  "Build around a real problem.",
  "Keep ownership and privacy visible in the architecture.",
  "Use the smallest system that can support the work responsibly.",
  "Treat unfinished products as unfinished products.",
];

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page v2-about-page">
      <PageHeader
        eyebrow="About"
        title="One studio for software, simulation, and interactive systems."
        body="Reed Creative Labs is a veteran-founded, family-built independent software and engineering studio. The work spans different disciplines because the same underlying questions appear across them: how systems behave, how people understand them, and how software can remain useful over time."
      />

      <section className="v2-container v2-about-mission">
        <Reveal className="v2-about-mission__layout">
          <div>
            <Logo
              className="v2-about-mission__logo"
              imageClassName="v2-about-mission__logo-image"
            />
            <p className="v2-eyebrow">Mission</p>
            <h2>
              <span className="v2-about-mission__line">Build tools </span>
              <span className="v2-about-mission__line">that make complex </span>
              <span className="v2-about-mission__line">systems usable </span>
              <span className="v2-about-mission__line">and understandable.</span>
            </h2>
          </div>
          <div className="v2-about-mission__copy">
            <p>
              The studio develops its own products and accepts carefully scoped
              client work. In both cases, the standard is the same: direct
              purpose, maintainable engineering, clear interaction, and honest
              presentation.
            </p>
            <p>
              AI tools, scientific simulation, desktop software, visualization,
              and games belong together here because each asks people to reason
              about a system. The interface may change. The engineering problem
              is still one of state, feedback, constraints, and consequences.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="v2-section-band" aria-labelledby="disciplines-title">
        <div className="v2-container v2-about-disciplines">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Disciplines</p>
            <h2 id="disciplines-title">Different outputs. Shared engineering concerns.</h2>
          </Reveal>
          <div className="v2-about-disciplines__list">
            {disciplines.map((discipline, index) => (
              <Reveal key={discipline.title} delay={index * 0.04}>
                <article>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-container v2-about-technology" aria-labelledby="technology-title">
        <Reveal className="v2-section-intro v2-section-intro--compact">
          <p className="v2-eyebrow">Technology</p>
          <h2 id="technology-title">Tools follow the product.</h2>
          <p>
            Reed Creative Labs does not force every project into one stack.
            Technology is selected around the behavior, distribution, and
            maintenance needs of the work.
          </p>
        </Reveal>
        <dl className="v2-about-technology__ledger">
          {technologyNotes.map((note) => (
            <div key={note.label} className="reveal-enter">
              <dt>{note.label}</dt>
              <dd>{note.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="v2-section-band" aria-labelledby="principles-title">
        <div className="v2-container v2-about-principles">
          <Reveal>
            <p className="v2-eyebrow">Operating principles</p>
            <h2 id="principles-title">A practical standard for the work.</h2>
          </Reveal>
          <ol>
            {principles.map((principle, index) => (
              <li
                key={principle}
                className="reveal-enter"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{principle}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v2-container v2-about-people" aria-labelledby="people-title">
        <Reveal>
          <p className="v2-eyebrow">People</p>
          <h2 id="people-title">A small, family-built studio.</h2>
          <p>
            Reed Creative Labs is built by Aaron and Katy Reed. The longer
            studio story explains how the work fits around family life,
            technical practice, and the decisions behind the products.
          </p>
          <Link className="text-link" href="/about/founder" prefetch={false}>
            Read the founder story
            <ArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
        <ButtonLink href="/contact" variant="contact">
          Contact the Studio
        </ButtonLink>
      </section>
    </main>
  );
}
