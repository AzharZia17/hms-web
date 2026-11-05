import { featuredProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/cta";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductCard } from "@/components/products/product-card";
import { T } from "@/components/t";

export function FeaturedProducts() {
  const items = featuredProducts.slice(0, 8);
  return (
    <section className="overflow-hidden bg-secondary/70 py-28 lg:py-40">
      <Container>
        <div className="mt-10 grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:hidden">
          {items.slice(0, 6).map((p, i) => (
            <div key={p.slug} className="min-w-0 even:mt-8"><ProductCard product={p} index={i} sizes="50vw" /></div>
          ))}
        </div>
        <Carousel opts={{ align: "start", dragFree: true }} className="hidden sm:block">
          <div className="mb-6 flex items-end justify-between gap-6">
            <SectionHeading eyebrow="Featured Products" title="Designed to be handled every day." description="A selection from the HMS range, shown exactly as manufactured." />
            <div className="relative hidden gap-2 sm:flex">
              <CarouselPrevious className="static size-12 translate-y-0 rounded-full border-navy/15 bg-white text-navy hover:bg-navy hover:text-white" />
              <CarouselNext className="static size-12 translate-y-0 rounded-full border-navy/15 bg-white text-navy hover:bg-navy hover:text-white" />
            </div>
          </div>
          <CarouselContent viewportClassName="-mx-5 -my-8 px-5 py-8 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" className="-ml-3 sm:-ml-5">
            {items.map((p, i) => (
              <CarouselItem key={p.slug} className="basis-1/2 pl-5 lg:basis-1/4">
                <ProductCard product={p} index={i} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 72vw" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Reveal className="mt-12 text-center">
          <ButtonLink href="/products" variant="navy"><T>{"View Full Catalogue"}</T></ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
