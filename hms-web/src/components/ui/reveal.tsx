"use client";

import { BlurFade } from "@/components/ui/blur-fade";

/**
 * Scroll-reveal built on Magic UI's Blur Fade: a short fade, tiny lift and slight de-blur
 * the first time content enters the viewport. For visitors who prefer reduced motion,
 * a global CSS rule (see globals.css, [data-reveal]) shows the content immediately.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  /** Kept for API compatibility; imagery now uses the same calm reveal. */
  clip?: boolean;
  className?: string;
}) {
  return (
    <BlurFade data-reveal inView direction="up" offset={y} delay={delay} duration={0.7} blur="5px" inViewMargin="-60px" className={className}>
      {children}
    </BlurFade>
  );
}
