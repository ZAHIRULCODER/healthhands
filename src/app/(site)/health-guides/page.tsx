import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/actions";
import { CtaBand, PageHeader, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Health Guides for Home Care in Kolkata",
  description:
    "Practical guides from HealthHands on home blood tests, vaccination, recovery after surgery and caring for elderly parents in Kolkata.",
  alternates: { canonical: "/health-guides" },
};

const upcoming = [
  "How to prepare for a fasting blood test at home",
  "Which vaccines adults over 50 should ask their doctor about",
  "Setting up a room at home after a knee replacement",
  "Renting or buying an oxygen concentrator: what to check",
];

export default function HealthGuidesPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Health guides"
        title="Guides for caring at home"
        intro="Short, practical articles written with our nurses and physiotherapists. The first guides are being written now."
      />
      <Section>
        <h2 className="text-2xl">Coming soon</h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {upcoming.map((t) => (
            <li key={t} className="py-4 text-lg">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <p className="mb-4 text-lg text-muted-foreground">
            Have a question you want answered now?
          </p>
          <WhatsAppButton
            message="Hello, I have a question about home care:"
            label="Ask on WhatsApp"
          />
        </div>
      </Section>
      <CtaBand />
    </PageTransition>
  );
}
