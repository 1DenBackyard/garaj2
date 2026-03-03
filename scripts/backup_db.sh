#!/usr/bin/env bash
set -euo pipefail
mkdir -p backups
f="backups/negaraj_$(date +%F_%H%M).sql"
docker compose exec -T db pg_dump -U negaraj negaraj > "$f"
find backups -type f -mtime +14 -delete
echo "$f"
