import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/home/cta-section";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The founder behind HMS Plastic — Haji Muhammad Shafi, and the values of trust, integrity and quality that guide the brand.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="Built on the trust of people." description="The values behind HMS Plastic began with its founder." />

      <section className="bg-white py-24 lg:py-36">
        <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal className="mx-auto w-full max-w-md">
            <div className="rounded-4xl bg-white p-2.5 shadow-lift ring-1 ring-hairline">
              <div className="relative aspect-[880/1060] overflow-hidden rounded-3xl">
                <Image src="/images/story/founder.jpg" alt="Haji Muhammad Shafi, founder of HMS Plastic" fill priority sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
              </div>
            </div>
            <div className="mt-6 text-center lg:text-left">
              <p className="eyebrow"><T>{"Founder"}</T></p>
              <h2 className="mt-3 text-2xl font-medium sm:text-3xl"><T>{"Haji Muhammad Shafi"}</T></h2>
              <p className="mt-1 text-sm tracking-wide text-ink-muted"><T>(Late)</T> · <T>(Luna Wale)</T></p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <svg aria-hidden viewBox="0 0 48 36" className="h-10 w-10 text-gold/70" fill="currentColor"><path d="M0 36V19C0 8 6 2 18 0l2 5c-6 2-9 5-9 10h9v21H0Zm28 0V19c0-11 6-17 18-19l2 5c-6 2-9 5-9 10h9v21H28Z" /></svg>
            <blockquote className="mt-6 font-display text-[1.75rem] font-medium leading-[1.2] tracking-[-0.025em] text-navy sm:text-4xl lg:text-[2.6rem]"> <T>{"True success is not just in business, but in the trust of people."}</T> </blockquote>
            <div className="mt-8 h-px w-16 bg-gold" />
            <p className="mt-8 text-lg leading-relaxed text-ink-muted sm:text-xl sm:leading-relaxed"> <T>{"A visionary leader with unwavering values, integrity and a lifelong commitment to trust and quality. His legacy continues to inspire our journey towards a better future."}</T> </p>
            <p className="mt-8 inline-flex items-center gap-3 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-navy ring-1 ring-hairline">
              <span className="h-2 w-2 rounded-full bg-gold" /> <T>{"HMS Plastic — A Product by Four Brothers"}</T> </p>
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {[["Trust", "of people"], ["Integrity", "in every step"], ["Quality", "lifelong commitment"]].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-secondary/70 p-5 ring-1 ring-hairline">
                  <dt className="font-display text-lg font-medium text-navy"><T>{t}</T></dt>
                  <dd className="mt-1 text-sm text-ink-muted"><T>{d}</T></dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>
      <section className="bg-secondary/60 py-20 lg:py-28">
        <Container className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="eyebrow justify-center"><T>{"Our Family of Brands"}</T></p>
            <h2 className="mt-4 text-3xl font-medium sm:text-4xl"><T>{"A project by Ilmas and Luna."}</T></h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted"><T>{"HMS Plastic is a Four Brothers product, carried forward in the spirit of Haji Muhammad Shafi (Luna Wale) and brought to you as a project of Ilmas Sanitary Fittings and Luna Group of Industries — with the same promise of trust and quality."}</T></p>
            <div className="mt-10 flex flex-col items-center justify-center gap-6 rounded-4xl bg-white p-8 shadow-lift ring-1 ring-hairline sm:flex-row sm:gap-12">
              <Image src="/brand/partners/ilmas.png" alt="Ilmas Sanitary Fittings" width={1075} height={319} className="h-16 w-auto object-contain sm:h-20" />
              <span aria-hidden className="hidden h-12 w-px bg-hairline sm:block" />
              <Image src="/brand/partners/luna.png" alt="Luna Group of Industries" width={990} height={227} className="h-16 w-auto object-contain sm:h-20" />
            </div>
          </Reveal>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
