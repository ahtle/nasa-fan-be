# NASA Fan API

Nest.js backend for the NASA Fan app. Serves JSON APIs under `/api/*`.

## Sister project

| Repo | Path | Role |
|------|------|------|
| **nasa-fan** | `../nasa-fan` | Frontend — Next.js app (APOD, image gallery) |
| **nasa-fan-be** | this repo | Backend — Nest.js API + Prisma + PostgreSQL |

The frontend and backend are **separate git repos** as sibling folders under `~/Sites/`.

- Local API: `http://localhost:3001`
- Local frontend: `http://localhost:3000` (nasa-fan Next.js default)
- CORS allows `FRONTEND_URL` (default `http://localhost:3000`)

When adding endpoints, consider what the **nasa-fan** frontend will need. Check `../nasa-fan` for existing API usage and UI patterns before designing response shapes.

## Authentication

- **JWT Bearer tokens** — `POST /api/auth/login` and `/api/auth/register` return `{ accessToken, user }`
- FE sends `Authorization: Bearer <token>` on protected requests
- Protected: `GET /api/auth/me` — use `JwtAuthGuard` from `src/auth/guards/jwt-auth.guard.ts` for new protected routes
- Public (no auth): `/api/health`, `/api/missions`, auth register/login/logout
- Demo user after seed: `demo@nasa-fan.test` / `password123`

## Stack

- **Nest.js** — `src/`
- **Prisma** — `prisma/` (schema, migrations, seed)
- **PostgreSQL** — Docker locally (`docker compose`), Render in production

## Conventions

- Global API prefix: `api` (e.g. `/api/health`, `/api/missions`)
- Prisma models: camelCase fields, `@@map("snake_case_table")`, `@map("snake_case_column")` where needed
- Env: use `.env` (not `.env.local` — that was Next.js)
