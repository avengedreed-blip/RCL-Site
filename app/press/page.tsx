import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { studioEmail, studioEmailHref } from "@/content/contact";
import { featuredProjects, getProjectDateLabel } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

const featuredProductNames = featuredProjects
  .map((project) => project.name)
  .join(", ");

export const metadata: Metadata = buildMetadata({
  title: "Press",
  description:
    "Press information, studio boilerplate, and product references for Reed Creative Labs.",
  path: "/press",
  image: {
    url: "/social-preview.jpg",
    alt: "Reed Creative Labs dark, silver, and gold social preview artwork.",
  },
});

export default function PressPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="v2-info-page v2-press-page"
    >
      <PageHeader
        eyebrow="Press"
        title="Reed Creative Labs press information"
        body="A concise reference for coverage, listings, and product context. For media requests, use the studio contact address."
      />

      <section className="v2-container v2-press-reference">
        <Reveal className="v2-press-contact">
          <p className="v2-eyebrow">Press contact</p>
          <h2>Review requests, interviews, and product coverage.</h2>
          <a href={studioEmailHref}>{studioEmail}</a>
          <div className="v2-contact-direct__copy">
            <code>{studioEmail}</code>
            <CopyEmailButton email={studioEmail} />
          </div>
        </Reveal>
        <Reveal className="v2-press-boilerplate" delay={0.06}>
          <p className="v2-eyebrow">Studio boilerplate</p>
          <p>
            Reed Creative Labs is an independent software and engineering studio
            building tools, simulations, desktop software, games, websites, and
            custom software with privacy, ownership, and lasting value in mind.
            Current featured products include {featuredProductNames}.
          </p>
        </Reveal>
      </section>

      <section
        className="v2-section-band"
        aria-labelledby="press-references-title"
      >
        <div className="v2-container v2-press-products">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Featured references</p>
            <h2 id="press-references-title">Current product context.</h2>
            <p>
              Each product page has a summary, current development status, and
              images where available.
            </p>
          </Reveal>
          <ul className="v2-press-products__list">
            {featuredProjects.map((project, index) => (
              <li
                key={project.slug}
                className="reveal-enter"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <Link href={project.route}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p>{getProjectDateLabel(project)}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <p>{project.shortDescription}</p>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
