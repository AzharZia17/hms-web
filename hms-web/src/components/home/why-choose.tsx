import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Compass, Factory, Layers, HeartHandshake } from "lucide-react";
import { T } from "@/components/t";

const items = [
  { icon: Compass, title: "Thoughtful Product Design", text: "Comfortable handles, clean profiles and details that make everyday use easier." },
  { icon: Factory, title: "Quality-Focused Manufacturing", text: "A consistent finish and attention to detail across every product we make." },
  { icon: Layers, title: "Modern Product Range", text: "Taps, mixers, showers, health faucets, hoses and drains — one coordinated range." },
  { icon: HeartHandshake, title: "Customer-Oriented Approach", text: "Straightforward guidance and support from enquiry to delivery." },
];

export function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-24 text-white lg:py-32">
      <Container>
        <SectionHeading light eyebrow="Why Choose HMS" title="A brand built around the details." />
        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10 transition-colors duration-500 hover:bg-white/[0.08] sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-7 text-xl font-medium text-white"><T>{title}</T></h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65"><T>{text}</T></p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
