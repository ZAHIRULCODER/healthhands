import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { BookButton, TextLink, WhatsAppButton } from "@/components/actions";
import { Faq } from "@/components/faq";
import { CheckIcon, PhoneIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import {
  CtaBand,
  PageHeader,
  Section,
  SectionHeading,
} from "@/components/layout";
import { PageTransition } from "@/components/page-transition";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getService, services, site } from "@/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: { absolute: `${service.seoTitle} | HealthHands` },
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <CheckIcon
            aria-hidden="true"
            className="mt-1 size-[1.125rem] shrink-0 text-primary"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

// params is URL data: reading it at the top of the page would tie the shared
// App Shell to one URL. The shell (back link + skeleton) stays shareable, and the
// service content streams in, or is ready on click when the link prefetches it.
export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <PageTransition>
      <Suspense fallback={<ServiceSkeleton />}>
        <ViewTransition enter="reveal" default="none">
          <ServiceContent params={params} />
        </ViewTransition>
      </Suspense>
    </PageTransition>
  );
}

function ServiceSkeleton() {
  return (
    <div
      aria-busy="true"
      className="[&_[data-slot=skeleton]]:bg-foreground/[0.07]"
    >
      <span className="sr-only">Loading service</span>
      <section className="border-b bg-muted px-5 pt-12 pb-14 sm:px-8 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="-mt-3 mb-6 h-5 w-28" />
          <Skeleton className="mb-4 h-4 w-16" />
          <Skeleton className="h-12 w-full max-w-xl md:h-14" />
          <Skeleton className="mt-3 h-12 w-2/3 max-w-md md:h-14" />
          <Skeleton className="mt-6 h-5 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-5 w-4/5 max-w-xl" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>
      </section>
      <section className="px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-4/5" />
          </div>
          <Skeleton className="h-72 w-full rounded-lg" />
        </div>
      </section>
    </div>
  );
}

async function ServiceContent({
  params,
}: {
  params: PageProps<"/services/[slug]">["params"];
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const waMessage = `Hello, I would like to book ${service.name}.`;
  const bookingSteps = [
    [
      "Send a request",
      "Use the form, WhatsApp or call. Tell us the patient's name, phone and area.",
    ],
    [
      "We confirm",
      `We call back within ${site.responseMinutes} minutes during working hours with a time and price.`,
    ],
    ["We visit", "A HealthHands team member arrives at the agreed time."],
  ];

  return (
    <>
      <PageHeader
        back={{ href: "/services", label: "All services" }}
        eyebrow="Service"
        title={`${service.name} in ${site.city}`}
        intro={service.what}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <BookButton service={service.slug} />
          <WhatsAppButton message={waMessage} />
        </div>
      </PageHeader>

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="space-y-14">
            <div>
              <h2 className="text-2xl md:text-3xl">Who it is for</h2>
              <CheckList items={service.whoFor} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl">What is included</h2>
              <CheckList items={service.included} />
              <p className="mt-6 border-l-2 border-primary pl-4 leading-relaxed text-muted-foreground">
                {service.delivery}
              </p>
            </div>
          </div>

          <Card className="gap-0 rounded-lg py-0 shadow-sm ring-1 ring-foreground/10 lg:sticky lg:top-24">
            <CardHeader className="gap-1 border-b px-6 pt-6 pb-5 [.border-b]:pb-5">
              <CardTitle className="font-heading text-xl">
                Starting prices
              </CardTitle>
              <CardDescription className="text-sm">
                Confirmed in writing before the visit.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 py-1">
              <dl className="divide-y">
                {service.pricing.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <dt className="text-[0.9375rem]">
                      {p.label}
                      {p.note && (
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {p.note}
                        </span>
                      )}
                    </dt>
                    <dd className="shrink-0 text-right font-semibold tabular-nums">
                      {p.price}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3 rounded-b-lg border-t bg-muted px-6 py-5">
              <BookButton service={service.slug} className="w-full" />
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 py-1 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <PhoneIcon aria-hidden="true" className="size-4" />
                Or call {site.phone}
              </a>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Section className="border-y bg-muted">
        <SectionHeading
          eyebrow="How to book"
          title="Three steps to a home visit"
        />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {bookingSteps.map(([title, body], i) => (
            <li key={title} className="border-t-2 border-primary pt-6">
              <p className="text-sm font-semibold text-primary tabular-nums">
                Step {i + 1}
              </p>
              <h3 className="mt-2 text-xl">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title={`${service.shortName}: common questions`}
            />
            <TextLink href="/services" transition="nav-back" className="mt-6">
              See other services
            </TextLink>
          </div>
          <Faq items={service.faqs} />
        </div>
      </Section>

      <CtaBand
        title={`Book ${service.name.toLowerCase()}`}
        service={service.slug}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.seoDescription,
          url: `${site.url}/services/${service.slug}`,
          areaServed: { "@type": "City", name: site.city },
          provider: { "@id": `${site.url}/#business` },
        }}
      />
    </>
  );
}
