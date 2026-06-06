import type { Project } from "@/content/projects";
import { getProjectVisualImage } from "@/components/ProjectMedia";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";

const organization = {
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  email: "reedcreativelabs@gmail.com",
  logo: absoluteUrl("/images/rcl-logo-cropped.png"),
};

function projectImage(project: Project) {
  const image = getProjectVisualImage(project.visual);
  return image ? absoluteUrl(image.src) : absoluteUrl("/og-image.jpg");
}

function applicationCategory(project: Project) {
  if (project.slug === "echo") {
    return "MultimediaApplication";
  }

  if (project.slug === "rcl-workspace") {
    return "ProductivityApplication";
  }

  if (project.slug === "talk-to-me") {
    return "CommunicationApplication";
  }

  return "Application";
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...organization,
    description:
      "Reed Creative Labs is an independent software and game studio building offline-first products with privacy and ownership at the center.",
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

  if (project.category === "software" || project.category === "tool" || project.category === "app") {
    return {
      ...base,
      "@type": "SoftwareApplication",
      applicationCategory: applicationCategory(project),
    };
  }

  if (project.category === "game-collection" && project.includedGames?.length) {
    return {
      ...base,
      "@type": "VideoGame",
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
  };
}
