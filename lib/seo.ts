import type { Metadata } from "next";

export const siteUrl = "https://reedcreativelabs.com";
export const siteName = "Reed Creative Labs";

const defaultDescription =
  "Independent software and engineering studio building AI tools, scientific simulations, desktop software, games, and focused digital products.";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
};

const imageDimensions: Record<string, { width: number; height: number }> = {
  "/og-image.jpg": { width: 1200, height: 630 },
  "/social-preview.jpg": { width: 1200, height: 630 },
  "/images/projects/rcl-science-lab-stable-orbits.jpg": { width: 1276, height: 717 },
  "/images/projects/phase-shift-gameplay-01.webp": { width: 1920, height: 1080 },
  "/images/projects/phase-breaker-gameplay-01.webp": { width: 1920, height: 1080 },
  "/images/projects/phase-court-gameplay-02.webp": { width: 1920, height: 1080 },
  "/images/social/forge.jpg": { width: 1200, height: 630 },
  "/images/social/phase-arcade-volume-1.jpg": { width: 1200, height: 630 },
  "/images/social/rcl-science-lab.jpg": { width: 1200, height: 630 },
  "/images/social/phase-shift.jpg": { width: 1200, height: 630 },
  "/images/social/phase-breaker.jpg": { width: 1200, height: 630 },
  "/images/social/phase-court.jpg": { width: 1200, height: 630 },
  "/images/social/phase-arcade-volume-2.jpg": { width: 1200, height: 630 },
  "/images/social/pigs-can-fly.jpg": { width: 1200, height: 630 },
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = {
    url: "/og-image.jpg",
    alt: `${siteName} dark, silver, and gold social preview`,
    width: 1200,
    height: 630,
  },
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const resolvedTitle = isHome ? title : `${title} | ${siteName}`;
  const imageUrl = absoluteUrl(image.url);
  const dimensions = imageDimensions[image.url];

  return {
    title: isHome ? { absolute: title } : title.replace(` | ${siteName}`, ""),
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: image.width ?? dimensions?.width,
          height: image.height ?? dimensions?.height,
          alt: image.alt ?? resolvedTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },
  };
}

export const defaultSeo = buildMetadata({
  title: siteName,
  description: defaultDescription,
  path: "/",
});
