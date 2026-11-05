"use client";

import { useT } from "@/lib/i18n/lang-provider";

/** Translates its (string) child using the English→Urdu dictionary. Falls back to the English text. */
export function T({ children }: { children?: string }) {
  const t = useT();
  return <>{children ? t(children) : null}</>;
}
