import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { policyDates, securitySections } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Security",
  description:
    "Security posture and vulnerability-reporting information for Reed Creative Labs.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="page-header mx-auto max-w-[1240px] px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16 xl:px-0">
        <p className="mb-5 text-sm font-black uppercase text-rcl-amber">
          Security
        </p>
        <h1 className="brand-heading info-page-title section-title max-w-[1100px] text-white">
          Security and Vulnerability Reporting
        </h1>
        <p className="mt-7 max-w-[820px] text-lg leading-8 text-rcl-muted">
          Effective: {policyDates.effective}. Last updated: {policyDates.lastUpdated}.
          Report suspected security problems through the studio contact channel.
        </p>
      </section>
      <LegalPage sections={securitySections} />
    </main>
  );
}
