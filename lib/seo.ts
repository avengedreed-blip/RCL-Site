import type { Metadata } from "next";

export const siteUrl = "https://reedcreativelabs.com";
export const siteName = "Reed Creative Labs";

const defaultDescription =
  "Offline-first software and games built for ownership, privacy, and lasting value.";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
}: SeoOptions): Metadata {
  const url = absoluteUrl(path);
  const isHome = path === "/";
  const resolvedTitle = isHome ? title : `${title} | ${siteName}`;

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
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${siteName} social preview`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: ["/social-preview.jpg"],
    },
  };
}

export const defaultSeo = buildMetadata({
  title: siteName,
  description: defaultDescription,
  path: "/",
});
