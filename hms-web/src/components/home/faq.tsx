import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { T } from "@/components/t";

const faqs = [
  ["What does HMS Plastic make?", "HMS Plastic offers sanitary ware and bathroom fittings, including taps and cocks, mixers, shower heads, health faucets, shower hoses and floor drains."],
  ["How do I enquire about a product?", "Open any product page and use the Enquire button, or message us directly on WhatsApp — the chat button is on every page."],
  ["Where can I find full specifications and product codes?", "Product pages show the details we can confirm from the product itself. Dimensions, thread sizes and catalogue codes are shared on request through an enquiry."],
  ["What colours are available?", "Every HMS product is available in White, Black, Pink, Blue, Sage Green, Gray and Beige. Our photos show the white finish — tell us your colour when you enquire."],
  ["Can I ask about a product that isn't listed?", "Yes. The website shows our current online range — contact the team to ask whether a specific item is available."],
];

export function Faq() {
  return (
    <section className="bg-secondary/70 py-28 lg:py-40">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." description="The essentials about our range and how to reach us." />
        <Reveal delay={0.1}>
          <Accordion defaultValue={["0"]} className="space-y-3">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={String(i)} className="rounded-3xl border-0 bg-white px-6 shadow-sm ring-1 ring-black/[0.04] data-open:shadow-md data-open:ring-gold/40">
                <AccordionTrigger className="items-center py-5 text-left font-display text-base font-semibold text-navy hover:no-underline sm:text-lg"><T>{q}</T></AccordionTrigger>
                <AccordionContent className="pb-5 pr-6 text-[15px] leading-relaxed text-ink-muted"><T>{a}</T></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
