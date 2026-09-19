"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { countryRu } from "@/lib/types";
import styles from "./unis.module.css";

export type PublicUni = {
  slug: string;
  name: string;
  country: string;
  city: string | null;
  full_grant: boolean;
};

export function UnisDirectory({ unis }: { unis: PublicUni[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return unis;
    return unis.filter(
      (u) =>
        u.name.toLowerCase().includes(query) ||
        u.country.toLowerCase().includes(query) ||
        countryRu(u.country).toLowerCase().includes(query) ||
        (u.city || "").toLowerCase().includes(query),
    );
  }, [unis, query]);

  const byCountry = useMemo(() => {
    const map = new Map<string, PublicUni[]>();
    for (const u of filtered) {
      const list = map.get(u.country) || [];
      list.push(u);
      map.set(u.country, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <>
      <form
        className={styles.search}
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="uni-q" className={styles.srOnly}>
          Поиск университета
        </label>
        <input
          id="uni-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Название, страна или город…"
          autoComplete="off"
        />
        <button type="submit">Найти</button>
      </form>

      <div className={styles.meta}>
        Показано {filtered.length} из {unis.length}
        {query ? ` · «${q.trim()}»` : ""}
      </div>

      {byCountry.map(([country, list]) => (
        <section key={country} className={styles.countryBlock}>
          <h2>
            {countryRu(country)} <span>{list.length}</span>
          </h2>
          <ul className={styles.list}>
            {list.map((u) => (
              <li key={u.slug}>
                <Link href={`/unis/${u.slug}`}>
                  <strong>{u.name}</strong>
                  <span>
                    {[u.city, u.full_grant ? "полный грант" : null].filter(Boolean).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {!filtered.length ? (
        <p className={styles.empty}>Ничего не найдено. Попробуй другой запрос.</p>
      ) : null}
    </>
  );
}
