"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Search } from "lucide-react";
import { navLinks } from "@/data/site";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/cta";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "./logo";
import { SearchDialog } from "./search-dialog";
import { T } from "@/components/t";
import { LanguageSwitch } from "./language-switch";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 240);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDropdown(false);
  }, [pathname]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 sm:px-6 sm:pt-4",
          hidden && "max-lg:-translate-y-[120%]",
        )}
      >
        <div
          className={cn(
            "pointer-events-auto relative mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between rounded-full pl-5 pr-2.5 transition-all duration-500 sm:h-[4.5rem] sm:pl-7",
            scrolled
              ? "bg-white/90 shadow-card ring-1 ring-black/5 backdrop-blur-xl"
              : "bg-white/95 shadow-card ring-1 ring-white/40 backdrop-blur-xl",
          )}
        >
          <Logo priority />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) =>
                "dropdown" in l ? (
                  <li key={l.href} className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
                    <Link
                      href={l.href}
                      aria-haspopup="true"
                      aria-expanded={dropdown}
                      className={cn("inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5", active(l.href) && "bg-navy text-white hover:bg-navy")}
                    >
                      <T>{l.label}</T>
                      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", dropdown && "rotate-180")} />
                    </Link>
                    <AnimatePresence>
                      {dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3"
                        >
                          <div className="rounded-3xl bg-white p-3 shadow-card ring-1 ring-black/5">
                            <ul className="grid grid-cols-2 gap-1">
                              {categories.map((c) => (
                                <li key={c.slug}>
                                  <Link href={`/products?category=${c.slug}`} className="group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-secondary hover:text-navy">
                                    <T>{c.name}</T>
                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link href="/products" className="mt-2 flex items-center justify-between rounded-2xl bg-navy px-4 py-3 text-sm font-semibold text-white hover:bg-navy-ink"> <T>{"View all products"}</T> <ArrowUpRight className="h-4 w-4 text-gold" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active(l.href) ? "page" : undefined}
                      className={cn("rounded-full px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5", active(l.href) && "bg-navy text-white hover:bg-navy")}
                    >
                      <T>{l.label}</T>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search products" className="grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-navy/5">
              <Search className="h-5 w-5" />
            </button>
            <LanguageSwitch className="hidden sm:inline-flex" />
            <ButtonLink href="/contact" variant="gold" className="hidden px-6 py-3 sm:inline-flex"> <T>{"Contact Us"}</T> </ButtonLink>
            <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <motion.div aria-hidden style={{ scaleX: progress }} className="absolute inset-x-8 bottom-0 h-0.5 origin-left rounded-full bg-gold" />
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-[88%] max-w-sm gap-0 border-0 bg-navy-ink p-0 text-white sm:max-w-sm">
          <SheetTitle className="sr-only"><T>{"Menu"}</T></SheetTitle>
          <nav aria-label="Mobile" className="relative flex h-full flex-col overflow-y-auto px-6 pb-8 pt-20">
            <ul className="space-y-1">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                  {"dropdown" in l ? (
                    <Accordion>
                      <AccordionItem value="products" className="border-0">
                        <AccordionTrigger className="rounded-2xl px-3 py-3.5 font-display text-2xl font-semibold text-white hover:no-underline"><T>{l.label}</T></AccordionTrigger>
                        <AccordionContent>
                          <ul className="grid grid-cols-2 gap-2 pb-3 pl-1">
                            {categories.map((c) => (
                              <li key={c.slug}>
                                <Link href={`/products?category=${c.slug}`} onClick={() => setMobileOpen(false)} className="block rounded-xl bg-white/8 px-3 py-2.5 text-sm font-medium text-white/90 active:scale-95">
                                  <T>{c.name}</T>
                                </Link>
                              </li>
                            ))}
                            <li className="col-span-2">
                              <Link href="/products" onClick={() => setMobileOpen(false)} className="block rounded-xl bg-gold px-3 py-2.5 text-center text-sm font-semibold text-navy-ink"><T>{"View all products"}</T></Link>
                            </li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn("flex items-center justify-between rounded-2xl px-3 py-3.5 font-display text-2xl font-semibold transition-colors", active(l.href) ? "text-gold" : "text-white")}
                    >
                      <T>{l.label}</T>
                      {active(l.href) && <span className="h-2 w-2 rounded-full bg-gold" />}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center"><LanguageSwitch className="text-white hover:bg-white/10" /></div>
            <ButtonLink href="/contact" variant="gold" className="mt-4 w-full" onClick={() => setMobileOpen(false)}> <T>{"Contact Us"}</T> </ButtonLink>
          </nav>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
