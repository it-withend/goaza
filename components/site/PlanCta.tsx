"use client";

import Link from "@/components/i18n/Link";
import { useTr } from "@/components/i18n/LangProvider";
import { useApplicant } from "@/lib/use-applicant";

/** "Build my plan" for newcomers, "Open my plan" once a profile is saved — never re-runs the survey. */
export function PlanCta({
  className,
  start,
  open,
}: {
  className?: string;
  start?: string;
  open?: string;
}) {
  const tr = useTr();
  const { ready, profile } = useApplicant();
  const has = ready && Boolean(profile);
  return (
    <Link href={has ? "/plan" : "/plan/start"} className={className}>
      {has ? (open ?? tr("Открыть мой план", "Mening rejamni ochish")) : (start ?? tr("Составить мой план", "Rejamni tuzish"))}
    </Link>
  );
}
