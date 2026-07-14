# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Static export → out/ (this IS the production build)
npm run typecheck    # TypeScript check (no emit)
```

No database, no Docker, no required env vars. `NEXT_PUBLIC_SITE_URL` (optional) sets the canonical origin used by `sitemap.ts`, `robots.ts`, and `metadataBase`.

## Architecture

**Stack**: Next.js 15 App Router with `output: "export"` (fully static site), React 19, TypeScript (strict), Tailwind CSS v4, MDX study content, Formspree for the contact form.

**There is no backend.** The site is exported to plain HTML/CSS/JS in `out/` and served by GitHub Pages. Anything requiring a server (API routes, ISR/`revalidate`, response headers, image optimization) will break the build or silently not work — don't add them.

### Page structure

All pages live under `src/app/` and are React Server Components rendered at build time:

- Static marketing pages: `/`, `about`, `patients`, `physicians`, `sponsors`, `contact`
- `studies/[slug]/page.tsx` — renders one study (uses `generateStaticParams` + `dynamicParams = false`; both required for static export). There is intentionally **no** `/studies` listing page — the home page's `#studies` portfolio grid is the catalog, and all "see studies" links point to `/#studies`. `public/studies/index.html` is a meta-refresh stub that redirects bare `/studies/` hits there (static hosts can't do server redirects).
- The 13-trial `PORTFOLIO` array lives in `src/lib/content/portfolio.ts` (shared by the home grid and the sponsors table; `CAPABILITIES` in `src/lib/content/capabilities.ts` is shared by about + sponsors). It is intentionally separate from the MDX catalog — MDX studies get detail pages; portfolio-only entries deep-link to ClinicalTrials.gov.

Page-scoped CSS lives as template strings in `src/app/_styles/{home,subpages}.ts`, inlined via `<style>`; global tokens and animations in `src/app/globals.css`.

### Contact form (the only interactive feature)

`src/components/ContactForm.tsx` (`"use client"`) posts name/email/phone/message to Formspree (`https://formspree.io/f/mrengwkd`) via fetch with an inline success state; the native `action` attribute is kept as a no-JS fallback. Includes a `_gotcha` honeypot. There is deliberately **no** health questionnaire — the form copy asks visitors not to send medical details (keeps the site out of PHI/HIPAA scope).

### Content system

Studies are MDX files in `src/content/studies/`. Frontmatter is validated by the Zod schema in `src/lib/content/studies.ts` at load time (build fails loudly on schema errors). Loader compiles frontmatter + body via `next-mdx-remote/rsc`.

When a study's status changes, update **both** the MDX frontmatter and the `PORTFOLIO` array in `src/lib/content/portfolio.ts`.

### Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json`).

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and deploys to GitHub Pages. The workflow sets `NEXT_PUBLIC_SITE_URL=https://veritasclinical.org`; update it there if the domain changes. `public/.nojekyll` must remain (Pages would otherwise ignore `_next/` directories).

## Key design decisions

- **Static-first**: every page is pre-rendered at build time. `trailingSlash: true` and `images.unoptimized: true` are required for GitHub Pages.
- **No backend by design**: form handling is delegated to Formspree. The former Drizzle/Postgres/Resend/Turnstile backend was removed in July 2026 — see git history if it ever needs to be resurrected.
- **No PHI by design**: only name, email, phone, and a free-text message are collected, with explicit copy discouraging medical details.
