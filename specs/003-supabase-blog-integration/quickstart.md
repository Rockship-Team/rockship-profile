# Quickstart: Supabase Integration for Blog Page

**Feature**: 003-supabase-blog-integration
**Date**: 2026-01-21

## Prerequisites

- Node.js 18+
- pnpm installed
- Supabase account (free tier works)
- Access to Supabase project or ability to create one

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose organization and enter project details:
   - **Name**: rockshipai-blog (or your preference)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait for project to provision (~2 minutes)

### 2. Get API Credentials

1. In Supabase Dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon/public key**: For client-side operations
   - **service_role key**: For server-side admin operations (keep secret!)

### 3. Configure Environment Variables

Create/update `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Auth (change these!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### 4. Install Dependencies

```bash
pnpm add @supabase/ssr @supabase/supabase-js
```

### 5. Run Database Migrations

Option A: **Via Supabase Dashboard SQL Editor**

1. Go to **SQL Editor** in dashboard
2. Create new query
3. Paste the migration SQL from `data-model.md`
4. Run the query

Option B: **Via Supabase CLI** (recommended for version control)

```bash
# Install Supabase CLI
pnpm add -D supabase

# Login to Supabase
npx supabase login

# Link to your project
npx supabase link --project-ref your-project-ref

# Push migrations (if using migrations folder)
npx supabase db push
```

### 6. Seed Initial Data

After tables are created, run the seed script to migrate existing blog posts:

1. In SQL Editor, run the seed statements from `data-model.md`
2. Or use the Node.js seed script (to be created in tasks)

### 7. Verify Setup

```bash
# Start dev server
pnpm dev

# Test public blog
open http://localhost:3000/blog

# Test admin panel (will prompt for basic auth)
open http://localhost:3000/admin/post
```

## Development Workflow

### Running Locally

```bash
# Start Next.js with Turbopack
pnpm dev
```

### Testing Supabase Connection

Create a test file to verify connection:

```typescript
// scripts/test-supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function test() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title')
    .limit(1)

  if (error) {
    console.error('Connection failed:', error)
  } else {
    console.log('Connection successful! Sample post:', data)
  }
}

test()
```

Run with:
```bash
npx tsx scripts/test-supabase.ts
```

### Admin Panel Access

1. Navigate to `/admin/post`
2. Enter credentials from env vars when prompted
3. Manage posts via the UI

## Common Issues

### "relation does not exist" error

**Cause**: Tables not created yet
**Fix**: Run migrations in Supabase SQL Editor

### 401 Unauthorized on admin

**Cause**: Wrong credentials or env vars not loaded
**Fix**: Check `.env.local` values, restart dev server

### Empty blog page

**Cause**: No published posts or RLS blocking
**Fix**:
1. Check `is_published = true` on posts
2. Verify RLS policies allow public SELECT

### Slow queries

**Cause**: Missing indexes
**Fix**: Ensure all indexes from `data-model.md` are created

## Useful Commands

```bash
# Check TypeScript
pnpm tsc --noEmit

# Lint code
pnpm lint

# Build for production
pnpm build

# Generate Supabase types (optional)
npx supabase gen types typescript --project-id your-project-id > lib/supabase/database.types.ts
```

## Links

- [Supabase Docs](https://supabase.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase with Next.js Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
