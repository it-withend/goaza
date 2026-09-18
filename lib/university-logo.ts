export function universityInitials(name: string): string {
  const words = name.match(/[\p{L}\p{N}]+/gu) ?? [];
  const compact = words.filter((word) => !["of", "the", "and"].includes(word.toLowerCase()));
  return compact.slice(0, 3).map((word) => word[0]?.toUpperCase()).join("") || "?";
}

export function logoLinkUrl(domain: string | null, clientId?: string): string | null {
  if (!domain || !clientId) return null;
  const query = new URLSearchParams({ publicClientId: clientId, domain });
  return `https://logos.context.dev/?${query.toString()}`;
}
