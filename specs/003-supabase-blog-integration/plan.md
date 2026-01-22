# Implementation Plan: Supabase Integration for Blog Page

**Branch**: `003-supabase-blog-integration` | **Date**: 2026-01-21 | **Updated**: 2026-01-22 | **Spec**: [spec.md](./spec.md)
**Status**: Implementation Complete (Pending Manual Testing)
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
# Next.js App Router structure (CURRENT IMPLEMENTATION)
app/
├── blog/
│   ├── page.tsx                    # Blog listing (server component, fetches from Supabase)
│   ├── BlogPageClient.tsx          # Client component (search/filter UI)
│   ├── error.tsx                   # Error boundary for database failures
│   └── [slug]/
│       ├── page.tsx                # Blog detail (server component with SSR)
│       └── BlogDetailClient.tsx    # Client component
├── admin/
│   ├── layout.tsx                  # Admin layout with header/navigation
│   ├── page.tsx                    # Admin dashboard
│   └── post/
│       ├── page.tsx                # Admin post listing
│       ├── new/
│       │   └── page.tsx            # Create new post page
│       └── [id]/
│           └── page.tsx            # Edit post page

components/
├── blog/                           # Public blog components
│   ├── BlogGrid.tsx
│   ├── BlogCard.tsx
│   ├── BlogSearch.tsx
│   ├── TopicFilter.tsx
│   ├── BlogListSkeleton.tsx
│   ├── EmptyBlogState.tsx
│   ├── BlogContentRenderer.tsx
│   └── TableOfContents.tsx
└── admin/                          # Admin UI components
    ├── PostForm.tsx                # Create/Edit post form with Tiptap
    ├── PostList.tsx                # List posts for admin
    ├── DeleteConfirmDialog.tsx     # Deletion confirmation dialog
    ├── TiptapEditor.tsx            # Rich text editor wrapper
    ├── TagSection.tsx              # Tag management section
    ├── TagMultiSelect.tsx          # Multi-select for tags
    ├── TagFormModal.tsx            # Modal for creating/editing tags
    └── tiptap-extensions/          # Custom Tiptap extensions
        ├── index.ts
        ├── CalloutExtension.ts
        ├── CalloutNodeView.tsx
        ├── GridExtension.ts
        ├── GridNodeView.tsx
        ├── GridDropContext.tsx
        ├── ImageExtension.ts
        ├── ImageNodeView.tsx
        ├── TimelineExtension.ts
        ├── TimelineNodeView.tsx
        ├── SeriesCardExtension.ts
        ├── SeriesCardNodeView.tsx
        ├── NodeToolbar.tsx
        └── useResizable.ts

lib/
├── supabase/
│   ├── client.ts                   # Supabase browser client (anon key)
│   ├── server.ts                   # Supabase server client (service role)
│   ├── queries.ts                  # Database queries (getPublishedPosts, searchPosts, etc.)
│   ├── types.ts                    # Database TypeScript types
│   └── storage.ts                  # File storage utilities
├── auth.ts                         # Basic auth validation
├── blog-data.ts                    # DEPRECATED: kept for reference
└── blog-utils.ts                   # Utility functions

actions/
└── blog.ts                         # Server actions (searchBlogPosts, createPost, updatePost, deletePost)

types/
└── blog.ts                         # Blog type definitions (BlogPost, TopicTag, BlogFilterState)

supabase/
├── migrations/
│   ├── 001_create_blog_tables.sql  # Schema: blog_posts, blog_tags, blog_post_tags
│   └── 002_blog_rls_policies.sql   # Row Level Security policies
└── seed.sql                        # Seed data: 6 existing blog posts

proxy.ts                            # Next.js proxy config for admin auth
```

**Structure Decision**: Using existing Next.js App Router structure. Admin panel at `app/admin/` with dashboard and post management. Rich text editing via Tiptap with custom extensions. Supabase utilities in `lib/supabase/`. Server actions in `actions/` per CLAUDE.md conventions.

## Complexity Tracking

> Enhanced implementation with rich text editing and tag management.

| Enhancement | Why Added | Value Provided |
|-------------|-----------|----------------|
| Tiptap Rich Text Editor | Better content authoring experience | WYSIWYG editing with custom blocks (callouts, grids, timelines) |
| Tag Management UI | Admin needs to manage tags | Create, edit, delete tags directly from admin panel |
| Custom Tiptap Extensions | Rich content blocks for blog posts | Callout, Grid, Timeline, SeriesCard, Image extensions |
| Admin Dashboard | Central admin entry point | Overview and navigation for admin functions |
