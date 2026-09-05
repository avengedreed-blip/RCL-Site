import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/seo";
import { staticPagePaths } from "@/lib/site-routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
      ...staticPagePaths.map((route) => ({
        url: new URL(route, siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: route === "/" ? 1 : 0.8,
      })),
      ...projects.map((project) => ({
        url: `${siteUrl}${project.route}`,
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.9 : 0.7,
      })),
  ];
}
