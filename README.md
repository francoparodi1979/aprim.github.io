# APRIM

Marketing & patient-facing site for the **Advanced Pulmonary Research Institute of Michigan**, led by Dr. Franco Parodi. Focused on COPD, asthma, and IPF clinical trials.

## Stack

- **Next.js 15** (App Router, RSC) + TypeScript + Tailwind v4
- **Postgres** via [postgres-js](https://github.com/porsager/postgres) + **Drizzle ORM**
- **Resend** for transactional email
- **Cloudflare Turnstile** for bot protection
- **Upstash Redis** for distributed rate limiting (in-memory fallback for dev)
- **MDX** for study/team content

## Layout

```
src/
├── app/
│   ├── (pages)        # home, about, studies/, studies/[slug], patients, physicians, contact
│   └── api/           # /inquiry, /prescreen, /contact, /referral, /health
├── content/
│   └── studies/       # MDX with structured frontmatter
├── lib/
│   ├── api/           # response helpers
│   ├── content/       # MDX loaders
│   ├── db/            # Drizzle schema, client, migrate
│   ├── email/         # Resend client + HTML templates
│   ├── security/      # Turnstile, IP hashing, rate limit
│   └── validations/   # Zod schemas (shared client/server)
└── ...
```

## Local setup

1. **Install deps**

   ```bash
   npm install
   ```

2. **Spin up Postgres** (Docker)

   ```bash
   docker compose up -d
   ```

3. **Configure env**

   ```bash
   cp .env.example .env.local
   # Fill in RESEND_API_KEY and Turnstile keys when you have them.
   # The defaults work against the Docker Postgres above.
   ```

4. **Generate + apply schema**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run dev**

   ```bash
   npm run dev
   ```

   Site is at <http://localhost:3000>. Health probe: `/api/health`.

## Forms / API

All endpoints take JSON, validate with Zod, rate-limit per IP, verify Turnstile (skipped in dev if `TURNSTILE_SECRET_KEY` is unset), persist to Postgres, then fire notification + confirmation emails.

| Endpoint         | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `POST /api/inquiry`   | Patient "tell me more" — minimal info |
| `POST /api/prescreen` | Eligibility pre-screen for a study    |
| `POST /api/contact`   | Generic contact form                  |
| `POST /api/referral`  | Physician referral                    |
| `GET  /api/health`    | Uptime probe                          |

Responses follow `{ ok: true, data }` / `{ ok: false, error, fieldErrors? }`.

### Validation

`src/lib/validations/*` contains Zod schemas reusable on the client (form state) and server (request body). Each form schema includes a hidden `website` honeypot and a `turnstileToken` field.

### Forms checklist for the UI

When you wire up the visual forms, each `POST` body must include:

- All schema fields (see `src/lib/validations/*.ts`)
- `website: ""` (honeypot — leave empty)
- `turnstileToken: <token>` from the Turnstile widget

## Studies content

Add a new study by dropping an MDX file into `src/content/studies/`. The frontmatter schema is enforced at load time (`src/lib/content/studies.ts`); typos fail loud. `prescreenQuestions` defines the form rendered for that study's pre-screen.

## HIPAA / PHI posture

This site is **not** a HIPAA-covered application. We deliberately collect:

- **Inquiries / contact / referrals**: name, email, phone, free-text message
- **Pre-screens**: same plus year-of-birth (not full DOB) and structured Q&A defined per-study

We do **not** collect: full date of birth, SSN, MRN, diagnoses beyond the broad condition the patient self-identifies, medication lists, or imaging. Detailed PHI is collected in person at the screening visit under HIPAA authorization.

Defenses applied:

- IP addresses are SHA-256 hashed before storage (`src/lib/security/hash-ip.ts`)
- TLS is enforced via `Strict-Transport-Security` headers
- Rate limiting per IP × form
- Turnstile bot protection
- Postgres connection requires SSL in production (the `postgres` driver enforces it for `?sslmode=require` URLs)

If the scope grows to include PHI, this app needs to migrate to a HIPAA-compliant hosting environment with a BAA in place (e.g., Vercel Enterprise + a BAA-signed Postgres provider).

## Deploy

The app is Vercel-ready. Required env vars in production:

- `DATABASE_URL` (Postgres with `?sslmode=require`)
- `RESEND_API_KEY`
- `EMAIL_FROM`, `EMAIL_TO_INTERNAL`
- `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_SITE_URL` (canonical origin)

Run migrations once before first deploy: `npm run db:migrate`.

## Scripts

| Command              | What                                  |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Next dev server                       |
| `npm run build`      | Production build                      |
| `npm run typecheck`  | `tsc --noEmit`                        |
| `npm run db:generate`| Generate migration from schema diff   |
| `npm run db:migrate` | Apply pending migrations              |
| `npm run db:push`    | Push schema directly (dev only)       |
| `npm run db:studio`  | Drizzle Studio (browse the DB)        |
