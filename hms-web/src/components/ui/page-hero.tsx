import { Container } from "./container";
import { T } from "@/components/t";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="relative isolate overflow-hidden rounded-b-4xl bg-navy-ink pb-20 pt-36 text-white sm:pb-28 sm:pt-48">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,61,128,0.55),transparent_60%)]" />
      <Container>
        <span className="eyebrow"><T>{eyebrow}</T></span>
        <h1 className="mt-6 max-w-3xl text-[2.4rem] font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl"><T>{title}</T></h1>
        {description && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-xl"><T>{description}</T></p>}
      </Container>
    </section>
  );
}
