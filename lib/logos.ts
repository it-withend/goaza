import manifest from "@/lib/logo-manifest.json";

const LOGOS = manifest as Record<string, number>;

/** Whether a sharp, self-hosted logo exists at /logos/<slug>.webp (see scripts/fetch-logos.mjs). */
export function hasLogo(slug: string): boolean {
  return Boolean(LOGOS[slug]);
}

export function logoSrc(slug: string): string {
  return `/logos/${slug}.webp`;
}
