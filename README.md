# nasa-fan-be

Nest.js + TypeScript API for NASA Fan. Deployed on **Render**; connects to **Docker Postgres** locally and **Render PostgreSQL** in production.

**Frontend:** [nasa-fan](../nasa-fan) — sister Next.js repo on port **3000**. This API runs on port **3001**.

## Prerequisites

- Node.js 20+
- Docker (for local Postgres)

## Quick start

```bash
cp .env.example .env
npm install
docker compose up -d
npm run db:migrate
npm run db:seed
npm run dev
```

- Health: [http://localhost:3001/api/health](http://localhost:3001/api/health)
- Missions: [http://localhost:3001/api/missions](http://localhost:3001/api/missions)

### Demo user (after seed)

| Email | Password |
|-------|----------|
| `demo@nasa-fan.test` | `password123` |

```bash
# Login
curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@nasa-fan.test","password":"password123"}'

# Current user (replace TOKEN)
curl -s http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

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
| `npm run db:seed` | Seed missions + demo user |

## Environment

| Variable | Local | Production (Render) |
|----------|-------|---------------------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5433/nasa_fan` | Set automatically from Render Postgres |
| `JWT_SECRET` | Set in `.env` | Auto-generated via `render.yaml` |
| `JWT_EXPIRES_IN` | `7d` (default) | `7d` |
| `FRONTEND_URL` | `http://localhost:3000` | Your deployed frontend URL |

## Deployment

See [docs/render-setup.md](./docs/render-setup.md).

## Architecture

- **Nest.js** — API framework (`src/`)
- **Prisma** — ORM and migrations (`prisma/`)
- **Docker Compose** — local Postgres on port 5433
- **JWT** — Bearer token auth (`src/auth/`)

## API

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/health` | GET | Public | Database connectivity check |
| `/api/missions` | GET | Public | List all missions (newest first) |
| `/api/auth/register` | POST | Public | Create account, returns `{ accessToken, user }` |
| `/api/auth/login` | POST | Public | Login, returns `{ accessToken, user }` |
| `/api/auth/logout` | POST | Public | Acknowledge logout (FE clears token) |
| `/api/auth/me` | GET | Bearer JWT | Current user profile |
