/**
 * Turns the mixed English/shorthand values stored in `universities` into plain Russian or
 * Uzbek for the university page. Every function returns null when the value is junk (a date,
 * a link, text that belongs to another field) so the page hides it instead of confusing the reader.
 */

type Lang = "ru" | "uz";

const CYR = /[а-яё]/i;
const JUNK = /^(\d{4}-\d{2}-\d{2}|https?:\/\/\S+)$/i;

const clean = (raw: string | null | undefined) => (raw ?? "").replace(/\s+/g, " ").trim();
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const band = (n: number) => (Number.isInteger(n) ? `${n}.0` : String(n));
const pick = (lang: Lang) => (ru: string, uz: string) => (lang === "uz" ? uz : ru);

function plural(n: number, one: string, few: string, many: string) {
  const a = n % 100;
  const b = n % 10;
  return a > 10 && a < 20 ? many : b === 1 ? one : b >= 2 && b <= 4 ? few : many;
}

/** Russian free text from the DB: shown on the Russian site, hidden on the Uzbek one. */
const ruOnly = (s: string, lang: Lang) => (lang === "ru" ? s : null);

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
export function langRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const t = pick(lang);
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
    const min = perSection != null ? t(`, не ниже ${band(perSection)} по каждой части`, `, har bir qismdan kamida ${band(perSection)}`) : "";
    parts.push(`IELTS ${t("от", "kamida")} ${band(ielts)} (≈ ${ieltsLevel(ielts)})${min}`);
  }
  if (toeflOk) parts.push(`TOEFL iBT ${t("от", "kamida")} ${toefl} (≈ ${toeflLevel(toefl!)})`);

  if (parts.length) {
    let out = parts.join(t(" или ", " yoki "));
    if (avg) out += t(`, в среднем у поступивших ${avg}`, `, qabul qilinganlarda o'rtacha ${avg}`);
    else if (ielts != null && !toeflOk) out += t(" или аналог: TOEFL, Duolingo", " yoki muqobili: TOEFL, Duolingo");
    else if (toeflOk && ielts == null) out += t(" или IELTS", " yoki IELTS");
    return out;
  }
  if (avg) return t(`Нужен TOEFL или IELTS, в среднем у поступивших TOEFL ${avg}`, `TOEFL yoki IELTS kerak, qabul qilinganlarda o'rtacha TOEFL ${avg}`);
  if (/optional|not req|no need|не нужен/.test(l))
    return /optional/.test(l) ? t("Сертификат по желанию", "Sertifikat ixtiyoriy") : t("Сертификат не нужен", "Sertifikat kerak emas");
  if (/^required/.test(l)) return t("Нужен сертификат IELTS или TOEFL", "IELTS yoki TOEFL sertifikati kerak");
  if (/any score/.test(l)) return t("Подойдёт любой балл", "Har qanday ball mos keladi");
  return CYR.test(s) ? ruOnly(s, lang) : null;
}

/** SAT/ACT: statuses and scores in plain language. */
export function satRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const t = pick(lang);
  const s = clean(raw);
  if (!s || JUNK.test(s)) return null;
  const l = s.toLowerCase();
  if (/personal statement|motivation|essay|эссе/.test(l)) return null;
  if (/admission test/.test(l)) return t("Не нужен — у вуза свой вступительный экзамен", "Kerak emas — universitetning o'z kirish imtihoni bor");
  if (/^not indicated|^na$/.test(l)) return null;
  if (/emsat/.test(l))
    return t("Принимают EmSAT (экзамен ОАЭ) — минимальный балл смотрите на сайте вуза", "EmSAT (BAA imtihoni) qabul qilinadi — minimal ballni universitet saytidan qarang");
  if (/any score/.test(l))
    return t("Подойдёт любой балл; чем выше балл, тем больше стипендия", "Har qanday ball mos keladi; ball qancha yuqori bo'lsa, stipendiya shuncha katta");

  const math = l.match(/math[^\d]{0,14}(\d{3})/)?.[1] ?? l.match(/(\d{3})[^\d]{0,6}(?:in )?math/)?.[1];
  const totals = [...s.matchAll(/(?<!\d)(\d{3,4})(?!\d|\s*\/\s*800)/g)].map((m) => Number(m[1]));
  const range = s.match(/(\d{3,4})\s*[-–]\s*(\d{3,4})/);
  const mathTail = math && totals.some((n) => n >= 800) ? t(`, математика от ${math}`, `, matematika kamida ${math}`) : "";

  if (range && Number(range[1]) >= 800 && Number(range[2]) > Number(range[1]))
    return t(`Обычно ${range[1]}–${range[2]} из 1600`, `Odatda 1600 dan ${range[1]}–${range[2]}`);
  const total = totals.find((n) => n >= 800 && n <= 1600);
  if (total != null) {
    if (/avg|average|средн/.test(l))
      return t(`В среднем у поступивших ${total} из 1600${mathTail}`, `Qabul qilinganlarda o'rtacha 1600 dan ${total}${mathTail}`);
    if (/min/.test(l) && !/math min|min \d+ in/.test(l)) return t(`Минимум ${total} из 1600${mathTail}`, `Kamida 1600 dan ${total}${mathTail}`);
    return t(`Ориентир — около ${total} из 1600${mathTail}`, `Mo'ljal — 1600 dan taxminan ${total}${mathTail}`);
  }
  if (math) return t(`Математика от ${math} из 800`, `Matematika 800 dan kamida ${math}`);

  const intl = /int'?l|intl/.test(l);
  if (/not acceptable/.test(l)) return t("Не принимают", "Qabul qilinmaydi");
  if (/not used|no need|не требуется|not req|not needed/.test(l))
    return intl ? t("Не нужен иностранцам", "Chet elliklarga kerak emas") : t("Не нужен", "Kerak emas");
  if (/highly rec/.test(l)) return t("Настоятельно рекомендуется", "Qat'iy tavsiya etiladi");
  if (/scholarship|schol/.test(l)) return t("Нужен для стипендии", "Stipendiya uchun kerak");
  if (/non-?eng/.test(l))
    return t("Обязателен для иностранцев из неанглоязычных стран", "Ingliz tilida so'zlashmaydigan davlatlardan kelganlar uchun majburiy");
  if (/req.*(some|engin|hon)/.test(l)) return t("Нужен только на некоторые программы", "Faqat ayrim dasturlar uchun kerak");
  if (/^req/.test(l)) return intl ? t("Обязателен для иностранцев", "Chet elliklar uchun majburiy") : t("Обязательно", "Majburiy");
  if (/^cons/.test(l))
    return intl
      ? t("Иностранцам — по желанию, учитывают, если прислать", "Chet elliklar uchun ixtiyoriy — yuborsangiz, hisobga olinadi")
      : t("По желанию — учитывают, если прислать", "Ixtiyoriy — yuborsangiz, hisobga olinadi");
  if (/^rec/.test(l)) return intl ? t("Рекомендуется иностранцам", "Chet elliklarga tavsiya etiladi") : t("Рекомендуется", "Tavsiya etiladi");
  if (/flexible|optional|waive|по желанию/.test(l)) return t("По желанию", "Ixtiyoriy");
  if (/обязательно|needed|нужно/.test(l)) return t("Обязательно", "Majburiy");
  if (/рекомендуется/.test(l)) return t("Рекомендуется", "Tavsiya etiladi");
  if (/не требуется/.test(l)) return t("Не нужен", "Kerak emas");
  return CYR.test(s) ? ruOnly(cap(s), lang) : null;
}

/** Essays and letters. */
export function essayRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const t = pick(lang);
  const s = clean(raw);
  if (!s || JUNK.test(s)) return null;
  const l = s.toLowerCase();
  const site = t("Уточните на сайте вуза", "Universitet saytidan aniqlang");
  if (/could add it|cannot be sure|processing time|right to write/.test(l)) return site;
  if (/depends/.test(l)) return t("Зависит от факультета — уточните на сайте вуза", "Fakultetga bog'liq — universitet saytidan aniqlang");

  if (CYR.test(s)) {
    if (/^не требуется$/.test(l)) return t("Не нужно", "Kerak emas");
    if (/^по желанию$/.test(l)) return t("По желанию", "Ixtiyoriy");
    if (/^рекомендуется$/.test(l)) return t("Рекомендуется", "Tavsiya etiladi");
    if (/^обязательно$/.test(l)) return t("Обязательно", "Majburiy");
    if (/^мотивационное письмо$/.test(l)) return t("Мотивационное письмо", "Motivatsion xat");
    return ruOnly(
      cap(
        s
          .replace(/\b(\d+)\s*(?:sup(?:p)?(?: essays?)?)\b/gi, "$1 доп. эссе")
          .replace(/\b(\d+)\s*(?:ps|personal st)\b/gi, "$1 личное эссе")
          .replace(/\bPS\b/g, "личное эссе")
          .replace(/profile essay/gi, "эссе о себе"),
      ),
      lang,
    );
  }

  if (/not req\.? req/.test(l)) return t("Нужно только на некоторые программы", "Faqat ayrim dasturlar uchun kerak");
  if (/not req\.? rec/.test(l)) return t("Не обязательно, но рекомендуется", "Majburiy emas, lekin tavsiya etiladi");
  if (/not req\.? (cons|flexible)/.test(l)) return t("По желанию", "Ixtiyoriy");
  if (/^(not req|not used|not needed|is not required|no)/.test(l)) return t("Не нужно", "Kerak emas");
  if (/^rec/.test(l)) return t("Рекомендуется", "Tavsiya etiladi");
  if (/req\.? for schol/.test(l)) return t("Нужно для стипендии", "Stipendiya uchun kerak");
  if (/^req\.? highly/.test(l)) return t("Обязательно", "Majburiy");
  if (/act req/.test(l)) return null;

  const pieces: string[] = [];
  const ps = /\bps\b|personal st|personal essay|rersonal essay|application essay/.test(l);
  const supp = l.match(/(\d+)\s*(?:supp|sup essays|supplemental|penn-specific)/) ?? (/(one|a) supplemental/.test(l) ? ["", "1"] : null);
  const opt = l.match(/(\d+|two) (?:opt|optional)/);
  if (ps) pieces.push(t("Личное эссе", "Shaxsiy esse"));
  if (supp) {
    const n = Number(supp[1]);
    pieces.push(t(`${n} ${plural(n, "дополнительное эссе", "дополнительных эссе", "дополнительных эссе")}`, `${n} ta qo'shimcha esse`));
  }
  if (opt) pieces.push(t(`${opt[1] === "two" ? 2 : opt[1]} по желанию`, `${opt[1] === "two" ? 2 : opt[1]} ta ixtiyoriy`));
  if (/motivat|\bml\b/.test(l)) pieces.push(t("Мотивационное письмо", "Motivatsion xat"));
  if (/\bsop\b|statement of purpose/.test(l))
    pieces.push(t("Письмо о целях обучения (Statement of Purpose)", "O'qish maqsadlari haqida xat (Statement of Purpose)"));
  if (/self-introduction/.test(l)) pieces.push(t("Рассказ о себе", "O'zingiz haqingizda hikoya"));
  if (/study plan/.test(l)) pieces.push(pieces.length ? t("учебный план", "o'quv rejasi") : t("Учебный план", "O'quv rejasi"));

  if (pieces.length) {
    if (pieces.length === 1 && ps && !/\d/.test(l)) {
      return /required/.test(l)
        ? t("Личное эссе (Personal Statement), обязательно", "Shaxsiy esse (Personal Statement), majburiy")
        : t("Личное эссе (Personal Statement)", "Shaxsiy esse (Personal Statement)");
    }
    if (pieces.length === 1 && /motivat|\bml\b/.test(l) && /required/.test(l)) {
      return t("Мотивационное письмо (обязательно)", "Motivatsion xat (majburiy)");
    }
    const words = l.match(/(\d+)\s*words?\s*max/);
    const joined = /self-introduction/.test(l) && pieces.length === 2 ? pieces.join(t(" и ", " va ")) : pieces.join(" + ");
    return words ? `${joined}${t(`, до ${words[1]} слов`, `, ${words[1]} so'zgacha`)}` : joined;
  }
  const atLeast = l.match(/at least (\d+)/);
  if (atLeast) return t(`Не меньше ${atLeast[1]} эссе`, `Kamida ${atLeast[1]} ta esse`);
  if (/^\d+$/.test(l)) return t(`${l} эссе`, `${l} ta esse`);
  return site;
}

/** "private liberal arts women's college" → "Частный колледж свободных искусств, женский". */
export function instTypeRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const t = pick(lang);
  const l = clean(raw).toLowerCase();
  if (!l) return null;
  const control =
    /public|statutory/.test(l) && !/private/.test(l) ? t("Государственный", "Davlat") : /private/.test(l) ? t("Частный", "Xususiy") : "";
  const kind = /liberal arts|\blac\b|liberal-arts/.test(l)
    ? t("колледж свободных искусств", "liberal arts kolleji")
    : /research/.test(l)
      ? t("исследовательский университет", "tadqiqot universiteti")
      : /college/.test(l) && !/universit/.test(l)
        ? t("колледж", "kolleji")
        : t("университет", "universiteti");
  const extras = [
    /ivy/.test(l) ? t("Лига плюща", "Ayvi Liga") : null,
    /women/.test(l) ? t("женский", "ayollar uchun") : /\bmen'?s\b/.test(l) ? t("мужской", "erkaklar uchun") : null,
    /historically black/.test(l) ? t("исторически афроамериканский", "tarixan afroamerikalik") : null,
  ].filter(Boolean);
  const head = control ? `${control} ${kind}` : cap(lang === "uz" ? kind.replace(/i$/, "") : kind);
  return extras.length ? `${head}, ${extras.join(", ")}` : head;
}

const MONEY_RE = /^([$€£])\s?([\d,.]+)$/;

/** Short text for the stat card plus the scholarship names for the money section. */
export function aidSummary(raw: string | null | undefined, lang: Lang = "ru"): { short: string; names: string[] } | null {
  const t = pick(lang);
  const s = clean(raw);
  if (!s || /^no data$/i.test(s)) return null;
  const l = s.toLowerCase();
  const plain = (short: string) => ({ short, names: [] as string[] });

  if (/^full ride/.test(l)) return plain(t("Полный грант (учёба и жильё)", "To'liq grant (o'qish va yashash)"));
  if (/full tuition for every/.test(l) || /tuition free/.test(l)) return plain(t("Учёба бесплатна для всех", "O'qish hamma uchun bepul"));
  if (/full.*partial/.test(l)) return plain(t("Полный или частичный грант", "To'liq yoki qisman grant"));
  if (/^full( funding)?$/.test(l)) return plain(t("Полный грант", "To'liq grant"));
  if (/^(no|нет|\$0(\.00)?)$/.test(l)) return plain(t("Нет", "Yo'q"));
  if (/^yes$/.test(l)) return plain(t("Есть", "Bor"));
  if (/partial/.test(l)) return plain(t("Частичная помощь", "Qisman yordam"));
  if (/governmental/.test(l)) return plain(t("Через госстипендии", "Davlat stipendiyalari orqali"));
  if (/master|for bachelors/.test(l)) return plain(t("Только для магистратуры", "Faqat magistratura uchun"));
  if (/finnish language/.test(l)) return plain(t("За знание финского языка", "Fin tilini bilgani uchun"));
  const m = s.match(MONEY_RE);
  if (m) {
    const amount = `${m[1]}${new Intl.NumberFormat("ru-RU").format(Number(m[2].replace(/,/g, ""))).replace(/\s/g, " ")}`;
    return plain(t(`до ${amount} в год`, `yiliga ${amount} gacha`));
  }
  const share = l.match(/^0\.(\d+)$/);
  if (share) {
    const pct = Math.round(Number(`0.${share[1]}`) * 100);
    return plain(t(`до ${pct}% стоимости`, `narxning ${pct}% igacha`));
  }

  const names = s
    .split(/[,;]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 2);
  if (names.length >= 2)
    return { short: t(`${names.length} ${plural(names.length, "стипендия", "стипендии", "стипендий")}`, `${names.length} ta stipendiya`), names };
  if (/nawa/.test(l)) return plain(t("Стипендия NAWA (Польша)", "NAWA stipendiyasi (Polsha)"));
  if (/dsu/.test(l)) return { short: t("Региональная стипендия DSU", "DSU mintaqaviy stipendiyasi"), names: CYR.test(s) && lang === "ru" ? [s] : [] };
  if (CYR.test(s)) return lang === "ru" ? plain(s) : plain(t("", "Stipendiya bor — tafsilotlar saytda"));
  if (s.length <= 32) return plain(s);
  return { short: t("1 стипендия", "1 ta stipendiya"), names: [s] };
}

/** "$17,380 / год" → "$17 380 / год" (and "/ yil" on the Uzbek site). */
export function money(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const s = clean(raw);
  if (!s) return null;
  const spaced = s.replace(/\d{1,3}(?:,\d{3})+/g, (x) => x.replace(/,/g, " "));
  return lang === "uz" ? spaced.replace(/\/\s*год/g, "/ yil") : spaced;
}

const AID_TYPE: Record<string, [string, string]> = {
  merit: ["За успехи (merit)", "Yutuqlar uchun (merit)"],
  "merit-based": ["За успехи (merit)", "Yutuqlar uchun (merit)"],
  "need-based": ["По доходу семьи (need-based)", "Oila daromadiga ko'ra (need-based)"],
  "need+a": ["По доходу семьи (need-based)", "Oila daromadiga ko'ra (need-based)"],
  scholarship: ["Стипендии вуза", "Universitet stipendiyalari"],
  both: ["За успехи и по доходу семьи", "Yutuqlar va oila daromadiga ko'ra"],
  mixed: ["За успехи и по доходу семьи", "Yutuqlar va oila daromadiga ko'ra"],
  "full funding": ["Полное финансирование", "To'liq moliyalashtirish"],
  jobs: ["Работа на кампусе", "Kampusda ishlash"],
};

export function aidTypeRu(type: string, lang: Lang = "ru"): string {
  const hit = AID_TYPE[type.trim().toLowerCase()];
  return hit ? hit[lang === "uz" ? 1 : 0] : type;
}

/** need-aware / need-blind explained. */
export function aidPolicyRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const t = pick(lang);
  const l = clean(raw).toLowerCase();
  if (!l) return null;
  const from = l.match(/from '(\d{2})/)?.[1];
  if (/need-blind/.test(l))
    return t(
      `Need-blind — доход семьи не влияет на решение о приёме${from ? ` (с 20${from} года)` : ""}.`,
      `Need-blind — oila daromadi qabul qaroriga ta'sir qilmaydi${from ? ` (20${from}-yildan)` : ""}.`,
    );
  if (/need-aware/.test(l))
    return t(
      "Need-aware — если просите финансовую помощь, это может снизить шансы на приём: мест с грантом для иностранцев мало.",
      "Need-aware — moliyaviy yordam so'rasangiz, qabul imkoniyati pasayishi mumkin: chet elliklar uchun grantli o'rinlar kam.",
    );
  if (/tuition free/.test(l)) return t("Учёба бесплатна для всех студентов.", "O'qish barcha talabalar uchun bepul.");
  return CYR.test(l) ? ruOnly(cap(clean(raw)), lang) : null;
}

const MAJOR: Record<string, [string, string]> = {
  engineering: ["Инженерия", "Muhandislik"],
  medicine: ["Медицина", "Tibbiyot"],
  science: ["Естественные науки", "Tabiiy fanlar"],
  sciences: ["Естественные науки", "Tabiiy fanlar"],
  "natural sciences": ["Естественные науки", "Tabiiy fanlar"],
  "life sciences": ["Науки о жизни", "Hayot haqidagi fanlar"],
  "physical sciences": ["Физические науки", "Fizika fanlari"],
  "social sciences": ["Социальные науки", "Ijtimoiy fanlar"],
  "social sciences and management": ["Социальные науки и менеджмент", "Ijtimoiy fanlar va menejment"],
  "engineering and technology": ["Инженерия и технологии", "Muhandislik va texnologiyalar"],
  technology: ["Технологии", "Texnologiyalar"],
  "arts & humanities": ["Искусство и гуманитарные науки", "San'at va gumanitar fanlar"],
  "economics and business": ["Экономика и бизнес", "Iqtisodiyot va biznes"],
  "business and economics": ["Бизнес и экономика", "Biznes va iqtisodiyot"],
  "busincess and economics": ["Бизнес и экономика", "Biznes va iqtisodiyot"],
  business: ["Бизнес", "Biznes"],
  economics: ["Экономика", "Iqtisodiyot"],
  "computer science": ["Информатика", "Informatika"],
  law: ["Право", "Huquq"],
  "hospitality business": ["Гостиничный бизнес", "Mehmonxona biznesi"],
  architecture: ["Архитектура", "Arxitektura"],
  design: ["Дизайн", "Dizayn"],
  mathematics: ["Математика", "Matematika"],
};

/** Majors list: translated where we know the term, junk ("12 areas of interest") dropped. */
export function majorsRu(items: string[], lang: Lang = "ru"): string[] {
  return items
    .filter((m) => !/areas of interest|academic structure|^\d+$/i.test(m))
    .filter((m) => lang === "ru" || !CYR.test(m))
    .map((m) => MAJOR[m.trim().toLowerCase()]?.[lang === "uz" ? 1 : 0] ?? m);
}

/** Notes: translate the known English patterns, keep Russian on the Russian site, drop the rest. */
export function noteRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const t = pick(lang);
  const s = clean(raw);
  if (!s) return null;
  const l = s.toLowerCase();
  if (/^german (language|b2)/.test(l))
    return t("Обучение на немецком языке — нужен уровень не ниже B2.", "Ta'lim nemis tilida — kamida B2 darajasi kerak.");
  if (/discounts for masters/.test(l)) return t("Скидки на обучение — только для магистратуры.", "O'qish uchun chegirmalar — faqat magistratura uchun.");
  if (/^tier \d/.test(l)) {
    const full = /full need met/.test(l);
    return full
      ? t(
          "Покрывает всю финансовую потребность принятых иностранцев, но доход семьи влияет на приём. Анкета: CSS Profile.",
          "Qabul qilingan chet elliklarning moliyaviy ehtiyojini to'liq qoplaydi, lekin oila daromadi qabulga ta'sir qiladi. Anketa: CSS Profile.",
        )
      : t(
          "Помощь иностранцам ограничена: частичные гранты по доходу семьи и за успехи. Анкета: CSS Profile.",
          "Chet elliklarga yordam cheklangan: oila daromadi va yutuqlar uchun qisman grantlar. Anketa: CSS Profile.",
        );
  }
  if (CYR.test(s)) return ruOnly(s, lang);
  return null;
}

export function livingRu(raw: string | null | undefined, lang: Lang = "ru"): string | null {
  const s = clean(raw);
  if (!s) return null;
  if (/^accommodation:/i.test(s)) return null;
  if (!CYR.test(s)) return null;
  if (lang === "ru") return s;
  // "Жильё ~ €150" / "Жизнь: €900/месяц" — keep the amount, translate the label.
  const amount = s.match(/[~≈]?\s*[$€£]\s?[\d,. ]+(?:\s*\/\s*месяц)?/)?.[0];
  if (!amount) return null;
  const a = amount.replace(/\/\s*месяц/, "/ oy").trim();
  return /жильё|жилье/i.test(s) ? `Yotoqxona ${a}` : `Yashash xarajati ${a}`;
}
