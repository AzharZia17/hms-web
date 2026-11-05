import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Highlights } from "@/components/home/highlights";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutSection } from "@/components/home/about-section";
import { WhyChoose } from "@/components/home/why-choose";
import { CollectionsShowcase } from "@/components/home/collections-showcase";
import { Statement } from "@/components/home/statement";
import { HowToEnquire } from "@/components/home/how-to-enquire";
import { CatalogueSection } from "@/components/home/catalogue-section";
import { ProductFeatures } from "@/components/home/product-features";
import { Faq } from "@/components/home/faq";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { CtaSection } from "@/components/home/cta-section";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: { absolute: "HMS Plastic — Premium Sanitary Ware & Bathroom Fittings" },
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
      <CatalogueSection />
      <Statement />
      <AboutSection />
      <WhyChoose />
      <ProductFeatures />
      <CollectionsShowcase />
      <HowToEnquire />
      <GalleryPreview />
      <Faq />
      <CtaSection />
      <ContactSection id="contact" />
    </>
  );
}
