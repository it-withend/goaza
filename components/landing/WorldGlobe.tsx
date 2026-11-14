"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { countryName } from "@/lib/types";
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

type GlobeControls = { autoRotate: boolean; autoRotateSpeed: number; enableZoom: boolean };
type GlobeScene = { children?: Array<{ isAmbientLight?: boolean; intensity?: number }> };
type GlobeHandle = {
  controls?: (() => GlobeControls | null) | GlobeControls;
  scene?: () => GlobeScene | null;
  pointOfView?: (p: object, ms?: number) => void;
};

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function WorldGlobe({ byCountry }: { byCountry: CountryCount[] }) {
  const lang = useLang();
  const tr = useTr();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeHandle | null>(null);
  const [hover, setHover] = useState<GlobePoint | null>(null);
  const [size, setSize] = useState({ w: 340, h: 340 });

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
    const node = wrapRef.current;
    if (!node) return;
    const sync = () => {
      const rect = node.getBoundingClientRect();
      if (!rect.width) return;
      const side = Math.max(200, Math.min(440, Math.floor(rect.width)));
      setSize({ w: side, h: side });
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const configureGlobe = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    const ctrl = typeof g.controls === "function" ? g.controls() : g.controls;
    if (ctrl) {
      ctrl.autoRotate = true;
      ctrl.autoRotateSpeed = 0.45;
      ctrl.enableZoom = false;
    }
    const scene = typeof g.scene === "function" ? g.scene() : null;
    for (const child of scene?.children ?? []) {
      if (child.isAmbientLight && typeof child.intensity === "number") {
        child.intensity = Math.max(child.intensity, 1.85);
      }
    }
    g.pointOfView?.({ lat: 25, lng: 15, altitude: 1.95 }, 0);
  }, []);

  useEffect(() => {
    configureGlobe();
  }, [configureGlobe, size.w]);

  return (
    <div
      ref={wrapRef}
      className={styles.globeWrap}
      id="studyaza-globe"
      aria-label={tr("Глобус университетов", "Universitetlar globusi")}
    >
      <div className={styles.globeGlow} aria-hidden="true" />
      <Globe
        // @ts-expect-error globe ref typing from react-globe.gl
        ref={globeRef}
        onGlobeReady={configureGlobe}
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
          return `${countryName(p.country, lang)} · ${p.count}`;
        }}
        onPointHover={(d: object | null) => setHover((d as GlobePoint | null) ?? null)}
        atmosphereColor="#c9a227"
        atmosphereAltitude={0.18}
      />
      <div className={styles.globeHint} aria-live="polite">
        {hover ? (
          <>
            <strong>{countryName(hover.country, lang)}</strong>
            <span>{tr(`${hover.count} университетов в базе`, `Bazadagi ${hover.count} universitet`)}</span>
          </>
        ) : (
          <>
            <span className={styles.hintPointer}>{tr("Покрути · наведи на золотую точку", "Aylantiring · oltin nuqtaga olib boring")}</span>
            <span className={styles.hintTouch}>{tr("Покрути глобус · нажми на золотую точку", "Globusni aylantiring · oltin nuqtaga bosing")}</span>
          </>
        )}
      </div>
    </div>
  );
}
