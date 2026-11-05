import { getCategory } from "@/data/categories";
import type { Product } from "@/types/product";

export function matchesQuery(p: Product, query: string) {
  const hay = [p.name, p.summary, p.code ?? "", getCategory(p.category)?.name ?? "", ...p.specs.map((s) => s.value)]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => hay.includes(t));
}
