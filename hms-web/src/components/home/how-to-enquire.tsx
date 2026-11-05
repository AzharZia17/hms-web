import { MessageSquareText, Search, Handshake } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { T } from "@/components/t";

const steps = [
  { icon: Search, title: "Browse the range", text: "Search or filter by category to find the fitting you need, and open any product for its details." },
  { icon: MessageSquareText, title: "Send an enquiry", text: "Use the Enquire button on a product page, or message us directly on WhatsApp." },
  { icon: Handshake, title: "Talk to our team", text: "We'll come back to you with the information you need to choose the right solution." },
];

export function HowToEnquire() {
  return (
    <section className="bg-white py-28 lg:py-40">
      <Container>
        <SectionHeading eyebrow="How It Works" title="From first look to the right product." />
        <ol className="relative mt-12 grid gap-4 md:grid-cols-3 md:gap-6 lg:mt-16">
          <div aria-hidden className="absolute left-[16%] right-[16%] top-11 hidden h-px border-t border-dashed border-gold/60 md:block" />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <li className="relative h-full rounded-3xl bg-secondary/70 p-7 ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lift sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="relative z-10 grid h-[3.75rem] w-[3.75rem] place-items-center rounded-2xl bg-navy text-gold shadow-lg">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span aria-hidden className="font-display text-7xl font-extrabold leading-none text-navy/[0.07]">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium"><T>{title}</T></h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted"><T>{text}</T></p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
