# Rockship — company site

Marketing site for Rockship: homepage, case studies, events, a Supabase-backed
blog, and a small admin area for authoring posts.

Built with Next.js 16 (App Router) and React 19, TypeScript, and Tailwind CSS v4.

## Getting started

This project uses **Bun** as both package manager and runtime. npm, pnpm and
yarn are not supported — `bun.lock` is the only lockfile, and the postinstall
allow-list lives in `trustedDependencies` in `package.json`.

```bash
curl -fsSL https://bun.sh/install | bash   # if you don't have it
bun install
cp .env.local.example .env.local           # then fill in the values below
bun --bun run dev                          # http://localhost:3000
```

The Bun version is pinned in `.bun-version` (currently 1.3.14); CI reads it via
`oven-sh/setup-bun`.

### Scripts

| Command | What it does |
| --- | --- |
| `bun --bun run dev` | Dev server with Turbopack |
| `bun --bun run build` | Production build |
| `bun --bun run start` | Serve the production build |
| `bun run lint` | ESLint via `next lint` |
| `bun run analyze` | Bundle analysis — builds with webpack and writes `analyze-client.html` |

### Why `--bun`

Next.js ships a `#!/usr/bin/env node` shebang, so a plain `bun run dev` hands
execution to **Node** — Bun only acts as the task runner. The `--bun` flag
forces the Bun runtime to execute Next itself. Both work; `--bun` is what this
project standardises on, including the Vercel build command in
`.github/workflows/ci-cd.yml`.

There is no test suite in the repo. `bunx tsc --noEmit` is the quickest
correctness check before committing.

## Environment variables

`.env.local.example` covers Supabase and admin auth. The AI and email keys are
**not** in that file yet but are read at runtime:

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Blog, admin | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Blog, admin | Client-safe, RLS-protected |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin writes | Server-side only |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | `/admin` login | Single shared credential |
| `RESEND_API_KEY` | Contact form email | |
| `NEXT_PUBLIC_GEMINI_API_KEY` | AI assistant, editor AI | |
| `NEXT_PUBLIC_GROQ_API_KEY` | AI assistant | |

Everything is optional for local development — the blog and admin degrade
without Supabase, the contact form logs an error without a Resend key, and the
AI services no-op without their keys.

Two things worth knowing about the keys:

- `app/api/contact/route.ts` still falls back to `NEXT_PUBLIC_RESEND_API_KEY`
  so existing deploys keep working. That name exposes the key to the browser.
  Rename the deploy variable to `RESEND_API_KEY`, rotate the key, then drop the
  fallback.
- The Gemini and Groq keys are `NEXT_PUBLIC_*` because their services run
  client-side. They are shipped to the browser. Scope and rate-limit them
  accordingly, or move those calls behind a route handler.

## Layout

Conventions are enforced by `CLAUDE.md` / `AGENTS.md`: pages in `app/`, API
routes in `app/api/`, server actions in `actions/`, components in `components/`,
docs in `docs/`, types in `types/`.

```
app/                    Routes (App Router)
  page.tsx              Homepage — composed from components/home/*
  events/               Events listing
  case-studies/         Index, five hand-written pages, plus a [slug] route
  blog/                 Blog index and [slug], read from Supabase
  contact/              Standalone contact page
  admin/                Post authoring, cookie-gated by proxy.ts
  api/contact           Contact form → Resend
  api/chat              AI assistant endpoint
components/
  home/                 The current homepage: Nav, Hero, Services, Team, …
  blog/ case-studies/ admin/ ui/
  landing/ pages/       Legacy pre-rebrand components — unreferenced, kept for
                        reference only. Do not build on these.
lib/
  home-content.ts       All homepage/events copy and data (TEAM, EVENTS, …)
  data.ts               Legacy landing-page content
  supabase/             Browser client, server client, queries, storage, types
actions/                auth.ts, blog.ts
services/               Gemini, Groq, editor AI, knowledge base
hooks/                  Performance, motion, feature-flag, scroll helpers
supabase/migrations/    Blog tables and RLS policies
docs/                   Optimization guide, rebrand research and copy
specs/                  Spec-kit feature specs (001–003)
```

### Routing note

This project uses Next.js's **`proxy.ts`**, not `middleware.ts` — the middleware
file convention is deprecated. `proxy.ts` gates `/admin/*` on an `admin_session`
cookie and redirects to `/admin/login`.

## The homepage

`app/page.tsx` composes `components/home/*` in order: Hero, Marquee, Services,
WhyRockship, Selection, CaseStudies, Career, Team, Faq, FinalCTA.

Two things to know when editing it:

- **Copy lives in `lib/home-content.ts`**, not in the components. Team members,
  events, case study summaries, FAQ entries and contact details are all there.
  `EVENTS_ARE_PLACEHOLDER` gates a warning banner on `/events`.
- **Styling is scoped to `.rk`**, defined near the bottom of `app/globals.css`.
  It is a light theme (`--rk-paper`, `--rk-ink`, `--rk-hair`, and a single
  accent `--rk-accent`) deliberately isolated from the dark blog/admin surfaces.
  The rebrand rationale is in `docs/rebrand/research-v2.md`.

`components/home/Nav.tsx` is shared by the homepage and `/events`. Its tabs are
homepage section anchors, so it checks `usePathname()` and emits `/#services`
rather than `#services` when rendered off the homepage. Add a route that reuses
this nav and it will keep working; add a section to the homepage and you need a
matching entry in `TABS`.

## Blog and admin

Posts live in Supabase. Apply `supabase/migrations/` to a project, optionally
seed with `supabase/seed.sql`, and set the three Supabase variables. RLS policies
in `002_blog_rls_policies.sql` allow anonymous reads of published posts only.

`/admin` is protected by a single username/password pair checked against env
vars, with a base64 session cookie. It is deliberately simple and is not a
multi-user auth system — treat the credentials as a shared secret.

## Feature flags

`FeatureFlagProvider` reads flags from the URL and persists them to
localStorage:

```
?featureFlag=blog          enable
?disableFlag=blog          disable
?clearFlags=true           clear all
```

Wrap gated UI in `components/FeatureFlag.tsx`.

## Performance

`next.config.js` enables the React Compiler, `optimizePackageImports` for
framer-motion / lucide-react / radix, and AVIF+WebP image output. The 3D and
animation work adapts to device capability via `hooks/use3DPerformance.ts` and
`hooks/useAnimationTier.ts`, and honours `prefers-reduced-motion` throughout —
`components/home/Reveal.tsx` disables its scroll reveals outright when set.

`docs/OPTIMIZATION_GUIDE.md` has the detail.
