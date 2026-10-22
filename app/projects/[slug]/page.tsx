import { forgefieldLaunchSummary } from "@/content/forgefield";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ForgefieldProductPage } from "@/components/product-pages/ForgefieldProductPage";
import { PhaseArcadeProductPage } from "@/components/product-pages/PhaseArcadeProductPage";
import {
  getProject,
  getProjectDateLabel,
  productPages,
} from "@/content/projects";
import { getProjectSocialImage } from "@/lib/project-media";
import { buildMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return productPages.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !productPages.includes(project)) {
    return {
      title: "Project",
    };
  }

  return buildMetadata({
    title: project.launch
      ? `${project.name} | ${getProjectDateLabel(project)}`
      : project.name,
    description:
      project.slug === "forgefield"
        ? `${forgefieldLaunchSummary} Real-time generative particle worlds for Windows 11: nine living scenes, live wallpapers, and screensavers.`
        : `${getProjectDateLabel(project)}. ${project.shortDescription}`,
    path: project.route,
    image: {
      url: getProjectSocialImage(project.slug),
      alt: `${project.name} preview image`,
      width: 1200,
      height: 630,
    },
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !productPages.includes(project)) {
    notFound();
  }

  if (project.slug === "forgefield")
    return <ForgefieldProductPage project={project} />;

  if (project.slug === "phase-arcade-volume-1") {
    return <PhaseArcadeProductPage project={project} />;
  }

  notFound();
}
