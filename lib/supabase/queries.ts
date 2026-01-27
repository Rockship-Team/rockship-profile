import { createClient as createServerClient, createAdminClient } from "./server"
import { createClient as createBrowserClient } from "./client"
import type { BlogPostWithTags, BlogTagRow } from "./types"
import type { BlogPost, TopicTag } from "@/types/blog"

// ============================================
// Helper: Transform database row to BlogPost
// ============================================
function transformToLegacyBlogPost(row: BlogPostWithTags): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    content: row.content,
    publishedAt: new Date(row.published_at || row.created_at),
    tags: row.tags,
    author: row.author || "Rockship Team",
    readingTime: row.reading_time ? `${row.reading_time} min read` : undefined,
    sections: row.sections || undefined,
  }
}

// Helper: Extract tag slugs from join query result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTags(tagData: any[] | null): string[] {
  if (!tagData) return []
  return tagData
    .map((t) => t.blog_tags?.slug)
    .filter((slug): slug is string => typeof slug === "string")
}

// ============================================
// Public Queries (use anon key)
// ============================================

/**
 * Get all published blog posts sorted by date (newest first)
 * Returns empty array if database is not configured or tables don't exist
 * Uses single query with join to avoid N+1 problem
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  // Skip if Supabase not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase not configured, returning empty posts")
    return []
  }

  try {
    const supabase = await createServerClient()

    // Single query with tags join - much faster than N+1
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_post_tags (
          blog_tags (
            slug
          )
        )
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false })

    if (error) {
      // Table might not exist yet - return empty array instead of throwing
      console.error("Error fetching posts:", error.message || error)
      return []
    }

    if (!posts || posts.length === 0) {
      return []
    }

    return posts.map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tags = post.blog_post_tags
        ?.map((t: any) => t.blog_tags?.slug)
        .filter((slug: unknown): slug is string => typeof slug === "string") || []

      return transformToLegacyBlogPost({
        ...post,
        tags,
      } as BlogPostWithTags)
    })
  } catch (error) {
    console.error("Error in getPublishedPosts:", error)
    return []
  }
}

/**
 * Get all tags with post counts
 * Returns empty array if database is not configured or tables don't exist
 * Uses single query with aggregation to avoid N+1 problem
 */
export async function getAllTags(): Promise<TopicTag[]> {
  // Skip if Supabase not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return []
  }

  try {
    const supabase = await createServerClient()

    // Use RPC for optimized single-query tag count
    const { data, error } = await supabase.rpc("get_tags_with_post_counts")

    if (error) {
      // Fallback to simple approach if RPC doesn't exist
      const { data: tags, error: tagsError } = await supabase
        .from("blog_tags")
        .select("id, name, slug")

      if (tagsError) {
        console.error("Error fetching tags:", tagsError.message || tagsError)
        return []
      }

      if (!tags || tags.length === 0) {
        return []
      }

      // Count posts for each tag (only published posts)
      const tagsWithCounts = await Promise.all(
        tags.map(async (tag) => {
          const { count } = await supabase
            .from("blog_post_tags")
            .select("post_id", { count: "exact", head: true })
            .eq("tag_id", tag.id)

          return {
            name: tag.name,
            slug: tag.slug,
            count: count || 0,
          }
        })
      )

      return tagsWithCounts.filter((t) => t.count > 0)
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllTags:", error)
    return []
  }
}

/**
 * Get a single post by slug
 * Uses single query with join to avoid N+1 problem
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createServerClient()

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags (
        blog_tags (
          slug
        )
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (error || !post) {
    return null
  }

  const tags = post.blog_post_tags
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ?.map((t: any) => t.blog_tags?.slug)
    .filter((slug: unknown): slug is string => typeof slug === "string") || []

  const postWithTags: BlogPostWithTags = {
    ...post,
    tags,
  }

  return transformToLegacyBlogPost(postWithTags)
}

/**
 * Get all slugs for static generation
 * Note: Uses admin client because this runs at build time (no cookies available)
 * Falls back to empty array if Supabase is not configured (build without env vars)
 */
export async function getAllSlugs(): Promise<string[]> {
  // Skip if Supabase env vars not configured (build without database)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("Supabase not configured, skipping slug generation")
    return []
  }

  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("is_published", true)

    if (error) {
      console.error("Error fetching slugs:", error)
      return []
    }

    return data?.map((p) => p.slug) || []
  } catch (error) {
    console.error("Error in getAllSlugs:", error)
    return []
  }
}

/**
 * Search posts using full-text search with ILIKE fallback
 * Full-text search ignores stop words (how, what, the, etc.)
 * so we fall back to ILIKE for those cases
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const supabase = await createServerClient()

  // First try PostgreSQL full-text search
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags (
        blog_tags (
          slug
        )
      )
    `)
    .eq("is_published", true)
    .textSearch("search_vector", query, {
      type: "websearch",
      config: "english",
    })
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error searching posts:", error)
    throw new Error("Failed to search blog posts")
  }

  // If full-text search returns results, use them
  if (posts && posts.length > 0) {
    return posts.map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tags = post.blog_post_tags
        ?.map((t: any) => t.blog_tags?.slug)
        .filter((slug: unknown): slug is string => typeof slug === "string") || []

      return transformToLegacyBlogPost({
        ...post,
        tags,
      } as BlogPostWithTags)
    })
  }

  // Fallback to ILIKE search for stop words (how, what, the, etc.)
  const searchPattern = `%${query}%`
  const { data: ilikePosts, error: ilikeError } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags (
        blog_tags (
          slug
        )
      )
    `)
    .eq("is_published", true)
    .or(`title.ilike.${searchPattern},excerpt.ilike.${searchPattern}`)
    .order("published_at", { ascending: false })

  if (ilikeError) {
    console.error("Error in ILIKE search:", ilikeError)
    return []
  }

  if (!ilikePosts || ilikePosts.length === 0) {
    return []
  }

  return ilikePosts.map((post) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags = post.blog_post_tags
      ?.map((t: any) => t.blog_tags?.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string") || []

    return transformToLegacyBlogPost({
      ...post,
      tags,
    } as BlogPostWithTags)
  })
}

/**
 * Get posts by tag slug
 * Uses two-step query: first get tag_id, then get posts with that tag
 */
export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const supabase = await createServerClient()

  // Step 1: Get the tag ID from slug
  const { data: tag, error: tagError } = await supabase
    .from("blog_tags")
    .select("id")
    .eq("slug", tagSlug)
    .single()

  if (tagError || !tag) {
    console.error("Tag not found:", tagSlug)
    return []
  }

  // Step 2: Get post IDs that have this tag
  const { data: postTags, error: postTagsError } = await supabase
    .from("blog_post_tags")
    .select("post_id")
    .eq("tag_id", tag.id)

  if (postTagsError || !postTags || postTags.length === 0) {
    return []
  }

  const postIds = postTags.map((pt) => pt.post_id)

  // Step 3: Get the posts with all their tags
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags (
        blog_tags (
          slug
        )
      )
    `)
    .in("id", postIds)
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (postsError || !posts) {
    console.error("Error fetching posts by tag:", postsError)
    return []
  }

  return posts.map((post) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tags = post.blog_post_tags
      ?.map((t: any) => t.blog_tags?.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string") || []

    return transformToLegacyBlogPost({
      ...post,
      tags,
    } as BlogPostWithTags)
  })
}

// ============================================
// Admin Queries (use service role key)
// ============================================

/**
 * Get all posts for admin (including drafts)
 */
export async function getAllPostsForAdmin(): Promise<BlogPostWithTags[]> {
  const supabase = createAdminClient()

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching admin posts:", error)
    throw new Error("Failed to fetch blog posts")
  }

  if (!posts || posts.length === 0) {
    return []
  }

  // Get tags for each post
  const postsWithTags = await Promise.all(
    posts.map(async (post) => {
      const { data: tagData } = await supabase
        .from("blog_post_tags")
        .select("tag_id, blog_tags(slug)")
        .eq("post_id", post.id)

      const tags = extractTags(tagData)

      return {
        ...post,
        tags,
      } as BlogPostWithTags
    })
  )

  return postsWithTags
}

/**
 * Get a single post by ID for admin (including drafts)
 */
export async function getPostById(id: string): Promise<BlogPostWithTags | null> {
  const supabase = createAdminClient()

  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !post) {
    return null
  }

  // Get tags for this post
  const { data: tagData } = await supabase
    .from("blog_post_tags")
    .select("tag_id, blog_tags(slug)")
    .eq("post_id", post.id)

  const tags = extractTags(tagData)

  return {
    ...post,
    tags,
  }
}

/**
 * Get all tags for admin (with all tags, not just those with posts)
 */
export async function getAllTagsForAdmin(): Promise<BlogTagRow[]> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from("blog_tags")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching tags:", error)
    throw new Error("Failed to fetch tags")
  }

  return data || []
}
