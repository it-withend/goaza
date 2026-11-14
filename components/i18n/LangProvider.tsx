"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LANG, localizePath, trFor, type Lang, type Tr } from "@/lib/i18n";

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useTr(): Tr {
  const lang = useLang();
  return useMemo(() => trFor(lang), [lang]);
}

/** Localise an internal path for the current language (for router.push and plain anchors). */
export function useLocalize(): (href: string) => string {
  const lang = useLang();
  return useMemo(() => (href: string) => localizePath(lang, href), [lang]);
}
