import type { Guide } from "./guide-types";

/**
 * Original Studyaza guides (Uzbek Latin).
 */
export const GUIDES_UZ: Guide[] = [
  {
    slug: "spisok-vuzov",
    title: "OTMlar ro'yxatini qanday tuzish kerak",
    summary: "10–15 ta universitetni shunday tanlangki, kamida bittasiga deyarli aniq kiring va o'qish xarajatini ko'tara oling.",
    stage: 1,
    minutes: 7,
    related: ["finansovaya-pomoshch", "raundy-podachi", "besplatnoe-obuchenie"],
    sections: [
      {
        id: "money-first",
        title: "Reytingdan emas, puldan boshlang",
        blocks: [
          {
            p: "Birinchi savol — oilangiz yiliga haqiqatdan qancha to'lay oladi. Agar javob «deyarli hech narsa» bo'lsa, ro'yxatga faqat chet elliklarga to'liq grant beradigan OTMlar, davlat stipendiyalari va bepul ta'lim beruvchi davlatlar kiradi. O'qishga pulingiz yetmaydigan joyga kirish — kira olmaslik bilan barobar.",
          },
          {
            note: "Oilangiz to'lashga tayyor summani qidirishdan oldin aniq yozib oling. Keyinchalik xuddi shu raqamni CSS Profile da ham ko'rsatasiz — tafovutlar yomon ko'rinadi.",
            tone: "tip",
          },
        ],
      },
      {
        id: "three-baskets",
        title: "Uch savat: orzu, haqiqiy, zaxira",
        blocks: [
          {
            table: {
              head: ["Savat", "Nechta OTM", "Qanday aniqlanadi"],
              rows: [
                ["Orzu (reach)", "3–4", "Qabul foizi 15% dan past yoki ballaringiz kirganlar o'rtachasidan past"],
                ["Haqiqiy (target)", "4–6", "Baholaringiz va testlaringiz kirgan talabalar o'rtachasi darajasida"],
                ["Zaxira (safety)", "3–4", "Siz o'rtacha talabadan kuchliroqsiz va OTM chet elliklarga yordam beradi"],
              ],
            },
          },
          {
            p: "Moliyaviy yordamga muhtoj chet ellik uchun to'liq qoplash beradigan deyarli har bir AQSh OTMi — «orzu»: yordam so'ragan chet elliklar orasidagi tanlov umumiy qabul foizidan bir necha baravar qiyinroq. Shuning uchun zaxira savatiga puli tanlovga bog'liq bo'lmagan joylarni qo'shing: Stipendium Hungaricum, Türkiye Bursları, Germaniya yoki Chexiyada bepul ta'lim.",
          },
        ],
      },
      {
        id: "criteria",
        title: "Qaysi mezonlar bo'yicha saralash kerak",
        blocks: [
          {
            list: [
              "Chet elliklarga yordam siyosati: need-blind (qabul qarori pulga bog'liq emas) yoki need-aware (bog'liq).",
              "Meets full need — universitet oilangiz ko'tara olmaydigan barcha farqni qoplaydimi.",
              "Haqiqatda nechta chet ellik yordam oladi va o'rtacha grant miqdori qancha.",
              "SAT/ACT kerakmi, minimal IELTS/TOEFL necha ball.",
              "Kerakli mutaxassislik bormi va keyinchalik uni o'zgartirish mumkinmi.",
              "Ariza topshirish necha pul va fee waiver bormi.",
            ],
          },
          { note: "Bularning barchasi atlasdagi OTM kartochkalarida bor — «To'liq grant» filtri ortiqchasini darhol ajratadi.", tone: "info" },
        ],
      },
      {
        id: "steps",
        title: "Ish tartibi",
        blocks: [
          {
            steps: [
              { title: "Keng ro'yxat", text: "Atlasdagi filtrlar bo'yicha 30–40 ta OTM yozib oling: davlat, to'liq grant, sizning profilingiz." },
              { title: "Pulni tekshirish", text: "Har bir OTM saytida financial aid for international students va Net Price Calculator sahifasini toping." },
              { title: "Talablarni tekshirish", text: "Testlar, esselar, tavsiyanomalar, ariza to'lovi — hammasini jadvalga kiriting." },
              { title: "Qisqartirish", text: "Har bir savatda yetarli OTM qoladigan qilib 10–15 tasini qoldiring." },
              { title: "Raundlar rejasi", text: "Qayerga erta (ED/EA), qayerga asosiy raundda topshirishingizni hal qiling." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "dokumenty",
    title: "Qanday hujjatlar kerak",
    summary: "Chet el bakalavriatiga kirish uchun to'liq chek-list: nima yig'ish, kimdan so'rash va bunga qancha vaqt ketadi.",
    stage: 1,
    minutes: 6,
    related: ["rekomendacii", "testy", "finansovaya-pomoshch"],
    sections: [
      {
        id: "checklist",
        title: "Asosiy to'plam",
        blocks: [
          {
            table: {
              head: ["Hujjat", "Kim tayyorlaydi", "Qachon boshlash"],
              rows: [
                ["9–11 (12) sinf baholari, ingliz tiliga tarjima qilingan", "Maktab + tarjimon", "Oxirgi sinfdan oldingi yozda"],
                ["Maktab profili (school profile)", "Maktab maslahatchisi yoki o'rinbosar", "Sentyabr"],
                ["2 ta o'qituvchi + 1 ta maslahatchi tavsiyanomasi", "O'qituvchilar, maslahatchi", "Dedlayndan 1–2 oy oldin"],
                ["IELTS / TOEFL / Duolingo natijalari", "Siz", "Dedlayndan 3–6 oy oldin"],
                ["SAT / ACT (kerak bo'lsa yoki yordam bersa)", "Siz", "Oxirgi yilning bahor–kuzi"],
                ["Personal statement va qo'shimcha esselar", "Siz", "Yozda"],
                ["Faoliyatlar va mukofotlar ro'yxati", "Siz", "Yozda"],
                ["Xorijga chiqish pasporti", "Siz", "Iloji boricha ertaroq"],
              ],
            },
          },
        ],
      },
      {
        id: "money-docs",
        title: "Moliyaviy yordam uchun hujjatlar",
        blocks: [
          {
            list: [
              "CSS Profile yoki OTMning chet elliklar uchun anketasi (ISFAA va shunga o'xshashlar).",
              "Ota-onaning oxirgi yildagi daromad ma'lumotnomalari, bank hisobvaraqlaridan ko'chirmalar.",
              "Agar ota-ona ishlamasa yoki norasmiy ishlasa — tushuntirish xati.",
              "Ba'zan: mol-mulk, ajralish yoki qaramog'idagi shaxslar haqida hujjatlar.",
            ],
          },
          { note: "Agar OTM talab qilmasa, tarjimalarni notariusda tasdiqlash shart emas. Odatda maktab yoki tarjimon imzolagan tarjima yetarli.", tone: "tip" },
        ],
      },
      {
        id: "later",
        title: "Keyinroq nimalar kerak bo'ladi",
        blocks: [
          {
            list: [
              "Mid-year report — bitiruv sinfining birinchi yarim yillik baholari, maktab qishda yuboradi.",
              "Final report va attestat — maktabni bitirgandan keyin.",
              "Emlash ma'lumotnomasi va tibbiy shakl — qabul qilingandan keyin.",
              "Viza hujjatlari (AQSh uchun I-20, Buyuk Britaniya uchun CAS, Yevropada qabul xati).",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "testy",
    title: "Imtihonlar: SAT, ACT, IELTS, TOEFL, Duolingo",
    summary: "Qaysi testlar kerak, qaysi ballar yaxshi hisoblanadi va topshirishda qanday tejash mumkin.",
    stage: 2,
    minutes: 6,
    related: ["dokumenty", "spisok-vuzov"],
    sections: [
      {
        id: "english",
        title: "Ingliz tili: qaysi birini tanlash kerak",
        blocks: [
          {
            table: {
              head: ["Test", "Kuchli OTMlardagi minimum", "Afzalliklari"],
              rows: [
                ["IELTS Academic", "7.0 (ko'pincha har bo'lim kamida 6.5)", "Deyarli hamma joyda qabul qilinadi"],
                ["TOEFL iBT", "100+", "AQSh uchun standart"],
                ["Duolingo English Test", "120–130+", "Arzonroq, uydan 1 soatda topshiriladi, natija 2 kunda"],
              ],
            },
          },
          { note: "Hamma OTMlar ham Duolingo ni qabul qilmaydi. To'lovdan oldin OTM kartochkasidagi «Til» maydonidan tekshiring.", tone: "warn" },
        ],
      },
      {
        id: "sat",
        title: "SAT va ACT",
        blocks: [
          {
            p: "Ko'plab AQSh OTMlari test-optional tartibiga o'tgan: SAT yuborish majburiy emas. Biroq kuchli maktabi bo'lmagan chet ellik uchun yaxshi natija — qabul komissiyasi tushunadigan darajani ko'rsatishning kam sonli usullaridan biri. Ba'zi top OTMlar (MIT, Dartmouth, Yale, Brown) yana test talab qilmoqda.",
          },
          {
            list: [
              "Top-30 uchun kuchli natija: 1500+.",
              "SAT test markazida onlayn topshiriladi (Digital SAT).",
              "Natijani faqat kirganlar diapazoni o'rtasidan past bo'lmagan taqdirda yuboring.",
            ],
          },
        ],
      },
      {
        id: "plan",
        title: "Qachon topshirish kerak",
        blocks: [
          {
            steps: [
              { title: "Ariza berishdan 1 yil oldin", text: "Boshlang'ich darajani bilish uchun sinov testi." },
              { title: "Bahor–yoz", text: "Ingliz tili va SAT dan birinchi urinish." },
              { title: "Avgust–oktyabr", text: "Kerak bo'lsa qayta topshirish. Erta raundga ulguradigan oxirgi SAT — oktyabrda." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "finansovaya-pomoshch",
    title: "Moliyaviy yordam: AQShda va boshqa joylarda qanday bepul o'qish mumkin",
    summary: "Need-based merit dan nimasi bilan farq qiladi, need-blind nima va CSS Profile ni xatosiz qanday to'ldirish kerak.",
    stage: 3,
    minutes: 9,
    related: ["spisok-vuzov", "besplatnoe-obuchenie", "dokumenty"],
    sections: [
      {
        id: "types",
        title: "Yordamning ikki turi",
        blocks: [
          {
            table: {
              head: ["", "Need-based", "Merit-based"],
              rows: [
                ["Nima uchun beriladi", "Oilaning moliyaviy ehtiyoji uchun", "Yutuqlar uchun: baholar, testlar, olimpiadalar"],
                ["Miqdori", "Oilaga yetmayotgan qism, to'liq qoplashgacha", "Belgilangan summa yoki to'liq o'qish"],
                ["Qayerda ko'proq", "AQShning kuchli xususiy universitet va kollejlari", "O'rta darajadagi davlat va xususiy OTMlar"],
              ],
            },
          },
        ],
      },
      {
        id: "blind-aware",
        title: "Need-blind va need-aware",
        blocks: [
          {
            p: "Need-blind — OTM siz pul so'rayapsizmi yoki yo'qmi, qaramasdan qabul qilish haqida qaror chiqaradi. Chet elliklar uchun bunday ishlaydiganlar sanoqli: Harvard, Yale, Princeton, MIT, Amherst, Dartmouth, Bowdoin, Brown. Need-aware — yordam so'rovi hisobga olinadi: boshqa shartlar teng bo'lganda OTMga to'lay oladiganni olish osonroq. Need-aware OTMlarga topshirish kerak, lekin ular deyarli doim «orzu» toifasiga kiradi.",
          },
          { note: "Imkoniyatni oshirish uchun ehtiyojni kamaytirib ko'rsatmang: kichik grant bilan qabul qilinsangiz ham, o'qishga baribir pul topilmaydi.", tone: "warn" },
        ],
      },
      {
        id: "full-need",
        title: "Meets full need — eng muhim satr",
        blocks: [
          {
            p: "Meets 100% of demonstrated need tamoyili bilan ishlaydigan OTM oilangiz qancha to'lay olishini hisoblaydi va qolgan barcha farqni grant hamda kampus ishi (odatda yiliga $2–4 ming) bilan qoplaydi. Kreditsiz. Aynan shunday OTMlar chet elliklarga full ride beradi.",
          },
          {
            table: {
              head: ["OTM", "Yordam olgan chet elliklar", "O'rtacha grant"],
              rows: [
                ["Vanderbilt University", "189", "$59 373"],
                ["Middlebury College", "138", "$57 973"],
                ["Grinnell College", "207", "$37 361"],
                ["Bates College", "79", "$54 496"],
              ],
            },
          },
          { p: "Raqamlar 2022–2023-yillardagi OTM hisobotlariga asoslangan; dolzarb ma'lumotni OTMning Common Data Set idan ko'ring." },
        ],
      },
      {
        id: "css",
        title: "CSS Profile va OTM anketalari",
        blocks: [
          {
            steps: [
              { title: "Shaklini aniqlang", text: "Ko'pchiligi CSS Profile so'raydi, ba'zilari esa o'z anketasini (ISFAA, IFAW, Princeton da PFAA)." },
              { title: "Fee waiver", text: "CSS Profile pullik (birinchi OTM uchun taxminan $25), lekin kam daromadda avtomatik yoki so'rov bo'yicha bepul beriladi." },
              { title: "Raqamlar", text: "Daromad va mulk to'ldirish sanasidagi kurs bo'yicha dollarda ko'rsatiladi. Barcha anketalarda bir xil summa yozing." },
              { title: "Muddatlar", text: "Moliyaviy hujjatlar ariza bilan bir xil raundda topshiriladi. Kechikish ko'pincha umuman yordam berilmasligini anglatadi." },
            ],
          },
        ],
      },
      {
        id: "elsewhere",
        title: "AQShdan tashqaridagi yordam",
        blocks: [
          {
            p: "Yevropa va Osiyoda pulni ko'pincha OTMlar emas, davlatlar beradi. Eng qulayi — Stipendium Hungaricum, Türkiye Bursları, GKS (Koreya), MEXT (Yaponiya), CSC (Xitoy) va oila daromadi bo'yicha Italiya hududiy stipendiyalari.",
          },
          { links: [{ label: "Barcha stipendiya va grantlar", href: "/grants" }] },
        ],
      },
    ],
  },
  {
    slug: "besplatnoe-obuchenie",
    title: "Qayerda bepul yoki deyarli bepul o'qish mumkin",
    summary: "Kam daromadli oila uchun bakalavriat ochiq bo'lgan davlatlar va dasturlar.",
    stage: 3,
    minutes: 6,
    related: ["finansovaya-pomoshch", "spisok-vuzov"],
    sections: [
      {
        id: "options",
        title: "Variantlar",
        blocks: [
          {
            table: {
              head: ["Qayer", "Nima qoplanadi", "Asosiy shart"],
              rows: [
                ["Vengriya — Stipendium Hungaricum", "O'qish, yotoqxona, oyiga ≈€110", "Dastur orqali tanlov, ingliz tilidagi dasturlar bor"],
                ["Turkiya — Türkiye Bursları", "Hamma narsa, jumladan 1 yil turk tili va parvoz", "Qishda onlayn ariza + suhbat"],
                ["Germaniya", "O'qish bepul", "Yiliga ≈€11 900 bloklangan hisob, ko'pincha Studienkolleg"],
                ["Chexiya", "Chex tilida bepul", "1 yillik til kursi"],
                ["Italiya — DSU", "O'qish, pul, yotoqxona", "Past oila daromadi, daromad hujjatlari"],
                ["Koreya — GKS", "Hamma narsa + oyiga ≈$740–1 110", "Elchixona yoki universitet orqali"],
                ["Yaponiya — MEXT", "Hamma narsa + oyiga ≈$735", "Elchixonada imtihonlar"],
              ],
            },
          },
        ],
      },
      {
        id: "combine",
        title: "AQSh bilan qanday birlashtirish mumkin",
        blocks: [
          {
            p: "Muddatlar turlicha: Turkiya va Vengriya davlat stipendiyalariga AQSh natijalari hali chiqmagan qish va bahorda topshiriladi. Parallel ravishda topshiring — aynan shular sizning zaxira variantlaringiz.",
          },
        ],
      },
    ],
  },
  {
    slug: "raundy-podachi",
    title: "Ariza topshirish raundlari: ED, EA, REA, RD",
    summary: "AQShda erta va oddiy raundlar nimasi bilan farq qiladi hamda moliyaviy yordam kerak bo'lganda qaysisini tanlash lozim.",
    stage: 5,
    minutes: 5,
    related: ["spisok-vuzov", "finansovaya-pomoshch"],
    sections: [
      {
        id: "rounds",
        title: "To'rtta raund",
        blocks: [
          {
            table: {
              head: ["Raund", "Dedlayn", "Javob", "Majburiymi?"],
              rows: [
                ["Early Decision I (ED)", "1–15-noyabr", "Dekabr o'rtasi", "Ha — faqat bitta OTM"],
                ["Early Decision II (ED2)", "1–15-yanvar", "Fevral", "Ha"],
                ["Early Action (EA)", "1–15-noyabr", "Dekabr–yanvar", "Yo'q, bir nechtasiga mumkin"],
                ["Restrictive EA (REA/SCEA)", "1-noyabr", "Dekabr o'rtasi", "Yo'q, lekin boshqa xususiy OTMlarga erta topshirib bo'lmaydi"],
                ["Regular Decision (RD)", "1–15-yanvar", "Mart oxiri", "Yo'q"],
              ],
            },
          },
        ],
      },
      {
        id: "ed",
        title: "Early Decision: pul kerak bo'lganlar uchun xavf",
        blocks: [
          {
            p: "ED — shartnoma: agar OTM sizni qabul qilsa, qolgan arizalarni qaytarib olasiz. Erta raundda kirish imkoniyati ko'pincha 2–3 baravar yuqori. Ammo moliyaviy yordam takliflarini solishtira olmaysiz. Shartnomani faqat yordam obyektiv ravishda yetmaganda bekor qilish mumkin — buni isbotlash kerak.",
          },
          { note: "ED ni faqat chet elliklar uchun meets full need beradigan OTMga va uning Net Price Calculator ini tekshirgandan keyingina topshiring.", tone: "warn" },
        ],
      },
      {
        id: "calendar",
        title: "Bitiruv yili taqvimi",
        blocks: [
          {
            steps: [
              { title: "Avgust", text: "Common App ochiladi, yakuniy OTMlar ro'yxati tayyorlanadi." },
              { title: "1-noyabr", text: "ED, EA va REA hamda moliyaviy hujjatlar." },
              { title: "Dekabr", text: "Erta javoblar. ED ga kirganlar qolgan arizalarni olib tashlaydi." },
              { title: "1–15-yanvar", text: "Asosiy raund va ED2." },
              { title: "Mart oxiri", text: "Regular Decision javoblari." },
              { title: "1-may", text: "Milliy qaror kuni: OTMni tanlash va depozit to'lash." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "esse",
    title: "Esse: personal statement va qo'shimchalar",
    summary: "Mavzuni qanday tanlash, 650 so'zli matnni qurish va «Why us» da yiqilmaslik.",
    stage: 4,
    minutes: 8,
    related: ["common-app", "rekomendacii"],
    sections: [
      {
        id: "goal",
        title: "Esse nima uchun kerak",
        blocks: [
          {
            p: "Baholar va testlar o'qishni uddalashingizni ko'rsatadi. Esse esa boshqa savolga javob beradi: ularning kampusida qanday inson bo'lasiz. Komissiya uni bir necha daqiqada o'qiydi — siz uchun nima muhimligi va qanday fikrlashingiz tushunarli bo'lishi kerak.",
          },
        ],
      },
      {
        id: "topic",
        title: "Mavzuni qanday tanlash kerak",
        blocks: [
          {
            list: [
              "Biror narsaga qarashingizni o'zgartirgan bitta voqea. Voqeaning o'zi emas, nima tushunganingiz muhim.",
              "O'zingiz haqingizda so'zlab berish mumkin bo'lgan buyum yoki joy (metafora).",
              "Bitta qadriyat bilan bog'langan lahzalar zanjiri: qat'iyat, qiziquvchanlik, boshqalarga g'amxo'rlik.",
            ],
          },
          { note: "Mavzu dramatik bo'lishi shart emas. Kuchli esselar ko'pincha oddiy narsalar — yarim kunlik ish, singil, buvining bog'i haqida, ammo juda samimiy va aniq yoziladi.", tone: "tip" },
        ],
      },
      {
        id: "structure",
        title: "Tuzilishi",
        blocks: [
          {
            steps: [
              { title: "Sahna", text: "Umumiy gaplardan emas, aniq lahzadan boshlang." },
              { title: "Kontekst", text: "Qisqacha: nima sodir bo'layotgan edi va nega bu muhim edi." },
              { title: "Burilish", text: "Nima qildingiz yoki nimani angladingiz." },
              { title: "Xulosa", text: "Bu sizda hozir qanday ko'rinadi va keyin qayerga ketayapsiz." },
            ],
          },
          { p: "Common App limiti — 650 so'z. Yaxshi 900 so'zlik qoralama, so'ngra ayovsiz tahrir." },
        ],
      },
      {
        id: "supplements",
        title: "Qo'shimcha esselar va «Why us»",
        blocks: [
          {
            list: [
              "Aniq kurslar, professorlar, klublar va dasturlarni ayting — qo'shni OTMda yo'q narsalarni.",
              "Ularni o'z hikoyangiz bilan bog'lang: aynan sizga bu nega kerak.",
              "Broshyura va reytingni qayta so'zlab bermang.",
              "Qisqa javoblar (50–150 so'z) ham esse: har bir so'z ishlashi kerak.",
            ],
          },
        ],
      },
      {
        id: "mistakes",
        title: "Ko'p uchraydigan xatolar",
        blocks: [
          {
            list: [
              "Hikoya o'rniga yutuqlar ro'yxati.",
              "Boshqa har qanday abituriyent yoza oladigan umumiy matn.",
              "Ona tilidan so'zma-so'z tarjima — komissiya buni sezadi. To'g'ridan-to'g'ri inglizchada yozing.",
              "To'liq AI bilan yozilgan matn: ko'p OTMlar buni tekshiradi va to'g'ridan-to'g'ri taqiqlaydi.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "rekomendacii",
    title: "Tavsiyanoma xatlari",
    summary: "Kimdan so'rash, o'qituvchiga qanday yordam berish va agar o'qituvchi ingliz tilini bilmasa nima qilish kerak.",
    stage: 4,
    minutes: 4,
    related: ["dokumenty", "common-app"],
    sections: [
      {
        id: "who",
        title: "Kim yozadi",
        blocks: [
          {
            list: [
              "Oxirgi ikki yildagi ixtisoslik fanlari bo'yicha ikki o'qituvchi — faqat besh baho qo'yadigani emas, darsda faol bo'lganingiz yaxshiroq.",
              "Maktab maslahatchisi: agar u bo'lmasa, o'quv ishlari bo'yicha o'rinbosar yoki sinf rahbari.",
              "Texnika universiteti (MIT, Caltech) bitta matematika yoki tabiiy fanlar o'qituvchisini talab qilishi mumkin.",
            ],
          },
        ],
      },
      {
        id: "help",
        title: "O'qituvchiga qanday yordam berish kerak",
        blocks: [
          {
            steps: [
              { title: "Oldindan so'rang", text: "Birinchi dedlayndan kamida 6 hafta oldin." },
              { title: "«Brifing» bering", text: "Bir sahifa: uning fanidagi loyihalaringiz, u eslashi mumkin bo'lgan holatlar, qayerga topshirayotganingiz." },
              { title: "Tarjima", text: "O'qituvchi o'z tilida yozadi, tasdiqlangan tarjima Common App ga yuklanadi — bu oddiy amaliyot." },
              { title: "Eslatib qo'ying", text: "Dedlayndan bir hafta oldin hammasi yuklanganini xushmuomalalik bilan tekshiring." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "common-app",
    title: "Common App ni qanday to'ldirish kerak",
    summary: "AQShning 1 000+ universitetlariga topshiriladigan anketa bo'limlari va har biriga nima yozish.",
    stage: 5,
    minutes: 6,
    related: ["esse", "raundy-podachi"],
    sections: [
      {
        id: "sections",
        title: "Bo'limlar",
        blocks: [
          {
            table: {
              head: ["Bo'lim", "Ichida nima bor", "Maslahat"],
              rows: [
                ["Profile, Family", "Siz va ota-onangiz haqida ma'lumot", "Ismlarni xorijiy pasportdagidek lotin harflarida yozing"],
                ["Education", "Maktab, baholar, kurslar", "Baholash tizimini Additional Information da tushuntiring"],
                ["Testing", "Testlar", "Faqat eng yaxshi natijalarni ko'rsatish mumkin"],
                ["Activities", "10 tagacha faoliyat, tavsif 150 belgigacha", "Fe'l + natija + raqam"],
                ["Honors", "5 tagacha mukofot", "Daraja: maktab, hudud, mamlakat, jahon"],
                ["Writing", "Personal statement (650 so'z)", "Barcha OTMlar uchun bitta esse"],
                ["Additional Information", "650 so'zgacha", "Holatlar: ish, kasallik, oila"],
              ],
            },
          },
        ],
      },
      {
        id: "activities",
        title: "Faoliyatlarni qanday yozish kerak",
        blocks: [
          { p: "Kuchsiz: «Dasturlash klubi a'zosi». Kuchli: «Klub tashkil etdim: 25 ishtirokchi, 3 ta xakaton o'tkazdik, 40 nafar o'quvchiga Python o'rgatdik»." },
          { note: "Yarim kunlik ish, oilaga yordam, kichiklarga qarash — bular ham faoliyat. Komissiyalar buni, ayniqsa kam ta'minlangan oila talabalarida qadrlaydi.", tone: "tip" },
        ],
      },
      { id: "fee", title: "To'lov va fee waiver", blocks: [{ p: "Ariza har bir OTM uchun $65–90 turadi. Common App da fee waiver bor: to'lov moliyaviy qiyinchilik tug'dirishini belgilang va maslahatchi orqali tasdiqlating. Ko'p OTMlar pochta orqali to'g'ridan-to'g'ri so'rovni ham qabul qiladi." }] },
    ],
  },
  {
    slug: "kanada",
    title: "Kanadaga o'qishga kirish",
    summary: "Kanada AQShdan nimasi bilan farq qiladi, o'qish necha pul turadi va qaysi stipendiyalarni olish mumkin.",
    stage: 0,
    minutes: 6,
    related: ["finansovaya-pomoshch", "spisok-vuzov"],
    sections: [
      {
        id: "why",
        title: "Nega Kanada",
        blocks: [
          {
            list: [
              "O'qish paytida haftasiga 24 soatgacha va ta'tilda cheklovsiz ishlash mumkin.",
              "Co-op dasturlari o'qish va haq to'lanadigan amaliyotlarni navbatma-navbat olib boradi.",
              "Bitirgandan so'ng — 3 yilgacha ishlash ruxsatnomasi (PGWP) va immigratsiyaga aniq yo'l.",
            ],
          },
        ],
      },
      {
        id: "money",
        title: "Necha pul turadi",
        blocks: [
          {
            table: {
              head: ["OTM", "Yillik o'qish", "Yordam"],
              rows: [
                ["University of Toronto", "≈CAD 48–70 ming", "Lester B. Pearson — to'liq qoplash, ≈37 kishi"],
                ["University of British Columbia", "≈CAD 48–68 ming", "International Scholars — to'liqqacha, ehtiyoj bo'yicha"],
                ["York University", "≈CAD 38–46 ming", "PISE — o'qishni to'liq qoplashgacha"],
              ],
            },
          },
          { note: "Kanadada AQSh ko'lamidagi need-based yordam yo'q: to'liq grantlar sanoqli. Kam daromadli oila uchun Kanada faqat yirik stipendiya bilan mumkin.", tone: "warn" },
        ],
      },
      {
        id: "types",
        title: "Universitet yoki kollej",
        blocks: [
          { p: "Universitetlar bakalavriat (3–4 yil), magistratura va PhD beradi. Kollejlar amaliy diplom va sertifikatlar beradi, ular arzonroq va kreditlarning bir qismini universitetga ko'chirish mumkin." },
        ],
      },
    ],
  },
];

export const STAGES_UZ: { n: 1 | 2 | 3 | 4 | 5; title: string; text: string; guide: string }[] = [
  { n: 1, title: "Ro'yxat tuzish", text: "Pulingiz yetadigan uch savatdagi 10–15 ta universitet.", guide: "spisok-vuzov" },
  { n: 2, title: "Imtihonlarni topshirish", text: "Ingliz tili majburiy, SAT — agar sizga yordam bersa.", guide: "testy" },
  { n: 3, title: "Pul topish", text: "AQShdagi to'liq grantlar, davlat stipendiyalari, bepul davlatlar.", guide: "finansovaya-pomoshch" },
  { n: 4, title: "Esse yozish", text: "Personal statement, «Why us» va o'qituvchilar tavsiyanomalari.", guide: "esse" },
  { n: 5, title: "Arizalarni yuborish", text: "Common App, ED/EA/RD raundlari va moliyaviy anketalar o'z vaqtida.", guide: "raundy-podachi" },
];
