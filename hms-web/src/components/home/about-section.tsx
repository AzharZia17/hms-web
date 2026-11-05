import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getProduct } from "@/data/products";
import { ProductPicture } from "@/components/products/product-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { T } from "@/components/t";

const points = [
  ["quality", "Quality", "Our quality philosophy", "Every fitting should feel solid in the hand and perform reliably day after day."],
  ["design", "Design", "Our design approach", "Clean white forms with clear, simple lines that sit comfortably in any bathroom."],
  ["care", "Commitment", "Our customer commitment", "Helping customers choose the right product, with a team that is easy to reach."],
] as const;

export function AboutSection() {
  const a = getProduct("wall-mixer-3in1")!;
  const b = getProduct("sink-cock-wall-swan")!;
  const c = getProduct("shower-head-square")!;
  return (
    <section className="bg-white py-28 lg:py-40">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative mx-auto grid w-full max-w-xl grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
          <div className="col-span-3 row-span-6 aspect-[3/5] overflow-hidden rounded-3xl shadow-xl sm:rounded-4xl">
            <ProductPicture image={a.images[0]} sizes="(min-width:1024px) 28vw, 55vw" />
          </div>
          <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl shadow-lg sm:rounded-3xl">
            <ProductPicture image={b.images[0]} sizes="(min-width:1024px) 20vw, 35vw" />
          </div>
          <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl shadow-lg sm:rounded-3xl">
            <ProductPicture image={c.images[0]} sizes="(min-width:1024px) 20vw, 35vw" />
          </div>
          {/* Rotating badge */}
          <div aria-hidden className="absolute -bottom-6 left-[38%] grid h-28 w-28 place-items-center rounded-full bg-navy text-white shadow-2xl sm:h-32 sm:w-32">
            <svg viewBox="0 0 120 120" className="spin-text absolute inset-0">
              <defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
              <text fontSize="11" fontWeight="700" letterSpacing="3.2" fill="#DC9807"><textPath href="#circ"><T>{"HMS PLASTIC • BATHROOM FITTINGS •"}</T></textPath></text>
            </svg>
            <span className="font-display text-xl font-extrabold"><T>{"HMS"}</T></span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow"><T>{"About HMS"}</T></span>
          <h2 className="mt-5 text-[1.9rem] font-medium leading-[1.1] sm:text-4xl lg:text-5xl"><T>{"Built on Quality. Designed for Modern Living."}</T></h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg"> <T>{"HMS Plastic is a sanitary ware brand creating practical, well-finished bathroom fittings — from taps and mixers to shower heads and drains."}</T> </p>
          <Tabs defaultValue="quality" className="mt-8">
            <TabsList className="h-auto w-full justify-start gap-1 rounded-full bg-secondary p-1.5">
              {points.map(([v, label]) => (
                <TabsTrigger key={v} value={v} className="h-auto rounded-full px-4 py-2.5 text-sm font-semibold text-navy/70 data-active:bg-navy data-active:text-white data-active:shadow-md"><T>{label}</T></TabsTrigger>
              ))}
            </TabsList>
            {points.map(([v, , title, text]) => (
              <TabsContent key={v} value={v} className="mt-5 rounded-3xl bg-secondary/70 p-6">
                <h3 className="text-lg font-medium"><T>{title}</T></h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted"><T>{text}</T></p>
              </TabsContent>
            ))}
          </Tabs>
          <Link href="/about" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-navy py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-navy-ink"> <T>{"Learn more about HMS"}</T> <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy-ink transition-transform group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
