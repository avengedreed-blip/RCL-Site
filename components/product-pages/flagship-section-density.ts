export const flagshipSectionDensity = {
  hero: "expansive",
  mission: "standard",
  status: "compact",
  "current-focus": "compact",
  roadmap: "standard",
  features: "compact",
  engineering: "compact",
  gallery: "expansive",
  "final-cta": "expansive",
} as const;

export type FlagshipSectionName = keyof typeof flagshipSectionDensity;
export type FlagshipSectionDensity =
  (typeof flagshipSectionDensity)[FlagshipSectionName];
