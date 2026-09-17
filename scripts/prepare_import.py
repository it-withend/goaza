# -*- coding: utf-8 -*-
"""Prepare university rows as JSON chunks for Supabase import."""
from __future__ import annotations
import json
import re
from pathlib import Path

SRC = Path(r"E:\goo\USAfiles\_extract\merged_catalog.json")
OUT = Path(r"E:\goo\goaza\scripts\import_chunks")
OUT.mkdir(parents=True, exist_ok=True)

COUNTRY_RU = {
    "Australia": "Австралия", "Austria": "Австрия", "Belgium": "Бельгия",
    "Canada": "Канада", "China": "Китай", "Czech Republic": "Чехия",
    "Denmark": "Дания", "Finland": "Финляндия", "France": "Франция",
    "Germany": "Германия", "Hong Kong": "Гонконг", "Hungary": "Венгрия",
    "Italy": "Италия", "Japan": "Япония", "Latvia": "Латвия",
    "Netherlands": "Нидерланды", "Poland": "Польша", "Portugal": "Португалия",
    "Qatar": "Катар", "Singapore": "Сингапур", "South Korea": "Южная Корея",
    "Spain": "Испания", "Sweden": "Швеция", "Switzerland": "Швейцария",
    "Turkey": "Турция", "UK": "Великобритания", "USA": "США", "UAE": "ОАЭ",
    "Korea": "Корея",
}


def slugify(name: str, country: str, used: set[str]) -> str:
    base = re.sub(r"[^a-z0-9]+", "-", (name or "").lower()).strip("-") or "uni"
    c = re.sub(r"[^a-z0-9]+", "-", (country or "").lower()).strip("-")
    slug = f"{base}-{c}" if c else base
    if slug in used:
        i = 2
        while f"{slug}-{i}" in used:
            i += 1
        slug = f"{slug}-{i}"
    used.add(slug)
    return slug


def sql_str(v):
    if v is None:
        return "NULL"
    s = str(v).replace("\x00", "")
    return "'" + s.replace("'", "''") + "'"


def sql_num(v):
    if v is None or v == "":
        return "NULL"
    try:
        return str(float(v))
    except Exception:
        return "NULL"


def sql_bool(v):
    return "TRUE" if v is True else "FALSE"


def sql_text_arr(val):
    if not val:
        return "'{}'"
    if isinstance(val, list):
        parts = val
    else:
        parts = [p.strip() for p in str(val).split(",") if p.strip()]
    if not parts:
        return "'{}'"
    inner = ",".join('"' + p.replace("\\", "\\\\").replace('"', '\\"') + '"' for p in parts)
    return f"'{{{inner}}}'"


def row_to_sql(r, used):
    name = (r.get("name") or "").strip()
    country = (r.get("country") or "USA").strip()
    slug = slugify(name, country, used)
    aid_types = r.get("aid_type") or ""
    tags = r.get("inst_tags") or []
    if isinstance(tags, str):
        tags = [t for t in tags.split() if t]
    search = " ".join(
        str(x)
        for x in [
            name,
            country,
            COUNTRY_RU.get(country, ""),
            r.get("city"),
            r.get("majors"),
            r.get("aid_max"),
            r.get("notes"),
            r.get("inst_type"),
            r.get("intl_aid_policy"),
            aid_types,
            " ".join(tags) if isinstance(tags, list) else tags,
        ]
        if x
    ).lower()
    need_blind = bool(
        re.search(r"need-blind", f"{r.get('intl_aid_policy')} {r.get('notes')}", re.I)
    )
    cols = [
        sql_str(slug),
        sql_str(name),
        sql_str(country),
        sql_str(r.get("city") or None) if r.get("city") else "NULL",
        sql_str(r.get("tuition") or None) if r.get("tuition") else "NULL",
        sql_num(r.get("tuition_num")),
        sql_str(r.get("acceptance_rate") or None) if r.get("acceptance_rate") else "NULL",
        sql_num(r.get("rate_num")),
        sql_bool(r.get("full_grant") is True),
        sql_str(r.get("aid_max") or None) if r.get("aid_max") else "NULL",
        sql_num(r.get("aid_num")),
        sql_text_arr(aid_types),
        sql_str(r.get("early_deadline") or None) if r.get("early_deadline") else "NULL",
        sql_str(r.get("regular_deadline") or None) if r.get("regular_deadline") else "NULL",
        sql_str(r.get("lang") or None) if r.get("lang") else "NULL",
        sql_str(r.get("undergrad_enrollment") or None) if r.get("undergrad_enrollment") else "NULL",
        sql_str(r.get("intl_undergrad_pct") or None) if r.get("intl_undergrad_pct") else "NULL",
        sql_str(r.get("intl_undergrad_count") or None) if r.get("intl_undergrad_count") else "NULL",
        sql_str(r.get("total_aid_millions") or None) if r.get("total_aid_millions") else "NULL",
        sql_str(r.get("intl_receiving_aid_pct") or None) if r.get("intl_receiving_aid_pct") else "NULL",
        sql_str(r.get("avg_aid_award") or None) if r.get("avg_aid_award") else "NULL",
        sql_text_arr(tags),
        sql_str(r.get("inst_type") or None) if r.get("inst_type") else "NULL",
        sql_str(r.get("intl_aid_policy") or None) if r.get("intl_aid_policy") else "NULL",
        sql_bool(need_blind),
        sql_str(r.get("majors") or None) if r.get("majors") else "NULL",
        sql_str((r.get("notes") or "")[:800] or None) if r.get("notes") else "NULL",
        sql_str(r.get("living_note") or None) if r.get("living_note") else "NULL",
        sql_str(r.get("sat") or None) if r.get("sat") else "NULL",
        sql_str(r.get("essay") or None) if r.get("essay") else "NULL",
        sql_str(r.get("how_apply_aid") or None) if r.get("how_apply_aid") else "NULL",
        sql_str(r.get("coa_after_aid_pct") or None) if r.get("coa_after_aid_pct") else "NULL",
        sql_str(r.get("countries_represented") or None) if r.get("countries_represented") else "NULL",
        sql_str(r.get("intl_acceptance_rate") or None) if r.get("intl_acceptance_rate") else "NULL",
        sql_str(r.get("intl_yield") or None) if r.get("intl_yield") else "NULL",
        sql_str(r.get("merit_scholarship_name") or None) if r.get("merit_scholarship_name") else "NULL",
        sql_str(search),
    ]
    return "(" + ",".join(cols) + ")"


def main():
    rows = json.loads(SRC.read_text(encoding="utf-8"))
    used: set[str] = set()
    values = [row_to_sql(r, used) for r in rows if (r.get("name") or "").strip()]
    chunk_size = 40
    chunks = []
    header = """INSERT INTO public.universities (
  slug,name,country,city,tuition_display,tuition_num,acceptance_rate,rate_num,
  full_grant,aid_max,aid_num,aid_types,early_deadline,regular_deadline,lang,
  undergrad_enrollment,intl_undergrad_pct,intl_undergrad_count,total_aid_millions,
  intl_receiving_aid_pct,avg_aid_award,inst_tags,inst_type,intl_aid_policy,need_blind,
  majors,notes,living_note,sat,essay,how_apply_aid,coa_after_aid_pct,countries_represented,
  intl_acceptance_rate,intl_yield,merit_scholarship_name,search_text
) VALUES
"""
    conflict = """
ON CONFLICT (slug) DO UPDATE SET
  name=EXCLUDED.name, country=EXCLUDED.country, city=EXCLUDED.city,
  tuition_display=EXCLUDED.tuition_display, tuition_num=EXCLUDED.tuition_num,
  acceptance_rate=EXCLUDED.acceptance_rate, rate_num=EXCLUDED.rate_num,
  full_grant=EXCLUDED.full_grant, aid_max=EXCLUDED.aid_max, aid_num=EXCLUDED.aid_num,
  aid_types=EXCLUDED.aid_types, early_deadline=EXCLUDED.early_deadline,
  regular_deadline=EXCLUDED.regular_deadline, lang=EXCLUDED.lang,
  undergrad_enrollment=EXCLUDED.undergrad_enrollment,
  intl_undergrad_pct=EXCLUDED.intl_undergrad_pct,
  intl_undergrad_count=EXCLUDED.intl_undergrad_count,
  total_aid_millions=EXCLUDED.total_aid_millions,
  intl_receiving_aid_pct=EXCLUDED.intl_receiving_aid_pct,
  avg_aid_award=EXCLUDED.avg_aid_award, inst_tags=EXCLUDED.inst_tags,
  inst_type=EXCLUDED.inst_type, intl_aid_policy=EXCLUDED.intl_aid_policy,
  need_blind=EXCLUDED.need_blind, majors=EXCLUDED.majors, notes=EXCLUDED.notes,
  living_note=EXCLUDED.living_note, sat=EXCLUDED.sat, essay=EXCLUDED.essay,
  how_apply_aid=EXCLUDED.how_apply_aid, coa_after_aid_pct=EXCLUDED.coa_after_aid_pct,
  countries_represented=EXCLUDED.countries_represented,
  intl_acceptance_rate=EXCLUDED.intl_acceptance_rate, intl_yield=EXCLUDED.intl_yield,
  merit_scholarship_name=EXCLUDED.merit_scholarship_name, search_text=EXCLUDED.search_text,
  updated_at=now();
"""
    for i in range(0, len(values), chunk_size):
        chunk = values[i : i + chunk_size]
        sql = header + ",\n".join(chunk) + conflict
        path = OUT / f"chunk_{i // chunk_size:03d}.sql"
        path.write_text(sql, encoding="utf-8")
        chunks.append(path)
    print(f"rows={len(values)} chunks={len(chunks)} -> {OUT}")


if __name__ == "__main__":
    main()
