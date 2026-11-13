import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Highlights } from "@/components/home/highlights";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CtaSection } from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: { absolute: "HMS Plastic — Plastic Sanitary Fitting & Bathroom Accessories" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <Marquee />
      <FeaturedCategories />
      <FeaturedProducts />
      <CtaSection />
    </>
  );
}
