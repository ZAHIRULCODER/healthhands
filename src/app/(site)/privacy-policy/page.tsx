import type { Metadata } from "next";
import { PageHeader, Prose, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HealthHands collects, uses and protects personal and health-related information under India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy-policy" },
};

// CONFIRM: this is a working draft. Have it reviewed by a lawyer before launch.
export default function PrivacyPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        intro="Draft for legal review. Last updated: to be set at launch."
      />
      <Section>
        <Prose>
          <p>
            This policy explains how {site.name} (&ldquo;we&rdquo;) handles
            personal data, including health-related information, in line with
            the Digital Personal Data Protection Act, 2023 (DPDP Act) and the
            rules made under it.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>
              Details you give in the booking form: name, phone number, service,
              area and an optional message.
            </li>
            <li>
              Details you share on calls or WhatsApp, such as the patient&apos;s
              address, age and medical needs.
            </li>
            <li>
              Basic website usage data through analytics cookies, if you allow
              them.
            </li>
          </ul>
          <h2>Why we use it</h2>
          <p>
            We use your data only to respond to your enquiry, arrange and
            deliver the service, send reports and reminders you asked for, and
            meet legal obligations. We do not sell personal data.
          </p>
          <h2>Consent</h2>
          <p>
            We process your data with your consent, which you give by ticking
            the box on our form or by contacting us. You can withdraw consent at
            any time by writing to {site.email}. Withdrawal does not affect
            processing already done.
          </p>
          <h2>Who we share it with</h2>
          <p>
            Only with people who need it to deliver your service, such as our
            staff, partner laboratories and diagnostic centres, and service
            providers who host our systems. Each is bound to keep it
            confidential.
          </p>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry data for as long as needed to provide the service
            and meet legal and medical record-keeping requirements, then delete
            it.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask to access, correct or erase your personal data, and to
            nominate someone to act for you. To raise a request or a complaint,
            contact our grievance officer at {site.email} or {site.phone}.
          </p>
        </Prose>
      </Section>
    </PageTransition>
  );
}
