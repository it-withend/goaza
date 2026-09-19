/** Deterministic Unsplash campus heroes (verified photo ids). */
const CAMPUS_IDS = [
  "1541339907198-e08756dedf3f",
  "1562774053-701939374585",
  "1523050854058-8df90110c9f1",
  "1498243691585-fdf5c92d29b7",
  "1606761568499-6d2451b23c66",
  "1580582932707-520aed937b7b",
  "1627556704302-624286467c65",
  "1519452575417-535b64eb2f6f",
  "1509062522246-3755977927d7",
  "1571260899304-425eee4c7efc",
  "1434030217049-f09c73ce4554",
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
