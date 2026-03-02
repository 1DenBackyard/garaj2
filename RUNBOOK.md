# RUNBOOK
- Поднять с нуля: docker, clone, env, up, migrate.
- Обновить: pull + compose up -d --build.
- Бэкап: `scripts/backup_db.sh`.
- Откат: `scripts/restore_db.sh <dump.sql>`.
- Смена пароля админки: обновить `ADMIN_PASSWORD` + restart app.
- Проверка TG: отправить тестовую заявку с `/`.
- Troubleshooting: 502 (проверить app health), TG (token/chat_id), миграции (DATABASE_URL), volume permissions.
