import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, ContentIcon } from "@/components/icons";
import { CtaBand, PageHeader, Section } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Home Healthcare Services in Kolkata",
  description:
    "All HealthHands home healthcare services in Kolkata with starting prices: blood tests, vaccination, nursing, physiotherapy, medical equipment and ECG.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Services"
        title="Home healthcare services in Kolkata"
        intro="Every service is delivered at your home by trained HealthHands staff. Starting prices are listed below, and we confirm the full price in writing before each visit."
      />
      <Section>
        <ul className="divide-y border-y">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                prefetch
                transitionTypes={["nav-forward"]}
                className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-3 py-8 sm:grid-cols-[auto_1fr_12rem] sm:items-center sm:gap-x-10"
              >
                <span className="grid size-11 place-items-center rounded-md bg-secondary text-primary">
                  <ContentIcon
                    name={s.icon}
                    className="size-5"
                    strokeWidth={1.75}
                  />
                </span>
                <span>
                  <span className="block font-heading text-xl leading-snug font-medium transition-colors group-hover:text-primary md:text-2xl">
                    {s.name}
                  </span>
                  <span className="mt-1.5 block max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {s.summary}
                  </span>
                </span>
                <span className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
                  <span className="text-sm text-muted-foreground">
                    From{" "}
                    <span className="text-base font-semibold text-foreground">
                      {s.pricing[0]?.price.replace(/^From /, "")}
                    </span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand
        title="Not sure which service you need?"
        body="Tell us about the patient and we will suggest the right option."
      />
    </PageTransition>
  );
}
