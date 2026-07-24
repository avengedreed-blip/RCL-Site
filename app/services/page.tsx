import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Boutique software engineering, scientific simulation, AI integration, interactive media, and website services from Reed Creative Labs.",
  path: "/services",
  image: {
    url: "/social-preview.jpg",
    alt: "Reed Creative Labs dark, silver, and gold studio preview.",
    width: 1200,
    height: 630,
  },
});

const serviceDisciplines = [
  {
    title: "Software Development",
    summary:
      "Focused applications and internal tools designed around a defined operational problem.",
    services: [
      "Native desktop applications",
      "Cross-platform software",
      "Internal business tools",
      "AI-assisted workflows",
    ],
    boundary:
      "Best suited to scoped products with clear owners, workflows, and delivery requirements.",
  },
  {
    title: "Scientific and Engineering Simulation",
    summary:
      "Numerical and visual systems that make technical behavior easier to inspect, teach, and test.",
    services: [
      "Physics simulations",
      "Scientific visualization",
      "Numerical modeling",
      "Educational software",
    ],
    boundary:
      "Models, assumptions, validation needs, and intended use are defined before implementation.",
  },
  {
    title: "AI Solutions",
    summary:
      "Practical integrations that support real work without presenting a model as a substitute for engineering judgment.",
    services: [
      "AI integrations",
      "Custom AI tools",
      "Automation",
      "Internal knowledge systems",
    ],
    boundary:
      "Work is limited to scoped, maintainable systems using supported services and explicit human review.",
  },
  {
    title: "Interactive Media",
    summary:
      "Interactive systems built to explain, explore, teach, or create a focused play experience.",
    services: [
      "Games",
      "Simulations",
      "Visualization",
      "Educational experiences",
    ],
    boundary:
      "The studio prioritizes clear mechanics and technical purpose over speculative content volume.",
  },
  {
    title: "Websites",
    summary:
      "Fast, accessible web experiences for businesses and creators who need a polished, maintainable presence.",
    services: [
      "Premium business websites",
      "Custom web applications",
      "Performance-first design",
      "Optional ongoing maintenance",
    ],
    boundary:
      "Maintenance, hosting, domains, paid services, and third-party costs are quoted separately when they apply.",
  },
];

const processSteps = [
  {
    title: "Define",
    body: "Clarify the problem, users, constraints, existing systems, and what a successful delivery must do.",
  },
  {
    title: "Scope",
    body: "Document deliverables, responsibilities, assumptions, timing, and project-based pricing before work begins.",
  },
  {
    title: "Build",
    body: "Develop against the approved scope with direct communication and review points appropriate to the work.",
  },
  {
    title: "Deliver",
    body: "Prepare the approved product for launch or handoff, including the agreed documentation and ownership terms.",
  },
];

const engagementBoundaries = [
  "No work begins from an inquiry alone. Both parties first accept a written scope.",
  "Large enterprise platforms, safety-critical infrastructure, medical records, banking systems, and 24/7 operational support are outside the current studio scope.",
  "Ownership, licenses, third-party services, hosting, maintenance, and handoff responsibilities are stated in the project agreement.",
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page v2-services-page">
      <PageHeader
        eyebrow="Studio Services"
        title="Engineering services for focused, technically serious work."
        body="Reed Creative Labs is a boutique software and engineering studio. Engagements are scoped directly, documented clearly, and built around a real operational or creative need."
      />

      <section className="v2-container v2-services-intro">
        <Reveal className="v2-services-intro__layout">
          <p className="v2-eyebrow">Working relationship</p>
          <p className="v2-services-intro__statement">
            Small-studio attention, direct technical communication, and a
            written scope before implementation.
          </p>
          <div className="v2-action-row">
            <ButtonLink href="/contact" variant="contact">
              Start a Business Inquiry
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View Product Work
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="v2-section-band" aria-labelledby="service-disciplines-title">
        <div className="v2-container v2-services-disciplines">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Capabilities</p>
            <h2 id="service-disciplines-title">Five working disciplines.</h2>
            <p>
              Each engagement is narrowed to what the studio can deliver and
              support responsibly.
            </p>
          </Reveal>
          <div className="v2-services-ledger">
            {serviceDisciplines.map((discipline, index) => (
              <Reveal
                key={discipline.title}
                className="v2-service-discipline"
                delay={Math.min(index * 0.035, 0.12)}
              >
                <p className="v2-service-discipline__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="v2-service-discipline__identity">
                  <h3>{discipline.title}</h3>
                  <p>{discipline.summary}</p>
                </div>
                <ul>
                  {discipline.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <p className="v2-service-discipline__boundary">
                  {discipline.boundary}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-container v2-services-process" aria-labelledby="process-title">
        <Reveal className="v2-section-intro v2-section-intro--compact">
          <p className="v2-eyebrow">Project process</p>
          <h2 id="process-title">A clear path from inquiry to delivery.</h2>
        </Reveal>
        <ol className="v2-process-ledger">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="reveal-enter"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="v2-section-band" aria-labelledby="boundaries-title">
        <div className="v2-container v2-services-boundaries">
          <Reveal>
            <p className="v2-eyebrow">Engagement boundaries</p>
            <h2 id="boundaries-title">
              Scope is part of the engineering.
            </h2>
          </Reveal>
          <div className="v2-services-boundaries__list">
            {engagementBoundaries.map((boundary, index) => (
              <Reveal key={boundary} delay={index * 0.04}>
                <p>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {boundary}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-container v2-contact-cta" aria-labelledby="service-contact-title">
        <Reveal className="v2-contact-cta__layout">
          <div>
            <p className="v2-eyebrow">Business inquiries</p>
            <h2 id="service-contact-title">Bring the problem, constraints, and desired outcome.</h2>
            <p className="v2-services-cta__body">
              Include what the project is for, what already exists, and any
              timing, platform, or delivery constraints that matter.
            </p>
          </div>
          <ButtonLink href="/contact" variant="contact">
            Contact the Studio
          </ButtonLink>
        </Reveal>
      </section>
    </main>
  );
}
