export type University = {
  id: string;
  slug: string;
  name: string;
  country: string;
  website_domain: string | null;
  city: string | null;
  tuition_display: string | null;
  tuition_num: number | null;
  acceptance_rate: string | null;
  rate_num: number | null;
  full_grant: boolean;
  aid_max: string | null;
  aid_num: number | null;
  aid_types: string[];
  early_deadline: string | null;
  regular_deadline: string | null;
  lang: string | null;
  undergrad_enrollment: string | null;
  intl_undergrad_pct: string | null;
  intl_undergrad_count: string | null;
  total_aid_millions: string | null;
  intl_receiving_aid_pct: string | null;
  avg_aid_award: string | null;
  inst_tags: string[];
  inst_type: string | null;
  intl_aid_policy: string | null;
  need_blind: boolean;
  majors: string | null;
  notes: string | null;
  living_note: string | null;
  sat: string | null;
  essay: string | null;
  how_apply_aid: string | null;
  coa_after_aid_pct: string | null;
  countries_represented: string | null;
  intl_acceptance_rate: string | null;
  intl_yield: string | null;
  merit_scholarship_name: string | null;
  // imported admissions facts (2021–2023 sources); optional until every row has them
  recommendations?: string | null;
  app_fee?: string | null;
  fee_waiver?: string | null;
  apply_url?: string | null;
  finaid_url?: string | null;
  rank_national?: string | null;
  rank_world?: string | null;
  ed_acceptance_rate?: string | null;
  rd_acceptance_rate?: string | null;
  early_rounds?: string | null;
  aid_forms?: string | null;
  css_fee_waiver?: string | null;
  avg_gpa?: string | null;
  admission_factors?: Record<string, string> | null;
  data_year?: number | null;
};

export const COUNTRY_RU: Record<string, string> = {
  Australia: "Австралия",
  Austria: "Австрия",
  Belgium: "Бельгия",
  Canada: "Канада",
  China: "Китай",
  "Czech Republic": "Чехия",
  Denmark: "Дания",
  Finland: "Финляндия",
  France: "Франция",
  Germany: "Германия",
  "Hong Kong": "Гонконг",
  Hungary: "Венгрия",
  Italy: "Италия",
  Japan: "Япония",
  Korea: "Корея",
  Latvia: "Латвия",
  Netherlands: "Нидерланды",
  Poland: "Польша",
  Portugal: "Португалия",
  Qatar: "Катар",
  Singapore: "Сингапур",
  "South Korea": "Южная Корея",
  Spain: "Испания",
  Sweden: "Швеция",
  Switzerland: "Швейцария",
  Turkey: "Турция",
  "Turkish Republic of Northern Cyprus": "Северный Кипр",
  UK: "Великобритания",
  USA: "США",
  UAE: "ОАЭ",
};

export const INST_LABEL: Record<string, string> = {
  ivy: "Лига плюща",
  liberal_arts: "Колледж свободных искусств",
  research: "Исследовательский",
  public: "Государственный",
  private: "Частный",
  tech: "Технический",
  womens: "Женский колледж",
};

export const COUNTRY_UZ: Record<string, string> = {
  Australia: "Avstraliya",
  Austria: "Avstriya",
  Belgium: "Belgiya",
  Canada: "Kanada",
  China: "Xitoy",
  "Czech Republic": "Chexiya",
  Denmark: "Daniya",
  Finland: "Finlandiya",
  France: "Fransiya",
  Germany: "Germaniya",
  "Hong Kong": "Gonkong",
  Hungary: "Vengriya",
  Italy: "Italiya",
  Japan: "Yaponiya",
  Korea: "Koreya",
  Latvia: "Latviya",
  Netherlands: "Niderlandiya",
  Poland: "Polsha",
  Portugal: "Portugaliya",
  Qatar: "Qatar",
  Singapore: "Singapur",
  "South Korea": "Janubiy Koreya",
  Spain: "Ispaniya",
  Sweden: "Shvetsiya",
  Switzerland: "Shveytsariya",
  Turkey: "Turkiya",
  "Turkish Republic of Northern Cyprus": "Shimoliy Kipr",
  UK: "Buyuk Britaniya",
  USA: "AQSH",
  UAE: "BAA",
};

export const INST_LABEL_UZ: Record<string, string> = {
  ivy: "Ayvi Liga",
  liberal_arts: "Liberal arts kolleji",
  research: "Tadqiqot universiteti",
  public: "Davlat",
  private: "Xususiy",
  tech: "Texnika",
  womens: "Ayollar kolleji",
};

export function countryRu(c: string) {
  return COUNTRY_RU[c] || c;
}

/** Country name in the visitor's language. */
export function countryName(c: string, lang: "ru" | "uz" = "ru") {
  return (lang === "uz" ? COUNTRY_UZ[c] : COUNTRY_RU[c]) || c;
}

export function instLabel(t: string, lang: "ru" | "uz" = "ru") {
  return (lang === "uz" ? INST_LABEL_UZ[t] : INST_LABEL[t]) || t;
}
