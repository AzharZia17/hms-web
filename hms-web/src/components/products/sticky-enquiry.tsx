"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Send } from "lucide-react";
import { T } from "@/components/t";

/** Phone-only enquiry bar that slides up once the visitor starts scrolling a product page. */
export function StickyEnquiry({ name, subject }: { name: string; subject: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 240));

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: show ? 0 : "100%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 bottom-3 z-30 mb-[env(safe-area-inset-bottom)] flex items-center gap-2 rounded-full bg-navy-ink/95 py-2 pl-5 pr-2 shadow-card ring-1 ring-white/10 backdrop-blur-xl lg:hidden"
    >
      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white"><T>{name}</T></p>
            <Link href={`/contact?subject=${encodeURIComponent(subject)}`} className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-navy-ink active:scale-95">
        <Send className="h-4 w-4" /> <T>{"Enquire"}</T> </Link>
    </motion.div>
  );
}
