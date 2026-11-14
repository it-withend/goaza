import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/site/SiteHeader";
import { PlanCta } from "@/components/site/PlanCta";
import { PROFILE_KEY } from "@/lib/profile";
import { LangProvider } from "@/components/i18n/LangProvider";

const pathname = { current: "/" };
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const profile = {
  grade: "11",
  budget: 0,
  countries: [],
  english: { test: "ielts", score: 7 },
  sat: null,
  grades: "good",
  major: "",
  updatedAt: "2026-11-14T00:00:00Z",
};

const status = (body: unknown) =>
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(body))));

beforeEach(() => {
  window.localStorage.clear();
  pathname.current = "/";
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("guests get the public catalog and guides", async () => {
  status({ subscribed: false, username: null });
  render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "Вузы" })).toHaveAttribute("href", "/unis");
  expect(screen.getByRole("link", { name: "Гайды" })).toHaveAttribute("href", "/guides");
  expect(await screen.findByRole("link", { name: "Составить план" })).toHaveAttribute("href", "/plan/start");
});

it("does not send someone with a saved plan back to the survey", async () => {
  status({ subscribed: false, username: null });
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  render(<SiteHeader />);
  expect(await screen.findByRole("link", { name: "Открыть план" })).toHaveAttribute("href", "/plan");
  expect(screen.queryByRole("link", { name: "Составить план" })).not.toBeInTheDocument();
});

it("subscribers see one navigation with plan, full catalog and guide", async () => {
  status({ subscribed: true, username: "student" });
  render(<SiteHeader />);
  expect(await screen.findByRole("link", { name: "Каталог вузов" })).toHaveAttribute("href", "/dashboard");
  expect(screen.getByRole("link", { name: "Гайд абитуриента" })).toHaveAttribute("href", "/dashboard/guide");
  expect(screen.getByRole("link", { name: "Мой план" })).toHaveAttribute("href", "/plan");
});

it("shows the account and logout inside the dashboard", async () => {
  status({ subscribed: true, username: "student" });
  const onLogout = vi.fn();
  render(<SiteHeader account={{ name: "student", onLogout }} />);
  expect(screen.getByText("@student")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /выйти/i }));
  expect(onLogout).toHaveBeenCalledOnce();
});

it("plan call to action opens the saved plan", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  render(<PlanCta className="x" />);
  expect(await screen.findByRole("link", { name: "Открыть мой план" })).toHaveAttribute("href", "/plan");
});

it("speaks Uzbek on /uz and keeps links inside the Uzbek site", async () => {
  status({ subscribed: false, username: null });
  pathname.current = "/uz/unis";
  render(
    <LangProvider lang="uz">
      <SiteHeader />
    </LangProvider>,
  );
  const unis = screen.getByRole("link", { name: "Universitetlar" });
  expect(unis).toHaveAttribute("href", "/uz/unis");
  expect(unis).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Mening rejam" })).toHaveAttribute("href", "/uz/plan");
  expect(screen.getByRole("link", { name: /русский/i })).toHaveAttribute("href", "/unis");
  expect(await screen.findByRole("link", { name: "Reja tuzish" })).toHaveAttribute("href", "/uz/plan/start");
});

it("offers the Uzbek version of the current page", () => {
  status({ subscribed: false, username: null });
  pathname.current = "/grants";
  render(<SiteHeader />);
  expect(screen.getByRole("link", { name: /o'zbek/i })).toHaveAttribute("href", "/uz/grants");
});
