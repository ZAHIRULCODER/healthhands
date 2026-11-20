import { buttonVariants } from "@/components/ui/button";
import { site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export function StickyContact() {
  return (
    <div style={{ viewTransitionName: "sticky-contact" }}>
      {/* Mobile: full-width bar at the bottom of the screen */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t bg-background shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden">
        <a
          href={site.phoneHref}
          className="flex min-h-15 items-center justify-center gap-2 font-semibold text-primary"
        >
          <PhoneIcon className="size-5" />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-15 items-center justify-center gap-2 bg-whatsapp font-semibold text-whatsapp-foreground"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </a>
      </div>

      {/* Desktop: floating buttons */}
      {/* The header shows the phone number from xl up, so the floating call button is only needed below that. */}
      <div className="fixed right-5 bottom-5 z-40 hidden flex-col gap-3 md:flex">
        <a
          href={site.phoneHref}
          aria-label={`Call ${site.phone}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "size-12 rounded-full bg-card text-primary shadow-md xl:hidden [&_svg:not([class*='size-'])]:size-5",
          )}
        >
          <PhoneIcon />
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={cn(
            buttonVariants({ variant: "whatsapp" }),
            "size-12 rounded-full shadow-md",
          )}
        >
          <WhatsAppIcon className="size-6" />
        </a>
      </div>
    </div>
  );
}
