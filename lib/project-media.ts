import type { ProjectVisual } from "@/content/projects";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

const projectScreenshots: Partial<
  Record<ProjectVisual, readonly ProjectScreenshot[]>
> = {
  forge: [
    {
      src: "/images/projects/forge-clean-session.png",
      alt: "Forge empty workspace showing the clean start prompt and Choose folder action, with no conversation or repository content.",
      caption:
        "Forge captured from an isolated current build in a clean empty workspace. No chat history or repository data is present.",
    },
  ],
  forgefield: [
    {
      src: "/images/projects/forgefield-eventide.webp",
      alt: "Forgefield Eventide procedural world rendered by the current Windows build.",
      caption: "Eventide — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-genesis.webp",
      alt: "Forgefield Genesis procedural world rendered by the current Windows build.",
      caption: "Genesis — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-gravitas.webp",
      alt: "Forgefield Gravitas procedural world rendered by the current Windows build.",
      caption: "Gravitas — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-abyssal.webp",
      alt: "Forgefield Abyssal procedural world rendered by the current Windows build.",
      caption: "Abyssal — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-synapse.webp",
      alt: "Forgefield Synapse procedural world rendered by the current Windows build.",
      caption: "Synapse — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-quantum-garden.webp",
      alt: "Forgefield Quantum Garden procedural world rendered by the current Windows build.",
      caption: "Quantum Garden — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-strange-attractors.webp",
      alt: "Forgefield Strange Attractors procedural world rendered by the current Windows build.",
      caption: "Strange Attractors — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-ember.webp",
      alt: "Forgefield Ember procedural world rendered by the current Windows build.",
      caption: "Ember — a procedural Forgefield world rendered by the current Windows build.",
    },
    {
      src: "/images/projects/forgefield-polar-night.webp",
      alt: "Forgefield Polar Night procedural world rendered by the current Windows build.",
      caption: "Polar Night — a procedural Forgefield world rendered by the current Windows build.",
    },
  ],
  "phase-arcade": [
    {
      src: "/images/projects/phase-shift-gameplay-01.webp",
      alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
      caption: "Phase Shift — desktop gameplay captured from the current build.",
    },
    {
      src: "/images/projects/phase-breaker-gameplay-01.webp",
      alt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
      caption: "Phase Breaker — desktop gameplay captured from the current build.",
    },
    {
      src: "/images/projects/phase-court-gameplay-02.webp",
      alt: "Phase Court desktop gameplay showing a cyan player paddle returning the glowing ball across the magenta court.",
      caption:
        "Phase Court — native desktop gameplay captured from the current build.",
    },
  ],
  "science-lab": [
    {
      src: "/images/projects/rcl-science-lab-observatory.jpg",
      alt: "RCL Science Lab observatory launch screen.",
      caption:
        "The observatory organizes simulations, learning paths, and local study progress.",
    },
    {
      src: "/images/projects/rcl-science-lab-protostar-formation.jpg",
      alt: "RCL Science Lab protostar formation simulation interface.",
      caption: "A protostar formation simulation shown in the current application.",
    },
    {
      src: "/images/projects/rcl-science-lab-catalog-browser.jpg",
      alt: "RCL Science Lab simulation catalog browser interface.",
      caption:
        "The local catalog provides structured access to scientific simulations.",
    },
  ],
};

const projectSocialImages: Record<string, string> = {
  forge: "/images/social/forge.jpg",
  forgefield: "/images/social/forgefield.jpg",
  "phase-arcade-volume-1": "/images/social/phase-arcade-volume-1.jpg",
  "rcl-science-lab": "/images/social/rcl-science-lab.jpg",
  "phase-shift": "/images/social/phase-shift.jpg",
  "phase-breaker": "/images/social/phase-breaker.jpg",
  "phase-court": "/images/social/phase-court.jpg",
  "phase-arcade-volume-2": "/images/social/phase-arcade-volume-2.jpg",
  "pigs-can-fly": "/images/social/pigs-can-fly.jpg",
};

export function getProjectScreenshots(visual: ProjectVisual) {
  return projectScreenshots[visual] ?? [];
}

export function getProjectSocialImage(slug: string) {
  return projectSocialImages[slug] ?? "/social-preview.jpg";
}
