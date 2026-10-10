import { PrivacyAnalytics } from "@/components/PrivacyAnalytics";
import { projects } from "@/content/projects";
import { staticPagePaths } from "@/lib/site-routes";

export function ProductionAnalytics() {
  if (process.env.VERCEL_ENV !== "production") return null;

  return (
    <PrivacyAnalytics allowedPaths={[
      ...staticPagePaths,
      ...projects.map((project) => project.route),
    ]} />
  );
}
