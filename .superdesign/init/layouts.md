# Layouts

## `app/layout.tsx` — RootLayout
Global Russian-language document shell, metadata, favicon, and font loading.

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studyaza 2026 — Каталог университетов",
  description: "Каталог университетов и грантов для международных студентов",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,500;8..60,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

The current application has no reusable app-shell, sidebar, or footer. The header and catalog shell are embedded in `components/CatalogClient.tsx`; the redesign will split these into a public landing header and an authenticated dashboard shell.
