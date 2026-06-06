import type { Metadata } from "next";

export const siteUrl = "https://reedcreativelabs.com";
export const siteName = "Reed Creative Labs";

const defaultDescription =
  "Offline-first software and games built for ownership, privacy, and lasting value.";

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

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = {
    url: "/og-image.jpg",
    alt: `${siteName} social preview`,
    width: 1200,
    height: 630,
  },
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const resolvedTitle = isHome ? title : `${title} | ${siteName}`;
  const imageUrl = absoluteUrl(image.url);

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
          width: image.width,
          height: image.height,
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
