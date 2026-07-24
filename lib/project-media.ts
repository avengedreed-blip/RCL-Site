import type { ProjectVisual } from "@/content/projects";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

const projectScreenshots: Partial<
  Record<ProjectVisual, readonly ProjectScreenshot[]>
> = {
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
