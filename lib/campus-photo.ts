/** Deterministic Unsplash campus heroes (visually verified university campus exteriors/architecture). */
const CAMPUS_IDS = [
  "1562774053-701939374585",
  "1607237138185-eedd9c632b0b",
  "1592280771190-3e2e4d571952",
  "1568792923760-d70635a89fdc",
  "1576495199011-eb94736d05d6",
  "1564981797816-1043664bf78d",
  "1592066575517-58df903152f2",
  "1583373834259-46cc92173cb7",
  "1559135197-8a45ea74d367",
  "1574958269340-fa927503f3dd",
] as const;

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

export function campusPhotoUrl(slug: string, width = 1600): string {
  const id = CAMPUS_IDS[hashSlug(slug || "studyaza") % CAMPUS_IDS.length];
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}
