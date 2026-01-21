# API Contracts: Blog Page

**Feature**: 002-blog-page
**Date**: 2026-01-21

## Overview

This feature does not require API endpoints. All data is static and served via:
- Static data file: `lib/blog-data.ts`
- Static generation with Next.js `generateStaticParams`

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/blog` | Page | Blog listing page (Server Component) |
| `/blog/[slug]` | Dynamic Page | Blog post detail (Static Generation) |

## Static Generation

```typescript
// app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map(slug => ({ slug }))
}
```

## No API Endpoints Required

The blog feature uses client-side filtering on static data, eliminating the need for:
- Search API endpoints
- Filter API endpoints
- Pagination API endpoints

All filtering logic runs in the browser using the `filterPosts` utility function.
