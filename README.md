# NeGaraj

Fullstack лендинг+CRM для автосервиса BMW.

## Запуск локально
1. `cp .env.example .env`
2. `pnpm i`
3. `pnpm prisma:migrate`
4. `pnpm dev`

## Telegram
- Создайте бота через @BotFather.
- Получите `TELEGRAM_BOT_TOKEN`.
- Добавьте бота в группу/канал админом.
- Узнайте `TELEGRAM_CHAT_ID` через getUpdates.

## Прод
См. `README-DEPLOY.md`, `RUNBOOK.md`.

## Команды
- `pnpm lint`
- `pnpm test`
- `pnpm test:visual`
