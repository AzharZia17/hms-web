"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n/lang-provider";
import { cn } from "@/lib/utils";

/** EN ⇄ اردو toggle. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const next = lang === "en" ? "ur" : "en";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === "en" ? "Switch to Urdu" : "Switch to English"}
      className={cn("inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-navy transition-colors hover:bg-navy/5", className)}
    >
      <Languages className="h-4 w-4" />
      <span lang={next}>{lang === "en" ? "اردو" : "English"}</span>
    </button>
  );
}
