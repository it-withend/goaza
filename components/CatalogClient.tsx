"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { University } from "@/lib/types";
import { INST_LABEL, countryRu } from "@/lib/types";
import { UniversityCard } from "./UniversityCard";
import { TelegramLogin } from "./TelegramLogin";
import { ToTop } from "./ToTop";

type Meta = {
  total: number;
  grants: number;
  countries: [string, number][];
  inst: [string, number][];
  aidTypes: [string, number][];
  tuitionMax: number;
  aidMax: number;
};

type Props = {
  initial: University[];
  meta: Meta;
  botUsername: string;
  initiallySubscribed: boolean;
  initialUsername: string | null;
};

function money(n: number) {
  return n.toLocaleString("en-US");
}

export function CatalogClient({
  initial,
  meta,
  botUsername,
  initiallySubscribed,
  initialUsername,
}: Props) {
  const [unis, setUnis] = useState(initial);
  const [subscribed, setSubscribed] = useState(initiallySubscribed);
  const [username, setUsername] = useState(initialUsername);
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

  const locked = !subscribed;

  const load = useCallback(async () => {
    if (locked && filtersActive) {
      setError("Подпишитесь на @studyaza и войдите через Telegram, чтобы искать и фильтровать");
      setUnis(initial);
      return;
    }
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
        if (res.status === 401) setSubscribed(false);
        return;
      }
      setUnis(json.data as University[]);
    } catch {
      setError("Сеть недоступна");
    } finally {
      setLoading(false);
    }
  }, [
    locked,
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
    if (locked) return;
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  async function logout() {
    await fetch("/api/auth/telegram", { method: "DELETE" });
    setSubscribed(false);
    setUsername(null);
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand-row">
            <div className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand-logo" src="/logo.png" width={40} height={40} alt="Goaza" />
              <h1>Studyaza</h1>
              <span className="year">2026</span>
            </div>
            <div className="auth-slot">
              <a className="tg" href="https://t.me/studyaza" target="_blank" rel="noopener">
                <span className="tg-long">Telegram: </span>t.me/studyaza
              </a>
              {subscribed ? (
                <>
                  <span className="auth-ok">✓ {username || "подписка OK"}</span>
                  <button type="button" className="btn" onClick={() => void logout()}>
                    Выйти
                  </button>
                </>
              ) : (
                <TelegramLogin
                  botUsername={botUsername}
                  onSubscribed={(u) => {
                    setSubscribed(true);
                    setUsername(u);
                    setError(null);
                  }}
                />
              )}
            </div>
          </div>

          <div className={`gate${locked ? " locked" : ""}`}>
            <div className="row1">
              <div className="search-wrap">
                <span className="ico" aria-hidden>
                  ⌕
                </span>
                <input
                  type="search"
                  placeholder="Поиск: университет, город, грант, специальность…"
                  value={q}
                  disabled={locked}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="select-wrap">
                <select
                  value={country}
                  disabled={locked}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Все страны</option>
                  {meta.countries.map(([c, n]) => (
                    <option key={c} value={c}>
                      {countryRu(c)} ({n})
                    </option>
                  ))}
                </select>
              </div>
              <label className="check">
                <input
                  type="checkbox"
                  checked={grantOnly}
                  disabled={locked}
                  onChange={(e) => setGrantOnly(e.target.checked)}
                />
                <span className="full">Полный </span>грант ({meta.grants})
              </label>
              <button
                type="button"
                className="btn btn-accent"
                disabled={locked}
                onClick={() => setFiltersOpen((v) => !v)}
              >
                Фильтры {filtersOpen ? "▴" : "▾"}
              </button>
            </div>
          </div>
          {locked ? (
            <div className="gate-banner show">
              Поиск и фильтры доступны после подписки на{" "}
              <a href="https://t.me/studyaza" target="_blank" rel="noopener">
                @studyaza
              </a>{" "}
              и входа через Telegram Login.
            </div>
          ) : null}
          {error ? <div className="gate-banner show">{error}</div> : null}

          <div className={`filters${filtersOpen && !locked ? " open" : ""}`}>
            <div className="filters-grid">
              <div className="f-block">
                <h4>Стоимость и помощь</h4>
                <p className="hint">Все активные фильтры работают вместе (И).</p>
                <div className="range-row">
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
                <div className="range-row">
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
                <div className="range-row">
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
                <label className="check" style={{ marginTop: 8 }}>
                  <input
                    type="checkbox"
                    checked={needBlind}
                    onChange={(e) => setNeedBlind(e.target.checked)}
                  />
                  Need-blind
                </label>
                <div className="select-wrap" style={{ marginTop: 10 }}>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="name">Сортировка: имя</option>
                    <option value="grant">Сначала полные гранты</option>
                    <option value="rate">По % поступления</option>
                    <option value="tuition">По стоимости</option>
                    <option value="aid">По помощи</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: 10 }}
                  onClick={() => {
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
                  }}
                >
                  Сбросить
                </button>
              </div>
              <div className="f-block">
                <h4>Тип вуза</h4>
                <p className="hint">Несколько типов = все сразу (И).</p>
                <div className="chips">
                  {meta.inst.map(([key, n]) => (
                    <label className="chip" key={key}>
                      <input
                        type="checkbox"
                        checked={inst.includes(key)}
                        onChange={() => toggleChip(inst, key, setInst)}
                      />
                      {INST_LABEL[key] || key}
                      <span className="n">{n}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="f-block">
                <h4>Тип помощи</h4>
                <p className="hint">Несколько типов помощи тоже через И.</p>
                <div className="chips">
                  {meta.aidTypes.slice(0, 12).map(([key, n]) => (
                    <label className="chip" key={key}>
                      <input
                        type="checkbox"
                        checked={aidTypes.includes(key)}
                        onChange={() => toggleChip(aidTypes, key, setAidTypes)}
                      />
                      {key}
                      <span className="n">{n}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="hero">
        <h2>Каталог университетов и грантов</h2>
        <p>
          Данные по enrollment, types of aid, total aid и стоимости — из базы. Поиск и фильтры
          открываются после подписки на @studyaza.
        </p>
      </section>
      <div className="stats">
        <span>
          Показано: <strong>{loading ? "…" : unis.length}</strong> / {meta.total}
        </span>
        <span>
          Полные гранты: <strong>{meta.grants}</strong>
        </span>
        <a href="https://gogrants.netlify.app/" target="_blank" rel="noopener">
          Стипендиальные программы
        </a>
      </div>

      <nav className="countries">
        <button
          type="button"
          className={!country ? "active" : ""}
          disabled={locked}
          onClick={() => setCountry("")}
        >
          Все <span className="n">{meta.total}</span>
        </button>
        {meta.countries.map(([c, n]) => (
          <button
            type="button"
            key={c}
            className={country === c ? "active" : ""}
            disabled={locked}
            onClick={() => setCountry(c)}
          >
            {countryRu(c)} <span className="n">{n}</span>
          </button>
        ))}
      </nav>

      <div className="panel">
        <div className={`empty${unis.length === 0 ? " show" : ""}`}>
          Ничего не найдено. Ослабьте фильтры.
        </div>
        {grouped.map(([c, list]) => (
          <section className="country-section" key={c} id={`sec-${c}`}>
            <h2>
              {countryRu(c)} ({list.length})
            </h2>
            {list.map((u) => (
              <UniversityCard key={u.id || u.slug} u={u} />
            ))}
          </section>
        ))}
      </div>
      <ToTop />
    </>
  );
}
