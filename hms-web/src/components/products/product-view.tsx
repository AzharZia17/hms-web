"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { ColourSwatches } from "@/components/products/colour-swatches";
import { ProductGallery } from "@/components/products/product-gallery";
import { EnquiryActions } from "@/components/products/enquiry-actions";
import { StickyEnquiry } from "@/components/products/sticky-enquiry";
import { T } from "@/components/t";
import { colours } from "@/data/colours";
import type { Product, ProductImage } from "@/types/product";

interface ProductInteractiveViewProps {
  product: Product;
  categoryName?: string;
  initialColor?: string;
}

export function ProductInteractiveView({
  product,
  categoryName,
  initialColor,
}: ProductInteractiveViewProps) {
  const availableColors = product.onlyColours ?? colours.map((c) => c.name);
  const isValidInitial = Boolean(initialColor && availableColors.includes(initialColor as any));
  const [selectedColor, setSelectedColor] = useState<string>(
    isValidInitial && initialColor ? initialColor : product.onlyColours?.[0] ?? "White"
  );

  const handleSelectColor = useCallback((color: string) => {
    setSelectedColor(color);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("color", color);
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  // If the product has a specific image for the selected color, prioritize it in the gallery
  const colorVariantImage: ProductImage | undefined = product.colorImages?.[selectedColor];

  const displayedImages: ProductImage[] = useMemo(() => {
    return [colorVariantImage ?? product.images[0]];
  }, [colorVariantImage, product.images]);

  const hasPhotoForColor = Boolean(colorVariantImage);

  // Colour panel — rendered in two places: mobile (above image) and desktop (in right column)
  const colourPanel = product.onlyColours ? (
    <div className="rounded-3xl bg-secondary/70 p-5 ring-1 ring-black/[0.04]">
      <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-navy">
        <T>{"Available colour"}</T>
      </h2>
      <p className="mt-3 text-sm font-semibold text-navy">
        <T>{product.onlyColours.join(", ")}</T>{" "}
        <span className="font-normal text-ink-muted">
          · <T>{"No other colours available."}</T>
        </span>
      </p>
    </div>
  ) : (
    <div className="rounded-3xl bg-secondary/70 p-5 ring-1 ring-black/[0.04]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-navy">
          <T>{"Available colours"}</T>
        </h2>
        <span className="text-xs font-medium text-navy">
          <T>{"Selected colour:"}</T>{" "}
          <strong className="font-bold text-navy underline decoration-gold decoration-2 underline-offset-4">
            <T>{selectedColor}</T>
          </strong>
        </span>
      </div>

      <ColourSwatches
        className="mt-3.5"
        selectedColor={selectedColor}
        onSelectColor={handleSelectColor}
      />

      <p className="mt-3.5 text-xs text-ink-muted">
        {hasPhotoForColor ? (
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <T>{"Live photo preview in"}</T> <T>{selectedColor}</T>
          </span>
        ) : (
          <span>
            <T>{"Available in all 8 colours. Mention your chosen colour in your enquiry."}</T>
          </span>
        )}
      </p>
    </div>
  );

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">

        {/* ── Mobile-only: colour picker ABOVE the image ── */}
        <div className="lg:hidden">
          {colourPanel}
        </div>

        {/* ── Product image (left col on desktop, full-width on mobile) ── */}
        <Reveal y={0}>
          <ProductGallery images={displayedImages} />
        </Reveal>

        {/* ── Right column: all product details ── */}
        <Reveal delay={0.1} className="lg:pt-4">
          {categoryName && (
            <Link href={`/products?category=${product.category}`} className="eyebrow">
              <T>{categoryName}</T>
            </Link>
          )}
          <h1 className="mt-5 text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-5xl">
            <T>{product.name}</T>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted">
            <T>{product.summary}</T>
          </p>

          <Card className="mt-8 rounded-3xl border-0 bg-secondary/70 shadow-none ring-1 ring-black/[0.04]">
            <CardContent className="p-2 sm:p-3">
              <h2 className="px-4 pb-1 pt-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-navy">
                <T>{"Details"}</T>
              </h2>
              <dl>
                {product.specs.map((s) => (
                  <div
                    key={s.label}
                    className="grid grid-cols-[120px_1fr] items-center gap-4 rounded-2xl px-4 py-3 text-[15px] odd:bg-white/70 sm:grid-cols-[150px_1fr]"
                  >
                    <dt className="text-ink-muted">
                      <T>{s.label}</T>
                    </dt>
                    <dd>
                      <Badge
                        variant="secondary"
                        className="h-auto rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-navy ring-1 ring-black/5"
                      >
                        <T>{s.value}</T>
                      </Badge>
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* ── Desktop-only: colour picker in its normal position ── */}
          <div className="mt-4 hidden lg:block">
            {colourPanel}
          </div>

          <p className="mt-3 px-2 text-xs text-ink-muted">
            <T>{"Dimensions, thread sizes and material grades: please enquire for the full specification."}</T>
          </p>

          <div className="mt-10">
            <EnquiryActions product={product} selectedColor={selectedColor} />
          </div>
        </Reveal>
      </div>

      <StickyEnquiry
        name={`${product.name}${selectedColor ? ` — ${selectedColor}` : ""}`}
        subject={`Enquiry: ${product.name}${selectedColor ? ` (${selectedColor})` : ""}`}
      />

      {/* Hidden eager preloading for instant zero-latency color variant switching */}
      {product.colorImages && (
        <div className="hidden" aria-hidden="true">
          {Object.values(product.colorImages)
            .filter((im): im is ProductImage => Boolean(im))
            .map((im) => (
              <img key={im.src} src={im.src} alt="" width={1} height={1} loading="eager" />
            ))}
        </div>
      )}
    </>
  );
}

