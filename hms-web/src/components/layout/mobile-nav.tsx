"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Home, Images, LayoutGrid, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { T } from "@/components/t";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: LayoutGrid },
  { href: "/gallery", label: "Gallery", icon: Images },
  { href: "/contact", label: "Contact", icon: Mail },
];

/** App-style bottom tab bar for phones/tablets. Hides while scrolling down. */
export function MobileNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
  });

  // Product pages show their own sticky enquiry bar instead.
  if (pathname.startsWith("/products/")) return null;

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <motion.nav
      aria-label="Quick navigation"
      initial={{ y: "100%" }}
      animate={{ y: hidden ? "100%" : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 bottom-3 z-30 mb-[env(safe-area-inset-bottom)] rounded-full bg-navy-ink/95 shadow-card ring-1 ring-white/10 backdrop-blur-xl lg:hidden"
    >
      <ul className={"mx-auto grid max-w-md grid-cols-4"}>
        {items.map(({ href, label, icon: Icon }) => {
          const on = active(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={on ? "page" : undefined}
                className={cn("relative flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors active:scale-90", on ? "text-navy" : "text-ink-muted")}
              >
                {on && <motion.span layoutId="tab-indicator" className="absolute inset-x-3 inset-y-2 -z-0 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
                <Icon className={cn("h-[22px] w-[22px] transition-transform", on && "-translate-y-0.5 text-gold")} strokeWidth={on ? 2 : 1.6} />
                <T>{label}</T>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
