import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductMediaSurface } from "@/components/ProductMediaSurface";
import { Reveal } from "@/components/Reveal";
import { StructuredData } from "@/components/StructuredData";
import { TechnicalProfile } from "@/components/TechnicalProfile";
import {
  forgeColleagues,
  forgeWorkflow,
} from "@/content/forge";
import { phaseArcadeGames } from "@/content/phase-arcade";
import {
  getStatusLabel,
  type Project,
} from "@/content/projects";
import { getProjectScreenshots } from "@/lib/project-media";
import { projectJsonLd } from "@/lib/structured-data";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

function getGallery(project: Project): readonly GalleryImage[] {
  if (project.slug === "phase-arcade-volume-1") {
    return phaseArcadeGames.map((game) => ({
      src: game.image,
      alt: game.alt,
      caption: `${game.name} — real desktop gameplay captured from the current build.`,
    }));
  }

  return getProjectScreenshots(project.visual);
}

function ProjectRecord({ project }: { project: Project }) {
  return (
    <aside className="v2-product-record" aria-label={`${project.name} project record`}>
      <p className="v2-eyebrow">Project record</p>
      <dl>
        <div>
          <dt>Status</dt>
          <dd>{getStatusLabel(project.status)}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{project.categoryLabel}</dd>
        </div>
        <div>
          <dt>Platforms</dt>
          <dd>{project.platforms.join(" / ")}</dd>
        </div>
      </dl>
      <p className="v2-product-record__media">
        {project.showcaseMedia?.kind === "placeholder"
          ? `${project.showcaseMedia.message} No concept imagery substituted.`
          : "Approved product media"}
      </p>
    </aside>
  );
}

function ForgeFeatureDetail() {
  return (
    <>
      <ol className="v2-workflow" aria-label="Forge engineering workflow">
        {forgeWorkflow.map((stage, index) => (
          <li key={stage.title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
          </li>
        ))}
      </ol>
      <div className="v2-colleague-list">
        {forgeColleagues.map((colleague) => (
          <article key={colleague.name}>
            <p>{colleague.role}</p>
            <h3>{colleague.name}</h3>
            <p>{colleague.body}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export function FlagshipProductPage({ project }: { project: Project }) {
  const gallery = getGallery(project);
  const hasApprovedHero = project.showcaseMedia?.kind === "approved-image";
  const features = project.features ?? project.usersCan ?? [];
  const isConcept = project.status === "concept";
  const statusDescription =
    project.status === "prototype"
      ? "This is a functioning development prototype, not a playable, downloadable, or release-ready public build."
      : isConcept
        ? "This project is in preproduction. Its public page describes a verified direction, not an implemented product."
        : "The product is under active development. Public release timing has not been announced.";

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="v2-product-page"
      data-product={project.slug}
    >
      <StructuredData data={projectJsonLd(project)} />

      <section className="v2-container v2-product-hero">
        <Reveal className="v2-product-hero__copy">
          <p className="v2-eyebrow">
            {getStatusLabel(project.status)} · {project.categoryLabel}
          </p>
          <h1>{project.name}</h1>
          <p className="v2-product-hero__tagline">{project.tagline}</p>
          <div className="v2-action-row">
            <ButtonLink href="/projects" variant="secondary">
              All Products
            </ButtonLink>
            <ButtonLink href="/contact" variant="contact">
              Contact the Studio
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="v2-product-hero__media">
          {hasApprovedHero ? (
            <ProductMediaSurface
              project={project}
              variant="detail"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          ) : (
            <ProjectRecord project={project} />
          )}
        </Reveal>
      </section>

      <section className="v2-container v2-product-mission" aria-labelledby="mission-title">
        <Reveal>
          <p className="v2-eyebrow">Mission</p>
          <h2 id="mission-title">{project.headline}</h2>
          <p className="v2-product-mission__lead">{project.longDescription}</p>
        </Reveal>
        <div className="v2-product-notes">
          {project.pageSections.map((section, index) => (
            <Reveal key={section.title} delay={Math.min(index * 0.04, 0.12)}>
              <article>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="v2-section-band v2-product-status"
        aria-labelledby="project-status-title"
      >
        <div className="v2-container">
          <Reveal>
            <p className="v2-eyebrow">Project status</p>
            <div className="v2-product-status__layout">
              <h2 id="project-status-title">{getStatusLabel(project.status)}</h2>
              <p>{statusDescription}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {project.currentFocus?.length ? (
        <section className="v2-container v2-product-section" aria-labelledby="current-focus-title">
          <Reveal className="v2-product-section__intro">
            <p className="v2-eyebrow">Current focus</p>
            <h2 id="current-focus-title">What the studio is working through now.</h2>
          </Reveal>
          <ol className="v2-fact-list">
            {project.currentFocus.map((item, index) => (
              <li
                key={item}
                className="reveal-enter"
                style={{ animationDelay: `${Math.min(index * 0.04, 0.12)}s` }}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {project.milestones?.length ? (
        <section className="v2-container v2-product-section" aria-labelledby="roadmap-title">
          <Reveal className="v2-product-section__intro">
            <p className="v2-eyebrow">Roadmap</p>
            <h2 id="roadmap-title">Progress without invented dates.</h2>
          </Reveal>
          <ol className="v2-roadmap">
            {project.milestones.map((milestone, index) => (
              <li
                key={milestone.title}
                className="reveal-enter"
                data-state={milestone.state}
                style={{ animationDelay: `${Math.min(index * 0.04, 0.12)}s` }}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{milestone.title}</h3>
                <p>{milestone.state}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {features.length || project.slug === "forge" ? (
        <section className="v2-section-band" aria-labelledby="features-title">
          <div className="v2-container v2-product-section">
            <Reveal className="v2-product-section__intro">
              <p className="v2-eyebrow">{isConcept ? "Planned systems" : "Features"}</p>
              <h2 id="features-title">
                {isConcept
                  ? "The verified direction for the product."
                  : "The work the product is organized to support."}
              </h2>
            </Reveal>
            {features.length ? (
              <ul className="v2-feature-list">
                {features.map((feature, index) => (
                  <li
                    key={feature}
                    className="reveal-enter"
                    style={{ animationDelay: `${Math.min(index * 0.035, 0.12)}s` }}
                  >
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            {project.slug === "forge" ? <ForgeFeatureDetail /> : null}
          </div>
        </section>
      ) : null}

      {project.technicalProfile ? (
        <section className="v2-container v2-product-section" aria-labelledby="technical-profile-title">
          <Reveal className="v2-product-section__intro">
            <p className="v2-eyebrow">
              {isConcept ? "Current technical foundation" : "Engineering"}
            </p>
            <h2 id="technical-profile-title">
              {isConcept
                ? "Implemented systems in the working prototype."
                : "Technical profile."}
            </h2>
          </Reveal>
          <TechnicalProfile
            profile={project.technicalProfile}
            productSlug={project.slug}
          />
        </section>
      ) : null}

      <section className="v2-container v2-product-section" aria-labelledby="gallery-title">
        <Reveal className="v2-product-section__intro">
          <p className="v2-eyebrow">Gallery</p>
          <h2 id="gallery-title">Verified product media.</h2>
        </Reveal>
        {gallery.length ? (
          <div className="v2-product-gallery">
            {gallery.map((image, index) => (
              <Reveal key={image.src} delay={Math.min(index * 0.04, 0.12)}>
                <figure>
                  <div className="v2-product-gallery__image">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <ProductMediaSurface
              project={project}
              variant="detail"
              className="v2-product-gallery__placeholder"
            />
          </Reveal>
        )}
      </section>

      <section className="v2-container v2-product-final" aria-labelledby="product-final-title">
        <Reveal>
          <p className="v2-eyebrow">Product inquiry</p>
          <h2 id="product-final-title">Follow the work without pretending it is finished.</h2>
          <p>
            Contact Reed Creative Labs for product, development, or press inquiries.
          </p>
          <ButtonLink href="/contact" variant="contact">
            Contact the Studio
          </ButtonLink>
        </Reveal>
      </section>
    </main>
  );
}
