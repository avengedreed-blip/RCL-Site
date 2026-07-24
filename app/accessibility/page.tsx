import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { PageHeader } from "@/components/PageHeader";
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
    <main id="main-content" tabIndex={-1} className="v2-info-page">
      <PageHeader
        eyebrow="Accessibility"
        title="Accessibility Statement"
        body={
          <>
          Effective: {policyDates.effective}. Last updated: {policyDates.lastUpdated}.
          Reed Creative Labs welcomes practical feedback that makes the site easier to use.
          </>
        }
      />
      <LegalPage sections={accessibilitySections} />
    </main>
  );
}
