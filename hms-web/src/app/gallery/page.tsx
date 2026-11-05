import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaSection } from "@/components/home/cta-section";
import { T } from "@/components/t";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Product photography from the HMS Plastic range of taps, mixers, shower heads, hoses and drains.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="The HMS range in detail." description="Product photography — filter by category and tap any image to enlarge." />
      <section className="pb-16 pt-6 lg:pb-20 lg:pt-10">
        <Container>
          <GalleryGrid />
          <p className="mt-10 text-sm text-ink-muted"><T>{"Images show HMS products photographed in studio and do not represent specific client installations."}</T></p>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
