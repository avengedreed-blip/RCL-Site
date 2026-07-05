import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import {
  legalLastUpdated,
  privacySections,
} from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for the Reed Creative Labs website and current contact practices.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-header mx-auto max-w-[1240px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16 xl:px-0">
        <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
          Privacy
        </p>
        <h1 className="brand-heading info-page-title section-title max-w-[1100px] text-white">
          Privacy Policy
        </h1>
        <p className="mt-7 max-w-[820px] text-lg leading-8 text-rcl-muted">
          Last updated: {legalLastUpdated}. Reed Creative Labs keeps this site
          privacy-forward and low-maintenance.
        </p>
      </section>
      <LegalPage sections={privacySections} />
    </main>
  );
}
