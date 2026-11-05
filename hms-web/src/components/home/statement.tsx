"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Container } from "@/components/ui/container";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { T } from "@/components/t";
import { useLang } from "@/lib/i18n/lang-provider";

const text = "Clean lines. Considered details. Everyday reliability. Bathroom fittings designed to be lived with, season after season.";

/** The one special visual section: Aceternity's Text Generate Effect on a quiet navy field. */
export function Statement() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  return (
    <section className="relative bg-navy-ink py-28 lg:py-44">
      <Container>
        <span className="eyebrow"><T>{"The HMS Approach"}</T></span>
        <div ref={ref} className="mt-10 min-h-[12rem] max-w-5xl lg:min-h-[16rem]">
          {inView && <TextGenerateEffect key={lang} words={t(text)} className="font-display text-[1.75rem] font-medium leading-[1.2] tracking-[-0.025em] text-white sm:text-4xl lg:text-6xl lg:leading-[1.12]" />}
        </div>
      </Container>
    </section>
  );
}
