import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ProductCatalogue } from "@/components/products/product-catalogue";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the HMS Plastic range: taps, mixers, shower heads, health faucets, shower hoses and floor drains.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="The HMS product range." description="Search, filter and sort the full catalogue." />
      <section className="pb-28 pt-6 lg:pb-24 lg:pt-10">
        <Container>
          <Suspense fallback={<div className="grid grid-cols-2 gap-6 lg:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <div key={i} className="aspect-[4/5] animate-pulse bg-soft" />)}</div>}>
            <ProductCatalogue />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
