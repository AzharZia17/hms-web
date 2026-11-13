"use client";

import type { ProductImage } from "@/types/product";
import { ProductPicture } from "./product-image";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const current = images[0];
  const aspect = current ? Math.min(1.25, Math.max(0.72, current.width / current.height)) : 1;

  if (!current) return null;

  return (
    <div className="rounded-4xl bg-white p-2.5 shadow-card ring-1 ring-black/5 sm:rounded-4xl sm:p-3">
      <div
        style={{ aspectRatio: aspect }}
        className="group relative overflow-hidden rounded-2xl sm:rounded-4xl [@media(hover:hover)]:cursor-zoom-in"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
          e.currentTarget.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
        }}
      >
        <div className="h-full w-full origin-[var(--zx,50%)_var(--zy,50%)] transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-[1.9]">
          <ProductPicture
            key={current.src}
            image={current}
            sizes="(min-width:1024px) 50vw, 100vw"
            priority
            hoverZoom={false}
          />
        </div>
      </div>
    </div>
  );
}
