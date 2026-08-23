# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src/

RUN npx prisma generate
RUN npm run build

# ── Stage 2: Production ─────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# pg_isready is used by the entrypoint to wait for Postgres
RUN apk add --no-cache postgresql-client

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY docker-entrypoint.sh ./

RUN npm ci --omit=dev \
  && npm install prisma --no-save \
  && npx prisma generate \
  && sed -i 's/\r$//' docker-entrypoint.sh \
  && chmod +x docker-entrypoint.sh

COPY --from=builder /app/dist ./dist

EXPOSE 8000

ENTRYPOINT ["./docker-entrypoint.sh"]
