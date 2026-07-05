import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalLastUpdated, termsSections } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description:
    "Preliminary terms for the Reed Creative Labs website, content, branding, and product information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-header mx-auto max-w-[1240px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16 xl:px-0">
        <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
          Terms
        </p>
        <h1 className="brand-heading info-page-title section-title max-w-[1100px] text-white">
          Website Terms
        </h1>
        <p className="mt-7 max-w-[820px] text-lg leading-8 text-rcl-muted">
          Last updated: {legalLastUpdated}. These plain-English terms describe
          the current informational website.
        </p>
      </section>
      <LegalPage sections={termsSections} />
    </main>
  );
}
