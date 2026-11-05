import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategory } from "@/data/categories";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Parallax, ScrollCard } from "@/components/ui/scroll-fx";
import { ColourSwatches } from "./colour-swatches";
import { ProductPicture } from "./product-image";
import { T } from "@/components/t";

export function ProductCard({
  product,
  index = 0,
  sizes = "(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw",
}: {
  product: Product;
  index?: number;
  sizes?: string;
}) {
  const category = getCategory(product.category);
  return (
    <ScrollCard index={index}>
      <article className="group relative flex h-full flex-col rounded-3xl bg-white p-2 shadow-card ring-1 ring-black/[0.05] transition-all duration-500 active:scale-[0.985] hover:-translate-y-1.5 hover:shadow-lift hover:ring-gold/40 sm:p-2.5">
        <Link href={`/products/${product.slug}`} className="flex h-full flex-col" aria-label={`${product.name} — view details`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Parallax range={product.images[0].fit === "contain" ? 0 : 4}>
              <ProductPicture image={product.images[0]} sizes={sizes} />
            </Parallax>
            <Badge className="absolute left-2.5 top-2.5 h-auto rounded-full border-0 bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy backdrop-blur sm:text-[11px]">
              <T>{category?.name}</T>
            </Badge>
            <span className="absolute bottom-2.5 right-2.5 grid h-10 w-10 place-items-center rounded-full bg-white text-navy shadow-lg transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold group-hover:text-navy-ink group-active:bg-gold sm:h-11 sm:w-11">
              <ArrowUpRight className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
            </span>
          </div>
          <div className="flex flex-1 flex-col px-2.5 pb-3 pt-3.5 sm:px-3 sm:pb-3.5">
            <h3 className="text-[15px] font-medium leading-snug sm:text-[17px]"><T>{product.name}</T></h3>
            {product.code && <p className="mt-1 text-xs text-ink-muted"><T>Code:</T> {product.code}</p>}
            <p className="mt-1.5 line-clamp-2 hidden text-[13px] leading-relaxed text-ink-muted sm:block"><T>{product.summary}</T></p>
            <ColourSwatches compact className="mt-3" />
            <span className="mt-auto pt-3 text-[13px] font-semibold text-navy underline-offset-4 group-hover:underline sm:text-sm"><T>{"View Details"}</T></span>
          </div>
        </Link>
      </article>
    </ScrollCard>
  );
}
