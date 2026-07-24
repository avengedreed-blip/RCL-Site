import type { Metadata } from "next";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { studioEmail, studioEmailHref } from "@/content/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Reed Creative Labs for product, press, and studio inquiries.",
  path: "/contact",
  image: {
    url: "/social-preview.jpg",
    alt: "Reed Creative Labs dark, silver, and gold studio preview.",
    width: 1200,
    height: 630,
  },
});

const inquiryGuidance = [
  "What you are trying to build or solve",
  "Who the work is for",
  "What already exists",
  "Important platform, timing, or delivery constraints",
  "Brand, content, media, domain, or technical materials already available",
];

const contactPaths = [
  {
    label: "Business and services",
    body: "Describe the project, current problem, intended users, and the outcome you need.",
  },
  {
    label: "Products and support",
    body: "Name the product, platform, version or build when known, and what happened.",
  },
  {
    label: "Press",
    body: "Include the outlet, intended coverage, requested material, and relevant timing.",
  },
  {
    label: "Accessibility and security",
    body: "Include the affected route or product and enough detail to reproduce or understand the issue.",
  },
];

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page v2-contact-page">
      <PageHeader
        eyebrow="Contact"
        title="Reach the studio directly"
        body="Reed Creative Labs uses one verified studio address for business, product, press, accessibility, security, and general inquiries."
      />

      <section className="v2-container v2-contact-direct">
        <Reveal className="v2-contact-direct__address">
          <p className="v2-eyebrow">Verified studio email</p>
          <a href={studioEmailHref}>{studioEmail}</a>
          <p>
            Selecting the address opens your email application. The same address
            is provided below in plain text for copying.
          </p>
          <div className="v2-contact-direct__copy">
            <code>{studioEmail}</code>
            <CopyEmailButton email={studioEmail} />
          </div>
        </Reveal>
        <Reveal className="v2-contact-direct__guidance" delay={0.06}>
          <p className="v2-eyebrow">For a useful first message</p>
          <ul>
            {inquiryGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="v2-section-band" aria-labelledby="contact-paths-title">
        <div className="v2-container v2-contact-paths">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Inquiry guidance</p>
            <h2 id="contact-paths-title">One address, clear context.</h2>
            <p>
              The details below help the studio understand the request without
              adding an account system or collecting information through a form.
            </p>
          </Reveal>
          <div className="v2-contact-paths__list">
            {contactPaths.map((path, index) => (
              <Reveal key={path.label} delay={index * 0.04}>
                <article>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{path.label}</h3>
                  <p>{path.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-container v2-contact-privacy">
        <Reveal>
          <p className="v2-eyebrow">Privacy</p>
          <h2>Direct contact without an on-site form.</h2>
          <p>
            This website does not run a public account system or contact-form
            backend. Direct email keeps the collection path visible and avoids
            adding a separate database or form provider.
          </p>
        </Reveal>
      </section>
    </main>
  );
}
