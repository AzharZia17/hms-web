"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";
import { ProductPicture } from "./product-image";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [prevPrimary, setPrevPrimary] = useState(images[0]?.src);

  // Synchronously reset active thumbnail index when primary image changes
  if (images[0]?.src !== prevPrimary) {
    setPrevPrimary(images[0]?.src);
    setActive(0);
  }

  const current = images[active] ?? images[0];
  const aspect = current ? Math.min(1.25, Math.max(0.72, current.width / current.height)) : 1;

  return (
    <div>
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
      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-3">
          {images.map((im, i) => (
            <li key={im.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                aria-pressed={i === active}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-2xl border-2 transition-all duration-200",
                  i === active ? "border-gold scale-105 shadow-sm" : "border-transparent opacity-80 hover:opacity-100",
                )}
              >
                <Image
                  src={im.src}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-contain"
                  style={{ backgroundColor: im.bg ?? "#000000" }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
