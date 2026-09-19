export function universityInitials(name: string): string {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  const compact = words.filter((word) => !["of", "the", "and"].includes(word.toLowerCase()));
  return compact.slice(0, 3).map((word) => word[0]?.toUpperCase()).join("") || "?";
}

/** Prefer Context.dev Logo Link; fall back to Google favicon by domain. */
export function logoLinkUrl(domain: string | null, clientId?: string): string | null {
  if (!domain) return null;
  const clean = domain.replace(/^www\./, "").toLowerCase();
  if (clientId) {
    const query = new URLSearchParams({ publicClientId: clientId, domain: clean });
    return `https://logos.context.dev/?${query.toString()}`;
  }
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(clean)}&sz=128`;
}

export function websiteUrl(domain: string | null | undefined): string | null {
  if (!domain) return null;
  const clean = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
  if (!clean) return null;
  return `https://${clean}`;
}
