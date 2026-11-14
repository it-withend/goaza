import type { Metadata } from "next";
import { Manrope, Source_Serif_4, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "@/components/i18n/LangProvider";
import { langOf, LANGS } from "@/lib/i18n";
import {
  SITE_DESCRIPTION,
  SITE_DESCRIPTION_UZ,
  SITE_KEYWORDS,
  SITE_KEYWORDS_UZ,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TAGLINE_UZ,
  SITE_URL,
} from "@/lib/site";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-serif",
  display: "swap",
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamicParams = false;

type LayoutProps = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const uz = langOf((await params).lang) === "uz";
  const tagline = uz ? SITE_TAGLINE_UZ : SITE_TAGLINE;
  const description = uz ? SITE_DESCRIPTION_UZ : SITE_DESCRIPTION;
  const catalog = uz ? "universitetlar va grantlar katalogi" : "каталог университетов и грантов";
  return {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${tagline}`,
    template: `%s · ${SITE_NAME}`,
  },
  description,
  keywords: uz ? SITE_KEYWORDS_UZ : SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: uz ? "/uz" : "/",
    languages: { ru: "/", uz: "/uz" },
  },
  openGraph: {
    type: "website",
    locale: uz ? "uz_UZ" : "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${catalog}`,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${catalog}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${catalog}`,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.png",
  },
  other: {
    "msapplication-TileImage": "/logo.png",
  },
  manifest: "/manifest.webmanifest",
};
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const lang = langOf((await params).lang);
  return (
    <html lang={lang} className={`${manrope.variable} ${sourceSerif.variable} ${unbounded.variable}`}>
      <body className={manrope.className}>
        <LangProvider lang={lang}>{children}</LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
