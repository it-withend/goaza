"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import { countryRu } from "@/lib/types";
import { COUNTRY_COORDS } from "@/lib/country-coords";
import styles from "./LandingPage.module.css";

type CountryCount = { country: string; count: number };

type Marker = {
  location: [number, number];
  size: number;
  country: string;
  count: number;
};

export function WorldGlobe({ byCountry }: { byCountry: CountryCount[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Marker | null>(null);
  const [active, setActive] = useState(false);
  const [side, setSide] = useState(420);

  const markers = useMemo(
    () =>
      byCountry
        .map((row) => {
          const coords = COUNTRY_COORDS[row.country];
          if (!coords) return null;
          return {
            location: [coords[0], coords[1]] as [number, number],
            size: Math.max(0.04, Math.min(0.14, 0.035 + Math.sqrt(row.count) / 55)),
            country: row.country,
            count: row.count,
          } satisfies Marker;
        })
        .filter(Boolean) as Marker[],
    [byCountry],
  );

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const sync = () => {
      const w = Math.min(Math.max(260, Math.floor(node.clientWidth)), 520);
      setSide(w);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    let phi = 0;
    let dragging = false;
    let lastX = 0;
    let dragPhi = 0;
    let raf = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
      width: side * 2,
      height: side * 2,
      phi: 0,
      theta: 0.28,
      dark: 0,
      diffuse: 1.15,
      mapSamples: 14000,
      mapBrightness: 5.2,
      baseColor: [0.93, 0.93, 0.91],
      markerColor: [0.83, 0.63, 0.09],
      glowColor: [0.98, 0.94, 0.86],
      markers: markers.map((m) => ({ location: m.location, size: m.size })),
    });

    const tick = () => {
      if (!dragging) phi += 0.0028;
      globe.update({ phi: phi + dragPhi });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dragPhi += (e.clientX - lastX) / 200;
      lastX = e.clientX;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [active, markers, side]);

  const topCountry = markers[0] ?? null;

  return (
    <div
      ref={wrapRef}
      className={styles.globeWrap}
      id="studyaza-globe"
      aria-label="Глобус университетов"
    >
      <div className={styles.globeGlow} aria-hidden="true" />
      {active ? (
        <canvas
          ref={canvasRef}
          className={styles.globeCanvas}
          style={{ width: side, height: side }}
          width={side * 2}
          height={side * 2}
          onMouseEnter={() => setHover(topCountry)}
          onMouseLeave={() => setHover(null)}
        />
      ) : (
        <div className={styles.globeSkeleton} style={{ width: side, height: side }} aria-hidden>
          Загрузка карты…
        </div>
      )}
      <div className={styles.globeHint} aria-live="polite">
        {hover ? (
          <>
            <strong>{countryRu(hover.country)}</strong>
            <span>{hover.count} университетов в базе</span>
          </>
        ) : (
          <span>Покрути глобус · точки стран в базе</span>
        )}
      </div>
    </div>
  );
}
