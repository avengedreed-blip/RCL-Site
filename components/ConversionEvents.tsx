"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { conversionForLink } from "@/lib/conversion-events";

// Mounted only by ProductionAnalytics after explicit owner configuration.
export function ConversionEvents() {
  useEffect(() => {
    const clicked = (event: MouseEvent) => {
      if (event.defaultPrevented || navigator.doNotTrack === "1" || Reflect.get(navigator, "globalPrivacyControl") === true) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      const name = anchor ? conversionForLink(anchor.getAttribute("href") ?? "", window.location.origin) : null;
      if (name) track(name);
    };
    document.addEventListener("click", clicked);
    return () => document.removeEventListener("click", clicked);
  }, []);
  return null;
}
