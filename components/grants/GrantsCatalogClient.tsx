"use client";

import { useMemo, useState } from "react";
import { useTr } from "@/components/i18n/LangProvider";
import { CountryFlag, Icon } from "@/components/ui/Icon";
import type { Grant, GrantKind, Level } from "@/content/grants";
import type { Lang } from "@/lib/i18n";
import g from "@/app/[lang]/grants/grants.module.css";

type KindInfo = { kind: GrantKind; label: string; intro: string };

const LEVELS: Level[] = ["bachelor", "master", "phd"];

export function GrantsCatalogClient({
  grants,
  kinds,
  levelNames,
}: {
  grants: Grant[];
  kinds: KindInfo[];
  levelNames: Record<Level, string>;
  lang: Lang;
}) {
  const tr = useTr();
  const [query, setQuery] = useState("");
  const [kindFilter, setKindFilter] = useState<GrantKind | "all">("all");
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return grants.filter((item) => {
      if (kindFilter !== "all" && item.kind !== kindFilter) return false;
      if (levelFilter !== "all" && !item.levels.includes(levelFilter)) return false;
      if (!q) return true;
      const hay = `${item.name} ${item.country} ${item.summary} ${item.scope ?? ""} ${item.stipend ?? ""} ${item.majors?.join(" ") ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [grants, kindFilter, levelFilter, query]);

  const activeKinds = kinds.filter((k) => kindFilter === "all" || k.kind === kindFilter);
  const hasFilters = query.trim().length > 0 || kindFilter !== "all" || levelFilter !== "all";

  return (
    <>
      <div className={g.toolbar} role="region" aria-label={tr("Фильтры грантов", "Grantlar filtri")}>
        <div className={g.searchWrap}>
          <Icon name="search" size={16} className={g.searchIcon} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("Поиск по стране, гранту или направлению…", "Davlat, grant yoki yo'nalish bo'yicha qidirish…")}
            aria-label={tr("Поиск грантов", "Grantlarni qidirish")}
          />
          {query ? (
            <button type="button" className={g.clearSearch} onClick={() => setQuery("")} aria-label={tr("Очистить поиск", "Qidiruvni tozalash")}>
              <Icon name="x" size={14} />
            </button>
          ) : null}
        </div>

        <div className={g.chipsRow}>
          <button
            type="button"
            className={`${g.chip}${kindFilter === "all" ? ` ${g.chipActive}` : ""}`}
            onClick={() => setKindFilter("all")}
          >
            {tr("Все типы", "Barcha turlar")} ({grants.length})
          </button>
          {kinds.map((k) => {
            const count = grants.filter((item) => item.kind === k.kind).length;
            return (
              <button
                key={k.kind}
                type="button"
                className={`${g.chip}${kindFilter === k.kind ? ` ${g.chipActive}` : ""}`}
                onClick={() => setKindFilter(k.kind)}
              >
                {k.label} ({count})
              </button>
            );
          })}
        </div>

        <div className={g.chipsRow}>
          <button
            type="button"
            className={`${g.chip}${levelFilter === "all" ? ` ${g.chipActive}` : ""}`}
            onClick={() => setLevelFilter("all")}
          >
            {tr("Все уровни", "Barcha bosqichlar")}
          </button>
          {LEVELS.map((lvl) => (
            <button
              key={lvl}
              type="button"
              className={`${g.chip}${levelFilter === lvl ? ` ${g.chipActive}` : ""}`}
              onClick={() => setLevelFilter(lvl)}
            >
              {levelNames[lvl]}
            </button>
          ))}
          {hasFilters ? (
            <button
              type="button"
              className={g.resetBtn}
              onClick={() => {
                setQuery("");
                setKindFilter("all");
                setLevelFilter("all");
              }}
            >
              <Icon name="rotate-ccw" size={13} />
              <span>{tr("Сбросить", "Tozalash")}</span>
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={g.empty}>
          <p>{tr("По вашему запросу программы не найдены.", "So'rovingiz bo'yicha dasturlar topilmadi.")}</p>
          <button
            type="button"
            className={g.chipActive}
            onClick={() => {
              setQuery("");
              setKindFilter("all");
              setLevelFilter("all");
            }}
          >
            {tr("Показать все программы", "Barcha dasturlarni ko'rsatish")}
          </button>
        </div>
      ) : null}

      {activeKinds.map(({ kind, label, intro }) => {
        const list = filtered.filter((x) => x.kind === kind);
        if (!list.length) return null;
        return (
          <section key={kind} className={g.group}>
            <div className={g.groupHead}>
              <h2>{label}</h2>
              <p>{intro}</p>
            </div>
            <div className={g.grid}>
              {list.map((x) => (
                <article key={x.slug} id={x.slug} className={g.card}>
                  <header>
                    <span className={g.country}>
                      <CountryFlag country={x.country} size={15} />
                      <span>{x.country}</span>
                    </span>
                    <h3>{x.name}</h3>
                    <p>{x.summary}</p>
                  </header>
                  <div className={g.levels}>
                    {x.levels.map((l) => (
                      <span key={l}>{levelNames[l]}</span>
                    ))}
                  </div>
                  <dl className={g.facts}>
                    <div>
                      <dt>{tr("Покрывает", "Qoplaydi")}</dt>
                      <dd>
                        <ul>
                          {x.covers.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    {x.stipend ? (
                      <div>
                        <dt>{tr("Деньги", "Stipendiya")}</dt>
                        <dd>{x.stipend}</dd>
                      </div>
                    ) : null}
                    {x.scope ? (
                      <div>
                        <dt>{tr("Где", "Qayerda")}</dt>
                        <dd>{x.scope}</dd>
                      </div>
                    ) : null}
                    {x.quota ? (
                      <div>
                        <dt>{tr("Мест", "Kvota")}</dt>
                        <dd>{x.quota}</dd>
                      </div>
                    ) : null}
                    {x.majors?.length ? (
                      <div>
                        <dt>{tr("Сильные направления", "Kuchli yo'nalishlar")}</dt>
                        <dd>{x.majors.join(", ")}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {x.notes?.length ? (
                    <ul className={g.notes}>
                      {x.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  ) : null}
                  {x.warning ? (
                    <p className={g.warning}>
                      <Icon name="alert-triangle" size={14} />
                      <span>{x.warning}</span>
                    </p>
                  ) : null}
                  <footer>
                    <a href={x.url} target="_blank" rel="noopener noreferrer" className={g.extLink}>
                      <span>{tr("Официальный сайт", "Rasmiy sayt")}</span>
                      <Icon name="external-link" size={13} />
                    </a>
                    <span>{tr(`Проверено: ${x.checked}`, `Tekshirildi: ${x.checked}`)}</span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
