import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/our-story", "/products", "/collections", "/gallery", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
