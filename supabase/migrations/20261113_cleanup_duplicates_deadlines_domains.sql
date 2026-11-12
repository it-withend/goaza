-- 20261113_cleanup_duplicates_deadlines_domains.sql
-- 1. Backfill 233+ verified website_domains
-- 2. Merge & remove 136 duplicate university rows (MIT, RIT, Caltech, Brandeis, PARTIAL /, spilled cities, Turkish/English duplicates)
-- 3. Fix truncated tuition_display/tuition_num ($62 / год -> $62,000 / год) and unify country Korea -> South Korea
-- 4. Update outdated deadlines to the 2026/2027 admissions cycle and clear shifted IELTS scores

BEGIN;

UPDATE public.universities SET aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'a-r-i-brahim-e-en-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-03-15', regular_deadline = '2027-03-15' WHERE slug = 'aalborg-university-denmark';
UPDATE public.universities SET early_deadline = '2027-01-11', regular_deadline = '2027-01-18' WHERE slug = 'aalto-university-finland';
UPDATE public.universities SET early_deadline = '2027-10-01', regular_deadline = '2027-03-15' WHERE slug = 'aarhus-university-denmark';
UPDATE public.universities SET early_deadline = '2027-06-17', regular_deadline = '2027-08-26' WHERE slug = 'abu-dhabi-university-uae';
UPDATE public.universities SET early_deadline = '2027-07-12' WHERE slug = 'adam-mickiewicz-university-pozna-poland';
UPDATE public.universities SET tuition_display = '$62,000 / год', tuition_num = 62000 WHERE slug = 'adelphi-university-usa';
UPDATE public.universities SET early_deadline = '2027-07-06', regular_deadline = '2027-09-07' WHERE slug = 'agh-university-of-science-and-technology-poland';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-05-01' WHERE slug = 'agnes-scott-college-usa';
UPDATE public.universities SET website_domain = 'ahievran.edu.tr' WHERE slug = 'ahi-evran-niversitesi-turkey';
UPDATE public.universities SET country = 'South Korea', website_domain = 'ajou.ac.kr' WHERE slug = 'ajou-university-korea';
UPDATE public.universities SET tuition_display = '$62,000 / год', tuition_num = 62000 WHERE slug = 'albion-college-usa';
UPDATE public.universities SET tuition_display = '$51,000 / год', tuition_num = 51000 WHERE slug = 'alfred-university-usa';
UPDATE public.universities SET website_domain = 'allegheny.edu' WHERE slug = 'allegheny-college-usa';
UPDATE public.universities SET tuition_display = '$56,000 / год', tuition_num = 56000 WHERE slug = 'alma-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-09-07' WHERE slug = 'american-international-college-usa';
UPDATE public.universities SET early_deadline = '2027-06-24' WHERE slug = 'american-university-in-dubai-uae';
UPDATE public.universities SET early_deadline = '2027-06-24' WHERE slug = 'american-university-of-sharjah-uae';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'american-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-01' WHERE slug = 'amherst-college-usa';
UPDATE public.universities SET early_deadline = '2027-07-10', regular_deadline = '2027-07-11', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'anadolu-university-turkey';
UPDATE public.universities SET early_deadline = '2027-05-31' WHERE slug = 'anglo-american-university-czech-republic';
UPDATE public.universities SET early_deadline = '2027-04-01', regular_deadline = '2027-05-18', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'ankara-university-turkey';
UPDATE public.universities SET early_deadline = '2027-05-14', regular_deadline = '2027-01-18' WHERE slug = 'arcada-university-of-applied-sciences-finland';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = 'Rolling' WHERE slug = 'arcadia-university-usa';
UPDATE public.universities SET website_domain = 'archip.eu', early_deadline = '2027-05-31' WHERE slug = 'architectural-institute-in-prague-czech-republic';
UPDATE public.universities SET early_deadline = '2027-02-01', regular_deadline = '2027-05-01', undergrad_enrollment = '42,427', intl_undergrad_pct = '12.6%', intl_undergrad_count = '5328', total_aid_millions = '$9.7m', inst_type = 'Public / Research', sat = 'Rq. for scholarship', essay = 'Не требуется', countries_represented = '116', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'arizona-state-university-usa';
UPDATE public.universities SET early_deadline = '2027-08-01', regular_deadline = '2027-08-02', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'atilim-university-turkey';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-05-31', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'atat-rk-university-turkey';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000, early_deadline = '2027-01-05', regular_deadline = '2027-06-01' WHERE slug = 'auburn-university-usa';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000 WHERE slug = 'augustana-college-usa';
UPDATE public.universities SET regular_deadline = '2027-03-01' WHERE slug = 'austin-college-usa';
UPDATE public.universities SET early_deadline = '2027-03-10', regular_deadline = '2027-06-30' WHERE slug = 'australian-national-university-anu-australia';
UPDATE public.universities SET early_deadline = '2027-04-21', regular_deadline = NULL WHERE slug = 'autonomous-university-of-barcelona-uab-spain';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000 WHERE slug = 'azusa-pacific-university-usa';
UPDATE public.universities SET early_deadline = '2027-09-07', regular_deadline = '2027-09-08', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'baskent-university-turkey';
UPDATE public.universities SET tuition_display = '$72,000 / год', tuition_num = 72000, early_deadline = '2027-11-01', regular_deadline = '2027-01-02' WHERE slug = 'babson-college-usa';
UPDATE public.universities SET early_deadline = '2027-07-01', regular_deadline = '2027-07-01' WHERE slug = 'baltic-international-academy-latvia';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'bard-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'barnard-college-usa';
UPDATE public.universities SET city = 'New York, NY', tuition_display = '$33,283 / год', tuition_num = 33283, acceptance_rate = '39%', rate_num = 39, aid_max = '0.47', early_deadline = '2026-12-13', regular_deadline = '2027-02-01', lang = '6.5', undergrad_enrollment = '15,253', intl_undergrad_pct = '11.2%', intl_undergrad_count = '1708', avg_aid_award = 'No data', inst_type = 'Public / Comp.U', sat = 'Обязательно', essay = 'Не требуется', inst_tags = ARRAY['public']::text[], aid_types = ARRAY['Both']::text[] WHERE slug = 'cuny-baruch-college-usa';
UPDATE public.universities SET regular_deadline = '2027-01-10' WHERE slug = 'bates-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-02-01' WHERE slug = 'baylor-university-usa';
UPDATE public.universities SET website_domain = 'becker.edu', tuition_display = '$58,000 / год', tuition_num = 58000 WHERE slug = 'becker-college-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000 WHERE slug = 'belmont-university-usa';
UPDATE public.universities SET regular_deadline = 'Rolling', notes = 'Tier 3: LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: Institutional' WHERE slug = 'beloit-college-usa';
UPDATE public.universities SET early_deadline = '2026-12-01', regular_deadline = '2027-01-15' WHERE slug = 'bennington-college-usa';
UPDATE public.universities SET tuition_display = '$71,000 / год', tuition_num = 71000, early_deadline = '2026-11-15', regular_deadline = '2027-01-07' WHERE slug = 'bentley-university-usa';
UPDATE public.universities SET regular_deadline = '2027-04-30' WHERE slug = 'berea-college-usa';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'berlin-institute-of-technology-germany';
UPDATE public.universities SET early_deadline = '2027-07-18', regular_deadline = '2027-07-19' WHERE slug = 'bilkent-university-turkey';
UPDATE public.universities SET website_domain = 'bingol.edu.tr' WHERE slug = 'bing-l-niversitesi-turkey';
UPDATE public.universities SET tuition_display = '$59,000 / год', tuition_num = 59000 WHERE slug = 'biola-university-usa';
UPDATE public.universities SET website_domain = 'beu.edu.tr' WHERE slug = 'bitlis-eren-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-08-05', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'bo-azi-i-university-bosphorus-university-turkey';
UPDATE public.universities SET early_deadline = '2027-01-02', regular_deadline = 'Rolling' WHERE slug = 'boise-state-university-usa';
UPDATE public.universities SET tuition_display = '$76,000 / год', tuition_num = 76000, regular_deadline = '2027-01-01' WHERE slug = 'boston-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-04' WHERE slug = 'boston-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-05' WHERE slug = 'bowdoin-college-usa';
UPDATE public.universities SET website_domain = 'bozok.edu.tr' WHERE slug = 'bozok-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-03', notes = 'Tier 3: LIMITED NEED-BASED AID | Meaningful but partial international aid budget | Aid form: CSS Profile' WHERE slug = 'brandeis-university-usa';
UPDATE public.universities SET city = 'Provo, UT', acceptance_rate = '52.4%', rate_num = 52.4, early_deadline = '2027-11-01', regular_deadline = '2026-12-15', lang = 'TOEFL 80; IELTS 20x4 req., 102 avg.', undergrad_enrollment = '31,233', intl_undergrad_pct = '3.2%', intl_undergrad_count = '999', total_aid_millions = '$3.1m', intl_receiving_aid_pct = '54.0%', avg_aid_award = '$5,808', inst_type = 'Private / Research', sat = 'Обязательно', essay = 'Not req. Not used', coa_after_aid_pct = '25%', countries_represented = '92', intl_acceptance_rate = '43.6%', intl_yield = '82.1%', merit_scholarship_name = '150% of tuition Russel M. Nelson Scholarship', inst_tags = ARRAY['private', 'research']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'brigham-young-university-usa';
UPDATE public.universities SET website_domain = 'vutbr.cz', early_deadline = '2027-03-31' WHERE slug = 'brno-university-of-technology-czech-republic';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'brown-university-usa';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000 WHERE slug = 'bryant-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'bryn-mawr-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'bucknell-university-usa';
UPDATE public.universities SET early_deadline = '2027-05-30' WHERE slug = 'buda-university-hungary';
UPDATE public.universities SET website_domain = 'metropolitan.hu' WHERE slug = 'budapest-metropolitan-university-hungary';
UPDATE public.universities SET early_deadline = '2027-06-15' WHERE slug = 'budapest-university-of-technology-and-economics-hungary';
UPDATE public.universities SET country = 'South Korea', website_domain = 'bufs.ac.kr' WHERE slug = 'busan-university-of-foreign-studies-korea';
UPDATE public.universities SET name = 'Business & Hotel Management School', early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'business-amp-hotel-management-school-switzerland';
UPDATE public.universities SET tuition_display = '$62,000 / год', tuition_num = 62000 WHERE slug = 'butler-university-usa';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'c-sar-ritz-colleges-switzerland-switzerland';
UPDATE public.universities SET tuition_display = '$70,000 / год', tuition_num = 70000 WHERE slug = 'california-college-of-the-arts-usa';
UPDATE public.universities SET tuition_display = '$44,400 / год', tuition_num = 44400, early_deadline = '2027-11-01', regular_deadline = '2026-11-30', lang = 'TOEFL 80 107 avg. 6.5', undergrad_enrollment = '21,297', intl_undergrad_pct = '2.2%', intl_undergrad_count = '469', total_aid_millions = '$0.3m', intl_receiving_aid_pct = '5.6%', avg_aid_award = '$10,642', inst_type = 'Private / Research', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '24%', countries_represented = '65', intl_acceptance_rate = '33.3%', intl_yield = '27.2%', inst_tags = ARRAY['tech', 'private', 'research']::text[], aid_types = ARRAY['Need-based', 'Merit']::text[] WHERE slug = 'california-institute-of-technology-usa';
UPDATE public.universities SET city = 'U.-Pomona Pomona', inst_tags = ARRAY['tech']::text[] WHERE slug = 'california-state-poly-u-pomona-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'california-state-university-east-bay-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'california-state-university-fullerton-usa';
UPDATE public.universities SET city = 'Beach, CA', tuition_display = '$41,100 / год', tuition_num = 41100, acceptance_rate = '28.6%', rate_num = 28.6, regular_deadline = 'Rolling', lang = 'TOEFL 61', undergrad_enrollment = '31,351', intl_undergrad_pct = '6.6%', intl_undergrad_count = '2069', intl_receiving_aid_pct = 'No data', inst_type = 'Public / Comp.U', sat = 'Обязательно', essay = 'Not req. Not used', inst_tags = ARRAY['public']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'california-state-university-long-beach-usa';
UPDATE public.universities SET city = 'Angeles, CA', tuition_display = '$41,900 / год', tuition_num = 41900, acceptance_rate = '46.4%', rate_num = 46.4, regular_deadline = '2026-11-30', lang = 'TOEFL 61', undergrad_enrollment = '24,426', intl_undergrad_pct = '7.0%', intl_undergrad_count = '1710', total_aid_millions = '$0.5m', intl_receiving_aid_pct = '2.2%', avg_aid_award = '$14,270', inst_type = 'Public / Comp.U', sat = 'Обязательно', essay = 'Not req. Not used', coa_after_aid_pct = '34%', intl_acceptance_rate = '31.1%', intl_yield = '13.2%', inst_tags = ARRAY['public']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'california-state-university-los-angeles-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'california-state-university-northridge-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'california-state-university-sacramento-usa';
UPDATE public.universities SET regular_deadline = '2027-08-15' WHERE slug = 'calvin-college-usa';
UPDATE public.universities SET website_domain = 'fh-kaernten.at', early_deadline = '2027-09-28', regular_deadline = '2027-06-30' WHERE slug = 'carinthia-university-of-applied-sciences-austria';
UPDATE public.universities SET website_domain = 'cihe.edu.hk' WHERE slug = 'caritas-francis-hsu-college-hong-kong';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'carleton-college-usa';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'carnegie-mellon-university-in-qatar-qatar';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'carnegie-mellon-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'case-western-reserve-university-usa';
UPDATE public.universities SET website_domain = 'catholic.edu', tuition_display = '$67,000 / год', tuition_num = 67000 WHERE slug = 'catholic-university-usa';
UPDATE public.universities SET website_domain = 'cbu.edu.tr' WHERE slug = 'celal-bayar-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'centre-college-usa';
UPDATE public.universities SET early_deadline = '2027-06-18' WHERE slug = 'ceu-cardenal-herrera-university-spain';
UPDATE public.universities SET early_deadline = '2027-02-01', regular_deadline = '2027-02-01' WHERE slug = 'chalmers-university-of-technology-sweden';
UPDATE public.universities SET tuition_display = '$61,000 / год', tuition_num = 61000 WHERE slug = 'champlain-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'chapman-university-usa';
UPDATE public.universities SET website_domain = 'cuni.cz', early_deadline = '2027-04-30' WHERE slug = 'charles-university-czech-republic';
UPDATE public.universities SET regular_deadline = '2027-01-05' WHERE slug = 'chinese-university-of-hong-kong-hong-kong';
UPDATE public.universities SET country = 'South Korea', website_domain = 'chonnam.ac.kr' WHERE slug = 'chonnam-national-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'chosun.ac.kr' WHERE slug = 'chosun-university-korea';
UPDATE public.universities SET website_domain = 'chuhai.edu.hk' WHERE slug = 'chu-hai-college-of-higher-education-hong-kong';
UPDATE public.universities SET website_domain = 'cau.ac.kr', early_deadline = '2027-05-28' WHERE slug = 'chung-ang-university-south-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'chungbuk.ac.kr' WHERE slug = 'chungbuk-national-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'chungnam.ac.kr' WHERE slug = 'chungnam-national-university-korea';
UPDATE public.universities SET website_domain = 'cityu.edu.hk', regular_deadline = '2027-01-16' WHERE slug = 'city-university-of-hong-kong-hong-kong';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'claremont-mckenna-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'clark-university-usa';
UPDATE public.universities SET early_deadline = '2026-12-01', regular_deadline = '2027-01-15' WHERE slug = 'clarkson-university-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000, regular_deadline = '2027-05-01' WHERE slug = 'clemson-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-01' WHERE slug = 'colby-college-usa';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'colgate-university-usa';
UPDATE public.universities SET tuition_display = '$60,000 / год', tuition_num = 60000, regular_deadline = 'Rolling' WHERE slug = 'college-of-saint-benedict-usa';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000 WHERE slug = 'college-of-saint-scholastica-usa';
UPDATE public.universities SET city = 'Harbor, ME', early_deadline = '2026-12-01', regular_deadline = '2027-02-01', undergrad_enrollment = '349', intl_undergrad_pct = '21.5%', intl_undergrad_count = '75', total_aid_millions = '$3.4m', intl_receiving_aid_pct = '100%', avg_aid_award = '$45,689', sat = 'Cons.', essay = 'Не требуется', coa_after_aid_pct = '72%', countries_represented = '44', intl_acceptance_rate = '54.2%', intl_yield = '33.8%', inst_tags = ARRAY['private', 'liberal_arts']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'college-of-the-atlantic-usa';
UPDATE public.universities SET early_deadline = '2026-12-15', regular_deadline = '2027-01-15' WHERE slug = 'college-of-the-holy-cross-usa';
UPDATE public.universities SET early_deadline = '2027-03-01' WHERE slug = 'college-of-the-north-atlantic-qatar-qatar';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'college-of-william-and-mary-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-02-15', lang = 'TOEFL 80; IELTS 96 avg.', undergrad_enrollment = '1,980', intl_undergrad_pct = '12.8%', intl_undergrad_count = '253', total_aid_millions = '$7.7m', intl_receiving_aid_pct = '96.5%', avg_aid_award = '$31,303', sat = 'Cons.', essay = 'Не требуется', coa_after_aid_pct = '45%', countries_represented = '42', intl_acceptance_rate = '35.2%', intl_yield = '22.0%', aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'college-of-wooster-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'colorado-college-usa';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000, regular_deadline = '2027-08-01' WHERE slug = 'colorado-school-of-mines-usa';
UPDATE public.universities SET city = 'Collins, CO', inst_type = 'Public / Research', merit_scholarship_name = 'n/s Info', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'colorado-state-university-fort-collins-usa';
UPDATE public.universities SET aid_max = '$66,350', aid_num = 66350, early_deadline = '2027-11-01', regular_deadline = '2027-01-01', undergrad_enrollment = '6,231', intl_undergrad_pct = '15.6%', intl_undergrad_count = '972', total_aid_millions = '$17.1m', intl_receiving_aid_pct = '26.4%', avg_aid_award = '$66,350', coa_after_aid_pct = '82%', countries_represented = '151', intl_acceptance_rate = '4.8%', intl_yield = '67.1%' WHERE slug = 'columbia-university-usa';
UPDATE public.universities SET early_deadline = '2027-07-16', regular_deadline = NULL WHERE slug = 'complutense-university-of-madrid-ucm-spain';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'concordia-university-canada';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-01', intl_aid_policy = 'need-aware', how_apply_aid = 'CSS Profile + supplements' WHERE slug = 'connecticut-college-usa';
UPDATE public.universities SET tuition_display = '$67,000 / год', tuition_num = 67000 WHERE slug = 'cooper-union-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-03-15' WHERE slug = 'copenhagen-business-school-cbs-denmark';
UPDATE public.universities SET website_domain = 'kea.dk', early_deadline = '2027-03-15', regular_deadline = '2027-03-15' WHERE slug = 'copenhagen-school-of-design-and-technology-denmark';
UPDATE public.universities SET website_domain = 'cornellcollege.edu', tuition_display = '$60,000 / год', tuition_num = 60000 WHERE slug = 'cornell-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-02' WHERE slug = 'cornell-university-usa';
UPDATE public.universities SET early_deadline = '2027-06-15' WHERE slug = 'corvinus-university-of-budapest-hungary';
UPDATE public.universities SET website_domain = 'pk.edu.pl', early_deadline = '2027-07-31' WHERE slug = 'cracow-university-of-technology-poland';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000, regular_deadline = '2027-02-15' WHERE slug = 'creighton-university-usa';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'culinary-arts-academy-switzerland';
UPDATE public.universities SET regular_deadline = '2027-02-01' WHERE slug = 'cuny-brooklyn-college-usa';
UPDATE public.universities SET website_domain = 'ccny.cuny.edu', regular_deadline = '2027-01-15' WHERE slug = 'cuny-city-college-usa';
UPDATE public.universities SET regular_deadline = '2027-05-01' WHERE slug = 'cuny-lehman-college-usa';
UPDATE public.universities SET early_deadline = '2027-02-05' WHERE slug = 'curtin-university-australia';
UPDATE public.universities SET name = 'Cyprus International University', city = 'Northern Nicosia', website_domain = 'ciu.edu.tr' WHERE slug = 'cyprys-international-university-turkish-republic-of-northern-cyprus';
UPDATE public.universities SET early_deadline = '2027-03-31' WHERE slug = 'czech-agricultural-university-czech-republic';
UPDATE public.universities SET website_domain = 'cvut.cz', early_deadline = '2027-03-31' WHERE slug = 'czech-technical-university-in-prague-czech-republic';
UPDATE public.universities SET country = 'South Korea', website_domain = 'cu.ac.kr' WHERE slug = 'daegu-catholic-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'daegu.ac.kr' WHERE slug = 'daegu-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'dju.ac.kr' WHERE slug = 'daejeon-university-korea';
UPDATE public.universities SET early_deadline = '2027-04-30' WHERE slug = 'dalhousie-university-canada';
UPDATE public.universities SET country = 'South Korea', website_domain = 'dankook.ac.kr' WHERE slug = 'dankook-university-korea';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'dartmouth-college-usa';
UPDATE public.universities SET tuition_display = '€400–€3,000 / год', tuition_num = 3000, early_deadline = '2027-07-01', regular_deadline = '2027-07-01' WHERE slug = 'daugavpils-university-latvia';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-02' WHERE slug = 'davidson-college-usa';
UPDATE public.universities SET early_deadline = '2027-06-18', regular_deadline = '2027-10-22' WHERE slug = 'deakin-university-australia';
UPDATE public.universities SET early_deadline = '2027-04-01', regular_deadline = '2027-04-01' WHERE slug = 'delft-university-of-technology-netherlands';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'denison-university-usa';
UPDATE public.universities SET tuition_display = '$59,000 / год', tuition_num = 59000, regular_deadline = '2027-02-01' WHERE slug = 'depaul-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-01' WHERE slug = 'depauw-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'dickinson-college-usa';
UPDATE public.universities SET website_domain = 'deu.edu.tr', early_deadline = '2027-07-30', regular_deadline = '2027-08-09', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'dokuz-eyl-l-university-turkey';
UPDATE public.universities SET country = 'South Korea', website_domain = 'donga.ac.kr' WHERE slug = 'dong-a-university-korea';
UPDATE public.universities SET website_domain = 'dongguk.ac.kr' WHERE slug = 'dongguk-university-south-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'dongseo.ac.kr' WHERE slug = 'dongseo-university-korea';
UPDATE public.universities SET tuition_display = '$58,000 / год', tuition_num = 58000, early_deadline = '2027-11-01', regular_deadline = 'Rolling' WHERE slug = 'drake-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'drexel-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-03' WHERE slug = 'duke-university-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'duksung.ac.kr' WHERE slug = 'duksung-women-s-university-korea';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000 WHERE slug = 'duquesne-university-usa';
UPDATE public.universities SET city = 'Budapest', early_deadline = '2027-03-15' WHERE slug = 'e-tv-s-lor-nd-university-hungary';
UPDATE public.universities SET early_deadline = '2026-12-01', regular_deadline = '2027-02-15' WHERE slug = 'earlham-college-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = 'Rolling' WHERE slug = 'eastern-michigan-university-usa';
UPDATE public.universities SET aid_max = 'Deutschlandstipendium', early_deadline = '2027-09-30', regular_deadline = '2027-07-15', essay = 'only motivation letter' WHERE slug = 'university-of-t-bingen-germany';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000, regular_deadline = 'Rolling' WHERE slug = 'eckerd-college-usa';
UPDATE public.universities SET website_domain = 'elon.edu', early_deadline = '2027-11-10', regular_deadline = '2027-01-10' WHERE slug = 'elon-university-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000 WHERE slug = 'embry-riddle-aeronautical-u-daytona-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000 WHERE slug = 'embry-riddle-aeronautical-u-prescott-usa';
UPDATE public.universities SET tuition_display = '$72,000 / год', tuition_num = 72000 WHERE slug = 'emerson-college-usa';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000 WHERE slug = 'emory-and-henry-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'emory-university-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'erasmus-university-rotterdam-netherlands';
UPDATE public.universities SET regular_deadline = NULL WHERE slug = 'esade-ramon-llull-university-spain';
UPDATE public.universities SET website_domain = 'esdi.es', early_deadline = '2027-04-30' WHERE slug = 'esdi-higher-school-of-design-spain';
UPDATE public.universities SET early_deadline = '2027-07-15', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'eszterh-zy-k-roly-university-hungary';
UPDATE public.universities SET website_domain = 'newschool.edu', tuition_display = '$73,000 / год', tuition_num = 73000 WHERE slug = 'eugene-lang-college-the-new-school-usa';
UPDATE public.universities SET early_deadline = '2027-10-31' WHERE slug = 'ewha-womans-university-south-korea';
UPDATE public.universities SET website_domain = 'firat.edu.tr', early_deadline = '2027-03-01', regular_deadline = '2027-07-07', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'firat-university-turkey';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'fachhochschule-wiener-neustadt-austria';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'fairfield-university-usa';
UPDATE public.universities SET tuition_display = '$63,000 / год', tuition_num = 63000 WHERE slug = 'fairleigh-dickinson-university-usa';
UPDATE public.universities SET website_domain = 'fitnyc.edu' WHERE slug = 'fashion-institute-of-technology-usa';
UPDATE public.universities SET website_domain = 'fau.de', early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'fau-erlangen-n-rnberg-germany';
UPDATE public.universities SET early_deadline = '2027-03-31', regular_deadline = '2027-03-31' WHERE slug = 'fh-campus-wien-austria';
UPDATE public.universities SET city = 'of Technology Melbourne, FL', tuition_display = '$64,900 / год', tuition_num = 64900, acceptance_rate = '63.5%', rate_num = 63.5, regular_deadline = 'Rolling', undergrad_enrollment = '3,635', intl_undergrad_pct = '29.7%', intl_undergrad_count = '1080', total_aid_millions = '$13.4m', intl_receiving_aid_pct = '67.5%', avg_aid_award = '$18,321', inst_type = 'Private / Research', sat = 'Rec. for int''l', essay = 'Not req. Req. for some', coa_after_aid_pct = '28%', countries_represented = '111', intl_acceptance_rate = '75.0%', intl_yield = '6.8%', merit_scholarship_name = '$10,000 Panther Fund Merit ScholarshipInfo', inst_tags = ARRAY['tech', 'private', 'research']::text[] WHERE slug = 'florida-institute-of-technology-usa';
UPDATE public.universities SET early_deadline = '2027-05-01', regular_deadline = 'Rolling' WHERE slug = 'florida-international-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-07' WHERE slug = 'florida-state-university-usa';
UPDATE public.universities SET website_domain = 'fontbonne.edu' WHERE slug = 'fontbonne-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'fordham-university-usa';
UPDATE public.universities SET tuition_display = '$76,000 / год', tuition_num = 76000 WHERE slug = 'franklin-marshall-college-usa';
UPDATE public.universities SET city = 'of Engineering Needham, MA', website_domain = 'olin.edu', tuition_display = '$78,200 / год', tuition_num = 78200, acceptance_rate = '13.4%', rate_num = 13.4, regular_deadline = '2027-01-01', lang = 'IELTS 100 rec.', undergrad_enrollment = '380', intl_undergrad_pct = '10.0%', intl_undergrad_count = '38', total_aid_millions = '$0.7m', intl_receiving_aid_pct = '73.7%', avg_aid_award = '$25,533', inst_type = 'Private / LAC', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '33%', countries_represented = '11', intl_acceptance_rate = '10.8%', intl_yield = '66.7%', inst_tags = ARRAY['tech', 'liberal_arts', 'private']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'olin-college-of-engineering-usa';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'free-university-of-berlin-germany';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'friedrich-schiller-universit-t-jena-germany';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'furman-university-usa';
UPDATE public.universities SET tuition_display = '$50,000 / год', tuition_num = 50000 WHERE slug = 'gannon-university-usa';
UPDATE public.universities SET website_domain = 'gantep.edu.tr' WHERE slug = 'gaziantep-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-05-29' WHERE slug = 'gdynia-maritime-university-poland';
UPDATE public.universities SET name = 'Gebze Technical University' WHERE slug = 'gebze-y-ksek-teknoloji-enstit-s-giresun-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-05-30', regular_deadline = '2027-05-30' WHERE slug = 'geneva-business-school-switzerland';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000, regular_deadline = '2027-01-15' WHERE slug = 'george-mason-university-usa';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'georgetown-university-in-qatar-qatar';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-10' WHERE slug = 'georgetown-university-usa';
UPDATE public.universities SET city = 'of Technology Atlanta, GA', tuition_display = '$54,500 / год', tuition_num = 54500, acceptance_rate = '23.4%', rate_num = 23.4, regular_deadline = '2027-01-01', undergrad_enrollment = '15,573', intl_undergrad_pct = '9.0%', intl_undergrad_count = '1403', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Рекомендуется', inst_tags = ARRAY['tech', 'public', 'research']::text[], aid_types = ARRAY['Jobs']::text[] WHERE slug = 'georgia-institute-of-technology-usa';
UPDATE public.universities SET early_deadline = '2027-10-01' WHERE slug = 'georgia-state-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'gettysburg-college-usa';
UPDATE public.universities SET city = 'Гент', website_domain = 'ugent.be', acceptance_rate = '32%', rate_num = 32, full_grant = TRUE, aid_max = 'Full Ride', early_deadline = '2027-04-01', regular_deadline = '2027-04-01', lang = 'TOEFL 79 (min. subscores 20), IELTS 6.5 (min. subscores 6)', sat = 'По желанию', essay = 'Personal Statement', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'ghent-university-belgium';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'goethe-university-frankfurt-germany';
UPDATE public.universities SET tuition_display = '$62,000 / год', tuition_num = 62000 WHERE slug = 'gonzaga-university-usa';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000 WHERE slug = 'gordon-college-usa';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000 WHERE slug = 'goucher-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-04' WHERE slug = 'gratia-christian-college-hong-kong';
UPDATE public.universities SET early_deadline = '2027-05-30' WHERE slug = 'griffith-university-australia';
UPDATE public.universities SET regular_deadline = '2027-01-15', intl_aid_policy = 'need-aware' WHERE slug = 'grinnell-college-usa';
UPDATE public.universities SET tuition_display = '$59,000 / год', tuition_num = 59000 WHERE slug = 'gustavus-adolphus-college-usa';
UPDATE public.universities SET website_domain = 'gist.ac.kr', early_deadline = '2027-03-28' WHERE slug = 'gwangju-institute-of-science-and-technology-south-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'gknu.ac.kr' WHERE slug = 'gyeongkuk-national-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'gnu.ac.kr' WHERE slug = 'gyeongsang-national-university-korea';
UPDATE public.universities SET early_deadline = '2027-01-27', regular_deadline = '2027-01-18' WHERE slug = 'haaga-helia-university-of-applied-sciences-finland';
UPDATE public.universities SET early_deadline = '2027-09-22', regular_deadline = '2027-09-25', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'hacettepe-university-turkey';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'hamad-bin-khalifa-university-qatar';
UPDATE public.universities SET early_deadline = '2026-12-31', regular_deadline = '2027-01-18' WHERE slug = 'hame-university-of-applied-sciences-finland';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-01' WHERE slug = 'hamilton-college-usa';
UPDATE public.universities SET country = 'South Korea', city = 'Seoul', website_domain = 'hufs.ac.kr', tuition_display = 'KRW 12,366 / год', tuition_num = 12366, acceptance_rate = '44%', rate_num = 44, early_deadline = '2027-05-28', lang = 'IELTS 5.5 TOEFL 80', majors = 'Social Sciences & Law', sat = 'По желанию', essay = 'Self-Introduction & Study plan' WHERE slug = 'hankuk-university-of-foreign-studies-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'hannam.ac.kr' WHERE slug = 'hannam-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'hansung.ac.kr' WHERE slug = 'hansung-university-korea';
UPDATE public.universities SET website_domain = 'hanyang.ac.kr', early_deadline = '2027-04-01', regular_deadline = '2027-09-01' WHERE slug = 'hanyang-university-south-korea';
UPDATE public.universities SET tuition_display = '$61,000 / год', tuition_num = 61000, early_deadline = '2027-11-01', regular_deadline = 'Rolling' WHERE slug = 'hartwick-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'harvard-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-05' WHERE slug = 'harvey-mudd-college-usa';
UPDATE public.universities SET website_domain = 'haverford.edu', early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'haverford-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'heidelberg-university-germany';
UPDATE public.universities SET regular_deadline = '2027-06-01', notes = 'Tier 3: LIMITED NEED-BASED AID | Merit criteria attached (3.6 GPA / 1230+ SAT) | Aid form: Institutional' WHERE slug = 'hendrix-college-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000 WHERE slug = 'high-point-university-usa';
UPDATE public.universities SET early_deadline = '2027-06-10' WHERE slug = 'higher-colleges-of-technology-uae';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'hiroshima-university-japan';
UPDATE public.universities SET website_domain = 'hkct.edu.hk', early_deadline = '2027-01-28' WHERE slug = 'hkct-hong-kong-college-of-technology-hong-kong';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-02-01' WHERE slug = 'hobart-and-william-smith-colleges-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000, regular_deadline = 'Rolling' WHERE slug = 'hofstra-university-usa';
UPDATE public.universities SET early_deadline = '2027-01-08' WHERE slug = 'hokkaido-university-japan';
UPDATE public.universities SET regular_deadline = '2027-01-31' WHERE slug = 'hong-kong-baptist-university-hong-kong';
UPDATE public.universities SET website_domain = 'nangyan.edu.hk', early_deadline = '2027-01-12' WHERE slug = 'hong-kong-nang-yan-college-of-higher-education-hong-kong';
UPDATE public.universities SET regular_deadline = '2027-02-07' WHERE slug = 'hong-kong-polytechnic-university-hong-kong';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'hong-kong-shue-yan-university-hong-kong';
UPDATE public.universities SET city = 'Clear Water Bay', tuition_display = '$1,840–$3,250 / год', tuition_num = 3250, acceptance_rate = '35%', rate_num = 35, aid_max = '$650', aid_num = 650, early_deadline = '2026-11-20', regular_deadline = '2027-01-08', lang = '6.0', majors = 'Ranked 164th in the world for arts and humanities, 17th for engineering & technology, 330th for life sciences & medicine. HKUST for social sciences & management, at 29th to HKUST’s 24th', sat = '1430-1500', essay = 'Обязательно', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'hong-kong-university-of-science-and-technology-hong-kong';
UPDATE public.universities SET country = 'South Korea', website_domain = 'hongik.ac.kr' WHERE slug = 'hongik-university-korea';
UPDATE public.universities SET tuition_display = '$58,000 / год', tuition_num = 58000 WHERE slug = 'hood-college-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'hoseo.ac.kr' WHERE slug = 'hoseo-university-korea';
UPDATE public.universities SET website_domain = 'hu-berlin.de', early_deadline = '2027-09-15', regular_deadline = '2027-03-16' WHERE slug = 'humboldt-university-of-berlin-germany';
UPDATE public.universities SET website_domain = 'mtf.hu' WHERE slug = 'hungarian-dance-university-hungary';
UPDATE public.universities SET website_domain = 'uni-mate.hu' WHERE slug = 'hungarian-university-of-agriculture-and-life-science-hungary';
UPDATE public.universities SET website_domain = 'mke.hu' WHERE slug = 'hungarian-university-of-fine-arts-hungary';
UPDATE public.universities SET website_domain = 'tf.hu' WHERE slug = 'hungarian-university-of-sports-science-hungary';
UPDATE public.universities SET website_domain = 'inonu.edu.tr' WHERE slug = 'i-n-n-niversitesi-turkey';
UPDATE public.universities SET website_domain = 'aydin.edu.tr' WHERE slug = 'i-stanbul-ayd-n-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-06-01', regular_deadline = '2027-06-26', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'istanbul-technical-university-turkey';
UPDATE public.universities SET regular_deadline = NULL WHERE slug = 'ie-university-spain';
UPDATE public.universities SET early_deadline = '2027-06-12', regular_deadline = '2027-06-12' WHERE slug = 'ifm-business-school-switzerland';
UPDATE public.universities SET city = 'of Technology Chicago, IL', website_domain = 'iit.edu', tuition_display = '$68,900 / год', tuition_num = 68900, acceptance_rate = '54.1%', rate_num = 54.1, early_deadline = '2026-12-01', regular_deadline = '2027-08-01', lang = 'TOEFL 90; IELTS 96 avg.', undergrad_enrollment = '2,900', intl_undergrad_pct = '20.8%', intl_undergrad_count = '602', total_aid_millions = '$13.2m', intl_receiving_aid_pct = '98.7%', avg_aid_award = '$22,237', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Not req. Cons.', coa_after_aid_pct = '32%', countries_represented = '79', merit_scholarship_name = '$15,000 Outstanding Scholar Award Info', inst_tags = ARRAY['tech', 'public', 'research']::text[] WHERE slug = 'illinois-institute-of-technology-usa';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000 WHERE slug = 'illinois-wesleyan-university-usa';
UPDATE public.universities SET website_domain = 'imc.ac.at', early_deadline = '2027-03-31', regular_deadline = '2027-03-31' WHERE slug = 'imc-university-of-applied-sciences-krems-austria';
UPDATE public.universities SET country = 'South Korea', website_domain = 'inu.ac.kr' WHERE slug = 'incheon-national-university-korea';
UPDATE public.universities SET city = 'U.-Indianapolis Indianapolis', website_domain = 'iu.edu' WHERE slug = 'indiana-u-purdue-u-indianapolis-usa';
UPDATE public.universities SET tuition_display = '$51,000 / год', tuition_num = 51000, early_deadline = '2027-11-01', regular_deadline = 'Rolling', majors = 'Business (Kelley School), Informatics & Computer Science, Music (Jacobs School), Public Affairs', aid_types = ARRAY['Need-based', 'Merit', 'Full funding']::text[] WHERE slug = 'indiana-university-bloomington-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'inha.ac.kr' WHERE slug = 'inha-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'inje.ac.kr' WHERE slug = 'inje-university-korea';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'iowa-state-university-usa';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'ist-austria-austria';
UPDATE public.universities SET website_domain = 'bilgi.edu.tr', early_deadline = '2027-05-16', regular_deadline = '2027-05-17' WHERE slug = 'istanbul-bilgi-university-turkey';
UPDATE public.universities SET website_domain = 'iku.edu.tr', early_deadline = '2027-01-04', regular_deadline = '2027-08-23' WHERE slug = 'istanbul-culture-university-turkey';
UPDATE public.universities SET website_domain = 'medipol.edu.tr', early_deadline = '2027-08-01', regular_deadline = '2027-08-02' WHERE slug = 'istanbul-medipol-university-turkey';
UPDATE public.universities SET regular_deadline = NULL WHERE slug = 'istituto-europeo-di-design-spain';
UPDATE public.universities SET early_deadline = '2027-05-15', regular_deadline = '2027-05-15' WHERE slug = 'istituto-marangoni-milan-italy';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-01', notes = 'Tier 3: LIMITED NEED-BASED AID | Partial need-based aid for internationals | Aid form: CSS Profile' WHERE slug = 'ithaca-college-usa';
UPDATE public.universities SET website_domain = 'uj.edu.pl' WHERE slug = 'jagiellonian-university-poland';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'james-madison-university-usa';
UPDATE public.universities SET early_deadline = '2027-01-20', regular_deadline = '2027-01-25' WHERE slug = 'jamk-university-of-applied-sciences-finland';
UPDATE public.universities SET country = 'South Korea', website_domain = 'jejunu.ac.kr' WHERE slug = 'jeju-national-university-korea';
UPDATE public.universities SET website_domain = 'jbnu.ac.kr', early_deadline = '2027-04-01', regular_deadline = '2027-10-01' WHERE slug = 'jeonbuk-national-university-south-korea';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'jku-linz-austria';
UPDATE public.universities SET website_domain = 'uni-neumann.hu' WHERE slug = 'john-von-neumann-university-hungary';
UPDATE public.universities SET website_domain = 'wjlf.hu' WHERE slug = 'john-wesley-theological-college-hungary';
UPDATE public.universities SET website_domain = 'jhu.edu', early_deadline = '2027-11-01', regular_deadline = '2027-01-03' WHERE slug = 'johns-hopkins-university-usa';
UPDATE public.universities SET website_domain = 'juilliard.edu', tuition_display = '$69,000 / год', tuition_num = 69000 WHERE slug = 'juilliard-school-usa';
UPDATE public.universities SET tuition_display = '$62,000 / год', tuition_num = 62000 WHERE slug = 'juniata-college-usa';
UPDATE public.universities SET website_domain = 'kre.hu', early_deadline = '2027-05-31', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'k-roli-g-sp-r-university-of-the-reformed-church-hungary';
UPDATE public.universities SET early_deadline = '2027-09-30', regular_deadline = '2027-09-31', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'kadir-has-university-turkey';
UPDATE public.universities SET aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'kafkas-niversitesi-turkey';
UPDATE public.universities SET aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'kahramanmara-s-t-i-mam-niversitesi-turkey';
UPDATE public.universities SET website_domain = 'kaist.ac.kr', aid_num = 3365, early_deadline = '2027-10-21', regular_deadline = '2027-01-13' WHERE slug = 'kaist-south-korea';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'kalamazoo-college-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'kangwon.ac.kr' WHERE slug = 'kangwon-national-university-korea';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = 'Rolling' WHERE slug = 'kansas-state-university-usa';
UPDATE public.universities SET website_domain = 'uni-mate.hu', early_deadline = '2027-06-10' WHERE slug = 'kaposv-r-university-hungary';
UPDATE public.universities SET website_domain = 'karabuk.edu.tr' WHERE slug = 'karab-k-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'karelia-university-of-applied-sciences-finland';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'karlsruhe-institute-of-technology-germany';
UPDATE public.universities SET early_deadline = '2027-10-15', regular_deadline = '2027-01-15' WHERE slug = 'karlstad-university-sweden';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'karolinska-institute-sweden';
UPDATE public.universities SET country = 'South Korea', website_domain = 'keimyung.ac.kr' WHERE slug = 'keimyung-university-korea';
UPDATE public.universities SET website_domain = 'keio.ac.jp' WHERE slug = 'keio-university-japan';
UPDATE public.universities SET regular_deadline = '2027-04-01' WHERE slug = 'kennesaw-state-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'kenyon-college-usa';
UPDATE public.universities SET tuition_display = '$58,000 / год', tuition_num = 58000, regular_deadline = 'Rolling' WHERE slug = 'kettering-university-usa';
UPDATE public.universities SET tuition_display = '$50,000 / год', tuition_num = 50000 WHERE slug = 'keuka-college-usa';
UPDATE public.universities SET website_domain = 'ku.ac.ae', early_deadline = '2026-11-26' WHERE slug = 'khalifa-university-uae';
UPDATE public.universities SET website_domain = 'aau.at', early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'klagenfurt-university-austria';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = 'Rolling', notes = 'Tier 3: LIMITED NEED-BASED AID | (2024-25) | Aid form: CSS Profile / Institutional' WHERE slug = 'knox-college-usa';
UPDATE public.universities SET early_deadline = '2027-09-07', regular_deadline = '2027-09-23', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'ko-university-turkey';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'kobe-university-japan';
UPDATE public.universities SET website_domain = 'kocaeli.edu.tr' WHERE slug = 'kocaeli-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-06-15' WHERE slug = 'kodol-nyi-j-nos-university-hungary';
UPDATE public.universities SET country = 'South Korea', website_domain = 'kongju.ac.kr' WHERE slug = 'kongju-national-university-korea';
UPDATE public.universities SET website_domain = 'konkuk.ac.kr', early_deadline = '2027-11-01', regular_deadline = '2027-05-01' WHERE slug = 'konkuk-university-south-korea';
UPDATE public.universities SET name = 'Konya Necmettin Erbakan Üniversitesi' WHERE slug = 'konya-necmettin-erbakan-nversitesi-turkey';
UPDATE public.universities SET country = 'South Korea', website_domain = 'konyang.ac.kr' WHERE slug = 'konyang-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'kookmin.ac.kr' WHERE slug = 'kookmin-university-korea';
UPDATE public.universities SET website_domain = 'korea.ac.kr', early_deadline = '2027-03-19' WHERE slug = 'korea-university-south-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'koreatech.ac.kr' WHERE slug = 'koreatech-korea-university-of-technology-and-education-korea';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'kth-royal-institute-of-technology-sweden';
UPDATE public.universities SET website_domain = 'kuleuven.be', early_deadline = '2027-03-01', regular_deadline = '2027-03-01' WHERE slug = 'ku-leuven-belgium';
UPDATE public.universities SET country = 'South Korea', website_domain = 'kunsan.ac.kr' WHERE slug = 'kunsan-national-university-korea';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'kyoto-university-japan';
UPDATE public.universities SET website_domain = 'khu.ac.kr', early_deadline = '2027-03-19' WHERE slug = 'kyung-hee-university-south-korea';
UPDATE public.universities SET website_domain = 'kyungpook.ac.kr', early_deadline = '2027-11-01', regular_deadline = '2027-04-01' WHERE slug = 'kyungpook-national-university-south-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'kyungsung.ac.kr' WHERE slug = 'kyungsung-university-korea';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'kyushu-university-japan';
UPDATE public.universities SET early_deadline = '2027-09-15', regular_deadline = '2027-01-18' WHERE slug = 'lab-university-of-applied-sciences-finland';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'lafayette-college-usa';
UPDATE public.universities SET website_domain = 'lbtu.lv', early_deadline = '2027-07-01', regular_deadline = '2027-07-01' WHERE slug = 'latvia-university-of-agriculture-jelgava-latvia';
UPDATE public.universities SET early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'laurea-university-of-applied-sciences-finland';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000 WHERE slug = 'lawrence-technological-university-usa';
UPDATE public.universities SET early_deadline = '2027-10-31', regular_deadline = '2027-01-15' WHERE slug = 'lawrence-university-usa';
UPDATE public.universities SET website_domain = 'lcibarcelona.com', early_deadline = '2027-06-19' WHERE slug = 'lci-barcelona-spain';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-01', notes = 'Tier 3: LIMITED NEED-BASED AID | Strong engineering programs | Aid form: CSS Profile' WHERE slug = 'lehigh-university-usa';
UPDATE public.universities SET website_domain = 'universiteitleiden.nl', early_deadline = '2027-01-15', regular_deadline = '2027-05-01' WHERE slug = 'leiden-university-netherlands';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'les-roches-switzerland';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'lewis-clark-college-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'lindenwood-university-usa';
UPDATE public.universities SET website_domain = 'lindsey.edu' WHERE slug = 'lindsey-wilson-college-usa';
UPDATE public.universities SET tuition_display = '$59,000 / год', tuition_num = 59000 WHERE slug = 'linfield-college-usa';
UPDATE public.universities SET regular_deadline = '2027-05-17' WHERE slug = 'lingnan-university-hong-kong';
UPDATE public.universities SET early_deadline = '2027-10-15', regular_deadline = '2027-01-15' WHERE slug = 'link-ping-university-sweden';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'lmu-munich-germany';
UPDATE public.universities SET website_domain = 'p.lodz.pl', early_deadline = '2027-07-13' WHERE slug = 'lodz-university-of-technology-poland';
UPDATE public.universities SET early_deadline = '2027-04-15' WHERE slug = 'long-island-university-liu-brooklyn-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'long-island-university-liu-post-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'loyola-marymount-university-usa';
UPDATE public.universities SET city = 'Chicago, IL', tuition_display = '$67,200 / год', tuition_num = 67200, acceptance_rate = '70.6%', rate_num = 70.6, early_deadline = '2026-12-01', regular_deadline = 'Rolling', lang = 'TOEFL 79; IELTS 91 avg.', undergrad_enrollment = '11,420', intl_undergrad_pct = '5.3%', intl_undergrad_count = '605', total_aid_millions = '$7.2m', intl_receiving_aid_pct = '72.4%', avg_aid_award = '$16,365', inst_type = 'Private / Research', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '24%', countries_represented = '80', inst_tags = ARRAY['private', 'research']::text[] WHERE slug = 'loyola-university-chicago-usa';
UPDATE public.universities SET tuition_display = '$68,000 / год', tuition_num = 68000 WHERE slug = 'loyola-university-maryland-usa';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000 WHERE slug = 'loyola-university-new-orleans-usa';
UPDATE public.universities SET website_domain = 'uni-nke.hu' WHERE slug = 'ludovika-university-of-public-service-hungary';
UPDATE public.universities SET early_deadline = '2027-05-22', regular_deadline = '2027-05-22' WHERE slug = 'luiss-italy';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'lund-university-sweden';
UPDATE public.universities SET early_deadline = '2027-05-31', regular_deadline = '2027-01-18' WHERE slug = 'lut-university-finland';
UPDATE public.universities SET tuition_display = '$58,000 / год', tuition_num = 58000, regular_deadline = 'Rolling' WHERE slug = 'luther-college-usa';
UPDATE public.universities SET tuition_display = '$58,000 / год', tuition_num = 58000 WHERE slug = 'lynn-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'macalester-college-usa';
UPDATE public.universities SET early_deadline = '2027-03-31', regular_deadline = '2027-09-15' WHERE slug = 'macquarie-university-australia';
UPDATE public.universities SET website_domain = 'marbelladesignacademy.com', early_deadline = '2027-01-10', regular_deadline = NULL WHERE slug = 'marbella-design-academy-spain';
UPDATE public.universities SET name = 'Mardin Artuklu Üniversitesi' WHERE slug = 'mardin-artuklu-nversitesi-turkey';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-02-01' WHERE slug = 'marist-college-usa';
UPDATE public.universities SET tuition_display = '$60,000 / год', tuition_num = 60000, early_deadline = '2026-11-15', regular_deadline = '2026-12-01' WHERE slug = 'marquette-university-usa';
UPDATE public.universities SET tuition_display = '$67,000 / год', tuition_num = 67000 WHERE slug = 'maryland-institute-college-of-art-usa';
UPDATE public.universities SET early_deadline = '2027-04-30' WHERE slug = 'masaryk-university-in-brno-czech-republic';
UPDATE public.universities SET aid_max = 'Full Ride; $56,840', aid_num = 56840, early_deadline = '2027-11-01', regular_deadline = '2027-01-05', undergrad_enrollment = '4,547', intl_undergrad_pct = '10.3%', intl_undergrad_count = '468', total_aid_millions = '$20.2m', intl_receiving_aid_pct = '75.7%', avg_aid_award = '$56,840', inst_type = 'Private / Research', coa_after_aid_pct = '76%', countries_represented = '106', inst_tags = ARRAY['tech', 'private', 'research']::text[], aid_types = ARRAY['Need-based', 'Full funding']::text[] WHERE slug = 'massachusetts-institute-of-technology-usa';
UPDATE public.universities SET early_deadline = '2027-01-15' WHERE slug = 'mcgill-university-canada';
UPDATE public.universities SET early_deadline = '2027-03-19' WHERE slug = 'mcmaster-university-canada';
UPDATE public.universities SET website_domain = 'medunigraz.at', early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'medical-university-of-graz-austria';
UPDATE public.universities SET city = 'Vienna', website_domain = 'meduniwien.ac.at', early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'medical-university-of-vienna-austria';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'meiji-university-japan';
UPDATE public.universities SET website_domain = 'mun.ca' WHERE slug = 'memorial-university-of-newfoundland-mun-canada';
UPDATE public.universities SET early_deadline = '2027-09-10' WHERE slug = 'mendel-university-in-brno-czech-republic';
UPDATE public.universities SET tuition_display = '$54,000 / год', tuition_num = 54000 WHERE slug = 'mercer-university-usa';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000 WHERE slug = 'meredith-college-usa';
UPDATE public.universities SET early_deadline = '2027-05-05', regular_deadline = '2027-01-18' WHERE slug = 'metropolia-university-of-applied-sciences-finland';
UPDATE public.universities SET website_domain = 'mup.cz', early_deadline = '2027-07-31' WHERE slug = 'metropolitan-university-in-prague-czech-republic';
UPDATE public.universities SET city = 'Oxford, OH', tuition_display = '$57,400 / год', tuition_num = 57400, acceptance_rate = '68.2%', rate_num = 68.2, regular_deadline = '2027-02-01', lang = 'TOEFL 80; IELTS 89 avg.', undergrad_enrollment = '17,147', intl_undergrad_pct = '14.8%', intl_undergrad_count = '2543', total_aid_millions = '$5.8m', intl_receiving_aid_pct = '16.7%', avg_aid_award = '$13,655', inst_type = 'Public / Research', coa_after_aid_pct = '24%', countries_represented = '59', merit_scholarship_name = 'Full tuition', inst_tags = ARRAY['public', 'research']::text[], aid_types = ARRAY['Merit', 'Both']::text[] WHERE slug = 'miami-university-ohio-usa';
UPDATE public.universities SET tuition_display = '$54,000 / год', tuition_num = 54000, regular_deadline = 'Rolling' WHERE slug = 'michigan-state-university-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'michigan-technological-university-usa';
UPDATE public.universities SET early_deadline = '2027-07-09', regular_deadline = '2027-07-10', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'middle-east-technical-university-turkey';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-03' WHERE slug = 'middlebury-college-usa';
UPDATE public.universities SET website_domain = 'mills.edu' WHERE slug = 'mills-college-usa';
UPDATE public.universities SET tuition_display = '$59,000 / год', tuition_num = 59000 WHERE slug = 'millsaps-college-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000 WHERE slug = 'milwaukee-school-of-engineering-usa';
UPDATE public.universities SET website_domain = 'minerva.edu' WHERE slug = 'minerva-schools-at-kgi-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'mississippi-state-university-usa';
UPDATE public.universities SET city = 'of Science and Tech. Rolla, MO', tuition_display = '$46,000 / год', tuition_num = 46000, acceptance_rate = '83.5%', rate_num = 83.5, regular_deadline = '2027-07-01', lang = 'TOEFL 79; IELTS 87 avg.', undergrad_enrollment = '6,920', intl_undergrad_pct = '3.5%', intl_undergrad_count = '242', avg_aid_award = 'No data', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Не требуется', inst_tags = ARRAY['tech', 'public', 'research']::text[], aid_types = ARRAY['Merit', 'Need-based']::text[] WHERE slug = 'missouri-u-of-science-and-technology-usa';
UPDATE public.universities SET regular_deadline = '2027-05-31' WHERE slug = 'modul-university-vienna-austria';
UPDATE public.universities SET country = 'South Korea', website_domain = 'mokwon.ac.kr' WHERE slug = 'mokwon-university-korea';
UPDATE public.universities SET website_domain = 'monash.edu', early_deadline = '2027-05-31' WHERE slug = 'monash-university-australia';
UPDATE public.universities SET regular_deadline = '2027-03-01' WHERE slug = 'montclair-state-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-15' WHERE slug = 'morehouse-college-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15', majors = 'International Relations, Psychology, Environmental Studies', aid_types = ARRAY['Need-based', 'Merit', 'both', 'Full funding']::text[] WHERE slug = 'mount-holyoke-college-usa';
UPDATE public.universities SET tuition_display = '$70,000 / год', tuition_num = 70000, early_deadline = '2026-11-15', regular_deadline = '2027-02-01' WHERE slug = 'muhlenberg-college-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'myongji.ac.kr' WHERE slug = 'myongji-university-korea';
UPDATE public.universities SET regular_deadline = '2027-02-05' WHERE slug = 'nagoya-university-japan';
UPDATE public.universities SET name = 'Namık Kemal Üniversitesi' WHERE slug = 'nam-k-kemal-nversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-03-15' WHERE slug = 'nanyang-technological-university-singapore';
UPDATE public.universities SET website_domain = 'nus.edu.sg', early_deadline = '2027-03-01' WHERE slug = 'national-university-of-singapore-singapore';
UPDATE public.universities SET early_deadline = '2027-06-17', regular_deadline = '2027-06-17' WHERE slug = 'new-design-university-austria';
UPDATE public.universities SET city = 'of Technology Newark, NJ', tuition_display = '$55,200 / год', tuition_num = 55200, acceptance_rate = '61.4%', rate_num = 61.4, aid_max = '$23,498', aid_num = 23498, regular_deadline = '2027-03-01', lang = 'TOEFL 79; IELTS 90 avg.', undergrad_enrollment = '8,483', intl_undergrad_pct = '4.5%', intl_undergrad_count = '382', total_aid_millions = '$2.4m', intl_receiving_aid_pct = '26.5%', avg_aid_award = '$23,498', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Рекомендуется', coa_after_aid_pct = '43%', inst_tags = ARRAY['tech', 'public', 'research']::text[], aid_types = ARRAY['Both']::text[] WHERE slug = 'new-jersey-institute-of-technology-usa';
UPDATE public.universities SET city = 'of Technology Old Westbury, NY', tuition_display = '$60,000 / год', tuition_num = 60000, acceptance_rate = '76.9%', rate_num = 76.9, aid_max = '$19,099', aid_num = 19099, early_deadline = '2027-11-01', regular_deadline = 'Rolling', lang = 'TOEFL 79; IELTS 100 rec.', undergrad_enrollment = '3,688', intl_undergrad_pct = '15.8%', intl_undergrad_count = '583', total_aid_millions = '$4.8m', intl_receiving_aid_pct = '43.3%', avg_aid_award = '$19,099', inst_type = 'Private / Comp.U', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '30%', countries_represented = '74', inst_tags = ARRAY['tech', 'private']::text[], aid_types = ARRAY['Both']::text[] WHERE slug = 'new-york-institute-of-technology-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'new-york-university-usa';
UPDATE public.universities SET name = 'Ngee Ann Polytechnic', city = 'Singapore', website_domain = 'np.edu.sg', early_deadline = '2027-05-31' WHERE slug = 'ngee-ann-singapore';
UPDATE public.universities SET website_domain = 'umk.pl', early_deadline = '2027-07-06', regular_deadline = '2027-08-31' WHERE slug = 'nicolaus-copernicus-university-poland';
UPDATE public.universities SET city = 'Raleigh, NC', tuition_display = '$48,300 / год', tuition_num = 48300, acceptance_rate = '51%', rate_num = 51, aid_max = '$14,857', aid_num = 14857, early_deadline = '2027-11-01', regular_deadline = '2027-01-15', lang = 'TOEFL 85 18x4 req. 6.5Yes', undergrad_enrollment = '24,150', intl_undergrad_pct = '4.7%', intl_undergrad_count = '1137', total_aid_millions = '$2.6m', intl_receiving_aid_pct = '15.7%', avg_aid_award = '$14,255', inst_type = 'Public / Research', sat = 'Cons. for int''l', essay = 'Не требуется', coa_after_aid_pct = '30%', countries_represented = '122', inst_tags = ARRAY['public', 'research']::text[], aid_types = ARRAY['Need-based', 'Merit']::text[] WHERE slug = 'north-carolina-state-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'northeastern-university-usa';
UPDATE public.universities SET regular_deadline = '2027-03-01' WHERE slug = 'northwestern-university-in-qatar-qatar';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-02', aid_types = ARRAY['Need-based', 'Full funding']::text[] WHERE slug = 'northwestern-university-usa';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000 WHERE slug = 'nova-southeastern-university-usa';
UPDATE public.universities SET early_deadline = '2027-01-01', regular_deadline = '2027-01-05' WHERE slug = 'nyu-abu-dhabi-uae';
UPDATE public.universities SET regular_deadline = '2027-01-15', aid_types = ARRAY['Need-based', 'Full funding', 'both', 'Merit']::text[] WHERE slug = 'oberlin-college-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'occidental-college-usa';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000 WHERE slug = 'oglethorpe-university-usa';
UPDATE public.universities SET tuition_display = '$50,900 / год', tuition_num = 50900, acceptance_rate = '78.8%', rate_num = 78.8, aid_max = '$3,084', aid_num = 3084, regular_deadline = '2027-09-01', lang = 'TOEFL 79; IELTS 90 avg.', undergrad_enrollment = '25,838', intl_undergrad_pct = '8.8%', intl_undergrad_count = '2274', total_aid_millions = '$2.9m', intl_receiving_aid_pct = '9.0%', avg_aid_award = '$14,106', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Рекомендуется', coa_after_aid_pct = '28%', countries_represented = '79', inst_tags = ARRAY['public', 'research']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'ohio-state-university-usa';
UPDATE public.universities SET website_domain = 'hkmu.edu.hk', early_deadline = '2027-05-14' WHERE slug = 'open-university-of-hong-kong-hong-kong';
UPDATE public.universities SET website_domain = 'odu.edu.tr' WHERE slug = 'ordu-niversitesi-turkey';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'osaka-university-japan';
UPDATE public.universities SET website_domain = 'osmaniye.edu.tr' WHERE slug = 'osmaniye-korkutata-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'oulu-university-of-applied-sciences-finland';
UPDATE public.universities SET regular_deadline = '2027-02-15' WHERE slug = 'pace-university-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'pcu.ac.kr' WHERE slug = 'pai-chai-university-korea';
UPDATE public.universities SET early_deadline = '2027-03-31' WHERE slug = 'palack-university-olomouc-czech-republic';
UPDATE public.universities SET website_domain = 'pau.edu.tr', early_deadline = '2027-08-31', regular_deadline = '2027-09-01', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'pamukkale-university-turkey';
UPDATE public.universities SET early_deadline = '2027-09-15', regular_deadline = '2027-07-31' WHERE slug = 'paracelsus-medical-university-austria';
UPDATE public.universities SET website_domain = 'newschool.edu', tuition_display = '$73,000 / год', tuition_num = 73000 WHERE slug = 'parsons-the-new-school-usa';
UPDATE public.universities SET early_deadline = '2027-08-30', regular_deadline = '2027-08-30' WHERE slug = 'peking-university-china';
UPDATE public.universities SET website_domain = 'behrend.psu.edu' WHERE slug = 'penn-state-u-erie-behrend-college-usa';
UPDATE public.universities SET aid_max = '$0', regular_deadline = 'Rolling' WHERE slug = 'pennsylvania-state-university-usa';
UPDATE public.universities SET tuition_display = '$75,000 / год', tuition_num = 75000, early_deadline = '2027-01-01', regular_deadline = '2027-01-05' WHERE slug = 'pepperdine-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-01' WHERE slug = 'pitzer-college-usa';
UPDATE public.universities SET country = 'South Korea', city = 'Seoul', website_domain = 'postech.ac.kr', acceptance_rate = '25%', rate_num = 25, early_deadline = '2027-09-14', lang = 'IELTS 6 TOEFL 80', majors = 'Engineering & technology', sat = 'По желанию', essay = 'Self-Introduction & Study plan' WHERE slug = 'postech-pohang-university-of-science-and-technology-korea';
UPDATE public.universities SET early_deadline = '2027-03-26', regular_deadline = '2027-03-26' WHERE slug = 'polytechnic-university-of-milan-italy';
UPDATE public.universities SET regular_deadline = '2027-01-08' WHERE slug = 'pomona-college-usa';
UPDATE public.universities SET early_deadline = '2027-05-31', regular_deadline = NULL WHERE slug = 'pompeu-fabra-university-upf-spain';
UPDATE public.universities SET early_deadline = '2027-07-15' WHERE slug = 'pozna-university-of-technology-poland';
UPDATE public.universities SET early_deadline = '2027-05-29' WHERE slug = 'poznan-university-of-life-sciences-poland';
UPDATE public.universities SET early_deadline = '2027-07-31' WHERE slug = 'prague-college-czech-republic';
UPDATE public.universities SET tuition_display = '$70,000 / год', tuition_num = 70000 WHERE slug = 'pratt-institute-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'princeton-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'providence-college-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'pknu.ac.kr' WHERE slug = 'pukyong-national-university-korea';
UPDATE public.universities SET city = 'Lafayette, IN', tuition_display = '$48,800 / год', tuition_num = 48800, acceptance_rate = '57.4%', rate_num = 57.4, early_deadline = '2027-11-01', regular_deadline = '2027-02-01', lang = 'TOEFL 80; IELTS 20x4 req., 88eng/biz', undergrad_enrollment = '31,006', intl_undergrad_pct = '16.0%', intl_undergrad_count = '4961', total_aid_millions = '$1.1m', intl_receiving_aid_pct = '13.8%', avg_aid_award = '$1,595', inst_type = 'Public / Research', sat = 'Rec. for int''l', essay = 'Not req. Not used', coa_after_aid_pct = '3%', countries_represented = '104', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'purdue-university-west-lafayette-usa';
UPDATE public.universities SET website_domain = 'pusan.ac.kr', early_deadline = '2027-10-30', regular_deadline = '2027-04-29' WHERE slug = 'pusan-national-university-south-korea';
UPDATE public.universities SET website_domain = 'qu.edu.qa', early_deadline = '2027-06-14' WHERE slug = 'qatar-university-qatar';
UPDATE public.universities SET name = 'Queen Mary University London (QMUL)' WHERE slug = 'queen-mary-university-london-qmul-uk';
UPDATE public.universities SET city = 'Kingston, Ontario', early_deadline = '2027-02-01', regular_deadline = '2027-03-01', majors = 'Arts and Science, Dentistry, Education, Environmental Design, Kinesiology, Law, Medicine, Music, Optometry, Nursing, Public Health, Pharmacy, Veterinary Medicine, Continuing Education, Polytechnique Montréal, HEC Montréal', notes = '1) Our reputation for leading-edge physics, cancer research, geoengineering, data analytics, surveillance studies, social science and mental health research is well documented' WHERE slug = 'queen-s-university-at-kingston-canada';
UPDATE public.universities SET early_deadline = '2027-05-31' WHERE slug = 'queensland-university-of-technology-australia';
UPDATE public.universities SET tuition_display = '$67,000 / год', tuition_num = 67000 WHERE slug = 'quinnipiac-university-usa';
UPDATE public.universities SET website_domain = 'randolphcollege.edu', tuition_display = '$59,000 / год', tuition_num = 59000 WHERE slug = 'randolph-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'rebro-university-sweden';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'reed-college-usa';
UPDATE public.universities SET tuition_display = '$56,000 / год', tuition_num = 56000 WHERE slug = 'regis-university-usa';
UPDATE public.universities SET tuition_display = '$77,300 / год', tuition_num = 77300, early_deadline = '2027-11-01', regular_deadline = '2027-02-01', lang = 'TOEFL 88; IELTS 103 avg.', undergrad_enrollment = '6,366', intl_undergrad_pct = '13.6%', intl_undergrad_count = '866', inst_type = 'Private / Research', sat = 'Обязательно', essay = 'Не требуется', countries_represented = '30', inst_tags = ARRAY['tech', 'private', 'research']::text[] WHERE slug = 'rensselaer-polytechnic-institute-usa';
UPDATE public.universities SET tuition_display = '$73,000 / год', tuition_num = 73000 WHERE slug = 'rhode-island-school-of-design-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'rhodes-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-04' WHERE slug = 'rice-university-usa';
UPDATE public.universities SET early_deadline = '2027-04-12', regular_deadline = '2027-04-30' WHERE slug = 'riga-graduate-school-of-law-latvia';
UPDATE public.universities SET tuition_display = '€610–€6,000 / год', tuition_num = 6000, early_deadline = '2027-07-15', regular_deadline = '2027-07-15' WHERE slug = 'riga-international-school-of-economics-and-business-administration-latvia';
UPDATE public.universities SET tuition_display = '€800–€14,000 / год', tuition_num = 14000, early_deadline = '2027-02-01', regular_deadline = '2027-05-01' WHERE slug = 'riga-stradins-university-latvia';
UPDATE public.universities SET tuition_display = '€600–€4,000 / год', tuition_num = 4000, early_deadline = '2027-01-01', regular_deadline = '2027-08-01' WHERE slug = 'riga-technical-university-latvia';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'ritsumeikan-university-japan';
UPDATE public.universities SET early_deadline = '2027-03-15', regular_deadline = '2027-11-12' WHERE slug = 'rmit-university-australia';
UPDATE public.universities SET website_domain = 'sirnak.edu.tr' WHERE slug = 'rnak-niversitesi-turkey';
UPDATE public.universities SET tuition_display = '$63,000 / год', tuition_num = 63000 WHERE slug = 'roanoke-college-usa';
UPDATE public.universities SET early_deadline = '2027-10-15', regular_deadline = '2027-04-01' WHERE slug = 'rochester-institute-of-technology-dubai-uae';
UPDATE public.universities SET city = 'New York', tuition_display = '$62,700 / год', tuition_num = 62700, acceptance_rate = '71%', rate_num = 71, full_grant = TRUE, aid_max = '$12,084', aid_num = 12084, lang = 'TOEFL 79', undergrad_enrollment = '12,429', intl_undergrad_pct = '6.8%', intl_undergrad_count = '845', total_aid_millions = '$5.2m', intl_receiving_aid_pct = '50.3%', avg_aid_award = '$12,084', inst_type = 'Private / Research', majors = 'Engineering, Computer Science, Design, Photography, Game Design', coa_after_aid_pct = '19%', countries_represented = '74', merit_scholarship_name = 'n/s Info', inst_tags = ARRAY['tech', 'private', 'research']::text[], aid_types = ARRAY['Full funding', 'Both']::text[] WHERE slug = 'rochester-institute-of-technology-usa';
UPDATE public.universities SET website_domain = 'rockhurst.edu', regular_deadline = 'Rolling' WHERE slug = 'rockhurst-university-usa';
UPDATE public.universities SET tuition_display = '$56,000 / год', tuition_num = 56000 WHERE slug = 'roger-williams-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-02-01' WHERE slug = 'rollins-college-usa';
UPDATE public.universities SET city = 'of Technology Terre Haute, IN', tuition_display = '$72,100 / год', tuition_num = 72100, acceptance_rate = '60.9%', rate_num = 60.9, regular_deadline = '2027-02-01', lang = 'TOEFL 88; IELTS 20x4 req.', undergrad_enrollment = '2,168', intl_undergrad_pct = '14.5%', intl_undergrad_count = '314', total_aid_millions = '$1.4m', intl_receiving_aid_pct = '93.6%', avg_aid_award = '$4,813', inst_type = 'Private / LAC', sat = 'Обязательно', essay = 'Not req. Not used', coa_after_aid_pct = '7%', countries_represented = '11', inst_tags = ARRAY['tech', 'liberal_arts', 'private']::text[], aid_types = ARRAY['Merit', 'Need-based']::text[] WHERE slug = 'rose-hulman-inst-of-technology-usa';
UPDATE public.universities SET regular_deadline = '2027-03-15' WHERE slug = 'roskilde-university-denmark';
UPDATE public.universities SET regular_deadline = '2027-03-01' WHERE slug = 'rowan-university-usa';
UPDATE public.universities SET tuition_display = '$50,000 / год', tuition_num = 50000, regular_deadline = 'Rolling' WHERE slug = 'rutgers-university-new-brunswick-usa';
UPDATE public.universities SET website_domain = 'rwth-aachen.de', early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'rwth-aachen-university-germany';
UPDATE public.universities SET early_deadline = '2027-01-15' WHERE slug = 'sabanci-university-turkey';
UPDATE public.universities SET early_deadline = '2026-12-01', regular_deadline = '2027-02-01' WHERE slug = 'saint-anselm-college-usa';
UPDATE public.universities SET tuition_display = '$60,000 / год', tuition_num = 60000 WHERE slug = 'saint-john-s-university-minnesota-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = 'Rolling' WHERE slug = 'saint-joseph-s-university-usa';
UPDATE public.universities SET tuition_display = '$63,000 / год', tuition_num = 63000, regular_deadline = '2027-08-15' WHERE slug = 'saint-louis-university-usa';
UPDATE public.universities SET tuition_display = '$70,000 / год', tuition_num = 70000 WHERE slug = 'saint-mary-s-college-of-california-usa';
UPDATE public.universities SET tuition_display = '$62,000 / год', tuition_num = 62000 WHERE slug = 'saint-michael-s-college-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'san-diego-state-university-usa';
UPDATE public.universities SET website_domain = 'sfai.edu', tuition_display = '$73,000 / год', tuition_num = 73000 WHERE slug = 'san-francisco-art-institute-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'san-francisco-state-university-usa';
UPDATE public.universities SET regular_deadline = '2026-11-30' WHERE slug = 'san-jose-state-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-07' WHERE slug = 'santa-clara-university-usa';
UPDATE public.universities SET early_deadline = '2026-11-30' WHERE slug = 'sapienza-university-of-rome-italy';
UPDATE public.universities SET tuition_display = '$75,000 / год', tuition_num = 75000, early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'sarah-lawrence-college-usa';
UPDATE public.universities SET website_domain = 'sciencespo.fr' WHERE slug = 'sciences-po-france';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'scripps-college-usa';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000 WHERE slug = 'seattle-university-usa';
UPDATE public.universities SET website_domain = 'sejong.ac.kr', early_deadline = '2027-05-28' WHERE slug = 'sejong-university-south-korea';
UPDATE public.universities SET website_domain = 'selcuk.edu.tr' WHERE slug = 'sel-uk-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-05-31' WHERE slug = 'semmelweis-university-hungary';
UPDATE public.universities SET country = 'South Korea', website_domain = 'seoultech.ac.kr' WHERE slug = 'seoul-national-university-of-science-and-technology-korea';
UPDATE public.universities SET website_domain = 'snu.ac.kr', early_deadline = '2027-03-11' WHERE slug = 'seoul-national-university-south-korea';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000 WHERE slug = 'seton-hill-university-usa';
UPDATE public.universities SET tuition_display = '$63,000 / год', tuition_num = 63000, aid_max = '$35,660', aid_num = 35660, aid_types = ARRAY['Need-based', 'Merit']::text[] WHERE slug = 'sewanee-the-university-of-the-south-usa';
UPDATE public.universities SET early_deadline = '2027-04-15', regular_deadline = '2027-04-15' WHERE slug = 'shanghai-jiao-tong-university-china';
UPDATE public.universities SET country = 'South Korea', website_domain = 'shinhan.ac.kr' WHERE slug = 'shinhan-university-korea';
UPDATE public.universities SET website_domain = 'polsl.pl', early_deadline = '2027-09-18' WHERE slug = 'silesian-university-of-technology-poland';
UPDATE public.universities SET early_deadline = '2027-04-01', regular_deadline = '2027-10-01' WHERE slug = 'sim-singapore-institute-of-management-singapore';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000, full_grant = TRUE, early_deadline = '2027-03-01', aid_types = ARRAY['mixed']::text[] WHERE slug = 'simon-fraser-university-canada';
UPDATE public.universities SET early_deadline = '2027-03-15' WHERE slug = 'singapore-management-university-singapore';
UPDATE public.universities SET early_deadline = '2026-11-26' WHERE slug = 'singapore-polytechnic-singapore';
UPDATE public.universities SET website_domain = 'suss.edu.sg', early_deadline = '2027-09-30' WHERE slug = 'singapore-university-of-social-sciences-suss-singapore';
UPDATE public.universities SET early_deadline = '2027-03-19' WHERE slug = 'singapore-university-of-technology-and-design-singapore';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-01-15', lang = 'TOEFL 96', undergrad_enrollment = '2,680', intl_undergrad_pct = '11.3%', intl_undergrad_count = '303', total_aid_millions = '$5.3m', intl_receiving_aid_pct = '27.4%', avg_aid_award = '$63,855', sat = 'Req. int''l non-Eng.', essay = 'Не требуется', coa_after_aid_pct = '83%', countries_represented = '57' WHERE slug = 'skidmore-college-usa';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'smith-college-usa';
UPDATE public.universities SET website_domain = 'sogang.ac.kr' WHERE slug = 'sogang-university-south-korea';
UPDATE public.universities SET tuition_display = '$53,900 / год', tuition_num = 53900, regular_deadline = '2027-01-15', undergrad_enrollment = '412', intl_undergrad_pct = '43.0%', intl_undergrad_count = '177', total_aid_millions = '$8.6m', intl_receiving_aid_pct = '100%', avg_aid_award = '$48,368', inst_type = 'Private / LAC', sat = 'Обязательно', essay = 'Обязательно', coa_after_aid_pct = '90%', countries_represented = '32', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Full funding', 'Need-based', 'Merit', 'Both']::text[] WHERE slug = 'soka-university-of-america-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'sookmyung.ac.kr' WHERE slug = 'sookmyung-women-s-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'sch.ac.kr' WHERE slug = 'soonchunhyang-university-korea';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'sophia-university-japan';
UPDATE public.universities SET regular_deadline = '2027-05-01' WHERE slug = 'southern-illinois-university-carbondale-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'southern-methodist-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-01' WHERE slug = 'southwestern-university-usa';
UPDATE public.universities SET website_domain = 'spelman.edu' WHERE slug = 'spelman-college-usa';
UPDATE public.universities SET website_domain = 'sjc.edu', tuition_display = '$50,000 / год', tuition_num = 50000, acceptance_rate = '54.6%', rate_num = 54.6, regular_deadline = 'Rolling', lang = 'IELTS 100 rec.', undergrad_enrollment = '458', intl_undergrad_pct = '22.1%', intl_undergrad_count = '101', total_aid_millions = '$3.7m', intl_receiving_aid_pct = '98.0%', avg_aid_award = '$37,568', inst_type = 'Private / LAC', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '51%', intl_acceptance_rate = '42.1%', intl_yield = '25.8%', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'st-john-s-college-annapolis-usa';
UPDATE public.universities SET city = 'Santa Fe, NM', website_domain = 'sjc.edu', tuition_display = '$73,800 / год', tuition_num = 73800, acceptance_rate = '63.2%', rate_num = 63.2, regular_deadline = 'Rolling', lang = 'IELTS 100 rec.', undergrad_enrollment = '322', intl_undergrad_pct = '30.1%', intl_undergrad_count = '97', total_aid_millions = '$5.2m', intl_receiving_aid_pct = '100%', avg_aid_award = '$53,100', inst_type = 'Private / LAC', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '72%', countries_represented = '13', intl_acceptance_rate = '56.0%', intl_yield = '18.6%', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Merit', 'Both']::text[] WHERE slug = 'st-john-s-college-santa-fe-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = 'Rolling' WHERE slug = 'st-john-s-university-new-york-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-01' WHERE slug = 'st-lawrence-university-usa';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000 WHERE slug = 'st-norbert-college-usa';
UPDATE public.universities SET early_deadline = '2027-01-08', regular_deadline = '2027-01-15', notes = 'Tier 3: LIMITED NEED-BASED AID | Strong Scandinavian heritage & music programs | Aid form: CSS Profile' WHERE slug = 'st-olaf-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'stanford-university-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000 WHERE slug = 'stetson-university-usa';
UPDATE public.universities SET tuition_display = '$72,000 / год', tuition_num = 72000, aid_max = '$12,144', aid_num = 12144, regular_deadline = 'Rolling', lang = 'TOEFL 80 95 avg. 6', undergrad_enrollment = '2,978', intl_undergrad_pct = '4.3%', intl_undergrad_count = '128', total_aid_millions = '$1.3m', intl_receiving_aid_pct = '83.7%', avg_aid_award = '$12,144', inst_type = 'Private / Research', sat = 'Обязательно', essay = 'Рекомендуется', coa_after_aid_pct = '16%', countries_represented = '23', intl_acceptance_rate = '31.6%', intl_yield = '5.2%', inst_tags = ARRAY['tech', 'private', 'research']::text[], aid_types = ARRAY['Need-based', 'Both']::text[] WHERE slug = 'stevens-institute-of-technology-usa';
UPDATE public.universities SET early_deadline = '2027-04-25', regular_deadline = '2027-04-25' WHERE slug = 'stockholm-school-of-economics-in-riga-latvia';
UPDATE public.universities SET name = 'Stockholm University', website_domain = 'su.se', early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'stockholm-unversity-sweden';
UPDATE public.universities SET regular_deadline = '2027-02-15' WHERE slug = 'suffolk-university-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'sunmoon.ac.kr' WHERE slug = 'sun-moon-university-korea';
UPDATE public.universities SET country = 'South Korea', website_domain = 'sunchon.ac.kr' WHERE slug = 'sunchon-national-university-korea';
UPDATE public.universities SET website_domain = 'skku.edu', full_grant = TRUE, early_deadline = '2027-05-01', regular_deadline = '2027-11-01', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'sungkyunkwan-university-skku-south-korea';
UPDATE public.universities SET website_domain = 'geneseo.edu' WHERE slug = 'suny-geneseo-usa';
UPDATE public.universities SET aid_max = '$2,731', aid_num = 2731, regular_deadline = '2027-01-15', aid_types = ARRAY['Merit']::text[] WHERE slug = 'suny-stony-brook-university-usa';
UPDATE public.universities SET name = 'SUNY - University at Albany', city = 'Albany, NY', website_domain = 'albany.edu', early_deadline = '2026-11-15', regular_deadline = 'Rolling' WHERE slug = 'suny-university-usa';
UPDATE public.universities SET name = 'SUNY Oneonta', city = 'Oneonta, NY', website_domain = 'oneonta.edu' WHERE slug = 'suny-usa';
UPDATE public.universities SET tuition_display = '$65,000 / год', tuition_num = 65000, aid_max = '$33,524', aid_num = 33524, aid_types = ARRAY['Need-based', 'Merit']::text[] WHERE slug = 'susquehanna-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-01' WHERE slug = 'swarthmore-college-usa';
UPDATE public.universities SET regular_deadline = '2027-06-11' WHERE slug = 'swinburne-university-of-technology-australia';
UPDATE public.universities SET website_domain = 'sbs.edu', early_deadline = '2027-06-30', regular_deadline = '2027-06-30' WHERE slug = 'swiss-business-school-switzerland';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'swiss-federal-institute-of-technology-of-lausanne-switzerland';
UPDATE public.universities SET website_domain = 'ethz.ch', early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'swiss-federal-institute-of-technology-switzerland';
UPDATE public.universities SET tuition_display = '$73,000 / год', tuition_num = 73000, regular_deadline = '2027-02-01' WHERE slug = 'syracuse-university-usa';
UPDATE public.universities SET early_deadline = '2027-07-30' WHERE slug = 'sz-chenyi-istv-n-university-hungary';
UPDATE public.universities SET website_domain = 'uni-mate.hu', early_deadline = '2027-06-15' WHERE slug = 'szent-istv-n-university-hungary';
UPDATE public.universities SET early_deadline = '2027-01-04', regular_deadline = '2027-01-18' WHERE slug = 'tampere-university-finland';
UPDATE public.universities SET country = 'South Korea', website_domain = 'tukorea.ac.kr' WHERE slug = 'tech-university-of-korea-korea';
UPDATE public.universities SET early_deadline = '2027-10-15', regular_deadline = '2027-03-15' WHERE slug = 'technical-university-of-denmark-denmark';
UPDATE public.universities SET website_domain = 'pollub.pl', early_deadline = '2027-07-09' WHERE slug = 'technical-university-of-lublin-poland';
UPDATE public.universities SET early_deadline = '2027-05-15' WHERE slug = 'technical-university-of-ostrava-czech-republic';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'technische-universit-t-dresden-germany';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-31' WHERE slug = 'technische-universit-t-m-nchen-germany';
UPDATE public.universities SET early_deadline = '2027-06-13' WHERE slug = 'technological-and-higher-education-institute-of-hong-kong-hong-kong';
UPDATE public.universities SET regular_deadline = '2026-12-01' WHERE slug = 'temple-university-usa';
UPDATE public.universities SET name = 'Texas A&M University at Qatar', website_domain = 'qatar.tamu.edu', early_deadline = '2027-03-01' WHERE slug = 'texas-a-amp-m-university-at-qatar-qatar';
UPDATE public.universities SET city = 'Station, TX', tuition_display = '$57,000 / год', tuition_num = 57000, acceptance_rate = '70.1%', rate_num = 70.1, early_deadline = '2027-11-01', regular_deadline = '2027-02-01', lang = 'TOEFL 80', undergrad_enrollment = '53,065', intl_undergrad_pct = '1.4%', intl_undergrad_count = '762', total_aid_millions = '$4.6m', intl_receiving_aid_pct = '31.5%', avg_aid_award = '$19,274', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '34%', countries_represented = '125', intl_acceptance_rate = '62.7%', intl_yield = '7.9%', inst_tags = ARRAY['public', 'research']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'texas-a-m-university-usa';
UPDATE public.universities SET regular_deadline = '2027-08-01' WHERE slug = 'texas-tech-university-usa';
UPDATE public.universities SET name = 'The Academy of Performing Arts in Prague', early_deadline = '2026-11-22' WHERE slug = 'the-academy-of-perfoming-arts-in-prague-czech-republic';
UPDATE public.universities SET website_domain = 'buid.ac.ae' WHERE slug = 'the-british-university-in-dubai-uae';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000 WHERE slug = 'the-citadel-usa';
UPDATE public.universities SET website_domain = 'gwu.edu', early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'the-george-washington-university-usa';
UPDATE public.universities SET website_domain = 'eduhk.hk' WHERE slug = 'the-hong-kong-university-of-education-hong-kong';
UPDATE public.universities SET website_domain = 'newschool.edu', tuition_display = '$73,000 / год', tuition_num = 73000 WHERE slug = 'the-new-school-coll-of-performing-arts-usa';
UPDATE public.universities SET website_domain = 'newschool.edu', regular_deadline = 'Rolling' WHERE slug = 'the-new-school-usa';
UPDATE public.universities SET early_deadline = '2027-11-02', regular_deadline = '2027-01-04' WHERE slug = 'the-university-of-chicago-usa';
UPDATE public.universities SET website_domain = 'unimi.it', early_deadline = '2027-05-20', regular_deadline = '2027-05-20' WHERE slug = 'the-university-of-milan-italy';
UPDATE public.universities SET website_domain = 'upenn.edu', early_deadline = '2027-11-01', regular_deadline = '2027-01-05' WHERE slug = 'the-university-of-pennsylvania-usa';
UPDATE public.universities SET website_domain = 'u-tokyo.ac.jp' WHERE slug = 'the-university-of-tokyo-japan';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'tohoku-university-japan';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'tokyo-university-of-science-japan';
UPDATE public.universities SET early_deadline = '2027-03-31' WHERE slug = 'tomas-bata-university-czech-republic';
UPDATE public.universities SET website_domain = 'uniroma2.it', early_deadline = '2027-05-31', regular_deadline = '2027-05-31' WHERE slug = 'tor-vergata-university-of-rome-italy';
UPDATE public.universities SET regular_deadline = '2027-01-17' WHERE slug = 'towson-university-usa';
UPDATE public.universities SET city = 'Hartford, CT', tuition_display = '$77,000 / год', tuition_num = 77000, acceptance_rate = '25%', rate_num = 25, early_deadline = '2026-11-15', regular_deadline = '2027-01-15', undergrad_enrollment = '2,289', intl_undergrad_pct = '11.8%', intl_undergrad_count = '270', total_aid_millions = '$10.6m', intl_receiving_aid_pct = '63.0%', avg_aid_award = '$62,241', inst_type = 'Private / LAC', intl_aid_policy = 'need-aware', majors = 'Economics, Political Science, Environmental Science, Neuroscience', sat = 'Cons.', essay = 'Не требуется', coa_after_aid_pct = '79%', countries_represented = '70', intl_acceptance_rate = '14.9%', intl_yield = '27.2%', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Need-based', 'Full funding']::text[] WHERE slug = 'trinity-college-ct-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-02-01' WHERE slug = 'trinity-university-usa';
UPDATE public.universities SET early_deadline = '2027-08-25', regular_deadline = '2027-08-25' WHERE slug = 'tsinghua-university-china';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'tu-darmstadt-germany';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-04' WHERE slug = 'tufts-university-usa';
UPDATE public.universities SET regular_deadline = '2027-04-01' WHERE slug = 'tulane-university-usa';
UPDATE public.universities SET early_deadline = '2027-01-27', regular_deadline = '2027-01-18' WHERE slug = 'turku-university-of-applied-sciences-finland';
UPDATE public.universities SET city = 'Champaign, IL', tuition_display = '$34,316 / год', tuition_num = 34316, acceptance_rate = '76%', rate_num = 76, early_deadline = '2027-11-01', regular_deadline = '2027-02-01', lang = '6.5', undergrad_enrollment = '19,448', intl_undergrad_pct = '4.8%', intl_undergrad_count = '934', total_aid_millions = '$0.1m', intl_receiving_aid_pct = '2.0%', avg_aid_award = '$4,310', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Not req. Not used', coa_after_aid_pct = '9%', countries_represented = '73', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'university-of-illinois-chicago-usa';
UPDATE public.universities SET regular_deadline = NULL WHERE slug = 'u-tad-university-of-technology-arts-and-design-spain';
UPDATE public.universities SET website_domain = 'ucl.ac.uk', early_deadline = '2027-03-30' WHERE slug = 'ucl-university-college-of-london-uk';
UPDATE public.universities SET tuition_display = '$74,000 / год', tuition_num = 74000, early_deadline = '2027-11-01', regular_deadline = '2027-01-01', intl_aid_policy = 'need-aware', how_apply_aid = 'CSS Profile + supplements' WHERE slug = 'university-of-notre-dame-usa';
UPDATE public.universities SET website_domain = 'cu.edu.tr' WHERE slug = 'ukurova-niversitesi-turkey';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'ulm-university-germany';
UPDATE public.universities SET country = 'South Korea', website_domain = 'ulsan.ac.kr' WHERE slug = 'ulsan-university-korea';
UPDATE public.universities SET website_domain = 'uludag.edu.tr' WHERE slug = 'uluda-niversitesi-turkey';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'ume-university-sweden';
UPDATE public.universities SET city = 'Schenectady, NY', tuition_display = '$73,410 / год', tuition_num = 73410, acceptance_rate = '30%', rate_num = 30, early_deadline = '2026-11-15', regular_deadline = '2027-01-15', lang = 'TOEFL 90; IELTS 90 avg.', undergrad_enrollment = '2,267', intl_undergrad_pct = '7.1%', intl_undergrad_count = '161', total_aid_millions = '$4.1m', intl_receiving_aid_pct = '51.2%', avg_aid_award = '$49,243', inst_type = 'private liberal arts college', intl_aid_policy = 'need-aware', sat = 'Обязательно', essay = 'Не требуется', how_apply_aid = 'Limited/CSS + Supplements', coa_after_aid_pct = '64%', countries_represented = '34', intl_acceptance_rate = '89.6%', intl_yield = '35.8%', merit_scholarship_name = 'Full tuition Dean''s Honor Scholarship Info', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Merit', 'Need-based', 'Both']::text[] WHERE slug = 'union-college-ny-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'unist.ac.kr' WHERE slug = 'unist-ulsan-national-institute-of-science-and-technology-korea';
UPDATE public.universities SET regular_deadline = NULL WHERE slug = 'united-international-business-school-spain';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'universit-t-hamburg-germany';
UPDATE public.universities SET early_deadline = '2027-05-01', regular_deadline = '2027-05-01' WHERE slug = 'universita-bocconi-italy';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'universite-de-montreal-canada';
UPDATE public.universities SET early_deadline = '2027-06-15' WHERE slug = 'universite-du-quebec-canada';
UPDATE public.universities SET early_deadline = '2027-04-15' WHERE slug = 'universite-laval-canada';
UPDATE public.universities SET city = 'Alabama-Birmingham Birmingham', regular_deadline = '2027-05-01' WHERE slug = 'university-of-alabama-birmingham-usa';
UPDATE public.universities SET early_deadline = '2027-03-01' WHERE slug = 'university-of-alberta-canada';
UPDATE public.universities SET early_deadline = '2027-03-01', regular_deadline = '2027-03-01' WHERE slug = 'university-of-antwerp-belgium';
UPDATE public.universities SET tuition_display = '$54,000 / год', tuition_num = 54000 WHERE slug = 'university-of-arizona-usa';
UPDATE public.universities SET regular_deadline = '2027-08-01' WHERE slug = 'university-of-arkansas-usa';
UPDATE public.universities SET website_domain = 'ub.edu', early_deadline = '2027-10-15', regular_deadline = NULL WHERE slug = 'university-of-barcelona-spain';
UPDATE public.universities SET early_deadline = '2027-07-30' WHERE slug = 'university-of-bialystok-poland';
UPDATE public.universities SET early_deadline = '2027-03-15', regular_deadline = '2027-03-15' WHERE slug = 'university-of-bologna-italy';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-08-20' WHERE slug = 'university-of-bonn-germany';
UPDATE public.universities SET early_deadline = '2027-02-10', regular_deadline = '2027-02-10' WHERE slug = 'university-of-brescia-italy';
UPDATE public.universities SET early_deadline = '2027-01-15' WHERE slug = 'university-of-british-columbia-canada';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'university-of-calgary-canada';
UPDATE public.universities SET website_domain = 'qatar.ucalgary.ca', early_deadline = '2027-03-15' WHERE slug = 'university-of-calgary-in-qatar-qatar';
UPDATE public.universities SET tuition_display = '$69,000 / год', tuition_num = 69000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-berkeley-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-davis-usa';
UPDATE public.universities SET tuition_display = '$65,000 / год', tuition_num = 65000, early_deadline = '2026-11-30', regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-irvine-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-los-angeles-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-merced-usa';
UPDATE public.universities SET tuition_display = '$65,000 / год', tuition_num = 65000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-riverside-usa';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-san-diego-usa';
UPDATE public.universities SET tuition_display = '$67,000 / год', tuition_num = 67000, regular_deadline = '2026-11-30' WHERE slug = 'university-of-california-santa-barbara-usa';
UPDATE public.universities SET tuition_display = '$67,000 / год', tuition_num = 67000, regular_deadline = '2027-05-01' WHERE slug = 'university-of-california-santa-cruz-usa';
UPDATE public.universities SET early_deadline = '2027-10-15' WHERE slug = 'university-of-cambridge-uk';
UPDATE public.universities SET website_domain = 'vscht.cz', early_deadline = '2027-02-28' WHERE slug = 'university-of-chemistry-and-technology-prague-czech-republic';
UPDATE public.universities SET city = 'Cincinnati, OH', tuition_display = '$48,500 / год', tuition_num = 48500, acceptance_rate = '76.5%', rate_num = 76.5, regular_deadline = '2027-03-01', lang = 'TOEFL 79; IELTS 79 for Engin./Bus.', undergrad_enrollment = '26,608', intl_undergrad_pct = '4.3%', intl_undergrad_count = '1144', total_aid_millions = '$5.4m', intl_receiving_aid_pct = '42.1%', avg_aid_award = '$11,189', inst_type = 'Public / Research', sat = 'Flexible', essay = 'Not req. Not used', coa_after_aid_pct = '23%', countries_represented = '69', intl_acceptance_rate = '67.0%', intl_yield = '17.6%', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'university-of-cincinnati-usa';
UPDATE public.universities SET website_domain = 'uni-koeln.de', early_deadline = '2027-07-31', regular_deadline = '2027-07-15' WHERE slug = 'university-of-cologne-germany';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000, early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'university-of-colorado-boulder-usa';
UPDATE public.universities SET tuition_display = '$38,000 / год', tuition_num = 38000 WHERE slug = 'university-of-colorado-colorado-springs-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'university-of-colorado-denver-usa';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000, regular_deadline = '2027-01-15' WHERE slug = 'university-of-connecticut-usa';
UPDATE public.universities SET early_deadline = '2027-03-15', regular_deadline = '2027-03-15' WHERE slug = 'university-of-copenhagen-denmark';
UPDATE public.universities SET tuition_display = '$60,000 / год', tuition_num = 60000 WHERE slug = 'university-of-dallas-usa';
UPDATE public.universities SET tuition_display = '$61,000 / год', tuition_num = 61000, early_deadline = '2026-12-15', regular_deadline = '2027-03-01' WHERE slug = 'university-of-dayton-usa';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000, regular_deadline = '2027-01-15' WHERE slug = 'university-of-delaware-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'university-of-denver-usa';
UPDATE public.universities SET website_domain = 'uniduna.hu' WHERE slug = 'university-of-duna-jv-ros-hungary';
UPDATE public.universities SET website_domain = 'uef.fi', early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'university-of-eastern-finland-finland';
UPDATE public.universities SET tuition_display = '$54,000 / год', tuition_num = 54000 WHERE slug = 'university-of-evansville-usa';
UPDATE public.universities SET early_deadline = '2027-08-31' WHERE slug = 'university-of-finance-and-administration-czech-republic';
UPDATE public.universities SET early_deadline = '2027-08-15', regular_deadline = '2027-08-15' WHERE slug = 'university-of-florence-italy';
UPDATE public.universities SET early_deadline = '2027-10-15', regular_deadline = '2027-03-01' WHERE slug = 'university-of-florida-usa';
UPDATE public.universities SET early_deadline = NULL, regular_deadline = '2027-07-15' WHERE slug = 'university-of-freiburg-germany';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'university-of-g-ttingen-germany';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'university-of-geneva-switzerland';
UPDATE public.universities SET regular_deadline = '2027-03-01' WHERE slug = 'university-of-georgia-usa';
UPDATE public.universities SET website_domain = 'gu.se', early_deadline = '2027-01-15', regular_deadline = '2027-01-15' WHERE slug = 'university-of-gothenburg-sweden';
UPDATE public.universities SET early_deadline = '2027-01-31', regular_deadline = NULL WHERE slug = 'university-of-granada-spain';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'university-of-graz-austria';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-05-01' WHERE slug = 'university-of-groningen-netherlands';
UPDATE public.universities SET tuition_display = '$52,000 / год', tuition_num = 52000, aid_types = ARRAY['Need-based', 'Merit']::text[] WHERE slug = 'university-of-hawaii-at-manoa-usa';
UPDATE public.universities SET early_deadline = '2027-10-12', regular_deadline = '2027-01-04' WHERE slug = 'university-of-helsinki-finland';
UPDATE public.universities SET website_domain = 'hku.hk' WHERE slug = 'university-of-hong-kong-hong-kong';
UPDATE public.universities SET regular_deadline = '2027-06-15' WHERE slug = 'university-of-houston-usa';
UPDATE public.universities SET regular_deadline = '2026-12-01', aid_types = ARRAY['Both', 'Merit']::text[] WHERE slug = 'university-of-illinois-at-urbana-champaign-usa';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'university-of-innsbruck-austria';
UPDATE public.universities SET regular_deadline = '2027-05-01' WHERE slug = 'university-of-iowa-usa';
UPDATE public.universities SET regular_deadline = '2027-08-13' WHERE slug = 'university-of-kansas-usa';
UPDATE public.universities SET regular_deadline = '2027-02-15' WHERE slug = 'university-of-kentucky-usa';
UPDATE public.universities SET website_domain = 'ull.es' WHERE slug = 'university-of-la-laguna-spain';
UPDATE public.universities SET website_domain = 'lu.lv', tuition_display = '€200–€15,000 / год', tuition_num = 15000, early_deadline = '2027-06-27', regular_deadline = '2027-05-15' WHERE slug = 'university-of-latvia-riga-latvia';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'university-of-lausanne-switzerland';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'university-of-leoben-austria';
UPDATE public.universities SET website_domain = 'ulisboa.pt' WHERE slug = 'university-of-lisbon-portugal';
UPDATE public.universities SET early_deadline = '2027-07-15' WHERE slug = 'university-of-lodz-poland';
UPDATE public.universities SET early_deadline = '2027-05-31', regular_deadline = '2027-05-31' WHERE slug = 'university-of-m-nster-germany';
UPDATE public.universities SET early_deadline = '2027-07-31', regular_deadline = '2027-07-15' WHERE slug = 'university-of-mannheim-germany';
UPDATE public.universities SET regular_deadline = '2027-02-01' WHERE slug = 'university-of-maryland-baltimore-county-usa';
UPDATE public.universities SET city = 'College Park', tuition_display = '$54,000 / год', tuition_num = 54000, acceptance_rate = '44.5%', rate_num = 44.5, regular_deadline = '2027-01-20', lang = 'TOEFL 100', undergrad_enrollment = '29,868', intl_undergrad_pct = '5.1%', intl_undergrad_count = '1527', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Не требуется', intl_acceptance_rate = '30.9%', intl_yield = '23.1%', inst_tags = ARRAY['public', 'research']::text[], aid_types = ARRAY['Need-based', 'Merit']::text[] WHERE slug = 'university-of-maryland-usa';
UPDATE public.universities SET tuition_display = '$51,000 / год', tuition_num = 51000, regular_deadline = '2027-03-01' WHERE slug = 'university-of-massachusetts-amherst-usa';
UPDATE public.universities SET tuition_display = '$56,000 / год', tuition_num = 56000 WHERE slug = 'university-of-massachusetts-boston-usa';
UPDATE public.universities SET website_domain = 'unimelb.edu.au', regular_deadline = '2027-06-11' WHERE slug = 'university-of-melbourne-australia';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'university-of-miami-usa';
UPDATE public.universities SET tuition_display = '$67,000 / год', tuition_num = 67000, regular_deadline = '2027-02-01' WHERE slug = 'university-of-michigan-ann-arbor-usa';
UPDATE public.universities SET regular_deadline = '2027-06-15' WHERE slug = 'university-of-michigan-dearborn-usa';
UPDATE public.universities SET website_domain = 'umn.edu', regular_deadline = 'Rolling' WHERE slug = 'university-of-minnesota-twin-cities-usa';
UPDATE public.universities SET early_deadline = '2027-06-30' WHERE slug = 'university-of-miskolc-hungary';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'university-of-mississippi-usa';
UPDATE public.universities SET website_domain = 'missouri.edu' WHERE slug = 'university-of-missouri-columbia-usa';
UPDATE public.universities SET early_deadline = '2027-02-22', regular_deadline = NULL WHERE slug = 'university-of-navarra-spain';
UPDATE public.universities SET regular_deadline = '2027-05-01' WHERE slug = 'university-of-nebraska-lincoln-usa';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = '2027-07-01' WHERE slug = 'university-of-nevada-las-vegas-usa';
UPDATE public.universities SET tuition_display = '$51,000 / год', tuition_num = 51000, regular_deadline = '2027-02-01' WHERE slug = 'university-of-new-hampshire-usa';
UPDATE public.universities SET city = 'Albuquerque, NM', tuition_display = '$41,700 / год', tuition_num = 41700, acceptance_rate = '49.4%', rate_num = 49.4, regular_deadline = 'Rolling', lang = 'TOEFL 68', undergrad_enrollment = '19,516', intl_undergrad_pct = '2.7%', intl_undergrad_count = '527', total_aid_millions = 'unk', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Not req. Not used', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'university-of-new-mexico-usa';
UPDATE public.universities SET early_deadline = '2027-03-31' WHERE slug = 'university-of-new-york-in-prague-czech-republic';
UPDATE public.universities SET early_deadline = '2027-02-14', regular_deadline = '2027-07-04' WHERE slug = 'university-of-newcastle-australia';
UPDATE public.universities SET regular_deadline = '2027-01-15' WHERE slug = 'university-of-north-carolina-at-chapel-hill-usa';
UPDATE public.universities SET regular_deadline = '2027-06-01' WHERE slug = 'university-of-north-carolina-at-charlotte-usa';
UPDATE public.universities SET regular_deadline = '2027-03-01' WHERE slug = 'university-of-north-carolina-at-greensboro-usa';
UPDATE public.universities SET website_domain = 'nye.hu', early_deadline = '2027-07-15' WHERE slug = 'university-of-ny-regyh-za-hungary';
UPDATE public.universities SET city = 'Norman, OK', tuition_display = '$47,500 / год', tuition_num = 47500, acceptance_rate = '68.9%', rate_num = 68.9, full_grant = TRUE, regular_deadline = '2027-02-01', lang = 'TOEFL 79', undergrad_enrollment = '22,819', intl_undergrad_pct = '4.9%', intl_undergrad_count = '1118', total_aid_millions = '$0.2m', intl_receiving_aid_pct = '4.2%', avg_aid_award = '$5,067', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '11%', countries_represented = '120', intl_acceptance_rate = '39.5%', intl_yield = '39.4%', merit_scholarship_name = 'Full ride N/S Info', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'university-of-oklahoma-usa';
UPDATE public.universities SET early_deadline = '2027-08-18' WHERE slug = 'university-of-opole-poland';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000, regular_deadline = '2027-01-15' WHERE slug = 'university-of-oregon-usa';
UPDATE public.universities SET early_deadline = '2027-03-01' WHERE slug = 'university-of-ottawa-canada';
UPDATE public.universities SET early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'university-of-oulu-finland';
UPDATE public.universities SET website_domain = 'ox.ac.uk', early_deadline = '2027-10-15' WHERE slug = 'university-of-oxford-uk';
UPDATE public.universities SET early_deadline = '2027-03-07', regular_deadline = '2027-03-07' WHERE slug = 'university-of-padua-italy';
UPDATE public.universities SET early_deadline = '2027-04-15' WHERE slug = 'university-of-pannonia-hungary';
UPDATE public.universities SET early_deadline = '2026-11-15' WHERE slug = 'university-of-pavia-italy';
UPDATE public.universities SET early_deadline = '2027-03-15', regular_deadline = '2027-03-15' WHERE slug = 'university-of-pisa-italy';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'university-of-pittsburgh-usa';
UPDATE public.universities SET tuition_display = '$65,000 / год', tuition_num = 65000, regular_deadline = '2027-01-15' WHERE slug = 'university-of-portland-usa';
UPDATE public.universities SET website_domain = 'pugetsound.edu', early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'university-of-puget-sound-usa';
UPDATE public.universities SET regular_deadline = '2027-05-31' WHERE slug = 'university-of-queensland-uq-australia';
UPDATE public.universities SET website_domain = 'redlands.edu', tuition_display = '$71,000 / год', tuition_num = 71000 WHERE slug = 'university-of-redlands-usa';
UPDATE public.universities SET website_domain = 'richmond.edu', early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'university-of-richmond-usa';
UPDATE public.universities SET early_deadline = '2026-12-01', regular_deadline = '2027-01-05' WHERE slug = 'university-of-rochester-usa';
UPDATE public.universities SET early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'university-of-salzburg-austria';
UPDATE public.universities SET tuition_display = '$71,000 / год', tuition_num = 71000, regular_deadline = '2026-12-15' WHERE slug = 'university-of-san-diego-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-15' WHERE slug = 'university-of-san-francisco-usa';
UPDATE public.universities SET early_deadline = '2027-05-15' WHERE slug = 'university-of-saskatchewan-canada';
UPDATE public.universities SET website_domain = 'uos.ac.kr', early_deadline = '2027-10-01', regular_deadline = '2027-04-26' WHERE slug = 'university-of-seoul-south-korea';
UPDATE public.universities SET early_deadline = '2027-06-16' WHERE slug = 'university-of-sharjah-uae';
UPDATE public.universities SET early_deadline = '2027-07-14', regular_deadline = '2027-07-14' WHERE slug = 'university-of-siena-italy';
UPDATE public.universities SET early_deadline = '2027-07-08' WHERE slug = 'university-of-silesia-in-katowice-poland';
UPDATE public.universities SET website_domain = 'uni-sopron.hu', early_deadline = '2027-07-15' WHERE slug = 'university-of-sopron-hungary';
UPDATE public.universities SET early_deadline = '2027-03-15', regular_deadline = '2027-10-15' WHERE slug = 'university-of-south-australia-australia';
UPDATE public.universities SET early_deadline = '2027-04-30' WHERE slug = 'university-of-south-bohemia-czech-republic';
UPDATE public.universities SET city = 'Columbia, SC', tuition_display = '$50,000 / год', tuition_num = 50000, acceptance_rate = '72.3%', rate_num = 72.3, early_deadline = '2027-10-15', regular_deadline = '2026-12-01', lang = 'TOEFL 77 6.5', undergrad_enrollment = '26,362', intl_undergrad_pct = '2.1%', intl_undergrad_count = '554', total_aid_millions = '$1.5m', intl_receiving_aid_pct = '29.2%', avg_aid_award = '$9,802', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Not req. Cons.', coa_after_aid_pct = '19%', intl_acceptance_rate = '57.2%', intl_yield = '15.8%', merit_scholarship_name = '$22,000 Info', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'university-of-south-carolina-usa';
UPDATE public.universities SET city = 'Tampa, FL', tuition_display = '$37,000 / год', tuition_num = 37000, acceptance_rate = '43.6%', rate_num = 43.6, regular_deadline = '2027-03-15', undergrad_enrollment = '31,772', intl_undergrad_pct = '7.0%', intl_undergrad_count = '2230', total_aid_millions = '$3.5m', intl_receiving_aid_pct = '17.5%', avg_aid_award = '$9,069', inst_type = 'Public / Research', sat = 'Обязательно', essay = 'Not req. Not used', coa_after_aid_pct = '25%', intl_acceptance_rate = '55.2%', intl_yield = '39.4%', inst_tags = ARRAY['public', 'research']::text[] WHERE slug = 'university-of-south-florida-tampa-usa';
UPDATE public.universities SET tuition_display = '$77,000 / год', tuition_num = 77000, regular_deadline = '2027-01-15' WHERE slug = 'university-of-southern-california-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-03-15' WHERE slug = 'university-of-southern-denmark-denmark';
UPDATE public.universities SET website_domain = 'st-andrews.ac.uk' WHERE slug = 'university-of-st-andrews-uk';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'university-of-st-gallen-switzerland';
UPDATE public.universities SET city = 'Paul, MN', tuition_display = '$61,200 / год', tuition_num = 61200, acceptance_rate = '84.2%', rate_num = 84.2, regular_deadline = 'Rolling', lang = 'TOEFL 80', undergrad_enrollment = '6,199', intl_undergrad_pct = '2.6%', intl_undergrad_count = '161', total_aid_millions = '$0.7m', intl_receiving_aid_pct = '18.5%', avg_aid_award = '$22,486', inst_type = 'Private / Research', sat = 'Обязательно', essay = 'Not req. Not used', coa_after_aid_pct = '37%', countries_represented = '24', inst_tags = ARRAY['private', 'research']::text[] WHERE slug = 'university-of-st-thomas-usa';
UPDATE public.universities SET early_deadline = '2027-01-15', regular_deadline = '2027-07-15' WHERE slug = 'university-of-stuttgart-germany';
UPDATE public.universities SET early_deadline = '2027-01-31', regular_deadline = '2027-06-30' WHERE slug = 'university-of-sydney-australia';
UPDATE public.universities SET early_deadline = '2027-04-30' WHERE slug = 'university-of-szeged-hungary';
UPDATE public.universities SET early_deadline = '2027-09-30', regular_deadline = '2027-10-31' WHERE slug = 'university-of-tasmania-australia';
UPDATE public.universities SET early_deadline = '2027-03-01', regular_deadline = '2027-04-30' WHERE slug = 'university-of-technology-sydney-uts-australia';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'university-of-tennessee-knoxville-usa';
UPDATE public.universities SET regular_deadline = '2027-08-01' WHERE slug = 'university-of-texas-at-arlington-usa';
UPDATE public.universities SET website_domain = 'utexas.edu', regular_deadline = '2026-12-01', aid_types = ARRAY['Both', 'Merit', 'Need-based']::text[] WHERE slug = 'university-of-texas-at-austin-usa';
UPDATE public.universities SET website_domain = 'utdallas.edu', regular_deadline = '2027-05-01' WHERE slug = 'university-of-texas-at-dallas-usa';
UPDATE public.universities SET website_domain = 'uniarts.fi', early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'university-of-the-arts-helsinki-finland';
UPDATE public.universities SET website_domain = 'uib.eu' WHERE slug = 'university-of-the-balearic-islands-spain';
UPDATE public.universities SET website_domain = 'uop.edu', tuition_display = '$69,000 / год', tuition_num = 69000, regular_deadline = '2027-01-15' WHERE slug = 'university-of-the-pacific-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'university-of-toledo-usa';
UPDATE public.universities SET website_domain = 'utoronto.ca', early_deadline = '2027-01-15' WHERE slug = 'university-of-toronto-canada';
UPDATE public.universities SET early_deadline = '2027-03-21', regular_deadline = '2027-03-21' WHERE slug = 'university-of-trieste-italy';
UPDATE public.universities SET website_domain = 'tsukuba.ac.jp', early_deadline = NULL WHERE slug = 'university-of-tsukuba-japan';
UPDATE public.universities SET early_deadline = '2027-05-14', regular_deadline = '2027-05-14' WHERE slug = 'university-of-turin-italy';
UPDATE public.universities SET early_deadline = '2027-01-20', regular_deadline = '2027-01-18' WHERE slug = 'university-of-turku-finland';
UPDATE public.universities SET city = 'City, UT', tuition_display = '$48,000 / год', tuition_num = 48000, acceptance_rate = '66.2%', rate_num = 66.2, regular_deadline = '2027-04-01', lang = 'TOEFL 80', undergrad_enrollment = '24,635', intl_undergrad_pct = '4.6%', intl_undergrad_count = '1133', total_aid_millions = '$0.2m', intl_receiving_aid_pct = '4.3%', avg_aid_award = '$3,941', inst_type = 'Public / Research', coa_after_aid_pct = '8%', countries_represented = '100', intl_acceptance_rate = '54.4%', intl_yield = '33.4%', merit_scholarship_name = '$9,000 International Student ScholarshipInfo', inst_tags = ARRAY['public', 'research']::text[], aid_types = ARRAY['Merit', 'Both']::text[] WHERE slug = 'university-of-utah-usa';
UPDATE public.universities SET tuition_display = '$60,000 / год', tuition_num = 60000 WHERE slug = 'university-of-vermont-usa';
UPDATE public.universities SET website_domain = 'univet.hu' WHERE slug = 'university-of-veterinary-medicine-hungary';
UPDATE public.universities SET website_domain = 'vetmeduni.ac.at', early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'university-of-veterinary-medicine-vienna-austria';
UPDATE public.universities SET early_deadline = '2027-04-01' WHERE slug = 'university-of-victoria-canada';
UPDATE public.universities SET website_domain = 'univie.ac.at', early_deadline = '2027-09-05', regular_deadline = '2027-02-05' WHERE slug = 'university-of-vienna-austria';
UPDATE public.universities SET regular_deadline = '2027-01-01', undergrad_enrollment = '16,655', intl_undergrad_pct = '4.4%', intl_undergrad_count = '733', sat = 'Обязательно', essay = 'Не требуется', countries_represented = '72', intl_acceptance_rate = '16.1%', intl_yield = '20.7%' WHERE slug = 'university-of-virginia-usa';
UPDATE public.universities SET early_deadline = '2027-06-13' WHERE slug = 'university-of-warsaw-poland';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000, regular_deadline = '2026-11-15' WHERE slug = 'university-of-washington-seattle-usa';
UPDATE public.universities SET early_deadline = '2027-02-27' WHERE slug = 'university-of-waterloo-canada';
UPDATE public.universities SET early_deadline = '2027-03-31' WHERE slug = 'university-of-west-bohemia-czech-republic';
UPDATE public.universities SET website_domain = 'uni-sopron.hu' WHERE slug = 'university-of-west-hungary-hungary';
UPDATE public.universities SET early_deadline = '2027-06-01' WHERE slug = 'university-of-windsor-canada';
UPDATE public.universities SET tuition_display = '$54,000 / год', tuition_num = 54000, regular_deadline = '2027-02-01' WHERE slug = 'university-of-wisconsin-madison-usa';
UPDATE public.universities SET early_deadline = '2027-08-05' WHERE slug = 'university-of-wollongong-australia';
UPDATE public.universities SET website_domain = 'uz.zgora.pl' WHERE slug = 'university-of-zielona-g-ra-poland';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'university-of-zurich-switzerland';
UPDATE public.universities SET regular_deadline = NULL WHERE slug = 'university-og-valencia-spain';
UPDATE public.universities SET early_deadline = '2027-02-01', regular_deadline = '2027-02-01' WHERE slug = 'uppsala-university-sweden';
UPDATE public.universities SET early_deadline = '2026-11-15', regular_deadline = 'Rolling' WHERE slug = 'utica-college-usa';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'utrecht-university-netherlands';
UPDATE public.universities SET tuition_display = '$57,000 / год', tuition_num = 57000, regular_deadline = 'Rolling' WHERE slug = 'valparaiso-university-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'vanderbilt-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-09' WHERE slug = 'vassar-college-usa';
UPDATE public.universities SET early_deadline = '2027-05-31', regular_deadline = '2027-05-31' WHERE slug = 'vidzeme-university-of-applied-sciences-latvia';
UPDATE public.universities SET early_deadline = '2026-12-15', regular_deadline = '2027-01-15' WHERE slug = 'villanova-university-usa';
UPDATE public.universities SET early_deadline = '2027-02-15' WHERE slug = 'virginia-commonwealth-university-in-qatar-qatar';
UPDATE public.universities SET tuition_display = '$54,000 / год', tuition_num = 54000, regular_deadline = '2027-01-16' WHERE slug = 'virginia-commonwealth-university-usa';
UPDATE public.universities SET tuition_display = '$59,000 / год', tuition_num = 59000 WHERE slug = 'virginia-military-institute-usa';
UPDATE public.universities SET website_domain = 'vse.cz', regular_deadline = '2027-04-30' WHERE slug = 'vse-czech-republic';
UPDATE public.universities SET early_deadline = '2027-04-01', regular_deadline = '2027-04-01' WHERE slug = 'vu-brussel-belgium';
UPDATE public.universities SET early_deadline = '2027-04-01', regular_deadline = '2027-04-01' WHERE slug = 'vu-university-amsterdam-netherlands';
UPDATE public.universities SET early_deadline = '2027-10-15', regular_deadline = '2027-01-15' WHERE slug = 'wabash-college-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000 WHERE slug = 'wagner-college-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-01' WHERE slug = 'wake-forest-university-usa';
UPDATE public.universities SET tuition_display = '$53,000 / год', tuition_num = 53000 WHERE slug = 'warren-wilson-college-usa';
UPDATE public.universities SET website_domain = 'sggw.edu.pl', early_deadline = '2027-07-09' WHERE slug = 'warsaw-university-of-life-sciences-poland';
UPDATE public.universities SET early_deadline = '2027-08-02' WHERE slug = 'warsaw-university-of-technology-poland';
UPDATE public.universities SET tuition_display = '$56,000 / год', tuition_num = 56000 WHERE slug = 'wartburg-college-usa';
UPDATE public.universities SET early_deadline = '2027-02-25' WHERE slug = 'waseda-university-japan';
UPDATE public.universities SET name = 'Washington and Lee University', tuition_display = '$57,285 / год', tuition_num = 57285, need_blind = TRUE, aid_max = 'Full Ride; $66,108', aid_num = 66108, early_deadline = '2027-11-01', regular_deadline = '2027-01-01', lang = '6.5', undergrad_enrollment = '1,827', intl_undergrad_pct = '3.5%', intl_undergrad_count = '64', total_aid_millions = '$3.3m', intl_receiving_aid_pct = '92.2%', avg_aid_award = '$55,926', inst_type = 'Private / LAC', intl_aid_policy = 'need-aware', notes = 'Tier 1: NEED-BLIND (INTL.) + FULL NEED MET | Need-blind + no-loan policy for all admitted students | Aid form: CSS Profile', how_apply_aid = 'Johnson Scholarsip (apply by December 1) CSS Profile', coa_after_aid_pct = '78%', merit_scholarship_name = 'Full ride The Guy T. Carswell ScholarshipInfo', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Full funding', 'Need-based', 'Merit', 'both']::text[] WHERE slug = 'washington-and-lee-usa';
UPDATE public.universities SET regular_deadline = 'Rolling' WHERE slug = 'washington-state-university-usa';
UPDATE public.universities SET tuition_display = '$57,386 / год', tuition_num = 57386, aid_max = 'partial', aid_num = 38063, early_deadline = '2027-11-01', regular_deadline = '2027-01-04', lang = '6.5', undergrad_enrollment = '7,675', intl_undergrad_pct = '7.9%', intl_undergrad_count = '606', total_aid_millions = '$3.0m', intl_receiving_aid_pct = '13.1%', avg_aid_award = '$38,063', inst_type = 'Private / Research', majors = 'Engineering; Social Sciences; Biological and Biomedical Sciences; Business, Management, Marketing, and Related Support Services; and Psychology.', sat = 'По желанию', essay = '1 supp, 1 ps', coa_after_aid_pct = '49%', countries_represented = '50', intl_acceptance_rate = '6.4%', intl_yield = '36.0%', inst_tags = ARRAY['private', 'research']::text[], aid_types = ARRAY['Need-based', 'both', 'Merit', 'Both']::text[] WHERE slug = 'washington-university-in-st-louis-usa';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-08-01' WHERE slug = 'wayne-state-university-usa';
UPDATE public.universities SET early_deadline = '2027-04-30', regular_deadline = '2027-04-30' WHERE slug = 'webster-university-geneva-switzerland';
UPDATE public.universities SET early_deadline = '2027-09-28', regular_deadline = '2027-06-30' WHERE slug = 'webster-university-vienna-austria';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'weill-cornell-medical-college-in-qatar-qatar';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-08' WHERE slug = 'wellesley-college-usa';
UPDATE public.universities SET tuition_display = '$55,000 / год', tuition_num = 55000 WHERE slug = 'wentworth-institute-of-technology-usa';
UPDATE public.universities SET regular_deadline = '2027-01-01' WHERE slug = 'wesleyan-university-usa';
UPDATE public.universities SET regular_deadline = '2027-08-01' WHERE slug = 'west-virginia-university-usa';
UPDATE public.universities SET early_deadline = '2027-02-01' WHERE slug = 'western-university-canada';
UPDATE public.universities SET city = 'Salt Lake City, UT', tuition_display = '$53,100 / год', tuition_num = 53100, acceptance_rate = '92.7%', rate_num = 92.7, regular_deadline = 'Rolling', lang = 'TOEFL 79; IELTS 82 avg.', undergrad_enrollment = '2,030', intl_undergrad_pct = '5.1%', intl_undergrad_count = '104', total_aid_millions = '$1.6m', intl_receiving_aid_pct = '83.7%', avg_aid_award = '$18,003', inst_type = 'Private / Comp.U', sat = 'Обязательно', essay = 'Рекомендуется', coa_after_aid_pct = '34%', countries_represented = '44', intl_acceptance_rate = '21.6%', intl_yield = '28.6%', inst_tags = ARRAY['private']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'westminster-college-ut-usa';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000 WHERE slug = 'westmont-college-usa';
UPDATE public.universities SET city = 'Wheaton, IL', website_domain = 'wheaton.edu', tuition_display = '$51,000 / год', tuition_num = 51000, acceptance_rate = '85%', rate_num = 85, regular_deadline = '2027-01-10', lang = 'TOEFL 95; IELTS 105 rec. n/s', undergrad_enrollment = '2,391', intl_undergrad_pct = '2.9%', intl_undergrad_count = '69', total_aid_millions = '$0.7m', intl_receiving_aid_pct = '50.0%', avg_aid_award = '$21,116', inst_type = 'Private / LAC', sat = 'Обязательно', essay = 'Не требуется', coa_after_aid_pct = '38%', countries_represented = '21', intl_acceptance_rate = '23.9%', intl_yield = '45.5%', inst_tags = ARRAY['liberal_arts', 'private']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'wheaton-college-il-usa';
UPDATE public.universities SET website_domain = 'wheatoncollege.edu' WHERE slug = 'wheaton-college-ma-usa';
UPDATE public.universities SET city = 'Walla, WA', early_deadline = '2026-11-15', regular_deadline = '2027-01-15' WHERE slug = 'whitman-college-usa';
UPDATE public.universities SET tuition_display = '$66,000 / год', tuition_num = 66000 WHERE slug = 'whittier-college-usa';
UPDATE public.universities SET tuition_display = '$61,000 / год', tuition_num = 61000 WHERE slug = 'whitworth-college-usa';
UPDATE public.universities SET tuition_display = '$65,000 / год', tuition_num = 65000 WHERE slug = 'widener-university-usa';
UPDATE public.universities SET regular_deadline = '2027-01-09' WHERE slug = 'williams-college-usa';
UPDATE public.universities SET tuition_display = '$72,800 / год', tuition_num = 72800, regular_deadline = '2027-02-01', undergrad_enrollment = '4,435', intl_undergrad_pct = '10.7%', intl_undergrad_count = '475', total_aid_millions = '$8.3m', intl_receiving_aid_pct = '88.0%', avg_aid_award = '$19,824', inst_type = 'Private / LAC', sat = 'Рекомендуется', essay = 'Not req. Cons.', coa_after_aid_pct = '27%', countries_represented = '69', intl_acceptance_rate = '31.3%', intl_yield = '17.0%', inst_tags = ARRAY['tech', 'liberal_arts', 'private']::text[], aid_types = ARRAY['Need-based', 'Merit', 'Both']::text[] WHERE slug = 'worcester-polytechnic-institute-usa';
UPDATE public.universities SET website_domain = 'pwr.edu.pl', early_deadline = '2027-06-11' WHERE slug = 'wroclaw-university-of-science-and-technology-wrust-poland';
UPDATE public.universities SET early_deadline = '2026-11-26', regular_deadline = '2027-01-18' WHERE slug = 'xamk-university-finland';
UPDATE public.universities SET early_deadline = '2027-02-17', regular_deadline = '2027-06-01', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'yildiz-technical-university-istanbul-turkey';
UPDATE public.universities SET website_domain = 'yale-nus.edu.sg', early_deadline = '2027-01-15', regular_deadline = '2027-03-20' WHERE slug = 'yale-nus-college-singapore';
UPDATE public.universities SET early_deadline = '2027-11-01', regular_deadline = '2027-01-02' WHERE slug = 'yale-university-usa';
UPDATE public.universities SET website_domain = 'yalova.edu.tr' WHERE slug = 'yalova-niversitesi-turkey';
UPDATE public.universities SET tuition_display = '$64,000 / год', tuition_num = 64000 WHERE slug = 'yeshiva-university-usa';
UPDATE public.universities SET country = 'South Korea', website_domain = 'yeungnam.ac.kr' WHERE slug = 'yeungnam-university-korea';
UPDATE public.universities SET early_deadline = '2027-06-30' WHERE slug = 'yew-chung-college-of-early-childhood-education-hong-kong';
UPDATE public.universities SET country = 'South Korea', city = 'Seoul', website_domain = 'yonsei.ac.kr', tuition_display = 'KRW 10,600 / год', tuition_num = 10600, acceptance_rate = '18%', rate_num = 18, early_deadline = '2027-10-14', regular_deadline = '2027-04-07', lang = 'IELTS (не уточнен) TOEFL(не уточнен)', majors = 'Medicine & Business administration', sat = 'По желанию', essay = 'Self-Introduction & Study plan', aid_types = ARRAY['Scholarship']::text[] WHERE slug = 'yonsei-university-korea';
UPDATE public.universities SET early_deadline = NULL WHERE slug = 'york-university-canada';
UPDATE public.universities SET tuition_display = 'AED 75,000 / год', tuition_num = 20400, early_deadline = '2027-06-30' WHERE slug = 'zayed-university-uae';
UPDATE public.universities SET early_deadline = '2027-03-10', regular_deadline = '2027-03-10' WHERE slug = 'zhejiang-university-china';

-- Delete merged duplicate rows
DELETE FROM public.universities WHERE slug IN (
  'a-r-i-brahim-ecen-ahi-evran-niversitesi-turkey',
  'allegheny-college-partial-usa',
  'anadolu-niversitesi-turkey',
  'ankara-niversitesi-turkey',
  'arizona-state-university-tempe-usa',
  'at-l-m-niversitesi-turkey',
  'atat-rk-niversitesi-turkey',
  'ba-kent-niversitesi-turkey',
  'baruch-college-usa',
  'beloit-college-partial-usa',
  'bo-azi-i-niversitesi-turkey',
  'boston-university-partial-usa',
  'brandeis-university-partial-usa',
  'brandeis-usa',
  'brigham-young-university-provo-usa',
  'bryn-mawr-college-partial-usa',
  'california-institute-of-technology-caltech-usa',
  'california-polytechnic-state-university-usa',
  'california-state-university-long-beach-long-usa',
  'california-state-university-los-angeles-los-usa',
  'caltech-usa',
  'case-western-reserve-university-partial-usa',
  'centre-college-partial-usa',
  'clark-university-partial-usa',
  'college-of-the-atlantic-bar-usa',
  'college-of-wooster-partial-usa',
  'colorado-state-university-fort-collins-fort-usa',
  'columbia-university-college-and-seas-usa',
  'connecticut-colege-usa',
  'cornell-college-partial-usa',
  'cuny-bernard-m-baruch-college-usa',
  'dickinson-college-partial-usa',
  'dokuz-eyl-l-niversitesi-turkey',
  'earlham-college-partial-usa',
  'eberhard-karls-universit-t-t-bingen-germany',
  'eszterh-zy-k-roly-catholic-university-hungary',
  'f-rat-niversitesi-turkey',
  'florida-institute-usa',
  'franklin-w-olin-college-usa',
  'furman-university-partial-usa',
  'georgia-institute-usa',
  'gettysburg-college-partial-usa',
  'ghent-univeristy-belgium',
  'grinnel-college-usa',
  'hacettepe-niversitesi-turkey',
  'hendrix-college-partial-usa',
  'hobart-and-william-smith-colleges-partial-usa',
  'hobart-william-smith-usa',
  'hong-kong-university-of-science-and-technology-hkust-hong-kong',
  'hufs-south-korea',
  'i-stanbul-teknik-niversitesi-turkey',
  'illinois-institute-usa',
  'illinois-wesleyan-university-partial-usa',
  'indiana-u-purdue-usa',
  'indiana-university-usa',
  'ithaca-college-partial-usa',
  'k-roli-g-sp-r-university-of-the-reformed-church-in-hungary-hungary',
  'kadir-has-niversitesi-turkey',
  'kafkas-niversitesi-kahramanmara-turkey',
  'kaist-korea-advanced-institute-of-science-and-technology-korea',
  'knox-college-partial-usa',
  'ko-niversitesi-turkey',
  'lehigh-university-partial-usa',
  'long-island-university-liu-usa',
  'loyola-university-usa',
  'massachusetts-inst-of-technology-usa',
  'massachusetts-institute-usa',
  'meredith-college-partial-usa',
  'miami-university-oxford-usa',
  'missouri-university-usa',
  'mit-usa',
  'mt-holyoke-college-usa',
  'muhlenberg-college-partial-usa',
  'new-jersey-institute-usa',
  'new-york-institute-usa',
  'new-york-university-partial-usa',
  'north-carolina-state-university-raleigh-usa',
  'northwestern-usa',
  'oberlin-college-and-conservatory-usa',
  'ohio-state-university-columbus-usa',
  'ohio-state-university-main-campus-usa',
  'orta-do-u-teknik-niversitesi-turkey',
  'pamukkale-niversitesi-turkey',
  'penn-state-u-university-park-usa',
  'pepperdine-university-partial-usa',
  'pohang-university-south-korea',
  'purdue-university-west-lafayette-west-usa',
  'queen-x27-s-university-at-kingston-canada',
  'rensselaer-polytechnic-institute-partial-usa',
  'rensselaer-polytechnic-usa',
  'rhodes-college-partial-usa',
  'rochester-institute-of-usa',
  'rochester-institute-usa',
  'rose-hulman-institute-usa',
  's-t-i-mam-niversitesi-turkey',
  'sewanee-the-university-of-the-south-partial-usa',
  'sewanee-university-of-the-south-usa',
  'simon-fraser-university-sfu-canada',
  'skidmore-college-saratoga-springsny-usa',
  'soka-university-usa',
  'southern-methodist-university-partial-usa',
  'st-john-s-college-annapolis-md-usa',
  'st-john-s-college-santa-fe-nm-usa',
  'st-lawrence-university-partial-usa',
  'st-olaf-college-partial-usa',
  'stevens-institute-of-technology-partial-usa',
  'stevens-institute-usa',
  'sungkyunkwan-university-korea',
  'suny-binghamton-usa',
  'suny-stony-brook-usa',
  'susquehanna-college-usa',
  'susquehanna-university-partial-usa',
  'texas-a-m-university-college-station-college-usa',
  'the-college-usa',
  'trinity-college-usa',
  'trinity-university-partial-usa',
  'tulane-university-partial-usa',
  'u-of-illinios-chicago-usa',
  'uiversity-of-notre-dame-usa',
  'union-college-usa',
  'university-of-central-usa',
  'university-of-cincinnati-main-campus-usa',
  'university-of-colorado-usa',
  'university-of-hawaii-manoa-usa',
  'university-of-illinois-at-chicago-usa',
  'university-of-illinois-urbana-champaign-usa',
  'university-of-maryland-college-park-usa',
  'university-of-maryland-college-usa',
  'university-of-miami-partial-usa',
  'university-of-new-mexico-main-campus-usa',
  'university-of-north-carolina-chapel-hill-usa',
  'university-of-north-carolina-charlotte-usa',
  'university-of-oklahoma-norman-campus-usa',
  'university-of-rochester-partial-usa',
  'university-of-south-carolina-columbia-usa',
  'university-of-south-florida-main-campus-usa',
  'university-of-st-thomas-st-usa',
  'university-of-tennesee-knoxville-usa',
  'university-of-texas-austin-usa',
  'university-of-texas-dallas-usa',
  'university-of-tulsa-partial-usa',
  'university-of-usa',
  'university-of-utah-salt-lake-usa',
  'university-of-virginia-main-campus-usa',
  'uofwindsor-canada',
  'villanova-university-partial-usa',
  'washington-amp-lee-university-usa',
  'washington-university-usa',
  'westminster-college-usa',
  'wheaton-college-usa',
  'wittenberg-university-partial-usa',
  'worcester-polytechnic-institute-partial-usa',
  'worcester-polytechnic-usa',
  'y-ld-z-teknik-niversitesi-turkey',
  'yonsei-university-underwood-international-college-south-korea'
);

COMMIT;
