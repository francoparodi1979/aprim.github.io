# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check (no emit)
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:push      # Direct schema push (dev only — skips migration files)
npm run db:studio    # Open Drizzle Studio to browse DB
```

Start a local Postgres instance with `docker compose up -d` before running `npm run dev`.

## Architecture

**Stack**: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4, Drizzle ORM + PostgreSQL, Resend (email), Cloudflare Turnstile (bot protection), Upstash Redis (rate limiting).

### Page & Route Structure

All pages live under `src/app/`. Static marketing pages (`about`, `patients`, `physicians`, `contact`) are React Server Components. The studies section is content-driven:

- `studies/page.tsx` — lists all studies loaded from MDX
- `studies/[slug]/page.tsx` — renders a single study with its pre-screen form

API routes under `src/app/api/` handle four form submissions (`inquiry`, `prescreen`, `contact`, `referral`) plus a `health` probe. Every POST route follows the same pipeline: Zod validation → IP rate limit → Turnstile verification → Drizzle insert → fire-and-forget Resend email → JSON response.

### Content System

Studies are defined as MDX files in `src/content/studies/`. The YAML frontmatter is validated with a Zod schema in `src/lib/content/` and includes:
- Study metadata (`slug`, `title`, `condition`, `status`)
- `prescreenQuestions` — array of typed questions (`yes_no`, `single_choice`, `number`, `short_text`) that drive the dynamic pre-screen form on each study page

The MDX loader compiles frontmatter + body at request time via `next-mdx-remote`.

### Library Layout (`src/lib/`)

| Directory | Purpose |
|-----------|---------|
| `db/` | Drizzle schema, client singleton, migration helpers |
| `validations/` | Zod schemas for all four form types — imported by both API routes and client components |
| `security/` | IP hashing, Turnstile verification, Upstash rate-limit wrapper |
| `email/` | Resend client + HTML email templates |
| `content/` | MDX loader + frontmatter Zod schema |
| `api/` | `ok()`/`fail()` response helpers used by every API route |
| `env.ts` | Strict env var loader — add required vars here when introducing new services |

### Database Schema

Five tables, all in PostgreSQL via Drizzle:

- **`studies`** — mirrors MDX catalog, used for runtime state
- **`inquiries`**, **`prescreens`**, **`contacts`**, **`referrals`** — form submissions

All submission tables share: `ipHash` (SHA-256), `userAgent`, `status` enum (`new/contacted/qualified/declined/archived`), and UTC timestamps. Prescreen answers are stored as JSONB.

### Path Alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

## Environment Variables

Copy `.env.example` to `.env.local`. Production requires:

```
DATABASE_URL
RESEND_API_KEY, EMAIL_FROM, EMAIL_TO_INTERNAL
TURNSTILE_SECRET_KEY, NEXT_PUBLIC_TURNSTILE_SITE_KEY
UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_SITE_URL
```

The rate limiter falls back to in-memory when Upstash vars are absent, so local dev works without Redis.

## Key Design Decisions

- **RSC-first**: prefer Server Components; only use `"use client"` for interactivity (animations, forms, Turnstile widget).
- **Schema-driven forms**: Zod validation schemas in `src/lib/validations/` are the single source of truth — consumed by both API routes (server-side) and form components (client-side for instant feedback).
- **Fire-and-forget emails**: Resend calls are `void`-awaited so email failure doesn't block the API response.
- **Lazy DB connection**: The Drizzle client is a proxy that defers connection until first use, avoiding cold-start issues in serverless.
- **No HIPAA scope by design**: only name, email, phone, year-of-birth, and structured Q&A are collected — full DOB, medications, diagnoses, and imaging are explicitly excluded.
