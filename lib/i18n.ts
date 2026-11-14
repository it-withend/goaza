/**
 * Two languages: Russian at the existing URLs, Uzbek (Latin script) under /uz.
 * Strings live next to the code as pairs: tr("Мой план", "Mening rejam").
 */
export const LANGS = ["ru", "uz"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ru";

export function isLang(v: unknown): v is Lang {
  return v === "ru" || v === "uz";
}

/** Read the route param; anything unexpected falls back to Russian. */
export function langOf(v: unknown): Lang {
  return isLang(v) ? v : DEFAULT_LANG;
}

/** Internal path for the given language. External links, anchors and the API stay as they are. */
export function localizePath(lang: Lang, href: string): string {
  if (lang === DEFAULT_LANG) return href;
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/") || href === "/api") return href;
  if (href === "/uz" || href.startsWith("/uz/") || href.startsWith("/uz?") || href.startsWith("/uz#")) return href;
  if (href === "/") return "/uz";
  if (href.startsWith("/?") || href.startsWith("/#")) return `/uz${href.slice(1)}`;
  return `/uz${href}`;
}

/** "/uz/unis" → { lang: "uz", path: "/unis" }; unprefixed paths are Russian. */
export function splitLang(pathname: string): { lang: Lang; path: string } {
  if (pathname === "/uz") return { lang: "uz", path: "/" };
  if (pathname.startsWith("/uz/")) return { lang: "uz", path: pathname.slice(3) };
  return { lang: "ru", path: pathname };
}

export type Tr = (ru: string, uz: string) => string;

export function trFor(lang: Lang): Tr {
  return (ru, uz) => (lang === "uz" ? uz : ru);
}

/** BCP 47 tag for Intl formatting. */
export function locale(lang: Lang): string {
  return lang === "uz" ? "uz-Latn-UZ" : "ru-RU";
}
