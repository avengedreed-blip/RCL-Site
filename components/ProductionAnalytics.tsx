import { PrivacyAnalytics } from "@/components/PrivacyAnalytics";
import { ConversionEvents } from "@/components/ConversionEvents";
import { productPages } from "@/content/projects";
import { staticPagePaths } from "@/lib/site-routes";

export function ProductionAnalytics() {
  if (process.env.VERCEL_ENV !== "production") return null;

  const conversionEvents = process.env.RCL_CONVERSION_EVENTS === "1";
  return (
    <><PrivacyAnalytics conversionEvents={conversionEvents} allowedPaths={[
      ...staticPagePaths,
      ...productPages.map((project) => project.route),
    ]} />{conversionEvents && <ConversionEvents />}</>
  );
}
