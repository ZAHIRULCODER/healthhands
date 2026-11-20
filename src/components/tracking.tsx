"use client";

import { useEffect } from "react";
import { clientEnv } from "@/lib/env.client";

// Globals added by the GA4 / Google Ads and Meta Pixel scripts in analytics.tsx.
// Optional because each script only loads when its ID is configured.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type TrackedEvent = "generate_lead" | "whatsapp_click" | "call_click";

const metaEventName = {
  whatsapp_click: "WhatsAppClick",
  call_click: "CallClick",
} as const satisfies Record<Exclude<TrackedEvent, "generate_lead">, string>;

/**
 * Sends form submissions, WhatsApp clicks and call clicks as separate events
 * to GA4, Meta Pixel and Google Ads (brief, section 7). Each tool only
 * receives events if its script is loaded.
 */
export function trackEvent(
  name: TrackedEvent,
  params: Record<string, string> = {},
) {
  window.gtag?.("event", name, params);
  window.dataLayer?.push({ event: name, ...params });

  if (name === "generate_lead") {
    const adsLabel = clientEnv.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
    if (adsLabel) window.gtag?.("event", "conversion", { send_to: adsLabel });
    window.fbq?.("track", "Lead", params);
  } else {
    window.fbq?.("trackCustom", metaEventName[name], params);
  }
}

export function ClickTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!(e.target instanceof Element)) return;
      const href = e.target.closest("a")?.getAttribute("href") ?? "";
      const page = window.location.pathname;
      if (href.startsWith("https://wa.me/"))
        trackEvent("whatsapp_click", { page });
      else if (href.startsWith("tel:")) trackEvent("call_click", { page });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
