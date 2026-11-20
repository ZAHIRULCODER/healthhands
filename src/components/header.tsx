"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { PhoneIcon } from "./icons";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-40 border-b bg-background/90 px-5 backdrop-blur-md sm:px-8"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4">
        <Link href="/" transitionTypes={["nav-lateral"]} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  transitionTypes={["nav-lateral"]}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative flex h-16 items-center px-3 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:text-foreground xl:px-3.5",
                    "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-transparent",
                    isActive(item.href) && "text-foreground after:bg-primary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-[0.9375rem] font-medium whitespace-nowrap text-foreground hover:text-primary xl:flex"
          >
            <PhoneIcon className="size-4 text-primary" />
            {site.phone}
          </a>
          <Link
            href="/contact#book"
            transitionTypes={["nav-forward"]}
            className={cn(
              buttonVariants({ variant: "cta", size: "xl" }),
              "min-h-10 px-4 py-2 text-[0.9375rem] max-sm:hidden",
            )}
          >
            Book a visit
          </Link>
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon-xl"
                  className="size-10 bg-transparent lg:hidden"
                />
              }
            >
              <MenuIcon />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] gap-0 p-0">
              <SheetHeader className="p-5">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <nav aria-label="Main" className="flex flex-1 flex-col px-5">
                <ul className="divide-y">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        transitionTypes={["nav-lateral"]}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "block py-4 text-lg font-medium",
                          isActive(item.href) && "text-primary",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 py-6">
                  <Link
                    href="/contact#book"
                    transitionTypes={["nav-forward"]}
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "cta", size: "xl" }),
                    )}
                  >
                    Book a home visit
                  </Link>
                  <a
                    href={site.phoneHref}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "xl" }),
                      "border-input",
                    )}
                  >
                    <PhoneIcon data-icon="inline-start" />
                    {site.phone}
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
