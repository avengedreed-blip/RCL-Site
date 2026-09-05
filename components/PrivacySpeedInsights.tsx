"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { sanitizePerformanceEvent } from "@/lib/privacy-metrics";
import { siteUrl } from "@/lib/seo";

export function PrivacySpeedInsights({ allowedPaths }: { allowedPaths: string[] }) {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        if (
          navigator.doNotTrack === "1" ||
          Reflect.get(navigator, "globalPrivacyControl") === true
        ) {
          return null;
        }
        return sanitizePerformanceEvent(data, allowedPaths, siteUrl);
      }}
    />
  );
}
