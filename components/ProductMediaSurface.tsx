import Image from "next/image";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

type ProductMediaSurfaceProps = {
  project: Project;
  className?: string;
  priority?: boolean;
  sizes?: string;
  variant?: "chapter" | "detail";
};

export function ProductMediaSurface({
  project,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 62vw, 100vw",
  variant = "chapter",
}: ProductMediaSurfaceProps) {
  const media = project.showcaseMedia;
  const isDetail = variant === "detail";

  if (!media || media.kind === "placeholder") {
    const message =
      media?.kind === "placeholder" ? media.message : "Images coming soon.";
    const alt =
      media?.kind === "placeholder"
        ? media.alt
        : `${project.name} does not yet have approved public imagery.`;

    return (
      <div
        role="img"
        aria-label={alt}
        data-media-state="placeholder"
        className={cn(
          "product-media-surface product-media-surface--placeholder",
          "material-sealed-bay",
          isDetail && "product-media-surface--detail",
          className,
        )}
      >
        <p className="product-media-placeholder__watermark" aria-hidden="true">
          {project.name}
        </p>
        <div className="product-media-placeholder__corners" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="product-media-placeholder__rule" aria-hidden="true" />
        <div className="product-media-placeholder__content">
          <p>Public media review</p>
          <span>{message}</span>
        </div>
        <p className="product-media-placeholder__status">
          No concept imagery substituted
        </p>
      </div>
    );
  }

  return (
    <figure
      data-media-state="approved-image"
      className={cn(
        "product-media-surface product-media-surface--image",
        "material-media-frame",
        isDetail && "product-media-surface--detail",
        className,
      )}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        style={{ objectPosition: media.position }}
        className={cn(
          media.fit === "contain" ? "object-contain" : "object-cover",
        )}
      />
      <span className="product-media-surface__shade" aria-hidden="true" />
      {media.caption ? (
        <figcaption className="product-media-surface__caption">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
