"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { matchesQuery } from "@/lib/search";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { T } from "@/components/t";
import { useT } from "@/lib/i18n/lang-provider";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const t = useT();
  const [q, setQ] = useState("");
  const results = useMemo(() => (q.trim() ? products.filter((p) => matchesQuery(p, q)).slice(0, 6) : []), [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    router.push(q.trim() ? `/products?q=${encodeURIComponent(q.trim())}` : "/products");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="top-[8%] max-w-[calc(100%-1.5rem)] translate-y-0 gap-0 overflow-hidden rounded-3xl p-0 sm:top-[14%] sm:max-w-2xl">
        <DialogTitle className="sr-only"><T>{"Search products"}</T></DialogTitle>
        <form onSubmit={submit} className="flex items-center gap-3 border-b px-5">
          <Search className="h-5 w-5 text-ink-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search taps, mixers, shower heads…")}
            aria-label="Search products"
            className="h-16 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-muted/60 sm:text-lg"
          />
          <kbd className="hidden rounded-md border px-1.5 py-0.5 text-[10px] text-ink-muted sm:block"><T>{"ESC"}</T></kbd>
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim() === "" ? (
            <p className="p-4 text-sm text-ink-muted"><T>{"Type to search the HMS product range."}</T></p>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-ink-muted"><T>{"No products match"}</T> “{q}”. <T>{"Try “mixer”, “shower” or “drain”."}</T></p>
          ) : (
            <ul>
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} onClick={onClose} className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-secondary">
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary">
                      <Image src={p.images[0].src} alt="" fill sizes="56px" className="object-contain" style={{ backgroundColor: p.images[0].bg }} />
                    </span>
                    <span>
                      <span className="block font-semibold text-navy"><T>{p.name}</T></span>
                      <span className="text-xs text-ink-muted"><T>{getCategory(p.category)?.name}</T></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {q.trim() && (
          <button onClick={submit} className="w-full border-t px-5 py-4 text-left text-sm font-semibold text-navy hover:text-gold">
            <T>{"See all results for"}</T> “{q.trim()}” →
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}
