import type { Metadata } from "next";
import Link from "next/link";
import { BookButton, TextLink, WhatsAppButton } from "@/components/actions";
import { Faq } from "@/components/faq";
import {
  ArrowRightIcon,
  CheckIcon,
  ContentIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { CtaBand, Section, SectionHeading } from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import { ReviewCard } from "@/components/review-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  homeFaqs,
  reviews,
  serviceAreas,
  services,
  site,
  steps,
  trustPoints,
} from "@/content/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "HealthHands | Home Healthcare in Kolkata: Blood Tests, Nursing, Physio",
  },
  description:
    "Home healthcare in Kolkata. Blood tests, vaccination, nursing, physiotherapy and medical equipment at your door in Garia, Jadavpur, Tollygunge and South Kolkata.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <PageTransition>
      <Hero />

      <Section id="services">
        <SectionHeading
          eyebrow="Services"
          title="Care we provide at home"
          intro="Each service is delivered by trained HealthHands staff. Prices shown are starting prices, confirmed in writing before every visit."
          action={<TextLink href="/services">All services and prices</TextLink>}
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="bg-card">
              <Link
                href={`/services/${s.slug}`}
                prefetch
                transitionTypes={["nav-forward"]}
                className="group flex h-full flex-col p-6 transition-colors outline-none hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset md:p-7"
              >
                <ContentIcon
                  name={s.icon}
                  className="size-6 text-primary"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-xl leading-snug">{s.name}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {s.summary}
                </p>
                <p className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
                  <span className="text-muted-foreground">
                    From{" "}
                    <span className="font-semibold text-foreground">
                      {s.pricing[0]?.price.replace(/^From /, "")}
                    </span>
                  </span>
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-y bg-muted">
        <SectionHeading
          eyebrow="How it works"
          title="From first message to home visit"
        />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-primary pt-6">
              <p className="text-sm font-semibold text-primary tabular-nums">
                Step {i + 1}
              </p>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why HealthHands"
              title="Care you can verify"
              intro="We share the name of the person visiting, confirm the price in writing and send every report digitally. Ask us for staff qualifications and lab accreditation before you book."
            />
            <TextLink href="/about" className="mt-6">
              About our team
            </TextLink>
          </div>
          <dl className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {trustPoints.map((t) => (
              <div key={t.title}>
                <dt className="flex items-center gap-3 font-semibold">
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                    <ContentIcon
                      name={t.icon}
                      className="size-[1.125rem]"
                      strokeWidth={1.75}
                    />
                  </span>
                  {t.title}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {t.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section className="bg-inverse text-inverse-foreground">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="mb-4 text-sm font-semibold text-highlight">
              Service areas
            </p>
            <h2 className="text-3xl md:text-[2.5rem]">
              Garia and South Kolkata
            </h2>
            <p className="mt-4 text-lg text-inverse-foreground/75">
              Our team is based in Garia. If your area is not listed, message us
              and we will confirm whether we can reach you.
            </p>
            <TextLink href="/service-areas" className="mt-6 text-highlight">
              View all areas
            </TextLink>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {serviceAreas.map((z) => (
              <div key={z.zone}>
                <h3 className="border-b border-inverse-foreground/20 pb-3 font-sans text-sm font-semibold text-inverse-foreground">
                  {z.zone}
                </h3>
                <ul className="mt-4 space-y-2 text-[0.9375rem] text-inverse-foreground/75">
                  {z.areas.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Reviews"
          title="What families tell us"
          action={<TextLink href="/reviews">Read all reviews</TextLink>}
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <li key={r.name}>
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t bg-muted">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Questions" title="Before you book" />
            <p className="mt-4 max-w-sm text-lg text-muted-foreground">
              Cannot find your answer? A coordinator can help on WhatsApp or by
              phone.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                label="Ask a question"
                message="Hello, I have a question before booking:"
              />
            </div>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </Section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </PageTransition>
  );
}

function Hero() {
  return (
    <section className="border-b px-5 pt-14 pb-16 sm:px-8 md:pt-20 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPinIcon aria-hidden="true" className="size-4 text-primary" />
            Home healthcare in Garia and South {site.city}
          </p>
          <h1 className="text-[2.6rem] leading-[1.08] sm:text-[3.25rem] lg:text-[3.75rem]">
            Medical care at home, arranged in one call.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Blood tests, vaccination, nursing, physiotherapy and medical
            equipment, delivered to your door by trained HealthHands staff.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookButton />
            <WhatsAppButton />
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {[
              "Price confirmed in writing",
              "Digital reports",
              `Reply within ${site.responseMinutes} minutes`,
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckIcon aria-hidden="true" className="size-4 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <BookingSummary />
      </div>
    </section>
  );
}

/** Shows what a written booking confirmation contains, so families know what to expect. */
function BookingSummary() {
  return (
    <Card className="w-full gap-0 rounded-lg py-0 shadow-[0_1px_2px_rgba(15,31,29,0.04),0_12px_32px_-12px_rgba(15,31,29,0.18)] ring-1 ring-foreground/8">
      <CardHeader className="gap-1 border-b px-6 pt-5 pb-4 [.border-b]:pb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            Booking confirmation
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Confirmed
          </span>
        </div>
        <CardTitle className="mt-1 font-heading text-2xl">
          Tomorrow, 7:15 am
        </CardTitle>
        <CardDescription className="text-sm">
          Sample of the details we send on WhatsApp
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-2">
        <dl className="divide-y text-[0.9375rem]">
          {[
            ["Service", "Fasting blood test"],
            ["Patient", "Mrs. Chatterjee, 72"],
            ["Location", "Patuli, Kolkata 700094"],
            ["Visiting", "Phlebotomist, ID shared"],
            ["Report", "WhatsApp and email, same day"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
      <Separator />
      <CardFooter className="justify-between rounded-b-lg bg-muted px-6 py-4 text-sm">
        <span className="text-muted-foreground">
          Questions about a booking?
        </span>
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
        >
          <PhoneIcon aria-hidden="true" className="size-4" />
          {site.phone}
        </a>
      </CardFooter>
    </Card>
  );
}
