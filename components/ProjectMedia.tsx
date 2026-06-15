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
  screenshots?: {
    src: string;
    alt: string;
  }[];
};

const visualImages: Partial<Record<ProjectVisual, VisualImage>> = {
  echo: {
    src: "/images/home/echo-card.jpg",
    alt: "Warm cinematic family memory artwork representing Echo storytelling.",
    position: "object-center",
    detailSrc: "/images/projects/echo-editor-screen.jpg",
    detailAlt: "Echo story card editor interface",
    detailFit: "contain",
    detailPosition: "object-center",
    screenshots: [
      {
        src: "/images/projects/echo-start-screen.jpg",
        alt: "Echo cinematic slideshow application start screen",
      },
      {
        src: "/images/projects/echo-editor-screen.jpg",
        alt: "Echo story card editor interface",
      },
    ],
  },
  "phase-arcade": {
    src: "/images/home/phase-arcade-card.jpg",
    alt: "A premium neon arcade cabinet in a dark arcade, representing Phase Arcade Volume 1.",
    position: "object-center",
    screenshots: [
      {
        src: "/images/projects/phase-shift-gameplay-card.jpg",
        alt: "Phase Shift gameplay screenshot with a cyan and magenta neon tunnel.",
      },
      {
        src: "/images/projects/phase-defense-gameplay-card.jpg",
        alt: "Phase Defense gameplay screenshot with a defensive neon lane and central reticle.",
      },
      {
        src: "/images/projects/phase-court-gameplay-card.jpg",
        alt: "Phase Court gameplay screenshot with opposing cyan and magenta sides.",
      },
    ],
  },
  "phase-shift": {
    src: "/images/home/red-grid-tech.jpg",
    alt: "Abstract neon technical grid artwork representing speed, timing, and forward motion.",
    position: "object-center",
    detailSrc: "/images/projects/phase-shift-gameplay-card.jpg",
    detailAlt: "Phase Shift gameplay screenshot with a cyan and magenta neon tunnel.",
    detailFit: "contain",
  },
  "phase-defense": {
    src: "/images/home/rcl-technical-orb.jpg",
    alt: "Abstract red targeting system artwork representing defense, pressure, and survival.",
    position: "object-center",
    detailSrc: "/images/projects/phase-defense-gameplay-card.jpg",
    detailAlt: "Phase Defense gameplay screenshot with a defensive neon lane and central reticle.",
    detailFit: "contain",
  },
  "phase-court": {
    src: "/images/home/phase-arcade-card.jpg",
    alt: "Arcade key art representing competitive reaction play and opposing sides.",
    position: "object-center",
    detailSrc: "/images/projects/phase-court-gameplay-card.jpg",
    detailAlt: "Phase Court gameplay screenshot with opposing cyan and magenta sides.",
    detailFit: "contain",
  },
  workspace: {
    src: "/images/home/red-grid-tech.jpg",
    alt: "Abstract connected knowledge grid artwork representing RCL Workspace organization.",
    position: "object-center",
    detailSrc: "/images/projects/rcl-workspace-dashboard.jpg",
    detailAlt: "RCL Workspace project dashboard interface",
    detailFit: "contain",
    screenshots: [
      {
        src: "/images/projects/rcl-workspace-dashboard.jpg",
        alt: "RCL Workspace project dashboard interface",
      },
    ],
  },
  "science-lab": {
    src: "/images/home/rcl-technical-orb.jpg",
    alt: "Abstract orbital science artwork representing experimentation and visualization.",
    position: "object-center",
    detailSrc: "/images/projects/rcl-science-lab-stable-orbits.jpg",
    detailAlt: "RCL Science Lab stable orbits simulation interface",
    detailFit: "contain",
    screenshots: [
      {
        src: "/images/projects/rcl-science-lab-stable-orbits.jpg",
        alt: "RCL Science Lab stable orbits simulation interface",
      },
    ],
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

export function getProjectScreenshots(visual: ProjectVisual) {
  return visualImages[visual]?.screenshots ?? [];
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
