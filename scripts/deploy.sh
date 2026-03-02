#!/usr/bin/env bash
set -euo pipefail
git pull
docker compose build app
docker compose up -d
docker compose exec app pnpm prisma migrate deploy || true
