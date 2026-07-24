import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PageHeader } from "@/components/PageHeader";
import {
  policyDates,
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
    <main id="main-content" tabIndex={-1} className="v2-info-page">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        body={
          <>
          Effective: {policyDates.effective}. Last updated: {policyDates.lastUpdated}.
          This policy describes the information practices of the current website.
          </>
        }
      />
      <LegalPage sections={privacySections} />
    </main>
  );
}
