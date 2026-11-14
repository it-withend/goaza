// @vitest-environment node
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";

it("does not recolour every link on hover (yellow buttons would hide their text)", () => {
  const css = readFileSync("app/globals.css", "utf8");
  expect(css).not.toMatch(/(^|\n)a:hover\s*\{/);
});

it("keeps dark text on yellow call-to-action buttons when hovered", () => {
  const rules: [string, string][] = [
    ["components/site/site.module.css", ".headerCta:hover"],
    ["components/home/home.module.css", ".ctaMain:hover"],
    ["components/site/site.module.css", ".cta:hover"],
    ["components/uni/university.module.css", ".siteLink:hover"],
  ];
  for (const [file, sel] of rules) {
    const css = readFileSync(file, "utf8");
    const body = css.slice(css.indexOf(`${sel} {`)).split("}")[0];
    expect(body, `${file} ${sel}`).toMatch(/color:\s*var\(--sz-ink\)/);
  }
});
