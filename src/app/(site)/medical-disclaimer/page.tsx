import type { Metadata } from "next";
import { PageHeader, Prose, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "Medical disclaimer for the HealthHands website and home healthcare services in Kolkata.",
  alternates: { canonical: "/medical-disclaimer" },
};

// CONFIRM: this is a working draft. Have it reviewed by a lawyer before launch.
export default function DisclaimerPage() {
  return (
    <PageTransition>
      <PageHeader eyebrow="Legal" title="Medical disclaimer" />
      <Section>
        <Prose>
          <p>
            The information on this website is for general information only. It
            is not medical advice and does not replace a consultation with a
            qualified doctor.
          </p>
          <p>
            Home services such as tests, vaccinations, nursing and physiotherapy
            should be taken on the advice of your doctor. Always share your
            reports with your doctor for interpretation.
          </p>
          <p>
            <strong>
              HealthHands does not provide emergency or ambulance services.
            </strong>{" "}
            In a medical emergency, call 112 or go to the nearest hospital
            immediately.
          </p>
        </Prose>
      </Section>
    </PageTransition>
  );
}
