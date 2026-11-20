import { TriangleAlertIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { WhatsAppButton } from "@/components/actions";
import { EnquiryForm, EnquiryFormFromUrl } from "@/components/enquiry-form";
import { PhoneIcon } from "@/components/icons";
import { PageHeader, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact and Book a Home Visit in Kolkata",
  description:
    "Book a home blood test, nurse, physiotherapist or equipment in Kolkata. Call +91 98302 40859, WhatsApp us or send a booking request online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Contact and book"
        title="Book a home visit"
        intro={`Send the form, WhatsApp or call. We reply within ${site.responseMinutes} minutes during working hours.`}
      />
      <Section id="book" className="pt-12 md:pt-16">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
          <Suspense fallback={<EnquiryForm title="Your details" />}>
            <EnquiryFormFromUrl title="Your details" />
          </Suspense>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <Card className="gap-0 rounded-lg py-0 shadow-none ring-1 ring-foreground/10">
              <CardHeader className="gap-1 border-b px-6 pt-6 pb-5 [.border-b]:pb-5">
                <h2 className="text-xl">Prefer to talk?</h2>
                <p className="text-sm text-muted-foreground">
                  A coordinator answers during working hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 px-6 py-5">
                <a
                  href={site.phoneHref}
                  className="flex min-h-11 items-center gap-3 text-lg font-semibold text-foreground tabular-nums hover:text-primary"
                >
                  <PhoneIcon
                    aria-hidden="true"
                    className="size-5 text-primary"
                  />
                  {site.phone}
                </a>
                <WhatsAppButton className="w-full" />
              </CardContent>
              <dl className="space-y-4 border-t bg-muted px-6 py-5 text-[0.9375rem]">
                <div>
                  <dt className="font-medium">Working hours</dt>
                  <dd className="mt-0.5 text-muted-foreground">{site.hours}</dd>
                </div>
                <div>
                  <dt className="font-medium">Address</dt>
                  <dd className="mt-0.5 text-muted-foreground">
                    {site.address.street}, {site.address.locality},{" "}
                    {site.address.region} {site.address.postalCode}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Email</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-primary hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Card>

            <Alert className="rounded-lg border-destructive/30 bg-destructive/5 px-5 py-4">
              <TriangleAlertIcon className="text-destructive" />
              <AlertTitle className="font-semibold text-foreground">
                Medical emergency?
              </AlertTitle>
              <AlertDescription className="text-[0.9375rem] text-muted-foreground">
                We do not provide emergency care. Call 112 or go to the nearest
                hospital.
              </AlertDescription>
            </Alert>
          </aside>
        </div>
      </Section>
    </PageTransition>
  );
}
