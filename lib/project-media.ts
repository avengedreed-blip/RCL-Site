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
        "Eventide. An accretion ring and polar jets around a black-hole core.",
    },
    {
      src: "/images/projects/forgefield-polar-night-2026-09.webp",
      alt: "Forgefield Polar Night: Aurora curtains above snow-covered mountains and a reflective dark surface.",
      caption:
        "Polar Night. Aurora curtains above snow-covered mountains and a reflective surface.",
    },
    {
      src: "/images/projects/forgefield-corona-2026-09.webp",
      alt: "Forgefield Corona: Luminous plasma loops rising from a textured solar surface.",
      caption: "Corona. Plasma loops rising from a textured solar surface.",
    },
    {
      src: "/images/projects/forgefield-gravitas-2026-09.webp",
      alt: "Forgefield Gravitas: Two interacting spiral galaxies with contrasting warm and cool material.",
      caption:
        "Gravitas. Two interacting spiral galaxies, traced in warm and cool material.",
    },
    {
      src: "/images/projects/forgefield-synapse-2026-09.webp",
      alt: "Forgefield Synapse: Branching neural structures with pale cell bodies and illuminated connections.",
      caption:
        "Synapse. Branching neural structures with illuminated connections.",
    },
    {
      src: "/images/projects/forgefield-ember-2026-09.webp",
      alt: "Forgefield Ember: Glowing coals and flames in a procedural ember bed.",
      caption: "Ember. Flames and glowing coals in a procedural ember bed.",
    },
  ],
  "load-bearing": [
    {
      src: "/images/projects/load-bearing-build-2026-09.webp",
      alt: "Brace the Bay construction view with an unbraced steel frame, editing tools, and the load-test action.",
      caption:
        "Build. The starting frame, construction tools, and authored challenge limits.",
    },
    {
      src: "/images/projects/load-bearing-engineering-2026-09.webp",
      alt: "Brace the Bay engineering view with color-coded member utilization and a first-column failure result.",
      caption:
        "Inspect. Member utilization and the first failure under the prototype's authored load case.",
    },
    {
      src: "/images/projects/load-bearing-redesign-2026-09.webp",
      alt: "Brace the Bay redesigned frame with a result panel showing both authored proof cases passing.",
      caption:
        "Redesign. A braced solution passes the challenge's gravity and lateral proof cases within budget.",
    },
  ],
  "static-drift": [
    {
      src: "/images/projects/static-drift-prismatic-bloom-2026-09.webp",
      alt: "Static Drift Prismatic Bloom: a folded glass-like form with silver and warm reflections against black.",
      caption: "Prismatic Bloom. Reflected light across a folding procedural form.",
    },
    {
      src: "/images/projects/static-drift-energy-current-2026-09.webp",
      alt: "Static Drift Luminous Energy Current: fine pale and copper filaments flowing across a dark field.",
      caption: "Luminous Energy Current. Fine light traces flowing through a dark field.",
    },
    {
      src: "/images/projects/static-drift-aurora-veil-2026-09.webp",
      alt: "Static Drift Aurora Veil: layered curtains of silver and warm light on a black background.",
      caption: "Aurora Veil. Layered curtains of light with a slowly changing silhouette.",
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
  "project-load-bearing": "/images/social/project-load-bearing-2026-09.jpg",
  "static-drift": "/images/social/static-drift-2026-09.jpg",
  "phase-arcade-volume-1": "/images/social/phase-arcade-volume-1.jpg",
  "phase-shift": "/images/social/phase-shift.jpg",
  "phase-breaker": "/images/social/phase-breaker.jpg",
  "phase-court": "/images/social/phase-court.jpg",
  "phase-arcade-volume-2": "/images/social/phase-arcade-volume-2.jpg",
  "pigs-can-fly": "/images/social/pigs-can-fly.jpg",
};

const projectGalleryCopy: Partial<
  Record<ProjectVisual, { title: string; context: string; action: string }>
> = {
  forgefield: {
    title: "Worlds with their own character.",
    context:
      "Six of the nine worlds, captured from the September 2026 pre-release Windows build.",
    action: "Explore the Worlds",
  },
  "phase-arcade": {
    title: "Three games. Three ways to play.",
    context:
      "Desktop gameplay from Phase Shift, Phase Breaker, and Phase Court. The collection also supports VR and is in final testing.",
    action: "See the Games",
  },
  "load-bearing": {
    title: "Build, inspect, redesign.",
    context:
      "Brace the Bay prototype, captured from the September 2026 Windows build.",
    action: "View Gallery",
  },
  "static-drift": {
    title: "Three studies in light and motion.",
    context:
      "Three worlds captured from the September 2026 Windows development renderer for the Android TV app.",
    action: "View Gallery",
  },
};

export function getProjectGalleryCopy(visual: ProjectVisual) {
  return projectGalleryCopy[visual];
}

export function getProjectScreenshots(visual: ProjectVisual) {
  return projectScreenshots[visual] ?? [];
}

export function getProjectSocialImage(slug: string) {
  return projectSocialImages[slug] ?? "/social-preview.jpg";
}
