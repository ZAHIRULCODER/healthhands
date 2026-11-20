import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { reviews } from "@/content/site";
import { cn } from "@/lib/utils";

export function ReviewCard({
  review: r,
  size = "base",
  className,
}: {
  review: (typeof reviews)[number];
  size?: "base" | "lg";
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "h-full gap-0 rounded-lg py-0 shadow-none ring-1 ring-foreground/10",
        className,
      )}
    >
      <CardContent className="flex-1 px-7 pt-7 pb-6">
        <blockquote
          className={cn(
            "font-heading leading-relaxed text-foreground",
            size === "lg" ? "text-xl" : "text-[1.1875rem]",
          )}
        >
          “{r.quote}”
        </blockquote>
      </CardContent>
      <CardFooter className="flex-wrap items-center justify-between gap-2 rounded-b-lg border-t bg-transparent px-7 py-4 text-sm">
        <p>
          <span className="font-semibold">{r.name}</span>
          <span className="text-muted-foreground">, {r.area}</span>
        </p>
        <p className="text-muted-foreground">{r.service}</p>
      </CardFooter>
    </Card>
  );
}
