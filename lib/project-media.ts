import type { ProjectVisual } from "@/content/projects";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

const projectScreenshots: Partial<
  Record<ProjectVisual, readonly ProjectScreenshot[]>
> = {
  forgefield: [
    {
      src: "/images/projects/forgefield-eventide-2026-09.webp",
      alt: "Forgefield Eventide: A bright black-hole ring, flowing copper accretion material, and polar jets.",
      caption:
        "Eventide. Native Forgefield renderer capture, September 2026 pre-release build.",
    },
    {
      src: "/images/projects/forgefield-polar-night-2026-09.webp",
      alt: "Forgefield Polar Night: Aurora curtains above snow-covered mountains and a reflective dark surface.",
      caption:
        "Polar Night. Native Forgefield renderer capture, September 2026 pre-release build.",
    },
    {
      src: "/images/projects/forgefield-corona-2026-09.webp",
      alt: "Forgefield Corona: Luminous plasma loops rising from a textured solar surface.",
      caption:
        "Corona. Native Forgefield renderer capture, September 2026 pre-release build.",
    },
    {
      src: "/images/projects/forgefield-gravitas-2026-09.webp",
      alt: "Forgefield Gravitas: Two interacting spiral galaxies with contrasting warm and cool material.",
      caption:
        "Gravitas. Native Forgefield renderer capture, September 2026 pre-release build.",
    },
    {
      src: "/images/projects/forgefield-synapse-2026-09.webp",
      alt: "Forgefield Synapse: Branching neural structures with pale cell bodies and illuminated connections.",
      caption:
        "Synapse. Native Forgefield renderer capture, September 2026 pre-release build.",
    },
    {
      src: "/images/projects/forgefield-ember-2026-09.webp",
      alt: "Forgefield Ember: Glowing coals and flames in a procedural ember bed.",
      caption:
        "Ember. Native Forgefield renderer capture, September 2026 pre-release build.",
    },
  ],
  "phase-arcade": [
    {
      src: "/images/projects/phase-shift-gameplay-01.webp",
      alt: "Phase Shift gameplay with a photon moving through a cyan and magenta tunnel.",
      caption:
        "Phase Shift — desktop gameplay captured from the current build.",
    },
    {
      src: "/images/projects/phase-breaker-gameplay-01.webp",
      alt: "Phase Breaker gameplay inside a cyan and magenta containment chamber.",
      caption:
        "Phase Breaker — desktop gameplay captured from the current build.",
    },
    {
      src: "/images/projects/phase-court-gameplay-02.webp",
      alt: "Phase Court desktop gameplay showing a cyan player paddle returning the glowing ball across the magenta court.",
      caption:
        "Phase Court — native desktop gameplay captured from the current build.",
    },
  ],
};

const projectSocialImages: Record<string, string> = {
  forgefield: "/images/social/forgefield-2026-09.jpg",
  "phase-arcade-volume-1": "/images/social/phase-arcade-volume-1.jpg",
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
