import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EnquiryForm, EnquiryFormFromUrl } from "@/components/enquiry-form";
import { CheckIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { getService, services, site } from "@/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lp/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: { absolute: `${service.seoTitle} | Book Now | HealthHands` },
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    robots: { index: false, follow: true },
  };
}

/** Ad landing page: one goal (the form), no site navigation. */
export default async function LandingPage({ params }: PageProps<"/lp/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <main id="main" className="flex-1 pb-20 md:pb-0">
      <header className="border-b px-5 sm:px-8">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[0.9375rem] font-medium tabular-nums hover:text-primary sm:flex"
            >
              <PhoneIcon aria-hidden="true" className="size-4 text-primary" />
              {site.phone}
            </a>
            <ModeToggle />
          </div>
        </div>
      </header>
      <section className="px-5 pt-10 pb-16 sm:px-8 md:pt-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start lg:gap-16">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPinIcon aria-hidden="true" className="size-4 text-primary" />
              Garia and South {site.city}
            </p>
            <h1 className="text-4xl leading-[1.1] sm:text-5xl">
              {service.name} in {site.city}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {service.summary}
            </p>
            <ul className="mt-8 space-y-3.5">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <CheckIcon
                    aria-hidden="true"
                    className="mt-1 size-[1.125rem] shrink-0 text-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Card className="mt-8 rounded-lg bg-muted py-5 shadow-none ring-1 ring-foreground/10">
              <CardContent className="flex items-baseline justify-between gap-4 px-5">
                <span className="text-[0.9375rem] text-muted-foreground">
                  {service.pricing[0]?.label}
                </span>
                <span className="font-semibold tabular-nums">
                  {service.pricing[0]?.price}
                </span>
              </CardContent>
            </Card>
          </div>
          <Suspense fallback={<EnquiryForm defaultService={service.slug} />}>
            <EnquiryFormFromUrl service={service.slug} />
          </Suspense>
        </div>
      </section>
      <footer className="border-t px-5 py-6 text-center text-sm text-muted-foreground sm:px-8">
        {site.name}, {site.address.street}, {site.address.locality}{" "}
        {site.address.postalCode}. Not an emergency service.
      </footer>
    </main>
  );
}
