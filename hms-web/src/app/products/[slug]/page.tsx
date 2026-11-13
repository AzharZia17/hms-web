import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, relatedProducts } from "@/data/products";
import { getCategory } from "@/data/categories";
import { site } from "@/data/site";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { colours } from "@/data/colours";
import { ProductCard } from "@/components/products/product-card";
import { ProductInteractiveView } from "@/components/products/product-view";
import { T } from "@/components/t";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: `${p.name} | HMS Plastic`, description: p.summary, images: [{ url: p.images[0].src, width: p.images[0].width, height: p.images[0].height, alt: p.images[0].alt }] },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ color?: string }>;
}) {
  const { slug } = await params;
  const { color } = (await searchParams) ?? {};
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = relatedProducts(product);
  const idx = products.findIndex((p) => p.slug === product.slug);
  const prev = products[(idx - 1 + products.length) % products.length];
  const next = products[(idx + 1) % products.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.images.map((i) => new URL(i.src, site.url).toString()),
    brand: { "@type": "Brand", name: site.name },
    color: (product.onlyColours ?? colours.map((c) => c.name)).join(", "),
    category: category?.name,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="pb-20 pt-28 sm:pt-36 lg:pb-28">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-navy"><T>{"Home"}</T></Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/products" className="hover:text-navy"><T>{"Products"}</T></Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`/products?category=${product.category}`} className="hover:text-navy"><T>{category?.name}</T></Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-navy"><T>{product.name}</T></li>
            </ol>
          </nav>

          <ProductInteractiveView
            product={product}
            categoryName={category?.name}
            initialColor={typeof color === "string" ? color : undefined}
          />
          <nav aria-label="More products" className="mt-16 grid grid-cols-2 gap-3 sm:gap-4">
            <Link href={`/products/${prev.slug}`} className="group flex flex-col items-start gap-1 rounded-3xl bg-secondary/70 p-5 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold"><ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> <T>{"Previous"}</T></span>
              <span className="font-display font-semibold text-navy"><T>{prev.name}</T></span>
            </Link>
            <Link href={`/products/${next.slug}`} className="group flex flex-col items-end gap-1 rounded-3xl bg-secondary/70 p-5 text-right transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold"><T>{"Next"}</T> <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              <span className="font-display font-semibold text-navy"><T>{next.name}</T></span>
            </Link>
          </nav>
        </Container>
      </section>

      <section className="bg-secondary/70 pb-32 pt-20 lg:py-24">
        <Container>
          <h2 className="text-3xl font-medium"><T>{"Related products"}</T></h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
