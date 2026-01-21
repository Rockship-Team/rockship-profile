# Implementation Plan: Supabase Integration for Blog Page

**Branch**: `003-supabase-blog-integration` | **Date**: 2026-01-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-supabase-blog-integration/spec.md`

## Summary

Replace static blog data (`lib/blog-data.ts`) with Supabase database storage. Implement admin panel at `/admin/post` with basic auth (env credentials) for CRUD operations. Maintain existing blog URLs and user experience while enabling dynamic content management.

## Technical Context

**Language/Version**: TypeScript 5.8.x with React 19, Next.js 16
**Primary Dependencies**: Supabase JS Client (`@supabase/supabase-js`), existing stack (Next.js, Tailwind CSS v4, Framer Motion, shadcn/ui)
**Storage**: Supabase (PostgreSQL) - hosted database with Row Level Security
**Testing**: Manual testing per Constitution (visual, mobile, accessibility), Lighthouse audits
**Target Platform**: Web (Next.js App Router), responsive design (320px to 1440px)
**Project Type**: Web application (Next.js)
**Performance Goals**: Blog page loads < 2s, search response < 500ms, 60 FPS desktop, 30+ FPS mobile
**Constraints**: Must maintain existing blog URLs, 99.9% database operation success rate
**Scale/Scope**: Up to 1000 blog posts, single admin user via basic auth

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality First | ✅ PASS | TypeScript strict mode, components in designated folders, cn() utility |
| II. Testing Standards | ✅ PASS | Manual testing on Desktop/Mobile, Lighthouse audits 90+/100/95+ |
| III. UX Consistency | ✅ PASS | Loading states for async, error states with recovery, consistent transitions |
| IV. Performance Requirements | ✅ PASS | FCP < 1.8s, LCP < 2.5s, CLS < 0.1, lazy loading for admin panel |

**Quality Gates**:
- `pnpm build` must complete without errors
- `pnpm lint` must pass with zero warnings
- Visual review on desktop and mobile required
- No new accessibility violations

## Project Structure

### Documentation (this feature)

```text
specs/003-supabase-blog-integration/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── api.yaml         # OpenAPI spec for blog endpoints
└── tasks.md             # Phase 2 output (created by /speckit.tasks)
```

### Source Code (repository root)

```text
# Next.js App Router structure (existing)
app/
├── blog/
│   ├── page.tsx                    # Blog listing (UPDATE: use Supabase)
│   ├── BlogPageClient.tsx          # Client component (UPDATE: use Supabase)
│   └── [slug]/
│       ├── page.tsx                # Blog detail (UPDATE: use Supabase)
│       └── BlogDetailClient.tsx    # Client component
├── admin/
│   └── post/
│       ├── page.tsx                # Admin panel (NEW)
│       ├── AdminPostClient.tsx     # Admin client component (NEW)
│       └── [id]/
│           └── page.tsx            # Edit post page (NEW)

components/
├── blog/                           # Existing blog components
└── admin/                          # Admin UI components (NEW)
    ├── PostForm.tsx                # Create/Edit post form
    ├── PostList.tsx                # List posts for admin
    └── DeleteConfirmDialog.tsx     # Deletion confirmation

lib/
├── supabase/
│   ├── client.ts                   # Supabase browser client (NEW)
│   ├── server.ts                   # Supabase server client (NEW)
│   └── types.ts                    # Database types (NEW)
├── blog-data.ts                    # DEPRECATED: replaced by Supabase
└── blog-utils.ts                   # Keep: utility functions

actions/
└── blog.ts                         # Server actions for blog CRUD (NEW)

types/
└── blog.ts                         # Existing types (UPDATE: add Supabase types)
```

**Structure Decision**: Using existing Next.js App Router structure. New admin routes at `app/admin/post/`. Supabase client utilities in `lib/supabase/`. Server actions in `actions/` per CLAUDE.md conventions.

## Complexity Tracking

> No violations to track - all principles satisfied with standard patterns.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
