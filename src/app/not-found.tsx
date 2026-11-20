import Link from "next/link";
import { WhatsAppButton } from "@/components/actions";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold text-primary">Error 404</p>
          <h1 className="text-4xl md:text-5xl">Page not found</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This page has moved or no longer exists. You can browse our services
            or message us directly.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "cta", size: "xl" }))}
            >
              View services
            </Link>
            <WhatsAppButton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
