import Script from "next/script";
import { clientEnv } from "@/lib/env.client";

const {
  NEXT_PUBLIC_GA_ID: gaId,
  NEXT_PUBLIC_GOOGLE_ADS_ID: adsId,
  NEXT_PUBLIC_META_PIXEL_ID: pixelId,
} = clientEnv;

/** Loads GA4, Google Ads and Meta Pixel only when their IDs are set in the environment. */
export function Analytics() {
  const gtagId = gaId ?? adsId;
  return (
    <>
      {gtagId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${gaId ? `gtag('config','${gaId}');` : ""}${adsId ? `gtag('config','${adsId}');` : ""}`}
          </Script>
        </>
      )}
      {pixelId && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
