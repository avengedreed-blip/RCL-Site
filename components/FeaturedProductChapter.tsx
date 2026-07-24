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
  const number = String(index + 1).padStart(2, "0");
  const mediaApproved = project.showcaseMedia?.kind === "approved-image";
  const currentFocus = project.currentFocus?.slice(0, 2) ?? [];

  return (
    <article
      data-product-slug={project.slug}
      className={cn(
        "featured-product-chapter",
        index % 2 === 1 && "featured-product-chapter--reverse",
      )}
    >
      <div className="featured-product-chapter__copy">
        <div className="featured-product-chapter__index" aria-hidden="true">
          {number}
        </div>
        <p className="featured-product-chapter__category">
          {project.categoryLabel}
        </p>
        <h2>{project.name}</h2>
        <p className="featured-product-chapter__description">
          {project.shortDescription}
        </p>
        <dl className="featured-product-chapter__metadata">
          <div>
            <dt>Status</dt>
            <dd>{getStatusLabel(project.status)}</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>{project.platforms.join(" / ")}</dd>
          </div>
        </dl>
        {project.technicalProfile ? (
          <CompactTechnicalProfile profile={project.technicalProfile} />
        ) : null}
        {currentFocus.length > 0 ? (
          <div className="featured-product-chapter__focus">
            <p>Current focus</p>
            <ul>
              {currentFocus.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <Link className="text-link" href={project.route}>
          View product
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <div className="featured-product-chapter__media material-frame">
        <div className="featured-product-chapter__media-header">
          <span>{mediaApproved ? "Verified product media" : "Evidence bay"}</span>
          <span>{mediaApproved ? "Current approved capture" : "Media pending approval"}</span>
        </div>
        <ProductMediaSurface
          project={project}
          priority={index === 0}
          className="featured-product-chapter__surface"
        />
      </div>
    </article>
  );
}
