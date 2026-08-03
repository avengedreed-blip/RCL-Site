import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Custom Software & Website Services",
  description:
    "Premium websites, focused custom software, desktop applications, and interactive data visualization from Reed Creative Labs.",
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
    title: "Premium Websites",
    summary:
      "Custom, responsive websites built around the client's business, brand, audience, content, and goals.",
    services: [
      "New business websites and redesigns",
      "Responsive, accessibility-minded implementation",
      "Performance, search, and metadata foundations",
      "Contact, quote, and established service integrations",
      "Deployment guidance and documented handoff",
    ],
    boundary:
      "The work is designed and implemented for the project. RCL does not sell template swaps as custom websites or promise search rankings, conversions, or business growth.",
  },
  {
    title: "Custom Software",
    summary:
      "Focused software built to simplify a defined operational problem or replace a repetitive, spreadsheet-heavy workflow.",
    services: [
      "Internal business and workflow tools",
      "Data import, export, and reporting systems",
      "Lightweight customer or job-management tools",
      "Local-first applications",
      "Purpose-built utilities and automation",
    ],
    boundary:
      "Best suited to maintainable tools with clear users, workflows, data responsibilities, and scope rather than open-ended enterprise platforms.",
  },
  {
    title: "Desktop Applications",
    summary:
      "Focused Windows-first or cross-platform desktop software for work that benefits from local storage, offline use, or direct file access.",
    services: [
      "Local-first and offline workflows",
      "File import and export",
      "Reporting and data visualization",
      "Focused interfaces and packaging",
      "Windows-first or cross-platform delivery where appropriate",
    ],
    boundary:
      "Platform support, installers, update behavior, storage, and handoff requirements are confirmed during scoping rather than assumed for every project.",
  },
  {
    title: "Data Visualization & Interactive Software",
    summary:
      "Interactive tools that help people inspect complex information, processes, simulations, or technical data.",
    services: [
      "Interactive data exploration",
      "Process and systems visualization",
      "Educational and explanatory software",
      "Simulation interfaces",
      "Technical prototypes and focused experiences",
    ],
    boundary:
      "The project defines its data sources, assumptions, intended use, and validation needs. Visual presentation alone is not represented as formal scientific validation.",
  },
];

const audiences = [
  "Small businesses",
  "Independent professionals",
  "Creators",
  "Small organizations",
  "Technical founders",
  "Teams with a clearly defined problem",
];

const goodProjects = [
  "A small business needs a polished website that better represents the quality of its work.",
  "An existing site is outdated, slow, confusing, or difficult to use on mobile.",
  "A team relies on spreadsheets or repetitive manual steps that could be simplified.",
  "A business needs a focused internal tool rather than a large enterprise platform.",
  "A technical concept needs a clear interactive visualization.",
  "A desktop utility needs to work reliably without unnecessary cloud infrastructure.",
];

const processSteps = [
  {
    title: "Initial Conversation",
    body: "Understand the business, users, problem, constraints, existing material, and desired outcome.",
  },
  {
    title: "Scope and Proposal",
    body: "Define deliverables, exclusions, dependencies, responsibilities, estimated timing, and project-based pricing in writing.",
  },
  {
    title: "Design and Development",
    body: "Build the approved work in defined stages with review points appropriate to the project.",
  },
  {
    title: "Testing and Validation",
    body: "Check core workflows, responsive behavior, accessibility, performance, and release behavior where they apply.",
  },
  {
    title: "Launch and Handoff",
    body: "Deploy or package the finished work, provide agreed documentation, and transfer the access or ownership defined in the proposal.",
  },
  {
    title: "Ongoing Work",
    body: "Future updates, maintenance, support, and additional features are scoped separately unless the original agreement includes them.",
  },
];

const scopeLimitations = [
  "Large enterprise platforms or massive multi-team systems",
  "Social networks and complex marketplaces",
  "Regulated medical, legal, or financial systems",
  "Projects requiring RCL to operate extensive always-on cloud infrastructure",
  "Custom payment-processing infrastructure",
  "Open-ended engagements without a defined scope",
  "Unsupported third-party systems",
  "Work with unclear ownership of content, code, assets, or data",
];

const responsibilityRows = [
  {
    title: "Domain and hosting",
    body: "Clients should own their domain and, where practical, their hosting account. RCL can assist with configuration and deployment within the agreed scope.",
  },
  {
    title: "Third-party services",
    body: "Payment, analytics, scheduling, email, commerce, and similar accounts should remain client-owned. RCL may configure established services when the project calls for them.",
  },
  {
    title: "Maintenance and fees",
    body: "Hosting administration, content updates, maintenance, support, and third-party fees are not automatically included unless the written proposal lists them.",
  },
  {
    title: "Ownership and licensing",
    body: "The agreement defines ownership and licensing for custom code, design work, client-provided material, and third-party components before development begins.",
  },
];

const faqs = [
  {
    question: "Do you work with small businesses?",
    answer:
      "Yes. RCL is well suited to small businesses, independent professionals, creators, and organizations that need focused, high-quality work and direct communication with the person building it.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. A redesign can address structure, usability, responsive behavior, performance, accessibility, visual presentation, and content organization. The scope depends on the existing site, available content, and systems that must remain connected.",
  },
  {
    question: "Do you build custom software?",
    answer:
      "Yes. RCL builds focused internal tools, workflow applications, desktop utilities, reporting systems, data tools, and local-first software when the problem and operating requirements can be clearly defined.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "RCL can assist with setup and deployment, but generally prefers client-owned hosting, domain, and service accounts. Ongoing administration is included only when it is separately scoped.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is scoped and quoted individually. Cost depends on complexity, pages or workflows, integrations, design requirements, testing, schedule, and expected support. A written scope and quote are provided before development begins.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timing depends on scope, content readiness, feedback speed, integrations, and technical complexity. The proposal provides an estimated schedule after those factors are understood; RCL does not promise one universal turnaround.",
  },
  {
    question: "Who owns the finished work?",
    answer:
      "Ownership and licensing are defined in the project agreement. The proposal identifies the treatment of custom code, design work, client-supplied assets, and third-party components before work begins.",
  },
  {
    question: "Can you maintain the project after launch?",
    answer:
      "Potentially. Maintenance, support, content updates, and additional development are scoped separately unless the original agreement explicitly includes them.",
  },
  {
    question: "Do you build e-commerce or booking systems?",
    answer:
      "RCL may integrate established hosted commerce, payment, or scheduling services when they fit the project. The studio does not currently position itself as a builder of large custom commerce or payment infrastructure.",
  },
  {
    question: "What do you need before starting?",
    answer:
      "A useful first conversation covers the business or organization, intended users, the problem to solve, what already exists, required content or data, known integrations, constraints, timing, and who can approve decisions.",
  },
];

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page v2-services-page">
      <PageHeader
        eyebrow="Studio Services"
        title="Custom software and premium websites, built with product-level care."
        body="Reed Creative Labs works with small businesses, independent professionals, creators, and organizations on focused digital projects that need clear design, maintainable engineering, and direct technical communication."
      />

      <section className="v2-container v2-services-intro">
        <Reveal className="v2-services-intro__layout">
          <p className="v2-eyebrow">Client work at RCL</p>
          <div>
            <p className="v2-services-intro__statement">
              The same standards used for RCL products guide client work:
              performance, usability, maintainability, and visual quality.
            </p>
            <p className="v2-services-intro__support">
              Engagements begin with a real problem and a written scope, not a
              generic package or an open-ended promise.
            </p>
          </div>
          <div className="v2-action-row">
            <ButtonLink href="/contact" variant="contact">
              Discuss a Project
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary">
              View Product Work
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="v2-section-band" aria-labelledby="service-disciplines-title">
        <div className="v2-container v2-services-disciplines">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">What we build</p>
            <h2 id="service-disciplines-title">Four focused service areas.</h2>
            <p>
              Each project is narrowed to work the studio can design, build,
              test, and hand off responsibly.
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

      <section className="v2-container v2-services-fit" aria-labelledby="project-fit-title">
        <Reveal className="v2-section-intro">
          <p className="v2-eyebrow">Who we work with</p>
          <h2 id="project-fit-title">Small teams with a problem worth defining well.</h2>
          <p>
            RCL is a small independent studio. Clients work directly with the
            people designing and building the project.
          </p>
        </Reveal>
        <div className="v2-services-fit__layout">
          <Reveal className="v2-services-audience">
            <p className="v2-services-subheading">Best suited for</p>
            <ul>
              {audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
            <p>
              The strongest fit is a client who values custom design,
              maintainability, practical scope, and clear decisions.
            </p>
          </Reveal>
          <Reveal className="v2-services-project-signals" delay={0.05}>
            <p className="v2-services-subheading">What makes a good project</p>
            <ol>
              {goodProjects.map((project, index) => (
                <li key={project}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{project}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="v2-section-band" aria-labelledby="process-title">
        <div className="v2-container v2-services-process">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Our process</p>
            <h2 id="process-title">A defined path from inquiry to handoff.</h2>
            <p>
              Review points and responsibilities are matched to the work. There
              is no assumption of unlimited revisions or indefinite support.
            </p>
          </Reveal>
          <ol className="v2-process-ledger">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                className="reveal-enter"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v2-container v2-services-pricing" aria-labelledby="pricing-title">
        <Reveal>
          <p className="v2-eyebrow">Project-based pricing</p>
          <h2 id="pricing-title">A quote built from the work required.</h2>
        </Reveal>
        <Reveal className="v2-services-pricing__copy" delay={0.05}>
          <p>
            Every project is scoped and quoted individually. Pricing depends on
            complexity, pages or workflows, integrations, design requirements,
            timeline, testing needs, and expected support.
          </p>
          <p>
            After an initial discussion, RCL provides a written project scope,
            estimated timeline, responsibilities, exclusions, and quote before
            development begins.
          </p>
          <p className="v2-services-pricing__qualifier">
            RCL is best suited for clients seeking custom, high-quality work
            rather than template-only or ultra-low-budget solutions.
          </p>
        </Reveal>
      </section>

      <section className="v2-section-band" aria-labelledby="boundaries-title">
        <div className="v2-container v2-services-boundaries">
          <Reveal>
            <p className="v2-eyebrow">Scope and limitations</p>
            <h2 id="boundaries-title">Responsible boundaries are part of the work.</h2>
            <p className="v2-services-boundaries__intro">
              RCL focuses on restrained, well-defined projects where a small
              studio can provide careful implementation and a clear handoff.
              Established third-party services may be integrated when appropriate.
            </p>
          </Reveal>
          <ul className="v2-services-boundaries__list">
            {scopeLimitations.map((boundary, index) => (
              <li
                key={boundary}
                className="reveal-enter"
                style={{ animationDelay: `${Math.min(index * 0.025, 0.12)}s` }}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{boundary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="v2-container v2-services-responsibilities"
        aria-labelledby="responsibilities-title"
      >
        <Reveal className="v2-section-intro v2-section-intro--compact">
          <p className="v2-eyebrow">Hosting, ownership, and services</p>
          <h2 id="responsibilities-title">Accounts and responsibilities stay clear.</h2>
          <p>
            Project-specific details belong in the written proposal. These are
            the studio&apos;s general working expectations.
          </p>
        </Reveal>
        <dl className="v2-services-responsibilities__list">
          {responsibilityRows.map((row, index) => (
            <Reveal key={row.title} delay={index * 0.04}>
              <dt>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {row.title}
              </dt>
              <dd>{row.body}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="v2-section-band" aria-labelledby="services-faq-title">
        <div className="v2-container v2-services-faq">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Frequently asked questions</p>
            <h2 id="services-faq-title">What to expect before work begins.</h2>
          </Reveal>
          <div className="v2-services-faq__list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-container v2-contact-cta" aria-labelledby="service-contact-title">
        <Reveal className="v2-contact-cta__layout">
          <div>
            <p className="v2-eyebrow">Have a focused project in mind?</p>
            <h2 id="service-contact-title">Tell us what you are trying to build.</h2>
            <p className="v2-services-cta__body">
              Include the problem it should solve, who it is for, what already
              exists, and any constraints you already know about.
            </p>
          </div>
          <ButtonLink href="/contact" variant="contact">
            Discuss a Project
          </ButtonLink>
        </Reveal>
      </section>
    </main>
  );
}
