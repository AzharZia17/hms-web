import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { getProduct, productsByCategory } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductPicture } from "@/components/products/product-image";
import { cn } from "@/lib/utils";
import { T } from "@/components/t";

// Bento layout. Mobile: 2 columns (first and last tiles span both). Desktop: 4 columns.
const tiles = [
  "col-span-2 aspect-[4/3] lg:col-span-2 lg:row-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "col-span-2 aspect-[16/8] lg:col-span-4 lg:aspect-auto lg:h-56",
];

export function FeaturedCategories() {
  return (
    <section className="bg-white pb-28 pt-10 lg:pb-40">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Product Categories" title="Everything the modern bathroom needs." />
          <Reveal>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"> <T>{"Browse all products"}</T> <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4">
          {categories.map((c, i) => {
            const cover = getProduct(c.coverProduct)!;
            const count = productsByCategory(c.slug).length;
            const big = i === 0 || i === 5;
            return (
              <Reveal key={c.slug} delay={(i % 3) * 0.07} className={cn("min-h-0", tiles[i])}>
                <Link href={`/products?category=${c.slug}`} className="group relative block h-full w-full overflow-hidden rounded-2xl bg-navy ring-1 ring-black/5 sm:rounded-3xl">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]">
                    <ProductPicture image={cover.images[0]} sizes="(min-width:1024px) 40vw, 50vw" hoverZoom={false} />
                  </div>
                  <span aria-hidden className="absolute left-4 top-4 font-display text-xs font-bold tracking-[0.2em] text-white/90 drop-shadow sm:left-6 sm:top-6">{String(i + 1).padStart(2, "0")}</span>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-ink/90 via-navy-ink/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-6">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold sm:text-[11px]">{count} <T>{count === 1 ? "product" : "products"}</T></p>
                      <h3 className={cn("mt-1 font-medium leading-tight text-white", big ? "text-xl sm:text-3xl" : "text-[15px] sm:text-xl")}><T>{c.name}</T></h3>
                      {big && <p className="mt-2 hidden max-w-sm text-sm text-white/75 sm:block"><T>{c.description}</T></p>}
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-navy transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold sm:h-12 sm:w-12">
                      <ArrowUpRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0 sm:h-5 sm:w-5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
