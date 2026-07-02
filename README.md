# nasa-fan-be

Nest.js + TypeScript API for NASA Fan. Deployed on **Render**; connects to **Docker Postgres** locally and **Render PostgreSQL** in production.

## Prerequisites

- Node.js 20+
- Docker (for local Postgres)

## Quick start

```bash
cp .env.example .env
npm install
docker compose up -d
npm run db:migrate
npm run db:seed   # optional
npm run dev
```

- Health: [http://localhost:3000/api/health](http://localhost:3000/api/health)
- Missions: [http://localhost:3000/api/missions](http://localhost:3000/api/missions)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start:prod` | Run production build |
| `npm run db:up` | Start local Postgres (Docker) |
| `npm run db:down` | Stop local Postgres |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:migrate:deploy` | Run migrations (production) |
| `npm run db:seed` | Seed sample missions |

## Environment

| Variable | Local | Production (Render) |
|----------|-------|---------------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5433/nasa_fan` | Set automatically from Render Postgres |

## Deployment

See [docs/render-setup.md](./docs/render-setup.md).

## Architecture

- **Nest.js** — API framework (`src/`)
- **Prisma** — ORM and migrations (`prisma/`)
- **Docker Compose** — local Postgres on port 5433

## API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Database connectivity check |
| `/api/missions` | GET | List all missions (newest first) |
