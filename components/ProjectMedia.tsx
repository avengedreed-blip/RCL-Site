import Image from "next/image";
import type { ProjectVisual } from "@/content/projects";
import { cn } from "@/lib/utils";

type VisualImage = {
  src?: string;
  alt: string;
  position?: string;
  fit?: "cover" | "contain";
  cardMode?: "image" | "abstract";
  detailSrc?: string;
  detailAlt?: string;
  detailFit?: "cover" | "contain";
  detailPosition?: string;
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
};

const visualImages: Partial<Record<ProjectVisual, VisualImage>> = {
  forge: {
    src: "/images/social/forge.jpg",
    alt: "Abstract Forge brand artwork.",
    cardMode: "abstract",
  },
  "phase-arcade": {
    src: "/images/home/phase-arcade-card.jpg",
    alt: "Abstract arcade collection identity artwork representing Phase Arcade Volume I.",
    position: "object-center",
    cardMode: "abstract",
    screenshots: [
      {
        src: "/images/projects/phase-shift-gameplay-01.webp",
        alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
        caption: "Phase Shift — desktop gameplay capture from the current build.",
      },
      {
        src: "/images/projects/phase-breaker-gameplay-01.webp",
        alt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
        caption: "Phase Breaker — desktop gameplay capture from the current build.",
      },
      {
        src: "/images/projects/phase-court-gameplay-01.webp",
        alt: "Phase Court gameplay showing the court, paddles, and ball in motion.",
        caption: "Phase Court — desktop gameplay capture from the current build.",
      },
    ],
  },
  "phase-shift": {
    src: "/images/projects/phase-shift-gameplay-01.webp",
    alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
    position: "object-center",
    detailSrc: "/images/projects/phase-shift-gameplay-01.webp",
    detailAlt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
    detailFit: "contain",
  },
  "phase-breaker": {
    src: "/images/social/phase-breaker-coming-soon.jpg",
    alt: "Abstract Phase Breaker brand artwork.",
    cardMode: "abstract",
    detailSrc: "/images/projects/phase-breaker-gameplay-01.webp",
    detailAlt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
    detailFit: "contain",
  },
  "phase-court": {
    src: "/images/projects/phase-court-gameplay-01.webp",
    alt: "Phase Court gameplay showing the court, paddles, and ball in motion.",
    position: "object-center",
    detailSrc: "/images/projects/phase-court-gameplay-01.webp",
    detailAlt: "Phase Court gameplay showing the court, paddles, and ball in motion.",
    detailFit: "contain",
  },
  "phase-arcade-2": {
    src: "/images/social/phase-arcade-volume-2.jpg",
    alt: "Phase Arcade Volume II social preview artwork.",
    cardMode: "abstract",
  },
  "pigs-can-fly": {
    src: "/images/social/pigs-can-fly.jpg",
    alt: "Pigs Can Fly? social preview artwork.",
    cardMode: "abstract",
  },
  "science-lab": {
    src: "/images/projects/rcl-science-lab-stable-orbits.jpg",
    alt: "RCL Science Lab stable orbits simulation interface",
    position: "object-center",
    detailSrc: "/images/projects/rcl-science-lab-observatory.jpg",
    detailAlt: "RCL Science Lab observatory launch screen",
    detailFit: "contain",
    screenshots: [
      {
        src: "/images/projects/rcl-science-lab-observatory.jpg",
        alt: "RCL Science Lab observatory launch screen",
        caption: "The observatory organizes simulations, learning paths, and local study progress.",
      },
      {
        src: "/images/projects/rcl-science-lab-protostar-formation.jpg",
        alt: "RCL Science Lab protostar formation simulation interface",
        caption: "A protostar formation simulation shown in the current application.",
      },
      {
        src: "/images/projects/rcl-science-lab-catalog-browser.jpg",
        alt: "RCL Science Lab simulation catalog browser interface",
        caption: "The local catalog provides structured access to scientific simulations.",
      },
    ],
  },
  "neon-drift": {
    src: "/images/home/red-grid-tech.jpg",
    alt: "Abstract graphite and copper motion identity artwork for Neon Drift.",
    position: "object-center",
    cardMode: "abstract",
  },
  "falling-from-the-sky": {
    src: "/images/home/red-floor-glow.jpg",
    alt: "Abstract graphite and copper aerial movement identity artwork for Falling From The Sky.",
    position: "object-center",
    cardMode: "abstract",
  },
  darren: {
    src: "/images/home/red-atmosphere.jpg",
    alt: "Abstract dark graphite and copper atmosphere identity artwork for Darren In The Woods 2.",
    position: "object-center",
    cardMode: "abstract",
  },
  "talk-to-me": {
    src: "/images/projects/talk-to-me-card.jpg",
    alt: "Abstract graphite and copper communication identity artwork for Talk To Me AAC.",
    position: "object-center",
    cardMode: "abstract",
  },
  bloom: {
    src: "/images/home/red-atmosphere.jpg",
    alt: "Abstract graphite and copper milestone identity artwork for Bloom.",
    position: "object-center",
    cardMode: "abstract",
  },
  misread: {
    src: "/images/projects/misread-card.jpg",
    alt: "Abstract graphite and copper signal ambiguity identity artwork for Misread.",
    position: "object-center",
    cardMode: "abstract",
  },
};

const projectSocialImages: Record<string, string> = {
  forge: "/images/social/forge.jpg",
  "phase-arcade-volume-1": "/images/social/phase-arcade-volume-1.jpg",
  "rcl-science-lab": "/images/social/rcl-science-lab.jpg",
  "phase-shift": "/images/social/phase-shift.jpg",
  "phase-breaker": "/images/social/phase-breaker.jpg",
  "phase-court": "/images/social/phase-court.jpg",
  "phase-arcade-volume-2": "/images/social/phase-arcade-volume-2.jpg",
  "pigs-can-fly": "/images/social/pigs-can-fly.jpg",
};

export function getProjectVisualImage(visual: ProjectVisual) {
  return visualImages[visual];
}

export function getProjectScreenshots(visual: ProjectVisual) {
  return visualImages[visual]?.screenshots ?? [];
}

export function getProjectSocialImage(slug: string) {
  return projectSocialImages[slug] ?? "/social-preview.jpg";
}

type ProjectMediaImageProps = {
  visual: ProjectVisual;
  className?: string;
  priority?: boolean;
  variant?: "card" | "detail";
  fitOverride?: "cover" | "contain";
  decorative?: boolean;
};

function ProjectAbstractVisual({
  visual,
  alt,
  className,
  decorative,
}: {
  visual: ProjectVisual;
  alt: string;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? "true" : undefined}
      data-abstract-visual={visual}
      className={cn("abstract-product-visual", className)}
    >
      <span className="abstract-product-visual__grid" aria-hidden="true" />
      <span className="abstract-product-visual__arc abstract-product-visual__arc--outer" aria-hidden="true" />
      <span className="abstract-product-visual__arc abstract-product-visual__arc--inner" aria-hidden="true" />
      <span className="abstract-product-visual__axis abstract-product-visual__axis--x" aria-hidden="true" />
      <span className="abstract-product-visual__axis abstract-product-visual__axis--y" aria-hidden="true" />
      <span className="abstract-product-visual__motif" aria-hidden="true" />
    </div>
  );
}

export function ProjectMediaImage({
  visual,
  className,
  priority = false,
  variant = "card",
  fitOverride,
  decorative = false,
}: ProjectMediaImageProps) {
  const image = getProjectVisualImage(visual);

  if (!image) {
    return null;
  }

  const isDetail = variant === "detail";
  const src = isDetail && image.detailSrc ? image.detailSrc : image.src;
  const alt = isDetail && image.detailAlt ? image.detailAlt : image.alt;
  const shouldUseAbstract =
    image.cardMode === "abstract" && (!isDetail || !image.detailSrc);

  if (shouldUseAbstract) {
    return (
      <ProjectAbstractVisual
        visual={visual}
        alt={alt}
        decorative={decorative}
        className={className}
      />
    );
  }

  if (!src) {
    return null;
  }

  const fit =
    fitOverride ??
    (isDetail ? image.detailFit ?? image.fit ?? "cover" : image.fit ?? "cover");
  const position =
    isDetail && image.detailPosition ? image.detailPosition : image.position;

  return (
    <Image
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? "true" : undefined}
      fill
      priority={priority}
      loading={priority ? "eager" : undefined}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={cn(
        fit === "contain" ? "object-contain" : "object-cover",
        position,
        className,
      )}
    />
  );
}
