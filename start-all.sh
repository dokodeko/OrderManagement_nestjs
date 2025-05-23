#!/usr/bin/env bash
set -euo pipefail

echo "Stopping and removing old containers (including orphans)..."
docker compose down --remove-orphans     # ← no -v here

echo "Starting services..."
docker compose up -d db rabbitmq redis api frontend

echo "Waiting for Postgres..."
until docker compose exec db pg_isready -h localhost -U postgres > /dev/null 2>&1; do
  sleep 1
done

echo "Applying Prisma migrations..."
docker compose exec api npx prisma migrate deploy

echo "All services are up!"
echo "- API: http://localhost:4000"
echo "- UI:  http://localhost:3000"
