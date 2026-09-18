# Theme

## Compact token summary

- Framework: Next.js 15 + React 19.
- UI library: custom React components; no component library.
- CSS: global vanilla CSS in `app/globals.css`.
- Fonts: `Manrope` for UI/body; `Source Serif 4` for brand and headings.
- Background: `#f3f6f8` with pale teal and peach radial gradients.
- Surface: `#ffffff`.
- Text: `#15202b`; muted: `#5b6b79`.
- Brand: deep teal `#0f4c5c`; soft teal `#e6f2f4`.
- Accent: orange `#e36414`; soft orange `#fff1e6`.
- Success: `#1b7f4e`; warning/error families use warm amber/rust.
- Border: `#d7e0e8`.
- Radius: 12–16px for controls/cards, full pills for tags.
- Shadow: `0 10px 30px rgba(15,35,50,.06)`.
- Content width: 1180px.
- Breakpoints: 960px, 900px, 720px, 420px.

## Raw source

```css
:root {
  --bg: #f3f6f8;
  --surface: #fff;
  --ink: #15202b;
  --muted: #5b6b79;
  --line: #d7e0e8;
  --brand: #0f4c5c;
  --brand-soft: #e6f2f4;
  --accent: #e36414;
  --accent-soft: #fff1e6;
  --ok: #1b7f4e;
  --ok-bg: #e7f7ee;
  --no: #9a3412;
  --no-bg: #ffedd5;
  --maybe: #854d0e;
  --maybe-bg: #fef3c7;
  --shadow: 0 10px 30px rgba(15, 35, 50, 0.06);
  --radius: 16px;
  --max: 1180px;
}
body {
  margin: 0;
  font-family: Manrope, system-ui, sans-serif;
  color: var(--ink);
  line-height: 1.5;
  background:
    radial-gradient(1200px 500px at 10% -10%, #d9eef2 0%, transparent 55%),
    radial-gradient(900px 400px at 100% 0%, #ffe8d6 0%, transparent 50%),
    var(--bg);
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(14px);
  background: rgba(243, 246, 248, 0.94);
  border-bottom: 1px solid rgba(215, 224, 232, 0.9);
}
.btn, .check {
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  font: inherit;
  font-weight: 700;
  box-shadow: var(--shadow);
}
.uni-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px;
  box-shadow: var(--shadow);
}
```

No Tailwind configuration or theme provider exists.
