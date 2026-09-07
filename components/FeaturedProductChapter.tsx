import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductMediaSurface } from "@/components/ProductMediaSurface";
import { CompactTechnicalProfile } from "@/components/TechnicalProfile";
import type { Project } from "@/content/projects";
import { getStatusLabel } from "@/content/projects";
import { cn } from "@/lib/utils";

type FeaturedProductChapterProps = {
  project: Project;
  index: number;
};

export function FeaturedProductChapter({
  project,
  index,
}: FeaturedProductChapterProps) {
  const hasMedia = project.showcaseMedia?.kind === "approved-image";
  const treatment =
    project.chapterTreatment ?? (hasMedia ? "feature" : "development");
  const currentFocus =
    treatment === "development"
      ? (project.currentFocus?.slice(0, 2) ?? [])
      : [];
  const action =
    treatment === "lead"
      ? `Explore ${project.name}`
      : treatment === "development" || treatment === "brief"
        ? "View development"
        : "Explore the collection";

  return (
    <article
      data-product-slug={project.slug}
      data-treatment={treatment}
      data-has-media={hasMedia}
      className={cn(
        "featured-product-chapter",
        hasMedia && index % 2 === 1 && "featured-product-chapter--reverse",
      )}
    >
      <div className="featured-product-chapter__copy">
        <div className="featured-product-chapter__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </div>
        <p className="featured-product-chapter__category">
          {project.categoryLabel}
        </p>
        <h2>{project.name}</h2>
        <p className="featured-product-chapter__status">
          {getStatusLabel(project.status)}
        </p>
        <p className="featured-product-chapter__description">
          {project.shortDescription}
        </p>
      </div>
      {hasMedia ? (
        <div className="featured-product-chapter__media material-frame">
          <ProductMediaSurface
            project={project}
            className="featured-product-chapter__surface"
          />
        </div>
      ) : null}
      <div className="featured-product-chapter__details">
        <dl className="featured-product-chapter__metadata">
          <div>
            <dt>Platform</dt>
            <dd>{project.platforms.join(" / ")}</dd>
          </div>
        </dl>
        {project.technicalProfile && treatment !== "brief" ? (
          <CompactTechnicalProfile profile={project.technicalProfile} />
        ) : null}
        {currentFocus.length ? (
          <div className="featured-product-chapter__focus">
            <p>Current focus</p>
            <ul>
              {currentFocus.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <Link
          className="text-link"
          href={project.route}
          aria-label={`${action}: ${project.name}`}
        >
          {action}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
