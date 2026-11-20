import { cn } from "@/lib/utils";

export function Logo({ tone = "default" }: { tone?: "default" | "inverse" }) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5",
        tone === "inverse" ? "text-inverse-foreground" : "text-foreground",
      )}
    >
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect
          width="32"
          height="32"
          rx="7"
          className={
            tone === "inverse" ? "fill-inverse-foreground" : "fill-primary"
          }
        />
        <path
          d="M13.5 8h5v5.5H24v5h-5.5V24h-5v-5.5H8v-5h5.5V8Z"
          className={
            tone === "inverse" ? "fill-inverse" : "fill-primary-foreground"
          }
        />
      </svg>
      <span className="text-[1.3rem] font-semibold tracking-[-0.01em]">
        HealthHands
      </span>
    </span>
  );
}
