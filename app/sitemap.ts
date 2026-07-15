import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/projects",
    "/services",
    "/about",
    "/about/founder",
    "/press",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
    "/security",
  ];

  return [
      ...staticRoutes.map((route) => ({
        url: `${siteUrl}${route}`,
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
      })),
      ...projects.map((project) => ({
        url: `${siteUrl}${project.route}`,
        changeFrequency: "monthly" as const,
        priority: project.featured ? 0.9 : 0.7,
      })),
  ];
}
