"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang, useTr } from "@/components/i18n/LangProvider";
import { filterCatalog, PRESETS, presetLabel, type CatalogUni, type PresetId } from "@/lib/catalog";
import { locale, localizePath } from "@/lib/i18n";
import { countryName, instLabel } from "@/lib/types";
import type { computeMeta } from "@/lib/universities";
import { UniversityCard } from "@/components/UniversityCard";
import { useApplicant } from "@/lib/use-applicant";
import { ToTop } from "@/components/ToTop";
import { DashboardShell } from "./DashboardShell";
import styles from "./Dashboard.module.css";

type Meta = ReturnType<typeof computeMeta>;

const FIRST_BATCH = 24;
const BATCH = 36;

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
  const lang = useLang();
  const tr = useTr();
  const router = useRouter();

  const sortLabels: Record<string, string> = useMemo(
    () => ({
      grant: tr("Сначала полные гранты", "Avval to'liq grantlar"),
      intl_aid: tr("Бюджет помощи иностранцам ↓", "Xorijliklarga yordam byudjeti ↓"),
      intl_avg: tr("Средний грант иностранцам ↓", "Xorijliklarga o'rtacha grant ↓"),
      rate: tr("По % поступления", "Qabul % bo'yicha"),
      tuition: tr("По стоимости", "Narxi bo'yicha"),
      aid: tr("По макс. помощи", "Maks. yordam bo'yicha"),
    }),
    [tr],
  );
  const boot = useMemo(() => new URLSearchParams(initialQuery), [initialQuery]);

  const [q, setQ] = useState(() => readParam(boot, "q"));
  const [country, setCountry] = useState(() => readParam(boot, "country"));
  const [grantOnly, setGrantOnly] = useState(() => boot.get("grantOnly") === "1" || boot.get("grant") === "1");
  const [needBlind, setNeedBlind] = useState(() => boot.get("needBlind") === "1");
  const [hasIntlAid, setHasIntlAid] = useState(() => boot.get("intlAid") === "1");
  const [urgentDeadline, setUrgentDeadline] = useState(() => boot.get("urgent") === "1");
  const [favOnly, setFavOnly] = useState(() => boot.get("fav") === "1");
  const [presets, setPresets] = useState<PresetId[]>(() =>
    (boot.get("p")?.split(",") || []).filter((x): x is PresetId => PRESETS.some((pr) => pr.id === x)),
  );
  const togglePreset = (id: PresetId) =>
    setPresets((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const [tuitionMax, setTuitionMax] = useState(() => {
    const raw = boot.get("tuitionMax") ?? boot.get("tuition");
    const parsed = raw != null ? Number(raw) : NaN;
    return Number.isFinite(parsed) ? parsed : meta.tuitionMax;
  });
  const [aidMin, setAidMin] = useState(() => (boot.has("aidMin") ? Number(boot.get("aidMin")) : 0));
  const [rateMax, setRateMax] = useState(() => (boot.has("rateMax") ? Number(boot.get("rateMax")) : 100));
  const [sort, setSort] = useState(() => readParam(boot, "sort", "name"));
  const [inst, setInst] = useState(() => boot.get("inst")?.split(",").filter(Boolean) || []);
  const [aidTypes, setAidTypes] = useState(() => boot.get("aidTypes")?.split(",").filter(Boolean) || []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  // "My plan" list shared with the cabinet: same storage, slug validation and 30-item cap.
  const { list: favList, toggle: toggleFavorite } = useApplicant();
  const favSet = useMemo(() => new Set(favList), [favList]);
  const activeFavSet = favOnly ? favSet : null;

  const catalogQuery = useMemo(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (country) sp.set("country", country);
    if (grantOnly) sp.set("grantOnly", "1");
    if (needBlind) sp.set("needBlind", "1");
    if (hasIntlAid) sp.set("intlAid", "1");
    if (urgentDeadline) sp.set("urgent", "1");
    if (favOnly) sp.set("fav", "1");
    if (presets.length) sp.set("p", presets.join(","));
    if (tuitionMax < meta.tuitionMax) sp.set("tuitionMax", String(tuitionMax));
    if (aidMin > 0) sp.set("aidMin", String(aidMin));
    if (rateMax < 100) sp.set("rateMax", String(rateMax));
    if (inst.length) sp.set("inst", inst.join(","));
    if (aidTypes.length) sp.set("aidTypes", aidTypes.join(","));
    if (sort !== "name") sp.set("sort", sort);
    const raw = sp.toString();
    return raw ? `?${raw}` : "";
  }, [presets, 
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
    const target = catalogQuery ? `/dashboard${catalogQuery}` : "/dashboard";
    const next = localizePath(lang, target);
    if (typeof window !== "undefined") {
      const current = `${window.location.pathname}${window.location.search}`;
      if (current === next) return;
    }
    window.history.replaceState(window.history.state, "", next);
  }, [catalogQuery, lang]);

  const deferredQ = useDeferredValue(q);
  const unis = useMemo(
    () =>
      filterCatalog(initial, {
        presets,
        q: deferredQ,
        country,
        grantOnly,
        needBlind,
        hasIntlAid,
        urgentDeadline,
        favSlugs: activeFavSet ?? undefined,
        tuitionMax: tuitionMax < meta.tuitionMax ? tuitionMax : undefined,
        aidMin,
        rateMax,
        inst,
        aidTypes,
        sort,
      }),
    [
      presets,
      initial,
      deferredQ,
      country,
      grantOnly,
      needBlind,
      hasIntlAid,
      urgentDeadline,
      activeFavSet,
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
  const intlFundCount = useMemo(
    () => unis.filter((u) => u.total_aid_num != null || u.avg_aid_num != null).length,
    [unis],
  );

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
    return [...map.entries()].sort((a, b) => countryName(a[0], lang).localeCompare(countryName(b[0], lang), locale(lang)));
  }, [unis, lang]);

  function toggleChip(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  async function logout() {
    await fetch("/api/auth/telegram", { method: "DELETE" });
    router.replace(localizePath(lang, "/"));
    router.refresh();
  }

  function resetFilters() {
    setPresets([]);
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
  if (q.trim()) activeTokens.push({ key: "q", label: `${tr("Поиск:", "Qidiruv:")} ${q.trim()}`, clear: () => setQ("") });
  if (country) {
    activeTokens.push({
      key: "country",
      label: countryName(country, lang),
      clear: () => setCountry(""),
    });
  }
  if (grantOnly) activeTokens.push({ key: "grant", label: tr("Полный грант", "To'liq grant"), clear: () => setGrantOnly(false) });
  if (needBlind) activeTokens.push({ key: "nb", label: "Need-blind", clear: () => setNeedBlind(false) });
  if (hasIntlAid) {
    activeTokens.push({
      key: "intlAid",
      label: tr("С фондом для иностр.", "Xorijliklar fondi bilan"),
      clear: () => setHasIntlAid(false),
    });
  }
  if (urgentDeadline) {
    activeTokens.push({
      key: "urgent",
      label: tr("Дедлайн ≤ 60 дн.", "Dedlayn ≤ 60 kun"),
      clear: () => setUrgentDeadline(false),
    });
  }
  if (favOnly) activeTokens.push({ key: "fav", label: tr("★ Избранное", "★ Tanlanganlar"), clear: () => setFavOnly(false) });
  if (tuitionMax < meta.tuitionMax) {
    activeTokens.push({
      key: "tuition",
      label: `${tr("Стоимость", "Narx")} ≤ $${money(tuitionMax)}`,
      clear: () => setTuitionMax(meta.tuitionMax),
    });
  }
  if (aidMin > 0) {
    activeTokens.push({
      key: "aid",
      label: `${tr("Помощь", "Yordam")} ≥ $${money(aidMin)}`,
      clear: () => setAidMin(0),
    });
  }
  if (rateMax < 100) {
    activeTokens.push({
      key: "rate",
      label: `${tr("Поступление", "Qabul")} ≤ ${rateMax}%`,
      clear: () => setRateMax(100),
    });
  }
  for (const key of inst) {
    activeTokens.push({
      key: `inst-${key}`,
      label: instLabel(key, lang),
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
      label: `${tr("Сорт:", "Saralash:")} ${sortLabels[sort] || sort}`,
      clear: () => setSort("name"),
    });
  }

  const noPresetsActive =
    !presets.length && !grantOnly && !needBlind && !hasIntlAid && !urgentDeadline && !favOnly && !country;

  const cardsClass = view === "grid" ? styles.cardsGrid : styles.cardsList;

  const filters = (
    <aside className={styles.filtersPanel} aria-label={tr("Фильтры", "Filtrlar")}>
      <div className={styles.filtersHead}>
        <div>
          <h2 className={styles.filtersTitle}>{tr("Подбор вузов", "OTM tanlash")}</h2>
          <p className={styles.hint}>{tr("Фильтры суммируются (И)", "Filtrlar birgalikda ishlaydi (VA)")}</p>
        </div>
        <button type="button" className={styles.filtersDone} onClick={() => setFiltersOpen(false)}>
          {tr("Готово", "Tayyor")}
        </button>
      </div>

      <div className={styles.searchWrap}>
        <span aria-hidden>⌕</span>
        <input
          type="search"
          placeholder={tr("Вуз, город, грант, направление…", "OTM, shahar, grant, yo'nalish…")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={tr("Поиск университетов", "Universitetlarni qidirish")}
        />
      </div>

      <div className={styles.selectWrap}>
        <label className={styles.fieldLabel} htmlFor="country-select">
          {tr("Страна", "Davlat")}
        </label>
        <select id="country-select" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">{tr(`Все страны (${meta.countries.length})`, `Barcha davlatlar (${meta.countries.length})`)}</option>
          {meta.countries.map(([c, n]) => (
            <option key={c} value={c}>
              {countryName(c, lang)} ({n})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selectWrap}>
        <label className={styles.fieldLabel} htmlFor="sort-select">
          {tr("Сортировка", "Saralash")}
        </label>
        <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">{tr("По алфавиту и странам", "Alifbo va davlatlar bo'yicha")}</option>
          <option value="intl_aid">{tr("По бюджету помощи иностранцам ↓", "Xorijliklarga yordam byudjeti ↓")}</option>
          <option value="intl_avg">{tr("По среднему гранту иностранцам ↓", "Xorijliklarga o'rtacha grant ↓")}</option>
          <option value="grant">{tr("Сначала полные гранты", "Avval to'liq grantlar")}</option>
          <option value="rate">{tr("По % поступления ↑", "Qabul % bo'yicha ↑")}</option>
          <option value="tuition">{tr("По стоимости ↑", "Narxi bo'yicha ↑")}</option>
          <option value="aid">{tr("По макс. помощи ↓", "Maks. yordam bo'yicha ↓")}</option>
        </select>
      </div>

      <div className={styles.fBlock}>
        <h4>{tr("Что для вас важно", "Siz uchun nima muhim")}</h4>
        <div className={styles.presetChips}>
          {PRESETS.map((pr) => (
            <button
              key={pr.id}
              type="button"
              aria-pressed={presets.includes(pr.id)}
              onClick={() => togglePreset(pr.id)}
            >
              {presetLabel(pr, lang)}
            </button>
          ))}
        </div>
        <label className={styles.check}>
          <input type="checkbox" checked={favOnly} onChange={(e) => setFavOnly(e.target.checked)} />
          <span>{tr("Только мой план", "Faqat mening rejam")}</span>
          <em className={styles.n}>{favSet.size}</em>
        </label>
      </div>

      <details className={styles.advanced}>
        <summary>{tr("Точные фильтры", "Aniq filtrlar")}</summary>
      <div className={styles.fBlock}>
          <h4>{tr("Бюджет и шансы", "Byudjet va imkoniyatlar")}</h4>
          <div className={styles.rangeRow}>
            <label htmlFor="f-tuition">
              {tr("Стоимость до", "Narxi gacha")} <span>${money(tuitionMax)}</span>
            </label>
            <input
              id="f-tuition"
              type="range"
              min={0}
              max={meta.tuitionMax}
              step={500}
              value={tuitionMax}
              onChange={(e) => setTuitionMax(Number(e.target.value))}
            />
          </div>
          <div className={styles.rangeRow}>
            <label htmlFor="f-aid">
              {tr("Помощь от", "Yordam dan")} <span>${money(aidMin)}</span>
            </label>
            <input
              id="f-aid"
              type="range"
              min={0}
              max={meta.aidMax}
              step={500}
              value={aidMin}
              onChange={(e) => setAidMin(Number(e.target.value))}
            />
          </div>
          <div className={styles.rangeRow}>
            <label htmlFor="f-rate">
              {tr("Поступление до", "Qabul foizi gacha")} <span>{rateMax}%</span>
            </label>
            <input
              id="f-rate"
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
          <h4>{tr("Тип вуза", "OTM turi")}</h4>
          <div className={styles.chips}>
            {meta.inst.map(([key, n]) => (
              <label className={styles.chip} key={key}>
                <input
                  type="checkbox"
                  checked={inst.includes(key)}
                  onChange={() => toggleChip(inst, key, setInst)}
                />
                {instLabel(key, lang)}
                <span className={styles.n}>{n}</span>
              </label>
            ))}
          </div>
        </div>
  
        <div className={styles.fBlock}>
          <h4>{tr("Тип помощи", "Yordam turi")}</h4>
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
      </details>

      <button type="button" className={styles.resetBtn} onClick={resetFilters}>
        {tr("Сбросить все фильтры", "Barcha filtrlarni tozalash")}
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
          aria-label={tr("Закрыть фильтры", "Filtrlarni yopish")}
          onClick={() => setFiltersOpen(false)}
        />
        {filters}
        <section className={styles.results}>
          <div className={styles.kpiStrip}>
            <div className={styles.kpiTile}>
              <small>{tr("В выдаче", "Natijada")}</small>
              <strong aria-live="polite">
                {loading ? "…" : unis.length} <span>/ {meta.total}</span>
              </strong>
            </div>
            <div className={styles.kpiTile}>
              <small>{tr("Полные гранты", "To'liq grantlar")}</small>
              <strong>{filteredGrants}</strong>
            </div>
            <div className={styles.kpiTile}>
              <small>{tr("С фондом иностр.", "Xorijliklar fondi bilan")}</small>
              <strong>{intlFundCount}</strong>
            </div>
            <div className={styles.kpiTile}>
              <small>{tr("Ваш шорт-лист", "Sizning ro'yxatingiz")}</small>
              <strong>★ {favSet.size}</strong>
            </div>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.presets} role="group" aria-label={tr("Быстрые подборки", "Tez tanlovlar")}>
              <button
                type="button"
                className={`${styles.presetBtn}${noPresetsActive ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={resetFilters}
              >
                {tr("Все вузы", "Barcha OTMlar")}
              </button>
              {PRESETS.map((pr) => (
                <button
                  key={pr.id}
                  type="button"
                  className={`${styles.presetBtn}${presets.includes(pr.id) ? ` ${styles.presetBtnActive}` : ""}`}
                  onClick={() => togglePreset(pr.id)}
                >
                  {presetLabel(pr, lang)}
                </button>
              ))}
              <button
                type="button"
                className={`${styles.presetBtn}${favOnly ? ` ${styles.presetBtnActive}` : ""}`}
                onClick={() => setFavOnly((v) => !v)}
              >
                {tr("Мой план", "Mening rejam")} ({favSet.size})
              </button>
            </div>

            <div className={styles.viewToggle} role="group" aria-label={tr("Вид списка", "Ro'yxat ko'rinishi")}>
              <button
                type="button"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
              >
                {tr("Сетка", "Katak")}
              </button>
              <button
                type="button"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                {tr("Список", "Ro'yxat")}
              </button>
            </div>
          </div>

          {activeTokens.length ? (
            <div className={styles.tokens} aria-label={tr("Активные фильтры", "Faol filtrlar")}>
              {activeTokens.map((token) => (
                <button key={token.key} type="button" className={styles.token} onClick={token.clear}>
                  {token.label} ×
                </button>
              ))}
              {activeTokens.length > 1 ? (
                <button type="button" className={styles.tokenClearAll} onClick={resetFilters}>
                  {tr("Сбросить всё", "Hammasini tozalash")}
                </button>
              ) : null}
            </div>
          ) : null}

          <nav className={styles.countryNav} aria-label={tr("Страны", "Davlatlar")}>
            <button type="button" aria-pressed={!country} onClick={() => setCountry("")}>
              {tr("Все", "Hammasi")} <span className={styles.n}>{meta.total}</span>
            </button>
            {meta.countries.map(([c, n]) => (
              <button type="button" key={c} aria-pressed={country === c} onClick={() => setCountry(c)}>
                {countryName(c, lang)} <span className={styles.n}>{n}</span>
              </button>
            ))}
          </nav>

          <div className={`${styles.empty}${unis.length === 0 ? ` ${styles.emptyShow}` : ""}`}>
            {favOnly && favSet.size === 0
              ? tr(
                  "В избранном пока пусто. Нажмите ★ на карточке любого вуза, чтобы собрать свой список.",
                  "Tanlanganlar hozircha bo'sh. O'z ro'yxatingizni yig'ish uchun istalgan OTM kartasidagi tugmani bosing.",
                )
              : tr(
                  "По текущим фильтрам ничего не найдено. Ослабьте один из фильтров.",
                  "Joriy filtrlar bo'yicha hech narsa topilmadi. Filtrlardan birini yumshating.",
                )}
          </div>

          {sort !== "name" ? (
            unis.length > 0 ? (
              <section className={styles.countrySection}>
                <div className={styles.sectionHeader}>
                  <h2>{sortLabels[sort] || tr("Результаты", "Natijalar")}</h2>
                  <span>{tr(`${unis.length} вузов`, `${unis.length} ta OTM`)}</span>
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
                      <h2>{countryName(c, lang)}</h2>
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
                {tr(`Показать ещё · осталось ${unis.length - visible}`, `Yana ko'rsatish · qoldi ${unis.length - visible}`)}
              </button>
            </div>
          ) : null}
        </section>
      </div>
      <ToTop />
    </DashboardShell>
  );
}
