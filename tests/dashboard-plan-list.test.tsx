import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import type { CatalogUni } from "@/lib/catalog";
import { LIST_KEY } from "@/lib/profile";
import { computeMeta } from "@/lib/universities";

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }), usePathname: () => "/dashboard" }));
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const uni: CatalogUni = {
  slug: "bilkent-university-turkey",
  name: "Bilkent University",
  country: "Turkey",
  city: "Ankara",
  full_grant: true,
  need_blind: false,
  inst_tags: [],
  aid_types: [],
  deadline: null,
  tuition_display: null,
  tuition_num: null,
  acceptance_rate: null,
  rate_num: null,
  aid_max: null,
  aid_num: null,
  total_aid_millions: null,
  total_aid_num: null,
  intl_receiving_aid_pct: null,
  avg_aid_award: null,
  avg_aid_num: null,
  intl_aid_policy: null,
  lang: null,
  sat: null,
  logo: false,
  s: "bilkent university turkey",
};

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

it("adds to the same capped plan list the cabinet uses", async () => {
  const full = Array.from({ length: 30 }, (_, i) => `u-${i}`);
  window.localStorage.setItem(LIST_KEY, JSON.stringify(full));
  render(<DashboardClient initial={[uni]} meta={computeMeta([uni])} accountName="student" />);
  await userEvent.click(await screen.findByRole("button", { name: /добавить bilkent university в мой план/i }));
  expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toHaveLength(30);
});
