import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LandingPage } from "@/components/landing/LandingPage";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
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
        stats={{ total: 1213, countries: 31, grants: 419 }}
        botUsername="goazabot"
      />,
    );
    expect(screen.getByText("1 213")).toBeInTheDocument();
    expect(screen.queryByText(/100%/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /открыть атлас/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
