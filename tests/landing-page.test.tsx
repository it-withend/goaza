import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LandingPage } from "@/components/landing/LandingPage";

afterEach(cleanup);

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/components/landing/WorldGlobe", () => ({
  WorldGlobe: () => <div>Globe</div>,
}));

vi.mock("@/components/TelegramLogin", () => ({
  TelegramLogin: ({ onSubscribed }: { onSubscribed: (name: string) => void }) => (
    <button onClick={() => onSubscribed("student")}>Telegram test login</button>
  ),
}));

describe("LandingPage", () => {
  it("shows only factual database metrics and opens Telegram gate", async () => {
    render(
      <LandingPage
        stats={{
          total: 1213,
          countries: 31,
          grants: 419,
          byCountry: [
            { country: "USA", count: 400 },
            { country: "UK", count: 80 },
          ],
        }}
        botUsername="goazabot"
      />,
    );
    expect(screen.getByText("1000+")).toBeInTheDocument();
    expect(screen.queryByText(/100%/)).not.toBeInTheDocument();
    const tgLinks = screen.getAllByRole("link", { name: /^telegram$/i });
    expect(tgLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of tgLinks) expect(link).toHaveAttribute("href", "https://t.me/studyaza");
    await userEvent.click(screen.getByRole("button", { name: /открыть атлас/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /открыть канал в telegram/i })).toHaveAttribute(
      "href",
      "https://t.me/studyaza",
    );
  });

  it("switches preview tabs and toggles FAQ items", async () => {
    render(
      <LandingPage
        stats={{
          total: 1058,
          countries: 29,
          grants: 300,
          byCountry: [
            { country: "USA", count: 496 },
            { country: "Turkey", count: 115 },
          ],
        }}
        botUsername="goazabot"
      />,
    );

    const deadlinesTab = screen.getByRole("tab", { name: /дедлайны 2026\/2027/i });
    await userEvent.click(deadlinesTab);
    expect(deadlinesTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/Никаких перепутанных дат/i)).toBeInTheDocument();

    const faqBtn = screen.getByRole("button", { name: /Откуда берутся данные/i });
    await userEvent.click(faqBtn);
    expect(faqBtn).toHaveAttribute("aria-expanded", "true");
  });
});
