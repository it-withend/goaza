import type { SVGProps } from "react";

export type IconName =
  | "compass"
  | "graduation-cap"
  | "book-open"
  | "award"
  | "calendar"
  | "sliders"
  | "search"
  | "wallet"
  | "trending-up"
  | "shield-check"
  | "flame"
  | "sparkles"
  | "target"
  | "languages"
  | "bookmark"
  | "bookmark-check"
  | "check"
  | "x"
  | "trash"
  | "arrow-right"
  | "arrow-left"
  | "arrow-up"
  | "external-link"
  | "alert-triangle"
  | "layout-grid"
  | "list"
  | "globe"
  | "building"
  | "file-text"
  | "log-out"
  | "user"
  | "menu"
  | "rotate-ccw"
  | "layers"
  | "clock"
  | "plus"
  | "landmark"
  | "chevron-down"
  | "chevron-right"
  | "check-circle"
  | "info";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <polygon points="15.8 8.2 13.8 13.8 8.2 15.8 10.2 10.2 15.8 8.2" />
        </>
      );
    case "graduation-cap":
      return (
        <>
          <path d="M22 10 12 5 2 10l10 5 10-5Z" />
          <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
          <path d="M22 10v6" />
        </>
      );
    case "book-open":
      return (
        <>
          <path d="M2 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2V4Z" />
          <path d="M22 4h-7a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22V4Z" />
        </>
      );
    case "award":
      return (
        <>
          <circle cx="12" cy="9" r="6" />
          <path d="m15.477 14.89 1.515 7.11-5-3-5 3 1.523-7.11" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
          <path d="M8 2.5v4M16 2.5v4M3 10h18" />
        </>
      );
    case "sliders":
      return (
        <>
          <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
          <path d="M2 14h4M10 8h4M18 16h4" />
        </>
      );
    case "search":
      return (
        <>
          <circle cx="11" cy="11" r="7.2" />
          <path d="m20.5 20.5-4.3-4.3" />
        </>
      );
    case "wallet":
      return (
        <>
          <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v2a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5" />
          <path d="M21 12v4" />
        </>
      );
    case "trending-up":
      return (
        <>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </>
      );
    case "shield-check":
      return (
        <>
          <path d="M12 2.5 4.5 5.6v5.8c0 5.1 3.2 8.7 7.5 10.1 4.3-1.4 7.5-5 7.5-10.1V5.6L12 2.5Z" />
          <path d="m9 12.2 2 2 4-4.2" />
        </>
      );
    case "flame":
      return (
        <path d="M12.3 2.5c.4 3.4-1.8 5.2-3.4 7.1-1.3 1.5-2.1 3-2.1 5a5.5 5.5 0 0 0 11 0c0-3.2-1.9-5.8-4.2-7.8-.2 1.7-1.1 2.7-2 3.1.8-2.1 1-4.8.7-7.4Z" />
      );
    case "sparkles":
      return (
        <>
          <path d="m12 3-1.7 4.7L5.6 9.4l4.7 1.7L12 15.8l1.7-4.7 4.7-1.7-4.7-1.7L12 3Z" />
          <path d="M5 17v3M3.5 18.5h3M19 3v3M17.5 4.5h3" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <circle cx="12" cy="12" r="5.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </>
      );
    case "languages":
      return (
        <>
          <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1" />
          <path d="m22 22-5-10-5 10M14 18h6" />
        </>
      );
    case "bookmark":
      return <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17.5l-6-4-6 4V4Z" />;
    case "bookmark-check":
      return (
        <>
          <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17.5l-6-4-6 4V4Z" />
          <path d="m9.2 10.2 1.9 1.9 3.7-3.7" />
        </>
      );
    case "check":
      return <polyline points="20 6 9 17 4 12" />;
    case "x":
      return <path d="M18 6 6 18M6 6l12 12" />;
    case "trash":
      return (
        <>
          <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </>
      );
    case "arrow-right":
      return (
        <>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </>
      );
    case "arrow-left":
      return (
        <>
          <path d="M19 12H5" />
          <path d="m11 6-6 6 6 6" />
        </>
      );
    case "arrow-up":
      return (
        <>
          <path d="M12 19V5" />
          <path d="m6 11 6-6 6 6" />
        </>
      );
    case "external-link":
      return (
        <>
          <path d="M14 4h6v6" />
          <path d="M10 14 20 4" />
          <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
        </>
      );
    case "alert-triangle":
      return (
        <>
          <path d="M10.3 3.9 2.4 17.5A1.8 1.8 0 0 0 4 20.2h16a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z" />
          <path d="M12 9.5v4.2" />
          <circle cx="12" cy="16.8" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
    case "layout-grid":
      return (
        <>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
        </>
      );
    case "list":
      return (
        <>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.8 9.2h18.4M2.8 14.8h18.4" />
          <path d="M12 2.5a13.5 13.5 0 0 0 0 19M12 2.5a13.5 13.5 0 0 1 0 19" />
        </>
      );
    case "building":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M9 21v-4h6v4M8.5 7.5h1.5M14 7.5h1.5M8.5 11.5h1.5M14 11.5h1.5" />
        </>
      );
    case "file-text":
      return (
        <>
          <path d="M14.5 2.5H6.5A2 2 0 0 0 4.5 4.5v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7.5L14.5 2.5Z" />
          <path d="M14.5 2.5v5h5M8.5 12h7M8.5 16h5" />
        </>
      );
    case "log-out":
      return (
        <>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5M21 12H9" />
        </>
      );
    case "user":
      return (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </>
      );
    case "menu":
      return <path d="M4 7h16M4 12h16M4 17h16" />;
    case "rotate-ccw":
      return (
        <>
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
          <path d="M3 3v5h5" />
        </>
      );
    case "layers":
      return (
        <>
          <polygon points="12 2.5 2.5 7.5 12 12.5 21.5 7.5 12 2.5" />
          <path d="m2.5 12.5 9.5 5 9.5-5M2.5 17.5 12 22.5l9.5-5" />
        </>
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M12 7v5.2l3.4 2" />
        </>
      );
    case "plus":
      return <path d="M12 5v14M5 12h14" />;
    case "landmark":
      return (
        <>
          <path d="M3 21h18M4 18h16M6 18v-7M10 18v-7M14 18v-7M18 18v-7" />
          <polygon points="12 3 3 8 21 8 12 3" />
        </>
      );
    case "chevron-down":
      return <path d="m6 9 6 6 6-6" />;
    case "chevron-right":
      return <path d="m9 6 6 6-6 6" />;
    case "check-circle":
      return (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="m8.5 12.2 2.3 2.3 4.7-4.7" />
        </>
      );
    case "info":
      return (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M12 11.5v5" />
          <circle cx="12" cy="8.2" r="0.8" fill="currentColor" stroke="none" />
        </>
      );
  }
}

export function Icon({ name, size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ flexShrink: 0, ...rest.style }}
      {...rest}
    >
      <IconPaths name={name} />
    </svg>
  );
}

type CountryKey =
  | "us"
  | "tr"
  | "kr"
  | "hu"
  | "ca"
  | "de"
  | "pl"
  | "hk"
  | "au"
  | "uk"
  | "es"
  | "cz"
  | "it"
  | "fr"
  | "jp"
  | "cn"
  | "my"
  | "at"
  | "nl"
  | "ch"
  | "no"
  | "fi"
  | "se"
  | "be"
  | "sg"
  | "ae"
  | "ru"
  | "uz"
  | "eu";

const COUNTRY_MAP: Record<string, CountryKey> = {
  usa: "us",
  us: "us",
  "united states": "us",
  сша: "us",
  aqsh: "us",
  turkey: "tr",
  turkiye: "tr",
  турция: "tr",
  turkiya: "tr",
  "south korea": "kr",
  korea: "kr",
  "южная корея": "kr",
  "janubiy koreya": "kr",
  koreya: "kr",
  hungary: "hu",
  венгрия: "hu",
  vengriya: "hu",
  canada: "ca",
  канада: "ca",
  kanada: "ca",
  germany: "de",
  германия: "de",
  germaniya: "de",
  poland: "pl",
  польша: "pl",
  polsha: "pl",
  "hong kong": "hk",
  гонконг: "hk",
  gonkong: "hk",
  australia: "au",
  австралия: "au",
  avstraliya: "au",
  uk: "uk",
  "united kingdom": "uk",
  greatbritain: "uk",
  великобритания: "uk",
  "buyuk britaniya": "uk",
  spain: "es",
  испания: "es",
  ispaniya: "es",
  czechia: "cz",
  "czech republic": "cz",
  чехия: "cz",
  chexiya: "cz",
  italy: "it",
  италия: "it",
  italiya: "it",
  france: "fr",
  франция: "fr",
  fransiya: "fr",
  japan: "jp",
  япония: "jp",
  yaponiya: "jp",
  china: "cn",
  китай: "cn",
  xitoy: "cn",
  malaysia: "my",
  малайзия: "my",
  malayziya: "my",
  austria: "at",
  австрия: "at",
  avstriya: "at",
  netherlands: "nl",
  нидерланды: "nl",
  niderlandiya: "nl",
  switzerland: "ch",
  швейцария: "ch",
  shveytsariya: "ch",
  norway: "no",
  норвегия: "no",
  norvegiya: "no",
  finland: "fi",
  финляндия: "fi",
  finlyandiya: "fi",
  sweden: "se",
  швеция: "se",
  shvetsiya: "se",
  belgium: "be",
  бельгия: "be",
  belgiya: "be",
  singapore: "sg",
  сингапур: "sg",
  singapur: "sg",
  uae: "ae",
  оаэ: "ae",
  baa: "ae",
  russia: "ru",
  россия: "ru",
  rossiya: "ru",
  uzbekistan: "uz",
  узбекистан: "uz",
  "o'zbekiston": "uz",
  europe: "eu",
  европа: "eu",
  yevropa: "eu",
  es: "eu",
  eu: "eu",
};

function resolveCountryKey(country: string): CountryKey | null {
  const clean = country.trim().toLowerCase().replace(/\s+/g, " ");
  if (COUNTRY_MAP[clean]) return COUNTRY_MAP[clean];
  for (const [k, v] of Object.entries(COUNTRY_MAP)) {
    if (clean.includes(k)) return v;
  }
  return null;
}

export function CountryFlag({
  country,
  size = 16,
  className,
}: {
  country: string;
  size?: number;
  className?: string;
}) {
  const key = resolveCountryKey(country);
  if (!key) {
    return <Icon name="globe" size={size} className={className} />;
  }
  const h = Math.round((size * 3) / 4);
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 24 18"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ flexShrink: 0, borderRadius: 3, overflow: "hidden", display: "inline-block" }}
    >
      <defs>
        <clipPath id={`fl-${key}-${size}`}>
          <rect width="24" height="18" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#fl-${key}-${size})`}>
        {key === "us" && (
          <>
            <rect width="24" height="18" fill="#fff" />
            <rect y="0" width="24" height="2.6" fill="#c83232" />
            <rect y="5.1" width="24" height="2.6" fill="#c83232" />
            <rect y="10.2" width="24" height="2.6" fill="#c83232" />
            <rect y="15.3" width="24" height="2.7" fill="#c83232" />
            <rect width="11" height="10.2" fill="#1d4487" />
          </>
        )}
        {key === "tr" && (
          <>
            <rect width="24" height="18" fill="#d32027" />
            <circle cx="10.5" cy="9" r="4.2" fill="#fff" />
            <circle cx="11.8" cy="9" r="3.4" fill="#d32027" />
            <polygon points="15.5,9 17,9.5 16.1,8.2 16.1,9.8 17,8.5" fill="#fff" />
          </>
        )}
        {key === "kr" && (
          <>
            <rect width="24" height="18" fill="#f8fafc" />
            <circle cx="12" cy="9" r="4.2" fill="#cd2e3a" />
            <path d="M7.8 9a4.2 4.2 0 0 0 8.4 0 2.1 2.1 0 0 1-4.2 0 2.1 2.1 0 0 0-4.2 0Z" fill="#0047a0" />
          </>
        )}
        {key === "hu" && (
          <>
            <rect width="24" height="6" fill="#ce2939" />
            <rect y="6" width="24" height="6" fill="#f8fafc" />
            <rect y="12" width="24" height="6" fill="#477050" />
          </>
        )}
        {key === "ca" && (
          <>
            <rect width="24" height="18" fill="#f8fafc" />
            <rect width="6" height="18" fill="#d82027" />
            <rect x="18" width="6" height="18" fill="#d82027" />
            <polygon points="12,4 13.5,8.5 16,8 13.8,11 14.5,14 12,12.2 9.5,14 10.2,11 8,8 10.5,8.5" fill="#d82027" />
          </>
        )}
        {key === "de" && (
          <>
            <rect width="24" height="6" fill="#18181b" />
            <rect y="6" width="24" height="6" fill="#dc2626" />
            <rect y="12" width="24" height="6" fill="#eab308" />
          </>
        )}
        {key === "pl" && (
          <>
            <rect width="24" height="9" fill="#f8fafc" />
            <rect y="9" width="24" height="9" fill="#dc143c" />
          </>
        )}
        {key === "hk" && (
          <>
            <rect width="24" height="18" fill="#de2910" />
            <circle cx="12" cy="9" r="3.4" fill="#fff" />
            <circle cx="12" cy="9" r="1.4" fill="#de2910" />
          </>
        )}
        {key === "au" && (
          <>
            <rect width="24" height="18" fill="#012169" />
            <rect width="10" height="8" fill="#c8102e" stroke="#fff" strokeWidth="1.2" />
            <circle cx="18" cy="6" r="1.3" fill="#fff" />
            <circle cx="16.5" cy="12.5" r="1.1" fill="#fff" />
            <circle cx="7" cy="13.5" r="1.4" fill="#fff" />
          </>
        )}
        {key === "uk" && (
          <>
            <rect width="24" height="18" fill="#012169" />
            <path d="M0 0 24 18M24 0 0 18" stroke="#fff" strokeWidth="3" />
            <path d="M0 0 24 18M24 0 0 18" stroke="#c8102e" strokeWidth="1.4" />
            <path d="M12 0v18M0 9h24" stroke="#fff" strokeWidth="4.6" />
            <path d="M12 0v18M0 9h24" stroke="#c8102e" strokeWidth="2.6" />
          </>
        )}
        {key === "es" && (
          <>
            <rect width="24" height="4.5" fill="#aa151b" />
            <rect y="4.5" width="24" height="9" fill="#f1bf00" />
            <rect y="13.5" width="24" height="4.5" fill="#aa151b" />
          </>
        )}
        {key === "cz" && (
          <>
            <rect width="24" height="9" fill="#f8fafc" />
            <rect y="9" width="24" height="9" fill="#d7141a" />
            <polygon points="0,0 11,9 0,18" fill="#11457e" />
          </>
        )}
        {key === "it" && (
          <>
            <rect width="8" height="18" fill="#009246" />
            <rect x="8" width="8" height="18" fill="#f8fafc" />
            <rect x="16" width="8" height="18" fill="#ce2b37" />
          </>
        )}
        {key === "fr" && (
          <>
            <rect width="8" height="18" fill="#0055a4" />
            <rect x="8" width="8" height="18" fill="#f8fafc" />
            <rect x="16" width="8" height="18" fill="#ef4135" />
          </>
        )}
        {key === "jp" && (
          <>
            <rect width="24" height="18" fill="#f8fafc" />
            <circle cx="12" cy="9" r="4.5" fill="#bc002d" />
          </>
        )}
        {key === "cn" && (
          <>
            <rect width="24" height="18" fill="#de2910" />
            <circle cx="6.2" cy="5.8" r="2.2" fill="#ffde00" />
          </>
        )}
        {key === "my" && (
          <>
            <rect width="24" height="18" fill="#f8fafc" />
            <rect y="0" width="24" height="3" fill="#cc0001" />
            <rect y="6" width="24" height="3" fill="#cc0001" />
            <rect y="12" width="24" height="3" fill="#cc0001" />
            <rect width="12" height="9.5" fill="#010066" />
            <circle cx="6" cy="4.8" r="2.2" fill="#ffcc00" />
          </>
        )}
        {key === "at" && (
          <>
            <rect width="24" height="6" fill="#ed2939" />
            <rect y="6" width="24" height="6" fill="#f8fafc" />
            <rect y="12" width="24" height="6" fill="#ed2939" />
          </>
        )}
        {key === "nl" && (
          <>
            <rect width="24" height="6" fill="#ae1c28" />
            <rect y="6" width="24" height="6" fill="#f8fafc" />
            <rect y="12" width="24" height="6" fill="#21468b" />
          </>
        )}
        {key === "ch" && (
          <>
            <rect width="24" height="18" fill="#d52b1e" />
            <rect x="10.2" y="4" width="3.6" height="10" fill="#fff" />
            <rect x="7" y="7.2" width="10" height="3.6" fill="#fff" />
          </>
        )}
        {key === "no" && (
          <>
            <rect width="24" height="18" fill="#ba0c2f" />
            <path d="M8.5 0v18M0 9h24" stroke="#fff" strokeWidth="4" />
            <path d="M8.5 0v18M0 9h24" stroke="#00205b" strokeWidth="2" />
          </>
        )}
        {key === "fi" && (
          <>
            <rect width="24" height="18" fill="#f8fafc" />
            <path d="M8.5 0v18M0 9h24" stroke="#003580" strokeWidth="3.6" />
          </>
        )}
        {key === "se" && (
          <>
            <rect width="24" height="18" fill="#006aa7" />
            <path d="M8.5 0v18M0 9h24" stroke="#fecc00" strokeWidth="3.2" />
          </>
        )}
        {key === "be" && (
          <>
            <rect width="8" height="18" fill="#18181b" />
            <rect x="8" width="8" height="18" fill="#fae042" />
            <rect x="16" width="8" height="18" fill="#ed2939" />
          </>
        )}
        {key === "sg" && (
          <>
            <rect width="24" height="9" fill="#ef3340" />
            <rect y="9" width="24" height="9" fill="#f8fafc" />
            <circle cx="6.2" cy="4.8" r="2.2" fill="#fff" />
            <circle cx="7" cy="4.8" r="1.8" fill="#ef3340" />
          </>
        )}
        {key === "ae" && (
          <>
            <rect x="6" width="18" height="6" fill="#00732f" />
            <rect x="6" y="6" width="18" height="6" fill="#f8fafc" />
            <rect x="6" y="12" width="18" height="6" fill="#18181b" />
            <rect width="6" height="18" fill="#ff0000" />
          </>
        )}
        {key === "ru" && (
          <>
            <rect width="24" height="6" fill="#f8fafc" />
            <rect y="6" width="24" height="6" fill="#0039a6" />
            <rect y="12" width="24" height="6" fill="#d52b1e" />
          </>
        )}
        {key === "uz" && (
          <>
            <rect width="24" height="5.6" fill="#1eb53a" />
            <rect width="24" height="5.6" fill="#0099b5" />
            <rect y="5.6" width="24" height="0.8" fill="#ce1126" />
            <rect y="6.4" width="24" height="5.2" fill="#f8fafc" />
            <rect y="11.6" width="24" height="0.8" fill="#ce1126" />
            <rect y="12.4" width="24" height="5.6" fill="#1eb53a" />
          </>
        )}
        {key === "eu" && (
          <>
            <rect width="24" height="18" fill="#003399" />
            <circle cx="12" cy="9" r="4.5" fill="none" stroke="#ffcc00" strokeWidth="1.4" strokeDasharray="1.4 2.2" />
          </>
        )}
      </g>
      <rect width="24" height="18" rx="2.5" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" />
    </svg>
  );
}
