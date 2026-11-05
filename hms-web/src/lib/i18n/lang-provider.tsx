"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ur } from "./ur";

export type Lang = "en" | "ur";
const KEY = "hms-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

function apply(lang: Lang) {
  const el = document.documentElement;
  el.lang = lang;
  el.dir = lang === "ur" ? "rtl" : "ltr";
}

/** Language state. Starts as English (matches the server render), then restores the saved choice. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    if (saved === "ur") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState("ur");
      apply("ur");
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    apply(l);
    try { localStorage.setItem(KEY, l); } catch {}
  }, []);

  const t = useCallback(
    (s: string) => {
      if (lang !== "ur") return s;
      const hit = ur[s];
      if (hit === undefined && typeof window !== "undefined") (window as unknown as { __missing?: Set<string> }).__missing?.add(s);
      return hit ?? s;
    },
    [lang],
  );
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useT = () => useContext(LangContext).t;
