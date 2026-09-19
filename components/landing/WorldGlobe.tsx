"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { countryRu } from "@/lib/types";
import { COUNTRY_COORDS } from "@/lib/country-coords";
import styles from "./LandingPage.module.css";

type CountryCount = { country: string; count: number };

type GlobePoint = {
  lat: number;
  lng: number;
  country: string;
  count: number;
  size: number;
};

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function WorldGlobe({ byCountry }: { byCountry: CountryCount[] }) {
  const globeRef = useRef<{
    controls?: { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean };
    pointOfView: (p: object, ms?: number) => void;
  } | null>(null);
  const [hover, setHover] = useState<GlobePoint | null>(null);
  const [size, setSize] = useState({ w: 480, h: 420 });

  const points = useMemo(
    () =>
      byCountry
        .map((row) => {
          const coords = COUNTRY_COORDS[row.country];
          if (!coords) return null;
          return {
            lat: coords[0],
            lng: coords[1],
            country: row.country,
            count: row.count,
            size: Math.max(0.28, Math.min(1.15, 0.22 + Math.sqrt(row.count) / 12)),
          } satisfies GlobePoint;
        })
        .filter(Boolean) as GlobePoint[],
    [byCountry],
  );

  useEffect(() => {
    const node = document.getElementById("studyaza-globe");
    if (!node) return;
    const sync = () => {
      const rect = node.getBoundingClientRect();
      const side = Math.min(Math.max(260, Math.floor(rect.width)), Math.floor(rect.height) || 480);
      setSize({ w: side, h: side });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g?.controls) return;
    g.controls.autoRotate = true;
    g.controls.autoRotateSpeed = 0.45;
    g.controls.enableZoom = false;
    g.pointOfView({ lat: 25, lng: 15, altitude: 1.85 }, 0);
  }, [size.w]);

  return (
    <div className={styles.globeWrap} id="studyaza-globe" aria-label="Глобус университетов">
      <div className={styles.globeGlow} aria-hidden="true" />
      <Globe
        // @ts-expect-error globe ref typing from react-globe.gl
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={points}
        pointAltitude={0.006}
        pointRadius="size"
        pointColor={() => "#d4a017"}
        pointLabel={(d: object) => {
          const p = d as GlobePoint;
          return `${countryRu(p.country)} · ${p.count}`;
        }}
        onPointHover={(d: object | null) => setHover((d as GlobePoint | null) ?? null)}
        atmosphereColor="#c9a227"
        atmosphereAltitude={0.18}
      />
      <div className={styles.globeHint} aria-live="polite">
        {hover ? (
          <>
            <strong>{countryRu(hover.country)}</strong>
            <span>{hover.count} университетов в базе</span>
          </>
        ) : (
          <span>Покрути · наведи на золотую точку</span>
        )}
      </div>
    </div>
  );
}
