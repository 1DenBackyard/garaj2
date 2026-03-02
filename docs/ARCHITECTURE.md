# ARCHITECTURE
Модули: Frontend (app/page), API (/api/lead,/api/track,/api/telegram/callback,/api/admin/*), DB (Prisma Lead/Event), Telegram Bot API, Admin (/admin), Tracking.
Маршруты: `/`, `/admin`, `/admin/login`, `/api/*`.
Принципы: App Router, критичные операции только через Route Handlers с логированием в БД.
