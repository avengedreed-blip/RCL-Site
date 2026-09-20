import type { Metadata } from "next";
import { ForgefieldShowcase } from "@/components/ForgefieldShowcase";
import { ProductLedger } from "@/components/ProductLedger";
import { Reveal } from "@/components/Reveal";
import { archivedProjects, mobileProjects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products & Selected R&D",
  description:
    "Forgefield leads Reed Creative Labs: procedural worlds for Windows, with smaller mobile projects and archived technical experiments from the studio.",
  path: "/products",
  image: {
    url: "/images/social/forgefield-2026-09-20.jpg",
    alt: "Eventide, a procedural world in Forgefield",
    width: 1200,
    height: 630,
  },
});

export default function ProductsPage() {
  const selected = archivedProjects.filter(
    (project) => project.technicalProfile,
  );
  const history = archivedProjects.filter(
    (project) => !project.technicalProfile,
  );
  return (
    <main id="main-content" tabIndex={-1} className="v2-catalog">
      <header className="v2-container v2-catalog-hero">
        <Reveal>
          <p className="v2-eyebrow">Products & selected R&D</p>
          <h1>
            Broad curiosity.
            <br />
            Deliberate focus.
          </h1>
          <p>
            Forgefield is the studio’s primary product. Smaller mobile projects
            and selected technical experiments show the range of the work behind
            it.
          </p>
        </Reveal>
      </header>
      <section
        className="forgefield-catalog"
        aria-labelledby="featured-products-title"
      >
        <ForgefieldShowcase includeWorldStudy={false} />
      </section>
      <section
        className="v2-container v2-catalog-ledgers"
        aria-label="More from Reed Creative Labs"
      >
        <div className="v2-catalog-ledger-section">
          <div className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Selected R&D</p>
            <h2 id="research-products-title">Experiments with substance.</h2>
            <p>
              Archived prototypes in structural simulation, native rendering,
              and desktop/VR interaction. Technical evidence, with no current
              release commitment.
            </p>
          </div>
          <ProductLedger
            projects={selected}
            labelledBy="research-products-title"
          />
        </div>
        <div className="v2-catalog-ledger-section">
          <div className="v2-section-intro v2-section-intro--compact">
            <p className="v2-eyebrow">Smaller projects</p>
            <h2 id="mobile-products-title">More from RCL.</h2>
            <p>
              Mobile work remains a smaller part of the studio. These projects
              are not yet publicly released; availability is announced only when
              confirmed.
            </p>
          </div>
          <ProductLedger
            projects={mobileProjects}
            labelledBy="mobile-products-title"
          />
        </div>
        <details className="studio-archive">
          <summary>
            From the archive <span>Earlier concepts and project studies</span>
          </summary>
          <p id="archive-products-title">
            Historical work, retained for context. No active release
            commitments.
          </p>
          <ProductLedger
            projects={history}
            labelledBy="archive-products-title"
          />
        </details>
      </section>
    </main>
  );
}
