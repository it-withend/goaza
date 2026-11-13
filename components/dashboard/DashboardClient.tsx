"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { filterCatalog, type CatalogUni } from "@/lib/catalog";
import { INST_LABEL, countryRu } from "@/lib/types";
import type { computeMeta } from "@/lib/universities";
import { UniversityCard } from "@/components/UniversityCard";
import { ToTop } from "@/components/ToTop";
import { DashboardShell } from "./DashboardShell";
import styles from "./Dashboard.module.css";

type Meta = ReturnType<typeof computeMeta>;

const FIRST_BATCH = 24;
const BATCH = 36;
const FAV_STORAGE_KEY = "goaza_favs_v1";

const SORT_LABELS: Record<string, string> = {
  grant: "Сначала полные гранты",
  intl_aid: "Бюджет помощи иностранцам ↓",
  intl_avg: "Средний грант иностранцам ↓",
  rate: "По % поступления",
  tuition: "По стоимости",
  aid: "По макс. помощи",
};

function money(n: number) {
  return n.toLocaleString("en-US");
}

function readParam(sp: URLSearchParams, key: string, fallback = "") {
  return sp.get(key) ?? fallback;
}

export function DashboardClient({
  initial,
  meta,
  accountName,
  initialQuery = "",
}: {
  initial: CatalogUni[];
  meta: Meta;
  accountName: string;
  initialQuery?: string;
}) {
  const router = useRouter();
  const boot = useMemo(() => new URLSearchParams(initialQuery), [initialQuery]);

  const [q, setQ] = useState(() => readParam(boot, "q"));
  const [country, setCountry] = useState(() => readParam(boot, "country"));
  const [grantOnly, setGrantOnly] = useState(() => boot.get("grantOnly") === "1");
  const [needBlind, setNeedBlind] = useState(() => boot.get("needBlind") === "1");
  const [hasIntlAid, setHasIntlAid] = useState(() => boot.get("intlAid") === "1");
  const [urgentDeadline, setUrgentDeadline] = useState(() => boot.get("urgent") === "1");
  const [favOnly, setFavOnly] = useState(() => boot.get("fav") === "1");
  const [tuitionMax, setTuitionMax] = useState(() =>
    boot.has("tuitionMax") ? Number(boot.get("tuitionMax")) : meta.tuitionMax,
  );
  const [aidMin, setAidMin] = useState(() => (boot.has("aidMin") ? Number(boot.get("aidMin")) : 0));
  const [rateMax, setRateMax] = useState(() => (boot.has("rateMax") ? Number(boot.get("rateMax")) : 100));
  const [sort, setSort] = useState(() => readParam(boot, "sort", "name"));
  const [inst, setInst] = useState(() => boot.get("inst")?.split(",").filter(Boolean) || []);
  const [aidTypes, setAidTypes] = useState(() => boot.get("aidTypes")?.split(",").filter(Boolean) || []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [favList, setFavList] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAV_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setFavList(parsed.map(String));
      }
    } catch {
      /* ignore localStorage errors */
    }
  }, []);

  const favSet = useMemo(() => new Set(favList), [favList]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavList((prev) => {
      const exists = prev.includes(slug);
      const next = exists ? prev.filter((s) => s !== slug) : [...prev, slug];
      try {
        window.localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const intlFundCount = useMemo(
    () => initial.filter((u) => u.total_aid_num != null || u.avg_aid_num != null).length,
    [initial],
  );

  const catalogQuery = useMemo(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (country) sp.set("country", country);
    if (grantOnly) sp.set("grantOnly", "1");
    if (needBlind) sp.set("needBlind", "1");
    if (hasIntlAid) sp.set("intlAid", "1");
    if (urgentDeadline) sp.set("urgent", "1");
    if (favOnly) sp.set("fav", "1");
    if (tuitionMax < meta.tuitionMax) sp.set("tuitionMax", String(tuitionMax));
    if (aidMin > 0) sp.set("aidMin", String(aidMin));
    if (rateMax < 100) sp.set("rateMax", String(rateMax));
    if (inst.length) sp.set("inst", inst.join(","));
    if (aidTypes.length) sp.set("aidTypes", aidTypes.join(","));
    if (sort !== "name") sp.set("sort", sort);
    const raw = sp.toString();
    return raw ? `?${raw}` : "";
  }, [
    q,
    country,
    grantOnly,
    needBlind,
    hasIntlAid,
    urgentDeadline,
    favOnly,
    tuitionMax,
    aidMin,
    rateMax,
    inst,
    aidTypes,
    sort,
    meta.tuitionMax,
  ]);

  useEffect(() => {
    const next = catalogQuery ? `/dashboard${catalogQuery}` : "/dashboard";
    if (typeof window !== "undefined") {
      const current = `${window.location.pathname}${window.location.search}`;
      if (current === next) return;
    }
    window.history.replaceState(window.history.state, "", next);
  }, [catalogQuery]);

  const deferredQ = useDeferredValue(q);
  const unis = useMemo(
    () =>
      filterCatalog(initial, {
        q: deferredQ,
        country,
        grantOnly,
        needBlind,
        hasIntlAid,
        urgentDeadline,
        favSlugs: favOnly ? favSet : undefined,
        tuitionMax: tuitionMax < meta.tuitionMax ? tuitionMax : undefined,
        aidMin,
        rateMax,
        inst,
        aidTypes,
        sort,
      }),
    [
      initial,
      deferredQ,
      country,
      grantOnly,
      needBlind,
      hasIntlAid,
      urgentDeadline,
      favOnly,
      favSet,
      tuitionMax,
      meta.tuitionMax,
      aidMin,
      rateMax,
      inst,
      aidTypes,
      sort,
    ],
  );
  const loading = deferredQ !== q;

  const filteredGrants = useMemo(() => unis.filter((u) => u.full_grant).length, [unis]);

  const [visible, setVisible] = useState(FIRST_BATCH);
  useEffect(() => setVisible(FIRST_BATCH), [unis]);
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = sentinel.current;
    if (!node || visible >= unis.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible((v) => Math.min(v + BATCH, unis.length));
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [visible, unis.length]);

  const grouped = useMemo(() => {
    const map = new Map<string, CatalogUni[]>();
    for (const u of unis) {
      const list = map.get(u.country) || [];
      list.push(u);
      map.set(u.country, list);
    }
    return [...map.entries()].sort((a, b) => countryRu(a[0]).localeCompare(countryRu(b[0]), "ru"));
  }, [unis]);

  function toggleChip(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  async function logout() {
    await fetch("/api/auth/telegram", { method: "DELETE" });
    router.replace("/");
    router.refresh();
  }

  function resetFilters() {
    setQ("");
    setCountry("");
    setGrantOnly(false);
    setNeedBlind(false);
    setHasIntlAid(false);
    setUrgentDeadline(false);
    setFavOnly(false);
    setTuitionMax(meta.tuitionMax);
    setAidMin(0);
    setRateMax(100);
    setSort("name");
    setInst([]);
    setAidTypes([]);
  }

  const activeTokens: { key: string; label: string; clear: () => void }[] = [];
  if (q.trim()) activeTokens.push({ key: "q", label: `Поиск: ${q.trim()}`, clear: () => setQ("") });
  if (country) {
    activeTokens.push({
      key: "country",
      label: countryRu(country),
      clear: () => setCountry(""),
    });
  }
  if (grantOnly) activeTokens.push({ key: "grant", label: "Полный грант", clear: () => setGrantOnly(false) });
  if (needBlind) activeTokens.push({ key: "nb", label: "Need-blind", clear: () => setNeedBlind(false) });
  if (hasIntlAid) {
    activeTokens.push({
      key: "intlAid",
      label: "С фондом для иностр.",
      clear: () => setHasIntlAid(false),
    });
  }
  if (urgentDeadline) {
    activeTokens.push({
      key: "urgent",
      label: "Дедлайн ≤ 60 дн.",
      clear: () => setUrgentDeadline(false),
    });
  }
  if (favOnly) activeTokens.push({ key: "fav", label: "★ Избранное", clear: () => setFavOnly(false) });
  if (tuitionMax < meta.tuitionMax) {
    activeTokens.push({
      key: "tuition",
      label: `Стоимость ≤ $${money(tuitionMax)}`,
      clear: () => setTuitionMax(meta.tuitionMax),
    });
  }
  if (aidMin > 0) {
    activeTokens.push({
      key: "aid",
      label: `Помощь ≥ $${money(aidMin)}`,
      clear: () => setAidMin(0),
    });
  }
  if (rateMax < 100) {
    activeTokens.push({
      key: "rate",
      label: `Поступление ≤ ${rateMax}%`,
      clear: () => setRateMax(100),
    });
  }
  for (const key of inst) {
    activeTokens.push({
      key: `inst-${key}`,
      label: INST_LABEL[key] || key,
      clear: () => setInst((prev) => prev.filter((x) => x !== key)),
    });
  }
  for (const key of aidTypes) {
    activeTokens.push({
      key: `aid-${key}`,
      label: key,
      clear: () => setAidTypes((prev) => prev.filter((x) => x !== key)),
    });
  }
  if (sort !== "name") {
    activeTokens.push({
      key: "sort",
      label: `Сорт: ${SORT_LABELS[sort] || sort}`,
      clear: () => setSort("name"),
    });
  }

  const noPresetsActive =
    !grantOnly && !needBlind && !hasIntlAid && !urgentDeadline && !favOnly && !country;

  const cardsClass = view === "grid" ? styles.cardsGrid : styles.cardsList;

  const filters = (
    <aside className={styles.filtersPanel} aria-label="Фильтры">
      <div className={styles.filtersHead}>
        <div>
          <h2 className={styles.filtersTitle}>Подбор вузов</h2>
          <p className={styles.hint}>Фильтры суммируются (И)</p>
        </div>
        <button type="button" className={styles.filtersDone} onClick={() => setFiltersOpen(false)}>
          Готово
        </button>
      </div>

      <div className={styles.searchWrap}>
        <span aria-hidden>⌕</span>
        <input
          type="search"
          placeholder="Вуз, город, грант, направление…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Поиск университетов"
        />
      </div>

      <div className={styles.selectWrap}>
        <label className={styles.fieldLabel} htmlFor="country-select">
          Страна
        </label>
        <select id="country-select" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Все страны ({meta.countries.length})</option>
          {meta.countries.map(([c, n]) => (
            <option key={c} value={c}>
              {countryRu(c)} ({n})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selectWrap}>
        <label className={styles.fieldLabel} htmlFor="sort-select">
          Сортировка
        </label>
        <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">По алфавиту и странам</option>
          <option value="intl_aid">По бюджету помощи иностранцам ↓</option>
          <option value="intl_avg">По среднему гранту иностранцам ↓</option>
          <option value="grant">Сначала полные гранты</option>
          <option value="rate">По % поступления ↑</option>
          <option value="tuition">По стоимости ↑</option>
          <option value="aid">По макс. помощи ↓</option>
        </select>
      </div>

      <div className={styles.fBlock}>
        <h4>Ключевые условия</h4>
        <label className={styles.check}>
          <input type="checkbox" checked={grantOnly} onChange={(e) => setGrantOnly(e.target.checked)} />
          <span>Полный грант</span>
          <em className={styles.n}>{meta.grants}</em>
        </label>
        <label className={styles.check}>
          <input type="checkbox" checked={needBlind} onChange={(e) => setNeedBlind(e.target.checked)} />
          <span>Need-blind политика</span>
        </label>
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={hasIntlAid}
            onChange={(e) => setHasIntlAid(e.target.checked)}
          />
          <span>Фонд для иностранцев</span>
          <em className={styles.n}>{intlFundCount}</em>
        </label>
        <label className={styles.check}>
          <input
            type="checkbox"
            checked={urgentDeadline}
            onChange={(e) => setUrgentDeadline(e.target.checked)}
          />
          <span>Дедлайн ≤ 60 дней</span>
        </label>
        <label className={styles.check}>
          <input type="checkbox" checked={favOnly} onChange={(e) => setFavOnly(e.target.checked)} />
          <span>★ Только избранное</span>
          <em className={styles.n}>{favSet.size}</em>
        </label>
      </div>

      <div className={styles.fBlock}>
        <h4>Бюджет и шансы</h4>
        <div className={styles.rangeRow}>
          <label>
            Стоимость до <span>${money(tuitionMax)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={meta.tuitionMax}
            step={500}
            value={tuitionMax}
            onChange={(e) => setTuitionMax(Number(e.target.value))}
          />
        </div>
        <div className={styles.rangeRow}>
          <label>
            Помощь от <span>${money(aidMin)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={meta.aidMax}
            step={500}
            value={aidMin}
            onChange={(e) => setAidMin(Number(e.target.value))}
          />
        </div>
        <div className={styles.rangeRow}>
          <label>
            Поступление до <span>{rateMax}%</span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={rateMax}
            onChange={(e) => setRateMax(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.fBlock}>
        <h4>Тип вуза</h4>
        <div className={styles.chips}>
          {meta.inst.map(([key, n]) => (
            <label className={styles.chip} key={key}>
              <input
                type="checkbox"
                checked={inst.includes(key)}
                onChange={() => toggleChip(inst, key, setInst)}
              />
              {INST_LABEL[key] || key}
              <span className={styles.n}>{n}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.fBlock}>
        <h4>Тип помощи</h4>
        <div className={styles.chips}>
          {meta.aidTypes.slice(0, 10).map(([key, n]) => (
            <label className={styles.chip} key={key}>
              <input
                type="checkbox"
                checked={aidTypes.includes(key)}
                onChange={() => toggleChip(aidTypes, key, setAidTypes)}
              />
              {key}
              <span className={styles.n}>{n}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="button" className={styles.resetBtn} onClick={resetFilters}>
        Сбросить все фильтры
      </button>
    </aside>
  );

  return (
    <DashboardShell
      accountName={accountName}
      onLogout={() => void logout()}
      onOpenFilters={() => setFiltersOpen(true)}
    >
      <div className={`${styles.workspace}${filtersOpen ? ` ${styles.filtersDrawerOpen}` : ""}`}>
        <button
          type="button"
          className={styles.filtersDrawerBackdrop}
          aria-label="Закрыть фильтры"
          onClick={() => setFiltersOpen(false)}
        />
        {filters}
        <section className={styles.results} aria-live="polite">
          <div className={styles.kpiStrip}>
            <div className={styles.kpiTile}>
              <small>В выдаче</small>
              <strong>
                {loading ? "…" : unis.length} <span>/ {meta.total}</span>
              </strong>
            </div>
            <div className={styles.kpiTile}>
              <small>Полные гранты</small>
              <strong>{filteredGrants}</strong>
            </div>
            <div className={styles.kpiTile}>
              <small>С фондом иностр.</small>
              <strong>{intlFundCount}</strong>
            </div>
            <div className={styles.kpiTile}>
              <small>Ваш шорт-лист</small>
              <strong>★ {favSet.size}</strong>
            </div>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.presets} role="group" aria-label="Быстрые подборки">
              <button
                type="button"
                className={`${styles.presetBtn}${noPresetsActive ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={resetFilters}
              >
                Все вузы
              </button>
              <button
                type="button"
                className={`${styles.presetBtn}${grantOnly ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={() => setGrantOnly((v) => !v)}
              >
                Полный грант
              </button>
              <button
                type="button"
                className={`${styles.presetBtn}${needBlind ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={() => setNeedBlind((v) => !v)}
              >
                Need-blind
              </button>
              <button
                type="button"
                className={`${styles.presetBtn}${hasIntlAid ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={() => {
                  const next = !hasIntlAid;
                  setHasIntlAid(next);
                  if (next && sort === "name") setSort("intl_aid");
                }}
              >
                Фонд иностранцев
              </button>
              <button
                type="button"
                className={`${styles.presetBtn}${urgentDeadline ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={() => setUrgentDeadline((v) => !v)}
              >
                Дедлайн ≤ 60 дн.
              </button>
              <button
                type="button"
                className={`${styles.presetBtn}${favOnly ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={() => setFavOnly((v) => !v)}
              >
                ★ Избранное ({favSet.size})
              </button>
            </div>

            <div className={styles.viewToggle} role="group" aria-label="Вид списка">
              <button
                type="button"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                Сетка
              </button>
              <button
                type="button"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                Список
              </button>
            </div>
          </div>

          {activeTokens.length ? (
            <div className={styles.tokens} aria-label="Активные фильтры">
              {activeTokens.map((token) => (
                <button key={token.key} type="button" className={styles.token} onClick={token.clear}>
                  {token.label} ×
                </button>
              ))}
              {activeTokens.length > 1 ? (
                <button type="button" className={styles.tokenClearAll} onClick={resetFilters}>
                  Сбросить всё
                </button>
              ) : null}
            </div>
          ) : null}

          <nav className={styles.countryNav} aria-label="Страны">
            <button type="button" aria-pressed={!country} onClick={() => setCountry("")}>
              Все <span className={styles.n}>{meta.total}</span>
            </button>
            {meta.countries.map(([c, n]) => (
              <button type="button" key={c} aria-pressed={country === c} onClick={() => setCountry(c)}>
                {countryRu(c)} <span className={styles.n}>{n}</span>
              </button>
            ))}
          </nav>

          <div className={`${styles.empty}${unis.length === 0 ? ` ${styles.emptyShow}` : ""}`}>
            {favOnly && favSet.size === 0
              ? "В избранном пока пусто. Нажмите ★ на карточке любого вуза, чтобы собрать свой список."
              : "По текущим фильтрам ничего не найдено. Ослабьте один из фильтров."}
          </div>

          {sort !== "name" ? (
            unis.length > 0 ? (
              <section className={styles.countrySection}>
                <div className={styles.sectionHeader}>
                  <h2>{SORT_LABELS[sort] || "Результаты"}</h2>
                  <span>{unis.length} вузов</span>
                </div>
                <div className={cardsClass}>
                  {unis.slice(0, visible).map((u, index) => (
                    <UniversityCard
                      key={u.slug}
                      u={u}
                      catalogQuery={catalogQuery}
                      staggerIndex={index}
                      isFavorite={favSet.has(u.slug)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              </section>
            ) : null
          ) : (
            (() => {
              let budget = visible;
              let rendered = 0;
              return grouped.map(([c, list]) => {
                if (budget <= 0) return null;
                const shown = list.slice(0, budget);
                budget -= shown.length;
                const offset = rendered;
                rendered += shown.length;
                return (
                  <section className={styles.countrySection} key={c} id={`sec-${c}`}>
                    <div className={styles.sectionHeader}>
                      <h2>{countryRu(c)}</h2>
                      <span>{list.length}</span>
                    </div>
                    <div className={cardsClass}>
                      {shown.map((u, index) => (
                        <UniversityCard
                          key={u.slug}
                          u={u}
                          catalogQuery={catalogQuery}
                          staggerIndex={offset + index}
                          isFavorite={favSet.has(u.slug)}
                          onToggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </section>
                );
              });
            })()
          )}

          {visible < unis.length ? (
            <div ref={sentinel} className={styles.loadMore}>
              <button type="button" onClick={() => setVisible((v) => Math.min(v + BATCH, unis.length))}>
                Показать ещё · осталось {unis.length - visible}
              </button>
            </div>
          ) : null}
        </section>
      </div>
      <ToTop />
    </DashboardShell>
  );
}
