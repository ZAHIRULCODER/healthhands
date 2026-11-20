import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { BookButton, WhatsAppButton } from "./actions";
import { ArrowRightIcon } from "./icons";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("px-5 py-16 sm:px-8 md:py-24", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mb-4 text-sm font-semibold text-primary", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-6 md:flex-row md:items-end",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-3xl md:text-[2.5rem]">{title}</h2>
        {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  back,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Optional link up the hierarchy, shown above the eyebrow. Navigates with a "nav-back" transition. */
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b bg-muted px-5 pt-12 pb-14 sm:px-8 md:pt-20 md:pb-20">
      <div className="mx-auto max-w-6xl">
        {back && (
          <Link
            href={back.href}
            transitionTypes={["nav-back"]}
            className="group/back -mt-3 mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 rotate-180 transition-transform group-hover/back:-translate-x-0.5"
            />
            {back.label}
          </Link>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-[3.25rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-foreground [&_li]:ml-6 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-foreground">
      {children}
    </div>
  );
}

export function CtaBand({
  title = "Arrange care at home",
  body = `Send a request and a coordinator will call you back within ${site.responseMinutes} minutes during working hours.`,
  service,
}: {
  title?: string;
  body?: string;
  service?: string;
}) {
  return (
    <section className="bg-band px-5 py-16 text-band-foreground sm:px-8 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-band-foreground/80">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookButton
            service={service}
            className="bg-band-foreground text-band hover:bg-band-foreground/90 dark:bg-band-foreground dark:text-band"
          />
          <WhatsAppButton tone="inverse" />
        </div>
      </div>
    </section>
  );
}
