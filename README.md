# Goaza / Studyaza

Каталог университетов на Next.js + Supabase. Сайт: https://goaza.xyz

## Возможности
- Каталог из БД Supabase (1213 вузов)
- Поиск и фильтры только после проверки подписки на Telegram `@studyaza`
- Telegram Login Widget + `getChatMember`

## Локально
```bash
cp .env.example .env.local
# заполнить ключи
npm install
npm run dev
```

## Env
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `TELEGRAM_BOT_TOKEN` — бот должен быть **админом** канала `@studyaza`
- `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME` — username бота без `@`
- `TELEGRAM_CHANNEL=@studyaza`
- `AUTH_SECRET` — случайная строка для cookie

## Импорт каталога
Временно нужны write-политики RLS (или service role), затем:
```bash
npm run import:unis
```

Источник: `E:\goo\USAfiles\_extract\merged_catalog.json`
