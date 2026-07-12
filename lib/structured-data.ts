import type { Project } from "@/content/projects";
import { getProjectSocialImage } from "@/components/ProjectMedia";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

const organization = {
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  email: "reedcreativelabs@gmail.com",
  logo: absoluteUrl("/images/rcl-logo-mark.png"),
};

function projectImage(project: Project) {
  return absoluteUrl(getProjectSocialImage(project.slug));
}

function applicationCategory(project: Project) {
  if (project.slug === "forge") {
    return "DeveloperApplication";
  }

  if (project.slug === "rcl-science-lab") {
    return "EducationalApplication";
  }

  if (project.slug === "talk-to-me") {
    return "CommunicationApplication";
  }

  if (project.slug === "bloom") {
    return "HealthApplication";
  }

  return "Application";
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...organization,
    description:
      "Reed Creative Labs is an independent software studio building products, websites, and custom tools with privacy, ownership, and lasting value in mind.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    publisher: organization,
    inLanguage: "en-US",
  };
}

export function projectJsonLd(project: Project) {
  const base = {
    "@context": "https://schema.org",
    name: project.name,
    description: project.longDescription,
    url: absoluteUrl(project.route),
    image: projectImage(project),
    publisher: organization,
    creator: organization,
  };

  if (
    project.category === "software" ||
    project.category === "tool" ||
    project.category === "app" ||
    project.category === "simulation"
  ) {
    return {
      ...base,
      "@type": "SoftwareApplication",
      applicationCategory: applicationCategory(project),
      operatingSystem: project.platforms.join(", "),
    };
  }

  if (project.category === "game-collection" && project.includedGames?.length) {
    return {
      ...base,
      "@type": "VideoGame",
      gamePlatform: project.platforms,
      hasPart: project.includedGames.map((slug) => ({
        "@type": "VideoGame",
        name: slug
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" "),
        url: absoluteUrl(`/projects/${slug}`),
      })),
    };
  }

  return {
    ...base,
    "@type": "VideoGame",
    gamePlatform: project.platforms,
  };
}
