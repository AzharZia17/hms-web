import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { CollectionsShowcase } from "@/components/home/collections-showcase";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/products/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { collections } from "@/data/categories";
import { products } from "@/data/products";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore HMS Plastic collections: shower, taps & mixers, and drainage.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero eyebrow="Collections" title="Curated for every part of the bathroom." description="Our range, grouped the way you plan a space." />
      <CollectionsShowcase heading={false} />
      {collections.map((c, i) => (
        <section key={c.slug} id={c.slug} className={i % 2 ? "bg-secondary/70 py-24 lg:py-32" : "bg-white py-24 lg:py-32"}>
          <Container>
            <SectionHeading eyebrow={c.tagline} title={c.name} description={c.description} />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {products.filter((p) => c.categories.includes(p.category)).map((p, idx) => <ProductCard key={p.slug} product={p} index={idx} />)}
            </div>
          </Container>
        </section>
      ))}
      <CtaSection />
    </>
  );
}
