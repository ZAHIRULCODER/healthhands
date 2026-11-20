import type { MetadataRoute } from "next";
import { services, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/service-areas",
    "/about",
    "/reviews",
    "/health-guides",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/medical-disclaimer",
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}` })),
  ];
}
