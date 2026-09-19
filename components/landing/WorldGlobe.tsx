"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { countryRu } from "@/lib/types";
import { COUNTRY_COORDS } from "@/lib/country-coords";
import styles from "./LandingPage.module.css";

type CountryCount = { country: string; count: number };

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function WorldGlobe({ byCountry }: { byCountry: CountryCount[] }) {
  const globeRef = useRef<{
    controls?: { autoRotate: boolean; autoRotateSpeed: number };
    pointOfView: (p: object, ms?: number) => void;
  } | null>(null);
  const [hover, setHover] = useState<CountryCount | null>(null);
  const [size, setSize] = useState({ w: 480, h: 400 });

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
            size: Math.max(0.35, Math.min(1.8, Math.sqrt(row.count) / 4)),
          };
        })
        .filter(Boolean) as {
        lat: number;
        lng: number;
        country: string;
        count: number;
        size: number;
      }[],
    [byCountry],
  );

  useEffect(() => {
    const node = document.getElementById("studyaza-globe");
    if (!node) return;
    const sync = () => {
      const rect = node.getBoundingClientRect();
      setSize({
        w: Math.max(260, Math.floor(rect.width)),
        h: Math.max(260, Math.floor(rect.height)),
      });
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
    g.controls.autoRotateSpeed = 0.55;
    g.pointOfView({ lat: 18, lng: 10, altitude: 2.15 }, 0);
  }, [size.w]);

  return (
    <div className={styles.globeWrap} id="studyaza-globe" aria-label="Глобус университетов">
      <Globe
        // @ts-expect-error globe ref typing from react-globe.gl
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={points}
        pointAltitude={0.012}
        pointRadius="size"
        pointColor={() => "#d4a017"}
        pointLabel={(d: object) => {
          const p = d as CountryCount;
          return `${countryRu(p.country)}: ${p.count} унив.`;
        }}
        onPointHover={(d: object | null) => setHover((d as CountryCount | null) ?? null)}
        atmosphereColor="#d4a017"
        atmosphereAltitude={0.12}
      />
      <div className={styles.globeHint} aria-live="polite">
        {hover ? (
          <>
            <strong>{countryRu(hover.country)}</strong>
            <span>{hover.count} университетов в базе</span>
          </>
        ) : (
          <span>Крути глобус · наведи на точку страны</span>
        )}
      </div>
    </div>
  );
}
