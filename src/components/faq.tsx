import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <Accordion multiple className="border-t">
      {items.map((item) => (
        <AccordionItem key={item.q} value={item.q} className="border-b">
          <AccordionTrigger className="items-center gap-4 rounded-none py-5 font-sans text-base leading-snug font-semibold hover:no-underline md:text-[1.0625rem] [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-trigger-icon]]:text-muted-foreground">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-5 text-base leading-relaxed text-muted-foreground">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
