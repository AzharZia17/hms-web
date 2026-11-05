"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { matchesQuery } from "@/lib/search";
import { cn } from "@/lib/utils";
import { CtaButton } from "@/components/ui/cta";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProductCard } from "./product-card";
import { T } from "@/components/t";
import { useT } from "@/lib/i18n/lang-provider";

type Sort = "featured" | "name-asc" | "name-desc" | "category";
const sortLabels: Record<Sort, string> = {
  featured: "Featured",
  "name-asc": "Name: A to Z",
  "name-desc": "Name: Z to A",
  category: "Category",
};

export function ProductCatalogue() {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get("category") ?? "all";
  const urlQuery = params.get("q") ?? "";
  const sort = (params.get("sort") as Sort) || "featured";
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(urlQuery);
  }, [urlQuery]);

  const update = (next: Record<string, string | null>) => {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === "" || v === "all" || (k === "sort" && v === "featured")) sp.delete(k);
      else sp.set(k, v);
    }
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (query === urlQuery) return;
    const t = setTimeout(() => update({ q: query.trim() }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of products) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, []);

  const results = useMemo(() => {
    let list = products.filter((p) => (category === "all" || p.category === category) && (!urlQuery || matchesQuery(p, urlQuery)));
    list = [...list];
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "category") list.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    else list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return list;
  }, [category, urlQuery, sort]);

  const filtersActive = category !== "all" || urlQuery !== "";
  const reset = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const all = [{ slug: "all", name: "All Products", n: products.length }, ...categories.map((c) => ({ slug: c.slug, name: c.name, n: counts[c.slug] ?? 0 }))];

  return (
    <div className="grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-3xl bg-secondary/70 p-4 ring-1 ring-black/[0.04]">
          <h2 className="px-3 pb-3 pt-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-navy"><T>{"Categories"}</T></h2>
          <ul className="space-y-1">
            {all.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => update({ category: c.slug })}
                  aria-pressed={category === c.slug}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all",
                    category === c.slug ? "bg-navy text-white shadow-md" : "text-ink hover:bg-white hover:text-navy",
                  )}
                >
                  <T>{c.name}</T>
                  <Badge variant="secondary" className={cn("h-5 rounded-full px-2 text-[11px]", category === c.slug ? "bg-gold text-navy-ink" : "bg-white text-ink-muted")}>{c.n}</Badge>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="no-scrollbar -mx-5 mb-4 overflow-x-auto px-5 pb-1 lg:hidden">
          <ToggleGroup aria-label="Filter by category" value={[category]} onValueChange={(v) => v.length && update({ category: v[0] as string })} spacing={2} className="w-max">
            {[{ slug: "all", name: "All" }, ...categories].map((c) => (
              <ToggleGroupItem
                key={c.slug}
                value={c.slug}
                className="h-auto rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-navy active:scale-95 aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-white data-pressed:border-navy data-pressed:bg-navy data-pressed:text-white"
              >
                <T>{c.name}</T>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search products…")}
              aria-label="Search products"
              className="h-12 rounded-full border-black/10 bg-white pl-11 pr-4 text-base focus-visible:border-gold md:text-sm"
            />
          </div>
          <Select value={sort} onValueChange={(v) => update({ sort: v as string })}>
            <SelectTrigger aria-label="Sort products" className="h-12 w-full rounded-full border-black/10 bg-white px-5 text-base sm:w-52 md:text-sm">
              <SelectValue>{(v: string) => `${t("Sort:")} ${t(sortLabels[v as Sort] ?? "Featured")}`}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-2xl">
              {(Object.keys(sortLabels) as Sort[]).map((k) => (
                <SelectItem key={k} value={k}>{t(sortLabels[k])}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-muted" aria-live="polite">
          <p><T>{"Showing"}</T> <strong className="text-navy">{results.length}</strong> <T>{"of"}</T> {products.length} <T>{"products"}</T></p>
          {filtersActive && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5 font-semibold text-navy transition-colors hover:bg-gold hover:text-navy-ink">
              <X className="h-3.5 w-3.5" /> <T>{"Clear filters"}</T> </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-navy/20 bg-secondary/60 px-6 py-20 text-center">
            <h3 className="text-2xl font-medium"><T>{"No products found"}</T></h3>
            <p className="mx-auto mt-3 max-w-md text-ink-muted"><T>{"We couldn't find anything matching your search. Try a different keyword or clear the filters."}</T></p>
            <CtaButton type="button" onClick={reset} className="mt-6"><T>{"Clear filters"}</T></CtaButton>
          </div>
        ) : (
          <motion.ul layout className="mt-8 grid grid-cols-2 items-start gap-x-3 gap-y-4 sm:gap-6 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((p) => (
                <motion.li layout key={p.slug} className="min-w-0 max-sm:even:mt-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <ProductCard product={p} index={results.indexOf(p)} sizes="(min-width:1280px) 28vw, (min-width:1024px) 38vw, 50vw" />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}
