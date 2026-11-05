"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked entrance/exit that plays in both directions: the element rises,
 * fades and scales in as it enters the viewport, and eases out as it leaves the top.
 * Scrolling back reverses it.
 */
export function ScrollCard({ children, index = 0, className }: { children: React.ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = 22 + (index % 2) * 12;
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.35, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [lift, 0, 0, -12]);
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.97, 1, 1, 0.99]);

  return (
    <div ref={ref} className={cn("h-full", className)}>
      <motion.div style={reduce ? undefined : { opacity, y, scale }} className="h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** Keeps its child slightly oversized and drifts it vertically with scroll, for depth inside a frame. */
export function Parallax({ children, range = 5, className }: { children: React.ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className={cn("h-full w-full overflow-hidden", className)}>
      <motion.div style={reduce ? undefined : { y, scale: 1 + range / 50 }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
