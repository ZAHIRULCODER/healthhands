import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/actions";
import { MapPinIcon } from "@/components/icons";
import { CtaBand, PageHeader, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { serviceAreas, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Service Areas: Garia, Jadavpur, Tollygunge and South Kolkata",
  description:
    "HealthHands provides home blood tests, nursing, physiotherapy and equipment in Garia, Patuli, Jadavpur, Tollygunge, Behala, Ballygunge and nearby Kolkata areas.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Service areas"
        title="Where we visit in Kolkata"
        intro={`Our team is based in Garia (${site.address.postalCode}) and visits homes across South Kolkata. If your area is not listed, ask us. We may still be able to reach you.`}
      />
      <Section>
        <div className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
          {serviceAreas.map((z) => (
            <div key={z.zone} className="bg-card p-7">
              <h2 className="text-xl">{z.zone}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {z.areas.length} areas
              </p>
              <ul className="mt-6 space-y-3">
                {z.areas.map((a) => (
                  <li key={a} className="flex items-center gap-2.5">
                    <MapPinIcon
                      aria-hidden="true"
                      className="size-4 text-primary"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Card className="mt-8 rounded-lg bg-muted py-6 shadow-none ring-1 ring-foreground/10">
          <CardContent className="flex flex-col items-start gap-4 px-7 md:flex-row md:items-center md:justify-between">
            <p>
              <span className="font-semibold">Not on the list?</span>{" "}
              <span className="text-muted-foreground">
                Send us your area or PIN code and we will reply with
                availability.
              </span>
            </p>
            <WhatsAppButton
              message="Hello, do you provide home services in my area? My PIN code is:"
              label="Ask about my area"
            />
          </CardContent>
        </Card>
      </Section>
      <CtaBand />
    </PageTransition>
  );
}
