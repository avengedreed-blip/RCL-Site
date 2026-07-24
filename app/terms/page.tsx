import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PageHeader } from "@/components/PageHeader";
import { policyDates, termsSections } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms",
  description:
    "Preliminary terms for the Reed Creative Labs website, content, branding, and product information.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="v2-info-page">
      <PageHeader
        eyebrow="Terms"
        title="Website Terms"
        body={
          <>
          Effective: {policyDates.effective}. Last updated: {policyDates.lastUpdated}.
          These plain-English terms govern the current informational website.
          </>
        }
      />
      <LegalPage sections={termsSections} />
    </main>
  );
}
