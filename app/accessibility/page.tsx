import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { accessibilitySections, policyDates } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Accessibility",
  description:
    "Accessibility approach and feedback channel for the Reed Creative Labs website.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-header mx-auto max-w-[1240px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16 xl:px-0">
        <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
          Accessibility
        </p>
        <h1 className="brand-heading info-page-title section-title max-w-[1100px] text-white">
          Accessibility Statement
        </h1>
        <p className="mt-7 max-w-[820px] text-lg leading-8 text-rcl-muted">
          Effective: {policyDates.effective}. Last updated: {policyDates.lastUpdated}.
          Reed Creative Labs welcomes practical feedback that makes the site easier to use.
        </p>
      </section>
      <LegalPage sections={accessibilitySections} />
    </main>
  );
}
