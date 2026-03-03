#!/usr/bin/env bash
set -euo pipefail
file=${1:?usage: restore_db.sh <dump.sql>}
cat "$file" | docker compose exec -T db psql -U negaraj negaraj
