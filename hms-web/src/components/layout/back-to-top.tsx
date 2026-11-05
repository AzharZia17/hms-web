"use client";

import { ArrowUp } from "lucide-react";
import { T } from "@/components/t";

export function BackToTop() {
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group inline-flex items-center gap-3 text-sm font-semibold text-white/80 transition-colors hover:text-gold"> <T>{"Back to top"}</T> <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-all group-hover:-translate-y-1 group-hover:border-gold">
        <ArrowUp className="h-4 w-4" />
      </span>
    </button>
  );
}
