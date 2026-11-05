import { Gem, LayoutGrid, ShieldCheck, Smile } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { T } from "@/components/t";

const items = [
  { icon: Gem, title: "Quality Craftsmanship", text: "Carefully finished fittings built for daily use." },
  { icon: LayoutGrid, title: "Modern Designs", text: "Clean, contemporary forms that suit today's bathrooms." },
  { icon: ShieldCheck, title: "Reliable Products", text: "Practical fittings you can depend on, every day." },
  { icon: Smile, title: "Customer Satisfaction", text: "A responsive team focused on getting you the right solution." },
];

export function Highlights() {
  return (
    <section id="highlights" className="relative z-10 -mt-14 sm:-mt-20">
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl bg-white p-4 shadow-card ring-1 ring-hairline transition-shadow duration-500 hover:shadow-lift sm:rounded-3xl sm:p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-gold sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[15px] font-medium leading-snug sm:mt-5 sm:text-lg"><T>{title}</T></h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted sm:mt-2 sm:text-sm"><T>{text}</T></p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
