"""
Build fill-only updates for public.universities from the source files in D:/goo/goazaBD.

Rules:
- Never overwrite a non-empty value; only fill NULL / '' columns.
- full_grant is set to true only when >= 2 independent full-aid lists name the university.
- Output: a JSON report and SQL statements (one UPDATE per university).

Usage: python import_sources.py <src_dir> <db_rows.json> <out_dir>
  db_rows.json: [{slug, name, country, <current column values>...}]
"""
import json
import os
import re
import sys
import unicodedata

import openpyxl

SRC, DB_ROWS, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT, exist_ok=True)
rows = json.load(open(DB_ROWS, encoding="utf-8"))

STOP = {"the", "of", "at", "and", "in", "a", "partial", "main", "campus"}
ALIASES = {
    "nyuad": "new york university abu dhabi",
    "mit": "massachusetts institute technology",
    "caltech": "california institute technology",
    "uiversity notre dame": "university notre dame",
    "rice university": "rice university",
    "washington lee university": "washington lee university",
}


def fold(s: str) -> str:
    s = unicodedata.normalize("NFKD", str(s or "")).encode("ascii", "ignore").decode()
    s = s.replace("&#x27;", "'").replace("&amp;", "and").lower()
    s = re.sub(r"\(.*?\)", " ", s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    toks = [t for t in s.split() if t not in STOP]
    key = " ".join(toks)
    return ALIASES.get(key, key)


COUNTRY_SHEET = {"South Korea": {"Korea", "South Korea"}}

index: dict[str, list[dict]] = {}
for r in rows:
    index.setdefault(fold(r["name"]), []).append(r)


def match(name: str, country: str | None = None):
    k = fold(name)
    cands = index.get(k, [])
    if not cands:
        return []
    if country:
        allowed = COUNTRY_SHEET.get(country, {country})
        cc = [c for c in cands if c["country"] in allowed]
        return cc or cands
    return cands


updates: dict[str, dict] = {}
sources: dict[str, set] = {}
grant_votes: dict[str, set] = {}
unmatched: dict[str, list] = {}


def empty(v):
    return v is None or (isinstance(v, str) and not v.strip()) or (isinstance(v, (list, dict)) and not v)


def clean(v):
    if v is None:
        return None
    if isinstance(v, float) and v.is_integer():
        v = int(v)
    s = str(v).replace("\xa0", " ").strip()
    if not s or s.lower() in {"nan", "none", "-", "—", "n/a", "na", "#n/a", "#div/0!", "0", "x"}:
        return None
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}( 00:00:00)?", s):
        return None  # Excel turned values like "1-3" into dates — unusable
    return s


def money_fee(v):
    s = clean(v)
    if not s:
        return None
    m = re.search(r"(\d+(?:\.\d+)?)", s)
    if not m:
        return s if len(s) < 40 else None
    n = float(m.group(1))
    if n == 0:
        return "Бесплатно"
    cur = "€" if "€" in s or "eur" in s.lower() else "$"
    return f"{cur}{n:g}"


def thousands(v):
    """CDS sheets store 1553 as 1.553; small integers are noise."""
    if not isinstance(v, (int, float)):
        return None
    if not float(v).is_integer() and v < 100:
        v = v * 1000
    return int(round(v)) if v >= 10 else None


def pct(v):
    """0.073 -> '7.3%'; '7.3%' stays."""
    if v is None:
        return None
    if isinstance(v, (int, float)):
        if 0 < v <= 1:
            return f"{round(v * 100, 1):g}%"
        if 1 < v <= 100:
            return f"{round(v, 1):g}%"
        return None
    s = clean(v)
    return s if s and re.search(r"\d", s) else None


def put(row, col, val, src):
    if val is None or (isinstance(val, str) and not val.strip()):
        return
    if not empty(row.get(col)):
        return
    u = updates.setdefault(row["slug"], {})
    if col in u:
        return
    u[col] = val
    sources.setdefault(row["slug"], set()).add(src)


def note_unmatched(src, name):
    unmatched.setdefault(src, []).append(name)


# ---------- A. Universities List.xlsx (original catalog, per-country sheets) ----------
def load_universities_list():
    wb = openpyxl.load_workbook(os.path.join(SRC, "Universities List.xlsx"), read_only=True, data_only=True)
    for ws in wb.worksheets:
        for i, r in enumerate(ws.iter_rows(values_only=True)):
            if i < 3 or not r or not r[0]:
                continue
            name = clean(r[0])
            if not name:
                continue
            ms = match(name, ws.title)
            if not ms:
                note_unmatched("universities_list", f"{ws.title}: {name}")
                continue
            g = lambda j: r[j] if j < len(r) else None  # noqa: E731
            for row in ms:
                put(row, "lang", clean(g(9)), "universities_list")
                put(row, "sat", clean(g(10)), "universities_list")
                put(row, "essay", clean(g(11)), "universities_list")
                put(row, "recommendations", clean(g(12)), "universities_list")
                put(row, "app_fee", money_fee(g(13)), "universities_list")
                put(row, "apply_url", clean(g(14)) if str(g(14) or "").startswith("http") else None, "universities_list")
                put(row, "finaid_url", clean(g(16)) if str(g(16) or "").startswith("http") else None, "universities_list")
                put(row, "rank_national", clean(g(17)), "universities_list")
                put(row, "rank_world", clean(g(18)), "universities_list")
                put(row, "majors", clean(g(19)), "universities_list")
                put(row, "notes", clean(g(20)), "universities_list")


# ---------- B. Uni list full.xlsx (Common Data Set for US colleges) ----------
FACTOR_COLS = [
    "Rigor of secondary school", "Class rank", "Academic GPA", "Standardized test scores", "Application Essay",
    "Recommendation(s)", "Interview", "Extracurricular activities", "Talent/ability", "Character/personal qualities",
    "First generation", "Alumni/ae relation", "Geographical residence", "Volunteer work", "Work experience",
]
FACTOR_RU = {
    "Rigor of secondary school": "Сложность школьной программы",
    "Class rank": "Место в классе",
    "Academic GPA": "Средний балл",
    "Standardized test scores": "SAT/ACT",
    "Application Essay": "Эссе",
    "Recommendation(s)": "Рекомендации",
    "Interview": "Интервью",
    "Extracurricular activities": "Внеклассные активности",
    "Talent/ability": "Таланты",
    "Character/personal qualities": "Личные качества",
    "First generation": "Первый в семье в вузе",
    "Alumni/ae relation": "Родственники-выпускники",
    "Geographical residence": "Регион проживания",
    "Volunteer work": "Волонтёрство",
    "Work experience": "Опыт работы",
}
LEVEL_PREFIX = [("very imp", "Очень важно"), ("imp", "Важно"), ("not con", "Не учитывается"), ("con", "Учитывается")]


def level(v):
    v = str(v or "").strip().lower()
    for pre, ru in LEVEL_PREFIX:
        if v.startswith(pre):
            return ru
    return None


def load_cds():
    wb = openpyxl.load_workbook(os.path.join(SRC, "Uni list full.xlsx"), read_only=True, data_only=True)
    for ws in wb.worksheets:
        it = ws.iter_rows(values_only=True)
        header = [re.sub(r"\s+", " ", str(h or "")).strip() for h in next(it)]

        def col(prefix):
            for j, h in enumerate(header):
                if h.lower().startswith(prefix.lower()):
                    return j
            return None

        cols = {k: col(k) for k in [
            "Institution", "RD Acceptance Rate", "ED Acceptance Rate", "Additional Admission Plans", "Average Aid Award",
            "Full-Time Nonresident Aliens", "Percentage of Nonresident Aliens Receivi", "SAT 25th - 75th Percentile Reading",
            "SAT 25th - 75th Percentile Math", "Application Fee", "Fee Waiver", "Documents for fin aid", "Avarage GPA",
            "Most rated majors", "Top 5 majors", "Strong programms", "Need Blind", "Need Aware",
            "Language test required", "Separate essay required",
        ]}
        fcols = {f: col(f) for f in FACTOR_COLS}
        for r in it:
            g = lambda k: (r[cols[k]] if cols.get(k) is not None and cols[k] < len(r) else None)  # noqa: E731
            name = clean(g("Institution"))
            if not name:
                continue
            ms = match(name, "USA")
            if not ms:
                note_unmatched("cds", name)
                continue
            for row in ms:
                src = f"cds_{ws.title.lower()}"
                put(row, "rd_acceptance_rate", pct(g("RD Acceptance Rate")), src)
                put(row, "ed_acceptance_rate", pct(g("ED Acceptance Rate")), src)
                put(row, "early_rounds", clean(g("Additional Admission Plans")), src)
                aid = g("Average Aid Award")
                if isinstance(aid, (int, float)) and aid > 1000:
                    put(row, "avg_aid_award", f"${int(aid):,}", src)
                intl = thousands(g("Full-Time Nonresident Aliens"))
                if intl:
                    put(row, "intl_undergrad_count", f"{intl:,}".replace(",", " "), src)
                put(row, "intl_receiving_aid_pct", pct(g("Percentage of Nonresident Aliens Receivi")), src)
                rw, m = clean(g("SAT 25th - 75th Percentile Reading")), clean(g("SAT 25th - 75th Percentile Math"))
                if rw and m and re.search(r"\d{3}", rw) and re.search(r"\d{3}", m):
                    put(row, "sat", f"Reading&Writing {rw}, Math {m}", src)
                put(row, "app_fee", money_fee(g("Application Fee")), src)
                put(row, "fee_waiver", clean(g("Fee Waiver")), src)
                put(row, "aid_forms", clean(g("Documents for fin aid")), src)
                gpa = g("Avarage GPA")
                if isinstance(gpa, (int, float)) and 2 < gpa <= 4.5:
                    put(row, "avg_gpa", f"{gpa:.2f}", src)
                put(row, "majors", clean(g("Most rated majors") or g("Top 5 majors") or g("Strong programms")), src)
                if clean(g("Need Blind")) and str(g("Need Blind")).strip().lower() in {"x", "yes", "y", "1"}:
                    put(row, "intl_aid_policy", "need-blind", src)
                elif clean(g("Need Aware")) and str(g("Need Aware")).strip().lower() in {"x", "yes", "y", "1"}:
                    put(row, "intl_aid_policy", "need-aware", src)
                put(row, "lang", clean(g("Language test required")), src)
                put(row, "essay", clean(g("Separate essay required")), src)
                factors = {}
                for f, j in fcols.items():
                    if j is None or j >= len(r):
                        continue
                    lv = level(r[j])
                    if lv:
                        factors[FACTOR_RU[f]] = lv
                if len(factors) >= 5:
                    put(row, "admission_factors", factors, src)


# ---------- C. US universities with 100% financial aid.xlsx ----------
def load_us_full_aid():
    wb = openpyxl.load_workbook(os.path.join(SRC, "US universities with 100% financial aid.xlsx"), read_only=True, data_only=True)
    ws = wb.worksheets[0]
    for i, r in enumerate(ws.iter_rows(values_only=True)):
        if i == 0 or not r or not r[0]:
            continue
        name = clean(r[0])
        country = "UAE" if "Abu Dhabi" in str(r[1] or "") else "USA"
        ms = match(name, country)
        if not ms:
            note_unmatched("us_full_aid", name)
            continue
        for row in ms:
            if str(r[4] or "").lower().startswith("full"):
                grant_votes.setdefault(row["slug"], set()).add("us_full_aid_xlsx")
            put(row, "intl_aid_policy", clean(r[5]), "us_full_aid_xlsx")
            put(row, "aid_forms", clean(r[6]), "us_full_aid_xlsx")
            put(row, "css_fee_waiver", clean(r[7]), "us_full_aid_xlsx")


# ---------- D. Full-aid name lists (PDF text) ----------
def names_from_lines(path, pattern):
    if not os.path.exists(path):
        return []
    txt = open(path, encoding="utf-8", errors="ignore").read()
    return [m.group(1).strip() for m in re.finditer(pattern, txt, re.M)]


def load_lists(text_dir):
    lists = {
        "tsvirkkoo": names_from_lines(
            os.path.join(text_dir, "FULL LIST Universities with full aid @tsvirkkoo.txt"),
            r"^\s*\d+\.\s*([A-Z][A-Za-z.'&\- ]+?)(?:\s+-\s+need blind|\s*\(|\s*$)",
        ),
        "union86": names_from_lines(
            os.path.join(text_dir, "86_Университетов_—_Полное_Финансирование.pypdf.txt"),
            r"^UniOn\s*\n([A-Z][^\n]+)$",
        ),
        "ayfc": names_from_lines(
            os.path.join(text_dir, "UNI LIST BY AYFC @AYFCSOCIALS.txt"),
            r"^([A-Z][A-Z .&'\-]{5,})\n[A-Z ,.\-]+\nACCEPTANCE RATE",
        ),
    }
    for src, names in lists.items():
        for n in names:
            ms = match(n.title() if n.isupper() else n, "USA")
            if not ms:
                note_unmatched(src, n)
                continue
            for row in ms:
                grant_votes.setdefault(row["slug"], set()).add(src)
    return {k: len(v) for k, v in lists.items()}


def majors_from_union86(text_dir):
    p = os.path.join(text_dir, "86_Университетов_—_Полное_Финансирование.pypdf.txt")
    if not os.path.exists(p):
        return
    txt = open(p, encoding="utf-8", errors="ignore").read()
    for m in re.finditer(r"UniOn\s*\n([^\n]+)\n.*?majors:\s*([\s\S]+?)\n\s*Acceptance", txt):
        name, majors = m.group(1).strip(), re.sub(r"\s+", " ", m.group(2)).strip(" ,")
        for row in match(name, "USA"):
            put(row, "majors", majors, "union86")


TEXT_DIR = os.environ.get("SRC_TEXT", "")
load_universities_list()
load_cds()
load_us_full_aid()
list_sizes = load_lists(TEXT_DIR) if TEXT_DIR else {}
if TEXT_DIR:
    majors_from_union86(TEXT_DIR)

by_slug = {r["slug"]: r for r in rows}
grant_new = []
for slug, votes in grant_votes.items():
    # "PARTIAL" rows are the catalog's partial-aid duplicates — never upgrade them
    if len(votes) >= 2 and not by_slug[slug].get("full_grant") and "partial" not in slug:
        updates.setdefault(slug, {})["full_grant"] = True
        sources.setdefault(slug, set()).update(votes)
        grant_new.append((slug, sorted(votes)))

for slug, u in updates.items():
    u["sources"] = sorted(sources.get(slug, set()))
    u.setdefault("data_year", 2023)


def sql_val(v):
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, int):
        return str(v)
    if isinstance(v, dict):
        return "'" + json.dumps(v, ensure_ascii=False).replace("'", "''") + "'::jsonb"
    if isinstance(v, list):
        return "array[" + ",".join("'" + str(x).replace("'", "''") + "'" for x in v) + "]::text[]"
    return "'" + str(v).replace("'", "''") + "'"


stmts = []
for slug, u in sorted(updates.items()):
    sets = []
    for k, v in u.items():
        if k == "sources":
            sets.append(f"sources = (select array(select distinct unnest(coalesce(sources,'{{}}') || {sql_val(v)})))")
        elif k == "full_grant":
            sets.append("full_grant = true")
        elif k == "data_year":
            sets.append(f"data_year = coalesce(data_year, {v})")
        else:
            # fill-only guard in SQL as well, in case the DB changed since the snapshot
            sets.append(f"{k} = case when {k} is null or {k}::text = '' then {sql_val(v)} else {k} end")
    stmts.append(f"update public.universities set {', '.join(sets)} where slug = '{slug}';")

open(os.path.join(OUT, "updates.sql"), "w", encoding="utf-8").write("\n".join(stmts) + "\n")
col_counts: dict[str, int] = {}
for u in updates.values():
    for k in u:
        col_counts[k] = col_counts.get(k, 0) + 1
report = {
    "universities_updated": len(updates),
    "fields_filled": col_counts,
    "full_grant_added": grant_new,
    "list_sizes": list_sizes,
    "unmatched_counts": {k: len(v) for k, v in unmatched.items()},
    "unmatched_samples": {k: v[:25] for k, v in unmatched.items()},
}
json.dump(report, open(os.path.join(OUT, "report.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(updates, open(os.path.join(OUT, "updates.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(json.dumps({k: report[k] for k in ["universities_updated", "fields_filled", "unmatched_counts", "list_sizes"]}, ensure_ascii=False, indent=1))
print("full_grant_added", len(grant_new))
