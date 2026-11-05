"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { T } from "@/components/t";

const items = products.flatMap((p) => p.images.map((image, i) => ({ id: `${p.slug}-${i}`, product: p, image })));

export function GalleryGrid({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(() => {
    const f = filter === "all" ? items : items.filter((i) => i.product.category === filter);
    return limit ? f.slice(0, limit) : f;
  }, [filter, limit]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <div>
      {!limit && (
        <div className="no-scrollbar -mx-5 mb-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ToggleGroup
            aria-label="Filter gallery by category"
            value={[filter]}
            onValueChange={(v) => v.length && setFilter(v[0] as string)}
            spacing={2}
            className="w-max"
          >
            {[{ slug: "all", name: "All" }, ...categories].map((c) => (
              <ToggleGroupItem
                key={c.slug}
                value={c.slug}
                className="h-auto rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-navy aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white data-pressed:border-navy data-pressed:bg-navy data-pressed:text-white"
              >
                <T>{c.name}</T>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}

      <motion.ul layout className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {shown.map((it, idx) => (
            <motion.li layout key={it.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }} className="mb-3 break-inside-avoid sm:mb-4">
              <button type="button" onClick={() => setOpen(idx)} aria-label={`Enlarge: ${it.image.alt}`} className="group relative block w-full overflow-hidden rounded-2xl bg-secondary shadow-sm ring-1 ring-black/5 sm:rounded-3xl">
                <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(min-width:1024px) 33vw, 50vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3.5 text-left text-xs font-semibold text-white opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-sm">
                  <T>{it.product.name}</T>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/90 text-navy"><Expand className="h-3.5 w-3.5" /></span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.product.name}
            className="fixed inset-0 z-[70] flex flex-col bg-navy-ink/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <div className="flex items-center justify-between px-5 py-4 text-white">
              <p className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80">{open! + 1} / {shown.length} · swipe to browse</p>
              <button type="button" onClick={close} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-navy-ink"><X className="h-5 w-5" /></button>
            </div>
            <div className="relative flex-1" onMouseDown={(e) => e.target === e.currentTarget && close()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) step(1);
                    else if (info.offset.x > 60) step(-1);
                  }}
                  className="absolute inset-x-4 inset-y-0 cursor-grab touch-pan-y overflow-hidden rounded-3xl sm:inset-x-24"
                >
                  <Image src={current.image.src} alt={current.image.alt} fill sizes="100vw" className="object-contain" priority />
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-gold hover:text-navy-ink sm:left-6"><ChevronLeft /></button>
              <button type="button" onClick={() => step(1)} aria-label="Next image" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-gold hover:text-navy-ink sm:right-6"><ChevronRight /></button>
            </div>
            <div className="flex flex-col items-center gap-1 px-5 pb-8 pt-5 text-center text-white">
              <p className="font-display text-lg font-semibold"><T>{current.product.name}</T></p>
              <p className="text-xs uppercase tracking-widest text-gold"><T>{getCategory(current.product.category)?.name}</T></p>
              <Link href={`/products/${current.product.slug}`} onClick={close} className={cn("mt-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold")}><T>{"View product details"}</T></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
