import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, WhatsAppIcon } from "./icons";

// Links styled as buttons use buttonVariants on <a>/<Link>, as the shadcn
// Base UI docs recommend, so they keep their link semantics.

/** View transition types used for navigation (see page-transition.tsx). */
export type NavTransition = "nav-forward" | "nav-back" | "nav-lateral";

export function BookButton({
  service,
  label = "Book a home visit",
  className,
}: {
  service?: string;
  label?: string;
  className?: string;
}) {
  const href = service ? `/contact?service=${service}#book` : "/contact#book";
  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      className={cn(buttonVariants({ variant: "cta", size: "xl" }), className)}
    >
      {label}
      <ArrowRightIcon data-icon="inline-end" />
    </Link>
  );
}

export function WhatsAppButton({
  message,
  label = "Chat on WhatsApp",
  tone = "default",
  className,
}: {
  message?: string;
  label?: string;
  tone?: "default" | "inverse";
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({
          variant: tone === "inverse" ? "inverse" : "outline",
          size: "xl",
        }),
        tone === "default" && "border-input bg-card",
        className,
      )}
    >
      <WhatsAppIcon
        data-icon="inline-start"
        className={tone === "default" ? "text-whatsapp" : undefined}
      />
      {label}
    </a>
  );
}

export function TextLink({
  href,
  children,
  transition = "nav-lateral",
  className,
}: {
  href: string;
  children: React.ReactNode;
  /** Use "nav-back" for links up the hierarchy. */
  transition?: NavTransition;
  className?: string;
}) {
  return (
    <Link
      href={href}
      transitionTypes={[transition]}
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:underline hover:underline-offset-4",
        className,
      )}
    >
      {children}
      <ArrowRightIcon
        aria-hidden="true"
        className="size-4 transition-transform group-hover/link:translate-x-0.5"
      />
    </Link>
  );
}
