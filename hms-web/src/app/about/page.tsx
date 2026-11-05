import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ButtonLink } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AboutSection } from "@/components/home/about-section";
import { ProductFeatures } from "@/components/home/product-features";
import { WhyChoose } from "@/components/home/why-choose";
import { CtaSection } from "@/components/home/cta-section";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about HMS Plastic — our approach to design, quality and customer service in sanitary ware.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Practical design, carefully made."
        description="HMS Plastic creates sanitary ware and bathroom fittings that balance clean design with dependable everyday performance."
      />
      <AboutSection />
      <section className="bg-secondary/70 py-24 lg:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-4xl bg-white p-7 shadow-card ring-1 ring-hairline sm:p-12 lg:flex-row lg:items-center">
              <div>
                <span className="eyebrow"><T>{"Our Story"}</T></span>
                <h2 className="mt-4 text-[1.7rem] font-medium leading-[1.15] sm:text-4xl"><T>{"Built on the trust of people."}</T></h2>
                <p className="mt-3 max-w-xl text-ink-muted"><T>{"The values behind HMS Plastic began with its founder."}</T></p>
              </div>
              <ButtonLink href="/our-story" variant="navy"><T>{"Meet the founder"}</T></ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
      <WhyChoose />
      <ProductFeatures />
      <CtaSection />
    </>
  );
}
