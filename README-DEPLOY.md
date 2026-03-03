# Deploy VM (Docker)
- Установить Docker + compose plugin.
- Настроить DNS на IP VM.
- `cp .env.production.example .env.production` и заполнить секреты.
- `docker compose up -d --build`
- Миграции: `docker compose exec app pnpm prisma migrate deploy`
- Логи: `docker compose logs -f app nginx db`
- Обновление: `git pull && docker compose up -d --build`
- TLS: вариант 1 (по умолчанию) certbot + nginx; вариант 2 (опционально) Traefik.
