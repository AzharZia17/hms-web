import { Droplets, Leaf, ShieldCheck, ThumbsUp, Wrench, Hammer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { T } from "@/components/t";

// The six product features listed in the HMS catalogue.
const features = [
  { icon: Droplets, title: "Water Saving" },
  { icon: Leaf, title: "Eco Friendly" },
  { icon: ShieldCheck, title: "Leak Proof Performance" },
  { icon: ThumbsUp, title: "Smooth Operation, Long Life" },
  { icon: Wrench, title: "Easy to Install" },
  { icon: Hammer, title: "High Durability & Strength" },
];

export function ProductFeatures() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <Container>
        <SectionHeading eyebrow="Product Features" title="What every HMS product is made to deliver." />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3">
          {features.map(({ icon: Icon, title }, i) => (
            <li key={title}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <div className="flex h-full flex-col items-start gap-4 rounded-2xl bg-secondary/70 p-4 ring-1 ring-hairline transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lift sm:flex-row sm:items-center sm:gap-5 sm:rounded-3xl sm:p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-navy ring-1 ring-navy/15 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="text-[15px] font-medium leading-snug sm:text-lg"><T>{title}</T></h3>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted"><T>{"Cocks and mixers are supplied with a brass mohra."}</T></p>
      </Container>
    </section>
  );
}
