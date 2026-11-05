import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { T } from "@/components/t";

export function GalleryPreview() {
  return (
    <section className="bg-white py-28 lg:py-40">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Gallery" title="The range, up close." description="Product photography from the HMS range." />
          <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"> <T>{"Open full gallery"}</T> <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12">
          <GalleryGrid limit={6} />
        </div>
      </Container>
    </section>
  );
}
