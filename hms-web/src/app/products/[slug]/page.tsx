import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, relatedProducts } from "@/data/products";
import { getCategory } from "@/data/categories";
import { site } from "@/data/site";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ColourSwatches } from "@/components/products/colour-swatches";
import { colours } from "@/data/colours";
import { ProductGallery } from "@/components/products/product-gallery";
import { EnquiryActions } from "@/components/products/enquiry-actions";
import { ProductCard } from "@/components/products/product-card";
import { StickyEnquiry } from "@/components/products/sticky-enquiry";
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

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
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
    color: colours.map((c) => c.name).join(", "),
    category: category?.name,
    ...(product.code && { sku: product.code }),
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

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal y={0}><ProductGallery images={product.images} /></Reveal>
            <Reveal delay={0.1} className="lg:pt-4">
              <Link href={`/products?category=${product.category}`} className="eyebrow"><T>{category?.name}</T></Link>
              <h1 className="mt-5 text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-5xl"><T>{product.name}</T></h1>
              <p className="mt-3 text-sm text-ink-muted">{product.code ? <><T>{"Product code:"}</T> <strong className="text-navy">{product.code}</strong></> : <T>{"Product code: available on request"}</T>}</p>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted"><T>{product.summary}</T></p>

              <Card className="mt-8 rounded-3xl border-0 bg-secondary/70 shadow-none ring-1 ring-black/[0.04]">
                <CardContent className="p-2 sm:p-3">
                  <h2 className="px-4 pb-1 pt-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-navy"><T>{"Details"}</T></h2>
                  <dl>
                    {product.specs.map((s) => (
                      <div key={s.label} className="grid grid-cols-[120px_1fr] items-center gap-4 rounded-2xl px-4 py-3 text-[15px] odd:bg-white/70 sm:grid-cols-[150px_1fr]">
                        <dt className="text-ink-muted"><T>{s.label}</T></dt>
                        <dd><Badge variant="secondary" className="h-auto rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-navy ring-1 ring-black/5"><T>{s.value}</T></Badge></dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
              <div className="mt-4 rounded-3xl bg-secondary/70 p-5 ring-1 ring-black/[0.04]">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-navy"><T>{"Available colours"}</T></h2>
                <ColourSwatches className="mt-3" />
                <p className="mt-3 text-xs text-ink-muted"><T>{"Available in all 7 colours. Photo shown in white — mention your colour in your enquiry."}</T></p>
              </div>
              <p className="mt-3 px-2 text-xs text-ink-muted"><T>{"Dimensions, thread sizes and material grades: please enquire for the full specification."}</T></p>

              <div className="mt-10"><EnquiryActions product={product} /></div>
            </Reveal>
          </div>
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

      <StickyEnquiry name={product.name} subject={`Enquiry: ${product.name}`} />

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
