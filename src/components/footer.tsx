import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { services, site } from "@/content/site";
import { Logo } from "./logo";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/service-areas", label: "Service areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/health-guides", label: "Health guides" },
  { href: "/contact", label: "Contact and book" },
] as const;

const linkClass =
  "inline-block py-1 transition-colors hover:text-inverse-foreground";

export function Footer() {
  return (
    <footer className="bg-inverse px-5 pt-16 pb-28 text-inverse-foreground sm:px-8 md:pr-24 md:pb-12 xl:pr-8 dark:border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <Logo tone="inverse" />
          <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-inverse-foreground/65">
            Home healthcare in {site.city}: blood tests, vaccination, nursing,
            physiotherapy and medical equipment.
          </p>
          <address className="mt-5 text-[0.9375rem] leading-relaxed not-italic text-inverse-foreground/65">
            {site.address.street}
            <br />
            {site.address.locality}, {site.address.region}{" "}
            {site.address.postalCode}
          </address>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-inverse-foreground">
            Services
          </h2>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-inverse-foreground/65">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  prefetch
                  transitionTypes={["nav-forward"]}
                  className={linkClass}
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-normal text-inverse-foreground">
            HealthHands
          </h2>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-inverse-foreground/65">
            {companyLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  transitionTypes={["nav-lateral"]}
                  className={linkClass}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h2 className="font-sans text-sm font-semibold tracking-normal text-inverse-foreground">
            Contact
          </h2>
          <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-inverse-foreground/65">
            <li>
              <a href={site.phoneHref} className={linkClass}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl text-sm text-inverse-foreground/55">
        <Separator className="mb-6 bg-inverse-foreground/15" />
        <p className="max-w-3xl">
          HealthHands provides planned home healthcare. We do not provide
          emergency or ambulance services. In a medical emergency, call 112 or
          go to the nearest hospital.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-6">
          <span className="py-2">© {site.name}</span>
          <Link
            href="/privacy-policy"
            className="py-2 transition-colors hover:text-inverse-foreground"
          >
            Privacy policy
          </Link>
          <Link
            href="/terms"
            className="py-2 transition-colors hover:text-inverse-foreground"
          >
            Terms of use
          </Link>
          <Link
            href="/medical-disclaimer"
            className="py-2 transition-colors hover:text-inverse-foreground"
          >
            Medical disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
