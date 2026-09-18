import type { LandingStats } from "@/lib/landing-stats";

export function LandingPage({
  stats,
}: {
  stats: LandingStats;
  botUsername: string;
}) {
  return (
    <main>
      <h1>Studyaza</h1>
      <p>
        {stats.total} universities · {stats.countries} countries · {stats.grants} full grants
      </p>
    </main>
  );
}
