-- Migration: Row Level Security policies for blog tables
-- Feature: 003-supabase-blog-integration
-- Date: 2026-01-21

-- ============================================
-- Enable RLS on all blog tables
-- ============================================
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- ============================================
-- blog_posts policies
-- ============================================

-- Public can read published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (is_published = true);

-- Service role has full access (for admin operations via server actions)
CREATE POLICY "Service role has full access to posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- blog_tags policies
-- ============================================

-- Public can read all tags (for filtering UI)
CREATE POLICY "Public can read all tags"
  ON blog_tags FOR SELECT
  USING (true);

-- Service role has full access
CREATE POLICY "Service role has full access to tags"
  ON blog_tags FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- blog_post_tags policies
-- ============================================

-- Public can read post-tag associations for published posts
CREATE POLICY "Public can read post-tag associations for published posts"
  ON blog_post_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE id = post_id AND is_published = true
    )
  );

-- Service role has full access
CREATE POLICY "Service role has full access to post-tag associations"
  ON blog_post_tags FOR ALL
  USING (auth.role() = 'service_role');
