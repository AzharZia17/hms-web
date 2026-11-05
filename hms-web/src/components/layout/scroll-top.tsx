"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Floating back-to-top button with a live reading-progress ring. Appears after scrolling, hides on return. */
export function ScrollTop() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-[5.75rem] left-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-navy text-white shadow-lg lg:bottom-6 lg:left-6"
        >
          <svg aria-hidden viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#DC9807" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <ArrowUp className="relative h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
