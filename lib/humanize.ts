/**
 * Turns the mixed English/shorthand values stored in `universities` into plain Russian for the
 * university page. Every function returns null when the value is junk (a date, a link, text
 * that belongs to another field) so the page hides it instead of confusing the reader.
 */

const CYR = /[а-яё]/i;
const JUNK = /^(\d{4}-\d{2}-\d{2}|https?:\/\/\S+)$/i;

const clean = (raw: string | null | undefined) => (raw ?? "").replace(/\s+/g, " ").trim();
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const band = (n: number) => (Number.isInteger(n) ? `${n}.0` : String(n));

function plural(n: number, one: string, few: string, many: string) {
  const a = n % 100;
  const b = n % 10;
  return a > 10 && a < 20 ? many : b === 1 ? one : b >= 2 && b <= 4 ? few : many;
}

export function ieltsLevel(x: number): string {
  if (x >= 8.5) return "C2";
  if (x >= 7) return "C1";
  if (x >= 6) return "B2";
  if (x >= 5.5) return "B1–B2";
  return "B1";
}

export function toeflLevel(x: number): string {
  if (x >= 114) return "C2";
  if (x >= 95) return "C1";
  if (x >= 72) return "B2";
  return "B1";
}

/** English requirement: "6.5g" → "IELTS от 6.5 (≈ B2) или аналог: TOEFL, Duolingo". */
export function langRu(raw: string | null | undefined): string | null {
  const s = clean(raw);
  if (!s || JUNK.test(s)) return null;
  const l = s.toLowerCase();

  // Bands 4–9 that are not part of a longer number or a "17x4"-style sub-score.
  const bands = [...s.matchAll(/(?<![\w.])(\d(?:\.\d)?)(?![\d.\/])/g)]
    .map((m) => Number(m[1]))
    .filter((n) => n >= 4 && n <= 9);
  const overallMatch = l.match(/overall[^\d]{0,30}(\d(?:\.\d)?)(?![\d.])/);
  const ielts = overallMatch ? Number(overallMatch[1]) : bands[0];
  const perSection =
    ielts != null && /each|band|sub-?score|component|section|sec\.|all /.test(l)
      ? bands.filter((b) => b < ielts).sort((a, b) => a - b)[0]
      : undefined;

  const toeflMatch =
    s.match(/(?:TOEFL|iBT)[^\d;]{0,14}(\d{2,3})(?![\d.])/i) ||
    s.match(/(\d{2,3})\s*\/\s*120/) ||
    s.match(/(\d{2,3})\s*\(iBT\)/i);
  const toefl = toeflMatch ? Number(toeflMatch[1]) : undefined;
  const toeflOk = toefl != null && toefl >= 30 && toefl <= 120;
  // US Common Data Set rows put the TOEFL average/recommendation into an "IELTS NN" column.
  const avg = s.match(/IELTS\s+(\d{2,3})\s*(?:avg|rec)/i)?.[1];

  const parts: string[] = [];
  if (ielts != null) {
    parts.push(
      `IELTS от ${band(ielts)} (≈ ${ieltsLevel(ielts)})${perSection != null ? `, не ниже ${band(perSection)} по каждой части` : ""}`,
    );
  }
  if (toeflOk) parts.push(`TOEFL iBT от ${toefl} (≈ ${toeflLevel(toefl!)})`);

  if (parts.length) {
    let out = parts.join(" или ");
    if (avg) out += `, в среднем у поступивших ${avg}`;
    else if (ielts != null && !toeflOk) out += " или аналог: TOEFL, Duolingo";
    else if (toeflOk && ielts == null) out += " или IELTS";
    return out;
  }
  if (avg) return `Нужен TOEFL или IELTS, в среднем у поступивших TOEFL ${avg}`;
  if (/optional|not req|no need|не нужен/.test(l)) return /optional/.test(l) ? "Сертификат по желанию" : "Сертификат не нужен";
  if (/^required/.test(l)) return "Нужен сертификат IELTS или TOEFL";
  if (/any score/.test(l)) return "Подойдёт любой балл";
  return CYR.test(s) ? s : null;
}

/** SAT/ACT: statuses and scores in plain Russian. */
export function satRu(raw: string | null | undefined): string | null {
  const s = clean(raw);
  if (!s || JUNK.test(s)) return null;
  const l = s.toLowerCase();
  if (/personal statement|motivation|essay|эссе/.test(l)) return null;
  if (/admission test/.test(l)) return "Не нужен — у вуза свой вступительный экзамен";
  if (/^not indicated|^na$/.test(l)) return null;
  if (/emsat/.test(l)) return "Принимают EmSAT (экзамен ОАЭ) — минимальный балл смотрите на сайте вуза";
  if (/any score/.test(l)) return "Подойдёт любой балл; чем выше балл, тем больше стипендия";

  const math = l.match(/math[^\d]{0,14}(\d{3})/)?.[1] ?? l.match(/(\d{3})[^\d]{0,6}(?:in )?math/)?.[1];
  const totals = [...s.matchAll(/(?<!\d)(\d{3,4})(?!\d|\s*\/\s*800)/g)].map((m) => Number(m[1]));
  const range = s.match(/(\d{3,4})\s*[-–]\s*(\d{3,4})/);
  const mathTail = math && totals.some((n) => n >= 800) ? `, математика от ${math}` : "";

  if (range && Number(range[1]) >= 800 && Number(range[2]) > Number(range[1]))
    return `Обычно ${range[1]}–${range[2]} из 1600`;
  const total = totals.find((n) => n >= 800 && n <= 1600);
  if (total != null) {
    if (/avg|average|средн/.test(l)) return `В среднем у поступивших ${total} из 1600${mathTail}`;
    if (/min/.test(l) && !/math min|min \d+ in/.test(l)) return `Минимум ${total} из 1600${mathTail}`;
    return `Ориентир — около ${total} из 1600${mathTail}`;
  }
  if (math) return `Математика от ${math} из 800`;

  const intl = /int'?l|intl/.test(l);
  if (/not acceptable/.test(l)) return "Не принимают";
  if (/not used|no need|не требуется|not req|not needed/.test(l)) return intl ? "Не нужен иностранцам" : "Не нужен";
  if (/highly rec/.test(l)) return "Настоятельно рекомендуется";
  if (/scholarship|schol/.test(l)) return "Нужен для стипендии";
  if (/non-?eng/.test(l)) return "Обязателен для иностранцев из неанглоязычных стран";
  if (/req.*(some|engin|hon)/.test(l)) return "Нужен только на некоторые программы";
  if (/^req/.test(l)) return intl ? "Обязателен для иностранцев" : "Обязательно";
  if (/^cons/.test(l)) return intl ? "Иностранцам — по желанию, учитывают, если прислать" : "По желанию — учитывают, если прислать";
  if (/^rec/.test(l)) return intl ? "Рекомендуется иностранцам" : "Рекомендуется";
  if (/flexible|optional|waive|по желанию/.test(l)) return "По желанию";
  if (/обязательно|needed|нужно/.test(l)) return "Обязательно";
  return CYR.test(s) ? cap(s) : null;
}

/** Essays and letters. */
export function essayRu(raw: string | null | undefined): string | null {
  const s = clean(raw);
  if (!s || JUNK.test(s)) return null;
  const l = s.toLowerCase();
  if (/could add it|cannot be sure|processing time|right to write/.test(l)) return "Уточните на сайте вуза";
  if (/depends/.test(l)) return "Зависит от факультета — уточните на сайте вуза";

  if (CYR.test(s)) {
    return cap(
      s
        .replace(/\b(\d+)\s*(?:sup(?:p)?(?: essays?)?)\b/gi, "$1 доп. эссе")
        .replace(/\b(\d+)\s*(?:ps|personal st)\b/gi, "$1 личное эссе")
        .replace(/\bPS\b/g, "личное эссе")
        .replace(/profile essay/gi, "эссе о себе"),
    );
  }

  if (/not req\.? req/.test(l)) return "Нужно только на некоторые программы";
  if (/not req\.? rec/.test(l)) return "Не обязательно, но рекомендуется";
  if (/not req\.? (cons|flexible)/.test(l)) return "По желанию";
  if (/^(not req|not used|not needed|is not required|no)/.test(l)) return "Не нужно";
  if (/^rec/.test(l)) return "Рекомендуется";
  if (/req\.? for schol/.test(l)) return "Нужно для стипендии";
  if (/^req\.? highly/.test(l)) return "Обязательно";
  if (/act req/.test(l)) return null;

  const pieces: string[] = [];
  const ps = /\bps\b|personal st|personal essay|rersonal essay|application essay/.test(l);
  const supp = l.match(/(\d+)\s*(?:supp|sup essays|supplemental|penn-specific)/) ?? (/(one|a) supplemental/.test(l) ? ["", "1"] : null);
  const opt = l.match(/(\d+|two) (?:opt|optional)/);
  if (ps) pieces.push("Личное эссе");
  if (supp) {
    const n = Number(supp[1]);
    pieces.push(`${n} ${plural(n, "дополнительное эссе", "дополнительных эссе", "дополнительных эссе")}`);
  }
  if (opt) pieces.push(`${opt[1] === "two" ? 2 : opt[1]} по желанию`);
  if (/motivat|\bml\b/.test(l)) pieces.push("Мотивационное письмо");
  if (/\bsop\b|statement of purpose/.test(l)) pieces.push("Письмо о целях обучения (Statement of Purpose)");
  if (/self-introduction/.test(l)) pieces.push("Рассказ о себе");
  if (/study plan/.test(l)) pieces.push(pieces.length ? "учебный план" : "Учебный план");

  if (pieces.length) {
    if (pieces.length === 1 && pieces[0] === "Личное эссе" && !/\d/.test(l)) {
      return /required/.test(l) ? "Личное эссе (Personal Statement), обязательно" : "Личное эссе (Personal Statement)";
    }
    if (pieces.length === 1 && pieces[0] === "Мотивационное письмо" && /required/.test(l)) {
      return "Мотивационное письмо (обязательно)";
    }
    const words = l.match(/(\d+)\s*words?\s*max/);
    const joined = pieces[0] === "Рассказ о себе" ? pieces.join(" и ") : pieces.join(" + ");
    return words ? `${joined}, до ${words[1]} слов` : joined;
  }
  const atLeast = l.match(/at least (\d+)/);
  if (atLeast) return `Не меньше ${atLeast[1]} эссе`;
  if (/^\d+$/.test(l)) return `${l} эссе`;
  return "Уточните на сайте вуза";
}

/** "private liberal arts women's college" → "Частный колледж свободных искусств, женский". */
export function instTypeRu(raw: string | null | undefined): string | null {
  const l = clean(raw).toLowerCase();
  if (!l) return null;
  const control = /public|statutory/.test(l) && !/private/.test(l) ? "Государственный" : /private/.test(l) ? "Частный" : "";
  const kind = /liberal arts|\blac\b|liberal-arts/.test(l)
    ? "колледж свободных искусств"
    : /research/.test(l)
      ? "исследовательский университет"
      : /college/.test(l) && !/universit/.test(l)
        ? "колледж"
        : "университет";
  const extras = [
    /ivy/.test(l) ? "Лига плюща" : null,
    /women/.test(l) ? "женский" : /\bmen'?s\b/.test(l) ? "мужской" : null,
    /historically black/.test(l) ? "исторически афроамериканский" : null,
  ].filter(Boolean);
  const head = control ? `${control} ${kind}` : cap(kind);
  return extras.length ? `${head}, ${extras.join(", ")}` : head;
}

const MONEY_RE = /^([$€£])\s?([\d,.]+)$/;

/** Short text for the stat card plus the scholarship names for the money section. */
export function aidSummary(raw: string | null | undefined): { short: string; names: string[] } | null {
  const s = clean(raw);
  if (!s || /^no data$/i.test(s)) return null;
  const l = s.toLowerCase();
  const plain = (short: string) => ({ short, names: [] as string[] });

  if (/^full ride/.test(l)) return plain("Полный грант (учёба и жильё)");
  if (/full tuition for every/.test(l) || /tuition free/.test(l)) return plain("Учёба бесплатна для всех");
  if (/full.*partial/.test(l)) return plain("Полный или частичный грант");
  if (/^full( funding)?$/.test(l)) return plain("Полный грант");
  if (/^(no|нет|\$0(\.00)?)$/.test(l)) return plain("Нет");
  if (/^yes$/.test(l)) return plain("Есть");
  if (/partial/.test(l)) return plain("Частичная помощь");
  if (/governmental/.test(l)) return plain("Через госстипендии");
  if (/master|for bachelors/.test(l)) return plain("Только для магистратуры");
  if (/finnish language/.test(l)) return plain("За знание финского языка");
  const m = s.match(MONEY_RE);
  if (m) return plain(`до ${m[1]}${new Intl.NumberFormat("ru-RU").format(Number(m[2].replace(/,/g, ""))).replace(/\s/g, " ")} в год`);
  const share = l.match(/^0\.(\d+)$/);
  if (share) return plain(`до ${Math.round(Number(`0.${share[1]}`) * 100)}% стоимости`);

  const names = s
    .split(/[,;]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 2);
  if (names.length >= 2) return { short: `${names.length} ${plural(names.length, "стипендия", "стипендии", "стипендий")}`, names };
  if (/nawa/.test(l)) return plain("Стипендия NAWA (Польша)");
  if (/dsu/.test(l)) return { short: "Региональная стипендия DSU", names: CYR.test(s) ? [s] : [] };
  if (CYR.test(s) || s.length <= 32) return plain(s);
  return { short: "1 стипендия", names: [s] };
}

/** "$17,380 / год" → "$17 380 / год". */
export function money(raw: string | null | undefined): string | null {
  const s = clean(raw);
  if (!s) return null;
  return s.replace(/\d{1,3}(?:,\d{3})+/g, (x) => x.replace(/,/g, " "));
}

const AID_TYPE_RU: Record<string, string> = {
  merit: "За успехи (merit)",
  "merit-based": "За успехи (merit)",
  "need-based": "По доходу семьи (need-based)",
  "need+a": "По доходу семьи (need-based)",
  scholarship: "Стипендии вуза",
  both: "За успехи и по доходу семьи",
  mixed: "За успехи и по доходу семьи",
  "full funding": "Полное финансирование",
  jobs: "Работа на кампусе",
};

export function aidTypeRu(t: string): string {
  return AID_TYPE_RU[t.trim().toLowerCase()] ?? t;
}

/** need-aware / need-blind explained. */
export function aidPolicyRu(raw: string | null | undefined): string | null {
  const l = clean(raw).toLowerCase();
  if (!l) return null;
  const from = l.match(/from '(\d{2})/)?.[1];
  if (/need-blind/.test(l))
    return `Need-blind — доход семьи не влияет на решение о приёме${from ? ` (с 20${from} года)` : ""}.`;
  if (/need-aware/.test(l))
    return "Need-aware — если просите финансовую помощь, это может снизить шансы на приём: мест с грантом для иностранцев мало.";
  if (/tuition free/.test(l)) return "Учёба бесплатна для всех студентов.";
  return CYR.test(l) ? cap(clean(raw)) : null;
}

const MAJOR_RU: Record<string, string> = {
  engineering: "Инженерия",
  medicine: "Медицина",
  science: "Естественные науки",
  sciences: "Естественные науки",
  "natural sciences": "Естественные науки",
  "life sciences": "Науки о жизни",
  "physical sciences": "Физические науки",
  "social sciences": "Социальные науки",
  "social sciences and management": "Социальные науки и менеджмент",
  "engineering and technology": "Инженерия и технологии",
  technology: "Технологии",
  "arts & humanities": "Искусство и гуманитарные науки",
  "economics and business": "Экономика и бизнес",
  "business and economics": "Бизнес и экономика",
  "busincess and economics": "Бизнес и экономика",
  business: "Бизнес",
  economics: "Экономика",
  "computer science": "Информатика",
  law: "Право",
  "hospitality business": "Гостиничный бизнес",
  architecture: "Архитектура",
  design: "Дизайн",
  mathematics: "Математика",
};

/** Majors list: translated where we know the term, junk ("12 areas of interest") dropped. */
export function majorsRu(items: string[]): string[] {
  return items
    .filter((m) => !/areas of interest|academic structure|^\d+$/i.test(m))
    .map((m) => MAJOR_RU[m.trim().toLowerCase()] ?? m);
}

/** Notes: translate the known English patterns, keep Russian as is, drop the rest. */
export function noteRu(raw: string | null | undefined): string | null {
  const s = clean(raw);
  if (!s) return null;
  const l = s.toLowerCase();
  if (/^german (language|b2)/.test(l)) return "Обучение на немецком языке — нужен уровень не ниже B2.";
  if (/discounts for masters/.test(l)) return "Скидки на обучение — только для магистратуры.";
  if (/^tier \d/.test(l)) {
    const full = /full need met/.test(l);
    return full
      ? "Покрывает всю финансовую потребность принятых иностранцев, но доход семьи влияет на приём. Анкета: CSS Profile."
      : "Помощь иностранцам ограничена: частичные гранты по доходу семьи и за успехи. Анкета: CSS Profile.";
  }
  if (CYR.test(s)) return s;
  return null;
}

export function livingRu(raw: string | null | undefined): string | null {
  const s = clean(raw);
  if (!s) return null;
  if (/^accommodation:/i.test(s)) return null;
  return CYR.test(s) ? s : null;
}
