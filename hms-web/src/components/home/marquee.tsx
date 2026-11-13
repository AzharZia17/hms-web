import { categories } from "@/data/categories";
import { Marquee as MagicMarquee } from "@/components/ui/marquee";
import { T } from "@/components/t";

/** Solid navy ticker (Magic UI Marquee) separating the hero from the catalogue. */
export function Marquee() {
  return (
    <div aria-hidden className="bg-white py-12 sm:py-16">
      <MagicMarquee pauseOnHover className="[--duration:60s] [--gap:3rem] p-0 sm:[--gap:5rem]">
        {categories.map((c) => (
          <span key={c.slug} className="flex items-center gap-8 sm:gap-14">
            <span className="font-display text-4xl font-medium uppercase tracking-tight text-navy sm:text-6xl"><T>{c.name}</T></span>
            <span className="h-2 w-2 rotate-45 bg-gold" />
          </span>
        ))}
      </MagicMarquee>
    </div>
  );
}
