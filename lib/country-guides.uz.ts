import type { CountryGuide } from "./country-guides";

const KOREA: CountryGuide = {
  scholarships: "Global Korea Scholarship (GKS/KGSP — 100% qoplash + bir yil koreys tili + chiptalar) + universitetlarning GPA bo'yicha 30–100% tuition waiver chegirmalari",
  after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
  livingBudget: "Oyiga $550–$950 (kampus yotoqxonalari Seuldagi ijaradan ancha arzon)",
  workRights: "6 oy yashagandan keyin TOPIK darajasi bo'lsa, haftasiga 20–25 soatgacha",
};

/** Uzbek (Latin) version of COUNTRY_GUIDES, same keys. */
export const COUNTRY_GUIDES_UZ: Record<string, CountryGuide> = {
  USA: {
    scholarships: "Universitetlarning o'z grantlari (CSS Profile orqali need-based va merit stipendiyalar) + tashqi grantlar (Fulbright, Davis UWC Scholars)",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri 1-kursga qabul",
    livingBudget: "Yiliga $12,000–$22,000 (yotoqxona + ovqat, shtatga qarab ancha farq qiladi)",
    workRights: "F-1 vizasi bilan kampusda haftasiga 20 soatgacha + 1 yildan keyin CPT/OPT amaliyotlari",
  },
  UK: {
    scholarships: "Davlat stipendiyasi Chevening (magistratura), GREAT Scholarships, universitetlarning chegirma va bursary'lari (bakalavriat uchun to'liq grant kam uchraydi)",
    after11Grade: "Odatda Foundation (1 yil) yoki A-Level / IB kerak; istisnolar — Shotlandiya (qisman) va ayrim xususiy universitetlar",
    livingBudget: "Oyiga £1,100–£1,600 (UKVI viza mo'ljali bo'yicha Londonda £1,483)",
    workRights: "O'qish davrida haftasiga 20 soatgacha, ta'tilda to'liq kun",
  },
  Canada: {
    scholarships: "Universitetlarning merit/entrance grantlari (UofT Lester B. Pearson, UBC ILOT, Karen McKellin) + viloyat dasturlari",
    after11Grade: "Yaxshi attestat va til sertifikati bilan 11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Shaharga qarab yiliga CAD $15,000–$22,000 (Toronto/Vankuver qimmatroq)",
    workRights: "O'qish davrida kampusdan tashqarida haftasiga 24 soatgacha, ta'tilda to'liq kun + bitirgandan keyin PGWP",
  },
  Germany: {
    scholarships: "Davlat universitetlarida bepul ta'lim (Baden-Vyurtembergdan tashqari), DAAD, Deutschlandstipendium, siyosiy fondlar (KAS, FES, Heinrich Böll)",
    after11Grade: "Odatda Studienkollegda 1 yil yoki o'z mamlakatingizdagi universitetda 1 yil (Anabin bazasidagi attestat mamlakatiga bog'liq)",
    livingBudget: "Oyiga €992 (Sperrkonto bloklangan hisobi uchun rasmiy hisob)",
    workRights: "Yiliga 140 to'liq yoki 280 yarim kun, talaba maqomini yo'qotmasdan",
  },
  Turkey: {
    scholarships: "Türkiye Bursları (to'liq davlat granti: o'qish, yotoqxona, stipendiya, chiptalar) + SAT / yuqori attestat uchun universitet chegirmalari",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul (attestat, SAT yoki TR-YÖS imtihoni bo'yicha)",
    livingBudget: "Istanbuldan tashqarida oyiga $350–$650, Istanbulda $500–$850",
    workRights: "Rasmiy ishlash cheklangan; ko'pchilik talabalar kampus yoki grantga tayanadi",
  },
  Hungary: {
    scholarships: "Stipendium Hungaricum (to'liq davlat granti: bepul o'qish, yotoqxona va oylik stipendiya) + universitet chegirmalari",
    after11Grade: "Alohida Foundation'siz 11-sinfdan keyin to'g'ridan-to'g'ri qabul (tibbiyot uchun kirish imtihoni bo'lishi mumkin)",
    livingBudget: "Budapeshtda oyiga €550–€850, Debretsen/Segedd/Pechda €450–€650",
    workRights: "Semestr davomida haftasiga 30 soatgacha (talaba yashash ruxsatnomasi asosida)",
  },
  "South Korea": KOREA,
  Korea: KOREA,
  "Hong Kong": {
    scholarships: "Hong Kong PhD Fellowship, Belt and Road Scholarship va universitetlarning to'liq tuition+stipend grantlari (HKU, HKUST, CUHK, CityU, PolyU)",
    after11Grade: "Attestat / SAT / IB ballari yuqori bo'lsa, 4 yillik bakalavriatga to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga HK$5,000–HK$9,000 (~$650–$1,150; yotoqxona byudjetni ancha tejaydi)",
    workRights: "Kampusda haftasiga 20 soatgacha + yozgi amaliyotlar + bitirgandan keyin 2 yillik IANG vizasi",
  },
  Australia: {
    scholarships: "Australia Awards, Destination Australia va universitetlarning 15–50% merit stipendiyalari (Go8 va boshqalar)",
    after11Grade: "Ko'pincha Foundation (1 yil) yoki IB / A-Level diplomi kerak, kamroq — o'z mamlakatingizda universitetning 1-kursi",
    livingBudget: "Oyiga AUD $2,000–$2,600 (rasmiy moliyaviy mo'ljal yiliga taxminan AUD $29,710)",
    workRights: "O'qish davrida ikki haftada 48 soatgacha, ta'tilda cheklovsiz",
  },
  Netherlands: {
    scholarships: "NL Scholarship (bir martalik €5,000) + universitet grantlari (Yevropa Ittifoqidan tashqaridagi bakalavrlar uchun to'liq 100% dasturlar kam)",
    after11Grade: "Tadqiqot universitetlariga (WO) odatda o'z mamlakatingizda 1 yil universitet yoki Foundation kerak; amaliy universitetlarga (HBO) — ko'pincha 11-sinfdan keyin darhol",
    livingBudget: "Oyiga €1,000–€1,450 (Amsterdam/Utrext/Delftda uy-joy qimmat)",
    workRights: "Ish beruvchi ruxsatnomasi (TWV) bilan haftasiga 16 soatgacha yoki yozda to'liq kun",
  },
  Poland: {
    scholarships: "NAWA dasturlari (Banach), xususiy va davlat universitetlari chegirmalari, Polyak kartasi (davlat universitetlarida bepul ta'lim)",
    after11Grade: "Attestatni nostrifikatsiya/apostil qilib, 11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga €550–€850 (yotoqxonalar oyiga €150–€250 dan)",
    workRights: "Kunduzgi talabalar alohida ruxsatsiz ishlashi mumkin (amaldagi viza/yashash ruxsatnomasi bilan)",
  },
  "Czech Republic": {
    scholarships: "Davlat universitetlarida chex tilida bepul ta'lim + Janubiy Moraviya markazi / universitet stipendiyalari",
    after11Grade: "Odatda 1 yil til kurslari + attestat nostrifikatsiyasi (maktab fanlari bo'yicha imtihonlar)",
    livingBudget: "Pragada oyiga €550–€850, Brno/Olomoutsda €450–€650",
    workRights: "Akkreditatsiyalangan universitetlarning kunduzgi talabalari Chexiya mehnat bozoriga erkin kira oladi",
  },
  Italy: {
    scholarships: "DSU mintaqaviy stipendiyalari (ISEE oila daromadi bo'yicha — bepul o'qish + yotoqxona/ovqat + to'lov) va MAECI davlat granti",
    after11Grade: "12 yillik ta'lim kerak — 11-sinfdan keyin odatda o'z mamlakatingizda universitetning 1-kursi yoki Foundation year talab qilinadi",
    livingBudget: "Oyiga €750–€1,200 (Milan va Rim qimmatroq, Bolonya/Padua/Turin arzonroq)",
    workRights: "O'quv yashash ruxsatnomasi bilan haftasiga 20 soatgacha (yiliga 1,040 soatgacha)",
  },
  Spain: {
    scholarships: "Davlat mintaqalari va universitetlar chegirmalari, Fundación Carolina (magistratura), xususiy biznes-maktablar stipendiyalari",
    after11Grade: "Attestatni gomologatsiya qilib va UNEDasiss / PCE imtihonlari orqali 11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga €750–€1,150 (Madrid/Barselona qimmatroq; Valensiya/Granada arzonroq)",
    workRights: "Talaba yashash ruxsatnomasi (estancia por estudios) bilan haftasiga 30 soatgacha",
  },
  Austria: {
    scholarships: "Davlat universitetlarida belgilangan to'lov (~semestriga €726), OeAD grantlari, viloyat stipendiyalari",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul (kerak bo'lsa, B2/C1 gacha VWU til kursi o'qiladi)",
    livingBudget: "Venada oyiga €900–€1,250, Grats/Lints/Insbrukda €750–€1,000",
    workRights: "AMS ruxsati bilan haftasiga 20 soatgacha",
  },
  Japan: {
    scholarships: "MEXT (Monbukagakusho — 100% o'qish, stipendiya, chiptalar), JASSO + universitetlarning tuition reduction chegirmalari (30–100%)",
    after11Grade: "12 yillik maktab ta'limi kerak — 11-sinfdan keyin Foundation / universitetda 1 yil talab qilinadi",
    livingBudget: "Oyiga ¥100,000–¥150,000 (~$700–$1,000)",
    workRights: "Ishlash ruxsati muhri olinsa, haftasiga 28 soatgacha (ta'tilda kuniga 8 soatgacha)",
  },
  China: {
    scholarships: "CSC (Chinese Government Scholarship — to'liq qoplash + stipendiya), viloyat grantlari, Konfutsiy va universitet grantlari",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga $400–$750 (kampus yotoqxonalari arzon; Pekin/Shanxay qimmatroq)",
    workRights: "Pullik ish cheklangan; universitet va migratsiya xizmati roziligi bilan amaliyot mumkin",
  },
  Finland: {
    scholarships: "Finland Scholarship va SAT / kirish imtihonlari ballari bo'yicha universitetlarning 50–100% tuition fee waiver chegirmalari",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga €800–€1,100 (viza mo'ljali yiliga €9,600)",
    workRights: "O'quv yili davomida o'rtacha haftasiga 30 soatgacha",
  },
  Sweden: {
    scholarships: "Swedish Institute (magistratura) va pullik dasturlarda universitetlarning 25–100% waiver chegirmalari",
    after11Grade: "Universityadmissions.se yagona portali orqali 11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga SEK 10,300–12,500 (~€900–€1,100)",
    workRights: "O'qish rejaga muvofiq borsa, qonunda qat'iy soat cheklovi yo'q",
  },
  Switzerland: {
    scholarships: "Davlat universitetlarida past to'lov (~yiliga CHF 1,400–4,000), Swiss Government Excellence (PhD/tadqiqot)",
    after11Grade: "Ko'pincha yuqori attestat + kirish imtihoni (masalan, ETH/EPFL) yoki o'z mamlakatingizda universitetda 1 yil kerak",
    livingBudget: "Oyiga CHF 1,750–2,300 (uy-joy va sug'urta qimmat)",
    workRights: "O'qishning dastlabki 6 oyidan keyin haftasiga 15 soatgacha",
  },
  France: {
    scholarships: "Eiffel Excellence (magistratura/PhD), elchixona stipendiyalari, Campus France va universitet grantlari",
    after11Grade: "Études en France orqali L1 ga 11-sinfdan keyin to'g'ridan-to'g'ri qabul + DELF/DALF B2 til sertifikati",
    livingBudget: "Shaharga qarab oyiga €800–€1,300 (Parij ancha qimmat)",
    workRights: "Yiliga 964 soatgacha (~haftasiga 20 soat)",
  },
  UAE: {
    scholarships: "NYU Abu Dhabi, Khalifa University, Mohamed bin Zayed AI to'liq grantlari + 20–100% merit chegirmalari",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Kampusda yashashga qarab oyiga $900–$1,600",
    workRights: "Talaba vizasi bilan kampusdagi va universitet ma'qullagan amaliyotlar mumkin",
  },
  Qatar: {
    scholarships: "Qatar Foundation va Education City moliyaviy yordami (Georgetown, Northwestern, CMU-Q, HBKU) — 100% gacha qoplaydi",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga $700–$1,200 (ko'pincha yotoqxona grantga kiradi)",
    workRights: "Ta'lim muassasasi ruxsati bilan kampusda",
  },
  Singapore: {
    scholarships: "Tuition Grant (Singapurda 3 yil ishlab berish evaziga davlat subsidiyasi), ASEAN / Science & Tech / NUS va NTU universitet grantlari",
    after11Grade: "Odatda 12 yillik dastur (IB / A-Level / universitetning 1-kursi) yoki yuqori olimpiada natijalari kerak",
    livingBudget: "Oyiga SGD $1,200–$2,000",
    workRights: "O'qish davrida haftasiga 16 soatgacha (akkreditatsiyalangan universitetlarda)",
  },
  Denmark: {
    scholarships: "Cheklangan Danish Government Scholarships (asosan magistratura uchun), ayrim dasturlar chegirmalari",
    after11Grade: "Ko'pincha o'z mamlakatingizda universitetning 1-kursi yoki yuqori imtihon bali kerak (attestat mamlakatiga bog'liq)",
    livingBudget: "Oyiga €1,000–€1,400",
    workRights: "Semestrda haftasiga 20 soatgacha (oyiga 90 soat) + yozda to'liq kun",
  },
  Belgium: {
    scholarships: "Davlat universitetlarida arzon ta'lim (ayniqsa Valloniya / Flandriya), Master Mind, ARES",
    after11Grade: "Ayrim universitetlar 11-sinfdan keyin o'z mamlakatingizda 1 yil universitet yoki kirish testini so'raydi",
    livingBudget: "Oyiga €850–€1,200",
    workRights: "O'qish davrida haftasiga 20 soatgacha",
  },
  Latvia: {
    scholarships: "Latviya hukumati stipendiyalari (VIAA) + akademik yutuqlar uchun universitet chegirmalari",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Rigada oyiga €500–€800",
    workRights: "O'qish davrida haftasiga 20 soatgacha, ta'tilda 40 soatgacha",
  },
  Portugal: {
    scholarships: "Xalqaro talabalar uchun universitet grantlari va chegirmalari (narxning 30–50% igacha), Camões dasturi",
    after11Grade: "Chet ellik talabalar tanlovi orqali (Statuto do Estudante Internacional) 11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Lissabon va Portuda oyiga €700–€1,100",
    workRights: "Migratsiya xizmatini xabardor qilgan holda ishlash mumkin",
  },
  "Turkish Republic of Northern Cyprus": {
    scholarships: "Chet ellik talabalarga avtomatik 50% chegirma + universitetlarning 75–100% grantlari (EMU, NEU, CIU)",
    after11Grade: "11-sinfdan keyin to'g'ridan-to'g'ri qabul",
    livingBudget: "Oyiga $350–$550",
    workRights: "Kampusdan tashqarida ishlash cheklangan; asosan kampusdagi ishlar",
  },
};
