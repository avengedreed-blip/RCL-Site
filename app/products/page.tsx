import type { Metadata } from "next";
import { FeaturedProductChapter } from "@/components/FeaturedProductChapter";
import { ProductLedger } from "@/components/ProductLedger";
import { Reveal } from "@/components/Reveal";
import {
  featuredProjects,
  includedGames,
  projects,
  roadmapDisclaimer,
} from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore Reed Creative Labs software, games, tools, active development projects, and future roadmap.",
  path: "/products",
  image: {
    url: "/images/social/phase-arcade-volume-1.jpg",
    alt: "Reed Creative Labs products, including Forge, Phase Arcade Volume I, and RCL Science Lab.",
    width: 1200,
    height: 630,
  },
});

export default function ProductsPage() {
  const featuredSlugs = new Set(featuredProjects.map((project) => project.slug));
  const includedSlugs = new Set(includedGames.map((project) => project.slug));
  const currentProjects = projects.filter(
    (project) =>
      project.status === "active-development" &&
      !featuredSlugs.has(project.slug) &&
      !includedSlugs.has(project.slug),
  );
  const conceptProjects = projects.filter(
    (project) =>
      project.status === "concept" &&
      !featuredSlugs.has(project.slug) &&
      !includedSlugs.has(project.slug),
  );

  return (
    <main id="main-content" tabIndex={-1} className="v2-catalog">
      <header className="v2-container v2-catalog-hero">
        <Reveal>
          <p className="v2-eyebrow">Products</p>
          <h1>Software, simulation, and games built around real systems.</h1>
          <p>
            An evidence-led view of what the studio is building now, shown with
            current public status and approved product media.
          </p>
        </Reveal>
      </header>

      <section
        className="v2-container v2-catalog-featured"
        aria-labelledby="catalog-featured-title"
      >
        <Reveal className="v2-catalog-featured__intro">
          <h2 id="catalog-featured-title" className="v2-eyebrow">
            Featured products
          </h2>
          <p>Selected work, presented with verified status and approved media.</p>
        </Reveal>
        <div className="v2-product-chapters">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.04, 0.12)}>
              <FeaturedProductChapter project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="v2-section-band">
        <div className="v2-container v2-catalog-ledger-section">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Phase Arcade Volume I</p>
            <h2 id="included-games-title">Three included games.</h2>
            <p>
              Phase Shift, Phase Breaker, and Phase Court are parts of one
              desktop and VR collection.
            </p>
          </Reveal>
          <ProductLedger projects={includedGames} labelledBy="included-games-title" />
        </div>
      </section>

      <section className="v2-container v2-catalog-ledgers">
        <div className="v2-catalog-ledger-section">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Current work</p>
            <h2 id="active-products-title">Active development.</h2>
          </Reveal>
          <ProductLedger projects={currentProjects} labelledBy="active-products-title" />
        </div>
        <div className="v2-catalog-ledger-section">
          <Reveal className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Early work</p>
            <h2 id="concept-products-title">Verified concepts.</h2>
          </Reveal>
          <ProductLedger projects={conceptProjects} labelledBy="concept-products-title" />
        </div>
        <p className="v2-catalog-disclaimer">
          {roadmapDisclaimer}
        </p>
      </section>
    </main>
  );
}
