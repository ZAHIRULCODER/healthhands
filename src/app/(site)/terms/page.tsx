import type { Metadata } from "next";
import { PageHeader, Prose, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms for using the HealthHands website and booking home healthcare services in Kolkata.",
  alternates: { canonical: "/terms" },
};

// CONFIRM: this is a working draft. Have it reviewed by a lawyer before launch.
export default function TermsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Legal"
        title="Terms of use"
        intro="Draft for legal review. Last updated: to be set at launch."
      />
      <Section>
        <Prose>
          <h2>Bookings</h2>
          <p>
            A booking request sent through this website, WhatsApp or phone is
            not confirmed until we confirm the time and price to you in writing.
          </p>
          <h2>Prices</h2>
          <p>
            Prices shown on this website are starting prices. The final price
            depends on the tests, duration or equipment you need and is shared
            before the visit.
          </p>
          <h2>Cancellations</h2>
          <p>
            Please tell us as early as possible if you need to cancel or
            reschedule a visit.
          </p>
          <h2>Equipment rental</h2>
          <p>
            Rented equipment remains the property of {site.name}. A refundable
            deposit may apply. Please return equipment in the condition it was
            delivered, allowing for normal use.
          </p>
          <h2>Not for emergencies</h2>
          <p>
            Our services are planned home visits. Do not use this website or our
            phone line for medical emergencies.
          </p>
          <h2>Contact</h2>
          <p>Questions about these terms can be sent to {site.email}.</p>
        </Prose>
      </Section>
    </PageTransition>
  );
}
