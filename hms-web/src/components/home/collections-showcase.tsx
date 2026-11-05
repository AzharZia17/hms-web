import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collections, getCategory } from "@/data/categories";
import { getProduct, products } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductPicture } from "@/components/products/product-image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { T } from "@/components/t";

export function CollectionsShowcase({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-secondary/70 py-28 lg:py-40">
      <Container>
        {heading && <SectionHeading eyebrow="Collections" title="Browse by the space you're designing." />}
        <Tabs defaultValue={collections[0].slug} className={heading ? "mt-10 gap-6" : "gap-6"}>
          <Reveal>
            <TabsList className="no-scrollbar h-auto max-w-full justify-start gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-sm ring-1 ring-black/5">
              {collections.map((c) => (
                <TabsTrigger key={c.slug} value={c.slug} className="h-auto flex-none rounded-full px-5 py-3 text-sm font-semibold text-navy/70 data-active:bg-navy data-active:text-white data-active:shadow-md">
                  <T>{c.name.replace(" Collection", "").replace("The ", "")}</T>
                </TabsTrigger>
              ))}
            </TabsList>
          </Reveal>
          {collections.map((c) => {
            const cover = getProduct(c.coverProduct)!;
            const items = products.filter((p) => c.categories.includes(p.category)).slice(0, 4);
            return (
              <TabsContent key={c.slug} value={c.slug} className="grid overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 sm:rounded-4xl md:grid-cols-[1.05fr_1fr]">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px]">
                  <ProductPicture image={cover.images[0]} sizes="(min-width:768px) 50vw, 100vw" hoverZoom={false} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy backdrop-blur"><T>{c.tagline}</T></span>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                  <h3 className="text-2xl font-medium sm:text-4xl"><T>{c.name}</T></h3>
                  <p className="mt-4 max-w-md leading-relaxed text-ink-muted"><T>{c.description}</T></p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.categories.map((slug) => (
                      <li key={slug}>
                        <Link href={`/products?category=${slug}`} className="inline-block rounded-full bg-secondary px-3.5 py-1.5 text-xs font-semibold text-navy transition-colors hover:bg-navy hover:text-white"><T>{getCategory(slug)?.name}</T></Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 grid grid-cols-4 gap-2">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/products/${p.slug}`} aria-label={p.name} className="relative block aspect-square overflow-hidden rounded-2xl ring-1 ring-black/5 transition-transform hover:-translate-y-1">
                          <ProductPicture image={p.images[0]} sizes="120px" hoverZoom={false} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/products?category=${c.categories[0]}`} className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-navy py-2 pl-6 pr-2 text-sm font-semibold text-white hover:bg-navy-ink"> <T>{"View collection"}</T> <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-navy-ink transition-transform group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
                  </Link>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </Container>
    </section>
  );
}
