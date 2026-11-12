#!/usr/bin/env node
/**
 * Turn scripts/logo-output/domains.json ({ slug: domain }) into one SQL statement that
 * fills website_domain only where it is still empty. Prints SQL to stdout.
 *   node scripts/domains-to-sql.mjs > fill-domains.sql
 */
import fs from "node:fs";

const file = process.argv[2] || "scripts/logo-output/domains.json";
const map = JSON.parse(fs.readFileSync(file, "utf8"));
const DOMAIN = /^[a-z0-9.-]+\.[a-z]{2,}$/;
const SLUG = /^[a-z0-9-]+$/;
const pairs = Object.entries(map).filter(([slug, d]) => SLUG.test(slug) && DOMAIN.test(d));
if (!pairs.length) {
  console.error("nothing to write");
  process.exit(1);
}
const values = pairs.map(([slug, d]) => `('${slug}','${d}')`).join(",\n  ");
process.stdout.write(`update public.universities u
set website_domain = v.domain
from (values
  ${values}
) as v(slug, domain)
where u.slug = v.slug and (u.website_domain is null or u.website_domain = '');
`);
