# Data Model: Supabase Integration for Blog Page

**Feature**: 003-supabase-blog-integration
**Date**: 2026-01-21

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        blog_posts                           │
├─────────────────────────────────────────────────────────────┤
│ id (uuid, PK)                                               │
│ slug (text, UNIQUE, NOT NULL)                               │
│ title (text, NOT NULL)                                      │
│ excerpt (text)                                              │
│ content (text, NOT NULL)                                    │
│ author (text)                                               │
│ reading_time (integer)                                      │
│ sections (jsonb)                                            │
│ is_published (boolean, DEFAULT false)                       │
│ published_at (timestamptz)                                  │
│ created_at (timestamptz, DEFAULT now())                     │
│ updated_at (timestamptz, DEFAULT now())                     │
│ search_vector (tsvector)                                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ 1:N
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     blog_post_tags                          │
├─────────────────────────────────────────────────────────────┤
│ post_id (uuid, FK → blog_posts.id, ON DELETE CASCADE)       │
│ tag_id (uuid, FK → blog_tags.id, ON DELETE CASCADE)         │
│ PRIMARY KEY (post_id, tag_id)                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ N:1
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        blog_tags                            │
├─────────────────────────────────────────────────────────────┤
│ id (uuid, PK)                                               │
│ name (text, UNIQUE, NOT NULL)                               │
│ slug (text, UNIQUE, NOT NULL)                               │
│ created_at (timestamptz, DEFAULT now())                     │
└─────────────────────────────────────────────────────────────┘
```

## Tables

### blog_posts

Primary table storing all blog post content.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Unique identifier |
| `slug` | `text` | UNIQUE, NOT NULL | URL-friendly identifier |
| `title` | `text` | NOT NULL | Post title |
| `excerpt` | `text` | | Short summary for listings |
| `content` | `text` | NOT NULL | Markdown content body |
| `author` | `text` | DEFAULT 'Rockship Team' | Author name |
| `reading_time` | `integer` | | Estimated minutes to read |
| `sections` | `jsonb` | | Table of contents sections |
| `is_published` | `boolean` | DEFAULT false | Publication status |
| `published_at` | `timestamptz` | | Publication timestamp |
| `created_at` | `timestamptz` | DEFAULT now() | Record creation time |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update time |
| `search_vector` | `tsvector` | | Full-text search index |

**Sections JSONB Structure**:
```json
[
  { "id": "section-slug", "title": "Section Title", "level": 2 },
  { "id": "subsection-slug", "title": "Subsection", "level": 3 }
]
```

### blog_tags

Reference table for topic categories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Unique identifier |
| `name` | `text` | UNIQUE, NOT NULL | Display name (e.g., "TypeScript") |
| `slug` | `text` | UNIQUE, NOT NULL | URL-friendly name (e.g., "typescript") |
| `created_at` | `timestamptz` | DEFAULT now() | Record creation time |

### blog_post_tags

Junction table for many-to-many relationship between posts and tags.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `post_id` | `uuid` | FK → blog_posts.id, ON DELETE CASCADE | Post reference |
| `tag_id` | `uuid` | FK → blog_tags.id, ON DELETE CASCADE | Tag reference |

**Primary Key**: (`post_id`, `tag_id`)

## Indexes

```sql
-- Primary lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_tags_slug ON blog_tags(slug);

-- Full-text search
CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN(search_vector);

-- Foreign key efficiency
CREATE INDEX idx_blog_post_tags_post ON blog_post_tags(post_id);
CREATE INDEX idx_blog_post_tags_tag ON blog_post_tags(tag_id);
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- blog_posts policies
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Service role has full access to posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'service_role');

-- blog_tags policies
CREATE POLICY "Public can read all tags"
  ON blog_tags FOR SELECT
  USING (true);

CREATE POLICY "Service role has full access to tags"
  ON blog_tags FOR ALL
  USING (auth.role() = 'service_role');

-- blog_post_tags policies
CREATE POLICY "Public can read post-tag associations for published posts"
  ON blog_post_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE id = post_id AND is_published = true
    )
  );

CREATE POLICY "Service role has full access to post-tag associations"
  ON blog_post_tags FOR ALL
  USING (auth.role() = 'service_role');
```

## Triggers

### Auto-update `updated_at`

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Auto-update search vector

```sql
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector =
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_search_vector
  BEFORE INSERT OR UPDATE OF title, excerpt, content ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_search_vector();
```

## TypeScript Types

```typescript
// types/database.ts
export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          author: string | null
          reading_time: number | null
          sections: BlogSection[] | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'],
          'id' | 'created_at' | 'updated_at' | 'search_vector'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_tags']['Row'],
          'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['blog_tags']['Insert']>
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: Partial<Database['public']['Tables']['blog_post_tags']['Insert']>
      }
    }
  }
}

interface BlogSection {
  id: string
  title: string
  level: 1 | 2 | 3
}
```

## Migration: Static Data Seed

```sql
-- Seed existing blog posts from lib/blog-data.ts
-- Run after table creation

-- First, insert tags
INSERT INTO blog_tags (name, slug) VALUES
  ('Milestones', 'milestones'),
  ('Workshops', 'workshops'),
  ('OCF', 'ocf'),
  ('Grid', 'grid'),
  ('Series', 'series'),
  ('LLM', 'llm'),
  ('Opinion', 'opinion'),
  ('TypeScript', 'typescript')
ON CONFLICT (slug) DO NOTHING;

-- Then insert posts (example for first post)
INSERT INTO blog_posts (
  slug, title, excerpt, content, author, reading_time,
  sections, is_published, published_at
) VALUES (
  '2025-year-in-review',
  '2025 Year In Review',
  'As 2025 comes to an end, I pause to summarize the major Rockship AI milestones of the year.',
  '# 2025 Year In Review...',  -- Full content
  'Rockship Team',
  5,
  '[{"id": "q1-foundation-building", "title": "Q1: Foundation Building", "level": 2}]'::jsonb,
  true,
  '2025-12-25T00:00:00Z'
);

-- Link post to tags
INSERT INTO blog_post_tags (post_id, tag_id)
SELECT bp.id, bt.id
FROM blog_posts bp, blog_tags bt
WHERE bp.slug = '2025-year-in-review'
  AND bt.slug IN ('milestones', 'workshops');
```

## Validation Rules

| Entity | Field | Rule |
|--------|-------|------|
| blog_posts | slug | Unique, lowercase, alphanumeric with hyphens only |
| blog_posts | title | Required, max 200 characters |
| blog_posts | content | Required, markdown format |
| blog_posts | published_at | Required when is_published = true |
| blog_tags | name | Required, max 50 characters |
| blog_tags | slug | Unique, lowercase, alphanumeric with hyphens only |
