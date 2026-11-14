"use client";

import { useEffect, useState } from "react";
import { useTr } from "@/components/i18n/LangProvider";

export function ToTop() {
  const tr = useTr();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      className={`to-top${show ? " show" : ""}`}
      aria-label={tr("Наверх", "Yuqoriga")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
