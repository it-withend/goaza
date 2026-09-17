export type University = {
  id: string;
  slug: string;
  name: string;
  country: string;
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
  ivy: "Ivy League",
  liberal_arts: "Liberal arts",
  research: "Research",
  public: "Public",
  private: "Private",
  tech: "STEM / Tech",
  womens: "Women's college",
};

export function countryRu(c: string) {
  return COUNTRY_RU[c] || c;
}
