-- Enrich university rows from verified admissions spreadsheets, CSS waiver tables, merit full-ride & Canada datasets
BEGIN;
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ağrı'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Mathematics, Biochemistry, Genetics and Molecular Biology, Psychology, Medicine') WHERE slug = 'a-r-i-brahim-e-en-niversitesi-turkey';
UPDATE public.universities SET notes = 'Ольборгский университет (дат. Aalborg Universitet) — университет в Дании с главным кампусом в Ольборге и филиалами Эсбьерге и Копенгагене. Основан в 1974 году.' WHERE slug = 'aalborg-university-denmark';
UPDATE public.universities SET notes = 'Орхусский университет (дат. Aarhus Universitet) — один из крупнейших университетов в Дании. Основан в 1928 году.' WHERE slug = 'aarhus-university-denmark';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bolu'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Dentistry, Physics and Astronomy, Social Sciences, Medicine, Arts and Humanities'), notes = 'Университет Болу Абант Иззет Байсал — (тур: Bolu Abant İzzet Baysal Üniversitesi) — государственный университет в Болу (Турция). Университет является первым государственный университетом, финансируемый фондом, основанный Законом № 3837 от 3 июля 1992 года.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'abant-i-zzet-baysal-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kayseri'), majors = COALESCE(NULLIF(majors, ''), 'Economics, Econometrics and Finance, Materials Science, Engineering, Biochemistry, Genetics and Molecular Biology, Physics and Astronomy, Computer Science') WHERE slug = 'abdullah-g-l-niversitesi-turkey';
UPDATE public.universities SET notes = 'Университет Абу-Даби (ADU) (араб. جامعة أبوظبي‎) — частный исследовательский университет с главным кампусом в Халифа-Сити, Абу-Даби, Объединённые Арабские Эмираты, и дополнительными кампусами в Эль-Айне, Дубае и Мадинат-Зайид.' WHERE slug = 'abu-dhabi-university-uae';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Adıyaman'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Mathematics, Arts and Humanities, Social Sciences, Agricultural and Biological Sciences, Environmental Science') WHERE slug = 'ad-yaman-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Chemistry, Agricultural and Biological Sciences, Physics and Astronomy, Materials Science') WHERE slug = 'adam-mickiewicz-university-pozna-poland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Adana'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Arts and Humanities, Agricultural and Biological Sciences, Engineering, Chemistry, Decision Sciences'), notes = 'Адана Алпарслан Турецкий университет науки и технологий — государственный университет, основанный в 2011 году в городе Адана, Турция. Университет был учрежден Законом № 6218, принятым Великим Национальным Собранием Турции 31 марта 2011 года.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'adana-bilim-ve-teknoloji-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Garden City, NY'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1140–1310 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, Economics & Social Sciences'), notes = 'Adelphi University is a private university in Garden City, New York, United States.  Adelphi also has centers in Downtown Brooklyn, Hudson Valley, and Suffolk County in addition to a virtual, online campus for remote students.' WHERE slug = 'adelphi-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Aydin'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Veterinary, Business, Management and Accounting, Social Sciences, Biochemistry, Genetics and Molecular Biology, Materials Science') WHERE slug = 'adnan-menderes-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Afyonkarahisar'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Engineering, Mathematics, Medicine, Decision Sciences') WHERE slug = 'afyon-kocatepe-niversitesi-turkey';
UPDATE public.universities SET how_apply_aid = 'Marvin B. Perry Presidential Scholarship • Marvin B. Perry
Presidential Scholarship', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Marvin B. Perry Presidential Scholarship (Full Ride+)'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Health & Medicine, Business & Management, Visual & Performing Arts'), notes = 'Agnes Scott College is a private women''s liberal arts college in Decatur, Georgia.  The college enrolls approximately 1,000 undergraduate and graduate students.

Статистика CDS (BACKUP): ED acceptance: 80%, доля класса по ED: 5.4%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 80%, доля класса по ED: 5.4%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 80%, доля класса по ED: 5.4%, раунды подачи: EA, EA II.' WHERE slug = 'agnes-scott-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kırşehir'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Materials Science, Arts and Humanities, Business, Management and Accounting, Mathematics, Health Professions') WHERE slug = 'ahi-evran-niversitesi-turkey';
UPDATE public.universities SET notes = 'Основан в 1988 году (Ajman).' WHERE slug = 'ajman-university-uae';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Suwon'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Engineering, Materials Science, Computer Science, Neuroscience, Biochemistry, Genetics and Molecular Biology'), notes = 'Университет Аджу (Аджу Тэхаккё) (хангыль 아주 대학교) — университет, расположенный в городе Сувон, Южная Корея. Основан в 1973 году, в 2004 году в нём училось около 11 тысяч студентов.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'ajou-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Antalya'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Social Sciences, Arts and Humanities, Mathematics, Dentistry, Medicine') WHERE slug = 'akdeniz-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Aksaray'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Environmental Science, Decision Sciences, Medicine, Materials Science') WHERE slug = 'aksaray-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Albion, MI'), rate_num = COALESCE(rate_num, 83.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '83.2%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$38,669'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '96%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Communication & Media, Education'), notes = 'Albion College is a private liberal arts college in Albion, Michigan, United States.  The college was founded in 1835, and its undergraduate population was approximately 1,500 students as of fall 2021.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'albion-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Alfred, NY'), rate_num = COALESCE(rate_num, 48.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '48.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,677'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '30%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1280 · ACT 24–31'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Engineering, Business & Management, Psychology, Education, Biological & Biomedical Sciences'), notes = 'Alfred University is a private university in Alfred, New York, United States.  It has a total undergraduate population of approximately 1,600 students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'alfred-university-usa';
UPDATE public.universities SET notes = '~CAD 14,000–20,000 per year (international students), ~CAD 500– 7,000 aid (entrance scholarships + merit awards + bursaries + limited international awards), ~5%–40% coverage

Финансирование в Канаде (CAD): ~CAD 14,000–20,000 per year (international students), ~CAD 500– 7,000 aid (entrance scholarships + merit awards + bursaries + limited international awards), ~5%–40% coverage.' WHERE slug = 'algonquin-college-canada';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$30,689'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '97%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1140–1350 · ACT 25–31'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Physical Sciences, Business & Management, Visual & Performing Arts'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | (2024-25) | Aid form: CSS Profile / Institutional

Статистика CDS (BACKUP): ED acceptance: 17.9%, доля класса по ED: 3%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 17.9%, доля класса по ED: 3%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 17.9%, доля класса по ED: 3%, раунды подачи: ED II, EA.' WHERE slug = 'allegheny-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Alma, MI'), rate_num = COALESCE(rate_num, 65.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '65.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$30,355'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '26%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Education, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences'), notes = 'Alma College is a private liberal arts college in Alma, Michigan, United States.  It enrolls approximately 1,200 students and is accredited by the Higher Learning Commission.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'alma-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Amasya'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Decision Sciences, Mathematics, Materials Science, Computer Science') WHERE slug = 'amasya-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Psychology, Business & Management, Economics & Social Sciences, Communication & Media, Liberal Arts'), notes = 'American International College (AIC) is a private university in Springfield, Massachusetts.' WHERE slug = 'american-international-college-usa';
UPDATE public.universities SET notes = 'Основан в 1995 году (Media City).' WHERE slug = 'american-university-in-dubai-uae';
UPDATE public.universities SET notes = 'Основан в 1997 году (Sharjah).' WHERE slug = 'american-university-of-sharjah-uae';
UPDATE public.universities SET notes = 'AU Emerging Global Leader Scholarship FULL-TUITION; NAMED COMPETITIVE AWARD | Selection: Competitive application, one recipient/year | Intl: Specifically for a visa-requiring international student | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): ED acceptance: 84.7%, доля класса по ED: 47.5%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 84.7%, доля класса по ED: 47.5%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 84.7%, доля класса по ED: 47.5%, раунды подачи: ED II.' WHERE slug = 'american-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request for ISFAA', notes = 'Amherst Financial Aid Policy 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | Avg. international aid award exceeded $82,000 (2024-25) | Aid form: CSS Profile

Полное финансирование: need-blind, покрывает 100% доказанной финансовой потребности.

Официальная политика помощи: Amherst meets 100% of demonstrated financial need for all international students who are admitted to the college and apply for need-based financial aid

Статистика CDS (DREAM): ED acceptance: 35.9%, доля класса по ED: 39.6%.

Статистика CDS (fin aid): ED acceptance: 35.9%, доля класса по ED: 39.6%.

Статистика CDS (EDEARD): ED acceptance: 35.9%, доля класса по ED: 39.6%.' WHERE slug = 'amherst-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Eskişehir') WHERE slug = 'anadolu-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Çanakkale'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Social Sciences, Agricultural and Biological Sciences, Materials Science, Business, Management and Accounting, Arts and Humanities') WHERE slug = 'anakkale-onsekiz-mart-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Основан в 2000 году (Prague).' WHERE slug = 'anglo-american-university-czech-republic';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Çankırı'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Agricultural and Biological Sciences, Materials Science, Decision Sciences, Economics, Econometrics and Finance') WHERE slug = 'ank-r-karatekin-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara') WHERE slug = 'ankara-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Yellow Springs, OH'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Economics & Social Sciences, Liberal Arts, Psychology, Environmental Science, History'), notes = 'Antioch College is a private liberal arts college in Yellow Springs, Ohio, United States.  It was founded in 1850 by the Christian Connection and began operating in 1852 as a non-sectarian institution; politician and education reformer Horace Mann was its first president.

Статистика CDS (BACKUP): раунды подачи: ED II.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'antioch-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Grand Rapids, MI'), tuition_num = COALESCE(tuition_num, 38520), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$38,520 / год'), rate_num = COALESCE(rate_num, 71.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '71.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$27,246'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '85%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 990–1210 · ACT 20–25'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Education, Economics & Social Sciences, Psychology, Liberal Arts, Health & Medicine'), notes = 'The Aquinas College of Higher Studies also known as Aquinas University College is a Sri Lankan nonprofit private Tertiary education institute that provides both academic degrees and vocational training.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'aquinas-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Visual & Performing Arts, Psychology, Economics & Social Sciences, Health & Medicine'), notes = 'Arcadia University is a private university in Cheltenham Township, Pennsylvania, United States, with a Glenside mailing address.  The university enrolls approximately 3,200 undergraduate, master''s, and doctoral students.' WHERE slug = 'arcadia-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'architectural-institute-in-prague-czech-republic';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ardahan'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Chemistry, Biochemistry, Genetics and Molecular Biology, Medicine, Materials Science') WHERE slug = 'ardahan-niversitesi-turkey';
UPDATE public.universities SET notes = 'Arizona State University is a public research university in Tempe, Arizona, United States.  Founded in 1885 as Territorial Normal School by the 13th Arizona Territorial Legislature, the university is one of the largest public universities by enrollment in the United States.' WHERE slug = 'arizona-state-university-tempe-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,219'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '40%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Health & Medicine, Computer Science & IT, Psychology'), notes = 'Arizona State University is a public research university in Tempe, Arizona, United States.  Founded in 1885 as Territorial Normal School by the 13th Arizona Territorial Legislature, the university is one of the largest public universities by enrollment in the United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'arizona-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Artvin'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Arts and Humanities, Social Sciences, Decision Sciences, Agricultural and Biological Sciences, Business, Management and Accounting') WHERE slug = 'artvin-oruh-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara') WHERE slug = 'at-l-m-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Erzurum') WHERE slug = 'atat-rk-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Health & Medicine, Education, Communication & Media'), notes = 'О́бернский университет — американский государственный исследовательский университет в городе Оберн, штат Алабама.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'auburn-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Rock Island, IL'), rate_num = COALESCE(rate_num, 67.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '67.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,193'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '72%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1010–1250 · ACT 21–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Health & Medicine, Education, Psychology, Economics & Social Sciences'), notes = 'Augustana College is a private Lutheran liberal arts college in Rock Island, Illinois, United States.  The college enrolls approximately 2,500 students.

Статистика CDS (fin aid): раунды подачи: #N/A.

Статистика CDS (EDEARD): ED acceptance: 90.1%, доля класса по ED: 10.8%, раунды подачи: EA.' WHERE slug = 'augustana-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$24,372'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '93%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Health & Medicine, History'), notes = 'Austin College is a private liberal arts college affiliated with the Presbyterian Church (USA) and located in Sherman, Texas.  Chartered in November 1849, Austin College remains the oldest institution of higher education in Texas to be operating under its original charter and name as recognized by the State Historical Survey Committee.

Статистика CDS (TARGET): ED acceptance: 100%, доля класса по ED: 3.7%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 100%, доля класса по ED: 3.7%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 100%, доля класса по ED: 3.7%, раунды подачи: EA, EA II.' WHERE slug = 'austin-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Agent Based Modelling Scholarship,Alex Rodgers Travelling Scholarship,  American Australian Association Graduate Education Fund') WHERE slug = 'australian-national-university-anu-australia';
UPDATE public.universities SET notes = 'Основан в 1968 году (Bellaterra (20km outside Barcelona)).' WHERE slug = 'autonomous-university-of-barcelona-uab-spain';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Azusa, CA'), rate_num = COALESCE(rate_num, 79.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '79.5%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 994–1314 · ACT 18–26'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Psychology, Visual & Performing Arts, Liberal Arts, Communication & Media'), notes = 'Azusa Pacific University (APU) is a private evangelical research university in Azusa, California, United States.  The university was founded in 1899 in Whittier, California, with classes first held on March 3, 1900, and degrees offered in 1939.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'azusa-pacific-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Zonguldak'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Physics and Astronomy, Mathematics, Social Sciences, Medicine, Arts and Humanities') WHERE slug = 'b-lent-ecevit-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara') WHERE slug = 'ba-kent-niversitesi-turkey';
UPDATE public.universities SET how_apply_aid = 'Weissman Scholarship + CSS Profile (Global Scholarship) • Weissman Scholarship +
CSS Profile (Global Scholarship) | CSS Waiver: Not provided', notes = 'Babson College is a private business school in Wellesley, Massachusetts, United States specializing in entrepreneurship education.  Founded in 1919 by Roger Babson, the college was established as the Babson Institute in his Wellesley home and initially granted one-year certificates.

Полное финансирование: Global Scholars Program / full-need full ride для иностранцев.

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'babson-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Balıkesir'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Social Sciences, Agricultural and Biological Sciences, Mathematics, Earth and Planetary Sciences, Environmental Science'), notes = 'Университет Балыкесир — (тур. Balıkesir Üniversitesi) — государственный университет в Балыкесире, Турция. Университет был основан в 1992 году.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'bal-kesir-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Full tuition fee or discounts waiver by Bolashaq + €5''000 by Latvian government scholarship (see add. notes on the right)') WHERE slug = 'baltic-international-academy-latvia';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Liberal Arts, Visual & Performing Arts, English & Literature'), notes = 'Бард-колледж — частный гуманитарный колледж свободных искусств и наук, расположенный в городе Аннандейл-на-Гудзоне, округ Датчесс, штат Нью-Йорк.

Полное финансирование: full-ride возможен через combination need + merit (CSS/ISFAA).

Статистика CDS (BACKUP): ED acceptance: 88.9%, доля класса по ED: 8.3%, раунды подачи: ED II, EA, EA II.

Статистика CDS (fin aid): ED acceptance: 88.9%, доля класса по ED: 8.3%, раунды подачи: ED II, EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 88.9%, доля класса по ED: 8.3%, раунды подачи: ED II, EA, EA II.' WHERE slug = 'bard-college-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Women''s college affiliated with Columbia University | Aid form: CSS Profile

Полное финансирование: женский колледж при Columbia, встречает 100% demonstrated need.

Официальная политика помощи: ... Barnard meets full demonstrated need for admitted students, the review of applications for admissions for International Students is need sensitive.

Статистика CDS (DREAM): ED acceptance: 23.9%, доля класса по ED: 46.8%.

Статистика CDS (fin aid): ED acceptance: 23.9%, доля класса по ED: 46.8%.

Статистика CDS (EDEARD): ED acceptance: 23.9%, доля класса по ED: 46.8%.' WHERE slug = 'barnard-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Miami, FL'), tuition_num = COALESCE(tuition_num, 33450), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,450 / год'), rate_num = COALESCE(rate_num, 59.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '59.1%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Public Policy & Social Work, Psychology, Computer Science & IT'), notes = 'Barry University is a private Catholic university in Miami Shores, Florida, United States.  Founded in 1940 by the Adrian Dominican Sisters, it is one of the largest Catholic universities in the Southeast and is located within the Archdiocese of Miami.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'barry-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bartın'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Arts and Humanities, Social Sciences, Mathematics, Chemistry, Materials Science') WHERE slug = 'bart-n-niversitesi-turkey';
UPDATE public.universities SET notes = 'Колледж (имени) Баруха, в некоторых источниках Барухский колледж — государственный колледж в г.  Нью-Йорке, США, в составе системы городского университета Нью-Йорка (CUNY), в районе Роуз-Хилл на Манхэттене.' WHERE slug = 'baruch-college-usa';
UPDATE public.universities SET notes = 'Bates Financial Aid Program NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Test-optional since 1984; meets full need | Aid form: CSS Profile

Полное финансирование: 100% demonstrated need без кредитов (grants + work-study).

Официальная политика помощи: Bates meets 100% of demonstrated financial need for admitted students. As an international student, your financial aid package will consist of scholarship grants and on-campus employment. Note: financial aid packages for international students do not include loans

Статистика CDS (DREAM): ED acceptance: 42.4%, доля класса по ED: 70.3%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 42.4%, доля класса по ED: 70.3%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 42.4%, доля класса по ED: 70.3%, раунды подачи: ED II.' WHERE slug = 'bates-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Batman'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Engineering, Social Sciences, Arts and Humanities, Chemical Engineering, Energy') WHERE slug = 'batman-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bayburt'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Agricultural and Biological Sciences, Engineering, Medicine, Psychology') WHERE slug = 'bayburt-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Communication & Media, Economics & Social Sciences, Psychology'), notes = 'DEBATE / FORENSICS | Selection: Competitive application + debate record review | Intl: Yes, international applicants with debate background eligible | Chapter 8 — Debate & Forensics Scholarships

Статистика CDS (TARGET): ED acceptance: 87.6%, доля класса по ED: 14.8%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 87.6%, доля класса по ED: 14.8%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 87.6%, доля класса по ED: 14.8%, раунды подачи: ED II, EA.' WHERE slug = 'baylor-university-usa';
UPDATE public.universities SET notes = 'Основан в 1784 году.

Статистика CDS (fin aid): раунды подачи: ED II, EA, EA II.

Статистика CDS (EDEARD): раунды подачи: ED II, EA, EA II.' WHERE slug = 'becker-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Nashville, TN'), rate_num = COALESCE(rate_num, 96.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '96.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$30,296'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '74%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1350 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Health & Medicine, Business & Management, Communication & Media, Biological & Biomedical Sciences, Psychology'), notes = 'Belmont University is a private Christian university in Nashville, Tennessee, United States.  Descended from Belmont Women''s College, founded in 1890 by schoolteachers Ida Hood and Susan Heron, the institution was incorporated in 1951 as Belmont College.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'belmont-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, English & Literature, Physical Sciences, Business & Management'), notes = 'Beloit College is a private liberal arts college in Beloit, Wisconsin, United States.  Founded in 1846 when Wisconsin was still a territory, it is the state''s oldest continuously operated college.

Статистика CDS (BACKUP): ED acceptance: 56.3%, доля класса по ED: 3.5%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 56.3%, доля класса по ED: 3.5%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 56.3%, доля класса по ED: 3.5%, раунды подачи: EA, EA II.' WHERE slug = 'beloit-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, English & Literature, Computer Science & IT, Liberal Arts, Economics & Social Sciences, Physical Sciences'), notes = 'Бенингтон-колледж, Беннингтонский колледж — частный колледж свободных искусств, расположенный в пригороде города Беннингтон.  Основан в 1932 году как женский колледж, с 1969 года ведется совместное обучение.

Полное финансирование: полное покрытие возможным пакетом need + Brockway/merit.

Статистика CDS (BACKUP): ED acceptance: 50.8%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 50.8%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 50.8%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.' WHERE slug = 'bennington-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT'), notes = 'Bentley University is a private university in Waltham, Massachusetts, United States.  It was founded in 1917 as a school of accounting and finance in Boston''s Back Bay neighborhood.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'bentley-university-usa';
UPDATE public.universities SET notes = 'FULL TUITION FOR ALL | Selection: Highly competitive, low-income-focused admission | Intl: Yes, but admissions pool skews low-income/Appalachian; competitive for internationals | Chapter 3 — Near-Universal Merit Aid

Полное финансирование: обучение 100% бесплатно (Tuition Promise Scholarship + стипендия на кампусе).

Официальная политика помощи: Berea College is the only school in the United States that provides 100% funding to 100% of enrolled international students .' WHERE slug = 'berea-college-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 50270), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$50,270 / год'), rate_num = COALESCE(rate_num, 49.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '49.9%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Health & Medicine') WHERE slug = 'berklee-college-of-music-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'berlin-institute-of-technology-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Paul, MN'), tuition_num = COALESCE(tuition_num, 42930), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$42,930 / год'), rate_num = COALESCE(rate_num, 91), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$20,145'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1065–1240 · ACT 23–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Education, Biological & Biomedical Sciences, Psychology, Liberal Arts'), notes = 'Bethel University is a private Baptist university and seminary in Arden Hills, Minnesota, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'bethel-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bilecik'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Economics, Econometrics and Finance, Environmental Science, Chemistry, Business, Management and Accounting') WHERE slug = 'bilecik-eyh-edebali-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bingöl'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Materials Science, Physics and Astronomy, Agricultural and Biological Sciences, Engineering, Social Sciences') WHERE slug = 'bing-l-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'La Mirada, CA'), rate_num = COALESCE(rate_num, 60.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '60.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$13,628'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1360 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Business & Management, Health & Medicine, Psychology, Communication & Media, Biological & Biomedical Sciences'), notes = 'Biola University is a private, nondenominational, evangelical Christian university in La Mirada, California, United States.  It was founded in 1908 as the Bible Institute of Los Angeles as a center for biblical and missionary training.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'biola-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Birmingham, AL'), tuition_num = COALESCE(tuition_num, 22750), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$22,750 / год'), rate_num = COALESCE(rate_num, 51.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '51.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1340 · ACT 21–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Health & Medicine, Biological & Biomedical Sciences, Economics & Social Sciences, Visual & Performing Arts'), notes = 'Birmingham–Southern College (BSC) was a private liberal arts college in Birmingham, Alabama.  Founded in 1856, the college was affiliated with the United Methodist Church and was accredited by the Southern Association of Colleges and Schools (SACS).

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'birmingham-southern-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bitlis'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Engineering, Computer Science, Materials Science, Medicine') WHERE slug = 'bitlis-eren-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul') WHERE slug = 'bo-azi-i-niversitesi-turkey';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$6,071'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '29%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Communication & Media, Engineering, Education'), notes = 'Университет штата Айдахо в Бойсе — американский государственный университет в городе Бойсе, штат Айдахо.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'boise-state-university-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholars (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Computer Science & IT, Communication & Media'), notes = 'Gabelli Presidential Scholars Program FULL-TUITION; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'boston-college-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 71372), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$71,372 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1420–1530') WHERE slug = 'boston-university-partial-usa';
UPDATE public.universities SET notes = 'Trustee Scholarship; NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission | Intl: Yes, international freshman applicants automatically considered | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): ED acceptance: 30%, доля класса по ED: 46.3%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 30%, доля класса по ED: 46.3%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 30%, доля класса по ED: 46.3%, раунды подачи: ED II.' WHERE slug = 'boston-university-usa';
UPDATE public.universities SET notes = 'TBowdoin International Aid 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | No-loan policy; test-optional since 1969 | Aid form: CSS Profile

Полное финансирование: need-blind для всех, включая иностранных студентов.

Официальная политика помощи: International students, if admitted to Bowdoin, are considered for Bowdoin institutional financial aid. International applicants should be advised, however, that competition for funding is intense as it is limited.

Статистика CDS (DREAM): ED acceptance: 22.6%, доля класса по ED: 50.3%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 22.6%, доля класса по ED: 50.3%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 22.6%, доля класса по ED: 50.3%, раунды подачи: ED II.' WHERE slug = 'bowdoin-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Yozgat'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Mathematics, Social Sciences, Arts and Humanities, Chemistry, Business, Management and Accounting') WHERE slug = 'bozok-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Peoria, IL'), tuition_num = COALESCE(tuition_num, 39680), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$39,680 / год'), rate_num = COALESCE(rate_num, 76.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,638'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '31%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1300 · ACT 25–31'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Health & Medicine, Computer Science & IT, Visual & Performing Arts, Psychology'), notes = 'Bradley University is a private university in Peoria, Illinois, United States.  Founded in 1897, Bradley University enrolls 5,200 students who are pursuing degrees in more than 100 undergraduate programs and more than 30 graduate programs in five colleges.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'bradley-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 70957), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$70,957 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1390–1520') WHERE slug = 'brandeis-university-partial-usa';
UPDATE public.universities SET how_apply_aid = 'Limited/CSS + Scholarships | CSS Waiver: Not provided', sat = COALESCE(NULLIF(sat, ''), 'SAT 1390–1530 · ACT 31–34'), notes = 'Brandeis University is a private research university in Waltham, Massachusetts, United States.  It is located in the Greater Boston area.

Полное финансирование: 100% demonstrated need для принятых иностранцев (CSS Profile).

Официальная политика помощи: Brandeis strives to meet 100% of demonstrated financial need for all admitted students, including international students.

Статистика CDS (TARGET): ED acceptance: 37.3%, доля класса по ED: 41.1%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 37.3%, доля класса по ED: 41.1%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 37.3%, доля класса по ED: 41.1%, раунды подачи: ED II.' WHERE slug = 'brandeis-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1390–1520'), notes = 'Брандейский университет — частный американский исследовательский университет.  Он располагается в юго-западной части Уолтема, штат Массачусетс, в 14 км к западу от Бостона.' WHERE slug = 'brandeis-usa';
UPDATE public.universities SET notes = '~CAD 14,000–18,500 per year (international students), ~CAD 1,000–10,000+ aid (entrance scholarships + merit awards + bursaries + some program-based scholarships + small international awards), ~5%–70% coverage depending on scholarship level and academic performance

Финансирование в Канаде (CAD): ~CAD 14,000–18,500 per year (international students), ~CAD 1,000–10,000+ aid (entrance scholarships + merit awards + bursaries + some program-based scholarships + small international awards), ~5%–70% coverage depending on scholarship level and academic performance.' WHERE slug = 'brandon-university-canada';
UPDATE public.universities SET notes = 'Университет Бригама Янга — частный университет в Прово, штат Юта, США, основанный Церковью Иисуса Христа святых последних дней (мормоны) в 1875 году и называвшийся поначалу Академия Бригама Янга в честь второго мормонского президента.' WHERE slug = 'brigham-young-university-provo-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$6,046'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '65%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Engineering, Health & Medicine, Computer Science & IT, Economics & Social Sciences'), notes = 'Университет Бригама Янга — частный университет в Прово, штат Юта, США, основанный Церковью Иисуса Христа святых последних дней (мормоны) в 1875 году и называвшийся поначалу Академия Бригама Янга в честь второго мормонского президента.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'brigham-young-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Up to 100%+ accomodation grant after the 1st year of studies for good preformance'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Технический университет в Брно (VUT) (чеш. Vysoké učení technické v Brně, англ. Brno University of Technology, нем. Technische Universität in Brünn) — высшее учебное заведение в городе Брно, Чешская республика.' WHERE slug = 'brno-university-of-technology-czech-republic';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'финансирование ограничено. Иностранные студенты, которые не подают заявку и не получают финансовую помощь при поступлении в Браун, не имеют права на институциональную помощь в последующие годы, даже если финансовое положение студента изменится или спонсор прекратит оказание поддержки.; Brown International Financial Aid 100%; Tier 1: NEED-BLIND (INT

Полное финансирование: need-blind для иностранцев начиная с Class of 2029.

Официальная политика помощи: Brown meets 100% of a student''s demonstrated need, the financial aid award will be equal to the student''s need.

Статистика CDS (DREAM): ED acceptance: 18.2%, доля класса по ED: 46.3%.

Статистика CDS (fin aid): ED acceptance: 18.2%, доля класса по ED: 46.3%.

Статистика CDS (EDEARD): ED acceptance: 18.2%, доля класса по ED: 46.3%.' WHERE slug = 'brown-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Smithfield, RI'), rate_num = COALESCE(rate_num, 65.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '65.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1340 · ACT 28–32'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Mathematics & Statistics, Economics & Social Sciences, Communication & Media, Psychology, Biological & Biomedical Sciences'), notes = 'Bryant University is a private university in Smithfield, Rhode Island, United States.  It has three colleges, the College of Arts and Sciences, School of Health and Behavioral Sciences, and the College of Business, and is accredited by the New England Commission of Higher Education.

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'bryant-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Waiver request form', notes = 'Bryn Mawr Institutional Aid NEED-MET

Полное финансирование: женский LAC, meets 100% demonstrated need (CSS/Waiver form).

Официальная политика помощи: Bryn Mawr College awards need-based financial aid to international students which may consist of grants, loans, and campus employment. The College meets the full demonstrated need for all admitted students

Статистика CDS (TARGET): ED acceptance: 51.7%, доля класса по ED: 47.9%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 51.7%, доля класса по ED: 47.9%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 51.7%, доля класса по ED: 47.9%, раунды подачи: ED II.' WHERE slug = 'bryn-mawr-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$52,976'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '32%'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Engineering, Business & Management, Biological & Biomedical Sciences, Psychology, Education'), notes = 'Bucknell International Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: значительный пакет + Arts/Presidential стипендии до full ride.

Статистика CDS (TARGET): ED acceptance: 63.6%, доля класса по ED: 44.9%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 63.6%, доля класса по ED: 44.9%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 63.6%, доля класса по ED: 44.9%, раунды подачи: ED II.' WHERE slug = 'bucknell-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'buda-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Economics, Econometrics and Finance, Social Sciences, Arts and Humanities'), notes = 'Будапештская школа бизнеса (венг. Budapesti Gazdasági Egyetem) — высшее учебное заведение, расположенное в Будапеште. Основана в 1857 году банкирами Австро-Венгрии для подготовки кадров в сфере экономики по всей империи и Центральной Европе.

STIPENDIUM HUNGARICUM | https://stipendiumhungaricum.hu | Бакалавриат & Магистратура & PhD | Распространяется на 57 университетов Венгрии Бесплатное обучение — полное освобождение от оплаты обучения Ежемесячная стипендия — 43 700 венгерских форинтов в месяц (примерно 110 евро) на покрытие расходов на проживание в Венгрии, выплачивается 12 месяцев в' WHERE slug = 'budapest-university-of-economics-and-business-hungary';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a'), essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'budapest-university-of-technology-and-economics-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bursa'), majors = COALESCE(NULLIF(majors, ''), 'Materials Science, Engineering, Agricultural and Biological Sciences, Decision Sciences, Chemical Engineering, Environmental Science') WHERE slug = 'bursa-teknik-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Busan'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Engineering, Mathematics, Environmental Science, Health Professions, Arts and Humanities'), notes = 'Пусанский университет иностранных языков (кор. 부산 외국어 대학교; Пусан вегуго тэхаккё) — лингвистический университет в Пусане, Республика Корея. Является одним из ведущих корейских высших учебных заведений в области международных отношений и иностранных языков.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'busan-university-of-foreign-studies-korea';
UPDATE public.universities SET notes = 'Основан в 1998 году (Lucerne).' WHERE slug = 'business-amp-hotel-management-school-switzerland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Indianapolis, IN'), rate_num = COALESCE(rate_num, 85.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '85.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1360 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Communication & Media, Economics & Social Sciences, Biological & Biomedical Sciences, Education'), notes = 'Ба́тлеровский университет или Университет Ба́тлера — частный университет в США, расположенный в Индианаполисе, штат Индиана.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'butler-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Partner scholarships, Merit-based, Financial scholarships'), sat = COALESCE(NULLIF(sat, ''), 'N/A') WHERE slug = 'c-sar-ritz-colleges-switzerland-switzerland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'San Francisco, CA'), rate_num = COALESCE(rate_num, 73.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '73.4%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Architecture'), notes = 'The California College of the Arts (CCA) is a private art school in San Francisco, California.  It was founded in Berkeley, California in 1907 and moved to a historic estate in Oakland, California in 1922.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-college-of-the-arts-usa';
UPDATE public.universities SET notes = 'Калифорни́йский технологи́ческий институ́т — частный исследовательский университет, расположенный в городе Пасадина в штате Калифорния, один из ведущих университетов в США, и один из двух самых важных, наряду с Массачусетским технологическим институтом, специализирующихся в точных науках и инженерии.  Входит в десятку лучших университетов мира.' WHERE slug = 'california-institute-of-technology-caltech-usa';
UPDATE public.universities SET total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), '$1.7m'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$51,827'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '37%'), how_apply_aid = 'CSS/Must apply through RD | CSS Waiver: Not provided', early_deadline = COALESCE(NULLIF(early_deadline, ''), '1 ноября'), regular_deadline = COALESCE(NULLIF(regular_deadline, ''), '3 января'), lang = COALESCE(NULLIF(lang, ''), '7.0'), sat = COALESCE(NULLIF(sat, ''), 'optional'), essay = COALESCE(NULLIF(essay, ''), '1 ps, 4 supp'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Physical Sciences, Mathematics & Statistics, Biological & Biomedical Sciences'), notes = 'The California Institute of Technology (branded as Caltech) is a private research university in Pasadena, California, United States.  The university is responsible for many modern scientific advancements and is among a small group of institutes of technology in the United States that are devoted to the instruction of pure and applied sciences.

Официальная политика помощи: Caltech has need-sensitive admission for international citizens. The total amount of financial aid funds is limited for these students, and we remain committed to meeting 100% of the demonstrated need of all admitted students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-institute-of-technology-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'San Luis Obispo, CA'), tuition_num = COALESCE(tuition_num, 30995), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$30,995 / год'), rate_num = COALESCE(rate_num, 29.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '29.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$9,411'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '10%'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Architecture, Computer Science & IT'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-poly-state-u-san-luis-obispo-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 21467), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$21,467 / год'), rate_num = COALESCE(rate_num, 75.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '75.2%'), notes = 'California Polytechnic State University, San Luis Obispo is a public university in San Luis Obispo County, California, United States, outside of the city limits of San Luis Obispo.  Founded in 1901, it is the oldest of three polytechnic universities within the California State University system.' WHERE slug = 'california-polytechnic-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Pomona, CA'), tuition_num = COALESCE(tuition_num, 19319), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$19,319 / год'), rate_num = COALESCE(rate_num, 73.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '73.7%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-state-poly-u-pomona-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Psychology, Economics & Social Sciences, Computer Science & IT, Biological & Biomedical Sciences'), notes = 'California State University, East Bay is a public university in Hayward, California, United States.  The university is part of the California State University system and offers 136 undergraduate and 60 post-baccalaureate areas of study.' WHERE slug = 'california-state-university-east-bay-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Health & Medicine, Communication & Media, Economics & Social Sciences, Visual & Performing Arts'), notes = 'California State University, Fullerton is a public research university in Fullerton, California, United States.  With a total enrollment of more than 41,000, it has the largest student body of the California State University (CSU) system, and its graduate student body of more than 5,000 is one of the largest in the CSU and in all of California.' WHERE slug = 'california-state-university-fullerton-usa';
UPDATE public.universities SET notes = 'California State University, Long Beach, also known in athletics as Long Beach State University (LBSU), is a public research university in Long Beach, California, United States.  The 322-acre (130 ha) campus is the second largest in the California State University system (CSU).' WHERE slug = 'california-state-university-long-beach-long-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Long Beach, CA'), tuition_num = COALESCE(tuition_num, 21658), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$21,658 / год'), rate_num = COALESCE(rate_num, 46.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '46.3%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Engineering, Economics & Social Sciences, Health & Medicine, Psychology'), notes = 'California State University, Long Beach, also known in athletics as Long Beach State University (LBSU), is a public research university in Long Beach, California, United States.  The 322-acre (130 ha) campus is the second largest in the California State University system (CSU).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-state-university-long-beach-usa';
UPDATE public.universities SET notes = 'California State University, Los Angeles is a public research university in Los Angeles, California, United States.  It is part of the California State University system.' WHERE slug = 'california-state-university-los-angeles-los-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Los Angeles, CA'), tuition_num = COALESCE(tuition_num, 20850), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$20,850 / год'), rate_num = COALESCE(rate_num, 91.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$16,264'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '2%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Health & Medicine, Education, Psychology, Communication & Media'), notes = 'California State University, Los Angeles is a public research university in Los Angeles, California, United States.  It is part of the California State University system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-state-university-los-angeles-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Communication & Media, Economics & Social Sciences, Health & Medicine, Visual & Performing Arts'), notes = 'California State University, Northridge, is a public university in the Northridge neighborhood of Los Angeles, California, United States.  With a total enrollment of 36,960 students, it has the fourth largest total student body in the California State University system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'california-state-university-northridge-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Economics & Social Sciences, Psychology, Engineering, Education'), notes = 'California State University, Sacramento is a public university in Sacramento, California, United States.  Founded in 1947 as Sacramento State College, it is part of the California State University system.' WHERE slug = 'california-state-university-sacramento-usa';
UPDATE public.universities SET notes = 'Калифорни́йский технологи́ческий институ́т — частный исследовательский университет, расположенный в городе Пасадина в штате Калифорния, один из ведущих университетов в США, и один из двух самых важных, наряду с Массачусетским технологическим институтом, специализирующихся в точных науках и инженерии.  Входит в десятку лучших университетов мира.' WHERE slug = 'caltech-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Engineering, Education, Economics & Social Sciences, Biological & Biomedical Sciences'), notes = 'Calvin University is a private Christian university in Grand Rapids, Michigan, United States.  Founded in 1876, Calvin University is an educational institution of the Christian Reformed Church and stands in the Reformed (Calvinist) tradition.' WHERE slug = 'calvin-college-usa';
UPDATE public.universities SET notes = 'Основан в 2006 году (City walk).' WHERE slug = 'canadian-university-in-dubai-uae';
UPDATE public.universities SET notes = '~CAD 18,000–25,000 per year (international undergraduate tuition), ~CAD 500–10,000 aid (entrance scholarships + merit-based awards + bursaries + international student awards), ~5%–50% coverage depending on GPA and scholarship level

Финансирование в Канаде (CAD): ~CAD 18,000–25,000 per year (international undergraduate tuition), ~CAD 500–10,000 aid (entrance scholarships + merit-based awards + bursaries + international student awards), ~5%–50% coverage depending on GPA and scholarship level.' WHERE slug = 'cape-breton-university-cbu-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Half-tuition fee is basic available option'), notes = 'Основан в 1985 году (Kowloon).' WHERE slug = 'caritas-francis-hsu-college-hong-kong';
UPDATE public.universities SET how_apply_aid = 'CSS or ISAFA + supplements | CSS Waiver: Not provided', notes = 'Carleton International Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (CSS/ISFAA, конкурентный конкурс).

Официальная политика помощи: Carleton works to meet 100% of every student''s demonstrated financial need. We do accept a few international students every year whose financial need is met through a combination of grants, scholarships, and loans

Статистика CDS (TARGET): ED acceptance: 25.7%, доля класса по ED: 47.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 25.7%, доля класса по ED: 47.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 25.7%, доля класса по ED: 47.4%, раунды подачи: ED II.' WHERE slug = 'carleton-college-usa';
UPDATE public.universities SET notes = 'Основан в 2004 году (Education City in Doha).' WHERE slug = 'carnegie-mellon-university-in-qatar-qatar';
UPDATE public.universities SET notes = 'Университет Карне́ги — Ме́ллона — частный университет и исследовательский центр, расположенный в Питтсбурге.  Основан в 1900 году Эндрю Карнеги как Техническая школа Карнеги, в 1912 году школа получила статус Технологического института Карнеги с правом присвоения четырёхлётней степени.

Статистика CDS (DREAM): ED acceptance: 18.8%, доля класса по ED: 22.1%.

Статистика CDS (fin aid): ED acceptance: 18.8%, доля класса по ED: 22.1%.

Статистика CDS (EDEARD): ED acceptance: 18.8%, доля класса по ED: 22.1%.' WHERE slug = 'carnegie-mellon-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS + CWRU Scholarships | CSS Waiver: Not provided', majors = COALESCE(NULLIF(majors, ''), 'Engineering, Biological & Biomedical Sciences, Computer Science & IT, Business & Management, Health & Medicine, Economics & Social Sciences'), notes = 'Andrew Squire Scholarship HIGH; NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission based on stats | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Официальная политика помощи: Case Western Reserve University offers a limited amount of need-based aid to first- year and transfer international applicants

Статистика CDS (TARGET): ED acceptance: 39%, доля класса по ED: 19.7%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 39%, доля класса по ED: 19.7%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 39%, доля класса по ED: 19.7%, раунды подачи: ED II, EA.' WHERE slug = 'case-western-reserve-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Salisbury, NC'), tuition_num = COALESCE(tuition_num, 33400), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,400 / год'), rate_num = COALESCE(rate_num, 77.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$30,558'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1010–1186 · ACT 20–25'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Education, Health & Medicine, Biological & Biomedical Sciences, Environmental Science, Economics & Social Sciences'), notes = 'Catawba College is a private college in Salisbury, North Carolina.  Founded in 1851 by the North Carolina Classis of the Reformed Church in Newton, the college adopted its name from its county of origin, Catawba County, before moving to its current home of Salisbury in 1925.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'catawba-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Washington, DC'), rate_num = COALESCE(rate_num, 83.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '83.8%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Health & Medicine, Engineering, Psychology, Architecture'), notes = 'Catholic higher education includes universities, colleges, and other institutions of higher education privately run by the Catholic Church, typically by religious institutes.  Those tied to the Holy See are specifically called pontifical universities.

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'catholic-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Medicine, Computer Science, Earth and Planetary Sciences, Dentistry, Biochemistry, Genetics and Molecular Biology, Arts and Humanities'), notes = 'Университет Гонконга (англ. The University of Hong Kong или HKU; кит. 香港大學) — старейшее высшее учебное заведение Гонконга, основанное в 1911 году в период зависимости Гонконга от Великобритании.' WHERE slug = 'centennial-college-hong-kong';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 55490), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$55,490 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1450') WHERE slug = 'centre-college-partial-usa';
UPDATE public.universities SET notes = 'NAMED COMPETITIVE AWARD | Selection: Competitive application, mentoring included | Intl: Yes -- explicitly intl.-eligible; min. IELTS 7.0 or TOEFL 90 | Chapter 5 — Named Competitive Full-Ride Programs

Полное финансирование: Lincoln Scholars / Brown Fellows — полный грант по merit.

Статистика CDS (BACKUP): ED acceptance: 87.7%, доля класса по ED: 18%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 87.7%, доля класса по ED: 18%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 87.7%, доля класса по ED: 18%, раунды подачи: EA.' WHERE slug = 'centre-college-usa';
UPDATE public.universities SET notes = 'Основан в 1999 году (Valencia).' WHERE slug = 'ceu-cardenal-herrera-university-spain';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'chalmers-university-of-technology-sweden';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Burlington, VT'), rate_num = COALESCE(rate_num, 66.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '66.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1165–1340 · ACT 27–31'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Business & Management, Visual & Performing Arts'), notes = 'Champlain College is a private college in Burlington, Vermont, United States.  Founded in 1878, Champlain offers on-campus undergraduate and online undergraduate courses through Champlain College Online, along with online certificate and degree programs and master''s degree programs, in over 80 subject areas.' WHERE slug = 'champlain-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Communication & Media, Psychology, Health & Medicine, Biological & Biomedical Sciences'), notes = 'Chapman University is a private research university in Orange, California, United States.  Encompassing eleven colleges, the university is classified among "R2: Doctoral Universities – High research activity".

Статистика CDS (TARGET): ED acceptance: 58.7%, доля класса по ED: 6.9%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 58.7%, доля класса по ED: 6.9%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 58.7%, доля класса по ED: 6.9%, раунды подачи: EA.' WHERE slug = 'chapman-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition fee') WHERE slug = 'charles-university-czech-republic';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gwangju'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Engineering, Materials Science, Energy, Pharmacology, Toxicology and Pharmaceutics') WHERE slug = 'chonnam-national-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gwangju'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Medicine, Dentistry, Immunology and Microbiology, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'chosun-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Newport News, VA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$6,025'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '22%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1300 · ACT 23–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Computer Science & IT, Communication & Media'), notes = 'Университет Кристофера Ньюпорта, или CNU — государственный гуманитарный университет, расположенный в городе Ньюпорт-Ньюс, штат Виргиния, США.

Статистика CDS (BACKUP): ED acceptance: 85.1%, доля класса по ED: 28.6%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 85.1%, доля класса по ED: 28.6%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 85.1%, доля класса по ED: 28.6%, раунды подачи: EA.' WHERE slug = 'christopher-newport-university-usa';
UPDATE public.universities SET notes = 'Hong Kong Chu Hai College is a private degree-granting institute in Tuen Mun, New Territories, Hong Kong.  At present, Chu Hai College is recognised as an Approved Post Secondary College under the Post Secondary Colleges Ordinance.' WHERE slug = 'chu-hai-college-of-higher-education-hong-kong';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Cheongju-si'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Medicine, Agricultural and Biological Sciences, Materials Science, Veterinary, Engineering') WHERE slug = 'chungbuk-national-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daejeon'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Biochemistry, Genetics and Molecular Biology, Agricultural and Biological Sciences, Energy, Environmental Science, Materials Science') WHERE slug = 'chungnam-national-university-korea';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Тюо (яп. 中央大学 тю:о:-дайгаку) — частный университет в Японии. Расположен в городе Хатиодзи (префектура Токио).' WHERE slug = 'chuo-university-japan';
UPDATE public.universities SET notes = 'Городской университет Гонконга — общественный исследовательский университет, расположенный в Гонконге, в районе Коулун-Тхон.  Предлагает более 50 программ для получения степени бакалавра, а также последипломные программы в школе Chow Yei Ching School of Graduate Studies.' WHERE slug = 'city-university-of-hong-kong-hong-kong';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', sat = COALESCE(NULLIF(sat, ''), 'SAT 1450–1560 · ACT 33–35'), notes = 'CMC International Scholars Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Part of the Claremont Consortium | Aid form: CSS Profile

Полное финансирование: full ride возможен (редко), meets 100% demonstrated need.

Официальная политика помощи: CMC is committed to meeting 100% of demonstrated need of all admitted students, regardless of citizenship. However, as a "need aware" institution, CMC takes into account a student''s ability to pay the full-cost of attendance as a part of admission criteria for applicants that are not U.S. citizens or U.S. Permanent Residents. CMC has limited financial resources for international students.

Статистика CDS (DREAM): ED acceptance: 28.2%, доля класса по ED: 59.5%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 28.2%, доля класса по ED: 59.5%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 28.2%, доля класса по ED: 59.5%, раунды подачи: ED II.' WHERE slug = 'claremont-mckenna-college-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 61140), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$61,140 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1288–1460') WHERE slug = 'clark-university-partial-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential LEEP Scholarship (Full Ride)'), notes = 'NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): ED acceptance: 63%, доля класса по ED: 5.1%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 63%, доля класса по ED: 5.1%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 63%, доля класса по ED: 5.1%, раунды подачи: ED II, EA.' WHERE slug = 'clark-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$24,151'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '88%'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Biological & Biomedical Sciences, Computer Science & IT, Psychology, Environmental Science'), notes = 'Университет Кларксона — частный исследовательский университет в Потсдаме с филиалами в городе Нью-Йорке, Саранак-Лейке, Скенектади и Биконе.  Основан в 1896 году, к началу 2022/2023 учебного года общее количество зарегистрированных студентов составляло 3719 человек, в том числе 1051 человек на программах выше бакалавреата.

Статистика CDS (BACKUP): ED acceptance: 83%, доля класса по ED: 14.2%.

Статистика CDS (fin aid): ED acceptance: 83%, доля класса по ED: 14.2%.

Статистика CDS (EDEARD): ED acceptance: 83%, доля класса по ED: 14.2%.' WHERE slug = 'clarkson-university-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'National Scholars (Full Ride +)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Health & Medicine, Economics & Social Sciences, Psychology'), notes = 'National Scholars Program

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'clemson-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile | CSS Waiver: Request via email', notes = 'Colby Commitment NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для иностранцев, без application fee.

Официальная политика помощи: Colby meets 100 percent of the full demonstrated need of all admitted students, for all four years, regardless of citizenship—including more than $5.4 million to more than 102 international students in the 2016-2017 academic year

Статистика CDS (DREAM): ED acceptance: 43.4%, доля класса по ED: 64.6%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 43.4%, доля класса по ED: 64.6%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 43.4%, доля класса по ED: 64.6%, раунды подачи: ED II.' WHERE slug = 'colby-college-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', notes = 'Colgate Commitment 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy introduced 2021 | Aid form: CSS Profile

Официальная политика помощи: Colgate is committed to meeting 100 percent of the demonstrated financial need of accepted students.

Статистика CDS (TARGET): ED acceptance: 46.4%, доля класса по ED: 55.6%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 46.4%, доля класса по ED: 55.6%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 46.4%, доля класса по ED: 55.6%, раунды подачи: ED II.' WHERE slug = 'colgate-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Charleston, SC'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1300 · ACT 24–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Communication & Media, Visual & Performing Arts'), notes = 'Чарлстонский колледж — государственный университет, расположенный в историческом центре города Чарлстона, штат Южная Каролина, США.

Статистика CDS (BACKUP): ED acceptance: 82%, доля класса по ED: 10.1%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 82%, доля класса по ED: 10.1%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 82%, доля класса по ED: 10.1%, раунды подачи: EA.' WHERE slug = 'college-of-charleston-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Health & Medicine, Psychology, Business & Management, Education, Communication & Media'), notes = 'The College of Saint Benedict and Saint John''s University (CSBSJU) are two closely related private, Benedictine liberal arts colleges in Minnesota.  The College of Saint Benedict is a college for women in St.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'college-of-saint-benedict-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Duluth, MN'), rate_num = COALESCE(rate_num, 93.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '93.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,702'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '88%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1190'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Biological & Biomedical Sciences, Business & Management, Public Policy & Social Work, Psychology, Education'), notes = 'The College of St.  Scholastica (CSS) is a private Benedictine college in Duluth, Minnesota, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'college-of-saint-scholastica-usa';
UPDATE public.universities SET notes = 'College of the Atlantic (COA) is a private liberal arts college in Bar Harbor on Mount Desert Island, Maine.  Founded in 1969, it awards two degrees, a Bachelor of Arts and a Master of Philosophy (MPhil) degree solely in the field of human ecology, using an interdisciplinary approach to learning.' WHERE slug = 'college-of-the-atlantic-bar-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bar Harbor, ME'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$47,595'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1240–1430'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts'), notes = 'College of the Atlantic (COA) is a private liberal arts college in Bar Harbor on Mount Desert Island, Maine.  Founded in 1969, it awards two degrees, a Bachelor of Arts and a Master of Philosophy (MPhil) degree solely in the field of human ecology, using an interdisciplinary approach to learning.

Статистика CDS (BACKUP): ED acceptance: 80.8%, доля класса по ED: 40%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 80.8%, доля класса по ED: 40%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 80.8%, доля класса по ED: 40%, раунды подачи: ED II.' WHERE slug = 'college-of-the-atlantic-usa';
UPDATE public.universities SET notes = 'Колледж Святого Креста — частный гуманитарный католический университет в г.  Вустер, штат Массачусетс, США.

Статистика CDS (TARGET): ED acceptance: 82.9%, доля класса по ED: 49.8%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 82.9%, доля класса по ED: 49.8%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 82.9%, доля класса по ED: 49.8%, раунды подачи: ED II.' WHERE slug = 'college-of-the-holy-cross-usa';
UPDATE public.universities SET notes = '~CAD 8,000–15,000 per year (international students), ~CAD 500– 5,000 aid (entrance scholarships + merit awards + bursaries + limited international awards), ~5%–40% coverage

Финансирование в Канаде (CAD): ~CAD 8,000–15,000 per year (international students), ~CAD 500– 5,000 aid (entrance scholarships + merit awards + bursaries + limited international awards), ~5%–40% coverage.' WHERE slug = 'college-of-the-north-atlantic-canada';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'NA'), notes = 'Основан в 1997 году (near Education City in Doha).' WHERE slug = 'college-of-the-north-atlantic-qatar-qatar';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Business & Management, Psychology, Physical Sciences, History'), notes = 'Колледж Вильгельма и Марии — государственный исследовательский университет штата Виргиния в городе Уильямсберге.

Статистика CDS (TARGET): ED acceptance: 49.2%, доля класса по ED: 37.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 49.2%, доля класса по ED: 37.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 49.2%, доля класса по ED: 37.4%, раунды подачи: ED II.' WHERE slug = 'college-of-william-and-mary-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$33,353'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '97%'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Computer Science & IT, Physical Sciences, Communication & Media'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Known for independent study program | Aid form: CSS Profile

Статистика CDS (TARGET): ED acceptance: 58.7%, доля класса по ED: 21.7%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 58.7%, доля класса по ED: 21.7%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 58.7%, доля класса по ED: 21.7%, раунды подачи: ED II, EA.' WHERE slug = 'college-of-wooster-usa';
UPDATE public.universities SET notes = 'Colorado College Financial Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Accept. rate: 12-16% (2024-25)

Полное финансирование: block plan, meets 100% demonstrated need.

Статистика CDS (DREAM): ED acceptance: 27.2%, доля класса по ED: 59.1%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 27.2%, доля класса по ED: 59.1%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 27.2%, доля класса по ED: 59.1%, раунды подачи: ED II, EA.' WHERE slug = 'colorado-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Golden, CO'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Mathematics & Statistics'), notes = 'The Colorado School of Mines (Mines) is a public research university in Golden, Colorado, United States.  Founded in 1874, the school offers both undergraduate and graduate degrees in engineering, science, and mathematics, with a focus on energy and the environment.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'colorado-school-of-mines-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 36113), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$36,113 / год'), rate_num = COALESCE(rate_num, 88.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '88.5%'), notes = 'Colorado State University is a public land-grant research university in Fort Collins, Colorado, United States.  It is the flagship university of the Colorado State University System.' WHERE slug = 'colorado-state-university-fort-collins-fort-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Fort Collins, CO'), tuition_num = COALESCE(tuition_num, 33751), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,751 / год'), rate_num = COALESCE(rate_num, 89.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '89.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,128'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '80%'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Engineering, Economics & Social Sciences, Psychology, Communication & Media'), notes = 'Colorado State University is a public land-grant research university in Fort Collins, Colorado, United States.  It is the flagship university of the Colorado State University System.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'colorado-state-university-fort-collins-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Chicago, IL'), tuition_num = COALESCE(tuition_num, 32520), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$32,520 / год'), rate_num = COALESCE(rate_num, 91.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91.2%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Communication & Media, English & Literature, Business & Management, Physical Sciences'), notes = 'Columbia College Chicago (CCC) is a private art college in Chicago, Illinois, United States.  Founded in 1890, it has 4,200 students pursuing degrees in more than 40 undergraduate and graduate degree programs.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'columbia-college-chicago-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Columbia, MO'), tuition_num = COALESCE(tuition_num, 24326), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$24,326 / год'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$20,284'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '97%'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts, Business & Management, Health & Medicine, Public Policy & Social Work, Computer Science & IT, Psychology'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'columbia-college-mo-usa';
UPDATE public.universities SET notes = 'Columbia University in the City of New York, commonly referred to as Columbia University, is a private Ivy League research university in New York City, United States.  Established in 1754 as King''s College by royal charter under George II of Great Britain on the grounds of Trinity Church in Manhattan, it is the oldest institution of higher education in New York and the fifth-oldest in the United States.' WHERE slug = 'columbia-university-college-and-seas-usa';
UPDATE public.universities SET total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), '$13.2m'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$61,773'), how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', notes = 'вуз предоставляет множество ресурсов, чтобы бесплатно познакомиться с культурой НЙ. Также многие студенты получают внешнюю помощь вроде merit-based; Columbia International Student Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets 100% of demonstrated need with no loans | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для принятых иностранцев.

Официальная политика помощи: While Columbia is need-aware for international students, we admit a large number of international students who apply for and receive a substantial amount of financial aid. Columbia meets 100% of the demonstrated financial need for international students admitted as first-years and transfers pursuing their first degree.

Статистика CDS (DREAM): ED acceptance: 15%.' WHERE slug = 'columbia-university-usa';
UPDATE public.universities SET notes = 'Университет Комплутенсе (исп. Universidad Complutense de Madrid) — крупнейшее высшее учебное заведение Испании, государственный университет.' WHERE slug = 'complutense-university-of-madrid-ucm-spain';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Legible copy of official results of grades received on secondary level baccalaureate exams; ~CAD 28,000–55,000 per year (international undergraduate tuition varies by faculty), ~CAD 2,000–full tuition aid (entrance scholarships + merit- based awards + International Students Scholarships + need- based bursaries + faculty awards), ~5% –100% coverage

Финансирование в Канаде (CAD): ~CAD 28,000–55,000 per year (international undergraduate tuition varies by faculty), ~CAD 2,000–full tuition aid (entrance scholarships + merit- based awards + International Students Scholarships + need- based bursaries + faculty awards), ~5% –100% coverage depending on GPA and award level.' WHERE slug = 'concordia-university-canada';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 70266), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$70,266 / год'), how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', sat = COALESCE(NULLIF(sat, ''), 'SAT 1350–1500') WHERE slug = 'connecticut-colege-usa';
UPDATE public.universities SET notes = 'Conn College Financial Grant NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Официальная политика помощи: Financial aid for international students. Connecticut College meets full demonstrated financial need of all applicants regardless of citizenship

Статистика CDS (TARGET): ED acceptance: 58.3%, доля класса по ED: 52.8%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 58.3%, доля класса по ED: 52.8%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 58.3%, доля класса по ED: 52.8%, раунды подачи: ED II.' WHERE slug = 'connecticut-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), rate_num = COALESCE(rate_num, 19.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '19.1%'), total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), '$3.7m'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$26,082'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1400–1520 · ACT 33–34'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Visual & Performing Arts, Architecture'), notes = 'The Cooper Union for the Advancement of Science and Art, commonly known as Cooper Union, is a private college on Cooper Square in Manhattan, New York City.  Peter Cooper founded the institution in 1859 after learning about the government-supported École Polytechnique in France.

Официальная политика помощи: As an all honors college, every admitted student receives a half-tuition scholarship valued at approximately $21,000 per academic year (2017-2018). Students will automatically be considered for additional merit based scholarship through the admissions process.' WHERE slug = 'cooper-union-usa';
UPDATE public.universities SET notes = 'Основан в 1917 году (Copenhagen).' WHERE slug = 'copenhagen-business-school-cbs-denmark';
UPDATE public.universities SET notes = 'Основан в 2009 году (Copenhagen).' WHERE slug = 'copenhagen-school-of-design-and-technology-denmark';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 54776), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$54,776 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1120–1285') WHERE slug = 'cornell-college-partial-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$22,737'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '99%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1318 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Computer Science & IT, Engineering, Visual & Performing Arts'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | One-Course-At-A-Time block schedule; not Cornell University | Aid form: Institutional

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'cornell-college-usa';
UPDATE public.universities SET notes = 'Endowed Scholarships - еще одна стипендия от выпускников корнелла https://finaid.cornell.edu/types-aid/grants-and-scholarships/cornell-grants-scholarships; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted international students | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (need-aware для иностранцев).

Официальная политика помощи: …students who are admitted and have applied for financial aid and have demonstrated financial need will receive a financial aid package that meets 100% of their demonstrated financial need (Cornell University does not provide partial financial aid awards)

Статистика CDS (DREAM): ED acceptance: 22.7%, доля класса по ED: 43.8%.

Статистика CDS (fin aid): ED acceptance: 22.7%, доля класса по ED: 43.8%.

Статистика CDS (EDEARD): ED acceptance: 22.7%, доля класса по ED: 43.8%.' WHERE slug = 'cornell-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a'), essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'corvinus-university-of-budapest-hungary';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Physical Sciences'), notes = 'Крейтонский университет — американский частный католический университет, руководимый иезуитами; находится в городе Омаха, штат Небраска.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'creighton-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Partner scholarships, Merit-based, Financial scholarships'), sat = COALESCE(NULLIF(sat, ''), 'N/A') WHERE slug = 'culinary-arts-academy-switzerland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Sivas'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Chemistry, Environmental Science, Arts and Humanities, Dentistry, Decision Sciences') WHERE slug = 'cumhuriyet-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Psychology, Economics & Social Sciences, Communication & Media'), notes = 'Baruch College is a public college in Manhattan, New York, United States.  It is a constituent college of the City University of New York system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'cuny-baruch-college-usa';
UPDATE public.universities SET notes = 'Колледж (имени) Баруха, в некоторых источниках Барухский колледж — государственный колледж в г.  Нью-Йорке, США, в составе системы городского университета Нью-Йорка (CUNY), в районе Роуз-Хилл на Манхэттене.' WHERE slug = 'cuny-bernard-m-baruch-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Education, Computer Science & IT, Visual & Performing Arts, Health & Medicine'), notes = 'Бруклинский колледж — один из колледжей Городского университета Нью-Йорка.  Расположен в Бруклине, Нью-Йорк.' WHERE slug = 'cuny-brooklyn-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Psychology, Engineering, Economics & Social Sciences, Biological & Biomedical Sciences, Visual & Performing Arts, Education'), notes = 'Городской колледж Нью-Йорка — основной и старейший колледж Городского университета Нью-Йорка (CUNY).  Его кампус площадью около 14 га расположен вдоль Конвент-авеню, в районе Гамильтон-Хайтс на Манхэттене.' WHERE slug = 'cuny-city-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Psychology, Economics & Social Sciences, Computer Science & IT, Public Policy & Social Work'), notes = 'Lehman College is a public college in New York City, United States.  Founded in 1931 as the Bronx campus of Hunter College, it became an independent college in 1967.' WHERE slug = 'cuny-lehman-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Australian Year 12 Scholarship, Alumni & Family Scholarship, Merit Scholarship') WHERE slug = 'curtin-university-australia';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 6000), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$6,000 / год'), rate_num = COALESCE(rate_num, 7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '7%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts') WHERE slug = 'curtis-institute-of-music-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics, Econometrics and Finance, Environmental Science, Business, Management and Accounting, Arts and Humanities, Energy, Agricultural and Biological Sciences'), notes = 'Основан в 1997 году (Northern Nicosia).' WHERE slug = 'cyprys-international-university-turkish-republic-of-northern-cyprus';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'czech-agricultural-university-czech-republic';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Engineering, Computer Science, Earth and Planetary Sciences, Mathematics') WHERE slug = 'czech-technical-university-in-prague-czech-republic';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Düzce'), majors = COALESCE(NULLIF(majors, ''), 'Mathematics, Engineering, Social Sciences, Materials Science, Arts and Humanities, Computer Science') WHERE slug = 'd-zce-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gyeongsan-si'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Physics and Astronomy, Medicine, Pharmacology, Toxicology and Pharmaceutics, Health Professions, Environmental Science') WHERE slug = 'daegu-catholic-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daegu'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Health Professions, Earth and Planetary Sciences, Engineering, Energy, Environmental Science') WHERE slug = 'daegu-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daejeon'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Health Professions, Agricultural and Biological Sciences, Pharmacology, Toxicology and Pharmaceutics, Engineering, Nursing') WHERE slug = 'daejeon-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Amherst, NY'), tuition_num = COALESCE(tuition_num, 33724), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,724 / год'), rate_num = COALESCE(rate_num, 76.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76.2%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,835'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Liberal Arts, Visual & Performing Arts, Education, Psychology'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'daemon-college-usa';
UPDATE public.universities SET notes = '1) essays, references and interviews aren''t required for admission.; ~CAD 30,000–50,000 per year (international undergraduate varies by faculty), ~CAD 3,000–full ride aid (merit scholarships + entrance awards + need-based bursaries + faculty scholarships + International Tuition Guarantee + leadership awards), ~10%–100% coverage

Финансирование в Канаде (CAD): ~CAD 30,000–50,000 per year (international undergraduate varies by faculty), ~CAD 3,000–full ride aid (merit scholarships + entrance awards + need-based bursaries + faculty scholarships + International Tuition Guarantee + leadership awards), ~10%–100% coverage.' WHERE slug = 'dalhousie-university-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Jukjeon-dong'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Engineering, Materials Science, Dentistry, Veterinary, Medicine') WHERE slug = 'dankook-university-korea';
UPDATE public.universities SET notes = 'TDartmouth Financial Aid Program 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | Need-blind for internationals since 2022 | Aid form: CSS Profile

Полное финансирование: need-blind для всех абитуриентов включая иностранцев, 100% need.

Официальная политика помощи: We will meet 100% of the demonstrated need of all admitted financial aid applicants.

Статистика CDS (DREAM): ED acceptance: 23.2%, доля класса по ED: 48.2%.

Статистика CDS (fin aid): ED acceptance: 23.2%, доля класса по ED: 48.2%.

Статистика CDS (EDEARD): ED acceptance: 23.2%, доля класса по ED: 48.2%.' WHERE slug = 'dartmouth-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '€5''000 by Latvian government scholarship (see add. notes on the right') WHERE slug = 'daugavpils-university-latvia';
UPDATE public.universities SET how_apply_aid = 'If your family makes less than 5000$, use alternative form on admission portal | CSS Waiver: Alternative form on admission portal', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'John Montgomery Belk Scholarship (Full Ride + $6K exp)'), notes = 'The Davidson Trust 100%; NAMED COMPETITIVE AWARD | Selection: High school nomination required | Intl: Yes -- specifically invites international nominees | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy | Aid form: CSS Profile

Полное финансирование: meets 100% need без займов (The Davidson Trust).

Стипендия John Montgomery Belk Scholarship (Full Ride + $6K exp): мин. требования — High School nomination (one candidate per school).

Статистика CDS (DREAM): ED acceptance: 48.7%, доля класса по ED: 65.8%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 48.7%, доля класса по ED: 65.8%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 48.7%, доля класса по ED: 65.8%, раунды подачи: ED II.' WHERE slug = 'davidson-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Alumni Postgraduate bursary, Destination Australia Scholarships International, MBA Bursary') WHERE slug = 'deakin-university-australia';
UPDATE public.universities SET how_apply_aid = 'Denison Certification of Finances • Denison Certification 
of Finances', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'various (Up to $45,000/year)'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Communication & Media, Business & Management, Psychology, Visual & Performing Arts'), notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: щедрые пакеты; ориентир EFC часто от $5,000–10,000/год.

Статистика CDS (TARGET): ED acceptance: 57.4%, доля класса по ED: 54.1%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 57.4%, доля класса по ED: 54.1%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 57.4%, доля класса по ED: 54.1%, раунды подачи: ED II.' WHERE slug = 'denison-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Social Sciences, Agricultural and Biological Sciences, Environmental Science, Engineering, Medicine') WHERE slug = 'dennis-gabor-university-of-applied-sciences-hungary';
UPDATE public.universities SET intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '48%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Communication & Media, Computer Science & IT, Economics & Social Sciences, Psychology'), notes = 'Университет Де Поля — частный университет в Чикаго в американском штате Иллинойс.  Был основан в 1898 году французскими лазаристами как католический институт и назван в честь Венсана (Викентия) де Поля.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'depaul-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Computer Science & IT, Biological & Biomedical Sciences, Communication & Media, English & Literature, Psychology'), notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Статистика CDS (BACKUP): ED acceptance: 92.4%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 92.4%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 92.4%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.' WHERE slug = 'depauw-university-usa';
UPDATE public.universities SET intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '77%'), notes = 'Dickinson International Aid NEED-MET; Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: CSS Profile

Полное финансирование: комбинация merit + need-based aid до полного покрытия.

Статистика CDS (TARGET): ED acceptance: 62.5%, доля класса по ED: 42.6%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 62.5%, доля класса по ED: 42.6%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 62.5%, доля класса по ED: 42.6%, раунды подачи: ED II.' WHERE slug = 'dickinson-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Diyarbakır'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Arts and Humanities, Agricultural and Biological Sciences, Social Sciences, Medicine, Environmental Science') WHERE slug = 'dicle-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A') WHERE slug = 'dokuz-eyl-l-university-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Busan'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Engineering, Neuroscience, Biochemistry, Genetics and Molecular Biology, Materials Science, Agricultural and Biological Sciences') WHERE slug = 'dong-a-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Busan'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Engineering, Business, Management and Accounting, Medicine, Mathematics, Health Professions') WHERE slug = 'dongseo-university-korea';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'National Alumni Scholarship (Full Ride)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Health & Medicine, Economics & Social Sciences, Biological & Biomedical Sciences, Visual & Performing Arts'), notes = 'Университет Дрейка — частный университет в Де-Мойне (США).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'drake-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Madison, NJ'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$13,726'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '79%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1320 · ACT 25–31'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Biological & Biomedical Sciences, Psychology, English & Literature, Visual & Performing Arts'), notes = 'Университет Дрю — частный гуманитарный университет в г.  Мэдисон, Нью-Джерси, США.

Статистика CDS (BACKUP): ED acceptance: 79.8%, доля класса по ED: 20.8%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 79.8%, доля класса по ED: 20.8%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 79.8%, доля класса по ED: 20.8%, раунды подачи: ED II, EA.' WHERE slug = 'drew-university-usa';
UPDATE public.universities SET notes = 'Drexel Global Scholar Program FULL-TUITION

Статистика CDS (BACKUP): ED acceptance: 81.9%, доля класса по ED: 8.6%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 81.9%, доля класса по ED: 8.6%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 81.9%, доля класса по ED: 8.6%, раунды подачи: EA.' WHERE slug = 'drexel-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Waiver request form', notes = 'вуз не особо щедрый на раздачу грантов, но те кто получают - получают больший грант; Karsh International Scholars Program; NAMED COMPETITIVE AWARD | Selection: Nomination + multi-round competitive selection | Intl: Limited international slots -- check current cycle | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED ME

Полное финансирование: Karsh International Scholars + need-based до 100%.

Официальная политика помощи: Duke University expects to enroll 20 to 25 international students whose full demonstrated need has been met with a university-provided need-based aid package.

Статистика CDS (DREAM): ED acceptance: 16.7%.' WHERE slug = 'duke-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Medicine, Immunology and Microbiology, Chemistry, Pharmacology, Toxicology and Pharmaceutics, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'duksung-women-s-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kütahya'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Chemistry, Agricultural and Biological Sciences, Energy, Business, Management and Accounting') WHERE slug = 'dumlup-nar-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Pittsburgh, PA'), rate_num = COALESCE(rate_num, 78.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '78.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,198'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '81%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1350 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Education, Psychology, Computer Science & IT'), notes = 'Университет Святого Духа им.  Дюкейна или для краткости Университет Дюкейн — частный католический университет в Питтсбурге, штат Пенсильвания, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'duquesne-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Earth and Planetary Sciences, Arts and Humanities, Social Sciences'), notes = 'Университет Дарема (англ. The University of Durham), Даремский университет (англ. Durham University) — университет в городе Дарем, Англия. Основан Актом парламента от 1832 года и получил королевскую хартию в 1837 году.' WHERE slug = 'durham-university-uk';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Baja'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Energy, Social Sciences, Environmental Science, Agricultural and Biological Sciences, Arts and Humanities'), notes = 'Университет имени Лоранда Этвёша (венг. Eötvös Loránd Tudományegyetem, ELTE) или Будапештский университет — крупнейший университет Венгрии, находится в её столице Будапеште.

STIPENDIUM HUNGARICUM | https://stipendiumhungaricum.hu | Бакалавриат & Магистратура & PhD | Распространяется на 57 университетов Венгрии Бесплатное обучение — полное освобождение от оплаты обучения Ежемесячная стипендия — 43 700 венгерских форинтов в месяц (примерно 110 евро) на покрытие расходов на проживание в Венгрии, выплачивается 12 месяцев в' WHERE slug = 'e-tv-s-j-zsef-college-hungary';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'e-tv-s-lor-nd-university-hungary';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 55814), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$55,814 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1290') WHERE slug = 'earlham-college-partial-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Psychology, Economics & Social Sciences, Physical Sciences, Computer Science & IT'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Quaker college with strong international % | Aid form: CSS Profile

Статистика CDS (BACKUP): ED acceptance: 74.4%, доля класса по ED: 18.6%.

Статистика CDS (fin aid): ED acceptance: 74.4%, доля класса по ED: 18.6%.

Статистика CDS (EDEARD): ED acceptance: 74.4%, доля класса по ED: 18.6%.' WHERE slug = 'earlham-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Greenville, NC'), tuition_num = COALESCE(tuition_num, 23638), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$23,638 / год'), rate_num = COALESCE(rate_num, 90.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '90.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$25,072'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '50%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1050–1200 · ACT 20–26'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Education, Communication & Media, Psychology'), notes = 'Восточно-каролинский университет — американский государственный университет, расположенный в городе Гринвилл в Северной Каролине.  Является крупнейшим университетом в восточной части штата и 3-м по величине в Северной Каролине.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'east-carolina-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Education, Economics & Social Sciences, Psychology, Computer Science & IT'), notes = 'Eastern Michigan University is a public research university in Ypsilanti, Michigan, United States.  Founded in 1849 as the Michigan State Normal School, it was the fourth normal school established in the United States and the first outside New England.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'eastern-michigan-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Environmental Science, Psychology, Business & Management, Economics & Social Sciences, Visual & Performing Arts'), notes = 'Eckerd College is a private liberal arts college in St.  Petersburg, Florida, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'eckerd-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Izmir'), majors = COALESCE(NULLIF(majors, ''), 'Chemistry, Dentistry, Earth and Planetary Sciences, Agricultural and Biological Sciences, Physics and Astronomy, Materials Science'), notes = 'Эгейский университет (тур. Ege Üniversitesi) — государственный исследовательский университет в Измире, Турция. Он был основан в 1955 году с факультетами медицины и сельского хозяйства.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'ege-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Psychology, Economics & Social Sciences, Visual & Performing Arts, Biological & Biomedical Sciences'), notes = 'Elon University is a private university in Elon, North Carolina, United States.  Founded in 1889 as Elon College, the university is organized into six schools, most of which offer bachelor''s degrees and several of which offer master''s degrees or professional doctorate degrees.

Статистика CDS (BACKUP): ED acceptance: 88%, доля класса по ED: 19.8%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 88%, доля класса по ED: 19.8%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 88%, доля класса по ED: 19.8%, раунды подачи: EA.' WHERE slug = 'elon-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daytona Beach, FL'), rate_num = COALESCE(rate_num, 66.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '66.3%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1140–1350 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Physical Sciences, Mathematics & Statistics, Biological & Biomedical Sciences'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'embry-riddle-aeronautical-u-daytona-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Prescott, AZ'), rate_num = COALESCE(rate_num, 75.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '75.2%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1360 · ACT 24–29'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Economics & Social Sciences, Business & Management, Physical Sciences, Psychology'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'embry-riddle-aeronautical-u-prescott-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Boston, MA'), rate_num = COALESCE(rate_num, 47.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '47.5%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1250–1410 · ACT 30–33'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Communication & Media, Business & Management, English & Literature'), notes = 'Колледж Эмерсон — частный университет, расположенный в центре города Бостон, штат Массачусетс.  Основан в 1880 году Чарльзом Уэсли Эмерсоном как «школа ораторского искусства и только как всеобъемлющий колледж, посвященный исключительно преподаванию коммуникации и искусства в гуманитарном контексте».

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'emerson-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Emory, VA'), rate_num = COALESCE(rate_num, 96.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '96.3%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1030–1240 · ACT 21–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Education, Visual & Performing Arts, Biological & Biomedical Sciences, Communication & Media'), notes = 'Emory & Henry University is a private university in Emory, Virginia, United States.  The campus lies on 335 acres (1.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'emory-and-henry-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Oxford, GA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$48,795'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1450–1550 · ACT 33–35'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts'), notes = 'Emory University is a private research university in Atlanta, Georgia, United States.  It was founded in 1836 as Emory College by the Methodist Episcopal Church and named in honor of Methodist bishop John Emory.

Статистика CDS (DREAM): ED acceptance: 22.5%, доля класса по ED: 51.2%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 22.5%, доля класса по ED: 51.2%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 22.5%, доля класса по ED: 51.2%, раунды подачи: ED II.' WHERE slug = 'emory-university-oxford-college-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Robert W. Woodruff Scholarship (Full Ride)'), notes = 'Emory UniversiEty Scholar Programs (Woodruff Scholars); NAMED COMPETITIVE AWARD | Selection: Automatic consideration + interview | Intl: Yes, internationals eligible | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need; limited international aid pool | Aid form: CSS Profile

Полное финансирование: Emory Scholars / need-based до 100% (покрывает полную нужду).' WHERE slug = 'emory-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kayseri'), majors = COALESCE(NULLIF(majors, ''), 'Chemistry, Dentistry, Environmental Science, Computer Science, Physics and Astronomy, Social Sciences') WHERE slug = 'erciyes-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Erzincan'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Chemistry, Social Sciences, Business, Management and Accounting, Arts and Humanities, Physics and Astronomy') WHERE slug = 'erzincan-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Erzurum'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Social Sciences, Engineering, Arts and Humanities, Materials Science, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'erzurum-teknik-niversitesi-turkey';
UPDATE public.universities SET notes = 'Основан в 1958 году (Barcelona).' WHERE slug = 'esade-ramon-llull-university-spain';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Eskişehir'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Physics and Astronomy, Chemistry, Arts and Humanities, Environmental Science, Dentistry') WHERE slug = 'eski-ehir-osmangazi-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Eger') WHERE slug = 'eszterh-zy-k-roly-catholic-university-hungary';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Environmental Science, Earth and Planetary Sciences, Physics and Astronomy, Chemistry, Health Professions') WHERE slug = 'eszterh-zy-k-roly-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), rate_num = COALESCE(rate_num, 62.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '62.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,854'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '64%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Communication & Media, Liberal Arts, Psychology, English & Literature'), notes = 'Eugene Michael Lang was an American businessman and philanthropist who founded REFAC Technology Development Corporation in 1951.  REFAC held patents relating to liquid crystal displays, automated teller machines, credit card verification systems, bar code scanners, video cassette recorders, cassette players, camcorders, electronic keyboards, and spreadsheets, and filed thousands of lawsuits against other corporati...

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'eugene-lang-college-the-new-school-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Olympia, WA'), tuition_num = COALESCE(tuition_num, 30980), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$30,980 / год'), rate_num = COALESCE(rate_num, 97.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '97.2%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$17,828'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 890–1260 · ACT 22–26'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts, Business & Management, Visual & Performing Arts, Computer Science & IT, Communication & Media'), notes = 'Колледж вечнозелёного штата — аккредитованный общественный (государственный) гуманитарный колледж США.  Аккредитован NWCCU.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'evergreen-state-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Communication & Media, Psychology, Economics & Social Sciences, Biological & Biomedical Sciences'), notes = 'Fairfield University is a private Catholic university in Fairfield, Connecticut, United States.  It was founded by the Jesuits in 1942.

Статистика CDS (BACKUP): ED acceptance: 77.6%, доля класса по ED: 14.7%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 77.6%, доля класса по ED: 14.7%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 77.6%, доля класса по ED: 14.7%, раунды подачи: ED II, EA.' WHERE slug = 'fairfield-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Teaneck, NJ'), rate_num = COALESCE(rate_num, 95.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '95.9%'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts, Business & Management, Health & Medicine, Psychology, Biological & Biomedical Sciences, Engineering'), notes = 'Fairleigh Dickinson University is a private university with its main campuses in New Jersey, located in Madison / Florham Park and in Teaneck / Hackensack.  Founded in 1942, it offers more than 100 degree programs.' WHERE slug = 'fairleigh-dickinson-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), tuition_num = COALESCE(tuition_num, 16750), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$16,750 / год'), rate_num = COALESCE(rate_num, 57.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '57.6%'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '1%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Business & Management, Communication & Media'), notes = 'The Fashion Institute of Technology (FIT) is a public college and fashion school under the State University of New York, in New York City.  It focuses on art, business, design, mass communication, and technology connected to the fashion industry.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'fashion-institute-of-technology-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Engineering, Computer Science, Psychology, Decision Sciences'), notes = 'Фатих (тур. Fatih) — район провинции Стамбул (Турция), часть города Стамбула, совпадающая с территорией, заключенной внутри бывших стен Константинополя. В районе сосредоточена большая часть главных исторических и культурных достопримечательностей города.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'fatih-sultan-mehmet-vak-f-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'full scholarship (https://www.fau.eu/education/student-life/financing-your-studies/scholarship-organisations/)'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'fau-erlangen-n-rnberg-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Augustine, FL'), tuition_num = COALESCE(tuition_num, 26610), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$26,610 / год'), rate_num = COALESCE(rate_num, 78.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '78.1%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 990–1200 · ACT 19–24'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Visual & Performing Arts, Psychology, Education, Communication & Media'), notes = 'Flagler College is a private liberal arts college in St.  Augustine, Florida, United States.' WHERE slug = 'flagler-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Melbourne, FL'), rate_num = COALESCE(rate_num, 57.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '57.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$17,635'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '61%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1120–1320'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Physical Sciences, Psychology, Computer Science & IT, Biological & Biomedical Sciences'), notes = 'Florida Institute of Technology is a private research university in Melbourne, Florida, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'florida-institute-of-technology-usa';
UPDATE public.universities SET notes = 'Florida Institute of Technology is a private research university in Melbourne, Florida, United States.' WHERE slug = 'florida-institute-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Biological & Biomedical Sciences, Engineering, Computer Science & IT, Economics & Social Sciences'), notes = 'Флоридский международный университет, ФМУ — университет штата, находящийся в Юниверсити-Парке, штат Флорида, США.' WHERE slug = 'florida-international-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 42360), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$42,360 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1310 · ACT 25–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Visual & Performing Arts, Health & Medicine, Communication & Media, Economics & Social Sciences'), notes = 'Florida Southern College is a private college in Lakeland, Florida, United States.  In 2019, the student population at FSC consisted of 3,073 students along with 130 full-time faculty members.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'florida-southern-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,783'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '82%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Health & Medicine, Visual & Performing Arts'), notes = 'Университет штата Флорида — общественный университет США, расположенный в городе Таллахасси, штат Флорида.  Это исследовательский университет с очень высокой исследовательской деятельностью, определяемая Фондом Карнеги.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'florida-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Louis, MO'), tuition_num = COALESCE(tuition_num, 28976), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$28,976 / год'), rate_num = COALESCE(rate_num, 95), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '95%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Education, Health & Medicine, Computer Science & IT, Biological & Biomedical Sciences, Psychology'), notes = 'Fontbonne University was a private Catholic university in Clayton, Missouri, United States.  Fontbonne University, established in 1923 as Fontbonne College, initially served as a women''s college.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'fontbonne-university-usa';
UPDATE public.universities SET notes = 'Presidential Scholarship FULL-TUITION

Статистика CDS (TARGET): раунды подачи: EA.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'fordham-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS or Alternative form | CSS Waiver: Not provided', sat = COALESCE(NULLIF(sat, ''), 'SAT 1298–1460 · ACT 29–32'), notes = 'F&M Financial Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Strong first-gen and international access mission | Aid form: CSS Profile

Полное финансирование: только need-based / 100% need (один из самых доступных селективных LAC).

Официальная политика помощи: Franklin & Marshall will meet 100% of your demonstrated need for all four years

Статистика CDS (fin aid): раунды подачи: #N/A.

Статистика CDS (EDEARD): ED acceptance: 68.6%, доля класса по ED: 60.8%, раунды подачи: ED II.' WHERE slug = 'franklin-marshall-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'friedrich-schiller-universit-t-jena-germany';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$32,627'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based + merit aid for internationals | Aid form: CSS Profile

Стипендия Herman W. Lay Scholarship (Full Ride): мин. требования — Typically 32+ ACT or 1400+ SAT (CR+M).

Стипендия James B. Duke Scholarship (Full Tuition): мин. требования — Typically 32+ ACT or 1400+ SAT (CR+M).

Статистика CDS (BACKUP): ED acceptance: 84.9%, доля класса по ED: 19.8%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 84.9%, доля класса по ED: 19.8%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 84.9%, доля класса по ED: 19.8%, раунды подачи: ED II, EA.' WHERE slug = 'furman-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gümüşhane'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Earth and Planetary Sciences, Social Sciences, Business, Management and Accounting, Decision Sciences, Medicine') WHERE slug = 'g-m-hane-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Decision Sciences, Business, Management and Accounting, Social Sciences, Mathematics, Engineering, Physics and Astronomy'), notes = 'Галатасарайский университет (тур. Galatasaray Üniversitesi) — высшее государственное учебное заведение. Расположен в районе Бешикташ в Стамбуле.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'galatasaray-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Washington, DC'), tuition_num = COALESCE(tuition_num, 18382), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$18,382 / год'), rate_num = COALESCE(rate_num, 60.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '60.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$13,578'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '29%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 750–933 · ACT 14–18'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Communication & Media, Visual & Performing Arts, Public Policy & Social Work, Computer Science & IT'), notes = 'Галлоде́тский университет, университет Галлаудета, Университет Галлодета — частный университет, получивший государственное одобрение, специализирующийся на обучении глухих и слабослышащих студентов; занимает площадь 0,4 км² в Вашингтоне.  Стал первым в мире высшим учебным заведением для глухих и слабослышащих и остаётся единственным в мире высшим учебным заведением, где все учебные программы адаптированы под людей...

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'gallaudet-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Erie, PA'), rate_num = COALESCE(rate_num, 76.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,405'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '31%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Engineering, Biological & Biomedical Sciences, Psychology, Computer Science & IT'), notes = 'Gannon University is a private Catholic university with campuses in Erie, Pennsylvania, and Ruskin, Florida, United States.  Established in 1925, Gannon University enrolls about 4,600 undergraduate and graduate students annually.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'gannon-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Social Sciences, Materials Science, Agricultural and Biological Sciences, Medicine, Arts and Humanities'), notes = 'Университет Гази (тур. Gazi Üniversitesi) — высшее учебное заведение, расположенное в Анкаре. Был основан в 1926 г. распоряжением Кемаля Ататюрка как институт подготовки учителей.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'gazi-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gaziantep'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Social Sciences, Dentistry, Economics, Econometrics and Finance, Mathematics, Engineering') WHERE slug = 'gaziantep-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tokat Province'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Chemistry, Medicine, Agricultural and Biological Sciences, Engineering') WHERE slug = 'gaziosmanpa-a-niversitesi-turkey';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Environmental Science, Social Sciences, Computer Science, Agricultural and Biological Sciences') WHERE slug = 'gdynia-maritime-university-poland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gebze'), majors = COALESCE(NULLIF(majors, ''), 'Materials Science, Environmental Science, Biochemistry, Genetics and Molecular Biology, Physics and Astronomy, Engineering, Energy') WHERE slug = 'gebze-y-ksek-teknoloji-enstit-s-giresun-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Основан в 1973 году (Geneva).' WHERE slug = 'geneva-business-school-switzerland';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,645'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '14%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Health & Medicine, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences'), notes = 'George Mason University (GMU) is a public research university in Fairfax County, Virginia, United States.  Located in Northern Virginia near Washington, D.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'george-mason-university-usa';
UPDATE public.universities SET notes = 'Основан в 2005 году (Education City in Doha).

Полное финансирование: кампус Georgetown в Катаре, щедрая need-based помощь Education City.' WHERE slug = 'georgetown-university-in-qatar-qatar';
UPDATE public.universities SET how_apply_aid = 'Fin aid is very limited/CSS | CSS Waiver: Request via email', sat = COALESCE(NULLIF(sat, ''), 'SAT 1390–1550 · ACT 32–34'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Biological & Biomedical Sciences, Health & Medicine, Psychology, Computer Science & IT'), notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Limited but real need-based aid for internationals | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'georgetown-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Atlanta, GA'), rate_num = COALESCE(rate_num, 14.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '14.1%'), full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'President''s Scholarship and Stamps Scholarship (Up to Full Ride)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1370–1540'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Business & Management, Biological & Biomedical Sciences, Physical Sciences, Mathematics & Statistics'), notes = 'The Georgia Institute of Technology is a public research university and institute of technology in Atlanta, Georgia, United States.  Established in 1885, it has the largest student enrollment of the University System of Georgia, with satellite campuses in Savannah, Georgia, and Metz, France.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'georgia-institute-of-technology-usa';
UPDATE public.universities SET notes = 'The College of Engineering at the Georgia Institute of Technology provides formal education and research in more than 10 fields of engineering, including aerospace, chemical, civil engineering, electrical engineering, industrial, mechanical, materials engineering, biomedical, and biomolecular engineering, plus polymer, textile, and fiber engineering.  The College of Engineering is the oldest and largest college of...' WHERE slug = 'georgia-institute-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Psychology, Visual & Performing Arts, Biological & Biomedical Sciences, Economics & Social Sciences'), notes = 'Университет штата Джорджия — публичный (государственный) исследовательский университет, расположенный в городе Атланта, штат Джорджия.  Основанный в 1913 году, это одно из 10-ти крупнейших высших учебных заведении США и крупнейшее в штате Джорджия: на 2018 год количество учащихся в нём студентов составило 53 000 человека.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'georgia-state-university-usa';
UPDATE public.universities SET notes = 'Gettysburg International Aid NEED-MET; Tier 3: PARTIAL / LIMITED NEED-BASED AID | Aid mainly via STEM Scholars & similar targeted programs | Aid form: CSS Profile

Официальная политика помощи: If admitted, Gettysburg will meet 100% of the students need.

Статистика CDS (TARGET): ED acceptance: 64%, доля класса по ED: 39.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 64%, доля класса по ED: 39.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 64%, доля класса по ED: 39.4%, раунды подачи: ED II.' WHERE slug = 'gettysburg-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ghent') WHERE slug = 'ghent-university-belgium';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Deutscher Akademischer Austauschdienst (DAAD – German Academic Exchange Service)'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'goethe-university-frankfurt-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Spokane, WA'), rate_num = COALESCE(rate_num, 76), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$30,538'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '86%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1220–1410 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Engineering, Economics & Social Sciences, Psychology, Health & Medicine'), notes = 'Университет Гонзага — частный иезуитский университет в Спокане, штат Вашингтон, США.  Основанный в 1887 году Джозефом Катальдо, священником итальянского происхождения и миссионером-иезуитом, университет назван в честь молодого святого иезуита Алоизия Гонзага.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'gonzaga-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Wenham, MA'), rate_num = COALESCE(rate_num, 58.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '58.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$20,552'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1168–1370 · ACT 26–32'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Psychology, Visual & Performing Arts, Communication & Media, Education'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'gordon-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Goshen, IN'), tuition_num = COALESCE(tuition_num, 37760), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$37,760 / год'), rate_num = COALESCE(rate_num, 88.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '88.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$25,963'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '90%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 850–1133 · ACT 23–27'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Environmental Science, Education, Visual & Performing Arts'), notes = 'Goshen College is a private Mennonite liberal arts college in Goshen, Indiana.  Founded in 1894 as the Elkhart Institute of Science, Industry and the Arts, it is affiliated with Mennonite Church USA and accredited by the Higher Learning Commission.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'goshen-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Baltimore, MD'), rate_num = COALESCE(rate_num, 72.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '72.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,582'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '84%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1080–1366 · ACT 26–30'), majors = COALESCE(NULLIF(majors, ''), 'Psychology, Economics & Social Sciences, Business & Management, English & Literature, Visual & Performing Arts, Biological & Biomedical Sciences'), notes = 'Гаучер-колледж — колледж в США, расположенный в городке Таусон, пригороде Балтимора, в штате Мэриленд.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'goucher-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Allendale, MI'), tuition_num = COALESCE(tuition_num, 20820), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$20,820 / год'), rate_num = COALESCE(rate_num, 94.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '94.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,402'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '60%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 940–1190 · ACT 21–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Psychology, Communication & Media, Economics & Social Sciences'), notes = 'Grand Valley State University is a public university in Allendale, Michigan, United States.  It was established in 1960 as Grand Valley State College.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'grand-valley-state-university-usa';
UPDATE public.universities SET notes = 'Основан в 2015 году (Kowloon).' WHERE slug = 'gratia-christian-college-hong-kong';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Remarkable Scholarship, International Student Academic Excellence Scholarship, International Student Academic Merit Scholarship') WHERE slug = 'griffith-university-australia';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 72346), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$72,346 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1410–1540'), notes = 'Гриннеллский колледж, или Гриннелл-колледж — частный гуманитарный университет в городе Гриннелл, Айова, США.' WHERE slug = 'grinnel-college-usa';
UPDATE public.universities SET notes = 'Grinnell International Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | One of the largest per-student endowments in the US | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need + крупные merit-стипендии.

Официальная политика помощи: Grinnell employs a need-aware admission policy for international students. ... Grinnell is committed to meeting 100% of institutionally determined need for admitted international students within our financial aid budget.

Статистика CDS (TARGET): ED acceptance: 56.6%, доля класса по ED: 42.8%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 56.6%, доля класса по ED: 42.8%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 56.6%, доля класса по ED: 42.8%, раунды подачи: ED II.' WHERE slug = 'grinnell-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Peter, MN'), rate_num = COALESCE(rate_num, 61.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '61.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$33,306'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1320'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, Health & Medicine'), notes = 'Gustavus Adolphus College is a private liberal arts college in St.  Peter, Minnesota, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'gustavus-adolphus-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'GIST Scholarship for International Students. tuition fee'), notes = 'Основан в 1993 году (Seoul).' WHERE slug = 'gwangju-institute-of-science-and-technology-south-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Andong'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Immunology and Microbiology, Chemistry, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology, Neuroscience') WHERE slug = 'gyeongkuk-national-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Jinju-si'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Agricultural and Biological Sciences, Mathematics, Computer Science, Physics and Astronomy, Decision Sciences') WHERE slug = 'gyeongsang-national-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara') WHERE slug = 'hacettepe-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Hakkâri'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Arts and Humanities, Social Sciences, Materials Science, Engineering, Chemical Engineering') WHERE slug = 'hakkari-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'NA'), notes = 'Салман ибн Хамад ибн Иса Аль Халифа (род. 21 октября 1969) — бахрейнский государственный деятель, наследный принц Бахрейна, член семьи Аль Халифа. Премьер-министр Бахрейна с 11 ноября 2020 года.' WHERE slug = 'hamad-bin-khalifa-university-qatar';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', notes = 'Hamilton Financial AidX Trust 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для всех принятых.

Официальная политика помощи: Hamilton meets the full demonstrated financial need of every admitted international student for all four years.

Статистика CDS (DREAM): ED acceptance: 41.4%, доля класса по ED: 51%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 41.4%, доля класса по ED: 51%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 41.4%, доля класса по ED: 51%, раунды подачи: ED II.' WHERE slug = 'hamilton-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Paul, MN'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,832'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '80%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1146–1393 · ACT 20–28'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Psychology, Biological & Biomedical Sciences, English & Literature, Visual & Performing Arts'), notes = 'Hamline University is a private university in Saint Paul, Minnesota, United States.  Founded in 1854, it is one of five Associated Colleges of the Twin Cities.

Статистика CDS (BACKUP): ED acceptance: 92.9%, доля класса по ED: 4.8%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 92.9%, доля класса по ED: 4.8%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 92.9%, доля класса по ED: 4.8%, раунды подачи: EA.' WHERE slug = 'hamline-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Amherst, MA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$22,414'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '90%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Biological & Biomedical Sciences, Economics & Social Sciences, English & Literature, Environmental Science, Physical Sciences'), notes = 'Hampshire College is a private liberal arts college in Amherst, Massachusetts, United States.  It was established in 1965 as an experiment in alternative education, in association with four other colleges in the Pioneer Valley: Amherst College, Smith College, Mount Holyoke College, and the University of Massachusetts Amherst.

Статистика CDS (DREAM): ED acceptance: 40.6%, доля класса по ED: 99%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 40.6%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 40.6%, раунды подачи: ED II, EA.' WHERE slug = 'hampshire-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Hampton, VA'), tuition_num = COALESCE(tuition_num, 29162), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$29,162 / год'), rate_num = COALESCE(rate_num, 48.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '48.3%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 857–1226 · ACT 12–24'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Health & Medicine, Liberal Arts, Communication & Media'), notes = 'Hampton University is a private, historically black, research university in Hampton, Virginia, United States.  Founded in 1868 as Hampton Agricultural and Industrial Institute, it was established by Black and White leaders of the American Missionary Association after the American Civil War to provide education to freedmen.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'hampton-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Full-tuition fee is available'), sat = COALESCE(NULLIF(sat, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Computer Science, Earth and Planetary Sciences, Dentistry, Biochemistry, Genetics and Molecular Biology, Arts and Humanities') WHERE slug = 'hang-seng-university-of-hong-kong-hong-kong';
UPDATE public.universities SET notes = 'Университет иностранных языков Хангук (кор. 한국외국어대학교 Хангук вегуго тэхаккё) —— частный университет в Южной Корее.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'hankuk-university-of-foreign-studies-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daejeon'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology, Earth and Planetary Sciences, Mathematics, Engineering, Materials Science') WHERE slug = 'hannam-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Medicine, Engineering, Business, Management and Accounting, Physics and Astronomy, Decision Sciences') WHERE slug = 'hansung-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Sanliurfa'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Agricultural and Biological Sciences, Social Sciences, Mathematics, Arts and Humanities, Veterinary') WHERE slug = 'harran-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'Hartwick College is a private liberal arts college in Oneonta, New York.  The institution''s origin is rooted in the founding of Hartwick Seminary in 1797 through the will of John Christopher Hartwick.' WHERE slug = 'hartwick-college-usa';
UPDATE public.universities SET how_apply_aid = 'CSS or Alternative form | CSS Waiver: Not provided', notes = 'Можно подавать без САТ, но сильно рекомендуется подать. Need-based aid, также могут дать работу для поддержки; Harvard Financial Aid Policy 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | Families under ~$200K/year generally pay $0 tuition | Aid form: CSS Profile

Полное финансирование: need-blind для всех включая иностранцев; при доходе <$85k — $0.

Официальная политика помощи: Admission to Harvard is need-blind, meaning your financial need will not impede your chances of admission

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'harvard-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements So scholarship • CSS Profile + supplements
So scholarship | CSS Waiver: Not provided', notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | STEM-focused; strong engineering program | Aid form: CSS Profile

Полное финансирование: лучший инженерный LAC; комбинация merit + need.

Официальная политика помощи: We are able to meet 100 percent of a family''s demonstrated need for only a handful of international students

Статистика CDS (DREAM): ED acceptance: 19.5%, доля класса по ED: 37.9%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 19.5%, доля класса по ED: 37.9%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 19.5%, доля класса по ED: 37.9%, раунды подачи: ED II.' WHERE slug = 'harvey-mudd-college-usa';
UPDATE public.universities SET notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Limited number of intl aid recipients per class | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (без займов при доходе <$60k).

Официальная политика помощи: There is limited aid available for international students, making admission for such students especially competitive; however, we do meet 100% of the demonstrated need of all admitted students.

Статистика CDS (DREAM): ED acceptance: 43.1%, доля класса по ED: 56.2%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 43.1%, доля класса по ED: 56.2%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 43.1%, доля класса по ED: 56.2%, раунды подачи: ED II.' WHERE slug = 'haverford-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Deutschlandstipendium-стипендия немецкого правительства'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'heidelberg-university-germany';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 39750), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$39,750 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1123–1348') WHERE slug = 'hendrix-college-partial-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Hays Memorial Scholarship (Full Ride)'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Health & Medicine, Computer Science & IT, Physical Sciences'), notes = 'Hendrix College is a private liberal arts college in Conway, Arkansas.  Approximately 1,000 students are enrolled, mostly undergraduates.

Стипендия Hays Memorial Scholarship (Full Ride): мин. требования — 32+ ACT or 1410+ SAT (CR+M) , 3.6+ GPA.' WHERE slug = 'hendrix-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'High Point, NC'), rate_num = COALESCE(rate_num, 76.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1300 · ACT 23–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Visual & Performing Arts, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences'), notes = 'High Point University is a private university in High Point, North Carolina, United States.  Affiliated with the United Methodist Church, the university was founded in 1924 as High Point College (HPC) by the Methodist Protestant Church and the City of High Point, succeeding Yadkin College, another college sponsored by the Methodist Protestant Church between 1856 and 1895.

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'high-point-university-usa';
UPDATE public.universities SET notes = 'Основан в 1988 году (Sharjah).' WHERE slug = 'higher-colleges-of-technology-uae';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Hillsdale, MI'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$31,893'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1340–1510 · ACT 30–33'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Business & Management, English & Literature, History, Mathematics & Statistics'), notes = 'Hillsdale College is a private Christian liberal arts college in Hillsdale, Michigan, United States.  It was founded in 1844 by members of the Free Will Baptists.

Статистика CDS (TARGET): ED acceptance: 61.7%, доля класса по ED: 34.1%.

Статистика CDS (fin aid): ED acceptance: 61.7%, доля класса по ED: 34.1%.

Статистика CDS (EDEARD): ED acceptance: 61.7%, доля класса по ED: 34.1%.' WHERE slug = 'hillsdale-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.hiroshima-u.ac.jp/en/husa/applprocedure'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Хиросимы (яп. 広島大学,ひろしまだいがく; англ. Hiroshima University) — высшее учебное заведение в Японии. Открыто в 1949 году.' WHERE slug = 'hiroshima-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Çorum'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Medicine, Environmental Science, Psychology, Economics, Econometrics and Finance') WHERE slug = 'hitit-niversitesi-turkey';
UPDATE public.universities SET notes = 'The Hong Kong College of Technology is a private vocational college in Hong Kong that provides a range of sub-degree programmes.  It was founded on 1 August 1947 as the Mong Kok Workers'' Night School.' WHERE slug = 'hkct-hong-kong-college-of-technology-hong-kong';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Psychology, Communication & Media, Biological & Biomedical Sciences, Architecture, Physical Sciences'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Coordinate colleges sharing one campus | Aid form: CSS Profile

Статистика CDS (BACKUP): ED acceptance: 85.5%, доля класса по ED: 45.2%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 85.5%, доля класса по ED: 45.2%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 85.5%, доля класса по ED: 45.2%, раунды подачи: ED II.' WHERE slug = 'hobart-and-william-smith-colleges-usa';
UPDATE public.universities SET notes = 'Hobart and William Smith Colleges is a private liberal arts college in Geneva, New York.  It traces its origins to Geneva Academy established in 1797.' WHERE slug = 'hobart-william-smith-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Trustee Scholars (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Communication & Media, Psychology, Economics & Social Sciences, Visual & Performing Arts'), notes = 'Университет Хофстра — американский частный университет в Хемпстеде, штат Нью-Йорк.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'hofstra-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.global.hokudai.ac.jp/admissions/student-financial-aid/'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Хоккайдо (яп. 北海道大学 Хоккайдо Дайгаку, или 北大 Хокудай) — национальный университет Японии. Он является одним из 7 национальных университетов.' WHERE slug = 'hokkaido-university-japan';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$43,767'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1330 · ACT 23–29'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Economics & Social Sciences, Psychology, English & Literature, Biological & Biomedical Sciences, History'), notes = 'NAMED COMPETITIVE AWARD | Selection: Invitation-based, top of admission pool | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (BACKUP): ED acceptance: 90.9%, доля класса по ED: 5.4%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 90.9%, доля класса по ED: 5.4%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 90.9%, доля класса по ED: 5.4%, раунды подачи: EA.' WHERE slug = 'hollins-university-usa';
UPDATE public.universities SET notes = 'Lingnan’s outstanding research performance in Business & Economics, Humanities and Social Sciences was internationally recognised. Lingnan is also the only fully residential university in Hong Kong.

Полное финансирование: Admission Scholarship до 100% обучения + проживание в Гонконге.' WHERE slug = 'hong-kong-baptist-university-hong-kong';
UPDATE public.universities SET notes = 'The Hong Kong Nang Yan College of Higher Education (HKNYC) is a private higher education provider in Sham Shui Po, Kowloon, Hong Kong.' WHERE slug = 'hong-kong-nang-yan-college-of-higher-education-hong-kong';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'hong-kong-shue-yan-university-hong-kong';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Hong Kong'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'HKUST Global Learners / Admission Scholarship (100% освобождение от оплаты)'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Economics, Business, Quantitative Finance'), notes = 'Hong Kong University of Science and Technology – Global Learners Scholarship | https://join.hkust.edu.hk/global-learners-scholarship | Бакалавриат Что покрывает: полное освобождение от оплаты обучения, с возможностью продления Сильные мейджеры: Computer Science, Economics, Business

Полное финансирование: Global Learners / Admission Scholarship до full tuition + stipend.' WHERE slug = 'hong-kong-university-of-science-and-technology-hong-kong';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Materials Science, Physics and Astronomy, Computer Science, Mathematics') WHERE slug = 'hongik-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Frederick, MD'), rate_num = COALESCE(rate_num, 78.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '78.1%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Education, Computer Science & IT, Health & Medicine'), notes = 'Hood College is a private college in Frederick, Maryland.  It was established in 1893 by the Potomac Synod of the Reformed Church in the United States as a women''s college.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'hood-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Holland, MI'), tuition_num = COALESCE(tuition_num, 40420), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$40,420 / год'), rate_num = COALESCE(rate_num, 75.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '75.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,396'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '91%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1310 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Education, Psychology, Biological & Biomedical Sciences, Communication & Media, Engineering'), notes = 'Hope College is a private Christian liberal arts college in Holland, Michigan, United States.  Dutch immigrants originally opened it in 1851 as the Pioneer School, four years after the community was first settled.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'hope-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Asan'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Mathematics, Biochemistry, Genetics and Molecular Biology, Agricultural and Biological Sciences, Materials Science, Immunology and Microbiology') WHERE slug = 'hoseo-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Houghton, NY'), tuition_num = COALESCE(tuition_num, 17290), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$17,290 / год'), rate_num = COALESCE(rate_num, 92.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '92.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1390 · ACT 23–28'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Education, Liberal Arts, Psychology, Visual & Performing Arts'), notes = 'Хоутонский колледж — частный христианский евангельский гуманитарный университет в г.  Хоутон, Нью-Йорк, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'houghton-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Washington, DC'), full_grant = true, avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,877'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Full Tuition to Full Ride'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1298 · ACT 22–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Economics & Social Sciences, Biological & Biomedical Sciences, Health & Medicine, Psychology'), notes = 'Говардский университет — американский частный исторически чёрный университет.  Расположен в городе Вашингтоне.

Стипендия Various (Full Tuition to Full Ride): мин. требования — 26+ ACT or 1170+ SAT (CR+M), GPA 3.0+, Typicaly #1 or #2 in Class.

Статистика CDS (TARGET): ED acceptance: 35.6%, доля класса по ED: 4.4%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 35.6%, доля класса по ED: 4.4%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 35.6%, доля класса по ED: 4.4%, раунды подачи: EA.' WHERE slug = 'howard-university-usa';
UPDATE public.universities SET notes = 'Университет иностранных языков Хангук —— частный университет в Южной Корее.' WHERE slug = 'hufs-south-korea';
UPDATE public.universities SET notes = '~CAD 15,000–22,000 per year (international students), ~CAD 500– 8,000 aid (entrance scholarships + merit awards + bursaries + international entrance scholarships), ~5% –40% coverage

Финансирование в Канаде (CAD): ~CAD 15,000–22,000 per year (international students), ~CAD 500– 8,000 aid (entrance scholarships + merit awards + bursaries + international entrance scholarships), ~5% –40% coverage.' WHERE slug = 'humber-college-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'International Research Awards, Rosa-Luxembourg-Stiftung') WHERE slug = 'humboldt-university-of-berlin-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Psychology, Earth and Planetary Sciences, Computer Science, Medicine') WHERE slug = 'hungarian-dance-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gödöllő'), majors = COALESCE(NULLIF(majors, ''), 'Environmental Science, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology, Economics, Econometrics and Finance, Business, Management and Accounting') WHERE slug = 'hungarian-university-of-agriculture-and-life-science-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Earth and Planetary Sciences, Social Sciences, Engineering'), notes = 'Венгерский университет изобразительных искусств (венг. Magyar Képzőművészeti Egyetem) — главная художественная школа Венгрии, находится в Будапеште. Основан в 1871 году как Венгерская королевская школа рисования (венг. Magyar Királyi Mintarajztanoda).

STIPENDIUM HUNGARICUM | https://stipendiumhungaricum.hu | Бакалавриат & Магистратура & PhD | Распространяется на 57 университетов Венгрии Бесплатное обучение — полное освобождение от оплаты обучения Ежемесячная стипендия — 43 700 венгерских форинтов в месяц (примерно 110 евро) на покрытие расходов на проживание в Венгрии, выплачивается 12 месяцев в' WHERE slug = 'hungarian-university-of-fine-arts-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Psychology, Social Sciences, Engineering, Health Professions, Economics, Econometrics and Finance') WHERE slug = 'hungarian-university-of-sports-science-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Iğdır'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Medicine, Arts and Humanities, Social Sciences, Materials Science, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'i-d-r-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Malatya'), majors = COALESCE(NULLIF(majors, ''), 'Chemistry, Medicine, Engineering, Arts and Humanities, Social Sciences, Dentistry') WHERE slug = 'i-n-n-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Business, Management and Accounting, Dentistry, Arts and Humanities, Social Sciences, Economics, Econometrics and Finance') WHERE slug = 'i-stanbul-ayd-n-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Medicine, Psychology, Economics, Econometrics and Finance, Dentistry') WHERE slug = 'i-stanbul-medeniyet-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Medicine, Dentistry, Physics and Astronomy, Arts and Humanities, Biochemistry, Genetics and Molecular Biology'), notes = 'Стамбульский университет (тур. İstanbul Üniversitesi, англ. Istanbul University) — ведущее высшее учебное заведение Стамбула и Турции, старейший университет страны.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'i-stanbul-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Arts and Humanities, Agricultural and Biological Sciences, Social Sciences, Psychology, Decision Sciences'), notes = 'Стамбульский университет им. Сабахаттина Заима (IZU) — международный исследовательский университет.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'i-stanbul-sabahattin-zaim-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul') WHERE slug = 'i-stanbul-teknik-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Mathematics, Business, Management and Accounting, Economics, Econometrics and Finance, Decision Sciences, Social Sciences, Engineering') WHERE slug = 'i-stanbul-ticaret-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Izmir'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Arts and Humanities, Health Professions, Medicine, Business, Management and Accounting, Social Sciences') WHERE slug = 'i-zmir-katip-elebi-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Izmir'), majors = COALESCE(NULLIF(majors, ''), 'Materials Science, Engineering, Environmental Science, Physics and Astronomy, Energy, Arts and Humanities') WHERE slug = 'i-zmir-y-ksek-teknoloji-enstit-s-turkey';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'IE Scholarship for Personal Excellence (до full ride, квота 2 на курс)') WHERE slug = 'ie-university-spain';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A') WHERE slug = 'ifm-business-school-switzerland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Chicago, IL'), rate_num = COALESCE(rate_num, 54.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '54.9%'), full_grant = true, avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,645'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '98%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Duchossois Leadership Scholars (Full Ride)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1440'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Architecture, Physical Sciences, Psychology, Biological & Biomedical Sciences'), notes = 'Иллинойсский технологический институт — исследовательский университет в Чикаго, основанный в 1940 году.  Здесь обучаются более 7000 студентов на отделениях математики, инженерного дела, архитектуры, психологии, экономики и права.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'illinois-institute-of-technology-usa';
UPDATE public.universities SET notes = 'The Illinois Institute of Technology is a private research university in Chicago, Illinois, United States.  Tracing its history to 1890, the present name was adopted upon the merger of the Armour Institute and Lewis Institute in 1940.' WHERE slug = 'illinois-institute-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 59430), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$59,430 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1120–1340') WHERE slug = 'illinois-wesleyan-university-partial-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$28,203'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '96%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1140–1330 · ACT 24–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Health & Medicine, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based + merit aid for internationals | Aid form: Institutional

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'illinois-wesleyan-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Medicine, Chemistry, Engineering, Biochemistry, Genetics and Molecular Biology, Earth and Planetary Sciences'), notes = 'Имперский колледж Лондона (англ. Imperial College London) — высшее учебное заведение в Южном Кенсингтоне, специализирующееся в науке, инженерии, медицине и бизнесе.' WHERE slug = 'imperial-college-london-uk';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Incheon'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Engineering, Energy, Computer Science, Materials Science, Environmental Science') WHERE slug = 'incheon-national-university-korea';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 33717), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,717 / год'), rate_num = COALESCE(rate_num, 81.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '81.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,979'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '37%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1040–1230 · ACT 21–28'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Computer Science & IT, Engineering, Public Policy & Social Work, Psychology'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'indiana-u-purdue-u-indianapolis-usa';
UPDATE public.universities SET notes = 'Wells Scholarship; NAMED COMPETITIVE AWARD | Selection: Competitive application, ~18-22 selected/year | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'indiana-university-bloomington-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Wells Scholars (Full Ride)'), notes = 'Indiana University Bloomington is a public research university in Bloomington, Indiana, United States.  It is the flagship campus of Indiana University and is its largest campus, with over 48,000 students.

Стипендия Wells Scholars (Full Ride): мин. требования — In-state students must be nominated by HS (1 or 2 per school).' WHERE slug = 'indiana-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Incheon'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Energy, Materials Science, Biochemistry, Genetics and Molecular Biology, Physics and Astronomy, Environmental Science') WHERE slug = 'inha-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gimhae'), majors = COALESCE(NULLIF(majors, ''), 'Pharmacology, Toxicology and Pharmaceutics, Medicine, Engineering, Physics and Astronomy, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'inje-university-korea';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Biological & Biomedical Sciences, Education, Computer Science & IT, Visual & Performing Arts'), notes = 'Университет науки и техники штата Айова, более известный как Университет штата Айова — университет США, расположенный в Эймсе, штат Айова.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'iowa-state-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '50% of the tuition fee') WHERE slug = 'istituto-europeo-di-design-spain';
UPDATE public.universities SET notes = 'Основан в 1935 году (Milan).' WHERE slug = 'istituto-marangoni-milan-italy';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Communication & Media, Visual & Performing Arts, Health & Medicine, Business & Management, Biological & Biomedical Sciences, Education'), notes = 'Ithaca College is a private college in Ithaca, New York, United States.  Founded in 1892 as a music conservatory, the college has a liberal arts focus, and today confers degrees in over 100 majors.

Статистика CDS (BACKUP): ED acceptance: 93.8%, доля класса по ED: 9%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 93.8%, доля класса по ED: 9%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 93.8%, доля класса по ED: 9%, раунды подачи: EA.' WHERE slug = 'ithaca-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Communication & Media, Psychology, Economics & Social Sciences, Computer Science & IT'), notes = 'James Madison University is a public research university in Harrisonburg, Virginia, United States.  Founded in 1908, the institution was renamed in 1938 in honor of the fourth president of the United States, James Madison.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'james-madison-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Jeju City'), majors = COALESCE(NULLIF(majors, ''), 'Immunology and Microbiology, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology, Environmental Science, Medicine, Engineering') WHERE slug = 'jeju-national-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Siloam Springs, AR'), tuition_num = COALESCE(tuition_num, 30832), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$30,832 / год'), rate_num = COALESCE(rate_num, 67.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '67.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,347'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '94%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1345 · ACT 21–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Psychology, Health & Medicine, Engineering, Biological & Biomedical Sciences'), notes = 'John Brown University (JBU) is a private Christian university in Siloam Springs, Arkansas, United States.  Founded in 1919, JBU enrolls approximately 2,250 students from over 30 states and 40 countries across its traditional undergraduate, graduate, online, and concurrent education programs.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'john-brown-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kecskemét'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Materials Science, Engineering, Economics, Econometrics and Finance, Agricultural and Biological Sciences, Decision Sciences'), notes = 'Джон фон Нейман — венгеро-американский математик, физик и педагог еврейского происхождения, сделавший важный вклад в квантовую физику, квантовую логику, функциональный анализ, теорию множеств, информатику, экономику и другие отрасли науки.

STIPENDIUM HUNGARICUM | https://stipendiumhungaricum.hu | Бакалавриат & Магистратура & PhD | Распространяется на 57 университетов Венгрии Бесплатное обучение — полное освобождение от оплаты обучения Ежемесячная стипендия — 43 700 венгерских форинтов в месяц (примерно 110 евро) на покрытие расходов на проживание в Венгрии, выплачивается 12 месяцев в' WHERE slug = 'john-von-neumann-university-hungary';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Charles R. Westgate Scholarship in Engineering (Full Ride)'), notes = 'JHU International Financial Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy since 2019 | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для принятых иностранцев.

Официальная политика помощи: The average scholarship is $25,000, but individual amounts can be more or less, depending on the financial need of the student.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'johns-hopkins-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), rate_num = COALESCE(rate_num, 9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$33,232'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '91%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts'), notes = 'Джульярдская школа — одно из крупнейших американских высших учебных заведений в области искусства и музыки.  Расположена в нью-йоркском Линкольн-центре.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'juilliard-school-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Huntingdon, PA'), rate_num = COALESCE(rate_num, 71.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '71.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1070–1280 · ACT 22–29'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Environmental Science, Business & Management, Education, Computer Science & IT, Psychology'), notes = 'Juniata College is a private liberal arts college in Huntingdon, Pennsylvania, United States.  Founded in 1876 as a co-educational normal school, it was the first college started by members of the Church of the Brethren.

Статистика CDS (fin aid): раунды подачи: EA, EA II.

Статистика CDS (EDEARD): раунды подачи: EA, EA II.' WHERE slug = 'juniata-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kırıkkale'), majors = COALESCE(NULLIF(majors, ''), 'Decision Sciences, Mathematics, Dentistry, Arts and Humanities, Social Sciences, Medicine') WHERE slug = 'k-r-kkale-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kırklareli'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Business, Management and Accounting, Decision Sciences, Economics, Econometrics and Finance, Physics and Astronomy') WHERE slug = 'k-rklareli-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'k-roli-g-sp-r-university-of-the-reformed-church-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul') WHERE slug = 'kadir-has-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kars'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Chemistry, Physics and Astronomy, Agricultural and Biological Sciences, Veterinary') WHERE slug = 'kafkas-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kahramanmaraş'), majors = COALESCE(NULLIF(majors, ''), 'Materials Science, Social Sciences, Engineering, Arts and Humanities, Business, Management and Accounting, Medicine') WHERE slug = 'kahramanmara-s-t-i-mam-niversitesi-turkey';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'KAIST International Student Scholarship (100% обучение + стипендия + общежитие)') WHERE slug = 'kaist-south-korea';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Business & Management, Psychology, Computer Science & IT, Physical Sciences'), notes = 'Kalamazoo College is a private liberal arts college in Kalamazoo, Michigan, United States.  Founded in 1833 by Baptist ministers as the Michigan and Huron Institute, Kalamazoo is the oldest private college in Michigan.

Статистика CDS (BACKUP): ED acceptance: 74.2%, доля класса по ED: 11.6%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 74.2%, доля класса по ED: 11.6%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 74.2%, доля класса по ED: 11.6%, раунды подачи: ED II, EA.' WHERE slug = 'kalamazoo-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Chuncheon'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Physics and Astronomy, Materials Science, Medicine, Engineering, Environmental Science') WHERE slug = 'kangwon-national-university-korea';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Education, Biological & Biomedical Sciences, Economics & Social Sciences, Health & Medicine'), notes = 'Университет штата Канзас, сокращённо Канзас-Стейт или К-Стейт — университет шата, главный кампус которого находится в городе Манхаттан, штат Канзас.  Создан в 1863 году как Сельскохозяйственный колледж штата Канзас, став первым государственным высшим учебным заведением в штате Канзас.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'kansas-state-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Environmental Science, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology, Economics, Econometrics and Finance, Business, Management and Accounting') WHERE slug = 'kaposv-r-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Karabük'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Engineering, Materials Science, Business, Management and Accounting, Energy'), notes = 'Университет Карабюк (тур. Karabük Üniversitesi) — государственный университет в Карабюке, Турция. Университет Карабюк второй университет по наибольшему количеству иностранных студентов в Турции, после Университета Анадолу.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'karab-k-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Trabzon'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Materials Science, Decision Sciences, Chemistry, Dentistry, Earth and Planetary Sciences') WHERE slug = 'karadeniz-teknik-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Karaman'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Business, Management and Accounting, Physics and Astronomy, Social Sciences, Chemistry, Energy') WHERE slug = 'karamano-lu-mehmetbey-niversitesi-turkey';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'karlsruhe-institute-of-technology-germany';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition'), notes = 'Основан в 1977 году (Karlstad).' WHERE slug = 'karlstad-university-sweden';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'karolinska-institute-sweden';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kastamonu'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Business, Management and Accounting, Environmental Science, Agricultural and Biological Sciences, Immunology and Microbiology') WHERE slug = 'kastamonu-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daegu'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Biochemistry, Genetics and Molecular Biology, Agricultural and Biological Sciences, Psychology, Neuroscience'), notes = 'Университет Кемён (кор. 계명대학교?, {{{2}}}?; англ. Keimyung University) — частный университет в третьем по величине городе Южной Кореи — Тэгу. Был основан в 1899 году.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'keimyung-university-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'http://www.sdm.keio.ac.jp/en/admission/financialaid.html'), notes = 'Университет Кэйо (яп. 慶應義塾大学 кэйо: гидзюку дайгаку) — японский частный университет, основанный Фукудзавой Юкити. Часто его сравнивают с Университетом Васэда.' WHERE slug = 'keio-university-japan';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Computer Science & IT, Psychology, Health & Medicine, Communication & Media'), notes = 'Kennesaw State University (KSU) is a public research university in the U. S.' WHERE slug = 'kennesaw-state-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS or ISAFA + supplements | CSS Waiver: Request via email', notes = 'Kenyon International Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (для иностранцев ориентир EFC ~$5,000+).

Статистика CDS (TARGET): ED acceptance: 62.4%, доля класса по ED: 51.5%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 62.4%, доля класса по ED: 51.5%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 62.4%, доля класса по ED: 51.5%, раунды подачи: ED II.' WHERE slug = 'kenyon-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Business & Management, Physical Sciences'), notes = 'Kettering University is a private university in Flint, Michigan.  It offers bachelor of science and master’s degrees in STEM and business.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'kettering-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Keuka Park, NY'), rate_num = COALESCE(rate_num, 93.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '93.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$13,985'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1008–1183'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Public Policy & Social Work, Business & Management, Education, Psychology, Biological & Biomedical Sciences'), notes = 'Keuka College is a private college in Keuka Park, New York, United States, founded in 1890.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'keuka-college-usa';
UPDATE public.universities SET notes = 'Основан в 2007 году (Abu Dhabi).' WHERE slug = 'khalifa-university-uae';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kilis'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Decision Sciences, Social Sciences, Agricultural and Biological Sciences, Medicine, Business, Management and Accounting') WHERE slug = 'kilis-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Biochemistry, Genetics and Molecular Biology, Neuroscience, Psychology, Social Sciences, Immunology and Microbiology'), notes = 'Королевский колледж Лондона (англ. King’s College London, KCL, также King''s) — один из самых крупных, старейших и наиболее престижных университетов Англии, колледж-основатель Лондонского университета (входит в его состав).' WHERE slug = 'king-s-college-london-kcl-uk';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 60051), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$60,051 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1440') WHERE slug = 'knox-college-partial-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholarship (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Business & Management, Psychology, Computer Science & IT, English & Literature'), notes = 'Knox College is a private liberal arts college in Galesburg, Illinois, United States.  It was founded in 1837 by anti-slavery advocates and has ties to the Underground Railroad movement.

Статистика CDS (BACKUP): ED acceptance: 46.9%, доля класса по ED: 4.7%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 46.9%, доля класса по ED: 4.7%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 46.9%, доля класса по ED: 4.7%, раунды подачи: EA, EA II.' WHERE slug = 'knox-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul') WHERE slug = 'ko-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.kobe-u.ac.jp/en/about_us/disclosure/index11_en.html'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Основан в 1949 году (Kobe).' WHERE slug = 'kobe-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'İzmit'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Business, Management and Accounting, Physics and Astronomy, Decision Sciences, Dentistry'), notes = 'Университет Коджаэли (тур. Kocaeli Üniversitesi) — государственный университет в Измите, Коджаэли, Турция. Был основан как Академия Инженерии и Архитектуры в Коджаэли в 1976 году.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'kocaeli-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'kodol-nyi-j-nos-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gongju'), majors = COALESCE(NULLIF(majors, ''), 'Earth and Planetary Sciences, Environmental Science, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology, Engineering, Arts and Humanities') WHERE slug = 'kongju-national-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Konya'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Dentistry, Medicine, Immunology and Microbiology, Agricultural and Biological Sciences') WHERE slug = 'konya-necmettin-erbakan-nversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daejeon'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Neuroscience, Nursing, Chemistry, Social Sciences, Engineering') WHERE slug = 'konyang-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Materials Science, Computer Science, Energy, Environmental Science'), notes = 'Университет Кунмин (кор. 국민대학교?, 國民大學校? Кунъмин тэхаккё, англ. Kookmin University) — университет, расположенный в Сеуле — столице Южной Кореи. Основан в 1946 году.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'kookmin-university-korea';
UPDATE public.universities SET notes = 'Университет Корё (кор. 고려대학교, Корё-тэхаккё; англ. Korea University) — частный исследовательский университет, расположенный в Сеуле, Республика Корея. Входит в элитную группу вузов SKY (наряду с Сеульским национальным университетом и университетом Ёнсе), которые традиционно считаются тремя самыми престижными университетами страны.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'korea-university-south-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Cheonan'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science, Materials Science, Neuroscience, Chemistry, Energy') WHERE slug = 'koreatech-korea-university-of-technology-and-education-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'kth-royal-institute-of-technology-sweden';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Gunsan'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Immunology and Microbiology, Earth and Planetary Sciences, Computer Science, Energy, Physics and Astronomy') WHERE slug = 'kunsan-national-university-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.kyoto-u.ac.jp/en/current/how-to/financial-aid'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Киотский университет (яп. 京都大学 кё:то дайгаку) или сокращённо (яп. 京大 кё:дай) — один из ведущих национальных университетов Японии, расположен в городе Киото. Ранее входил в число императорских университетов.' WHERE slug = 'kyoto-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Busan'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Materials Science, Business, Management and Accounting, Mathematics, Physics and Astronomy, Chemistry'), notes = 'Университет Кёнсон (кор. 경성 대학교?, 慶星大學校?, сокращенно: 경성대, 경대, англ. Kyungsung University) — частный университет в Пусане, Республика Корея. Корпус университета Кёнсон находится недалеко от станции 2-й линии Пусанского метрополинета «Университет Кёнсон·Национальный университет Пугён».

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'kyungsung-university-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.kyushu-u.ac.jp/en/education/fees/support'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Кюсю (яп. 九州大学 Кю:сю: Дайгаку, сокращённо — 九大 Кю:дай) — крупнейший университет на острове Кюсю, расположен в городе Фукуока. Согласно рейтингу QS World University Rankings на 2010 год, университет Кюсю находится на 153 месте в мире и на 17 месте в Азии.' WHERE slug = 'kyushu-university-japan';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Lafayette Institutional Grants NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy | Aid form: CSS Profile

Полное финансирование: meets 100% need + Marquis Fellowship (full tuition/ride).

Официальная политика помощи: Lafayette meets the full demonstrated financial need of international students through a combination of loan, job, and grant aid

Статистика CDS (TARGET): ED acceptance: 50.8%, доля класса по ED: 52.1%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 50.8%, доля класса по ED: 52.1%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 50.8%, доля класса по ED: 52.1%, раунды подачи: ED II.' WHERE slug = 'lafayette-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Lake Forest, IL'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$33,595'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1365 · ACT 28–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, English & Literature, Environmental Science'), notes = 'Lake Forest College is a private liberal arts college in Lake Forest, Illinois, United States.  Founded in 1857 as Lind University by a group of Presbyterian ministers, the college has been coeducational since 1876 and an undergraduate-focused liberal arts institution since 1903.

Статистика CDS (TARGET): ED acceptance: 73.1%, доля класса по ED: 5%, раунды подачи: ED II, EA, EA II.

Статистика CDS (fin aid): ED acceptance: 73.1%, доля класса по ED: 5%, раунды подачи: ED II, EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 73.1%, доля класса по ED: 5%, раунды подачи: ED II, EA, EA II.' WHERE slug = 'lake-forest-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Computer Science, Environmental Science, Earth and Planetary Sciences, Agricultural and Biological Sciences, Medicine'), notes = 'Ланкастерский университет или Университет Ланкастера (англ. Lancaster University) — публичный исследовательский университет, расположенный в Ланкастере.' WHERE slug = 'lancaster-university-uk';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '€5''000 by Latvian government scholarship (see add. notes on the right') WHERE slug = 'latvia-university-of-agriculture-jelgava-latvia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'scholarship based on the YKI certificate in Finnish') WHERE slug = 'laurea-university-of-applied-sciences-finland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Southfield, MI'), rate_num = COALESCE(rate_num, 80.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '80.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,782'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '32%'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Architecture, Computer Science & IT, Business & Management, Health & Medicine, Communication & Media'), notes = 'Lawrence Technological University is a private university in Southfield, Michigan.  It was founded in 1932 in Highland Park, Michigan, as the Lawrence Institute of Technology (LIT) by Russell E.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'lawrence-technological-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Physical Sciences, English & Literature'), notes = 'Lawrence University is a private liberal arts college and conservatory of music in Appleton, Wisconsin, United States.  Founded in 1847, its first classes were held on November 12, 1849.

Статистика CDS (BACKUP): ED acceptance: 71.4%, доля класса по ED: 9.2%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 71.4%, доля класса по ED: 9.2%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 71.4%, доля класса по ED: 9.2%, раунды подачи: EA, EA II.' WHERE slug = 'lawrence-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS + LUCF form | CSS Waiver: Request via email', notes = 'Лихайский университет — частный исследовательский университет, расположенный в Бетлехеме, штат Пенсильвания.  Основан бизнесменом Аса Пакером в 1865 году.

Полное финансирование: meets 100% demonstrated need (need-aware).

Официальная политика помощи: Lehigh University awards need-based financial aid to international students. Competition is very keen and our budget is limited. In evaluating students for aid, we look at a combination of the student’s academic/extracurricular achievements and the student/family need for financial assistance. Therefore, our financial aid is a combination of merit and need-based aid

Статистика CDS (TARGET): ED acceptance: 66.3%, доля класса по ED: 54.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 66.3%, доля класса по ED: 54.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 66.3%, доля класса по ED: 54.4%, раунды подачи: ED II.' WHERE slug = 'lehigh-university-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Основан в 1954 году (Crans-Montana).' WHERE slug = 'les-roches-switzerland';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1210–1390 · ACT 28–31'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Visual & Performing Arts, English & Literature, Environmental Science'), notes = 'Колледж Льюиса и Кларка — частный гуманитарный университет в г.  Портленд, штат Орегон, США.

Статистика CDS (BACKUP): ED acceptance: 84.2%, доля класса по ED: 9.5%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 84.2%, доля класса по ED: 9.5%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 84.2%, доля класса по ED: 9.5%, раунды подачи: EA.' WHERE slug = 'lewis-clark-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Education, Visual & Performing Arts, Psychology, Health & Medicine'), notes = 'Lindenwood University is a private university in St.  Charles, Missouri, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'lindenwood-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 27274), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$27,274 / год'), majors = COALESCE(NULLIF(majors, ''), 'Public Policy & Social Work, Business & Management, Psychology, Education, Communication & Media, Liberal Arts') WHERE slug = 'lindsey-wilson-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'McMinnville, OR'), rate_num = COALESCE(rate_num, 87.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '87.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$24,890'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '82%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Education, Psychology'), notes = 'Linfield University is a private liberal arts college with campuses in McMinnville, and Portland, Oregon.  Linfield Wildcats athletics participate in the NCAA Division III Northwest Conference.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'linfield-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'link-ping-university-sweden';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Претендовать на финансовую помощь могут лишь студенты докторских и постдокторских программ') WHERE slug = 'lmu-munich-germany';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'lodz-university-of-technology-poland';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Economics, Econometrics and Finance, Decision Sciences'), notes = 'Лондонская школа экономики и политических наук (англ. The London School of Economics and Political Science, LSE) — подразделение Лондонского университета. Основана в 1895 году с целью «улучшения общества».' WHERE slug = 'london-school-of-economics-and-political-science-lse-uk';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Visual & Performing Arts, Education, Biological & Biomedical Sciences, Psychology'), notes = 'Long Island University (LIU) is a private research university in Brooklyn and Brookville, New York, United States.  LIU is classified among "R2: Doctoral Universities – High research activity" according to the Carnegie Classification of Institutions of Higher Education.' WHERE slug = 'long-island-university-liu-brooklyn-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Visual & Performing Arts, Education, Biological & Biomedical Sciences, Psychology'), notes = 'LIU Post, formally the C. W.' WHERE slug = 'long-island-university-liu-post-usa';
UPDATE public.universities SET notes = 'Long Island University (LIU) is a private research university in Brooklyn and Brookville, New York, United States.  LIU is classified among "R2: Doctoral Universities – High research activity" according to the Carnegie Classification of Institutions of Higher Education.' WHERE slug = 'long-island-university-liu-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Stamps Leadership Scholars (Full Ride + $14,000 exp)'), notes = 'ATHLETIC SCHOLARSHIP | Selection: Coach recruitment via NCAA D1 | Intl: Yes -- internationals fully eligible | Chapter 6 — Athletic Scholarships (NCAA & NAIA)

Стипендия Stamps Leadership Scholars (Full Ride + $14,000 exp): мин. требования — 3.5 GPA, 33 ACT or 1440 SAT.

Стипендия Chancellor''s Alumni Scholars (Full Ride + $2,000 exp): мин. требования — 33+ ACT or 1440+ SAT, 3.5+ GPA.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'louisiana-state-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Economics & Social Sciences, Psychology, Communication & Media, Biological & Biomedical Sciences'), notes = 'Университет Лойола Мэримаунт ― американский частный иезуитский и исследовательский университет в Лос-Анджелесе, штат Калифорния.  Он расположен в западной части города, недалеко от Плайя-Виста.

Статистика CDS (TARGET): ED acceptance: 44%, доля класса по ED: 11.5%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 44%, доля класса по ED: 11.5%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 44%, доля класса по ED: 11.5%, раунды подачи: EA.' WHERE slug = 'loyola-marymount-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Chicago, IL'), rate_num = COALESCE(rate_num, 81.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '81.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$16,805'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '85%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1360'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Psychology, Communication & Media, Economics & Social Sciences'), notes = 'Университет Лойолы в Чикаго — частный иезуитский университет в Чикаго, штат Иллинойс, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'loyola-university-chicago-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Baltimore, MD'), rate_num = COALESCE(rate_num, 76.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$37,876'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '74%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1350 · ACT 27–32'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Communication & Media, Psychology, Health & Medicine'), notes = 'Университет Лойолы в Мэриленде — частный иезуитский университет в Балтиморе, штат Мэриленд, США.  Основан в 1852 году как колледж Лойолы в Мэриленде Джоном Эрли и восемью другими членами Общества Иисуса.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'loyola-university-maryland-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New Orleans, LA'), rate_num = COALESCE(rate_num, 87.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '87.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,101'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '47%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Business & Management, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Communication & Media'), notes = 'Loyola University New Orleans is a private Jesuit university in New Orleans, Louisiana, United States.  Originally established as Loyola College in 1904, the institution was chartered as a university in 1912.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'loyola-university-new-orleans-usa';
UPDATE public.universities SET notes = 'Loyola University Chicago is a private Jesuit research university in Chicago, Illinois, United States.  Founded in 1870 by the Society of Jesus, Loyola is the fourth largest Catholic university in terms of enrollment in the United States.' WHERE slug = 'loyola-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Social Sciences, Economics, Econometrics and Finance'), notes = 'Национальный университет государственной службы (венг. Nemzeti Közszolgálati Egyetem) — высшее учебное заведение Будапешта, основанное в 2011 году. Университет был создан в результате объединения Университета национальной обороны (венг. Zrínyi Miklós Nemzetvédelmi Egyetem), Полицейской академии и факультета государственного управления будапештского Университета Корвина.

STIPENDIUM HUNGARICUM | https://stipendiumhungaricum.hu | Бакалавриат & Магистратура & PhD | Распространяется на 57 университетов Венгрии Бесплатное обучение — полное освобождение от оплаты обучения Ежемесячная стипендия — 43 700 венгерских форинтов в месяц (примерно 110 евро) на покрытие расходов на проживание в Венгрии, выплачивается 12 месяцев в' WHERE slug = 'ludovika-university-of-public-service-hungary';
UPDATE public.universities SET notes = 'Основан в 1974 году (Rome).' WHERE slug = 'luiss-italy';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition'), notes = 'Лундский университет (швед. Lunds universitet, Universitas Lundensis или Universitas Gothorum Carolina на латыни) — университет в городе Лунд на юге Швеции, основан в 1666 году, второй старейший университет в пределах нынешних границ Швеции.' WHERE slug = 'lund-university-sweden';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1098–1318 · ACT 22–29'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Health & Medicine, Biological & Biomedical Sciences, Business & Management, Economics & Social Sciences, Computer Science & IT'), notes = 'Luther College is a private Lutheran liberal arts college in Decorah, Iowa, United States.  Established as a Lutheran seminary in 1861 by Norwegian immigrants, the school is an institution of the Evangelical Lutheran Church in America.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'luther-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Williamsport, PA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,005'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '98%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1070–1273 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Psychology, Biological & Biomedical Sciences, Visual & Performing Arts, Physical Sciences'), notes = 'Lycoming College is a private liberal arts college in Williamsport, Pennsylvania.  Founded in 1812, Lycoming College is affiliated with the United Methodist Church but operates as an independent institution.

Статистика CDS (BACKUP): ED acceptance: 80%, доля класса по ED: 5.9%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 80%, доля класса по ED: 5.9%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 80%, доля класса по ED: 5.9%, раунды подачи: EA.' WHERE slug = 'lycoming-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Boca Raton, FL'), rate_num = COALESCE(rate_num, 74), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '74%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,612'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '81%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1030–1200 · ACT 22–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Psychology, Communication & Media, Biological & Biomedical Sciences, Education'), notes = 'Lynn University is a private university in Boca Raton, Florida, United States.  Founded in 1962, the university awards associate, baccalaureate, master''s, and doctoral degrees.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'lynn-university-usa';
UPDATE public.universities SET notes = 'Macalester International Grants NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Long-standing commitment to international access | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need + DeWitt Wallace merit.

Официальная политика помощи: Approximately two out of three of the international students who enroll at Macalester receive financial aid awards. We are committed to meeting the full demonstrated financial need of every student we admit.

Статистика CDS (TARGET): ED acceptance: 58.2%, доля класса по ED: 33.3%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 58.2%, доля класса по ED: 33.3%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 58.2%, доля класса по ED: 33.3%, раунды подачи: ED II, EA.' WHERE slug = 'macalester-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Vice-Chancellor''s International Scholarship, Vice-Chancellor''s International Scholarship - FIRST® (For Inspiration and Recognition of Science and Technology), Australian Government Scholarships - Australia Awards Scholarships, Macquarie University Study Abroad Scholarship, Sports scholarships') WHERE slug = 'macquarie-university-australia';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Castine, ME'), tuition_num = COALESCE(tuition_num, 30226), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$30,226 / год'), rate_num = COALESCE(rate_num, 61.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '61.4%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1070–1270 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Biological & Biomedical Sciences'), notes = 'Maine Maritime Academy is a public college focused on maritime training and located in Castine, Maine.  Established by the 90th Maine Legislature on March 21, 1941, the academy is one of six non-federal maritime training colleges in the United States and one of only two that fields a Naval Reserve Officers Training Corps (NROTC) unit.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'maine-maritime-academy-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Canton, OH'), tuition_num = COALESCE(tuition_num, 36120), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$36,120 / год'), rate_num = COALESCE(rate_num, 75.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '75.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$22,923'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 885–1236 · ACT 17–24'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Education, Biological & Biomedical Sciences, Health & Medicine, Public Policy & Social Work, Psychology'), notes = 'Malone University is a private Christian university in Canton, Ohio, United States.  It was founded in 1892 by Walter and Emma Malone as a small, co-educational Bible institute called Cleveland Bible College.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'malone-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Riverdale, NY'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1340 · ACT 22–31'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Communication & Media, Education, Economics & Social Sciences, Psychology'), notes = 'Manhattan University is a private, Catholic university in New York City, New York, US.  Originally established in 1853 by the De La Salle Christian Brothers as an academy for day students, it was later incorporated as an institution of higher education through a charter granted by the New York State Board of Regents.' WHERE slug = 'manhattan-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Scholarships for up to 30% off the yearly tuition fee'), notes = 'Марбелья (исп. Marbella) — город и муниципалитет в Испании, входит в провинцию Малага, в составе автономного сообщества Андалусия. Муниципалитет находится в составе района (комарки) Коста-дель-Соль-Оксиденталь.' WHERE slug = 'marbella-design-academy-spain';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Mardin'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Business, Management and Accounting, Materials Science, Agricultural and Biological Sciences, Environmental Science') WHERE slug = 'mardin-artuklu-nversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Psychology, Computer Science & IT, Biological & Biomedical Sciences, Visual & Performing Arts'), notes = 'Marist University is a private university in Poughkeepsie, New York, United States.  Marist was founded by the Marist Brothers, a Catholic religious institute, in 1905 to prepare brothers for their vocations as educators.

Статистика CDS (TARGET): ED acceptance: 86.2%, доля класса по ED: 17.1%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 86.2%, доля класса по ED: 17.1%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 86.2%, доля класса по ED: 17.1%, раунды подачи: ED II, EA.' WHERE slug = 'marist-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Dentistry, Medicine, Materials Science, Business, Management and Accounting'), notes = 'Университет Мармара — один из старейших и крупных университетов Турции, где работает около 2800 преподавателей и учится около 80 000 студентов, находится в городе Стамбуле.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'marmara-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Engineering, Health & Medicine, Economics & Social Sciences, Communication & Media'), notes = 'Маркеттский университет — частный иезуитский университет в Милуоки, штат Висконсин, США.  Университет является один из крупнейших иезуитских университетов в Соединенных Штатах и крупнейшим частным университетом в штате Висконсин.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'marquette-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Baltimore, MD'), rate_num = COALESCE(rate_num, 77.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.3%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 915–1220 · ACT 26–30'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Communication & Media'), notes = 'The Maryland Institute College of Art (MICA) is a private art and design college in Baltimore, Maryland.  Founded in 1826 as the Maryland Institute for the Promotion of the Mechanic Arts, it is regarded as one of the oldest art colleges in the United States.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'maryland-institute-college-of-art-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Up to 100%+ accomodation grant after the 1st year of studies for good preformance'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Environmental Science, Chemistry, Physics and Astronomy, Agricultural and Biological Sciences, Medicine, Computer Science'), notes = 'Масариков университет (чеш. Masarykova univerzita, в 1960—1990 годах действовавший под названием Университет им. Яна Эвангелисты Пуркине) был основан в 1919 году, располагается в Брно и включает в себя 10 факультетов.' WHERE slug = 'masaryk-university-in-brno-czech-republic';
UPDATE public.universities SET notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'massachusetts-inst-of-technology-usa';
UPDATE public.universities SET total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), '$17.7m'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$51,727'), how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Первокурсникам дополнительно дают 2000$; MIT Scholarships 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | No-loan policy; ~6/10 undergrads receive need-based aid | Aid form: CSS Profile

Полное финансирование: need-blind для всех стран мира, покрывает 100% need.

Официальная политика помощи: For undergraduates, we meet your full demonstrated financial need for all four of your undergraduate years. About 90% of our undergrads receive some type of financial aid, including scholarships, loans and jobs. All you need to do is apply' WHERE slug = 'massachusetts-institute-of-technology-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Westminster, MD'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,343'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '81%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Economics & Social Sciences, Biological & Biomedical Sciences, Visual & Performing Arts, Environmental Science'), notes = 'McDaniel College is a private college in Westminster, Maryland, United States, established in 1867.  McDaniel College is accredited by the Middle States Commission on Higher Education.

Статистика CDS (BACKUP): раунды подачи: ED II, EA, EA II.

Статистика CDS (fin aid): раунды подачи: ED II, EA, EA II.

Статистика CDS (EDEARD): раунды подачи: ED II, EA, EA II.' WHERE slug = 'mcdaniel-college-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = '1) Quebec universities have the lowest tuition fees in Canada; ~CAD 32,000–69,000 per year, ~CAD 3,000– full ride aid (merit scholarships + entrance awards + need-based bursaries + faculty awards + work-study), ~10%–100% coverage

Финансирование в Канаде (CAD): ~CAD 32,000–69,000 per year, ~CAD 3,000– full ride aid (merit scholarships + entrance awards + need-based bursaries + faculty awards + work-study), ~10%–100% coverage.' WHERE slug = 'mcgill-university-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.ualberta.ca/registrar/scholarships-awards-financial-support/bursaries-emergency-funding/index.html'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'mcmaster-university-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Burdur'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Agricultural and Biological Sciences, Veterinary, Social Sciences, Psychology, Economics, Econometrics and Finance') WHERE slug = 'mehmet-akif-ersoy-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.meiji.ac.jp/cip/english/admissions/financial.html'), notes = 'Университет Мэйдзи (яп. 明治大学 мэйдзи дагаку) — частный исследовательский университет, расположенный в районе Тиёда, Токио, Япония. Первоначально был основан в 1881 году тремя юристами как Юридическая школа Мэйдзи (明治法律学校 (яп. мэйдзи хорицу гакко)), а в апреле 1920 года получил статус университета.' WHERE slug = 'meiji-university-japan';
UPDATE public.universities SET notes = '~CAD 6,750–27,700 per year (depends on program level), ~CAD 1,000–full tuition aid (entrance scholarships + merit awards + need- based bursaries + international scholarships + graduate funding packages), ~10%–100% coverage

Финансирование в Канаде (CAD): ~CAD 6,750–27,700 per year (depends on program level), ~CAD 1,000–full tuition aid (entrance scholarships + merit awards + need- based bursaries + international scholarships + graduate funding packages), ~10%–100% coverage.' WHERE slug = 'memorial-university-of-newfoundland-mun-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'mendel-university-in-brno-czech-republic';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$27,781'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '37%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1350 · ACT 25–31'), notes = 'NAMED COMPETITIVE AWARD | Selection: Competitive application | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'mercer-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1260 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Mathematics & Statistics'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | (2024-25) | Aid form: Institutional application

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'meredith-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Mersin'), majors = COALESCE(NULLIF(majors, ''), 'Earth and Planetary Sciences, Business, Management and Accounting, Medicine, Environmental Science, Social Sciences, Arts and Humanities') WHERE slug = 'mersin-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Up to 100%+ accomodation grant after the 1st year of studies for good preformance'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Метропольный университет Праги (чеш. Metropolitní univerzita Praha) Институт общественных и международных отношений (Metropolitní univerzita Praha) был открыт в 1999 году.' WHERE slug = 'metropolitan-university-in-prague-czech-republic';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$16,484'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '24%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1210–1380 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Education, Communication & Media, Biological & Biomedical Sciences, Engineering'), notes = 'Presidential Fellows Program

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'miami-university-ohio-usa';
UPDATE public.universities SET notes = 'Miami University is a public research university in Oxford, Ohio, United States.  Founded in 1809, it is the second-oldest university in Ohio and the tenth-oldest public university in the United States.' WHERE slug = 'miami-university-oxford-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Alumni Distinguished Scholarship (Full Ride)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Communication & Media, Engineering, Economics & Social Sciences, Psychology'), notes = 'Professorial Assistantship / Honors Awards; Global Neighbors Scholarship HIGH

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'michigan-state-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Business & Management, Environmental Science, Biological & Biomedical Sciences, Physical Sciences'), notes = 'Мичиганский технологический университет — государственный исследовательский университет, расположенный в г.  Хоутоне.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'michigan-technological-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Middlebury Financial Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Официальная политика помощи: Middlebury meets 100% of the demonstrated financial need of any student we admit, US or international. Middlebury is need-aware in its admission of international students. International students seeking financial assistance must apply for aid at the time of applying for admission to Middlebury.

Статистика CDS (DREAM): ED acceptance: 44.8%, доля класса по ED: 61.5%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 44.8%, доля класса по ED: 61.5%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 44.8%, доля класса по ED: 61.5%, раунды подачи: ED II.' WHERE slug = 'middlebury-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$37,736'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), notes = 'Основан в 1852 году.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'mills-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Jackson, MS'), rate_num = COALESCE(rate_num, 49), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '49%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1025–1150'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Economics & Social Sciences, Psychology, Mathematics & Statistics, English & Literature'), notes = 'Millsaps College is a private liberal arts college in Jackson, Mississippi, United States.  It was founded in 1890 and is affiliated with the United Methodist Church.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'millsaps-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Milwaukee, WI'), rate_num = COALESCE(rate_num, 60.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '60.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,919'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '71%'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Health & Medicine, Business & Management, Computer Science & IT'), notes = 'The Milwaukee School of Engineering (MSOE) is a private university in Milwaukee, Wisconsin, United States.  Founded in 1903, the university has a primary focus on undergraduate engineering education with additional programs in business, mathematics, and nursing.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'milwaukee-school-of-engineering-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Arts and Humanities, Social Sciences, Physics and Astronomy'), notes = 'Университет изящных искусств имени Мимара Синана (тур. Mimar Sinan Güzel Sanatlar Üniversitesi или MSGSÜ) — государственный университет изящных искусств, носящий имя архитектора Синана и расположенный в районе Финдикли, в Стамбуле, в Турции.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'mimar-sinan-g-zel-sanatlar-niversitesi-turkey';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 18700), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$18,700 / год'), how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Liberal Arts'), notes = 'Minerva University is a private residential university headquartered in San Francisco, California.  It was established in 2012 by Ben Nelson and opened in 2014 as Minerva Schools at Keck Graduate Institute, becoming Minerva University in 2021.

Полное финансирование: need-based гранты + work-study; обучение в 7 городах мира.' WHERE slug = 'minerva-schools-at-kgi-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholarship (Full Ride +)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Education, Psychology, Biological & Biomedical Sciences, Communication & Media'), notes = 'Mississippi State University for Agriculture and Applied Science, commonly known as Mississippi State University (MSU), is a public land-grant research university in Mississippi State, Mississippi, United States.  It is classified among "R1: Doctoral Universities – Very High Research Spending and Doctorate Production".

Стипендия Presidential Scholarship (Full Ride +): мин. требования — 30+ ACT or 1330+ SAT, 3.75+ GPA.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'mississippi-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Rolla, MO'), tuition_num = COALESCE(tuition_num, 34934), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$34,934 / год'), rate_num = COALESCE(rate_num, 72.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '72.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,410'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '78%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1190–1420'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Biological & Biomedical Sciences, Physical Sciences, Business & Management, Mathematics & Statistics'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'missouri-u-of-science-and-technology-usa';
UPDATE public.universities SET notes = 'Миссурийский университет — публичный, принадлежащий штату исследовательский университет США, находящийся в городе Колумбия, штат Миссури.' WHERE slug = 'missouri-university-usa';
UPDATE public.universities SET notes = 'Массачу́сетский технологи́ческий институ́т — университет и исследовательский центр, расположенный в Кембридже, штат Массачусетс, США.  Также известен как Массачусетский институт технологий и Массачусетский технологический университет.' WHERE slug = 'mit-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '2000.0'), notes = 'Венский университет MODUL — частный университет, основанный в 2007 году в Вене, Австрия. Занимается научными исследованиями и образованием в сфере туризма, новых технологий средств массовой информации и общественного управления.' WHERE slug = 'modul-university-vienna-austria';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Engineering, Arts and Humanities, Business, Management and Accounting, Psychology, Social Sciences'), notes = 'Художественный университет имени Ласло Мохоли Надь (также Университета дизайна и искусств имени Ласло Мохоли-Надь; венг. Moholy-Nagy Művészeti Egyetem, MOME) — бывший Венгерский университет искусств и дизайна, расположен в Будапеште.

STIPENDIUM HUNGARICUM | https://stipendiumhungaricum.hu | Бакалавриат & Магистратура & PhD | Распространяется на 57 университетов Венгрии Бесплатное обучение — полное освобождение от оплаты обучения Ежемесячная стипендия — 43 700 венгерских форинтов в месяц (примерно 110 евро) на покрытие расходов на проживание в Венгрии, выплачивается 12 месяцев в' WHERE slug = 'moholy-nagy-university-of-art-and-design-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daejeon'), majors = COALESCE(NULLIF(majors, ''), 'Mathematics, Biochemistry, Genetics and Molecular Biology, Agricultural and Biological Sciences, Earth and Planetary Sciences, Environmental Science, Computer Science') WHERE slug = 'mokwon-university-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Accounting Honours Scholarship, Alfred Research Alliance Honours Scholarship, Bachelor of International Business Diploma Pathway Scholarship, Bachelor of International Business Foundation Year Scholarship') WHERE slug = 'monash-university-australia';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 43520), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$43,520 / год'), rate_num = COALESCE(rate_num, 86.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '86.6%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1010–1230 · ACT 20–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Education, Biological & Biomedical Sciences, Economics & Social Sciences, Communication & Media, Physical Sciences') WHERE slug = 'monmouth-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Visual & Performing Arts, Communication & Media, Health & Medicine, Economics & Social Sciences'), notes = 'Montclair State University (Montclair) is a public research university in Montclair, New Jersey, United States.  Parts of the campus extend into Clifton and into Little Falls.' WHERE slug = 'montclair-state-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Visual & Performing Arts, Biological & Biomedical Sciences, Engineering, Computer Science & IT'), notes = 'Morehouse College is a private, historically black, men''s liberal arts college in Atlanta, Georgia, United States.  Anchored by its main campus of 61 acres (25 ha) near downtown Atlanta, the college has a variety of residential dorms and academic buildings east of Ashview Heights.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'morehouse-college-usa';
UPDATE public.universities SET notes = '~CAD 22,000–28,000 per year (international undergraduate tuition), ~CAD 3,000–full tuition aid (major entrance scholarships + merit- based awards + renewable scholarships + need-based bursaries + some full scholarships for top students), ~10%–100% coverage depending on academic profile

Финансирование в Канаде (CAD): ~CAD 22,000–28,000 per year (international undergraduate tuition), ~CAD 3,000–full tuition aid (major entrance scholarships + merit- based awards + renewable scholarships + need-based bursaries + some full scholarships for top students), ~10%–100% coverage depending on academic profile.' WHERE slug = 'mount-allison-university-canada';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Mount Holyoke International Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Women''s college; one of the highest intl % in the US | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need + крупные merit awards.

Статистика CDS (TARGET): ED acceptance: 57.2%, доля класса по ED: 45.8%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 57.2%, доля класса по ED: 45.8%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 57.2%, доля класса по ED: 45.8%, раунды подачи: ED II.' WHERE slug = 'mount-holyoke-college-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 68054), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$68,054 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1380–1530'), notes = 'Колледж Маунт-Холиок — частный женский гуманитарный колледж в городе Саут-Хадли, штат Массачусетс, США.' WHERE slug = 'mt-holyoke-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Muş'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Mathematics, Social Sciences, Business, Management and Accounting, Physics and Astronomy, Agricultural and Biological Sciences') WHERE slug = 'mu-alparslan-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Muğla'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Agricultural and Biological Sciences, Social Sciences, Arts and Humanities, Environmental Science, Psychology') WHERE slug = 'mu-la-s-tk-ko-man-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Communication & Media'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'muhlenberg-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New Concord, OH'), tuition_num = COALESCE(tuition_num, 31440), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$31,440 / год'), rate_num = COALESCE(rate_num, 81.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '81.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,319'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 900–1120 · ACT 17–22'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Education, Psychology, Communication & Media'), notes = 'Muskingum University is a private university in New Concord, Ohio, United States.  Chartered in 1837 as Muskingum College, the institution is affiliated with the Presbyterian Church (USA).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'muskingum-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Antakya'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Agricultural and Biological Sciences, Dentistry, Medicine, Economics, Econometrics and Finance, Veterinary') WHERE slug = 'mustafa-kemal-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Physics and Astronomy, Energy, Immunology and Microbiology, Agricultural and Biological Sciences, Biochemistry, Genetics and Molecular Biology'), notes = 'Университет Мёнджи (кор. 명지대학교) — частный христианский университет, основанный в 1948 году в Южной Корее. Он обеспечивает высшее образование в сфере инженерии, естественных и гуманитарных наук.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'myongji-university-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://admissions.g30.nagoya-u.ac.jp/apply/tuition.php'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Engineering, Earth and Planetary Sciences, Agricultural and Biological Sciences, Computer Science, Biochemistry, Genetics and Molecular Biology'), notes = 'Нагойский Университет (яп. 名古屋大学 нагоя дайгаку) — один из национальных университетов Японии. Расположен в восточной части города Нагоя, является одним из наиболее престижных в стране.' WHERE slug = 'nagoya-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tekirdağ'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Agricultural and Biological Sciences, Arts and Humanities, Biochemistry, Genetics and Molecular Biology, Chemistry, Medicine') WHERE slug = 'nam-k-kemal-nversitesi-turkey';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'NTU President Award ($10,000 пособие + 4 года общежития + $10,000 на поездки + bursaries)') WHERE slug = 'nanyang-technological-university-singapore';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'NUS International Undergraduate Scholarship (100% + S$4,500/г + S$3,900 общ. + S$1,300 ПК, квота ~20–30)') WHERE slug = 'national-university-of-singapore-singapore';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Nevşehir'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Environmental Science, Business, Management and Accounting, Arts and Humanities, Social Sciences, Economics, Econometrics and Finance') WHERE slug = 'nev-ehir-niversitesi-turkey';
UPDATE public.universities SET notes = '~CAD 9,000–16,000 per year (international students), ~CAD 500– 6,000 aid (entrance scholarships + merit awards + bursaries + limited international awards), ~5%–40% coverage

Финансирование в Канаде (CAD): ~CAD 9,000–16,000 per year (international students), ~CAD 500– 6,000 aid (entrance scholarships + merit awards + bursaries + limited international awards), ~5%–40% coverage.' WHERE slug = 'new-brunswick-community-college-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Sarasota, FL'), tuition_num = COALESCE(tuition_num, 29944), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$29,944 / год'), rate_num = COALESCE(rate_num, 74), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '74%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,356'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '93%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1030–1250 · ACT 20–27'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts, Environmental Science'), notes = 'The New College of Florida is a public liberal arts college in Sarasota, Florida, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'new-college-of-florida-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Business & Management, Biological & Biomedical Sciences, Architecture'), notes = 'The New Jersey Institute of Technology (NJIT) is a public research university in Newark, New Jersey, United States, with a graduate-degree-granting satellite campus in Jersey City.  Founded in 1881 with the support of local industrialists and inventors, especially Edward Weston, NJIT opened as Newark Technical School in 1885 with 88 students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'new-jersey-institute-of-technology-usa';
UPDATE public.universities SET notes = 'The New Jersey Institute of Technology (NJIT) is a public research university in Newark, New Jersey, United States, with a graduate-degree-granting satellite campus in Jersey City.  Founded in 1881 with the support of local industrialists and inventors, especially Edward Weston, NJIT opened as Newark Technical School in 1885 with 88 students.' WHERE slug = 'new-jersey-institute-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Socorro, NM'), tuition_num = COALESCE(tuition_num, 26312), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$26,312 / год'), rate_num = COALESCE(rate_num, 54), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '54%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$15,000'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '11%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1040–1290 · ACT 20–28'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Biological & Biomedical Sciences, Physical Sciences, Mathematics & Statistics, Psychology'), notes = 'The New Mexico Institute of Mining and Technology is a public university in Socorro, New Mexico, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'new-mexico-institute-of-mining-and-tech-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Computer Science & IT, Architecture, Engineering, Health & Medicine, Business & Management'), notes = 'The New York Institute of Technology is a private research university with two main campuses in New York, one in Old Westbury, on Long Island, and one on the Upper West Side in Manhattan.  The university was founded in 1955.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'new-york-institute-of-technology-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Waiver request form', notes = 'в new york кампусе маленькая фин помощь, так что лучше подавать в абу даби или шанхай; Tier 3: PARTIAL / LIMITED NEED-BASED AID | Need-aware; does not meet full need for internationals | Aid form: CSS Profile

Статистика CDS (DREAM): ED acceptance: 27.8%, доля класса по ED: 67%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 27.8%, доля класса по ED: 67%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 27.8%, доля класса по ED: 67%, раунды подачи: ED II.' WHERE slug = 'new-york-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'for SG citizens only. Extra scholarships only after enrollment'), notes = 'Основан в 1963 году (Singapore).' WHERE slug = 'ngee-ann-singapore';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Niğde'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Arts and Humanities, Social Sciences, Engineering, Materials Science, Business, Management and Accounting') WHERE slug = 'ni-de-niversitesi-turkey';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Physics and Astronomy, Social Sciences, Mathematics, Chemistry, Agricultural and Biological Sciences') WHERE slug = 'nicolaus-copernicus-university-poland';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Основан в 1889 году (Nihon).' WHERE slug = 'nihon-university-japan';
UPDATE public.universities SET notes = 'North Carolina State University is a public land-grant research university in Raleigh, North Carolina, United States.  Founded in 1887 by the North Carolina General Assembly as an agricultural and mechanical college, it is the largest university in the Carolinas and a constituent institution of the University of North Carolina system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'north-carolina-state-university-raleigh-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Park Scholarship (Full Ride + books + laptop + travel)'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Computer Science & IT') WHERE slug = 'north-carolina-state-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 44394), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$44,394 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1065–1280 · ACT 23–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Economics & Social Sciences, Visual & Performing Arts, Biological & Biomedical Sciences, Communication & Media'), notes = 'North Central College is a private college in Naperville, Illinois, United States.  It is affiliated with the United Methodist Church and has 73 undergraduate majors of study, 17 minors, 25 graduate programs, and 4 certificate programs offered by four undergraduate colleges/schools and one School of Graduate and Professional Studies.' WHERE slug = 'north-central-college-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'University Scholars (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Computer Science & IT, Biological & Biomedical Sciences, Health & Medicine, Economics & Social Sciences'), notes = 'Presidential Scholarship FULL-TUITION; NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): ED acceptance: 37.2%, доля класса по ED: 18.4%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 37.2%, доля класса по ED: 18.4%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 37.2%, доля класса по ED: 18.4%, раунды подачи: ED II, EA.' WHERE slug = 'northeastern-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Flagstaff, AZ'), tuition_num = COALESCE(tuition_num, 28900), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$28,900 / год'), rate_num = COALESCE(rate_num, 91), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$6,652'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '14%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Education, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences'), notes = 'Northern Arizona University (NAU) is a public research university in Flagstaff, Arizona, United States.  Founded in 1899, it was the third and final university established in the Arizona Territory.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'northern-arizona-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Dekalb, IL'), tuition_num = COALESCE(tuition_num, 12700), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$12,700 / год'), rate_num = COALESCE(rate_num, 70.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '70.5%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Education, Psychology, Engineering, Economics & Social Sciences'), notes = 'Northern Illinois University (NIU) is a public research university in DeKalb, Illinois, United States.  It was founded as "Northern Illinois State Normal School" in 1895 by Illinois Governor John P.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'northern-illinois-university-usa';
UPDATE public.universities SET lang = COALESCE(NULLIF(lang, ''), 'NA'), sat = COALESCE(NULLIF(sat, ''), 'NA'), notes = 'Основан в 2008 году (Education City in Doha).

Полное финансирование: кампус Education City в Катаре с грантами и беспроцентными опциями.' WHERE slug = 'northwestern-university-in-qatar-qatar';
UPDATE public.universities SET how_apply_aid = 'CSS or ISAFA + supplements | CSS Waiver: Not provided', notes = 'Northwestern International Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Need-aware for internationals, full need once admitted | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need без займов.

Официальная политика помощи: Need-based financial aid is available to international students seeking undergraduate degrees. We guarantee to meet 100% of all admitted first-year students'' demonstrated financial need for all four years. A request for financial aid consideration and the amount of financial aid you require may be a factor in a final admission decision.

Статистика CDS (DREAM): ED acceptance: 24.9%, доля класса по ED: 54.6%.

Статистика CDS (fin aid): ED acceptance: 24.9%, доля класса по ED: 54.6%.

Статистика CDS (EDEARD): ED acceptance: 24.9%, доля класса по ED: 54.6%.' WHERE slug = 'northwestern-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 70589), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$70,589 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1510–1570'), notes = 'Northwestern University (NU) is a private research university in Evanston, Illinois, United States.  Established in 1851, it is the oldest chartered university in Illinois.' WHERE slug = 'northwestern-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Fort Lauderdale, FL'), rate_num = COALESCE(rate_num, 72.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '72.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1050–1310 · ACT 21–28'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Biological & Biomedical Sciences, Business & Management, Psychology, Education, Computer Science & IT'), notes = 'Nova Southeastern University (NSU) is a private research university in Florida with its main campus in Fort Lauderdale, Florida, United States.  The university consists of 12 colleges, offering over 130 academic degree programs at the undergraduate, graduate, and doctoral/professional levels.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'nova-southeastern-university-usa';
UPDATE public.universities SET notes = 'Основан в 2010 году (Abu Dhabi).

Полное финансирование: NYU Abu Dhabi — полная стипендия (обучение, общежитие, перелёт, карманные).' WHERE slug = 'nyu-abu-dhabi-uae';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$38,222'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '52%'), notes = 'ARTS / TALENT-BASED | Selection: Audition-based (Conservatory) / portfolio review | Intl: Yes, international applicants eligible | Chapter 7 — Arts & Talent-Based Scholarships

Статистика CDS (TARGET): раунды подачи: ED II.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'oberlin-college-and-conservatory-usa';
UPDATE public.universities SET how_apply_aid = 'CSS or ISAFA + supplements | CSS Waiver: Not provided', notes = 'Oberlin Financial Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Renowned Conservatory of Music also admits internationally | Aid form: CSS Profile

Официальная политика помощи: Oberlin provides grants, scholarships, loans, and on-campus employment to enable international students to meet all demonstrated financial need. More than 80 percent of our international students receive institutional financial aid, with the average aid package covering about three-quarters of the cost of attendance.' WHERE slug = 'oberlin-college-usa';
UPDATE public.universities SET notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Статистика CDS (TARGET): ED acceptance: 48.9%, доля класса по ED: 32%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 48.9%, доля класса по ED: 32%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 48.9%, доля класса по ED: 32%, раунды подачи: ED II.' WHERE slug = 'occidental-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Atlanta, GA'), rate_num = COALESCE(rate_num, 60.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '60.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$24,604'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1106–1320 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Biological & Biomedical Sciences, Communication & Media, Psychology, Economics & Social Sciences'), notes = 'Оглторпский университет — американский университет в Брукхейвене, штат Джорджия.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'oglethorpe-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ada, OH'), tuition_num = COALESCE(tuition_num, 37800), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$37,800 / год'), rate_num = COALESCE(rate_num, 73.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '73.4%'), aid_max = COALESCE(NULLIF(aid_max, ''), 'Full Tuition'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Mathile Scholarship (Full Tuition)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1173–1376 · ACT 25–29'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Engineering, Business & Management, Biological & Biomedical Sciences, Education, Visual & Performing Arts'), notes = 'Ohio Northern University is a private college in Ada, Ohio, United States.  Founded by Henry Solomon Lehr in 1871, ONU offers over 60 programs across five undergraduate and graduate colleges and is affiliated with the United Methodist Church.

Стипендия Mathile Scholarship (Full Tuition): мин. требования — 30+ ACT or 1330+ SAT (CR+M), 3.5+ GPA.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'ohio-northern-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$3,084'), notes = 'The Ohio State University is a public research university in Columbus, Ohio, United States.  Founded in 1870, it is the flagship institution of the University System of Ohio.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'ohio-state-university-columbus-usa';
UPDATE public.universities SET notes = 'The Ohio State University is a public research university in Columbus, Ohio, United States.  Founded in 1870, it is the flagship institution of the University System of Ohio.' WHERE slug = 'ohio-state-university-main-campus-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Columbus, OH'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Eminence Scholarship (Full Ride + $3,000 exp)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Health & Medicine, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology'), notes = 'Eminent Scholarship / Morrill Scholarship

Стипендия Eminence Scholarship (Full Ride + $3,000 exp): мин. требования — 34+ ACT or 1520+ SAT (CR+M), Typically Top 3% of Class.' WHERE slug = 'ohio-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Athens, OH'), tuition_num = COALESCE(tuition_num, 24114), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$24,114 / год'), rate_num = COALESCE(rate_num, 84.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '84.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1290 · ACT 22–28'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Communication & Media, Engineering, Education, Biological & Biomedical Sciences'), notes = 'Университе́т Ога́йо — американский публичный исследовательский университет, расположенный в кампусе в 7,5 км² в городе Атенс, штат Огайо.  Университет Огайо является первым вузом в Америке, образованным актом Конгресса, а также первым университетом на территории бывшей Северо-западной территории; он также является девятым старейшим государственным университетом в Соединенных Штатах.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'ohio-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Delaware, OH'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$27,729'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '87%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1105–1350 · ACT 25–31'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Education, Psychology, Economics & Social Sciences, Visual & Performing Arts'), notes = 'Уэслианский университет Огайо — гуманитарный колледж в городе Делавэр, штат Огайо, в США.  Уэслиан — среди старейших высших учебных заведений США, он был основан в 1842 году.

Статистика CDS (BACKUP): ED acceptance: 43%, доля класса по ED: 10%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 43%, доля класса по ED: 10%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 43%, доля класса по ED: 10%, раунды подачи: EA.' WHERE slug = 'ohio-wesleyan-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 33586), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,586 / год'), rate_num = COALESCE(rate_num, 70.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '70.4%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1150'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Health & Medicine, Business & Management, Education, Biological & Biomedical Sciences, Computer Science & IT') WHERE slug = 'oklahoma-city-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Stillwater, OK'), tuition_num = COALESCE(tuition_num, 25754), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$25,754 / год'), rate_num = COALESCE(rate_num, 70.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '70.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,621'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '32%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1030–1240 · ACT 20–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Liberal Arts, Psychology, Education'), notes = 'Университет штата Оклахома — исследовательский университет штата Оклахомав Стиллуотере.  Основан в 1890 году в соответствии с актом Моррилла как Сельскохозяйственный и технический колледж территории Оклахома.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'oklahoma-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Norfolk, VA'), tuition_num = COALESCE(tuition_num, 32662), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$32,662 / год'), rate_num = COALESCE(rate_num, 90.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '90.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$12,000'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '11%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1290 · ACT 22–27'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Economics & Social Sciences, Psychology, Computer Science & IT, Education'), notes = 'Old Dominion University (ODU) is a public research university in Norfolk, Virginia, United States.  Established in 1930 as the two-year Norfolk Division of the College of William & Mary, the school became an independent college in 1962 and attained university status in 1969.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'old-dominion-university-usa';
UPDATE public.universities SET total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), '$0.7m'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$25,533'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), majors = COALESCE(NULLIF(majors, ''), 'Engineering'), notes = 'The Franklin W.  Olin College of Engineering, commonly known as the Olin College of Engineering, is a private college for engineering in Needham, Massachusetts, United States.

Официальная политика помощи: Currently valued at more than $100,000, the merit-based Olin Tuition Scholarship benefits all admitted students. Offered for eight semesters of full time study and covering half the annual tuition charges, this scholarship recognizes achievement inside and outside the classroom and represents our confidence in your ability to succeed in this unique academic environment.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'olin-college-of-engineering-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Samsun'), majors = COALESCE(NULLIF(majors, ''), 'Chemistry, Materials Science, Dentistry, Medicine, Social Sciences, Arts and Humanities') WHERE slug = 'ondokuz-may-s-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Medicine, Computer Science, Earth and Planetary Sciences, Dentistry, Biochemistry, Genetics and Molecular Biology, Arts and Humanities'), notes = 'Университет Гонконга (англ. The University of Hong Kong или HKU; кит. 香港大學) — старейшее высшее учебное заведение Гонконга, основанное в 1911 году в период зависимости Гонконга от Великобритании.' WHERE slug = 'open-university-of-hong-kong-hong-kong';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ordu'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Agricultural and Biological Sciences, Mathematics, Social Sciences, Arts and Humanities, Medicine') WHERE slug = 'ordu-niversitesi-turkey';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 35664), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$35,664 / год'), rate_num = COALESCE(rate_num, 78.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '78.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,225'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '16%'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Engineering, Business & Management, Biological & Biomedical Sciences, Environmental Science, Psychology'), notes = 'Университет штата Орегон — исследовательский университет штата Орегон, находящийся в городе Корваллис.  Крупнейший университет этого штата.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'oregon-state-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara') WHERE slug = 'orta-do-u-teknik-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Осакский университет (иногда Университет Осаки, реже Осакский государственный университет; яп. 大阪大学, Осака дайгаку, или сокр. яп. 阪大, Хандай) — один из крупнейших университетов Японии.' WHERE slug = 'osaka-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Osmaniye'), majors = COALESCE(NULLIF(majors, ''), 'Economics, Econometrics and Finance, Arts and Humanities, Medicine, Social Sciences, Energy, Business, Management and Accounting') WHERE slug = 'osmaniye-korkutata-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'p-zm-ny-p-ter-catholic-university-hungary';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Visual & Performing Arts, Communication & Media, Computer Science & IT, Economics & Social Sciences'), notes = 'Университет Пейс — американский частный университет в Нью-Йорке.  Университет основан в 1906 году.

Статистика CDS (fin aid): раунды подачи: EA, EA II.

Статистика CDS (EDEARD): раунды подачи: EA, EA II.' WHERE slug = 'pace-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daejeon'), majors = COALESCE(NULLIF(majors, ''), 'Business, Management and Accounting, Mathematics, Medicine, Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Decision Sciences') WHERE slug = 'pai-chai-university-korea';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A') WHERE slug = 'palack-university-olomouc-czech-republic';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), rate_num = COALESCE(rate_num, 62.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '62.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,961'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '78%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Communication & Media, Liberal Arts, Psychology, English & Literature'), notes = 'The New School is a private research university in New York City, New York, United States.  It was founded in 1919 as The New School for Social Research.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'parsons-the-new-school-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Computer Science, Earth and Planetary Sciences, Materials Science, Environmental Science, Social Sciences') WHERE slug = 'peking-university-china';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Erie, PA'), tuition_num = COALESCE(tuition_num, 26668), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$26,668 / год'), rate_num = COALESCE(rate_num, 95.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '95.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1320 · ACT 23–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Psychology, Health & Medicine, Computer Science & IT, Biological & Biomedical Sciences'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'penn-state-u-erie-behrend-college-usa';
UPDATE public.universities SET notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'penn-state-u-university-park-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Computer Science & IT, Communication & Media, Economics & Social Sciences, Biological & Biomedical Sciences'), notes = 'Университет штата Пенсильвания — государственный исследовательский университет штата Пенсильвания, находящийся в Юниверсити-Парк.  Один из 15 лучших финансируемых налогоплательщиками университетов США.' WHERE slug = 'pennsylvania-state-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 72672), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$72,672 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1290–1450') WHERE slug = 'pepperdine-university-partial-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Psychology, Economics & Social Sciences, Visual & Performing Arts, Biological & Biomedical Sciences'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'pepperdine-university-usa';
UPDATE public.universities SET notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Part of the Claremont Consortium | Aid form: CSS Profile

Полное финансирование: 100% demonstrated need (ограниченный бюджет для иностранцев).

Официальная политика помощи: …if admitted, the financial aid award will meet the student''s full demonstrated need in the form of scholarship assistance and/or institutional work study.

Статистика CDS (DREAM): ED acceptance: 33.8%, доля класса по ED: 58.7%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 33.8%, доля класса по ED: 58.7%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 33.8%, доля класса по ED: 58.7%, раунды подачи: ED II.' WHERE slug = 'pitzer-college-usa';
UPDATE public.universities SET notes = 'Основан в 1971 году (Barcelona).' WHERE slug = 'polytechnic-university-of-catalonia-spain';
UPDATE public.universities SET notes = 'Миланский технический университет (итал. Politecnico di Milano) — самый крупный технический университет Италии. В университете обучаются около 40 000 студентов.' WHERE slug = 'polytechnic-university-of-milan-italy';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Pomona Access Pass', notes = 'Pomona Financial Aid Policy 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy; meets full need | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (высокий средний грант).

Официальная политика помощи: Any admitted student with a demonstrated need will be offered a financial aid package that meets 100 percent of that need

Статистика CDS (DREAM): ED acceptance: 15.4%, доля класса по ED: 51.2%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 15.4%, доля класса по ED: 51.2%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 15.4%, доля класса по ED: 51.2%, раунды подачи: ED II.' WHERE slug = 'pomona-college-usa';
UPDATE public.universities SET notes = 'Основан в 1990 году (Barcelona).' WHERE slug = 'pompeu-fabra-university-upf-spain';
UPDATE public.universities SET notes = 'Пхоханский университет науки и технологии (Pohang University of Science and Technology или POSTECH; кор. 포항공과대학교 (포항공대), 浦項工科大學校 (浦項工大), Pohang Gonggwa Daehakgyo (Pohang Gongdae), P''ohang Kongkwa Taehakkyo (P''ohang Kongdae)) — частный университет, расположенный в г.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'postech-pohang-university-of-science-and-technology-korea';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Economics, Econometrics and Finance, Agricultural and Biological Sciences, Engineering, Biochemistry, Genetics and Molecular Biology, Medicine, Environmental Science') WHERE slug = 'poznan-university-of-life-sciences-poland';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A') WHERE slug = 'prague-college-czech-republic';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Brooklyn, NY'), rate_num = COALESCE(rate_num, 53.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '53.2%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,293'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '43%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1220–1420 · ACT 26–32'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Architecture, English & Literature'), notes = 'Институт Пратта — одно из ведущих учебных заведений в области искусства, дизайна и архитектуры в Соединенных Штатах Америки.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'pratt-institute-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Prescott, AZ'), tuition_num = COALESCE(tuition_num, 35685), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$35,685 / год'), rate_num = COALESCE(rate_num, 98.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '98.6%'), majors = COALESCE(NULLIF(majors, ''), 'Psychology, Environmental Science, Economics & Social Sciences, Education, Liberal Arts'), notes = 'Prescott College is a private college in Prescott, Arizona, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'prescott-college-usa';
UPDATE public.universities SET notes = 'Princeton Financial Aid Program 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | No-loan policy since 2001; grants only, no loans | Aid form: CSS Profile

Полное финансирование: need-blind; бесплатная своя форма PFAA вместо CSS Profile.

Официальная политика помощи: Princeton meets 100 percent of the financial need ...

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'princeton-university-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Liberal Arts Honors Program (Up to Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Health & Medicine, Education'), notes = 'Providence College is a private Catholic university in Providence, Rhode Island, United States.  Founded in 1917 by the Dominican Order and the Diocese of Providence, it offers 47 undergraduate majors and 17 graduate programs.

Статистика CDS (TARGET): ED acceptance: 81.3%, доля класса по ED: 33.9%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 81.3%, доля класса по ED: 33.9%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 81.3%, доля класса по ED: 33.9%, раунды подачи: ED II, EA.' WHERE slug = 'providence-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Busan'), majors = COALESCE(NULLIF(majors, ''), 'Immunology and Microbiology, Materials Science, Agricultural and Biological Sciences, Physics and Astronomy, Engineering, Chemistry') WHERE slug = 'pukyong-national-university-korea';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$3,024'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '8%'), notes = 'Пёрдьювский университет или Университет Пёрдью — государственный исследовательский университет штата Индиана, расположенный в городе Уэст-Лафейетт.  Главный из шести кампусов системы Пёрдьювского университета.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'purdue-university-west-lafayette-usa';
UPDATE public.universities SET notes = 'Purdue University is a public land-grant research university, with its main campus in West Lafayette, Indiana, United States, and an urban campus in Indianapolis.  The university was founded in 1869 after Lafayette businessman John Purdue donated land and money to establish a college of science, technology, and agriculture; the first classes were held on September 16, 1874.' WHERE slug = 'purdue-university-west-lafayette-west-usa';
UPDATE public.universities SET notes = 'Пусанский университет (кор. 부산대학교; Пусан тэхаккё) — один из крупнейших университетов и первый государственный университет в Республике Корея. Является одним из самых известных и престижных национальных университетов наряду с Сеульским университетом и опорным университетом страны.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'pusan-national-university-south-korea';
UPDATE public.universities SET notes = 'Основан в 1973 году (Education City in Doha).' WHERE slug = 'qatar-university-qatar';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Medicine, Engineering, Social Sciences, Computer Science'), notes = 'Лондонский университет королевы Марии (англ. Queen Mary University of London, сокращённо QMUL или QM) — высшее учебное заведение в Лондоне (Великобритания), государственный исследовательский университет и один из учредителей федерального Лондонского университета.' WHERE slug = 'queen-mary-university-london-qmul-uk';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://welcome.uwo.ca/international/finances/bursaries_and_financial_aid.html'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Science, Dentistry, Education, Environmental Design, Kinesiology, Law, Medicine, Music, Optometry, Nursing, Public Health, Pharmacy, Veterinary Medicine, Continuing Education, Polytechnique Montréal, HEC Montréal,'), notes = 'Университет Куинс, официально Университет Куинс в Кингстоне, Королевский университет — канадский государственный исследовательский университет, расположенный в городе Кингстон в провинции Онтарио.  Является одним из самых престижных университетов мира.' WHERE slug = 'queen-s-university-at-kingston-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Charlotte, NC'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$32,546'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '89%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1300 · ACT 24–29'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Communication & Media, Psychology, Visual & Performing Arts'), notes = 'Queens University of Charlotte is a private university in Charlotte, North Carolina, United States.  The university is affiliated with the Presbyterian Church (USA).

Статистика CDS (BACKUP): ED acceptance: 79.7%, доля класса по ED: 17.6%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 79.7%, доля класса по ED: 17.6%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 79.7%, доля класса по ED: 17.6%, раунды подачи: EA, EA II.' WHERE slug = 'queens-university-of-charlotte-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'English for Academic Purposes (EAP) Program Bursary, Equity scholarships scheme, Coral Reef Vulnerability Mapping scholarships') WHERE slug = 'queensland-university-of-technology-australia';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1300 · ACT 25–29'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Communication & Media, Visual & Performing Arts, Biological & Biomedical Sciences, Psychology'), notes = 'Квиннипэкский университет — частный университет, расположенный в Хамдене и Северном Хейвене.  Основан в 1929 году как Коннектикутский колледж торговли, с 2000 года носит современное название.

Статистика CDS (fin aid): раунды подачи: EA, EA II.

Статистика CDS (EDEARD): раунды подачи: EA, EA II.' WHERE slug = 'quinnipiac-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Lynchburg, VA'), rate_num = COALESCE(rate_num, 94.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '94.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 960–1210 · ACT 20–24'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Visual & Performing Arts, Education, Environmental Science'), notes = 'Randolph College is a private liberal arts and sciences college in Lynchburg, Virginia, United States.  Founded in 1891 as Randolph-Macon Woman''s College, it was renamed on July 1, 2007, when it became coeducational.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'randolph-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'rebro-university-sweden';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Rize'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Environmental Science, Arts and Humanities, Chemistry, Dentistry, Medicine') WHERE slug = 'recep-tayip-erdo-an-niversitesi-turkey';
UPDATE public.universities SET notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy; academically intense | Aid form: CSS Profile

Официальная политика помощи: If you apply for need-based aid, meet all published deadlines, and we offer you admission, we are committed to meeting 100% of your demonstrated financial aid.

Статистика CDS (TARGET): ED acceptance: 48%, доля класса по ED: 27.4%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 48%, доля класса по ED: 27.4%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 48%, доля класса по ED: 27.4%, раунды подачи: ED II, EA.' WHERE slug = 'reed-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Denver, CO'), rate_num = COALESCE(rate_num, 87.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '87.3%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1220'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Computer Science & IT, Psychology, Communication & Media'), notes = 'Университет Реджиса — частный иезуитский университет в Денвере, штат Колорадо, США.  Основан в 1877 году.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'regis-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Mathematics & Statistics, Physical Sciences, Business & Management, Biological & Biomedical Sciences'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Oldest technological research university in the US | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'rensselaer-polytechnic-institute-usa';
UPDATE public.universities SET notes = 'Политехнический институт Ренсселера — частный университет в США.  Расположен в городе Трой, штат Нью-Йорк.' WHERE slug = 'rensselaer-polytechnic-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Providence, RI'), rate_num = COALESCE(rate_num, 13.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '13.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1370–1540 · ACT 30–33'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Architecture'), notes = 'Род-Айлендская школа дизайна — американская частная школа искусства и дизайна в Провиденсе, штат Род-Айленд.' WHERE slug = 'rhode-island-school-of-design-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Bellingrath Scholarship (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Business & Management, Physical Sciences, Computer Science & IT, Psychology'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based + merit aid for internationals | Aid form: CSS Profile

Полное финансирование: Bellingrath / Trustees — до полного покрытия по merit + need.

Статистика CDS (TARGET): ED acceptance: 65.9%, доля класса по ED: 28%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 65.9%, доля класса по ED: 28%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 65.9%, доля класса по ED: 28%, раунды подачи: ED II, EA.' WHERE slug = 'rhodes-college-usa';
UPDATE public.universities SET how_apply_aid = '75$ application fee/CSS | CSS Waiver: Not provided', notes = 'The Rice Investment 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Aid limited to a set number of intl first-years/year | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для принятых иностранцев.

Официальная политика помощи: Rice will meet 100% of demonstrated financial need as determined by university calculations.

Статистика CDS (DREAM): ED acceptance: 15.5%, доля класса по ED: 42.3%.

Статистика CDS (EDEARD): ED acceptance: 15.5%, доля класса по ED: 42.3%.' WHERE slug = 'rice-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Merit based full tuition free waiver + €5''000 by Latvian government') WHERE slug = 'riga-international-school-of-economics-and-business-administration-latvia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '€5''000 by Latvian government scholarship (see add. notes on the right)') WHERE slug = 'riga-stradins-university-latvia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '€5''000 by Latvian government scholarship (see add. notes on the right)') WHERE slug = 'riga-technical-university-latvia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'http://en.ritsumei.ac.jp/current-students/financial-aid/'), notes = 'Основан в 1900 году (Ritsumeikan).' WHERE slug = 'ritsumeikan-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Şırnak'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Business, Management and Accounting, Economics, Econometrics and Finance, Agricultural and Biological Sciences, Computer Science') WHERE slug = 'rnak-niversitesi-turkey';
UPDATE public.universities SET rate_num = COALESCE(rate_num, 80.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '80.1%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1270 · ACT 22–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Physical Sciences, Education'), notes = 'NAMED COMPETITIVE AWARD | Selection: Automatic merit grant at admission; Scholars Program via on-campus competition | Intl: Yes, internationals eligible for both | Chapter 3 — Near-Universal Merit Aid

Статистика CDS (fin aid): раунды подачи: EA, EA II.

Статистика CDS (EDEARD): раунды подачи: EA, EA II.' WHERE slug = 'roanoke-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Moon Township, PA'), tuition_num = COALESCE(tuition_num, 34940), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$34,940 / год'), rate_num = COALESCE(rate_num, 90.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '90.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$27,959'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '34%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Education, Psychology, Mathematics & Statistics'), notes = 'Robert Morris University (RMU) is a private university in Moon Township, Pennsylvania, United States.  It was founded in 1921 and is named after Robert Morris, known as the "financier of the American Revolution".

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'robert-morris-university-usa';
UPDATE public.universities SET notes = 'The Rochester Institute of Technology of Dubai is a satellite campus of Rochester Institute of Technology, New York, USA, in Dubai, United Arab Emirates.  The college is located in the Dubai Silicon Oasis and started offering part-time graduate courses in Fall 2008.' WHERE slug = 'rochester-institute-of-technology-dubai-uae';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1280–1460 · ACT 29–33'), notes = 'The Rochester Institute of Technology (RIT) is a private research university in Henrietta, New York, United States, a suburb of Rochester.  It was founded in 1829.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'rochester-institute-of-technology-usa';
UPDATE public.universities SET notes = 'The Rochester Institute of Technology (RIT) is a private research university in Henrietta, New York, United States, a suburb of Rochester.  It was founded in 1829.' WHERE slug = 'rochester-institute-of-usa';
UPDATE public.universities SET notes = 'The Rochester Institute of Technology (RIT) is a private research university in Henrietta, New York, United States, a suburb of Rochester.  It was founded in 1829.' WHERE slug = 'rochester-institute-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Engineering'), notes = 'Этот шаблон нужно подставить — замените его на {{подст:ds}}.' WHERE slug = 'rockhurst-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bristol, RI'), rate_num = COALESCE(rate_num, 87.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '87.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1300 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Architecture, Psychology, Biological & Biomedical Sciences, Education, Engineering'), notes = 'Roger Williams University (RWU) is a private university in Bristol, Rhode Island, United States.  Founded in 1956, it was named for theologian and Rhode Island cofounder Roger Williams.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'roger-williams-university-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Alfond Scholars Program (Full Ride)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Communication & Media, Psychology, Visual & Performing Arts, Biological & Biomedical Sciences'), notes = 'Rollins College is a private liberal arts college in Winter Park, Florida, United States.  It was founded in 1885.

Статистика CDS (BACKUP): ED acceptance: 58.3%, доля класса по ED: 35.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 58.3%, доля класса по ED: 35.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 58.3%, доля класса по ED: 35.4%, раунды подачи: ED II.' WHERE slug = 'rollins-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Terre Haute, IN'), rate_num = COALESCE(rate_num, 76.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '76.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,487'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '14%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1320–1500'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Physical Sciences'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'rose-hulman-inst-of-technology-usa';
UPDATE public.universities SET notes = 'Rose–Hulman Institute of Technology (RHIT) is a private university in Terre Haute, Indiana, United States.  It was founded in 1874 and houses twelve academic departments with over thirty undergraduate and graduate degree programs in science, engineering, technology, and engineering management, leading to bachelor''s and master''s degrees.' WHERE slug = 'rose-hulman-institute-usa';
UPDATE public.universities SET notes = 'Роскилльский университет (дат. Roskilde Universitet, RUC) — государственный университет в Дании, основанный в 1972 году как новое прогрессивное учебное заведение после масштабных студенческих протестов в Копенгагенском университете, вдохновлённых глобальным протестным движением 1968 года.' WHERE slug = 'roskilde-university-denmark';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Engineering, Communication & Media, Education, Computer Science & IT'), notes = 'Университет Роуэна — университет в городе Глассборо, штат Нью-Джерси.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'rowan-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Engineering, Health & Medicine, Biological & Biomedical Sciences, Economics & Social Sciences'), notes = 'Rutgers University–New Brunswick is the largest campus of Rutgers University, a public land-grant research university consisting of three major campuses in New Jersey.  It is located primarily in New Brunswick and Piscataway.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'rutgers-university-new-brunswick-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Isparta'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Medicine, Business, Management and Accounting, Social Sciences, Arts and Humanities, Agricultural and Biological Sciences') WHERE slug = 's-leyman-demirel-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kahramanmaraş') WHERE slug = 's-t-i-mam-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Fairfield, CT'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$25,237'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '72%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Psychology, Communication & Media, Economics & Social Sciences'), notes = 'Университет Святейшего Сердца — католический университет, расположенный в городе Фэрфилд.  Основан в 1963 году епископом Бриджпорта Уолтером Уильямом Кертисом.

Статистика CDS (BACKUP): ED acceptance: 84.9%, доля класса по ED: 13.4%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 84.9%, доля класса по ED: 13.4%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 84.9%, доля класса по ED: 13.4%, раунды подачи: EA, EA II.' WHERE slug = 'sacred-heart-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Education'), notes = 'Saint Anselm College is a private Benedictine liberal arts college in Goffstown, New Hampshire, United States.  Founded in 1889, it is named after Saint Anselm of Canterbury.

Статистика CDS (BACKUP): ED acceptance: 81.8%, доля класса по ED: 5.3%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 81.8%, доля класса по ED: 5.3%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 81.8%, доля класса по ED: 5.3%, раунды подачи: EA.' WHERE slug = 'saint-anselm-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Joseph, MN'), rate_num = COALESCE(rate_num, 91.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91.4%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 950–1220 · ACT 21–27'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Health & Medicine, Psychology, Business & Management, Education, Communication & Media'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'saint-john-s-university-minnesota-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Education'), notes = 'Университет Святого Иосифа — частный иезуитский университет в Филадельфии, штат Пенсильвания, США.  Основан в 1851 году.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'saint-joseph-s-university-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholarship (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Engineering, Psychology, Economics & Social Sciences'), notes = 'Сент-Луисский университе́т — частный иезуитский университет с совместным обучением, который расположен в Сент-Луисе, штат Миссури, США.  Является одним из старейших американских университетов: вторым католическим, после Джорджтаунского, и первым на всей территории к западу от реки Миссисипи.

Стипендия Presidential Scholarship (Full Tuition): мин. требования — 30+ ACT or 1330+ SAT (CR+M), 3.85+ GPA (weighted or unweighted).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'saint-louis-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Notre Dame, IN'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$42,596'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1310 · ACT 25–30'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Psychology, Biological & Biomedical Sciences, Education, Communication & Media'), notes = 'Saint Mary''s College is a private Catholic women''s liberal arts college in Notre Dame, Indiana, United States.  Founded in 1844 by the Sisters of the Holy Cross, the name of the school refers to the Virgin Mary.

Статистика CDS (BACKUP): ED acceptance: 88.2%, доля класса по ED: 20.1%.

Статистика CDS (fin aid): ED acceptance: 88.2%, доля класса по ED: 20.1%.

Статистика CDS (EDEARD): ED acceptance: 88.2%, доля класса по ED: 20.1%.' WHERE slug = 'saint-mary-s-college-indiana-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Moraga, CA'), rate_num = COALESCE(rate_num, 88.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '88.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$42,596'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Economics & Social Sciences, Liberal Arts, Biological & Biomedical Sciences, Visual & Performing Arts'), notes = 'Saint Mary''s College of California is a private Catholic college in Moraga, California, United States.  Established in 1863, it is administered by the De La Salle Brothers.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'saint-mary-s-college-of-california-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Colchester, VT'), rate_num = COALESCE(rate_num, 91.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1310 · ACT 22–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Biological & Biomedical Sciences, Economics & Social Sciences, Health & Medicine, Environmental Science'), notes = 'Saint Michael''s College is a private Catholic college in Colchester, Vermont, United States.  Founded in 1904 by the Society of Saint Edmund, it grants Bachelor of Arts and Bachelor of Science degrees to about 1,100 undergraduate students and Master''s degrees and certificates to about 200 graduate students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'saint-michael-s-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Adapazarı'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Materials Science, Engineering, Medicine, Business, Management and Accounting') WHERE slug = 'sakarya-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Salisbury, MD'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$4,644'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '48%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1310 · ACT 26–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Education, Psychology, Communication & Media, Public Policy & Social Work'), notes = 'Солсберийский университет — государственный университет в Солсбери, штате Мэриленд, США.  Основан в 1925 году как Нормальная школа штата Мэриленд.

Статистика CDS (BACKUP): ED acceptance: 71.3%, доля класса по ED: 16.9%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 71.3%, доля класса по ED: 16.9%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 71.3%, доля класса по ED: 16.9%, раунды подачи: EA.' WHERE slug = 'salisbury-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Newport, RI'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,442'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '93%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1295 · ACT 26–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Psychology, Education, Biological & Biomedical Sciences, Visual & Performing Arts'), notes = 'Salve Regina University is a private coeducational Catholic university in Newport, Rhode Island, United States.  It was founded in 1934 by the Sisters of Mercy and is accredited by the New England Commission of Higher Education.

Статистика CDS (BACKUP): раунды подачи: EA, EA II.

Статистика CDS (fin aid): раунды подачи: EA, EA II.

Статистика CDS (EDEARD): раунды подачи: EA, EA II.' WHERE slug = 'salve-regina-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Economics & Social Sciences, Psychology, Communication & Media, Health & Medicine'), notes = 'Университет штата Калифорния в Сан-Диего — высшее учебное заведение в городе Сан-Диего, штат Калифорния, США.  Старейшее и самое крупное высшее учебное заведение в округе Сан-Диего.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'san-diego-state-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,360'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), notes = 'Институт искусств Сан-Франциско (англ. San Francisco Art Institute, сокр. SFAI) — частный некоммерческий колледж современного искусства, главный кампус которого расположен на Рашен-Хилл в Сан-Франциско, штат Калифорния.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'san-francisco-art-institute-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Psychology, Biological & Biomedical Sciences, Communication & Media, Economics & Social Sciences'), notes = 'Университе́т штата Калифорния в Сан-Франци́ско — высшее учебное заведение в составе системы Университета штата Калифорния.  Университет предлагает 118 программ бакалавриата, 94 программы магистратуры и 5 программ докторантуры, а также 26 учебных программ в шести академических колледжах.' WHERE slug = 'san-francisco-state-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,832'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '23%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Visual & Performing Arts, Psychology, Health & Medicine, Communication & Media'), notes = 'Университет штата Калифорния в Сан-Хосе — общественный университет США, расположенный в центре города Сан-Хосе, штата Калифорния.  Одно из 23-х отделений системы Университета штата Калифорния.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'san-jose-state-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Economics & Social Sciences, Communication & Media, Biological & Biomedical Sciences, Psychology'), notes = 'Университет Санта-Клары — американский частный некоммерческий иезуитский университет, который расположен в городе Санта-Клара штата Калифорния.

Статистика CDS (TARGET): ED acceptance: 67.8%, доля класса по ED: 22.1%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 67.8%, доля класса по ED: 22.1%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 67.8%, доля класса по ED: 22.1%, раунды подачи: ED II, EA.' WHERE slug = 'santa-clara-university-usa';
UPDATE public.universities SET notes = '«Сапиенца» (официальное название — «Сапиенца — Римский университет», итал. Sapienza — Università di Roma) — итальянский государственный университет, расположенный в Риме.' WHERE slug = 'sapienza-university-of-rome-italy';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts'), notes = 'Sarah Lawrence College (SLC) is a private liberal arts college in Yonkers, New York, United States.  Founded as a women''s college in 1926, Sarah Lawrence College has been coeducational since 1968.

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'sarah-lawrence-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bordeaux'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Emile Boutmy Scholarship (до ~€19,000/год на обучение и проживание)'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Economics, Econometrics and Finance, Arts and Humanities') WHERE slug = 'sciences-po-france';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Women''s college in the Claremont Consortium | Aid form: CSS Profile

Статистика CDS (TARGET): ED acceptance: 46.6%, доля класса по ED: 40.6%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 46.6%, доля класса по ED: 40.6%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 46.6%, доля класса по ED: 40.6%, раунды подачи: ED II.' WHERE slug = 'scripps-college-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1350 · ACT 23–30'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Computer Science & IT, Engineering, Psychology'), notes = 'Сиэтлский университет — американский иезуитский католический университет, расположенный в районе Фёрст-Хилл в Сиэтле, штат Вашингтон.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'seattle-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Konya'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Medicine, Dentistry, Arts and Humanities, Social Sciences, Chemistry') WHERE slug = 'sel-uk-niversitesi-turkey';
UPDATE public.universities SET lang = COALESCE(NULLIF(lang, ''), 'n/a'), sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'semmelweis-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Engineering, Energy, Chemistry, Materials Science, Physics and Astronomy') WHERE slug = 'seoul-national-university-of-science-and-technology-korea';
UPDATE public.universities SET notes = 'Сеульский университет (кор. 서울대학교, 서울大學校, Seoul Daehakgyo, Sŏul Taehakkyo, букв. Сеульский университет) — крупнейший и самый известный вуз Южной Кореи, расположенный в Сеуле.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'seoul-national-university-south-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Greensburg, PA'), rate_num = COALESCE(rate_num, 75.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '75.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$28,885'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1070–1270 · ACT 21–27'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Visual & Performing Arts, Education, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'Seton Hill University is a private Catholic university in Greensburg, Pennsylvania, United States.  Originally a women''s college, it became a coeducational university in 2002 and enrolls about 2,200 students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'seton-hill-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1236–1398 · ACT 27–32'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, English & Literature, History, Visual & Performing Arts'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: CSS Profile

Статистика CDS (EDEARD): ED acceptance: 83.7%, доля класса по ED: 31.7%, раунды подачи: ED II, EA.' WHERE slug = 'sewanee-the-university-of-the-south-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$35,660'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '84%'), notes = 'Севани: Университет Юга (англ.  Sewanee: The University of The South, широко известный как Севани — это частный университет с фокусом на программах бакалавриата в областях технических, естественных, гуманитарных наук, искусств, изначально основанный по инициативе Епископальной церкви.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'sewanee-university-of-the-south-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Biochemistry, Genetics and Molecular Biology, Medicine, Materials Science, Engineering, Physics and Astronomy') WHERE slug = 'shanghai-jiao-tong-university-china';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Uijeongbu-si'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Medicine, Nursing, Health Professions, Agricultural and Biological Sciences, Business, Management and Accounting'), notes = 'Ким Ун Ён (кор. 김웅용, род. 8 марта 1962) — корейский вундеркинд. В возрасте 4 лет он знал четыре языка и решал задачи по математическому анализу.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'shinhan-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Loudonville, NY'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1093–1360 · ACT 26–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Health & Medicine, Economics & Social Sciences, Communication & Media, Biological & Biomedical Sciences'), notes = 'Siena University, formerly Siena College, is a private Franciscan university in Loudonville, New York, United States.  It was founded by the Order of Friars Minor in 1937 and is named after the Franciscan friar Bernardino of Siena.

Статистика CDS (BACKUP): раунды подачи: EA.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'siena-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Siirt'), majors = COALESCE(NULLIF(majors, ''), 'Mathematics, Materials Science, Arts and Humanities, Agricultural and Biological Sciences, Chemical Engineering, Energy') WHERE slug = 'siirt-niversitesi-turkey';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'silesian-university-of-technology-poland';
UPDATE public.universities SET notes = 'Основан в 1964 году (Clementi).' WHERE slug = 'sim-singapore-institute-of-management-singapore';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 45538), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$45,538 / год'), how_apply_aid = 'Simmons Distinguished Scholar Award • Simmons Distinguished 
Scholar Award', sat = COALESCE(NULLIF(sat, ''), 'SAT 1230–1390 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Economics & Social Sciences, Psychology, Communication & Media, Public Policy & Social Work, Biological & Biomedical Sciences'), notes = 'Institutions of learning called Simmons College or Simmons University include:Simmons University, a women''s liberal arts college in Boston, Massachusetts Simmons College of Kentucky, a historically black college in Louisville, Kentucky Hardin–Simmons University, in Abilene, Texas

Полное финансирование: Kotzen Scholarship — full tuition + жильё (для девушек, merit).' WHERE slug = 'simmons-university-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'simon-fraser-university-canada';
UPDATE public.universities SET notes = '~CAD 32,000–55,000 per year (international undergraduate tuition varies by faculty), ~CAD 2,000–full tuition aid (entrance scholarships + merit- based awards + International Undergraduate Scholars Entrance Scholarship + need- based bursaries + faculty awards), ~5% –100% coverage depending on GPA and scholarship tier

Финансирование в Канаде (CAD): ~CAD 32,000–55,000 per year (international undergraduate tuition varies by faculty), ~CAD 2,000–full tuition aid (entrance scholarships + merit- based awards + International Undergraduate Scholars Entrance Scholarship + need- based bursaries + faculty awards), ~5% –100% coverage depending on GPA and scholarship tier.' WHERE slug = 'simon-fraser-university-sfu-canada';
UPDATE public.universities SET notes = 'Основан в 2000 году (Bras Basah).' WHERE slug = 'singapore-management-university-singapore';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), notes = 'Основан в 1954 году (Dover).' WHERE slug = 'singapore-polytechnic-singapore';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'not for KZ region. Extra scholarships only after enrollment'), notes = 'Основан в 1994 году (Clementi).' WHERE slug = 'singapore-university-of-social-sciences-suss-singapore';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'for SG citizens only. Extra scholarships only after enrollment'), notes = 'Основан в 2012 году (Tampines).' WHERE slug = 'singapore-university-of-technology-and-design-singapore';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Sinop'), majors = COALESCE(NULLIF(majors, ''), 'Chemistry, Physics and Astronomy, Materials Science, Earth and Planetary Sciences, Agricultural and Biological Sciences, Business, Management and Accounting') WHERE slug = 'sinop-niversitesi-turkey';
UPDATE public.universities SET notes = 'Skidmore College is a private liberal arts college in Saratoga Springs, New York.  Approximately 2,700 students are enrolled at Skidmore pursuing a Bachelor of Arts or Bachelor of Science degree in one of more than 60 areas of study.' WHERE slug = 'skidmore-college-saratoga-springsny-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$58,000'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '34%'), notes = 'Skidmore International Aid NEED-MET; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (очень высокий средний грант ~$58k).

Официальная политика помощи: Skidmore annually gives more than $43 million in financial aid on the basis of demonstrated financial need. The average 2016–17 first-year financial aid package for international students was $58,000.

Статистика CDS (TARGET): ED acceptance: 57.7%, доля класса по ED: 49.7%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 57.7%, доля класса по ED: 49.7%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 57.7%, доля класса по ED: 49.7%, раунды подачи: ED II.' WHERE slug = 'skidmore-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Slippery Rock, PA'), tuition_num = COALESCE(tuition_num, 14615), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$14,615 / год'), rate_num = COALESCE(rate_num, 74.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '74.6%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$5,866'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '87%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 980–1190 · ACT 19–25'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Education, Computer Science & IT, Communication & Media, Psychology'), notes = 'Slippery Rock University, formally Slippery Rock University of Pennsylvania, is a public university in the Slippery Rock, Pennsylvania area of the United States.  SRU is a member of the Pennsylvania State System of Higher Education (PASSHE).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'slippery-rock-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', notes = 'Smith Financial Aid Program 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Women''s college; strong international community | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need + STRIDE merit (женский колледж).

Официальная политика помощи: Smith meets 100 percent of the demonstrated need of all admitted students who apply for financial aid by the published deadlines

Статистика CDS (TARGET): ED acceptance: 61.3%, доля класса по ED: 48.5%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 61.3%, доля класса по ED: 48.5%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 61.3%, доля класса по ED: 48.5%, раунды подачи: ED II.' WHERE slug = 'smith-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$53,168'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), notes = 'Университет Сока в Америке — частный гуманитарный университет в Алисо-Вьехо (Калифорния).  Первоначально основанный в 1987 году, он был открыт в своем нынешнем кампусе в 2001 году Дайсаку Икедой, основателем Международного буддийского движения Сока Гаккай.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'soka-university-of-america-usa';
UPDATE public.universities SET notes = 'Японский Университет Сока (яп.  創価大学) — частный японский университет в Токио, основанный в 1971 году.' WHERE slug = 'soka-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Physics and Astronomy, Materials Science, Medicine, Energy, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'sookmyung-women-s-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Seoul'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Engineering, Biochemistry, Genetics and Molecular Biology, Computer Science, Psychology') WHERE slug = 'soonchunhyang-university-korea';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.sophia.ac.jp/eng/admissions/ug_p/en_ug/fla/pay_aid.html'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Софии (яп. 上智大学 дзё:ти дайгаку, «Университет Высшей Мудрости») — частное высшее учебное заведение в Токио, Япония. Находится в токийском районе Тиёда по адресу Киой, 7 — 1.' WHERE slug = 'sophia-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Hammond, LA'), tuition_num = COALESCE(tuition_num, 20851), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$20,851 / год'), rate_num = COALESCE(rate_num, 94.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '94.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$16,719'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '91%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1090'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Liberal Arts, Psychology, Biological & Biomedical Sciences, Education'), notes = 'Southeastern Louisiana University (Southeastern) is a public university in Hammond, Louisiana.  It was founded in 1925 by Linus A.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'southeastern-louisiana-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Education, Economics & Social Sciences, Biological & Biomedical Sciences, Engineering'), notes = 'Southern Illinois University is a system of public universities in the southern region of the U. S.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'southern-illinois-university-carbondale-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'President''s Scholarship (Full Ride + exp)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Communication & Media, Engineering, Visual & Performing Arts, Psychology'), notes = 'Nancy Ann and Ray L. Hunt Leadership Scholars; President''s Scholars FULL-TUITION; Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based + merit aid for internationals | Aid form: CSS Profile

Статистика CDS (TARGET): ED acceptance: 64.9%, доля класса по ED: 20.4%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 64.9%, доля класса по ED: 20.4%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 64.9%, доля класса по ED: 20.4%, раунды подачи: ED II, EA.' WHERE slug = 'southern-methodist-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1340 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Visual & Performing Arts, Education'), notes = 'Southwestern University is a private liberal arts university located in Georgetown, Texas.  Established in 1840, it holds the distinction of being both the oldest college or university in Texas, and having maintained continuous, unbroken operation since its founding.

Статистика CDS (TARGET): ED acceptance: 26.1%, доля класса по ED: 5.4%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 26.1%, доля класса по ED: 5.4%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 26.1%, доля класса по ED: 5.4%, раунды подачи: EA.' WHERE slug = 'southwestern-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Atlanta, GA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$38,042'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '56%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1060–1270 · ACT 21–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Health & Medicine, Visual & Performing Arts'), notes = 'Spelman College is a private, historically Black, women''s liberal arts college in Atlanta, Georgia, United States.  It is a founding member of the Atlanta University Center academic consortium.

Статистика CDS (TARGET): ED acceptance: 40.3%, доля класса по ED: 16.9%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 40.3%, доля класса по ED: 16.9%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 40.3%, доля класса по ED: 16.9%, раунды подачи: EA.' WHERE slug = 'spelman-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Cloud, MN'), tuition_num = COALESCE(tuition_num, 10117), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$10,117 / год'), rate_num = COALESCE(rate_num, 95), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '95%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 970–1280 · ACT 18–25'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Computer Science & IT, Education, Liberal Arts, Psychology'), notes = 'St.  Cloud State University (SCSU) is a public university in St.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'st-cloud-state-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,177'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '91%'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts'), notes = 'St.  John''s College is a private liberal arts college with campuses in Annapolis, Maryland, and Santa Fe, New Mexico.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'st-john-s-college-annapolis-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$27,472'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'st-john-s-college-santa-fe-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Communication & Media, Health & Medicine, Education'), notes = 'St.  John''s University is a private Catholic university in Queens, New York City, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'st-john-s-university-new-york-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Trustee Scholarship (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Communication & Media, Environmental Science, Mathematics & Statistics'), notes = 'NAMED COMPETITIVE AWARD | Selection: Nomination via partner network in Kenya | Intl: Region-specific: Kenya only | Chapter 5 — Named Competitive Full-Ride Programs; Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: CSS Profile

Статистика CDS (TARGET): ED acceptance: 74.4%, доля класса по ED: 36.5%.

Статистика CDS (fin aid): ED acceptance: 74.4%, доля класса по ED: 36.5%.

Статистика CDS (EDEARD): ED acceptance: 74.4%, доля класса по ED: 36.5%.' WHERE slug = 'st-lawrence-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'St. Mary''s City, MD'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,763'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '43%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1330 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Environmental Science, English & Literature, Computer Science & IT'), notes = 'St.  Mary''s College of Maryland (SMCM) is a public liberal arts college in St.

Статистика CDS (BACKUP): ED acceptance: 89.5%, доля класса по ED: 10.6%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 89.5%, доля класса по ED: 10.6%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 89.5%, доля класса по ED: 10.6%, раунды подачи: EA.' WHERE slug = 'st-mary-s-college-of-maryland-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'San Antonio, TX'), tuition_num = COALESCE(tuition_num, 36242), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$36,242 / год'), rate_num = COALESCE(rate_num, 89), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '89%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$34,503'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '69%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 980–1150 · ACT 16–23'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Engineering, English & Literature'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'st-mary-s-university-tx-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'De Pere, WI'), rate_num = COALESCE(rate_num, 92.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '92.2%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1066–1220 · ACT 22–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Education, Economics & Social Sciences, Psychology, Communication & Media'), notes = 'St.  Norbert College (SNC) is a private Norbertine liberal arts college in De Pere, Wisconsin, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'st-norbert-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Visual & Performing Arts, Biological & Biomedical Sciences, Physical Sciences, Psychology, Mathematics & Statistics'), notes = 'St.  Olaf College is a private liberal arts college in Northfield, Minnesota, United States.

Официальная политика помощи: Degree-seeking students may apply for international scholarships. While the average award is half-tuition, last year, scholarships for our international students ranged from $5,000 to $56,430. Scholarships, on-campus work-study, and loans are awarded to students who demonstrate academic excellence and financial need

Статистика CDS (TARGET): ED acceptance: 75.6%, доля класса по ED: 37.7%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 75.6%, доля класса по ED: 37.7%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 75.6%, доля класса по ED: 37.7%, раунды подачи: ED II, EA.' WHERE slug = 'st-olaf-college-usa';
UPDATE public.universities SET notes = 'нужно обратиться за фин.помощью во время подачи, иначе потом ты не имеешь права получить ее. также ее тяжело получить; Stanford International Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Families under $150K generally pay no tuition | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (need-aware для иностранцев).

Официальная политика помощи: Stanford is committed to meeting demonstrated financial need for all admitted students (regardless of citizenship) who have requested financial aid during the application

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'stanford-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'DeLand, FL'), rate_num = COALESCE(rate_num, 86.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '86.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$40,545'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '87%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1290 · ACT 23–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Visual & Performing Arts, Health & Medicine, Computer Science & IT, Biological & Biomedical Sciences'), notes = 'Стетсонский университет — частный университет в Центральной Флориде, США.  Основан в 1889 году на средства фабриканта ковбойских шляп Джона Б.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'stetson-university-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Full Tuition'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'The Ann P. Neupauer Scholarship (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Business & Management, Mathematics & Statistics, Visual & Performing Arts'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Strong industry placement for engineering/CS | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'stevens-institute-of-technology-usa';
UPDATE public.universities SET notes = 'Stevens Institute of Technology is a private research university in Hoboken, New Jersey, United States.  Founded in 1870, it is one of the oldest technological universities in the United States and was the first college in America solely dedicated to mechanical engineering.' WHERE slug = 'stevens-institute-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Full tuition fee waiver (max. 25 students) + merit based sch. up to €2''000 + €5''000 by Latvian government scholarship (see add. notes on the right') WHERE slug = 'stockholm-school-of-economics-in-riga-latvia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'stockholm-unversity-sweden';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Easton, MA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,714'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Education, Psychology, Biological & Biomedical Sciences, Health & Medicine'), notes = 'Stonehill College is a private Catholic college in Easton, Massachusetts, United States.  It was founded in 1948 by the Congregation of Holy Cross and is located on the original estate of Frederick Lothrop Ames Jr.

Статистика CDS (BACKUP): ED acceptance: 88.3%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 88.3%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 88.3%, доля класса по ED: 17.3%, раунды подачи: ED II, EA.' WHERE slug = 'stonehill-college-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1280 · ACT 24–32'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Communication & Media, Psychology, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'Саффолкский университет - частный исследовательский университет в Бостоне, штат Массачусетс.  В нем обучается 7560 студентов, что делает его восьмым по величине университетом в столичном Бостоне.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suffolk-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Asan'), majors = COALESCE(NULLIF(majors, ''), 'Immunology and Microbiology, Engineering, Energy, Materials Science, Physics and Astronomy, Biochemistry, Genetics and Molecular Biology'), notes = 'Университет Сонмун (кор. 선문대학교, англ. Sun Moon University) — частное высшее учебное заведение в Республике Корея.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'sun-moon-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Suncheon'), majors = COALESCE(NULLIF(majors, ''), 'Biochemistry, Genetics and Molecular Biology, Environmental Science, Agricultural and Biological Sciences, Immunology and Microbiology, Energy, Materials Science') WHERE slug = 'sunchon-national-university-korea';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Materials Science, Medicine, Engineering, Biochemistry, Genetics and Molecular Biology, Energy') WHERE slug = 'sungkyunkwan-university-skku-south-korea';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1320–1490 · ACT 29–34'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Economics & Social Sciences, Engineering, Psychology, Health & Medicine'), notes = 'The State University of New York at Binghamton, commonly referred to as Binghamton University (BU) or SUNY Binghamton, is a public research university in Greater Binghamton, New York, United States.  The university''s main campus spans 930 acres (380 ha) in the suburb of Vestal.' WHERE slug = 'suny-binghamton-university-usa';
UPDATE public.universities SET notes = 'Университет штата Нью-Йорк в Бингемтоне, также известный как Бингемтонский университет — государственный исследовательский университет с кампусами в Бингемтоне, Вестале и Джонсон-Сити в штате Нью-Йорк, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-binghamton-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Buffalo, NY'), tuition_num = COALESCE(tuition_num, 30572), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$30,572 / год'), rate_num = COALESCE(rate_num, 69.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '69.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,505'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '5%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1210–1380 · ACT 27–32'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Economics & Social Sciences, Psychology, Biological & Biomedical Sciences, Health & Medicine'), notes = 'Университет штата Нью-Йорк в Буффало — государственный научно-исследовательский университет в США, являющийся флагманом системы университетов штата Нью-Йорк (SUNY).  Университет Буффало имеет несколько кампусов — в Буффало и Амхерсте.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-buffalo-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Syracuse, NY'), tuition_num = COALESCE(tuition_num, 21036), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$21,036 / год'), rate_num = COALESCE(rate_num, 82.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '82.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$4,353'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '33%'), majors = COALESCE(NULLIF(majors, ''), 'Environmental Science, Biological & Biomedical Sciences, Engineering, Business & Management, Architecture'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-environ-science-and-forestry-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Geneseo, NY'), tuition_num = COALESCE(tuition_num, 19206), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$19,206 / год'), rate_num = COALESCE(rate_num, 63.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '63.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$3,590'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '93%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1200–1380 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Education, Economics & Social Sciences, Psychology, Business & Management, Biological & Biomedical Sciences, Communication & Media'), notes = 'The State University of New York College at Geneseo is a public liberal arts college in Geneseo, New York, United States.  It is the state''s public honors college and part of the State University of New York (SUNY) system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-geneseo-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Throggs Neck, NY'), tuition_num = COALESCE(tuition_num, 18450), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$18,450 / год'), rate_num = COALESCE(rate_num, 78.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '78.5%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1091–1285 · ACT 22–26'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Environmental Science'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-maritime-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Purchase, NY'), tuition_num = COALESCE(tuition_num, 18863), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$18,863 / год'), rate_num = COALESCE(rate_num, 72.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '72.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$2,120'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '6%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1178–1363 · ACT 27–32'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Communication & Media, Psychology, Economics & Social Sciences, Liberal Arts, English & Literature'), notes = 'Университет штата Нью-Йорк в Перчейзе или Перчейз-колледж — один из 13 общественных колледжей Университета штата Нью-Йорк.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-purchase-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Health & Medicine, Psychology, Business & Management, Economics & Social Sciences, Mathematics & Statistics'), notes = 'The State University of New York at Stony Brook, commonly referred to as Stony Brook University (SBU), is a public research university in Stony Brook, New York, United States, on Long Island.  Along with the University at Buffalo, it is one of the State University of New York system''s two flagship institutions.' WHERE slug = 'suny-stony-brook-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$2,731'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '2%'), notes = 'Университет штата Нью-Йорк в Стони-Бруке, также известный как Университет Стони-Брук — один из четырёх центров Университета штата Нью-Йорк, расположенный в Стони-Бруке, примерно в 105 км к востоку от Манхэттена.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'suny-stony-brook-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Computer Science & IT, Psychology, Biological & Biomedical Sciences, Communication & Media') WHERE slug = 'suny-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 19232), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$19,232 / год'), rate_num = COALESCE(rate_num, 70.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '70.2%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1250 · ACT 23–28'), majors = COALESCE(NULLIF(majors, ''), 'Education, Business & Management, Psychology, Visual & Performing Arts, Communication & Media, Biological & Biomedical Sciences') WHERE slug = 'suny-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$33,524'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '54%'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'susquehanna-college-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1090–1290 · ACT 22–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Communication & Media, Psychology, Education, English & Literature'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | (2024-25) | Aid form: CSS Profile / Institutional

Статистика CDS (EDEARD): ED acceptance: 55.6%, доля класса по ED: 5.6%, раунды подачи: EA, EA II.' WHERE slug = 'susquehanna-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS + ISAFA + supplements | CSS Waiver: Provided if admitted', notes = 'Swarthmore International Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy; strong Quaker access tradition | Aid form: CSS Profile

Полное финансирование: meets 100% need без займов + McCabe/Evans awards.

Официальная политика помощи: Admission to Swarthmore is need-aware for other international citizens. Regardless of citizenship, if you are accepted to Swarthmore, the College will meet 100 percent of your demonstrated need with a financial aid award up to—and including—full tuition, room and board, books, supplies, and transportation

Статистика CDS (DREAM): ED acceptance: 23.7%, доля класса по ED: 56.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 23.7%, доля класса по ED: 56.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 23.7%, доля класса по ED: 56.4%, раунды подачи: ED II.' WHERE slug = 'swarthmore-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Sweet Briar, VA'), tuition_num = COALESCE(tuition_num, 25110), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$25,110 / год'), rate_num = COALESCE(rate_num, 71.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '71.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1310 · ACT 21–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Environmental Science, Economics & Social Sciences, Engineering'), notes = 'Sweet Briar College is a private women''s liberal arts college in Sweet Briar, Amherst County, Virginia, United States.  It was established in 1901 by Indiana Fletcher Williams in memory of her deceased daughter, Daisy, and began holding classes in 1906.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'sweet-briar-college-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Swinburne International Excellence Undergraduate Scholarship, Swinburne International Alumni Direct Scholarship') WHERE slug = 'swinburne-university-of-technology-australia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'swiss-business-school-switzerland';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), lang = COALESCE(NULLIF(lang, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'swiss-federal-institute-of-technology-of-lausanne-switzerland';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), lang = COALESCE(NULLIF(lang, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'swiss-federal-institute-of-technology-switzerland';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Coronat Scholars (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Communication & Media, Business & Management, Economics & Social Sciences, Visual & Performing Arts, Psychology, Computer Science & IT'), notes = 'Leadership Scholarships FULL-TUITION

Стипендия Coronat Scholars (Full Tuition): мин. требования — College of Arts and Sciences applicant.' WHERE slug = 'syracuse-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'sz-chenyi-istv-n-university-hungary';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'szent-istv-n-university-hungary';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Siheung-si'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Engineering, Materials Science, Computer Science') WHERE slug = 'tech-university-of-korea-korea';
UPDATE public.universities SET notes = 'Датский технический университет (дат. Danmarks Tekniske Universitet, DTU) — технический университет и исследовательский институт, расположенный в коммуне Люнгбю-Торбек к северу от Копенгагена.' WHERE slug = 'technical-university-of-denmark-denmark';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'technical-university-of-lublin-poland';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Высшая школа горно-металлургическая — Остравский технический университет (чеш. Vysoká škola báňská – Technická univerzita Ostrava (VŠB - TUO)) — высшее учебное заведение в чешском городе Остраве.' WHERE slug = 'technical-university-of-ostrava-czech-republic';
UPDATE public.universities SET notes = 'The Technological and Higher Education Institute of Hong Kong (THEi) is a public vocational college in Chai Wan, Hong Kong Island, Hong Kong.  It is operated by the Vocational Training Council.' WHERE slug = 'technological-and-higher-education-institute-of-hong-kong-hong-kong';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 37462), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$37,462 / год'), rate_num = COALESCE(rate_num, 82.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '82.9%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$13,311'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '34%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Communication & Media, Visual & Performing Arts, Biological & Biomedical Sciences, Psychology'), notes = 'Университет Темпл, или Темпльский университет — государственный исследовательский университет в г.  Филадельфия, Пенсильвания.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'temple-university-usa';
UPDATE public.universities SET notes = 'Основан в 2003 году (Al Rayyan).' WHERE slug = 'texas-a-amp-m-university-at-qatar-qatar';
UPDATE public.universities SET notes = 'Texas A&M University is a public land-grant research university in College Station, Texas, United States.  It was founded in 1876 and became the flagship institution of the Texas A&M University System in 1948.' WHERE slug = 'texas-a-m-university-college-station-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$20,267'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '35%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'President''s Endowed Scholarship (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Biological & Biomedical Sciences, Health & Medicine, Economics & Social Sciences, Psychology'), notes = 'Техасский университет A&M — государственный исследовательский университет штата Техас, находящийся в городе Колледж-Стейшен.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'texas-a-m-university-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Chancellor''s Scholarship (Full Tuition)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1375 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Health & Medicine, Economics & Social Sciences, Psychology, Visual & Performing Arts'), notes = 'Chancellor''s Scholarship

Стипендия Chancellor''s Scholarship (Full Tuition): мин. требования — Typically 32+ ACT, 2130+ SAT (CR+M+W).

Статистика CDS (TARGET): ED acceptance: 51.1%, доля класса по ED: 20.3%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 51.1%, доля класса по ED: 20.3%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 51.1%, доля класса по ED: 20.3%, раунды подачи: EA.' WHERE slug = 'texas-christian-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Communication & Media, Psychology, Education'), notes = 'Presidential International Award HIGH

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'texas-tech-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Health Professions, Psychology, Neuroscience, Social Sciences, Computer Science'), notes = 'Академия музыкальных искусств в Праге (чеш. Akademie múzických umění v Praze, AMU) — высшее учебное заведение Чехии, направленное на подготовку работников в сфере исполнительского искусства, расположенное в Праге.' WHERE slug = 'the-academy-of-perfoming-arts-in-prague-czech-republic';
UPDATE public.universities SET notes = 'Основан в 2004 году (Academic City).' WHERE slug = 'the-british-university-in-dubai-uae';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Charleston, SC'), rate_num = COALESCE(rate_num, 98.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '98.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,258'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '20%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1080–1250 · ACT 22–26'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Economics & Social Sciences, Computer Science & IT, Psychology, Biological & Biomedical Sciences'), notes = 'The Citadel Military College of South Carolina is a public senior military college in Charleston, South Carolina, United States.  Established in 1842, it is the third oldest of the six senior military colleges in the United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'the-citadel-usa';
UPDATE public.universities SET notes = 'Ко́лледж, колле́дж — учебное заведение, главным образом в системах образования Великобритании, стран Британского Содружества и США.' WHERE slug = 'the-college-usa';
UPDATE public.universities SET how_apply_aid = 'CSS + Presidential scholarship | CSS Waiver: Not provided', majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Health & Medicine, Business & Management, Engineering, Biological & Biomedical Sciences, Psychology'), notes = 'Presidential Academic Scholarship FULL-TUITION; NAMED COMPETITIVE AWARD | Selection: Automatic consideration + separate application for some awards | Intl: Yes -- You Are Welcome Here Scholarship is specifically for internationals | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): ED acceptance: 71%, доля класса по ED: 32.4%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 71%, доля класса по ED: 32.4%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 71%, доля класса по ED: 32.4%, раунды подачи: ED II.' WHERE slug = 'the-george-washington-university-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Psychology, Decision Sciences, Medicine') WHERE slug = 'the-hong-kong-university-of-education-hong-kong';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), rate_num = COALESCE(rate_num, 62.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '62.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$18,288'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '93%'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Communication & Media, Liberal Arts, Psychology, English & Literature'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'the-new-school-coll-of-performing-arts-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Computer Science & IT, Communication & Media, Liberal Arts, Psychology, English & Literature'), notes = 'The New School is a private research university in New York City, New York, United States.  It was founded in 1919 as The New School for Social Research.' WHERE slug = 'the-new-school-usa';
UPDATE public.universities SET how_apply_aid = 'IFAW + supplements; подача на помощь: IFAW + supplements', notes = 'надо подавать сразу на фин помощь, а то потом не сможешь; UChicago Financial Aid Packages 100%; NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy (Odyssey/UChicago

Полное финансирование: Odyssey / Stamps / IFAW (бесплатная подача вместо CSS).

Официальная политика помощи: In fact, if you apply for need-based aid, and we offer you admission, we are committed to meeting 100% of your demonstrated financial aid.

Статистика CDS (DREAM): ED acceptance: 16.2%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): раунды подачи: ED II, EA.

Статистика CDS (EDEARD): раунды подачи: ED II, EA.' WHERE slug = 'the-university-of-chicago-usa';
UPDATE public.universities SET notes = 'Миланский государственный университет (итал. Università degli Studi di Milano или итал. Statale di Milano) — учебное заведение; является крупнейшим государственным университетом в Милане и Ломбардии, главный корпус которого находится в здании Ca'' Granda, построенном в XV веке миланским герцогом Франческо Сфорца.' WHERE slug = 'the-university-of-milan-italy';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Request via email', notes = 'нужно подать заявку на aid одновременно с поступлением, иначе потом не получится; Penn Financial Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy since 2009 | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need без займов (Penn Grant).

Официальная политика помощи: Admitted international students who apply for aid when applying for admission will receive aid that meets 100 percent of their family''s demonstrated need—during each year of their undergraduate career.

Статистика CDS (DREAM): ED acceptance: 18%, доля класса по ED: 53.3%.

Статистика CDS (fin aid): ED acceptance: 18%, доля класса по ED: 53.3%.

Статистика CDS (EDEARD): ED acceptance: 18%, доля класса по ED: 53.3%.' WHERE slug = 'the-university-of-pennsylvania-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'the-university-of-tokyo-japan';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.tohoku.ac.jp/en/admissions/financial_aid.html'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Тохоку (яп. 東北大学 То:хоку дайгаку) — один из национальных университетов Японии, основанный в 1907 году. Ранее входил в число императорских университетов.' WHERE slug = 'tohoku-university-japan';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.titech.ac.jp/english/enrolled/tuition/financial_aid/'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Токийский технологический институт (яп. 東京工業大学, とうきょうこうぎょうだいがく то:кё: ко:гё: дайгаку) — крупнейшее учреждение высшего образования в Японии, специализирующееся на науке и технике.' WHERE slug = 'tokyo-institute-of-technology-japan';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.s.u-tokyo.ac.jp/en/offices/ilo/scholarship.html'), lang = COALESCE(NULLIF(lang, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Основан в 1881 году (Tokyo).' WHERE slug = 'tokyo-university-of-science-japan';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Основан в 2001 году (Zlín).' WHERE slug = 'tomas-bata-university-czech-republic';
UPDATE public.universities SET notes = 'Университет Тор Вергата (итал. Università degli Studi di Roma Tor Vergata) — является итальянским государственным университетом. В Риме это второй государственный университет в хронологическом порядке основания и третий по количеству учащихся.' WHERE slug = 'tor-vergata-university-of-rome-italy';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Computer Science & IT, Economics & Social Sciences, Education, Psychology'), notes = 'Таусонский университет — государственный университет в Таусоне, штате Мэриленд, США.  Основан в 1866 году как Нормальная школа штата Мэриленд.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'towson-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Edirne'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Agricultural and Biological Sciences, Arts and Humanities, Medicine, Dentistry, Environmental Science'), notes = 'Фракийский университет (тур. Trakya Üniversitesi) — государственный университет в турецкой провинции Эдирне. Основан в 1982 году на базе открытого в 1974 году эдирнейского филиала медицинского факультета Стамбульского университета.

TÜRKIYE BURSLARI | https://turkiyeburslari.gov.tr/ | Бакалавриат & Магистратура & PhD | Распространяется на 103 университета Турции Что покрывает: распределение по университету и факультету, ежемесячная' WHERE slug = 'trakya-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Hartford, CT'), tuition_num = COALESCE(tuition_num, 73590), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$73,590 / год'), rate_num = COALESCE(rate_num, 29.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '29.3%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1298–1470') WHERE slug = 'trinity-college-ct-usa';
UPDATE public.universities SET notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для принятых иностранцев.

Официальная политика помощи: Although the college is not a need-blind institution, it is committed to meeting 100% of the demonstrated financial need of any admitted student.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'trinity-college-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Murchison Scholarship (Up to Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Engineering, Computer Science & IT, Communication & Media'), notes = 'DEBATE / FORENSICS | Selection: Competitive application + debate record review | Intl: Yes, international applicants with debate background eligible | Chapter 8 — Debate & Forensics Scholarships

Стипендия Murchison Scholarship (Up to Full Tuition): мин. требования — 32+ ACT or 1400+ SAT (CR+M), 3.5+ GPA.

Статистика CDS (TARGET): ED acceptance: 62.9%, доля класса по ED: 15.5%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 62.9%, доля класса по ED: 15.5%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 62.9%, доля класса по ED: 15.5%, раунды подачи: ED II, EA.' WHERE slug = 'trinity-university-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Engineering, Physics and Astronomy, Energy, Materials Science') WHERE slug = 'tsinghua-university-china';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Erasmus+ International, DAAD East Partnerships or the Finland Scholarship.'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'tu-darmstadt-germany';
UPDATE public.universities SET how_apply_aid = 'CSS or ISAA + supplements | CSS Waiver: Not provided', notes = 'Tufts International Financial Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для принятых иностранцев.

Официальная политика помощи: Tufts meets 100% of demonstrated financial need for all admitted students. In light of Tufts'' commitment to maintain an internationally diverse community, the University makes available a limited amount of funding for talented international students

Статистика CDS (DREAM): раунды подачи: ED II.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'tufts-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 71998), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$71,998 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1400–1520') WHERE slug = 'tulane-university-partial-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Dean''s Honor Scholarship (Full Tuition)'), notes = 'Deans'' Honor Scholarship FULL-TUITION; NAMED COMPETITIVE AWARD | Selection: Nomination + application via admissions | Intl: Region-specific: Sub-Saharan Africa only | Chapter 5 — Named Competitive Full-Ride Programs

Полное финансирование: Dean''s Honor / Paul Tulane full-tuition + Stamps full ride.

Статистика CDS (DREAM): ED acceptance: 33.3%, доля класса по ED: 39.5%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 33.3%, доля класса по ED: 39.5%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 33.3%, доля класса по ED: 39.5%, раунды подачи: EA.' WHERE slug = 'tulane-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tunceli'), majors = COALESCE(NULLIF(majors, ''), 'Environmental Science, Decision Sciences, Agricultural and Biological Sciences, Social Sciences, Materials Science, Arts and Humanities') WHERE slug = 'tunceli-niversitesi-turkey';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'n/a'), notes = 'Основан в 2010 году (Ho Man Tin, Mong Kok and Kwai Chung).' WHERE slug = 'tung-wah-college-hong-kong';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'scholarship based on the YKI certificate in Finnish') WHERE slug = 'turku-university-of-applied-sciences-finland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tuskegee, AL'), tuition_num = COALESCE(tuition_num, 23440), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$23,440 / год'), rate_num = COALESCE(rate_num, 31.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '31.4%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 995–1255 · ACT 18–26'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Health & Medicine, Business & Management, Biological & Biomedical Sciences, Psychology, Communication & Media'), notes = 'Tuskegee University is a private, historically black land-grant university in Tuskegee, Alabama, United States.  The Alabama Legislature founded Tuskegee as a normal school for black teachers on July 4, 1881.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'tuskegee-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Uşak'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Arts and Humanities, Business, Management and Accounting, Materials Science, Agricultural and Biological Sciences, Dentistry') WHERE slug = 'u-ak-niversitesi-turkey';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1350') WHERE slug = 'u-of-illinios-chicago-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '20% of the tuition fee'), notes = 'Корнеллский университет (англ. Cornell University, сокращённо Корнелл) — один из крупнейших и известнейших университетов США, входит в Лигу плюща. Кампус данного университета находится в Итаке, штат Нью-Йорк (США).' WHERE slug = 'u-tad-university-of-technology-arts-and-design-spain';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Medicine, Neuroscience, Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Immunology and Microbiology, Social Sciences'), notes = 'Университетский колледж Лондона, UCL (англ. University College London) — университет в Лондоне, один из самостоятельных членов «федерального» Лондонского университета.' WHERE slug = 'ucl-university-college-of-london-uk';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 67607), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$67,607 / год'), how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', sat = COALESCE(NULLIF(sat, ''), 'SAT 1455–1560') WHERE slug = 'uiversity-of-notre-dame-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Adana'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Agricultural and Biological Sciences, Environmental Science, Arts and Humanities, Materials Science, Medicine') WHERE slug = 'ukurova-niversitesi-turkey';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'ulm-university-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ulsan'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'ulsan-university-korea';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bursa'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Social Sciences, Materials Science, Agricultural and Biological Sciences, Computer Science, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'uluda-niversitesi-turkey';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-') WHERE slug = 'ume-university-sweden';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Engineering, Biological & Biomedical Sciences, Liberal Arts, Psychology, Computer Science & IT') WHERE slug = 'union-college-ny-usa';
UPDATE public.universities SET how_apply_aid = 'Limited/CSS + Supplements | CSS Waiver: Not provided', notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Engineering + liberal arts combination | Aid form: CSS Profile

Полное финансирование: щедрый need + merit для иностранцев (STEM/LAC).

Официальная политика помощи: Union College meets 100% of the demonstrated financial need for admitted students but is need-aware in the admissions process

Статистика CDS (TARGET): ED acceptance: 61.1%, доля класса по ED: 39.6%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 61.1%, доля класса по ED: 39.6%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 61.1%, доля класса по ED: 39.6%, раунды подачи: ED II, EA.' WHERE slug = 'union-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ulsan'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Energy, Materials Science, Chemistry, Earth and Planetary Sciences, Environmental Science') WHERE slug = 'unist-ulsan-national-institute-of-science-and-technology-korea';
UPDATE public.universities SET notes = 'Основан в 1976 году (Al Ain).' WHERE slug = 'united-arab-emirates-university-uae';
UPDATE public.universities SET notes = 'Гарвардская школа бизнеса (англ. Harvard Business School, также известна как HBS) — высшее учебное заведение, расположенное в Бостоне, штат Массачусетс, США. Часть Гарвардского университета.' WHERE slug = 'united-international-business-school-spain';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'universit-t-hamburg-germany';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition+Residence 
DSU- Regional Scholarship(подавать отдельно)'), notes = 'Коммерческий университет им. Луиджи Боккони (итал. L''Università Commerciale Luigi Bocconi) — частное высшее учебное заведение в Италии, выпускающее специалистов в области экономики, юриспруденции и управленческих наук.' WHERE slug = 'universita-bocconi-italy';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '1)Karen McKellin International Leader of Tomorrow Award https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/#modal-cta-full-detail-1 2) Donald A. Wehrung International Student Award https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/#modal-cta-full-detail-2 3) Vantage One Excellence Award https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/#modal-cta-full-detail-3') WHERE slug = 'universite-de-montreal-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.concordia.ca/students/financial-support/scholarships-awards.html'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'universite-du-quebec-canada';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'universite-laval-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Adelaide Refugee & Humanitarian Undergraduate Scholarship, Adelaide Sarawak Alumni Scholarship, Adelaide Summer Research Scholarships, International Student Support Grant') WHERE slug = 'university-of-adelaide-australia';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Birmingham, AL'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Psychology, Education, Engineering'), notes = 'The University of Alabama at Birmingham (UAB) is a public research university in Birmingham, Alabama, United States.  Founded in 1969 and part of the University of Alabama System, UAB has grown to be the state''s largest employer, with more than 27,302 faculty and staff and over 53,000 jobs at the university.' WHERE slug = 'university-of-alabama-birmingham-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tuscaloosa, AL'), tuition_num = COALESCE(tuition_num, 33200), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,200 / год'), rate_num = COALESCE(rate_num, 75.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '75.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$35,011'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '16%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Academic Elite (Full Ride + iPad)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1400 · ACT 24–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Health & Medicine, Communication & Media, Economics & Social Sciences, Psychology'), notes = 'Presidential Academic Merit Award HIGH

Стипендия Academic Elite (Full Ride + iPad): мин. требования — 32+ ACT or 1400+ SAT (CR+M), 3.8+ GPA.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-alabama-usa';
UPDATE public.universities SET notes = '1) snow 2) Edmonton is a village town 3) Most of the scholarships are for canadian citizens/PRs. 4) There tended to be more a culture of staying in and studying hard. The average person was more of a nerd there simply because there wasn’t a whole lot else to do.; ~CAD 35,000–75,000 per year, ~CAD 3,000– full tuition coverage (merit scholarships + e

Финансирование в Канаде (CAD): ~CAD 35,000–75,000 per year, ~CAD 3,000– full tuition coverage (merit scholarships + entrance awards + need-based bursaries + International Leader Scholarships + faculty awards), ~10%–100% coverage.' WHERE slug = 'university-of-alberta-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-'), notes = 'Антверпенский университет (нид. Universiteit Antwerpen, сокращённо — UA) один из ведущих университетов Бельгии, расположен в городе Антверпен. Университет входит в ассоциацию университетов Европы Утрехтская сеть.' WHERE slug = 'university-of-antwerp-belgium';
UPDATE public.universities SET rate_num = COALESCE(rate_num, 85.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '85.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,889'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '14%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1160–1420 · ACT 21–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Health & Medicine, Psychology, Engineering, Computer Science & IT'), notes = 'Global Wildcat Award HIGH; NAMED COMPETITIVE AWARD | Selection: Competitive application | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-arizona-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Communication & Media, Psychology, Economics & Social Sciences'), notes = 'ATHLETIC SCHOLARSHIP | Selection: Coach recruitment via NCAA D1 (elite track & field program) | Intl: Yes -- internationals fully eligible | Chapter 6 — Athletic Scholarships (NCAA & NAIA)

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-arkansas-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), notes = 'Основан в 1949 году (Bialystok).' WHERE slug = 'university-of-bialystok-poland';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Immunology and Microbiology, Medicine, Biochemistry, Genetics and Molecular Biology, Economics, Econometrics and Finance, Health Professions'), notes = 'Бирмингемский университет (англ. University of Birmingham, лат. Universitas Birminghamiensis) — один из наиболее крупных и престижных университетов Великобритании и мира.' WHERE slug = 'university-of-birmingham-uk';
UPDATE public.universities SET notes = 'Болонский университет (итал. Università di Bologna) — итальянский государственный университет, старейший университет Европы. Находится в итальянском городе Болонья.' WHERE slug = 'university-of-bologna-italy';
UPDATE public.universities SET notes = 'Основан в 1982 году (Brescia).' WHERE slug = 'university-of-brescia-italy';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Earth and Planetary Sciences, Neuroscience, Chemistry, Agricultural and Biological Sciences'), notes = 'Бристольский университет (англ. University of Bristol) в городе Бристоль (Великобритания) входит в группу «университетов из красного кирпича» (то есть изначально бывших политехническими колледжами).' WHERE slug = 'university-of-bristol-uk';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'International Scholars Program (~50–60 чел./год, need + merit)'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = '1)  Canadian universities do not require essays, teacher references, or lists of extracurricular achievement in addition to academic achievement. However, some institutions may invite students to provide a personal statement, and others may ask for supplemental applications for more competitive programs.; Listed universities / scholarships (Canada)

Финансирование в Канаде (CAD): ~CAD 48,000–68,000 per year, ~CAD 10,000–full ride aid (merit + need-based + International Scholars Program + IMES + OIS + faculty awards), ~15%–100% coverage.' WHERE slug = 'university-of-british-columbia-canada';
UPDATE public.universities SET notes = '1) when I upload the links of certain websites, I take it that a student could explore even further on a particular topic. For the reason that sometimes the amount of information is just way too much to be fitted in this table.; ~CAD 28,000–55,000 per year (international undergraduate tuition varies by faculty), ~CAD 1,000–full tuition aid (entranc

Финансирование в Канаде (CAD): ~CAD 28,000–55,000 per year (international undergraduate tuition varies by faculty), ~CAD 1,000–full tuition aid (entrance scholarships + International Entrance Awards + Schulich/Faculty awards + need-based bursaries + renewable merit scholarships), ~5%–100% coverage depending on GPA and competition level.' WHERE slug = 'university-of-calgary-canada';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'NA'), notes = 'Университет Калгари (UCalgary) — общественный исследовательский университет, расположенный в Калгари, Альберта, Канада. Основанный в 1966 году (с 1945 года до этого момента являлся филиалом Альбертского университета), университет Калгари состоит из 14 факультетов и более чем 85 исследовательских институтов и центров.' WHERE slug = 'university-of-calgary-in-qatar-qatar';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Computer Science & IT, Engineering, Biological & Biomedical Sciences, Environmental Science, Business & Management'), notes = 'Калифорнийский университет в Беркли — американский государственный исследовательский университет, расположенный в Беркли, штат Калифорния.  Старейший из десяти кампусов Калифорнийского университета.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-berkeley-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$12,639'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '4%'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Engineering, Business & Management, Computer Science & IT'), notes = 'Калифорнийский университет в Де́йвисе — университет штата Калифорния, один из университетов в системе Калифорнийского университета, находящийся в городе Дейвис.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-davis-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Psychology, Engineering, Business & Management, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'Калифорнийский университет в Ирвайне — государственный исследовательский университет штата Калифорния, расположенный в Ирвайнена территории в 603 га.  Основан в 1965 году.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-irvine-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Mathematics & Statistics, Engineering, Visual & Performing Arts'), notes = 'Калифорнийский университет в Лос-Анджелесе — государственный исследовательский университет штата Калифорния, расположенный в городе Лос-Анджелес.  Вошёл в систему государственных университетов в 1919 году, став вторым кампусом общего назначения в системе Калифорнийского университета.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-los-angeles-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Psychology, Biological & Biomedical Sciences, Economics & Social Sciences, Business & Management, Health & Medicine'), notes = 'The University of California, Merced is a public land-grant research university in Merced County, California, United States.  Established in 2005, it is the tenth and newest campus of the University of California (UC) system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-merced-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Business & Management, Psychology, Engineering, Computer Science & IT'), notes = 'Калифорнийский университет в Риверсайде — публичный научно-исследовательский университет и один из десяти общих кампусов системы Калифорнийского университета.  Калифорнийский университет в Риверсайде признан одним из наиболее этнически и экономически разнообразных университетов в США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-riverside-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Engineering, Psychology, Computer Science & IT, Mathematics & Statistics'), notes = 'Калифорнийский университет в Сан-Диего — государственный исследовательский университет штата Калифорния, расположенный в районе Ла-Хойя, Сан-Диего, один из десяти кампусов Калифорнийского университета.  Основан в 1960 году вблизи Института океанографии Скриппс.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-san-diego-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Mathematics & Statistics, Communication & Media, Visual & Performing Arts'), notes = 'Калифорнийский университет в Санта-Барбаре — государственный исследовательский университет штата Калифорния.  Один из 10 кампусов Калифорнийского университета.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-santa-barbara-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Visual & Performing Arts, Business & Management'), notes = 'The University of California, Santa Cruz is a public land-grant research university in Santa Cruz, California, United States.  It is one of the ten campuses in the University of California system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-california-santa-cruz-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Arts and Humanities, Biochemistry, Genetics and Molecular Biology, Engineering, Medicine, Agricultural and Biological Sciences'), notes = 'Кембриджский университет (Кембридж, англ. University of Cambridge, лат. Universitas Cantabrigiensis) — крупнейший государственный (публичный) университет Великобритании.' WHERE slug = 'university-of-cambridge-uk';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 22467), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$22,467 / год'), rate_num = COALESCE(rate_num, 39.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '39.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$1,203'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1190–1350 · ACT 25–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Psychology, Engineering, Visual & Performing Arts, Biological & Biomedical Sciences'), notes = 'Университет Центральной Флориды — американский исследовательский университет в городе Орландо, штат Флорида.  Это второй университет в США по количеству студентов.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-central-florida-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 24076), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$24,076 / год'), rate_num = COALESCE(rate_num, 40.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '40.1%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1200–1350'), notes = 'The University of Central Florida (UCF) is a public research university with its main campus in unincorporated Orange County, Florida, near Orlando, Florida, United States.  It is part of the State University System of Florida.' WHERE slug = 'university-of-central-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Высшая школа химической технологии (чеш. Vysoká škola chemicko-technologická v Praze (VŠCHT)) — крупнейшее в Чехии высшее учебное заведение в области химической промышленности.' WHERE slug = 'university-of-chemistry-and-technology-prague-czech-republic';
UPDATE public.universities SET notes = 'The University of Cincinnati is a public research university in Cincinnati, Ohio, United States.  It was founded in 1819 and had an enrollment of over 53,000 students in 2024, making it the second-largest university in Ohio.' WHERE slug = 'university-of-cincinnati-main-campus-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,339'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '56%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Computer Science & IT, Visual & Performing Arts, Communication & Media'), notes = 'Global Excellence Scholarship HIGH

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-cincinnati-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-cologne-germany';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Communication & Media, Economics & Social Sciences, Psychology'), notes = 'Колора́дский университе́т в Бо́улдере — университет штата в США, находящийся в городе Боулдер.  Один из кампусов Колорадского университета.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-colorado-boulder-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Colorado Springs, CO'), rate_num = COALESCE(rate_num, 96.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '96.6%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1020–1240 · ACT 21–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Psychology, Communication & Media, Economics & Social Sciences'), notes = 'The University of Colorado Colorado Springs (UCCS) is a public research university in Colorado Springs, Colorado, United States.  It is one of four campuses that make up the University of Colorado system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-colorado-colorado-springs-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Health & Medicine, Economics & Social Sciences, Psychology, Visual & Performing Arts'), notes = 'The University of Colorado Denver is a public research university in downtown Denver, Colorado, United States.  It is part of the University of Colorado system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-colorado-denver-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 47142), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$47,142 / год'), rate_num = COALESCE(rate_num, 78.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '78.1%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1240–1430'), notes = 'Колорадский университет, или Университет Колорадо — система государственных университетов в штате Колорадо, состоящая из четырёх кампусов.' WHERE slug = 'university-of-colorado-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Economics & Social Sciences, Engineering, Biological & Biomedical Sciences, Psychology'), notes = 'NAMED COMPETITIVE AWARD | Selection: Competitive application | Intl: Primarily CT residents -- confirm intl. eligibility | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-connecticut-usa';
UPDATE public.universities SET notes = 'Копенгагенский университет (дат. Københavns Universitet) — один из самых старых университетов и самое большое учебно-исследовательское учреждение в Дании. Основан в 1479 году королём Кристианом I.' WHERE slug = 'university-of-copenhagen-denmark';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Irving, TX'), rate_num = COALESCE(rate_num, 54.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '54.2%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$11,064'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1370 · ACT 25–32'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, English & Literature, Psychology, History'), notes = 'The University of Dallas is a private Catholic university in Irving, Texas, United States.  Established in 1956, it is accredited by the Southern Association of Colleges and Schools.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-dallas-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Health & Medicine, Education, Communication & Media, Biological & Biomedical Sciences'), notes = 'The University of Dayton (UD) is a private, Catholic research university in Dayton, Ohio, United States.  Founded in 1850 by the Society of Mary, it is one of three Marianist universities in the US and the second-largest private university in Ohio.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-dayton-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Eugene DuPont Memorial Scholarship (Full Ride+)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Economics & Social Sciences, Biological & Biomedical Sciences, Education'), notes = 'Делавэрский университет — частный исследовательский университет, крупнейший университет в штате Делавэр.  Основной университетский кампус находится в Ньюарке, спутниковые кампусы находятся в Довере, Уилмингтоне, Льюисе, и Джорджтауне.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-delaware-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,097'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '77%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Communication & Media, Computer Science & IT'), notes = 'Де́нверский университет — частный исследовательский университет в г.  Денвер, Колорадо, США.

Статистика CDS (BACKUP): ED acceptance: 36.8%, доля класса по ED: 9%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 36.8%, доля класса по ED: 9%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 36.8%, доля класса по ED: 9%, раунды подачи: ED II, EA.' WHERE slug = 'university-of-denver-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Detroit, MI'), tuition_num = COALESCE(tuition_num, 32300), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$32,300 / год'), rate_num = COALESCE(rate_num, 80.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '80.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$16,331'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '50%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1020–1260 · ACT 22–28'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Biological & Biomedical Sciences, Business & Management, Architecture, Engineering, Psychology'), notes = 'Детройткий университет милосердия — частный иезуитский университет в Детройте, штат Мичиган, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-detroit-mercy-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Dunaújváros'), majors = COALESCE(NULLIF(majors, ''), 'Social Sciences, Computer Science, Engineering, Materials Science, Medicine, Mathematics') WHERE slug = 'university-of-duna-jv-ros-hungary';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Medicine, Computer Science, Arts and Humanities, Agricultural and Biological Sciences'), notes = 'Эдинбургский университет — государственный университет в столице Шотландии городе Эдинбурге. Шестой по старшинству в Великобритании, открылся в 1583 году.' WHERE slug = 'university-of-edinburgh-uk';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Evansville, IN'), rate_num = COALESCE(rate_num, 77.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.7%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Visual & Performing Arts, Engineering, Education'), notes = 'Университет Эвансвиллa (UE) — это частный гуманитарный университет в Эвансвилле, штат Индиана.  Основанный в 1854 году как колледж Мурс-Хилл, университет готовит специалистов в гуманитарных и естественных областях как в самом университетском городке, так и за его пределами.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-evansville-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Up to 100%+ accomodation grant after the 1st year of studies for good preformance'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-finance-and-administration-czech-republic';
UPDATE public.universities SET notes = 'Флорентийский университет (итал. Università degli Studi di Firenze, UNIFI) — один из крупнейших и старейших университетов Италии. Расположен во Флоренции.' WHERE slug = 'university-of-florence-italy';
UPDATE public.universities SET notes = 'ATHLETIC SCHOLARSHIP | Selection: Coach recruitment via NCAA D1 | Intl: Yes -- internationals fully eligible | Chapter 6 — Athletic Scholarships (NCAA & NAIA)

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-florida-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-freiburg-germany';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'university-of-gdansk-poland';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A') WHERE slug = 'university-of-geneva-switzerland';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Foundation Fellowship (Full Ride)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Communication & Media, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Engineering'), notes = 'Foundation Fellowship; NAMED COMPETITIVE AWARD | Selection: Nomination + competitive interview | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Стипендия Foundation Fellowship (Full Ride): мин. требования — 31 ACT+, 2100+ SAT (CR+M+W), 3.8+ GPA (unweighted).

Стипендия Bernard Ramsey Honors Scholarship (Full Tuition +): мин. требования — Requirements 31 ACT+, 2100+ SAT (CR+M+W), 3.8+ GPA (unweighted).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-georgia-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Medicine, Agricultural and Biological Sciences, Engineering, Neuroscience, Immunology and Microbiology'), notes = 'Университет Глазго (англ. University of Glasgow) — четвёртый по старшинству в Великобритании и крупнейший университет в Шотландии. Расположен в городе Глазго.' WHERE slug = 'university-of-glasgow-uk';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition'), notes = 'Гётеборгский университет (швед. Göteborgs universitet, лат. Universitas Gothoburgensis) — университет в Гётеборге (Швеция). Гётеборгский университет, в котором обучаются около 37000 студентов, является одним из крупнейших в Скандинавии.' WHERE slug = 'university-of-gothenburg-sweden';
UPDATE public.universities SET notes = 'Гранадский университет (исп. Universidad de Granada, сокр. UGR) — государственный университет в Гранаде, Испания. Основан согласно папскому указу Климента VII в 1531 году на базе существовавшего с 1349 года медресе и первоначально имел три факультета: теологии, искусства и церковного права.' WHERE slug = 'university-of-granada-spain';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 34434), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$34,434 / год'), rate_num = COALESCE(rate_num, 69.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '69.7%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1020–1240 · ACT 20–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Education, Economics & Social Sciences, Psychology'), notes = 'Гавайский университет в Маноа — самый крупный университет Гавайев (США).  Расположен в районе Маноа в Гонолулу на острове Оаху.' WHERE slug = 'university-of-hawaii-at-manoa-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Honolulu, HI'), rate_num = COALESCE(rate_num, 86.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '86.6%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1081–1293'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-hawaii-manoa-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Tier One Scholarship (Full Tuition+)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Computer Science & IT, Engineering, Biological & Biomedical Sciences, Economics & Social Sciences'), notes = 'Хью́стонский университет — государственный исследовательский университет в США, расположенный в Хьюстоне, штат Техас.  Крупнейший и главный кампус в системе Хьюстонского университета (UHS), а также 3-й по величине университет в штате.

Стипендия Tier One Scholarship (Full Tuition+): мин. требования — Typically Top 10 % of Class, 29+ ACT or 1300+ SAT (CR+M).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-houston-usa';
UPDATE public.universities SET notes = 'Иллино́йсский университе́т в Чика́го — общественный исследовательский университет США, расположенный в Чикаго, штат Иллинойс.  Второй по счёту кампус Иллинойсского университета, а также крупнейший университет в чикагской агломерации с более 33 тыс.' WHERE slug = 'university-of-illinois-at-chicago-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Economics & Social Sciences, Computer Science & IT, Psychology, Communication & Media'), notes = 'Иллинойсский университет в Урбане-Шампейне — самый большой из кампусов Иллинойсского университета.  Основан в 1867 году.' WHERE slug = 'university-of-illinois-at-urbana-champaign-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Chicago, IL'), tuition_num = COALESCE(tuition_num, 30754), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$30,754 / год'), rate_num = COALESCE(rate_num, 77.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$5,873'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '1%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1350'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Health & Medicine, Engineering, Psychology, Computer Science & IT'), notes = 'Иллино́йсский университе́т в Чика́го — общественный исследовательский университет США, расположенный в Чикаго, штат Иллинойс.  Второй по счёту кампус Иллинойсского университета, а также крупнейший университет в чикагской агломерации с более 33 тыс.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-illinois-chicago-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Champaign, IL'), tuition_num = COALESCE(tuition_num, 36706), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$36,706 / год'), rate_num = COALESCE(rate_num, 42.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '42.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,833'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1310–1520'), notes = 'The University of Illinois Urbana-Champaign is a public land-grant research university in the Champaign–Urbana metropolitan area, Illinois, United States.  Established in 1867, it is the founding campus and flagship institution of the University of Illinois System.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-illinois-urbana-champaign-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Health & Medicine, Economics & Social Sciences, Communication & Media, Biological & Biomedical Sciences'), notes = 'Айовский университет или Университет Айовы — общественный исследовательский университет в США, расположенный в городе Айова-Сити штата Айова.  Это старейший университет штата, он был основан 25 февраля 1847 года.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-iowa-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Psychology, Communication & Media, Biological & Biomedical Sciences'), notes = 'Канзасский университет — государственный исследовательский университет США, крупнейший в штате Канзас.  Кампусы университета расположены в Лоренсе, Уичито, Оверленд-Парке и Канзас-Сити.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-kansas-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Otis A. Singletary Scholarship (Full Ride +$1,500/year + iPad + $2,000 exp)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Communication & Media, Education, Biological & Biomedical Sciences'), notes = 'DEBATE / FORENSICS | Selection: Competitive application + debate record review | Intl: Yes, international applicants with debate background eligible | Chapter 8 — Debate & Forensics Scholarships

Стипендия Otis A. Singletary Scholarship (Full Ride +$1,500/year + iPad + $2,000 exp): мин. требования — 31+ ACT or 1360 SAT+ (CR+M), 3.5+ GPA (unweighted).

Стипендия Presidential Scholarship (Full Tuition): мин. требования — 31+ ACT or 1360 SAT+ (CR+M), 3.5+ GPA (unweighted).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-kentucky-usa';
UPDATE public.universities SET notes = 'Университет Ла-Лагуна (исп. Universidad de La Laguna, сокр. ULL) — университет в Испании, расположенный в городе Сан-Кристобаль-де-ла-Лагуна на острове Тенерифе.' WHERE slug = 'university-of-la-laguna-spain';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '€5''000 + Patron and State-funded scholarships (you need to contact university for specific info)') WHERE slug = 'university-of-latvia-riga-latvia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), lang = COALESCE(NULLIF(lang, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Лозаннский университет (фр. Université de Lausanne, UNIL) — университет, расположенный в Лозанне, во французской части Швейцарии.' WHERE slug = 'university-of-lausanne-switzerland';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Earth and Planetary Sciences, Medicine, Environmental Science, Biochemistry, Genetics and Molecular Biology, Social Sciences, Physics and Astronomy'), notes = 'Лидсский университет или Университет Лидса (англ. University of Leeds) — один из крупнейших университетов Великобритании, около 7500 постоянных сотрудников и 35 тыс. очных студентов.' WHERE slug = 'university-of-leeds-uk';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Lisbon') WHERE slug = 'university-of-lisbon-portugal';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Louisville, KY'), tuition_num = COALESCE(tuition_num, 29174), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$29,174 / год'), rate_num = COALESCE(rate_num, 80.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '80.5%'), full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Brown Fellowship (Full Ride +)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1020–1250 · ACT 19–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Education, Psychology, Biological & Biomedical Sciences'), notes = 'Луисвиллский университет — высшее учебное заведение города Луисвилл, Кентукки, США.  Один из старейших университетов США, созданных западнее Аллеганских гор.

Стипендия Brown Fellowship (Full Ride +): мин. требования — 31 ACT or 1360 SAT (CR+M) and 3.35 GPA.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-louisville-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Lynchburg, VA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,392'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 980–1230'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Economics & Social Sciences, Health & Medicine, Psychology, Visual & Performing Arts'), notes = 'The University of Lynchburg, formerly Lynchburg College, is a private university associated with the Christian Church and located in Lynchburg, Virginia, United States.  It has approximately 2,800 undergraduate and graduate students.

Статистика CDS (BACKUP): раунды подачи: EA.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'university-of-lynchburg-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-m-nster-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Orono, ME'), tuition_num = COALESCE(tuition_num, 35346), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$35,346 / год'), rate_num = COALESCE(rate_num, 95.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '95.7%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,369'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '80%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Education, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology'), notes = 'The University of Maine (UMaine) is a public land-grant research university in Orono, Maine, United States.  It was established in 1865 as the land-grant college of Maine and is the flagship university of the University of Maine System.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-maine-orono-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Medicine, Biochemistry, Genetics and Molecular Biology, Engineering, Earth and Planetary Sciences, Social Sciences'), notes = 'Манчестерский университет (англ. The University of Manchester) — один из наиболее значимых британских университетов из числа знаменитых «университетов из красного кирпича».' WHERE slug = 'university-of-manchester-uk';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Winnipeg'), majors = COALESCE(NULLIF(majors, ''), 'Medicine, Social Sciences, Agricultural and Biological Sciences, Physics and Astronomy, Nursing, Engineering') WHERE slug = 'university-of-manitoba-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'General Funding options of the German Academic Exchange Service (DAAD'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-mannheim-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Fredericksburg, VA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$4,690'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '48%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1140–1330 · ACT 23–31'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Liberal Arts, Computer Science & IT'), notes = 'University of Mary Washington (UMW) is a public liberal arts university in Fredericksburg, Virginia.  Established in 1908 as the State Normal and Industrial School for Women at Fredericksburg, the institution later became known as Fredericksburg Teachers College, and was named Mary Washington College in 1938 after Mary Ball Washington, mother of the first president of the United States, George Washington.

Статистика CDS (BACKUP): ED acceptance: 90.5%, доля класса по ED: 10.6%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 90.5%, доля класса по ED: 10.6%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 90.5%, доля класса по ED: 10.6%, раунды подачи: EA.' WHERE slug = 'university-of-mary-washington-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$12,913'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '26%'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Engineering, Visual & Performing Arts'), notes = 'The University of Maryland, Baltimore County (UMBC) is a public research university in Catonsville, Maryland, United States.  It had a fall 2025 enrollment of 13,530 students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-maryland-baltimore-county-usa';
UPDATE public.universities SET rate_num = COALESCE(rate_num, 44.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '44.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1400–1530'), notes = 'NAMED COMPETITIVE AWARD | Selection: Automatic consideration + competitive review | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-maryland-college-park-usa';
UPDATE public.universities SET notes = 'The University of Maryland, College Park is a public land-grant research university in College Park, Maryland, United States.  Founded in 1856, UMD is the flagship institution of the University System of Maryland.' WHERE slug = 'university-of-maryland-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'College Park, MD'), tuition_num = COALESCE(tuition_num, 42053), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$42,053 / год'), rate_num = COALESCE(rate_num, 44.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '44.8%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Banneker/Key Scholarship (Up to Full Ride)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1400–1530'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Business & Management, Engineering, Economics & Social Sciences, Biological & Biomedical Sciences, Health & Medicine') WHERE slug = 'university-of-maryland-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Computer Science & IT, Engineering'), notes = 'The University of Massachusetts Amherst is a public land-grant research university in Amherst, Massachusetts, United States.  It is the flagship campus of the University of Massachusetts system and was founded in 1863 as the Massachusetts Agricultural College.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-massachusetts-amherst-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1080–1290 · ACT 24–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Psychology, Economics & Social Sciences, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'The University of Massachusetts Boston is a public university in Boston, Massachusetts, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-massachusetts-boston-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'North Dartmouth, MA'), tuition_num = COALESCE(tuition_num, 31750), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$31,750 / год'), rate_num = COALESCE(rate_num, 92.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '92.2%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1040–1260 · ACT 22–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Engineering, Economics & Social Sciences, Visual & Performing Arts, Psychology'), notes = 'The University of Massachusetts Dartmouth is a public research university in Dartmouth, Massachusetts.  It is the southernmost campus of the University of Massachusetts system.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-massachusetts-dartmouth-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Melbourne Mobility Awards, Marie Skłodowska-Curie Actions, Graduate Research Scholarships') WHERE slug = 'university-of-melbourne-australia';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Memphis, TN'), tuition_num = COALESCE(tuition_num, 14784), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$14,784 / год'), rate_num = COALESCE(rate_num, 93.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '93.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$17,761'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '50%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 905–1205 · ACT 17–24'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Psychology, Engineering, Education, Communication & Media'), notes = 'Мемфисский университет или Университет Мемфиса — университет США, находящийся в городе Мемфис, штат Теннесси.  Основанный в 1912 году.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-memphis-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 65430), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$65,430 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1320–1480') WHERE slug = 'university-of-miami-partial-usa';
UPDATE public.universities SET how_apply_aid = 'CSS + Scholarships | CSS Waiver: Request via email', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Up to Full Ride'), notes = 'Singer & Dickinson Scholarships HIGH; NAMED COMPETITIVE AWARD | Selection: Nomination + competitive interview weekend | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs; Tier 3: PARTIAL / LIMITED NEED-BASED AID | Aims to fund all admitted intl students needing aid | Aid form: CSS Profile

Статистика CDS (TARGET): ED acceptance: 48.3%, доля класса по ED: 34.6%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 48.3%, доля класса по ED: 34.6%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 48.3%, доля класса по ED: 34.6%, раунды подачи: ED II, EA.' WHERE slug = 'university-of-miami-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Engineering, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Business & Management'), notes = 'Мичига́нский университе́т — государственный исследовательский университет штата Мичиган, расположенный в городе Анн-Арбор.  Основан в 1817 году в Детройте, но спустя двадцать лет переехал в Анн-Арбор.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-michigan-ann-arbor-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Computer Science & IT, Psychology, Health & Medicine, Economics & Social Sciences'), notes = 'The University of Michigan–Dearborn (UM-Dearborn) is a public university in Dearborn, Michigan, United States.  Founded in 1959 with a gift from the Ford Motor Company, it was initially known as the Dearborn Center, operating as a remote branch of the University of Michigan.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-michigan-dearborn-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1128–1335 · ACT 23–28'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Education'), notes = 'The University of Minnesota Duluth (UMD) is a public university in Duluth, Minnesota, United States.  It is part of the University of Minnesota System.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-minnesota-duluth-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Computer Science & IT, Engineering, Economics & Social Sciences, Psychology'), notes = 'Миннесотский университет, или Университет Миннесоты — публичный исследовательский университет, расположенный в Миннеаполисе и Сент-Поле, самых крупных городах штата Миннесота.  Этот университет — старейшая и большая часть системы Миннесотских университетов, он имеет четвёртый в стране по размеру кампус.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-minnesota-twin-cities-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a'), essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'university-of-miskolc-hungary';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Penelope W. and E. Roe Stamps IV Leadership Scholarship (Up to Full Ride + $12,000 exp)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Communication & Media, Education, Biological & Biomedical Sciences, Psychology'), notes = 'Миссисипский университет или Университет Миссисипи — государственный исследовательский университет в г.  Оксфорд, Миссисипи, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-mississippi-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Columbia, MO'), tuition_num = COALESCE(tuition_num, 34338), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$34,338 / год'), rate_num = COALESCE(rate_num, 77), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1330 · ACT 23–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Communication & Media, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology'), notes = 'Миссурийский университет — публичный, принадлежащий штату исследовательский университет США, находящийся в городе Колумбия, штат Миссури.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-missouri-columbia-usa';
UPDATE public.universities SET notes = 'Университет Наварры (исп. Universidad de Navarra) — частный университет, основанный в городе Памплона (Наварра, Испания) в 1952 году святым Хосемарией Эскрива де Балагер.' WHERE slug = 'university-of-navarra-spain';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Communication & Media, Education, Biological & Biomedical Sciences, Psychology'), notes = 'Университет Небраски в Линкольне — американский государственный исследовательский университет, расположенный в Линкольне.  Старейший и крупнейший университет штата, флагманский вуз в системе Университета Небраски.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-nebraska-lincoln-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Psychology, Education, Health & Medicine, Economics & Social Sciences, Visual & Performing Arts'), notes = 'Невадский университет в Лас-Вегасе — государственный исследовательский университет, расположенный в городе Парадайс близ Лас-Вегаса в штате Невада, США.  В состав университета входит корпус Shadow Lane, в котором расположен медицинский стоматологический факультет — единственный в Неваде.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-nevada-las-vegas-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Reno, NV'), tuition_num = COALESCE(tuition_num, 25950), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$25,950 / год'), rate_num = COALESCE(rate_num, 85.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '85.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$9,092'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '58%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Engineering, Computer Science & IT, Psychology'), notes = 'The University of Nevada, Reno is a public land-grant research university in Reno, Nevada, United States.  It is the state''s flagship public university and primary land grant institution.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-nevada-reno-usa';
UPDATE public.universities SET notes = 'Университет Нью-Гэмпшира — государственный исследовательский университет, входящий в университетскую систему штата Нью-Гэмпшир.  Основной кампус находится в Дареме, дополнительный — в Манчестере.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-new-hampshire-usa';
UPDATE public.universities SET notes = 'Университет Нью-Мексико — американский публичный исследовательский университет, расположенный в городе Альбукерке, штат Нью-Мексико.  Флагман из исследовательских институтов в Нью-Мексико, крупнейшее учебное заведение в штате по числу зачисления студентов по всем кампусам в 2012 году и один из крупнейших работодателей.' WHERE slug = 'university-of-new-mexico-main-campus-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Full Tuition + exp'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Regents'' Scholarship (Full Tuition + exp)'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Psychology, Biological & Biomedical Sciences, Engineering, Education'), notes = 'Университет Нью-Мексико — американский публичный исследовательский университет, расположенный в городе Альбукерке, штат Нью-Мексико.  Флагман из исследовательских институтов в Нью-Мексико, крупнейшее учебное заведение в штате по числу зачисления студентов по всем кампусам в 2012 году и один из крупнейших работодателей.

Стипендия Regents'' Scholarship (Full Tuition + exp): мин. требования — 31+ ACT or 3.9+ GPA or Valedictorian.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-new-mexico-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New Orleans, LA'), tuition_num = COALESCE(tuition_num, 14008), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$14,008 / год'), rate_num = COALESCE(rate_num, 66.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '66.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 960–1320 · ACT 17–23'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, Computer Science & IT'), notes = 'Новоорлеанский университет — государственный университет в г.  Новый Орлеан, Луизиана, США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-new-orleans-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'High School Leavers & Future Students Scholarships, Tertiary Access Payment (TAP) Program, Tim Fischer Monash scholarship') WHERE slug = 'university-of-new-south-wales-unsw-australia';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Основан в 1998 году (Prague).' WHERE slug = 'university-of-new-york-in-prague-czech-republic';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Academic Excellence Scholarships Recognising Outstanding Performance in Undergraduate Studies, FEBE Golden Jubilee Commemorative International Scholarship, FEBE International Architecture and Built Environment Postgraduate Coursework Scholarship') WHERE slug = 'university-of-newcastle-australia';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Asheville, NC'), tuition_num = COALESCE(tuition_num, 24809), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$24,809 / год'), rate_num = COALESCE(rate_num, 93.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '93.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1350 · ACT 22–29'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Psychology, Economics & Social Sciences, Business & Management, Environmental Science, English & Literature'), notes = 'The University of North Carolina at Asheville is a public liberal arts university in Asheville, North Carolina, United States.  UNC Asheville is the designated liberal arts institution in the University of North Carolina system.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'university-of-north-carolina-asheville-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Morehead-Cain Scholars (Full Ride + books + laptop + summer exp)'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Economics & Social Sciences, Business & Management, Communication & Media, Computer Science & IT, Health & Medicine'), notes = 'NAMED COMPETITIVE AWARD | Selection: Nomination + regional interviews | Intl: Yes, international nominees accepted | Chapter 5 — Named Competitive Full-Ride Programs

Полное финансирование: Morehead-Cain / Robertson Scholars — full ride по merit.' WHERE slug = 'university-of-north-carolina-at-chapel-hill-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Biological & Biomedical Sciences, Engineering, Health & Medicine, Psychology'), notes = 'The University of North Carolina at Charlotte is a public research university in Charlotte, North Carolina, United States.  UNC Charlotte offers 24 doctoral, 66 master''s, and 79 bachelor''s degree programs through nine colleges.' WHERE slug = 'university-of-north-carolina-at-charlotte-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Visual & Performing Arts, Psychology, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'The University of North Carolina at Greensboro is a public research university in Greensboro, North Carolina.  It is part of the University of North Carolina system.' WHERE slug = 'university-of-north-carolina-at-greensboro-usa';
UPDATE public.universities SET notes = 'Университет Северной Каролины в Чапел-Хилле — исследовательский университет штата в городе Чапел-Хилл, штат Северная Каролина, США.  Является главным кампусом в системе университетов Северной Каролины.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-carolina-chapel-hill-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Levine Scholars Program (Full Ride + books + exp + $8500 Grant)'), notes = 'The University of North Carolina at Charlotte is a public research university in Charlotte, North Carolina, United States.  UNC Charlotte offers 24 doctoral, 66 master''s, and 79 bachelor''s degree programs through nine colleges.

Стипендия Levine Scholars Program (Full Ride + books + exp + $8500 Grant): мин. требования — Nomination from HS Counselor, 15 each Year, 5 Out of State.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-carolina-charlotte-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Winston Salem, NC'), tuition_num = COALESCE(tuition_num, 27211), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$27,211 / год'), rate_num = COALESCE(rate_num, 33.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '33.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,992'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '42%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1350 · ACT 24–27'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-carolina-sch-of-the-arts-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Wilmington, NC'), tuition_num = COALESCE(tuition_num, 22985), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$22,985 / год'), rate_num = COALESCE(rate_num, 74), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '74%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$2,847'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '39%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1220–1360 · ACT 24–28'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Communication & Media'), notes = 'The University of North Carolina Wilmington, or University of North Carolina at Wilmington, is a public research university in Wilmington, North Carolina.  It is part of the University of North Carolina system and enrolled 18,848 undergraduate and graduate students in 2024.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-carolina-wilmington-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Grand Forks, ND'), tuition_num = COALESCE(tuition_num, 15570), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$15,570 / год'), rate_num = COALESCE(rate_num, 77.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.1%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$14,906'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '20%'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Engineering, Psychology, Communication & Media, Liberal Arts'), notes = 'Университе́т Се́верной Дако́ты — общественный исследовательский университет в штате Северная Дакота, США.  Кампус университета находится в городе Гранд-Форкс.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-dakota-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Jacksonville, FL'), tuition_num = COALESCE(tuition_num, 20793), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$20,793 / год'), rate_num = COALESCE(rate_num, 62.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '62.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$3,096'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '49%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 990–1210 · ACT 20–26'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Psychology, Liberal Arts, Computer Science & IT, Communication & Media'), notes = 'The University of North Florida (UNF) is a public research university in Jacksonville, Florida, United States.  It is part of the State University System of Florida and is accredited by the Commission on Colleges of the Southern Association of Colleges and Schools to award baccalaureate, masters, and doctorate degrees.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-florida-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 21244), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$21,244 / год'), rate_num = COALESCE(rate_num, 72.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '72.5%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 980–1230 · ACT 19–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Psychology, Communication & Media, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'ARTS / TALENT-BASED | Selection: Audition-based | Intl: Yes, international applicants eligible | Chapter 7 — Arts & Talent-Based Scholarships

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-north-texas-usa';
UPDATE public.universities SET notes = '~CAD 25,000–35,000 per year (international undergraduate tuition varies by program), ~CAD 2,000–15,000 aid (entrance scholarships + merit awards + International Regional Entrance Awards + bursaries + faculty scholarships), ~5%–70% coverage depending on GPA and award type

Финансирование в Канаде (CAD): ~CAD 25,000–35,000 per year (international undergraduate tuition varies by program), ~CAD 2,000–15,000 aid (entrance scholarships + merit awards + International Regional Entrance Awards + bursaries + faculty scholarships), ~5%–70% coverage depending on GPA and award type.' WHERE slug = 'university-of-northern-british-columbia-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Cedar Falls, IA'), tuition_num = COALESCE(tuition_num, 21272), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$21,272 / год'), rate_num = COALESCE(rate_num, 94.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '94.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$4,752'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '47%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 860–1210 · ACT 20–26'), majors = COALESCE(NULLIF(majors, ''), 'Education, Business & Management, Psychology, Health & Medicine, Communication & Media, Economics & Social Sciences'), notes = 'The University of Northern Iowa (UNI) is a public university in Cedar Falls, Iowa, United States.  The fall 2025 total enrollment was 9,204 students.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-northern-iowa-usa';
UPDATE public.universities SET need_blind = true, intl_aid_policy = COALESCE(NULLIF(intl_aid_policy, ''), 'need-blind'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Penelope W. and E. Roe Stamps IV Leadership Scholars (Full Tuition)'), notes = 'Hesburgh International Scholar Program; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted international students | Aid form: CSS Profile

Полное финансирование: need-blind политика для всех абитуриентов с полным покрытием нужды.

Официальная политика помощи: if a student applies for financial aid and is admitted, they will receive a financial aid award that will meet their full demonstrated need.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-notre-dame-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition fee'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Engineering, Biochemistry, Genetics and Molecular Biology, Medicine, Social Sciences, Agricultural and Biological Sciences'), notes = 'Ноттингемский университет (англ. The University of Nottingham) — один из крупнейших и престижных университетов Великобритании и мира. Этот публичный исследовательский университет расположен в Ноттингеме (Англия).' WHERE slug = 'university-of-nottingham-uk';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'university-of-ny-regyh-za-hungary';
UPDATE public.universities SET notes = 'Оклахомский университет или Университет Оклахомы — государственный исследовательский университет, расположенный в г.  Норман, штат Оклахома.' WHERE slug = 'university-of-oklahoma-norman-campus-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$7,473'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '5%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Communication & Media, Psychology, Economics & Social Sciences, Biological & Biomedical Sciences'), notes = 'Оклахомский университет или Университет Оклахомы — государственный исследовательский университет, расположенный в г.  Норман, штат Оклахома.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-oklahoma-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'university-of-opole-poland';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Communication & Media, Biological & Biomedical Sciences, Visual & Performing Arts, Psychology'), notes = 'ICSP (International Cultural Service Program) HIGH; ATHLETIC SCHOLARSHIP | Selection: Coach recruitment via NCAA D1 (strong track & field/soccer pipeline) | Intl: Yes -- internationals fully eligible via NCAA Eligibility Center | Chapter 6 — Athletic Scholarships (NCAA & NAIA)

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-oregon-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Economics, Econometrics and Finance, Social Sciences, Physics and Astronomy, Biochemistry, Genetics and Molecular Biology, Medicine'), notes = 'Оксфордский университет (англ. University of Oxford) — британский публичный (государственный) университет в городе Оксфорд (Англия). Один из старейших университетов в мире, первый англоязычный и на Британских островах.' WHERE slug = 'university-of-oxford-uk';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'university-of-p-cs-hungary';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Padua International Excellence Scholarship (обучение + €8,000/год, квота 67)') WHERE slug = 'university-of-padua-italy';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'university-of-pannonia-hungary';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'EDiSU Scholarships
DSU- Regional Scholarship(подавать отдельно)'), notes = 'Павийский университет (итал. Università degli Studi di Pavia, лат. Alma Ticinensis Universitas) — университет в городе Павия, один из старейших в Италии. Входит в Коимбрскую группу влиятельных европейских университетов.' WHERE slug = 'university-of-pavia-italy';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Merit scholarships
DSU- Regional Scholarship(подавать отдельно)'), notes = 'Пизанский университет (итал. Università di Pisa) — учебное заведение в городе Пиза (Тоскана, Италия), один из старейших университетов Европы, чья история прослеживается с XI века.' WHERE slug = 'university-of-pisa-italy';
UPDATE public.universities SET full_grant = true, aid_max = COALESCE(NULLIF(aid_max, ''), 'Up to Full Ride'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'University Academic (Up to Full Ride)'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Engineering, Business & Management, Biological & Biomedical Sciences, Psychology, Computer Science & IT'), notes = 'Питтсбургский университет — государственный исследовательский университет штата Пенсильвания в городе Питтсбург.  Основан в 1787 году.

Стипендия University Academic (Up to Full Ride): мин. требования — 33+ ACT or 1450+ SAT (CR+M), Typically Top 5% of Class,.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-pittsburgh-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Engineering, Psychology, Economics & Social Sciences'), notes = 'Портлендский университет — католический частный университет в Портленде.  Основан в 1901 году, в начале XXI века предоставляет полный 4-годичный курс обучения по 26 основным специальностям, а также магистрат по 7 специальностям.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-portland-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Porto') WHERE slug = 'university-of-porto-portugal';
UPDATE public.universities SET notes = '~CAD 13,000–30,000 per year (some programs higher like vet medicine), ~CAD 1,000–3,000 merit entrance awards + scholarships + bursaries + need-based aid + faculty awards, ~5%–40% coverage depending on GPA and program

Финансирование в Канаде (CAD): ~CAD 13,000–30,000 per year (some programs higher like vet medicine), ~CAD 1,000–3,000 merit entrance awards + scholarships + bursaries + need-based aid + faculty awards, ~5%–40% coverage depending on GPA and program.' WHERE slug = 'university-of-prince-edward-island-upei-canada';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, History'), notes = 'Университет Пьюджет-Саунда — американское частное учебное заведение в Такоме, штат Вашингтон.

Статистика CDS (BACKUP): ED acceptance: 81.3%, доля класса по ED: 10.6%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 81.3%, доля класса по ED: 10.6%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 81.3%, доля класса по ED: 10.6%, раунды подачи: EA.' WHERE slug = 'university-of-puget-sound-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'PhD scholarship: MRI sequence programming and deep learning reconstruction, Law Scholarships for International Students - Postgraduate, QUEX PhD Scholarship') WHERE slug = 'university-of-queensland-uq-australia';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Redlands, CA'), rate_num = COALESCE(rate_num, 80.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '80.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1078–1323 · ACT 25–30'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Psychology, Economics & Social Sciences, Environmental Science, Health & Medicine'), notes = 'The University of Redlands is a private university in Redlands, California, United States.  The university''s main, residential campus is situated on 160 acres near downtown Redlands.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'university-of-redlands-usa';
UPDATE public.universities SET notes = '~CAD 27,000–34,000 per year, ~CAD 3,000– 80,000+ aid (automatic merit + entrance scholarships + International Student of Distinction + bursaries + housing awards), ~10%–100% coverage

Финансирование в Канаде (CAD): ~CAD 27,000–34,000 per year, ~CAD 3,000– 80,000+ aid (automatic merit + entrance scholarships + International Student of Distinction + bursaries + housing awards), ~10%–100% coverage.' WHERE slug = 'university-of-regina-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Kingston, RI'), tuition_num = COALESCE(tuition_num, 35804), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$35,804 / год'), rate_num = COALESCE(rate_num, 77.1), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.1%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1030–1270 · ACT 26–31'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Communication & Media, Engineering, Biological & Biomedical Sciences, Psychology'), notes = 'Род-Айлендский университет — университет штата Род-Айленд, США.  Главный кампус расположен в Кингстоне, также имеет филиалы в Провиденсе, Наррагансетт-Бэй и Уэст-Гринвиче.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-rhode-island-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Richmond Scholars (Up to Full Ride)'), notes = 'Richmond Scholars Program; NAMED COMPETITIVE AWARD | Selection: Competitive application; test-optional considered | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy | Aid form: CSS Profile

Полное финансирование: Richmond Scholars (полное обучение + жильё) + 100% need.

Статистика CDS (TARGET): ED acceptance: 48.3%, доля класса по ED: 42.1%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 48.3%, доля класса по ED: 42.1%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 48.3%, доля класса по ED: 42.1%, раунды подачи: ED II, EA.' WHERE slug = 'university-of-richmond-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Explicitly states it offers need-based aid to internationals | Aid form: CSS Profile

Полное финансирование: Handler Scholarship + Alan & Jane Handler / need-based.

Статистика CDS (TARGET): ED acceptance: 29%, раунды подачи: ED II.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'university-of-rochester-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), notes = 'Жешувский университет (пол. Uniwersytet Rzeszowski) — университет в Жешуве, который является крупнейшим учебным заведением юго-восточной Польши.' WHERE slug = 'university-of-rzesz-w-poland';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Engineering, Psychology, Communication & Media'), notes = 'The University of San Diego (USD) is a private Catholic research university in San Diego, California, United States.  Chartered in 1949 as the independent San Diego College for Women and San Diego University, the two institutions merged in 1972.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-san-diego-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Economics & Social Sciences, Psychology, Communication & Media, Biological & Biomedical Sciences'), notes = 'The University of San Francisco (USF) is a private Jesuit university in San Francisco, California, United States.  Founded in 1855, it has nearly 9,000 students pursuing undergraduate and graduate degrees in 59 major programs.

Статистика CDS (BACKUP): ED acceptance: 33.5%, доля класса по ED: 5.3%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 33.5%, доля класса по ED: 5.3%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 33.5%, доля класса по ED: 5.3%, раунды подачи: EA.' WHERE slug = 'university-of-san-francisco-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Legible copy of official transcripts from your final 2 years of pre-university education; ~CAD 25,000–45,000 per year (international undergraduate varies by program), ~CAD 3,000–full tuition support (entrance scholarships + competitive International Excellence Awards + bursaries + merit-based awards + faculty scholarships), ~10%–100% coverage depen

Финансирование в Канаде (CAD): ~CAD 25,000–45,000 per year (international undergraduate varies by program), ~CAD 3,000–full tuition support (entrance scholarships + competitive International Excellence Awards + bursaries + merit-based awards + faculty scholarships), ~10%–100% coverage depending on GPA and program strength.' WHERE slug = 'university-of-saskatchewan-canada';
UPDATE public.universities SET notes = 'Основан в 1997 году (Sharjah).' WHERE slug = 'university-of-sharjah-uae';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics, Econometrics and Finance, Physics and Astronomy, Medicine, Agricultural and Biological Sciences, Engineering, Environmental Science'), notes = 'Шеффилдский университет, или Университет Шеффилда (англ. University of Sheffield, англ. Sheffield University) — университет в городе Шеффилд, Англия, Великобритания.' WHERE slug = 'university-of-sheffield-uk';
UPDATE public.universities SET notes = 'Сиенский университет (итал. Università degli Studi di Siena, UNISI; лат. Universitas Senarum) — университет, расположенный в городе Сиена (Тоскана). Основан в 1240 году.' WHERE slug = 'university-of-siena-italy';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Materials Science, Arts and Humanities, Social Sciences, Physics and Astronomy, Earth and Planetary Sciences') WHERE slug = 'university-of-silesia-in-katowice-poland';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'university-of-sopron-hungary';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Advanced Economics in Business Program Grant, Advanced Finance in Business Program Grant, Architecture Museum Higher Degree by Research Travel Grant, Architecture Museum Travel Grant') WHERE slug = 'university-of-south-australia-australia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Up to 100%+ accomodation grant after the 1st year of studies for good preformance'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Основан в 1991 году (České Budějovice).' WHERE slug = 'university-of-south-bohemia-czech-republic';
UPDATE public.universities SET notes = 'Южно-Каролинский университет или Университе́т Ю́жной Кароли́ны или Университе́т шта́та Ю́жная Кароли́на — крупнейший государственный университет штата Южная Каролина в США.' WHERE slug = 'university-of-south-carolina-columbia-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,900'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '14%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'McNair Scholars (Full Tuition +)'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Biological & Biomedical Sciences, Engineering, Communication & Media, Psychology'), notes = 'Южно-Каролинский университет или Университе́т Ю́жной Кароли́ны или Университе́т шта́та Ю́жная Кароли́на — крупнейший государственный университет штата Южная Каролина в США.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-south-carolina-usa';
UPDATE public.universities SET notes = 'The University of South Florida (USF) is a public research university with its main campus located in Tampa, Florida, United States, and another campus in St.  Petersburg.' WHERE slug = 'university-of-south-florida-main-campus-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tampa, FL'), tuition_num = COALESCE(tuition_num, 18416), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$18,416 / год'), rate_num = COALESCE(rate_num, 43.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '43.2%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,006'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '15%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1130–1320'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Engineering'), notes = 'The University of South Florida (USF) is a public research university with its main campus located in Tampa, Florida, United States, and another campus in St.  Petersburg.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-south-florida-tampa-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Engineering, Medicine, Earth and Planetary Sciences'), notes = 'Саутгемптонский университет (англ. University of Southampton) — университет в Саутгемптоне, Англия. Является правопреемником Института Хартли (англ. Hartley Institution), основанного в 1862 году Генри Робертсоном Хартли.' WHERE slug = 'university-of-southampton-uk';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Full Tuition'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Visual & Performing Arts, Economics & Social Sciences, Engineering, Communication & Media, Computer Science & IT'), notes = 'Trustee Scholarship FULL-TUITION; NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission based on stats | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs; ARTS / TALENT-BASED | Selection: Portfolio/audition + interview | Intl: Yes, international applicants eligible | Chapter 7 — Art

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-southern-california-usa';
UPDATE public.universities SET notes = 'Основан в 1998 году (Copenhagen).' WHERE slug = 'university-of-southern-denmark-denmark';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Environmental Science, Agricultural and Biological Sciences, Arts and Humanities, Earth and Planetary Sciences, Chemistry'), notes = 'Сент-Эндрюсский университет (англ. University of St Andrews, сокр. St And) — старейший университет в Шотландии, третий по дате основания в Великобритании. Основан между 1410 и 1413 годами в городе Сент-Эндрюс (Сент-Андрус) на берегу Северного моря.' WHERE slug = 'university-of-st-andrews-uk';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), lang = COALESCE(NULLIF(lang, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'Университет Санкт-Галлена (нем. Universität St. Gallen, HSG) — это исследовательский университет, расположенный в Санкт-Галлене, Швейцария, который специализируется на бизнес-администрировании, экономике, праве, международных отношениях и компьютерных науках.' WHERE slug = 'university-of-st-gallen-switzerland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Saint Paul, MN'), rate_num = COALESCE(rate_num, 85.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '85.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$17,256'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '68%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1260–1423'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Economics & Social Sciences, Psychology, Computer Science & IT'), notes = 'The University of St.  Thomas is a private Catholic research university with campuses in Minneapolis and Saint Paul, Minnesota, United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-st-thomas-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.uni-stuttgart.de/en/study/living-in-stuttgart/finances/'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-stuttgart-germany';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'University of Sydney Scholars Award,  University of Sydney Chancellor’s Award, Vice Chancellors International scholarships scheme') WHERE slug = 'university-of-sydney-australia';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a') WHERE slug = 'university-of-szeged-hungary';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://www.wemakescholars.com/university/university-of-t-bingen/scholarships'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-t-bingen-germany';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Tampa, FL'), tuition_num = COALESCE(tuition_num, 33424), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$33,424 / год'), rate_num = COALESCE(rate_num, 40.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '40.9%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Economics & Social Sciences, Biological & Biomedical Sciences, Communication & Media, Psychology'), notes = 'The University of Tampa is a private university in Tampa, Florida, United States.  It is accredited by the Southern Association of Colleges and Schools.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-tampa-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tasmanian International Scholarship, Australia Awards Scholarships') WHERE slug = 'university-of-tasmania-australia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Vice-Chancellor’s International Undergraduate Scholarship, UTS Undergraduate Academic Excellence International Scholarship, UTS Foundation Studies Scholarship, UTS College to UTS Pathways Scholarship') WHERE slug = 'university-of-technology-sydney-uts-australia';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,788'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '32%'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-tennesee-knoxville-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Economics & Social Sciences, Communication & Media, Health & Medicine'), notes = 'Университет Теннесси — общественный университет в Ноксвилле, штат Теннесси, США.  Основан в 1794 году, за два года до того, как Теннесси стал в 16-м штатом США.' WHERE slug = 'university-of-tennessee-knoxville-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Engineering, Computer Science & IT, Biological & Biomedical Sciences, Communication & Media'), notes = 'Техасский университет в Арлингтоне — американский государственный исследовательский университет в Арлингтоне, штат Техас.' WHERE slug = 'university-of-texas-at-arlington-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Biological & Biomedical Sciences, Communication & Media, Economics & Social Sciences, Computer Science & IT') WHERE slug = 'university-of-texas-at-austin-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1170–1410 · ACT 25–32'), majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Business & Management, Biological & Biomedical Sciences, Engineering, Health & Medicine, Visual & Performing Arts') WHERE slug = 'university-of-texas-at-dallas-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$8,352'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '26%'), notes = 'Техасский университет в Остине, также известен как UT Austin, UT, или Texas — публичный университет штата Техас в городе Остине и главный в системе Техасского университета.  Главный кампус расположен в километре от здания техасского конгресса.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-texas-austin-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$10,175'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '38%'), notes = 'Техасский университет в Далласе — второй крупнейший государственный университет в Далласе.  Первоначально был основан как частное исследовательское подразделение компании Texas Instruments.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-texas-dallas-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'San Antonio, TX'), tuition_num = COALESCE(tuition_num, 21965), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$21,965 / год'), rate_num = COALESCE(rate_num, 88.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '88.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$2,686'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '98%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1000–1200 · ACT 19–26'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Computer Science & IT, Psychology, Engineering, Biological & Biomedical Sciences, Health & Medicine'), notes = 'Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-texas-san-antonio-usa';
UPDATE public.universities SET notes = 'Университет Балеарских островов (кат. Universitat de les Illes Balears) — испанский университет, находящийся в городе Пальма. Отдалённые корни Университета Балеарских островов восходят к Университету Монпелье, который располагался на островах, бывших в составе королевства Мальорка в XIII веке.' WHERE slug = 'university-of-the-balearic-islands-spain';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Engineering, Computer Science & IT, Health & Medicine, Psychology'), notes = 'University of the Pacific is a private, historically Methodist-affiliated university with its main campus in Stockton, California, United States, and graduate campuses in San Francisco and Sacramento.  It was the first university chartered in the state of California (1851), the first independent coeducational campus in California, and the first conservatory of music and first medical school on the West Coast.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-the-pacific-usa';
UPDATE public.universities SET full_grant = true, merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholarship (Full Ride + $3,000 exp)'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Engineering, Biological & Biomedical Sciences, Liberal Arts, Education'), notes = 'Университет Толедо — государственный исследовательский университет в Толидо, штат Огайо, США.  Это самый северный кампус Университетской системы Огайо.

Стипендия Presidential Scholarship (Full Ride + $3,000 exp): мин. требования — 30+ ACT or 1340+ SAT (CR+M), 3.8+ GPA,.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-toledo-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Lester B. Pearson International Scholarship (~37 чел./год, полное покрытие)'), essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'стипендия очень большая, но ее очень тяжело получить. еще надо, чтобы ТЕБЯ порекомендовала твоя школа. У каждого факультета свои требования для эссе, но многие не требуют hard to get into; Listed universities / scholarships (Canada) | University of Toronto – Lester B. Pearson International Scholarship; ~CAD 48,000–70,000 per year, ~CAD 5,000– full

Финансирование в Канаде (CAD): ~CAD 48,000–70,000 per year, ~CAD 5,000– full ride aid (merit + need-based + entrance scholarships + Lester B. Pearson full scholarship + faculty awards), ~10%–100% coverage.' WHERE slug = 'university-of-toronto-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Education Future/ Partial funding
DSU- Regional Scholarship(подавать отдельно)'), notes = 'Университет Триеста (итал. Università degli Studi di Trieste, сокр. UniTS) — университет в Италии. Был основан в 1924 году, состоит из 10 кафедр (факультетов), имеет широкий спектр университетских курсов, насчитывает около 15000 студентов и 1000 профессоров.' WHERE slug = 'university-of-trieste-italy';
UPDATE public.universities SET notes = 'Университет Цукуба (яп. 筑波大学 Цукуба дайгаку) — национальный университет, расположенный в городе Цукуба на юге префектуры Ибараки. Университет выбран правительством Японии в числе девяти лучших национальных университетов высшего типа в рамках проекта Top Global University Project.' WHERE slug = 'university-of-tsukuba-japan';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 48602), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$48,602 / год'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1490 · ACT 24–33'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Biological & Biomedical Sciences, Computer Science & IT, Health & Medicine, Economics & Social Sciences') WHERE slug = 'university-of-tulsa-usa';
UPDATE public.universities SET notes = 'Туринский университет (итал. Università degli Studi di Torino) — высшее учебное заведение, расположенное в Турине. Один из крупнейших университетов Италии.' WHERE slug = 'university-of-turin-italy';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 23684), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$23,684 / год'), rate_num = COALESCE(rate_num, 88.2), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '88.2%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1210–1450'), notes = 'The University of Oxford is a collegiate research university in Oxford, England.  There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world''s second-oldest university in continuous operation.' WHERE slug = 'university-of-usa';
UPDATE public.universities SET notes = 'The University of Utah is a public research university in Salt Lake City, Utah, United States.  It was established in 1850 as the University of Deseret by the General Assembly of the provisional State of Deseret, making it Utah''s oldest institution of higher education.' WHERE slug = 'university-of-utah-salt-lake-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$6,234'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '2%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholarship (Full Tuition)'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1180–1398 · ACT 22–29'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Computer Science & IT, Biological & Biomedical Sciences, Engineering, Psychology'), notes = 'Университет Юты — самое большое и значительное высшее учебное заведение штата Юта, США.  Университет Юты является членом Ассоциации американских университетов, организации из ведущих научно-исследовательских университетов Соединённых Штатов Америки, одним из 146 высших учебных заведений США с классификацией «R1: докторские университеты — очень высокая исследовательская активность».

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-utah-usa';
UPDATE public.universities SET rate_num = COALESCE(rate_num, 60), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '60%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$24,432'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '40%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1250–1420 · ACT 29–32'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Environmental Science, Economics & Social Sciences, Health & Medicine, Business & Management, Engineering'), notes = 'Tier 3: PUBLIC EXCEPTION | Awarded ~$39,655 avg. to 119 international students (2024-25), the most of any public university,

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-vermont-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Budapest'), majors = COALESCE(NULLIF(majors, ''), 'Agricultural and Biological Sciences, Immunology and Microbiology, Veterinary, Biochemistry, Genetics and Molecular Biology, Medicine, Environmental Science') WHERE slug = 'university-of-veterinary-medicine-hungary';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-victoria-canada';
UPDATE public.universities SET notes = 'Вирги́нский университе́т или Университе́т Вирги́нии (Вирджинии) — государственный исследовательский университет штата Вирджиния, США.  Флагманский вуз штата, входит в тройку лучших государственных университетов в США.' WHERE slug = 'university-of-virginia-main-campus-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Jefferson Scholarship (Full Ride + books)'), majors = COALESCE(NULLIF(majors, ''), 'Liberal Arts, Economics & Social Sciences, Engineering, Business & Management, Computer Science & IT, Biological & Biomedical Sciences'), notes = 'Jefferson Scholars Foundation Award; NAMED COMPETITIVE AWARD | Selection: Nomination + competitive selection | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): раунды подачи: EA.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'university-of-virginia-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Physics and Astronomy, Mathematics, Decision Sciences, Computer Science, Business, Management and Accounting, Economics, Econometrics and Finance'), notes = 'Университет Уорик или Уорикский университет (англ. The University of Warwick) — университет в Ковентри, графство Уэст-Мидлендс, Великобритания. Входит в состав группы M5 Universities.' WHERE slug = 'university-of-warwick-uk';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Computer Science & IT, Biological & Biomedical Sciences, Economics & Social Sciences, Engineering, Business & Management, Health & Medicine'), notes = 'The University of Washington is a public research university in Seattle, Washington, United States.  Founded in 1861, it is one of the oldest universities on the West Coast of the United States.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-washington-seattle-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = 'one of the best engineering/math post secondary education in Canada, couple with the coop program, and at a fairly low tuition, you''re almost guaranteed a job upon graduation; ~CAD 45,000–70,000 per year (international undergraduate tuition, highest in CS/Engineering), ~CAD 1,000–full ride aid (merit entrance scholarships + President’s Scholarship

Финансирование в Канаде (CAD): ~CAD 45,000–70,000 per year (international undergraduate tuition, highest in CS/Engineering), ~CAD 1,000–full ride aid (merit entrance scholarships + President’s Scholarship + International Admission Scholarship + faculty awards + co- op income potential), ~5%–100% coverage (but full coverage is extremely rare; most aid is partial).' WHERE slug = 'university-of-waterloo-canada';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), essay = COALESCE(NULLIF(essay, ''), 'N/A') WHERE slug = 'university-of-west-bohemia-czech-republic';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'n/a'), essay = COALESCE(NULLIF(essay, ''), 'n/a'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Environmental Science, Agricultural and Biological Sciences, Materials Science, Chemical Engineering, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'university-of-west-hungary-hungary';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Achieving Potential Support Scholarships, Achieving Potential Placement Grant, Accounting Honours Scholarship') WHERE slug = 'university-of-western-australia-uwa-australia';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'https://students.usask.ca/money/loans.php#Determineeligibility') WHERE slug = 'university-of-windsor-canada';
UPDATE public.universities SET notes = '~CAD 15,000–22,000 per year (international undergraduate tuition), ~CAD 1,000–10,000 aid (entrance scholarships + merit- based awards + bursaries + International Special Entrance Scholarships + faculty awards), ~5% –60% coverage depending on GPA and scholarship level

Финансирование в Канаде (CAD): ~CAD 15,000–22,000 per year (international undergraduate tuition), ~CAD 1,000–10,000 aid (entrance scholarships + merit- based awards + bursaries + International Special Entrance Scholarships + faculty awards), ~5% –60% coverage depending on GPA and scholarship level.' WHERE slug = 'university-of-winnipeg-canada';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Economics & Social Sciences, Engineering, Computer Science & IT, Communication & Media'), notes = 'Висконсинский университет в Мадисоне — исследовательский университет штата Висконсин, расположенный в Мадисоне.  Ведущий кампус системы Висконсинского университета, а также член-основатель Ассоциации американских университетов.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-wisconsin-madison-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Milwaukee, WI'), tuition_num = COALESCE(tuition_num, 22020), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$22,020 / год'), rate_num = COALESCE(rate_num, 88.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '88.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$3,533'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '6%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1090'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Visual & Performing Arts, Psychology, Engineering, Education'), notes = 'Висконсинский университет в Милуоки — публичный исследовательский университет в Милуоки, входящий в систему Висконсинского университета.  В современном виде существует с 1956 года, позволяет получить степень бакалавра по почти 100 специальностям на 14 факультетах.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'university-of-wisconsin-milwaukee-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'University of Wollongong Diplomat Scholarship, University of Wollongong Faculty of Science, Medicine and Health International School Scholarship, University Excellence Scholarship') WHERE slug = 'university-of-wollongong-australia';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'university-of-zielona-g-ra-poland';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Цюрихский университет (нем. Universität Zürich, сокращенно UZH) — государственный университет в Цюрихе, крупнейший университет Швейцарии, в котором в настоящее время обучается более 26 тыс. студентов.' WHERE slug = 'university-of-zurich-switzerland';
UPDATE public.universities SET notes = 'Университет Валенсии (исп. Universidad de Valencia) — высшее учебное заведение в городе Валенсия (Испания). Был основан в 1499 году.' WHERE slug = 'university-og-valencia-spain';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'n/a'), notes = 'Основан в 1989 году (Kowloon).' WHERE slug = 'uow-college-hong-kong-hong-kong';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'Tuition'), notes = 'Уппсальский (Упсальский) университет (Университет Упсалы) (швед. Uppsala universitet) — старейший университет Швеции и всей Скандинавии, основан в 1477 году, находится в шведском городе Уппсала.' WHERE slug = 'uppsala-university-sweden';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Psychology, Biological & Biomedical Sciences, Communication & Media, Liberal Arts'), notes = 'Utica University is a private university in Utica, New York, United States.

Статистика CDS (BACKUP): ED acceptance: 88.9%, доля класса по ED: 1.6%, раунды подачи: EA, EA II.

Статистика CDS (fin aid): ED acceptance: 88.9%, доля класса по ED: 1.6%, раунды подачи: EA, EA II.

Статистика CDS (EDEARD): ED acceptance: 88.9%, доля класса по ED: 1.6%, раунды подачи: EA, EA II.' WHERE slug = 'utica-college-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Engineering, Business & Management, Economics & Social Sciences, Physical Sciences, Psychology'), notes = 'Valparaiso University (Valpo) is a private university in Valparaiso, Indiana, United States.  It is an independent Lutheran university with five colleges.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'valparaiso-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'various (Full Tuition + exp)'), notes = 'Ingram, Cornelius Vanderbilt, & Chancellor''s Scholars; NAMED COMPETITIVE AWARD | Selection: Automatic consideration on admission + interview round | Intl: Yes, international freshman applicants considered | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy; meets full need for admits |

Полное финансирование: Cornelius Vanderbilt / Ingram / Chancellor''s — full tuition + летняя стипендия.

Официальная политика помощи: Vanderbilt will meet 100% of demonstrated financial need for all admitted students.

Статистика CDS (DREAM): ED acceptance: 19.9%, доля класса по ED: 53.6%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 19.9%, доля класса по ED: 53.6%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 19.9%, доля класса по ED: 53.6%, раунды подачи: ED II.' WHERE slug = 'vanderbilt-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Not provided', notes = 'Vassar Financial Aid Award 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | No-loan policy; need-aware for internationals only | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need (need-aware).

Официальная политика помощи: Vassar meets 100% of the full demonstrated need of all admitted students, international or domestic, for all four years.

Статистика CDS (TARGET): ED acceptance: 40.4%, доля класса по ED: 44.9%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 40.4%, доля класса по ED: 44.9%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 40.4%, доля класса по ED: 44.9%, раунды подачи: ED II.' WHERE slug = 'vassar-college-usa';
UPDATE public.universities SET notes = 'Видземская высшая школа (латыш. Vidzemes Augstskola) — высшее учебное заведение, основанное в 1996 году в Валмиере.' WHERE slug = 'vidzeme-university-of-applied-sciences-latvia';
UPDATE public.universities SET how_apply_aid = 'CSS + Presidential scholarship | CSS Waiver: Request via email', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Presidential Scholarship (Full Ride)'), notes = 'NAMED COMPETITIVE AWARD | Selection: Nomination by admissions + application | Intl: Yes, international nominees accepted | Chapter 5 — Named Competitive Full-Ride Programs

Статистика CDS (TARGET): ED acceptance: 56.5%, доля класса по ED: 33.5%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 56.5%, доля класса по ED: 33.5%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 56.5%, доля класса по ED: 33.5%, раунды подачи: ED II, EA.' WHERE slug = 'villanova-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'NA'), notes = 'Университет Содружества Виргинии — государственный исследовательский университет в городе Ричмонд, штат Виргиния, США.  Возник в 1968 году в результате слияния Ричмондского профессионального института и Виргинского медицинского колледжа.' WHERE slug = 'virginia-commonwealth-university-in-qatar-qatar';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1030–1270 · ACT 22–30'), majors = COALESCE(NULLIF(majors, ''), 'Visual & Performing Arts, Business & Management, Psychology, Biological & Biomedical Sciences, Education, Health & Medicine'), notes = 'Университет Содружества Виргинии — государственный исследовательский университет в городе Ричмонд, штат Виргиния, США.  Возник в 1968 году в результате слияния Ричмондского профессионального института и Виргинского медицинского колледжа.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'virginia-commonwealth-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Lexington, VA'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1040–1260 · ACT 22–28'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Engineering, History, Psychology, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'The Virginia Military Institute (VMI) is a public senior military college in Lexington, Virginia, United States.  It was founded in 1839 as America''s first state-sponsored and state-supported military college and is the oldest public senior military college in the United States.

Статистика CDS (fin aid): ED acceptance: 68.5%, доля класса по ED: 55.4%.

Статистика CDS (EDEARD): ED acceptance: 68.5%, доля класса по ED: 55.4%.' WHERE slug = 'virginia-military-institute-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 36694), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$36,694 / год'), rate_num = COALESCE(rate_num, 57), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '57%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1240–1420 · ACT 27–32'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Computer Science & IT, Psychology'), notes = 'Вирджинский политехнический институт и университет штата — публичный исследовательский университет в Блаксберге, штат Виргиния, США.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'virginia-tech-usa';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), 'N/A'), sat = COALESCE(NULLIF(sat, ''), 'N/A'), majors = COALESCE(NULLIF(majors, ''), 'Economics, Econometrics and Finance, Business, Management and Accounting, Computer Science, Decision Sciences'), notes = 'Пражский экономический университет (чеш. Vysoká škola ekonomická v Praze) — высшее учебное заведение, расположенное в Праге, Чехия. Университет был основан в 1953 году, сегодня он является самым крупным экономическим университетом в Чешской Республике.' WHERE slug = 'vse-czech-republic';
UPDATE public.universities SET aid_max = COALESCE(NULLIF(aid_max, ''), '-'), notes = 'Брюссельский свободный университет (нид. Vrije Universiteit Brussel, сокращённо — VUB) — университет в Брюсселе с преподаванием на нидерландском языке. Возник в 1970 году, когда нидерландскоязычные факультеты были выделены в отдельный университет из состава франкоязычного Брюссельского свободного университета (фр. Université Libre de Bruxelles), основанного в 1834 году.' WHERE slug = 'vu-brussel-belgium';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Mathematics & Statistics, English & Literature, Computer Science & IT'), notes = 'Wabash College is a private, men''s liberal arts college in Crawfordsville, Indiana, United States.  Founded in 1832 by a group of Dartmouth College graduates and Midwestern leaders, the institution was originally named "The Wabash Teachers Seminary and Manual Labor College".

Статистика CDS (BACKUP): ED acceptance: 90.7%, доля класса по ED: 17%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 90.7%, доля класса по ED: 17%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 90.7%, доля класса по ED: 17%, раунды подачи: EA.' WHERE slug = 'wabash-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Staten Island, NY'), rate_num = COALESCE(rate_num, 83.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '83.5%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1150–1320 · ACT 23–27'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Visual & Performing Arts, Business & Management, Psychology, Economics & Social Sciences, Biological & Biomedical Sciences'), notes = 'Wagner College is a private college in Staten Island, New York, United States.  It was established in 1883 and, as of the 2023–2024 academic year, it enrolled approximately 1,932 students, including 1,592 undergraduates and 340 graduates.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'wagner-college-usa';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Multiple (Full Ride +)'), notes = 'Nancy Susan Reynolds Scholarship; NAMED COMPETITIVE AWARD | Selection: Nomination + competitive interview | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs; DEBATE / FORENSICS | Selection: Competitive application + debate record review | Intl: Yes, international applicants with debate background eligi

Статистика CDS (TARGET): ED acceptance: 30.6%, доля класса по ED: 46.1%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 30.6%, доля класса по ED: 46.1%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 30.6%, доля класса по ED: 46.1%, раунды подачи: ED II.' WHERE slug = 'wake-forest-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Swannanoa, NC'), rate_num = COALESCE(rate_num, 77.6), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '77.6%'), sat = COALESCE(NULLIF(sat, ''), 'SAT ~1290'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, English & Literature, Environmental Science, Public Policy & Social Work'), notes = 'Warren Wilson College (WWC) is a private liberal arts college work college in Swannanoa, North Carolina.  It is known for its curriculum that combines academics with work and service.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'warren-wilson-college-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'n/a') WHERE slug = 'warsaw-university-of-life-sciences-poland';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Waverly, IA'), rate_num = COALESCE(rate_num, 99.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '99.4%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 978–1235 · ACT 19–27'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Business & Management, Education, Economics & Social Sciences, Psychology, Health & Medicine'), notes = 'Wartburg College is a private Lutheran liberal arts college in Waverly, Iowa.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'wartburg-college-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'N/A'), notes = 'Университет Васэда (яп. 早稲田大学 Васэда Дайгаку, или сокращённо 早大 Со:дай) широко известен как один из двух наиболее престижных частных университетов Японии (второй — Университет Кэйо).' WHERE slug = 'waseda-university-japan';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Washington, PA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$66,108'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '96%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, English & Literature, Computer Science & IT'), notes = 'Washington & Jefferson College is a private liberal arts college in Washington, Pennsylvania, United States.  It traces its origin to three Presbyterian missionaries of the 1780s, John McMillan, Thaddeus Dod, and Joseph Smith, whose early schools evolved into two rival institutions: Washington College in Washington, and Jefferson College in Canonsburg, Pennsylvania.

Статистика CDS (BACKUP): ED acceptance: 61.5%, доля класса по ED: 2.7%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 61.5%, доля класса по ED: 2.7%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 61.5%, доля класса по ED: 2.7%, раунды подачи: EA.' WHERE slug = 'washington-and-jefferson-college-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 57285), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$57,285 / год'), need_blind = true, total_aid_millions = COALESCE(NULLIF(total_aid_millions, ''), '$3.3m'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$55,926'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '96%'), intl_aid_policy = COALESCE(NULLIF(intl_aid_policy, ''), 'need-aware'), how_apply_aid = 'Johnson Scholarsip (apply by December 1)
CSS Profile | CSS Waiver: Waiver request form', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Johnson Scholarship (Full Ride)'), early_deadline = COALESCE(NULLIF(early_deadline, ''), '1 ноября'), regular_deadline = COALESCE(NULLIF(regular_deadline, ''), '1 января'), lang = COALESCE(NULLIF(lang, ''), '6.5'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1410–1530 · ACT 32–35'), notes = 'Университет Вашингтона и Ли — американский частный гуманитарный университет в городе Лексингтон, штат Виргиния.  Основан в 1749 году как небольшая классическая школа.

Полное финансирование: need-blind для иностранцев + Johnson Scholarship (full ride по merit).

Официальная политика помощи: Washington and Lee University provides both need-based and merit-based assistance to international students in each entering class. Awards range from several thousand dollars to the full annual cost of attendance.

Статистика CDS (fin aid): раунды подачи: #N/A.

Статистика CDS (EDEARD): ED acceptance: 43.1%, доля класса по ED: 54.8%, раунды подачи: ED II.' WHERE slug = 'washington-and-lee-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Communication & Media, Psychology, Engineering'), notes = 'Университет штата Вашингтон — государственный исследовательский университет штата Вашингтон, расположенный в Пулмене.  Имеет с широкий спектр дисциплин, включающих такие специализации как инженерное дело, ветеринария, сельское хозяйство, медицина, естественные науки и многие другие.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'washington-state-university-usa';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Email/not guaranteed', merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Full Tuition'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1500–1570'), notes = 'Danforth Scholars Program; NAMED COMPETITIVE AWARD | Selection: Nomination + competitive selection | Intl: Yes, international applicants eligible | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Need-aware for international first-years | Aid form: CSS Profile

Полное финансирование: Danforth / Ervin / Rodriguez full-tuition + 100% need.

Статистика CDS (fin aid): раунды подачи: ED II.

Статистика CDS (EDEARD): раунды подачи: ED II.' WHERE slug = 'washington-university-in-st-louis-usa';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Health & Medicine, Psychology, Engineering, Biological & Biomedical Sciences, Economics & Social Sciences'), notes = 'Университет Уэйна — государственный университет штата Мичиган, расположенный в городе Детройт, США.  Основан в 1868 году.' WHERE slug = 'wayne-state-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 61060), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$61,060 / год'), rate_num = COALESCE(rate_num, 20), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '20%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1390–1525'), majors = COALESCE(NULLIF(majors, ''), 'Engineering') WHERE slug = 'webb-institute-usa';
UPDATE public.universities SET notes = 'Основан в 1978 году (Geneva).' WHERE slug = 'webster-university-geneva-switzerland';
UPDATE public.universities SET notes = 'Основан в 2001 году (Education City in Doha).' WHERE slug = 'weill-cornell-medical-college-in-qatar-qatar';
UPDATE public.universities SET how_apply_aid = 'FAIF + CSS (if needed) | CSS Waiver: Not provided', notes = 'Wellesley International Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | 2029) | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need для принятых иностранцев.

Официальная политика помощи: Wellesley is committed to meeting 100% of demonstrated need for all admitted international citizens who have applied for financial aid during the admission process.

Статистика CDS (TARGET): ED acceptance: 33.1%, доля класса по ED: 36.3%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 33.1%, доля класса по ED: 36.3%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 33.1%, доля класса по ED: 36.3%, раунды подачи: ED II.' WHERE slug = 'wellesley-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Aurora, NY'), tuition_num = COALESCE(tuition_num, 35166), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$35,166 / год'), rate_num = COALESCE(rate_num, 69.7), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '69.7%'), majors = COALESCE(NULLIF(majors, ''), 'Psychology, Biological & Biomedical Sciences, Economics & Social Sciences, Business & Management, English & Literature, Visual & Performing Arts'), notes = 'Wells College was a private liberal arts college in Aurora, New York, United States, until its closure in 2024.  It was founded in 1868 as a women''s college and became coeducational in 2005.

Статистика CDS (fin aid): раунды подачи: EA.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'wells-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Boston, MA'), rate_num = COALESCE(rate_num, 85.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '85.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$9,865'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '75%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1140–1320 · ACT 25–31'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Business & Management, Architecture, Visual & Performing Arts'), notes = 'Wentworth Institute of Technology (WIT) is a private university in Boston, Massachusetts, United States.  Wentworth was founded in 1904 and offers career-focused education through 22 bachelor''s degree programs as well as 11 master''s degrees.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'wentworth-institute-of-technology-usa';
UPDATE public.universities SET notes = 'Freeman Asian Scholars / General Aid 100%; NAMED COMPETITIVE AWARD | Selection: Competitive application, financial aid required | Intl: Region-specific: Africa (54 nations) only | Chapter 5 — Named Competitive Full-Ride Programs; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Highest avg. intl aid in US: $90,106/student (2024-25) | Aid form: CSS P

Полное финансирование: Freeman Asian Scholars + 100% demonstrated need.

Статистика CDS (DREAM): ED acceptance: 37.1%, доля класса по ED: 53%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 37.1%, доля класса по ED: 53%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 37.1%, доля класса по ED: 53%, раунды подачи: ED II.' WHERE slug = 'wesleyan-university-usa';
UPDATE public.universities SET sat = COALESCE(NULLIF(sat, ''), 'SAT 1010–1240 · ACT 20–26'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Engineering, Health & Medicine, Biological & Biomedical Sciences, Economics & Social Sciences, Communication & Media'), notes = 'Университет Западной Виргинии — государственный исследовательский университет штата Западная Виргиния.  Основан в 1867 году.' WHERE slug = 'west-virginia-university-usa';
UPDATE public.universities SET essay = COALESCE(NULLIF(essay, ''), 'N/A'), notes = '1) For most institutions in Canada, they don''t require entrance essays for admissions, as it is usually mainly based on grades. There are some programmes that require additional documents, though. ... Some institutions will accept applications directly. 2) is considered to be a party school; ~CAD 38,000–70,000 per year (international undergraduate

Финансирование в Канаде (CAD): ~CAD 38,000–70,000 per year (international undergraduate tuition varies by faculty), ~CAD 3,000–full tuition aid (entrance scholarships + Western International Admission Scholarships + merit awards + need-based bursaries + faculty awards), ~5%–100% coverage depending on GPA and scholarship tier.' WHERE slug = 'western-university-canada';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Bellingham, WA'), tuition_num = COALESCE(tuition_num, 27853), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$27,853 / год'), rate_num = COALESCE(rate_num, 91.3), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '91.3%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$3,179'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '55%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1110–1350 · ACT 23–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Psychology, Environmental Science, Education, Visual & Performing Arts'), notes = 'Университет Западного Вашингтонa — американский общественный университет, расположенный в городе Беллингхем, штат Вашингтон.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'western-washington-university-usa';
UPDATE public.universities SET notes = 'Westminster College is a private liberal arts college in Fulton, Missouri, United States.  It was established in 1851 as Fulton College.

Статистика CDS (EDEARD): раунды подачи: EA.' WHERE slug = 'westminster-college-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,269'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '92%'), notes = 'Основан в 1875 году (Salt Lake City, UT).

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'westminster-college-ut-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Santa Barbara, CA'), rate_num = COALESCE(rate_num, 79.9), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '79.9%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1212–1418 · ACT 30–34'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Communication & Media, Computer Science & IT'), notes = 'Westmont College is a private Christian liberal arts college in Montecito, California, United States.  It was founded in 1937.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'westmont-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Wheaton, IL'), rate_num = COALESCE(rate_num, 87.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '87.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,310'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '80%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1260–1470'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Business & Management, Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, English & Literature'), notes = 'Wheaton College is a private Evangelical Christian college in Wheaton, Illinois, United States.  A four-year liberal arts school, it was founded by evangelical abolitionists in 1860.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'wheaton-college-il-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Norton, MA'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$27,750'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '92%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1210–1420 · ACT 29–33'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Visual & Performing Arts, Economics & Social Sciences, Psychology, English & Literature'), notes = 'Wheaton College is a private liberal arts college in Norton, Massachusetts.  Wheaton was founded in 1834 as a female seminary.

Статистика CDS (BACKUP): ED acceptance: 80%, доля класса по ED: 19%, раунды подачи: ED II, EA.

Статистика CDS (fin aid): ED acceptance: 80%, доля класса по ED: 19%, раунды подачи: ED II, EA.

Статистика CDS (EDEARD): ED acceptance: 80%, доля класса по ED: 19%, раунды подачи: ED II, EA.' WHERE slug = 'wheaton-college-ma-usa';
UPDATE public.universities SET notes = 'Wheaton College is a private Evangelical Christian college in Wheaton, Illinois, United States.  A four-year liberal arts school, it was founded by evangelical abolitionists in 1860.' WHERE slug = 'wheaton-college-usa';
UPDATE public.universities SET notes = 'Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | Meets full need for admitted internationals | Aid form: CSS Profile

Полное финансирование: WISFAA (бесплатная форма помощи), комбинация merit + need.

Статистика CDS (TARGET): ED acceptance: 72%, доля класса по ED: 32.7%, раунды подачи: ED II.

Статистика CDS (fin aid): ED acceptance: 72%, доля класса по ED: 32.7%, раунды подачи: ED II.

Статистика CDS (EDEARD): ED acceptance: 72%, доля класса по ED: 32.7%, раунды подачи: ED II.' WHERE slug = 'whitman-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Whittier, CA'), rate_num = COALESCE(rate_num, 85.4), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '85.4%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$23,143'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '72%'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Biological & Biomedical Sciences, Psychology, Visual & Performing Arts, Public Policy & Social Work'), notes = 'Whittier College is a private liberal arts college in Whittier, California, United States.  Founded by Quakers in 1887, it is a federally-designated Hispanic-Serving Institution.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'whittier-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Spokane, WA'), rate_num = COALESCE(rate_num, 86.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '86.8%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$34,076'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1100–1320 · ACT 21–29'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Economics & Social Sciences, Psychology, Education, Physical Sciences, Health & Medicine'), notes = 'Whitworth University is a private Christian university that is affiliated with the Presbyterian Church and located in Spokane, Washington, United States.  Founded in 1890, Whitworth enrolls nearly 2,600 students and offers more than 100 graduate and undergraduate programs.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'whitworth-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Chester, PA'), rate_num = COALESCE(rate_num, 84), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '84%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$21,245'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '40%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1050–1260'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Engineering, Business & Management, Psychology, Biological & Biomedical Sciences, Computer Science & IT'), notes = 'Widener University is a private university in Chester, Pennsylvania, United States.  Established in 1821, the university was known as the Pennsylvania Military College until 1972.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'widener-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Salem, OR'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$17,973'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1220–1430 · ACT 27–32'), majors = COALESCE(NULLIF(majors, ''), 'Economics & Social Sciences, Biological & Biomedical Sciences, Physical Sciences, Psychology, Visual & Performing Arts, Communication & Media'), notes = 'Уилламеттский университет — частный гуманитарный колледж в Сейлеме в штате Орегон, США.  Основанный в 1842 году, он является старейшим университетом на западе США.

Статистика CDS (BACKUP): ED acceptance: 71.4%, доля класса по ED: 5.4%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 71.4%, доля класса по ED: 5.4%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 71.4%, доля класса по ED: 5.4%, раунды подачи: EA.' WHERE slug = 'willamette-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 14685), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$14,685 / год'), rate_num = COALESCE(rate_num, 58), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '58%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 880–1200 · ACT 20–27'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Education, Business & Management, Biological & Biomedical Sciences, Psychology, English & Literature') WHERE slug = 'william-carey-university-usa';
UPDATE public.universities SET notes = 'Williams Financial Aid 100%; Tier 2: NEED-AWARE, FULL NEED MET IF ADMITTED | 2029) | Aid form: CSS Profile

Полное финансирование: meets 100% demonstrated need включая бесплатные учебники (Book Grant).

Официальная политика помощи: Williams meets 100 percent of the demonstrated need of every student admitted to the college. In addition to funding tuition, room, and board, our aid packages for international students include yearly travel, textbooks, and personal spending allowances

Статистика CDS (DREAM): ED acceptance: 37.3%, доля класса по ED: 47.1%.

Статистика CDS (fin aid): ED acceptance: 37.3%, доля класса по ED: 47.1%.

Статистика CDS (EDEARD): ED acceptance: 37.3%, доля класса по ED: 47.1%.' WHERE slug = 'williams-college-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Winona, MN'), tuition_num = COALESCE(tuition_num, 17230), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$17,230 / год'), rate_num = COALESCE(rate_num, 68.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '68.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$5,244'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '40%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 980–1250 · ACT 19–25'), majors = COALESCE(NULLIF(majors, ''), 'Health & Medicine, Business & Management, Education, Psychology, Biological & Biomedical Sciences, Public Policy & Social Work'), notes = 'Winona State University is a public university in Winona, Minnesota, United States.  It was founded as First State Normal School of Minnesota in 1858 and is the oldest member of the Minnesota State Colleges and Universities System.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'winona-state-university-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$29,411'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '75%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1070–1260 · ACT 20–27'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Education, Psychology, Economics & Social Sciences, Health & Medicine'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Partial need-based + merit aid for internationals | Aid form: Institutional

Статистика CDS (BACKUP): ED acceptance: 94.7%, доля класса по ED: 20.6%, раунды подачи: EA.

Статистика CDS (fin aid): ED acceptance: 94.7%, доля класса по ED: 20.6%, раунды подачи: EA.

Статистика CDS (EDEARD): ED acceptance: 94.7%, доля класса по ED: 20.6%, раунды подачи: EA.' WHERE slug = 'wittenberg-university-usa';
UPDATE public.universities SET tuition_num = COALESCE(tuition_num, 63246), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$63,246 / год') WHERE slug = 'worcester-polytechnic-institute-partial-usa';
UPDATE public.universities SET avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$19,198'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '93%'), merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'Foisie Scholars (Full Tuition)'), majors = COALESCE(NULLIF(majors, ''), 'Engineering, Computer Science & IT, Biological & Biomedical Sciences, Mathematics & Statistics, Visual & Performing Arts, Physical Sciences'), notes = 'Tier 3: PARTIAL / LIMITED NEED-BASED AID | Project-based, co-op-heavy engineering focus | Aid form: CSS Profile

Статистика CDS (fin aid): раунды подачи: ED II, EA, EA II.

Статистика CDS (EDEARD): раунды подачи: ED II, EA, EA II.' WHERE slug = 'worcester-polytechnic-institute-usa';
UPDATE public.universities SET notes = 'Вустерский политехнический институт — американский частный исследовательский институт, расположенный в городе Вустер, штат Массачусетс.' WHERE slug = 'worcester-polytechnic-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New Orleans, LA'), tuition_num = COALESCE(tuition_num, 27868), tuition_display = COALESCE(NULLIF(tuition_display, ''), '$27,868 / год'), rate_num = COALESCE(rate_num, 74.5), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '74.5%'), avg_aid_award = COALESCE(NULLIF(avg_aid_award, ''), '$12,135'), intl_receiving_aid_pct = COALESCE(NULLIF(intl_receiving_aid_pct, ''), '100%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 953–1138 · ACT 19–25'), majors = COALESCE(NULLIF(majors, ''), 'Biological & Biomedical Sciences, Psychology, Health & Medicine, Business & Management, Physical Sciences, Economics & Social Sciences'), notes = 'Xavier University of Louisiana (XULA) is a private historically black Catholic university in New Orleans, Louisiana, United States.  It is the only Catholic HBCU.

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'xavier-university-of-louisiana-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Ankara'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Medicine, Social Sciences, Dentistry, Biochemistry, Genetics and Molecular Biology, Health Professions') WHERE slug = 'y-ld-r-m-beyaz-t-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Van'), majors = COALESCE(NULLIF(majors, ''), 'Mathematics, Medicine, Arts and Humanities, Social Sciences, Agricultural and Biological Sciences, Chemistry') WHERE slug = 'y-z-nc-y-l-niversitesi-turkey';
UPDATE public.universities SET notes = 'Основан в 2011 году (western part of Singapore).' WHERE slug = 'yale-nus-college-singapore';
UPDATE public.universities SET how_apply_aid = 'CSS Profile + supplements | CSS Waiver: Waiver request form', notes = 'Yale Financial Aid Plan 100%; Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | Need-blind & no-loan for all students since 2008 | Aid form: CSS Profile

Полное финансирование: need-blind для всех стран мира, 100% demonstrated need без займов.

Официальная политика помощи: if you are admitted, Yale will meet 100 percent of your demonstrated financial need with a combination of tuition grants and term-time employment

Статистика CDS (fin aid): раунды подачи: #N/A.' WHERE slug = 'yale-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Çınarcık'), majors = COALESCE(NULLIF(majors, ''), 'Arts and Humanities, Environmental Science, Chemistry, Social Sciences, Materials Science, Energy') WHERE slug = 'yalova-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Istanbul'), majors = COALESCE(NULLIF(majors, ''), 'Dentistry, Agricultural and Biological Sciences, Engineering, Physics and Astronomy, Social Sciences, Biochemistry, Genetics and Molecular Biology') WHERE slug = 'yeditepe-niversitesi-turkey';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'New York, NY'), rate_num = COALESCE(rate_num, 63.8), acceptance_rate = COALESCE(NULLIF(acceptance_rate, ''), '63.8%'), sat = COALESCE(NULLIF(sat, ''), 'SAT 1320–1500 · ACT 28–33'), majors = COALESCE(NULLIF(majors, ''), 'Business & Management, Biological & Biomedical Sciences, Psychology, Economics & Social Sciences, Computer Science & IT'), notes = 'Иеши́ва-университе́т — одно из старейших и крупнейших еврейских высших учебных заведений и основной учебный центр ортодоксального иудаизма в США (Нью-Йорк).' WHERE slug = 'yeshiva-university-usa';
UPDATE public.universities SET city = COALESCE(NULLIF(city, ''), 'Daegu'), majors = COALESCE(NULLIF(majors, ''), 'Energy, Materials Science, Engineering, Environmental Science, Chemistry, Medicine'), notes = 'Йоннамский университет (кор. 영남대학교) — частный исследовательский университет, расположенный в городе Кёнсан, Корея. Предшественники университета, колледж Тэгу и колледж Чхонгу, были основаны в Тэгу в 1947 и 1950 соответственно.

GLOBAL KOREA SCHOLARSHIP | https://gksscholarship.com/ | Бакалавриат & Магистратура & PhD | Распространяется на 64 университетов Кореи | Получают 150 человек в год Авиаперелёт — билет эконом-класса туда и обратно Обучение — до $3365 за семестр (если стоимость выше, разницу покрывает Ежемесячная стипендия — примерно $740 – 1 110 в зависимости от про' WHERE slug = 'yeungnam-university-korea';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'n/a'), notes = 'Основан в 1995 году (Tin Wan).' WHERE slug = 'yew-chung-college-of-early-childhood-education-hong-kong';
UPDATE public.universities SET merit_scholarship_name = COALESCE(NULLIF(merit_scholarship_name, ''), 'President''s International Scholarship of Excellence (PISE, до ~45,000 CAD / 4 года)'), notes = 'Legible copy of official transcripts from your university studies or additional studies undertaken after completing your pre-university education.; Listed universities / scholarships (Canada) | https://future.utoronto.ca/pearson-scholarships | Бакалавриат Что покрывает: обучение, учебные материалы, проживание и прочие необходимые Квота на год: окол

Финансирование в Канаде (CAD): ~CAD 38,000–46,000 per year, ~CAD 2,500– 180,000 aid (automatic merit + entrance scholarships + need- based bursaries + President’s International Scholarship of Excellence + faculty awards), ~5%–100% coverage).' WHERE slug = 'york-university-canada';
UPDATE public.universities SET notes = 'Основан в 1998 году (Zayed).' WHERE slug = 'zayed-university-uae';
UPDATE public.universities SET majors = COALESCE(NULLIF(majors, ''), 'Computer Science, Medicine, Materials Science, Engineering, Biochemistry, Genetics and Molecular Biology, Agricultural and Biological Sciences') WHERE slug = 'zhejiang-university-china';
COMMIT;