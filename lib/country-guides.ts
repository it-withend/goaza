import { COUNTRY_GUIDES_UZ } from "./country-guides.uz";

export type CountryGuide = {
  scholarships: string;
  after11Grade: string;
  livingBudget: string;
  workRights: string;
};

export const COUNTRY_GUIDES: Record<string, CountryGuide> = {
  USA: {
    scholarships: "Институциональные гранты вузов (need-based через CSS Profile и merit-стипендии) + внешние (Fulbright, Davis UWC Scholars)",
    after11Grade: "Прямое поступление на 1 курс сразу после 11 класса",
    livingBudget: "$12,000–$22,000 / год (общежитие + питание, сильно зависит от штата)",
    workRights: "До 20 ч/нед на кампусе по визе F-1 + стажировки CPT/OPT после 1 года",
  },
  UK: {
    scholarships: "Государственная Chevening (магистратура), GREAT Scholarships, скидки и bursary самих вузов (полный грант на бакалавриат редок)",
    after11Grade: "Обычно требуется Foundation (1 год) или A-Level / IB; исключения — Шотландия (частично) и ряд частных вузов",
    livingBudget: "£1,100–£1,600 / мес (£1,483 в Лондоне по визовому ориентиру UKVI)",
    workRights: "До 20 ч/нед в учебное время и full-time на каникулах",
  },
  Canada: {
    scholarships: "Вузовские merit/entrance гранты (Lester B. Pearson UofT, UBC ILOT, Karen McKellin) + провинциальные программы",
    after11Grade: "Прямое поступление после 11 класса с хорошим аттестатом и языковым сертификатом",
    livingBudget: "CAD $15,000–$22,000 / год в зависимости от города (Торонто/Ванкувер дороже)",
    workRights: "До 24 ч/нед off-campus во время учёбы и full-time на каникулах + PGWP после выпуска",
  },
  Germany: {
    scholarships: "Бесплатное обучение в госвузах (кроме Баден-Вюртемберга), DAAD, Deutschlandstipendium, политические фонды (KAS, FES, Heinrich Böll)",
    after11Grade: "Обычно 1 год в Studienkolleg или 1 год вуза на родине (зависит от страны аттестата в базе Anabin)",
    livingBudget: "€992 / мес (официальный расчёт для блокированного счёта Sperrkonto)",
    workRights: "140 полных или 280 неполных дней в году без потери статуса студента",
  },
  Turkey: {
    scholarships: "Türkiye Bursları (полный госгрант: учёба, общежитие, стипендия, билеты) + скидки вузов за SAT / высокий аттестат",
    after11Grade: "Прямое поступление сразу после 11 класса (по аттестату, SAT или экзамену TR-YÖS)",
    livingBudget: "$350–$650 / мес вне Стамбула, $500–$850 / мес в Стамбуле",
    workRights: "Официальная подработка ограничена; большинство студентов опирается на кампус или грант",
  },
  Hungary: {
    scholarships: "Stipendium Hungaricum (полный госгрант: бесплатная учёба, общежитие и ежемесячная стипендия) + скидки вузов",
    after11Grade: "Прямое поступление после 11 класса без отдельного Foundation (для медиков может быть вступительный экзамен)",
    livingBudget: "€550–€850 / мес в Будапеште, €450–€650 в Дебрецене/Сегеде/Пече",
    workRights: "До 30 ч/нед во время семестра (на базе студенческого ВНЖ)",
  },
  "South Korea": {
    scholarships: "Global Korea Scholarship (GKS/KGSP — 100% покрытие + год корейского + билеты) + 30–100% tuition waiver вузов по GPA",
    after11Grade: "Прямое поступление сразу после 11 класса",
    livingBudget: "$550–$950 / мес (кампусные общежития заметно дешевле аренды в Сеуле)",
    workRights: "До 20–25 ч/нед после 6 месяцев проживания при наличии уровня TOPIK",
  },
  Korea: {
    scholarships: "Global Korea Scholarship (GKS/KGSP — 100% покрытие + год корейского + билеты) + 30–100% tuition waiver вузов по GPA",
    after11Grade: "Прямое поступление сразу после 11 класса",
    livingBudget: "$550–$950 / мес (кампусные общежития заметно дешевле аренды в Сеуле)",
    workRights: "До 20–25 ч/нед после 6 месяцев проживания при наличии уровня TOPIK",
  },
  "Hong Kong": {
    scholarships: "Hong Kong PhD Fellowship, Belt and Road Scholarship и полные tuition+stipend гранты самих вузов (HKU, HKUST, CUHK, CityU, PolyU)",
    after11Grade: "Прямое поступление на 4-летний бакалавриат при высоких баллах аттестата / SAT / IB",
    livingBudget: "HK$5,000–HK$9,000 / мес (~$650–$1,150; общежитие существенно экономит бюджет)",
    workRights: "До 20 ч/нед на кампусе + летние стажировки + виза IANG на 2 года после выпуска",
  },
  Australia: {
    scholarships: "Australia Awards, Destination Australia и 15–50% merit-стипендии университетов (Go8 и др.)",
    after11Grade: "Часто требуется Foundation (1 год) или диплом IB / A-Level, реже — 1 курс вуза дома",
    livingBudget: "AUD $2,000–$2,600 / мес (официальный финансовый ориентир около AUD $29,710/год)",
    workRights: "До 48 ч за две недели в учебное время и без ограничений на каникулах",
  },
  Netherlands: {
    scholarships: "NL Scholarship (разовая выплата €5,000) + вузовские гранты (тут мало полных 100% программ для бакалавров вне ЕС)",
    after11Grade: "В исследовательские вузы (WO) обычно нужен 1 год вуза дома/Foundation; в прикладные (HBO) — часто сразу после 11 класса",
    livingBudget: "€1,000–€1,450 / мес (высокие расходы на жильё в Амстердаме/Утрехте/Делфте)",
    workRights: "До 16 ч/нед по разрешению работодателя (TWV) или full-time летом",
  },
  Poland: {
    scholarships: "Программы NAWA (Banach), скидки частных и госвузов, карта поляка (бесплатное обучение в госвузах)",
    after11Grade: "Прямое поступление сразу после 11 класса с нострификацией/апостилем аттестата",
    livingBudget: "€550–€850 / мес (общежития от €150–€250 / мес)",
    workRights: "Студентам очной формы можно работать без отдельного разрешения (при действующей визе/ВНЖ)",
  },
  "Czech Republic": {
    scholarships: "Бесплатное обучение на чешском языке в государственных вузах + стипендии Южноморавского центра / вузов",
    after11Grade: "Обычно 1 год языковых курсов + нострификация аттестата (экзамены по предметам школы)",
    livingBudget: "€550–€850 / мес в Праге, €450–€650 в Брно/Оломоуце",
    workRights: "Свободный доступ к рынку труда Чехии для очных студентов аккредитованных вузов",
  },
  Italy: {
    scholarships: "Региональные стипендии DSU (по доходу семьи ISEE — бесплатная учёба + жильё/питание + выплата) и госгрант MAECI",
    after11Grade: "Нужно 12 лет образования — после 11 класса обычно требуется 1 курс вуза дома или Foundation year",
    livingBudget: "€750–€1,200 / мес (Милан и Рим дороже, Болонья/Падуя/Турин доступнее)",
    workRights: "До 20 ч/нед (до 1,040 часов в год) по учебному ВНЖ",
  },
  Spain: {
    scholarships: "Скидки госрегионов и вузов, Fundación Carolina (магистратура), стипендии частных бизнес-школ",
    after11Grade: "Прямое поступление после 11 класса через омологацию аттестата и экзамены UNEDasiss / PCE",
    livingBudget: "€750–€1,150 / мес (Мадрид/Барселона дороже; Валенсия/Гранада дешевле)",
    workRights: "До 30 ч/нед по студенческой резиденции (estancia por estudios)",
  },
  Austria: {
    scholarships: "Фиксированный взнос в госвузах (~€726/семестр), гранты OeAD, стипендии земель",
    after11Grade: "Прямое поступление после 11 класса (при необходимости добирается языковой курс VWU до B2/C1)",
    livingBudget: "€900–€1,250 / мес в Вене, €750–€1,000 в Граце/Линце/Инсбруке",
    workRights: "До 20 ч/нед по разрешению AMS",
  },
  Japan: {
    scholarships: "MEXT (Monbukagakusho — 100% учёба, стипендия, билеты), JASSO + tuition reduction вузов (30–100%)",
    after11Grade: "Нужно 12 лет школьного образования — после 11 класса требуется Foundation / 1 год вуза",
    livingBudget: "¥100,000–¥150,000 / мес (~$700–$1,000)",
    workRights: "До 28 ч/нед при получении штампа разрешения на подработку (в каникулы до 8 ч/день)",
  },
  China: {
    scholarships: "CSC (Chinese Government Scholarship — полное покрытие + стипендия), провинциальные гранты и гранты Конфуция / вузов",
    after11Grade: "Прямое поступление сразу после 11 класса",
    livingBudget: "$400–$750 / мес (общежития на кампусе недорогие; Пекин/Шанхай выше)",
    workRights: "Оплачиваемая работа ограничена; возможны стажировки по согласованию с вузом и миграционной службой",
  },
  Finland: {
    scholarships: "Finland Scholarship и 50–100% tuition fee waivers университетов по баллам SAT / вступительных экзаменов",
    after11Grade: "Прямое поступление сразу после 11 класса",
    livingBudget: "€800–€1,100 / мес (визовый ориентир €9,600 / год)",
    workRights: "До 30 ч/нед в среднем за учебный год",
  },
  Sweden: {
    scholarships: "Swedish Institute (магистратура) и 25–100% waivers от университетов на платных программах",
    after11Grade: "Прямое поступление сразу после 11 класса через единый портал Universityadmissions.se",
    livingBudget: "SEK 10,300–12,500 / мес (~€900–€1,100)",
    workRights: "Без жёсткого лимита часов по закону, пока учёба идёт по плану",
  },
  Switzerland: {
    scholarships: "Низкая плата за обучение в госвузах (~CHF 1,400–4,000/год), Swiss Government Excellence (PhD/исследования)",
    after11Grade: "Часто нужен высокий аттестат + вступительный экзамен (например ETH/EPFL) или 1 год вуза дома",
    livingBudget: "CHF 1,750–2,300 / мес (высокая стоимость жилья и страховки)",
    workRights: "До 15 ч/нед после первых 6 месяцев обучения",
  },
  France: {
    scholarships: "Eiffel Excellence (магистратура/PhD), стипендии посольств и гранты Campus France / вузов",
    after11Grade: "Прямое поступление после 11 класса на L1 через Études en France + языковой DELF/DALF B2",
    livingBudget: "€800–€1,300 / мес в зависимости от города (Париж заметно дороже)",
    workRights: "До 964 часов в год (~20 ч/нед)",
  },
  UAE: {
    scholarships: "Полные гранты NYU Abu Dhabi, Khalifa University, Mohamed bin Zayed AI + 20–100% merit-скидки",
    after11Grade: "Прямое поступление после 11 класса",
    livingBudget: "$900–$1,600 / мес в зависимости от проживания в кампусе",
    workRights: "Доступны кампусные и одобренные вузом стажировки по студенческой визе",
  },
  Qatar: {
    scholarships: "Финансовая помощь Qatar Foundation и Education City (Georgetown, Northwestern, CMU-Q, HBKU) — покрывает до 100%",
    after11Grade: "Прямое поступление после 11 класса",
    livingBudget: "$700–$1,200 / мес (часто общежитие включено в грант)",
    workRights: "На кампусе с разрешения учебного заведения",
  },
  Singapore: {
    scholarships: "Tuition Grant (субсидия государства в обмен на отработку 3 года в Сингапуре), ASEAN / Science & Tech / вузовские гранты NUS и NTU",
    after11Grade: "Обычно требуется 12-летняя программа (IB / A-Level / 1 курс вуза) или выдающиеся олимпиадные результаты",
    livingBudget: "SGD $1,200–$2,000 / мес",
    workRights: "До 16 ч/нед в учебный период (в аккредитованных вузах)",
  },
  Denmark: {
    scholarships: "Ограниченные Danish Government Scholarships (в основном для магистратуры), скидки отдельных программ",
    after11Grade: "Часто требуется 1 курс вуза дома или высокий балл экзаменов (зависит от страны аттестата)",
    livingBudget: "€1,000–€1,400 / мес",
    workRights: "До 20 ч/нед (90 ч/мес) в семестр + full-time летом",
  },
  Belgium: {
    scholarships: "Невысокая стоимость в госвузах (особенно Валлония / Фландрия), Master Mind, ARES",
    after11Grade: "После 11 класса в ряде вузов просят год вуза дома или вступительный тест",
    livingBudget: "€850–€1,200 / мес",
    workRights: "До 20 ч/нед в учебное время",
  },
  Latvia: {
    scholarships: "Стипендии правительства Латвии (VIAA) + скидки вузов за академические успехи",
    after11Grade: "Прямое поступление сразу после 11 класса",
    livingBudget: "€500–€800 / мес в Риге",
    workRights: "До 20 ч/нед во время учёбы и 40 ч/нед на каникулах",
  },
  Portugal: {
    scholarships: "Гранты и скидки вузов для интернациональных студентов (до 30–50% цены), программа Camões",
    after11Grade: "Прямое поступление после 11 класса через конкурс для иностранных студентов (Statuto do Estudante Internacional)",
    livingBudget: "€700–€1,100 / мес в Лиссабоне и Порту",
    workRights: "Разрешена подработка при уведомлении миграционной службы",
  },
  "Turkish Republic of Northern Cyprus": {
    scholarships: "Автоматические 50% скидки иностранным студентам + 75–100% гранты вузов (EMU, NEU, CIU)",
    after11Grade: "Прямое поступление сразу после 11 класса",
    livingBudget: "$350–$550 / мес",
    workRights: "Подработка вне кампуса ограничена; основной упор на кампусные роли",
  },
};

export function getCountryGuide(country: string, lang: "ru" | "uz" = "ru"): CountryGuide | null {
  return (lang === "uz" ? COUNTRY_GUIDES_UZ : COUNTRY_GUIDES)[country] ?? null;
}
