import { FlagshipProductPage } from "@/components/product-pages/FlagshipProductPage";
import type { Project } from "@/content/projects";

export function PhaseArcadeProductPage({ project }: { project: Project }) {
  return <FlagshipProductPage project={project} />;
}
