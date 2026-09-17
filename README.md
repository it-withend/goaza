# Goaza / Studyaza

Каталог университетов на **Next.js + Supabase**. Сайт: https://goaza.xyz

## Как работает

- Карточки вузов читаются из таблицы `universities` (Supabase).
- Поиск и фильтры требуют подписки на Telegram-канал `@studyaza`:
  1. Пользователь подписывается на канал
  2. Входит через Telegram Login Widget
  3. Сервер проверяет `getChatMember` ботом и ставит httpOnly cookie

## Env

Скопируй `.env.example` → `.env.local`:

| Variable | Описание |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL проекта |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | только для импорта |
| `TELEGRAM_BOT_TOKEN` | бот = **админ** канала `@studyaza` |
| `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` | username бота без `@` |
| `TELEGRAM_CHANNEL` | `@studyaza` |
| `AUTH_SECRET` | секрет подписи cookie |

У BotFather: `/setdomain` → `goaza.xyz` (и `www.goaza.xyz` / vercel preview при необходимости).

## Dev

```bash
npm install
npm run dev
```

## Import

```bash
npm run import:unis
```

Схема: `supabase/migrations/20260917_universities.sql`
