import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { defaultSeo, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...defaultSeo,
  metadataBase: new URL(siteUrl),
  title: {
    default: "Reed Creative Labs",
    template: "%s | Reed Creative Labs",
  },
  applicationName: "Reed Creative Labs",
  keywords: [
    "Reed Creative Labs",
    "Forge",
    "Forgefield",
    "Phase Arcade",
    "Storm Lab",
    "VR arcade games",
    "offline-first software",
    "privacy-first software",
    "local-first software",
    "educational software",
    "custom software",
    "websites",
    "small business websites",
    "custom tools",
    "independent game studio",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050607",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="page-shell bg-rcl-black text-white antialiased">
        <StructuredData data={[organizationJsonLd(), websiteJsonLd()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[100] focus:rounded-[3px] focus:border focus:border-rcl-gold focus:bg-rcl-field focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:uppercase focus:text-white focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-rcl-gold"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
