# Research: Supabase Integration for Blog Page

**Feature**: 003-supabase-blog-integration
**Date**: 2026-01-21

## Technology Decisions

### 1. Supabase Client Setup

**Decision**: Use `@supabase/ssr` package for Next.js 16 App Router integration

**Rationale**:
- `@supabase/ssr` is the official package for server-side rendering frameworks
- Provides both browser and server client creation utilities
- Handles cookie-based sessions for authentication flows
- Compatible with Next.js App Router and Server Components

**Alternatives Considered**:
- `@supabase/supabase-js` alone: Lacks SSR-specific utilities, requires manual cookie handling
- Direct PostgreSQL connection: Loses Supabase benefits (RLS, realtime, auth), requires more setup

### 2. Database Schema Design

**Decision**: Single `blog_posts` table with JSONB for sections, separate `blog_tags` and `blog_post_tags` junction table

**Rationale**:
- JSONB for sections avoids excessive normalization for read-heavy content
- Junction table for tags enables efficient filtering and tag management
- Matches existing `BlogPost` type structure for minimal migration effort
- Supports full-text search via PostgreSQL `tsvector`

**Alternatives Considered**:
- Single table with tags as array: Harder to query and maintain tag counts
- Fully normalized sections table: Overkill for table-of-contents data
- No-SQL approach (document store): Loses PostgreSQL query power and RLS benefits

### 3. Basic Auth Implementation

**Decision**: Use Next.js proxy (replacing deprecated middleware) with HTTP Basic Auth via environment variables

**Rationale**:
- Simple, stateless authentication for single admin user
- No session management overhead
- Credentials stored securely in env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD`)
- Next.js 16 deprecates middleware in favor of proxy for route handling

**Alternatives Considered**:
- Supabase Auth: Overkill for single admin, adds complexity
- NextAuth.js: Unnecessary dependency for basic credential check
- Cookie-based sessions: Adds state management complexity
- JWT tokens: Over-engineered for this use case

### 4. Server Actions vs API Routes

**Decision**: Use Server Actions for all CRUD operations

**Rationale**:
- First-class Next.js 16 feature with built-in form handling
- Automatic request/response handling
- Better TypeScript type inference
- Follows CLAUDE.md convention (`actions/` folder)
- Reduces boilerplate compared to API routes

**Alternatives Considered**:
- API Routes: More REST-like but more boilerplate
- Direct client-side Supabase calls: Bypasses server validation, security concerns
- tRPC: Additional dependency, unnecessary for simple CRUD

### 5. Search Implementation

**Decision**: PostgreSQL full-text search with `to_tsvector` and `to_tsquery`

**Rationale**:
- Native PostgreSQL feature, no external service needed
- Fast indexed search on title and content
- Supports ranking and highlighting
- Free tier friendly (no Algolia/Elasticsearch cost)

**Alternatives Considered**:
- Client-side filtering: Doesn't scale beyond 100 posts, poor UX
- Algolia: Additional cost and complexity
- Supabase Vector search: Overkill for text matching

### 6. Row Level Security (RLS) Policies

**Decision**: Public read for published posts, authenticated write via service role key

**Rationale**:
- Anonymous users can read published posts (is_published = true)
- Admin operations use service role key (server-side only)
- Simple policy model appropriate for blog use case

**Policies**:
```sql
-- Public can read published posts
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Service role can do everything (used by server actions)
CREATE POLICY "Service role full access" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');
```

### 7. Data Migration Strategy

**Decision**: One-time seed script to migrate static data from `lib/blog-data.ts`

**Rationale**:
- 6 existing posts, simple one-time migration
- Seed script can be run via Supabase dashboard or CLI
- Preserves slugs for URL compatibility
- No downtime migration (new tables, then switch)

**Alternatives Considered**:
- Manual data entry: Error-prone for 6 posts
- Keep static data as fallback: Complicates codebase, dual sources of truth
- Incremental migration: Unnecessary for small dataset

### 8. Admin UI Components

**Decision**: Use shadcn/ui components with custom admin layout

**Rationale**:
- Consistent with existing project styling
- Form, Table, Dialog components available
- Accessible by default (Radix primitives)
- Tailwind CSS integration

**Alternatives Considered**:
- Build from scratch: Time-consuming, less accessible
- Admin dashboard library (AdminJS, React-Admin): Heavy dependencies
- Supabase Studio only: No custom UI, poor UX for content creators

### 9. Markdown Editor for Admin

**Decision**: Simple textarea with toggle preview using existing `react-markdown` dependency

**Rationale**:
- Already using `react-markdown` and `remark-gfm` in blog detail page
- Toggle preview minimizes complexity
- No additional dependencies needed
- Admin can use familiar markdown syntax

**Alternatives Considered**:
- WYSIWYG editor (TipTap, Slate): Heavy dependency, learning curve
- Monaco Editor: Overkill, large bundle size
- External editor (StackEdit): Poor integration, extra workflow step

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Admin Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password-here
```

## Dependencies to Add

```json
{
  "@supabase/ssr": "^0.6.x",
  "@supabase/supabase-js": "^2.x"
}
```

## Performance Considerations

1. **Caching**: Use Next.js `fetch` caching and `revalidate` for blog listing
2. **Static Generation**: `generateStaticParams` for post detail pages
3. **Lazy Loading**: Admin panel loaded dynamically (not in main bundle)
4. **Connection Pooling**: Supabase handles connection pooling automatically
5. **Index Strategy**: Index on `slug`, `is_published`, `published_at`, and full-text search column
