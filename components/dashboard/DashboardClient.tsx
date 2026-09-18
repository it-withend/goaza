"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { University } from "@/lib/types";
import { INST_LABEL, countryRu } from "@/lib/types";
import type { computeMeta } from "@/lib/universities";
import { UniversityCard } from "@/components/UniversityCard";
import { ToTop } from "@/components/ToTop";
import { DashboardShell } from "./DashboardShell";
import styles from "./Dashboard.module.css";

type Meta = ReturnType<typeof computeMeta>;

function money(n: number) {
  return n.toLocaleString("en-US");
}

export function DashboardClient({
  initial,
  meta,
  accountName,
}: {
  initial: University[];
  meta: Meta;
  accountName: string;
}) {
  const router = useRouter();
  const [unis, setUnis] = useState(initial);
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [grantOnly, setGrantOnly] = useState(false);
  const [needBlind, setNeedBlind] = useState(false);
  const [tuitionMax, setTuitionMax] = useState(meta.tuitionMax);
  const [aidMin, setAidMin] = useState(0);
  const [rateMax, setRateMax] = useState(100);
  const [sort, setSort] = useState("name");
  const [inst, setInst] = useState<string[]>([]);
  const [aidTypes, setAidTypes] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "map">("list");
  const [selected, setSelected] = useState<University | null>(null);

  const filtersActive = useMemo(() => {
    return Boolean(
      q.trim() ||
        country ||
        grantOnly ||
        needBlind ||
        tuitionMax < meta.tuitionMax ||
        aidMin > 0 ||
        rateMax < 100 ||
        inst.length ||
        aidTypes.length ||
        sort !== "name",
    );
  }, [q, country, grantOnly, needBlind, tuitionMax, aidMin, rateMax, inst, aidTypes, sort, meta.tuitionMax]);

  const load = useCallback(async () => {
    if (!filtersActive) {
      setUnis(initial);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (country) sp.set("country", country);
    if (grantOnly) sp.set("grantOnly", "1");
    if (needBlind) sp.set("needBlind", "1");
    if (tuitionMax < meta.tuitionMax) sp.set("tuitionMax", String(tuitionMax));
    if (aidMin > 0) sp.set("aidMin", String(aidMin));
    if (rateMax < 100) sp.set("rateMax", String(rateMax));
    if (inst.length) sp.set("inst", inst.join(","));
    if (aidTypes.length) sp.set("aidTypes", aidTypes.join(","));
    if (sort !== "name") sp.set("sort", sort);
    try {
      const res = await fetch(`/api/universities?${sp.toString()}`);
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || json.error || "Ошибка фильтра");
        if (res.status === 401) {
          router.replace("/");
          router.refresh();
        }
        return;
      }
      setUnis(json.data as University[]);
    } catch {
      setError("Сеть недоступна");
    } finally {
      setLoading(false);
    }
  }, [
    filtersActive,
    q,
    country,
    grantOnly,
    needBlind,
    tuitionMax,
    aidMin,
    rateMax,
    inst,
    aidTypes,
    sort,
    meta.tuitionMax,
    initial,
    router,
  ]);

  useEffect(() => {
    const t = setTimeout(() => {
      void load();
    }, 220);
    return () => clearTimeout(t);
  }, [load]);

  const grouped = useMemo(() => {
    const map = new Map<string, University[]>();
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
  if (tuitionMax < meta.tuitionMax) {
    activeTokens.push({
      key: "tuition",
      label: `Стоимость ≤ ${money(tuitionMax)}`,
      clear: () => setTuitionMax(meta.tuitionMax),
    });
  }
  if (aidMin > 0) {
    activeTokens.push({
      key: "aid",
      label: `Помощь ≥ ${money(aidMin)}`,
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
    activeTokens.push({ key: "sort", label: `Сорт: ${sort}`, clear: () => setSort("name") });
  }

  const filters = (
    <aside className={styles.filtersPanel} aria-label="Фильтры">
      <h2 className={styles.filtersTitle}>Инструменты</h2>
      <p className={styles.hint}>Все активные фильтры работают вместе (И).</p>

      <div className={styles.searchWrap}>
        <span aria-hidden>⌕</span>
        <input
          type="search"
          placeholder="Поиск: университет, город, грант…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Поиск университетов"
        />
      </div>

      <div className={styles.selectWrap}>
        <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Страна">
          <option value="">Все страны</option>
          {meta.countries.map(([c, n]) => (
            <option key={c} value={c}>
              {countryRu(c)} ({n})
            </option>
          ))}
        </select>
      </div>

      <label className={styles.check}>
        <input type="checkbox" checked={grantOnly} onChange={(e) => setGrantOnly(e.target.checked)} />
        Полный грант ({meta.grants})
      </label>
      <label className={styles.check}>
        <input type="checkbox" checked={needBlind} onChange={(e) => setNeedBlind(e.target.checked)} />
        Need-blind
      </label>

      <div className={styles.fBlock}>
        <h4>Стоимость и помощь</h4>
        <div className={styles.rangeRow}>
          <label>
            Стоимость до <span>{money(tuitionMax)}</span>
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
            Помощь от <span>{money(aidMin)}</span>
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
            Поступление до <span>{rateMax}</span>%
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
        <div className={styles.selectWrap}>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Сортировка">
            <option value="name">Сортировка: имя</option>
            <option value="grant">Сначала полные гранты</option>
            <option value="rate">По % поступления</option>
            <option value="tuition">По стоимости</option>
            <option value="aid">По помощи</option>
          </select>
        </div>
        <button type="button" className={styles.resetBtn} onClick={resetFilters}>
          Сбросить
        </button>
      </div>

      <div className={styles.fBlock}>
        <h4>Тип вуза</h4>
        <p className={styles.hint}>Несколько типов = все сразу (И).</p>
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
        <p className={styles.hint}>Несколько типов помощи тоже через И.</p>
        <div className={styles.chips}>
          {meta.aidTypes.slice(0, 12).map(([key, n]) => (
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
    </aside>
  );

  return (
    <DashboardShell
      accountName={accountName}
      onLogout={() => void logout()}
      view={view}
      onViewChange={setView}
      onOpenFilters={() => setFiltersOpen(true)}
    >
      <div
        className={`${styles.workspace}${selected ? ` ${styles.workspaceWithDetail}` : ""}${
          filtersOpen ? ` ${styles.filtersDrawerOpen}` : ""
        }`}
      >
        <button
          type="button"
          className={styles.filtersDrawerBackdrop}
          aria-label="Закрыть фильтры"
          onClick={() => setFiltersOpen(false)}
        />
        {filters}
        <section className={styles.results} aria-live="polite">
          <div className={styles.commandBar}>
            <div className={styles.statsLine}>
              Показано: <strong>{loading ? "…" : unis.length}</strong> / {meta.total}
              <span> · Полные гранты: <strong>{meta.grants}</strong></span>
            </div>
          </div>

          {error ? <div className={styles.errorBanner}>{error}</div> : null}

          {activeTokens.length ? (
            <div className={styles.tokens} aria-label="Активные фильтры">
              {activeTokens.map((token) => (
                <button key={token.key} type="button" className={styles.token} onClick={token.clear}>
                  {token.label} ×
                </button>
              ))}
            </div>
          ) : null}

          <nav className={styles.countryNav} aria-label="Страны">
            <button type="button" aria-pressed={!country} onClick={() => setCountry("")}>
              Все <span className={styles.n}>{meta.total}</span>
            </button>
            {meta.countries.map(([c, n]) => (
              <button
                type="button"
                key={c}
                aria-pressed={country === c}
                onClick={() => setCountry(c)}
              >
                {countryRu(c)} <span className={styles.n}>{n}</span>
              </button>
            ))}
          </nav>

          {view === "map" ? (
            <div className={styles.mapPlaceholder}>Карта появится в следующем релизе</div>
          ) : (
            <>
              <div className={`${styles.empty}${unis.length === 0 ? ` ${styles.emptyShow}` : ""}`}>
                Ничего не найдено. Ослабьте фильтры.
              </div>
              {grouped.map(([c, list], groupIndex) => (
                <section className={styles.countrySection} key={c} id={`sec-${c}`}>
                  <h2>
                    {countryRu(c)} ({list.length})
                  </h2>
                  {list.map((u, index) => (
                    <UniversityCard
                      key={u.id || u.slug}
                      u={u}
                      selected={selected?.slug === u.slug}
                      onSelect={() => setSelected(u)}
                      staggerIndex={groupIndex * 3 + index}
                    />
                  ))}
                </section>
              ))}
            </>
          )}
        </section>

        {selected ? (
          <aside className={styles.detail} aria-label="Карточка университета">
            <div className={styles.detailHeader}>
              <h3>{selected.name}</h3>
              <button
                type="button"
                className={styles.detailClose}
                aria-label="Закрыть"
                onClick={() => setSelected(null)}
              >
                ×
              </button>
            </div>
            <p className={styles.detailMeta}>
              {countryRu(selected.country)}
              {selected.city ? ` · ${selected.city}` : ""}
            </p>
            <div className={styles.detailGrid}>
              <div className={styles.detailFact}>
                <span>Стоимость</span>
                <strong>{selected.tuition_display || "—"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Поступление</span>
                <strong>{selected.acceptance_rate || "—"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Помощь</span>
                <strong>{selected.aid_max || "—"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Полный грант</span>
                <strong>{selected.full_grant ? "Да" : "Нет данных"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Ранний дедлайн</span>
                <strong>{selected.early_deadline || "—"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Основной дедлайн</span>
                <strong>{selected.regular_deadline || "—"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Типы помощи</span>
                <strong>{(selected.aid_types || []).join(", ") || "—"}</strong>
              </div>
              <div className={styles.detailFact}>
                <span>Язык</span>
                <strong>{selected.lang || "—"}</strong>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
      <ToTop />
    </DashboardShell>
  );
}
