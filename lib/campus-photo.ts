/** Deterministic Unsplash campus heroes. Re-check ids with curl if a hero looks broken (4 dead ids removed 2026-11). */
const CAMPUS_IDS = [
  "1541339907198-e08756dedf3f",
  "1562774053-701939374585",
  "1606761568499-6d2451b23c66",
  "1580582932707-520aed937b7b",
  "1627556704302-624286467c65",
  "1509062522246-3755977927d7",
  "1571260899304-425eee4c7efc",
  "1524178232363-1fb2b075b655",
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
