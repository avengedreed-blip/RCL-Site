"use client";

import { Analytics } from "@vercel/analytics/next";
import { sanitizeAnalyticsEvent } from "@/lib/privacy-metrics";
import { siteUrl } from "@/lib/seo";

export function PrivacyAnalytics({ allowedPaths, conversionEvents = false }: { allowedPaths: string[]; conversionEvents?: boolean }) {
  return (
    <Analytics
      beforeSend={(event) => sanitizeAnalyticsEvent(event, allowedPaths, siteUrl, {
        doNotTrack: navigator.doNotTrack,
        globalPrivacyControl: Reflect.get(navigator, "globalPrivacyControl"),
      }, conversionEvents)}
    />
  );
}
