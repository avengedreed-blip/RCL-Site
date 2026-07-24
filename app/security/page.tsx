import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PageHeader } from "@/components/PageHeader";
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
    <main id="main-content" tabIndex={-1} className="v2-info-page">
      <PageHeader
        eyebrow="Security"
        title="Security and Vulnerability Reporting"
        body={
          <>
          Effective: {policyDates.effective}. Last updated: {policyDates.lastUpdated}.
          Report suspected security problems through the studio contact channel.
          </>
        }
      />
      <LegalPage sections={securitySections} />
    </main>
  );
}
