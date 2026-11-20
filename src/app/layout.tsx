import type { Metadata, Viewport } from "next";
import { Public_Sans, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { StickyContact } from "@/components/sticky-contact";
import { ThemeProvider } from "@/components/theme-provider";
import { ClickTracking } from "@/components/tracking";
import { serviceAreas, services, site } from "@/content/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

const sans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HealthHands | Home Healthcare in Kolkata",
    template: "%s | HealthHands Kolkata",
  },
  description:
    "Home healthcare in Kolkata: blood tests, vaccination, nursing, physiotherapy and medical equipment at your door. Book on WhatsApp, by phone or online.",
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1716" },
  ],
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": `${site.url}/#business`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: serviceAreas
    .flatMap((z) => z.areas)
    .map((name) => ({ "@type": "Place", name: `${name}, Kolkata` })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home healthcare services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={cn("h-full antialiased", serif.variable, sans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only z-50 rounded-full bg-cta px-5 py-3 font-semibold text-cta-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          {children}
          <StickyContact />
        </ThemeProvider>
        <ClickTracking />
        <Analytics />
        <JsonLd data={businessSchema} />
      </body>
    </html>
  );
}
