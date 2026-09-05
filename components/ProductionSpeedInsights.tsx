import { PrivacySpeedInsights } from "@/components/PrivacySpeedInsights";
import { projects } from "@/content/projects";
import { staticPagePaths } from "@/lib/site-routes";

export function ProductionSpeedInsights() {
  if (process.env.VERCEL_ENV !== "production") {
    return null;
  }

  return (
    <PrivacySpeedInsights allowedPaths={[
      ...staticPagePaths,
      ...projects.map((project) => project.route),
    ]} />
  );
}
