# Studyaza Academic Night — UI redesign

Approved 2026-09-19. Mobile-first. Non-profit student atlas.

## Brand

| Token | Hex | Use |
|-------|-----|-----|
| ink | `#1A1A1A` | Text, logo mark |
| muted | `#5C5C5C` | Secondary |
| paper | `#F7F7F5` | Page |
| white | `#FFFFFF` | Surfaces |
| gold | `#D4A017` | Primary CTA / accents |
| graphite | `#2C2C2C` | Map / dark panels |

Logo: transparent PNG, **no artificial dark plate**.

## Landing (one screen)

Header + hero/map + metrics only. Richer atmosphere (grid, gold eyebrow rule) without new sections. Mobile: header wraps; no clipped buttons; sticky CTA with safe-area.

## Dashboard

Remove Explorer rail and dead bottom-nav. Top chrome: brand · filters · account · logout. Cards navigate to `/dashboard/u/[slug]`. No in-page detail sidebar. Hide map toggle until map exists.

## University page

Server page `/dashboard/u/[slug]`: Unsplash campus hero (deterministic by slug) + logo + all DB fields. Back to `/dashboard`. Auth-gated like dashboard.

## Mobile

Touch ≥44px; no horizontal overflow; filters as bottom sheet; stacked cards; adaptive header.