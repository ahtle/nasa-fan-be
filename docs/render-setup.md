# Render deployment

Deploy the NASA Fan API and PostgreSQL to [Render](https://render.com) using the blueprint in `render.yaml`.

## Prerequisites

- GitHub repo with this project pushed
- [Render](https://render.com) account

## Deploy with Blueprint

1. In Render, click **New** → **Blueprint**.
2. Connect your GitHub repo and select the `nasa-fan-be` repository.
3. Render reads `render.yaml` and provisions:
   - **nasa-fan-db** — managed PostgreSQL (free tier)
   - **nasa-fan-api** — Node.js web service
4. Click **Apply** and wait for the first deploy to finish.

`DATABASE_URL` is wired automatically from the database to the web service.

## Run migrations (first deploy)

After the database is created, run migrations from your machine:

```bash
# Copy the Internal or External Database URL from the Render dashboard
export DATABASE_URL="postgresql://..."

npm run db:migrate:deploy
npm run db:seed   # optional
```

## Verify

```bash
curl https://nasa-fan-api.onrender.com/api/health
curl https://nasa-fan-api.onrender.com/api/missions
```

Replace the hostname with your actual Render service URL.

## Environment variables

| Variable | Set by | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | Render (from database) | PostgreSQL connection |
| `NODE_ENV` | `render.yaml` | `production` |
| `PORT` | Render (automatic) | HTTP port for the web service |

## Notes

- Free-tier web services spin down after inactivity; the first request may be slow.
- Free-tier Postgres expires after 90 days on Render — upgrade or export data before then.
- Migrations are not run automatically on deploy; run `db:migrate:deploy` after schema changes.
