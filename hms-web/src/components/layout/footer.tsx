import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site, telHref, whatsappLink } from "@/data/site";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/cta";
import { SocialIcons } from "@/components/social-icons";
import { BackToTop } from "./back-to-top";
import { WhatsAppIcon } from "./whatsapp-widget";
import { T } from "@/components/t";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await currentYear();
  const wa = whatsappLink("Hello HMS Plastic, I'd like to know more about your products.");
  return (
    <footer className="relative overflow-hidden rounded-t-4xl bg-navy-ink text-white/70 sm:rounded-t-4xl">
      <span aria-hidden className="pointer-events-none absolute -bottom-[0.18em] right-[-2vw] select-none font-display text-[38vw] font-extrabold leading-none tracking-tighter text-white/[0.025] lg:text-[22vw]"><T>{"HMS"}</T></span>

      <Container className="relative pt-16 sm:pt-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-white/[0.05] p-7 ring-1 ring-white/10 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-medium text-white sm:text-4xl"><T>{"Have a question about our range?"}</T></h2>
            <p className="mt-2 text-white/65"><T>{"Message us on WhatsApp or send an enquiry — we're happy to help."}</T></p>
          </div>
          <div className="flex flex-wrap gap-3">
            {wa && (
              <ButtonLink href={wa} external variant="whatsapp"><WhatsAppIcon className="h-5 w-5" /> <T>{"Chat on WhatsApp"}</T></ButtonLink>
            )}
            <ButtonLink href="/contact" variant="outlineLight"><T>{"Send an enquiry"}</T></ButtonLink>
          </div>
        </div>
      </Container>

      <Container className="relative grid grid-cols-2 gap-x-6 gap-y-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" aria-label="HMS Plastic — home" className="inline-block rounded-3xl bg-white p-3">
            <Image src="/brand/hms-logo-transparent.png" alt="HMS Plastic" width={120} height={100} className="h-16 w-auto object-contain" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed"> <T>{"HMS Plastic designs and supplies sanitary ware and bathroom fittings — practical, well-finished products for modern bathrooms."}</T> </p>
          <SocialIcons className="mt-6" />
        </div>

        <nav aria-label="Quick links">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white"><T>{"Quick Links"}</T></h3>
          <ul className="mt-6 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="transition-colors hover:text-gold"><T>{l.label}</T></Link></li>
            ))}
            <li><a href="/catalogue/hms-catalogue.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold"><T>Catalogue (PDF)</T></a></li>
          </ul>
        </nav>

        <nav aria-label="Product categories">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white"><T>{"Products"}</T></h3>
          <ul className="mt-6 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/products?category=${c.slug}`} className="transition-colors hover:text-gold"><T>{c.name}</T></Link></li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white"><T>{"Contact"}</T></h3>
          <ul className="mt-6 space-y-4 text-sm">
            {site.phones.map((n) => (
              <li key={n} className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={telHref(n)} className="hover:text-gold">{n}</a></li>
            ))}
            {site.email && (
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></li>
            )}
            {site.address && (
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><span><T>{site.address}</T></span></li>
            )}
          </ul>
        </div>
      </Container>
      <div className="relative bg-white">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-navy"><T>{"Project by"}</T></p>
          <div className="grid w-full grid-cols-2 items-center gap-3 sm:flex sm:w-auto sm:gap-8">
            <Image src="/brand/partners/ilmas.png" alt="Ilmas Sanitary Fittings" width={1075} height={319} className="h-auto max-h-14 w-full rounded-2xl object-contain p-2 ring-1 ring-navy/10 sm:h-14 sm:w-auto sm:p-0 sm:ring-0" />
            <Image src="/brand/partners/luna.png" alt="Luna Group of Industries" width={990} height={227} className="h-auto max-h-14 w-full rounded-2xl object-contain p-2 ring-1 ring-navy/10 sm:h-14 sm:w-auto sm:p-0 sm:ring-0" />
          </div>
        </Container>
      </div>
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-4 pb-28 pt-6 text-xs sm:flex-row sm:items-center lg:pb-6">
          <p>© {year} <T>{"HMS Plastic"}</T> · <T>{site.trademark}</T> · <T>{"A Product by Four Brothers."}</T> <T>{"All rights reserved."}</T></p>
          <BackToTop />
        </Container>
      </div>
    </footer>
  );
}
