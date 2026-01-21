# Implementation Plan: Blog Page

**Branch**: `002-blog-page` | **Date**: 2026-01-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-blog-page/spec.md`

## Summary

Implement a blog page feature for the Rockship AI showcase website with:
- Blog listing page at `/blog` with search and topic filtering
- Blog detail pages at `/blog/[slug]` with two-column layout and sticky "On This Page" sidebar
- Static data storage (no database) with TypeScript types
- Consistent styling with existing Rockship design system (dark theme, glass morphism)

## Technical Context

**Language/Version**: TypeScript 5.x with React 19, Next.js 16
**Primary Dependencies**: Next.js App Router, Framer Motion, Tailwind CSS v4, Lucide React
**Storage**: Static TypeScript data in `lib/blog-data.ts` (no database)
**Testing**: Manual visual testing (desktop, mobile), Lighthouse audits
**Target Platform**: Web (all modern browsers)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: Lighthouse Performance 90+, Accessibility 100, 60 FPS animations
**Constraints**: Must follow existing Rockship design system, no external CMS
**Scale/Scope**: 6 blog posts initial, static generation for all pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Code Quality First
- [x] TypeScript strict mode enabled
- [x] Components in designated folders per CLAUDE.md
- [x] Use `cn()` utility for className composition
- [x] ESLint must pass with zero warnings

### II. Testing Standards
- [x] Manual testing on desktop and mobile viewports
- [x] Animation respects `prefers-reduced-motion`
- [x] Build completes without errors
- [x] Lighthouse targets: Performance 90+, Accessibility 100

### III. User Experience Consistency
- [x] Animations respect motion preferences
- [x] Glass morphism uses consistent parameters
- [x] Color palette uses theme colors only
- [x] Transitions use 200-300ms timing

### IV. Performance Requirements
- [x] Static generation for fast page loads
- [x] GPU-accelerated animations (transform, opacity)
- [x] Next.js Image component for optimized images
- [x] Lazy loading where appropriate

**Gate Status**: PASS - All constitution principles can be satisfied

## Project Structure

### Documentation (this feature)

```text
specs/002-blog-page/
├── plan.md              # This file
├── research.md          # Technical decisions and best practices
├── data-model.md        # Entity definitions and TypeScript types
├── quickstart.md        # Quick implementation guide
├── contracts/           # API contracts (README.md - no API needed)
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
# Next.js App Router structure
app/
├── blog/
│   ├── page.tsx              # Blog listing page (server component)
│   ├── BlogPageClient.tsx    # Client component with search/filter state
│   └── [slug]/
│       ├── page.tsx          # Blog detail page (server component)
│       └── BlogDetailClient.tsx  # Client component with TOC tracking

components/
├── blog/
│   ├── BlogCard.tsx          # Individual blog post card
│   ├── BlogGrid.tsx          # Responsive grid of cards
│   ├── BlogHero.tsx          # Hero section for listing page
│   ├── BlogSearch.tsx        # Search input component
│   ├── TopicFilter.tsx       # Topic filter pills
│   ├── EmptyState.tsx        # No results state
│   └── TableOfContents.tsx   # Sticky sidebar TOC component

types/
└── blog.ts                   # BlogPost, BlogSection, TopicTag, BlogFilterState

lib/
├── blog-data.ts              # Static blog post data
└── blog-utils.ts             # Utility functions (filter, format, etc.)

hooks/
└── useDebounce.ts            # Debounce hook for search
```

**Structure Decision**: Next.js App Router with Server and Client components. Client components handle interactive state (search, filter, TOC tracking). Server components handle metadata and static generation.

## Complexity Tracking

No violations - implementation follows established patterns from the codebase.
