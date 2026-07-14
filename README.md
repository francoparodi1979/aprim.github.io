# Veritas Clinical Research

Marketing & patient-facing site for **Veritas Clinical Research**, led by Dr. Franco Parodi. Focused on COPD, asthma, and IPF clinical trials.

This is a **fully static site** — no backend, no database, no server runtime. It's exported with `next build` (`output: "export"`) and deployed to **GitHub Pages**. The contact form posts to **Formspree**.

## Stack

- **Next.js 15** (App Router, RSC, static export) + TypeScript + Tailwind v4
- **MDX** for study content (`gray-matter` + `next-mdx-remote`, frontmatter validated with Zod at build time)
- **Formspree** for the contact form (no first-party form handling)
- **GitHub Pages** for hosting (via GitHub Actions, `.github/workflows/deploy.yml`)

## Layout

```
src/
├── app/
│   ├── page.tsx           # home (incl. full 13-trial portfolio grid)
│   ├── about/ patients/ physicians/ sponsors/ contact/
│   ├── studies/[slug]/    # study detail pages from MDX (no listing page — home grid is the catalog)
│   ├── _styles/           # page-scoped CSS-in-TS strings
│   ├── sitemap.ts robots.ts
├── components/            # SiteNav, SiteFooter, ContactForm (Formspree), visuals
├── content/
│   └── studies/           # MDX with structured frontmatter
└── lib/
    └── content/           # MDX loader + Zod schema, shared PORTFOLIO + CAPABILITIES data
```

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

That's it — no Docker, no database, no env vars required. `NEXT_PUBLIC_SITE_URL` (optional) only affects canonical URLs in sitemap/robots/metadata; to override locally, create a `.env.local` containing `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.

## Contact form

`src/components/ContactForm.tsx` posts name / email / phone / optional message to Formspree (`https://formspree.io/f/mrengwkd`). Submissions arrive by email. Includes a `_gotcha` honeypot for bots. To change the destination, edit `FORMSPREE_ENDPOINT` in that file.

The form intentionally tells visitors **not** to include medical details — see PHI posture below.

## Studies content

Add a study by dropping an MDX file into `src/content/studies/`. Frontmatter is validated at build time by the Zod schema in `src/lib/content/studies.ts` — typos fail the build, not production. The home page's 13-trial portfolio grid is a separate hardcoded list in `src/app/page.tsx` (`PORTFOLIO`) — update both when a study's status changes.

## HIPAA / PHI posture

This is a brochure site. The only data collected is the contact form: name, email, phone, and a free-text message (with copy explicitly asking visitors not to include medical details). No health questionnaires, no structured medical data, no database. Detailed screening happens by phone and in person under HIPAA authorization.

## Deploy

Push to `main` → GitHub Actions builds the static export and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).

One-time repo setup:

1. **Settings → Pages → Source: GitHub Actions**
2. Custom domain: add the GoDaddy domain in Settings → Pages, then in GoDaddy DNS add the `A`/`AAAA` records for GitHub Pages (or `CNAME` → `<user>.github.io` for the `www` subdomain) and enable **Enforce HTTPS**.
3. If the canonical domain changes, update `NEXT_PUBLIC_SITE_URL` in the workflow file.

Local production build:

```bash
npm run build      # static site emitted to out/
npx serve out      # optional: preview the exported site
```

## Scripts

| Command             | What                          |
| ------------------- | ----------------------------- |
| `npm run dev`       | Next dev server               |
| `npm run build`     | Static export → `out/`        |
| `npm run typecheck` | `tsc --noEmit`                |
