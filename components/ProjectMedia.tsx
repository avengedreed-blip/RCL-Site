import Image from "next/image";
import type { ProjectVisual } from "@/content/projects";
import { cn } from "@/lib/utils";

type VisualImage = {
  src: string;
  alt: string;
  position?: string;
  fit?: "cover" | "contain";
  detailSrc?: string;
  detailAlt?: string;
  detailFit?: "cover" | "contain";
  detailPosition?: string;
};

const visualImages: Partial<Record<ProjectVisual, VisualImage>> = {
  echo: {
    src: "/images/projects/echo-start-screen.jpg",
    alt: "Echo cinematic slideshow application start screen",
    position: "object-center",
    detailSrc: "/images/projects/echo-editor-screen.jpg",
    detailAlt: "Echo story card editor interface",
    detailFit: "contain",
    detailPosition: "object-center",
  },
  "phase-arcade": {
    src: "/images/home/phase-arcade-card.jpg",
    alt: "A premium neon arcade cabinet in a dark arcade, representing Phase Arcade Volume 1.",
    position: "object-center",
  },
  "phase-shift": {
    src: "/images/projects/phase-shift-gameplay-card.jpg",
    alt: "A cyan and magenta neon tunnel from Phase Shift, emphasizing speed, timing, and forward motion.",
    position: "object-center",
  },
  "phase-defense": {
    src: "/images/projects/phase-defense-gameplay-card.jpg",
    alt: "A defensive neon lane with a central reticle from Phase Defense, emphasizing pressure and target prioritization.",
    position: "object-center",
  },
  "phase-court": {
    src: "/images/projects/phase-court-gameplay-card.jpg",
    alt: "A cyan and magenta arcade court from Phase Court, emphasizing opposing sides and competitive reaction play.",
    position: "object-center",
  },
  workspace: {
    src: "/images/home/red-grid-tech.jpg",
    alt: "A dark red technical grid representing a local-first creative workspace.",
    position: "object-center",
  },
  "science-lab": {
    src: "/images/projects/rcl-science-lab-stable-orbits.jpg",
    alt: "RCL Science Lab stable orbits simulation interface",
    position: "object-center",
    detailFit: "contain",
  },
  "neon-drift": {
    src: "/images/home/red-grid-tech.jpg",
    alt: "A dark red technical grid used as abstract visual identity for Neon Drift.",
    position: "object-center",
  },
  "falling-from-the-sky": {
    src: "/images/home/red-floor-glow.jpg",
    alt: "A dark red floor glow used as abstract visual identity for Falling From The Sky.",
    position: "object-center",
  },
  darren: {
    src: "/images/home/red-atmosphere.jpg",
    alt: "A dark red atmospheric field suggesting fog, tension, and wilderness horror.",
    position: "object-center",
  },
  "talk-to-me": {
    src: "/images/projects/talk-to-me-card.jpg",
    alt: "An abstract communication board with structured speech tiles and a soft red glow.",
    position: "object-center",
  },
  bloom: {
    src: "/images/home/red-atmosphere.jpg",
    alt: "A soft dark red atmosphere used as abstract visual identity for Bloom.",
    position: "object-center",
  },
  misread: {
    src: "/images/projects/misread-card.jpg",
    alt: "Overlapping speech forms and obscured signals suggesting ambiguity and hidden intent.",
    position: "object-center",
  },
};

export function getProjectVisualImage(visual: ProjectVisual) {
  return visualImages[visual];
}

type ProjectMediaImageProps = {
  visual: ProjectVisual;
  className?: string;
  priority?: boolean;
  variant?: "card" | "detail";
};

export function ProjectMediaImage({
  visual,
  className,
  priority = false,
  variant = "card",
}: ProjectMediaImageProps) {
  const image = getProjectVisualImage(visual);

  if (!image) {
    return null;
  }

  const isDetail = variant === "detail";
  const src = isDetail && image.detailSrc ? image.detailSrc : image.src;
  const alt = isDetail && image.detailAlt ? image.detailAlt : image.alt;
  const fit = isDetail ? image.detailFit ?? image.fit ?? "cover" : image.fit ?? "cover";
  const position =
    isDetail && image.detailPosition ? image.detailPosition : image.position;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={cn(
        fit === "contain" ? "object-contain" : "object-cover",
        position,
        className,
      )}
    />
  );
}
