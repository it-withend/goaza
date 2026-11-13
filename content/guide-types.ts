export type Block =
  | { p: string }
  | { list: string[]; ordered?: boolean }
  | { steps: { title: string; text: string }[] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string; tone?: "info" | "warn" | "tip" }
  | { links: { label: string; href: string }[] };

export type GuideSection = { id: string; title: string; blocks: Block[] };

export type Guide = {
  slug: string;
  title: string;
  /** What the reader will be able to do after reading. */
  summary: string;
  /** Position on the applicant path (1–5); 0 = reference. */
  stage: 0 | 1 | 2 | 3 | 4 | 5;
  minutes: number;
  sections: GuideSection[];
  related?: string[];
};
