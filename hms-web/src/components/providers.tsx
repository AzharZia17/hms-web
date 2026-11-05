"use client";

import { MotionConfig } from "motion/react";
import { LangProvider } from "@/lib/i18n/lang-provider";

/** Reduced-motion handling for Motion + the site language (English / Urdu). */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LangProvider>
  );
}
