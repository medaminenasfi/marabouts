#!/bin/sh
set -e

echo "⏳ Waiting for PostgreSQL to be ready..."

DB_HOST="${POSTGRES_HOST:-postgres}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_USER="${POSTGRES_USER:-marabouts}"

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" > /dev/null 2>&1; do
  echo "   PostgreSQL is unavailable – retrying in 2s..."
  sleep 2
done

echo "✅ PostgreSQL is ready."

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "🚀 Starting Marabouts backend..."
exec node dist/server.js
