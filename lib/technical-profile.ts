import type {
  TechnicalProfile,
  TechnicalProfileKey,
} from "@/content/projects";

type TechnicalProfileDefinition = {
  key: TechnicalProfileKey;
  label: string;
};

export type TechnicalProfileRow = {
  key: TechnicalProfileKey;
  label: string;
  values: string[];
};

export const technicalProfileOrder: readonly TechnicalProfileDefinition[] = [
  { key: "languages", label: "Languages" },
  { key: "nativeCore", label: "Native Core" },
  { key: "engine", label: "Engine" },
  { key: "frameworks", label: "Frameworks" },
  { key: "renderer", label: "Renderer / Graphics" },
  { key: "gpu", label: "GPU / Compute" },
  { key: "database", label: "Database" },
  { key: "storage", label: "Storage" },
  { key: "platforms", label: "Platforms" },
  { key: "interfaces", label: "Interfaces / Runtime" },
  { key: "packaging", label: "Packaging / Distribution" },
  { key: "tooling", label: "Tooling" },
] as const;

export function getTechnicalProfileRows(
  profile: TechnicalProfile,
): TechnicalProfileRow[] {
  return technicalProfileOrder.flatMap(({ key, label }) => {
    const values = profile[key];

    return Array.isArray(values) && values.length > 0
      ? [{ key, label, values }]
      : [];
  });
}

export function getTechnicalProfileHighlights(
  profile: TechnicalProfile,
  limit = 6,
): string[] {
  const highlights = profile.compactFields.flatMap((key) => {
    const values = profile[key];
    return Array.isArray(values) ? values : [];
  });

  return [...new Set(highlights)].slice(0, limit);
}
