import type { Metadata } from "next";
import { Droplets, Leaf, ShieldCheck, Hourglass, Recycle, PackageOpen, Factory, Waves, Trash2 } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Environment",
  description: "HMS Plastic's approach to caring for the environment — water saving, eco friendly, leak proof and built to last.",
  alternates: { canonical: "/environment" },
};

const pillars = [
  { icon: Droplets, title: "Water Saving" },
  { icon: Leaf, title: "Eco Friendly" },
  { icon: ShieldCheck, title: "Leak Proof" },
  { icon: Hourglass, title: "Built to Last" },
];

const focus = [
  { icon: Waves, title: "Water Conservation" },
  { icon: Trash2, title: "Waste Reduction" },
  { icon: Recycle, title: "Recycling" },
  { icon: Hourglass, title: "Product Durability" },
  { icon: Factory, title: "Responsible Manufacturing" },
  { icon: PackageOpen, title: "Sustainable Packaging" },
];

export default function EnvironmentPage() {
  return (
    <>
      <PageHero eyebrow="Environment" title="Caring for the world our products live in." />

      <section className="bg-white py-20 lg:py-28">
        <Container>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="flex h-full flex-col items-start gap-5 rounded-3xl bg-secondary/70 p-5 ring-1 ring-hairline sm:p-8">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold"><Icon className="h-6 w-6" /></span>
                    <h2 className="font-display text-lg font-medium text-navy sm:text-2xl"><T>{title}</T></h2>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="rounded-4xl bg-navy-ink py-20 text-white lg:py-28">
        <Container>
          <Reveal>
            <p className="eyebrow"><T>{"Areas of Focus"}</T></p>
            <h2 className="mt-4 max-w-2xl text-3xl font-medium text-white sm:text-5xl"><T>{"What we aim to look after."}</T></h2>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {focus.map(({ icon: Icon, title }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.05}>
                  <div className="flex items-center gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold"><Icon className="h-5 w-5" /></span>
                    <span className="font-display text-lg font-medium"><T>{title}</T></span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
