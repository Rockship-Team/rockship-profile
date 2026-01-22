"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@supabase/supabase-js"
import { searchPosts, getPostsByTag, getPublishedPosts } from "@/lib/supabase/queries"
import type { BlogPost } from "@/types/blog"
import type { BlogSection, Database } from "@/lib/supabase/types"

// Admin client with service role for CRUD operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAdminClient(): ReturnType<typeof createClient<any>> {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Server action to search blog posts using PostgreSQL full-text search
 */
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  if (!query || query.trim().length === 0) {
    return getPublishedPosts()
  }

  try {
    return await searchPosts(query.trim())
  } catch (error) {
    console.error("Search error:", error)
    // Fallback to all posts on error
    return getPublishedPosts()
  }
}

/**
 * Server action to filter blog posts by tag
 */
export async function filterBlogPostsByTag(tagSlug: string | null): Promise<BlogPost[]> {
  if (!tagSlug) {
    return getPublishedPosts()
  }

  try {
    return await getPostsByTag(tagSlug)
  } catch (error) {
    console.error("Filter error:", error)
    // Fallback to all posts on error
    return getPublishedPosts()
  }
}

/**
 * Server action to search and filter blog posts
 * Combines search query with tag filter
 */
export async function searchAndFilterPosts(
  query: string,
  tagSlug: string | null
): Promise<BlogPost[]> {
  try {
    // If we have both search and tag, search first then filter by tag
    if (query && query.trim().length > 0 && tagSlug) {
      const searchResults = await searchPosts(query.trim())
      return searchResults.filter(post => post.tags.includes(tagSlug))
    }

    // If only search
    if (query && query.trim().length > 0) {
      return await searchPosts(query.trim())
    }

    // If only tag filter
    if (tagSlug) {
      return await getPostsByTag(tagSlug)
    }

    // No filters - return all posts
    return getPublishedPosts()
  } catch (error) {
    console.error("Search and filter error:", error)
    // Fallback to all posts on error
    return getPublishedPosts()
  }
}

// ============================================
// Admin Actions (require authentication via proxy)
// ============================================

export interface CreatePostInput {
  slug: string
  title: string
  excerpt: string
  content: string
  author?: string
  readingTime?: number
  isPublished: boolean
  tags: string[]
  sections?: BlogSection[]
}

export interface UpdatePostInput extends CreatePostInput {
  id: string
}

export interface ActionResult {
  success: boolean
  error?: string
  id?: string
}

/**
 * Calculate reading time from content (returns minutes as integer)
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Create a new blog post
 */
export async function createPost(input: CreatePostInput): Promise<ActionResult> {
  const supabase = getAdminClient()

  try {
    // Validate required fields
    if (!input.slug || !input.title || !input.content) {
      return { success: false, error: "Slug, title, and content are required" }
    }

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", input.slug)
      .single()

    if (existing) {
      return { success: false, error: "A post with this slug already exists" }
    }

    // Calculate reading time if not provided
    const readingTime = input.readingTime || calculateReadingTime(input.content)

    // Insert the post
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .insert({
        slug: input.slug,
        title: input.title,
        excerpt: input.excerpt || "",
        content: input.content,
        author: input.author || "Rockship Team",
        reading_time: readingTime,
        is_published: input.isPublished,
        published_at: input.isPublished ? new Date().toISOString() : null,
        sections: input.sections || null,
      })
      .select("id")
      .single()

    if (postError || !post) {
      console.error("Error creating post:", postError)
      return { success: false, error: "Failed to create post" }
    }

    // Handle tags
    if (input.tags && input.tags.length > 0) {
      await handlePostTags(supabase, post.id, input.tags)
    }

    // Revalidate blog pages
    revalidatePath("/blog")
    revalidatePath(`/blog/${input.slug}`)

    return { success: true, id: post.id }
  } catch (error) {
    console.error("Create post error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Update an existing blog post
 */
export async function updatePost(input: UpdatePostInput): Promise<ActionResult> {
  console.log("updatePost called with:", { id: input.id, slug: input.slug, title: input.title, contentLength: input.content?.length })
  const supabase = getAdminClient()

  try {
    // Validate required fields
    if (!input.id || !input.slug || !input.title || !input.content) {
      console.log("Validation failed:", { id: !!input.id, slug: !!input.slug, title: !!input.title, content: !!input.content })
      return { success: false, error: "ID, slug, title, and content are required" }
    }

    // Check for duplicate slug (excluding current post)
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", input.slug)
      .neq("id", input.id)
      .single()

    if (existing) {
      return { success: false, error: "A post with this slug already exists" }
    }

    // Get current post to check if published status changed
    const { data: currentPost } = await supabase
      .from("blog_posts")
      .select("is_published, slug")
      .eq("id", input.id)
      .single()

    const oldSlug = currentPost?.slug

    // Calculate reading time if not provided
    const readingTime = input.readingTime || calculateReadingTime(input.content)

    // Determine published_at
    let publishedAt = undefined
    if (input.isPublished && !currentPost?.is_published) {
      // Just now being published
      publishedAt = new Date().toISOString()
    }

    // Update the post
    const updateData: Record<string, unknown> = {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt || "",
      content: input.content,
      author: input.author || "Rockship Team",
      reading_time: readingTime,
      is_published: input.isPublished,
      sections: input.sections || null,
      updated_at: new Date().toISOString(),
    }

    if (publishedAt) {
      updateData.published_at = publishedAt
    }

    console.log("Updating post in database:", { id: input.id, updateData })
    const { error: updateError } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", input.id)

    if (updateError) {
      console.error("Error updating post:", updateError)
      return { success: false, error: `Failed to update post: ${updateError.message}` }
    }
    console.log("Post updated successfully")

    // Handle tags - remove existing and add new
    await supabase.from("blog_post_tags").delete().eq("post_id", input.id)
    if (input.tags && input.tags.length > 0) {
      await handlePostTags(supabase, input.id, input.tags)
    }

    // Revalidate blog pages
    revalidatePath("/blog")
    revalidatePath(`/blog/${input.slug}`)
    if (oldSlug && oldSlug !== input.slug) {
      revalidatePath(`/blog/${oldSlug}`)
    }

    return { success: true, id: input.id }
  } catch (error) {
    console.error("Update post error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Delete a blog post
 */
export async function deletePost(id: string): Promise<ActionResult> {
  const supabase = getAdminClient()

  try {
    // Get the post slug for revalidation
    const { data: post } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("id", id)
      .single()

    // Delete post tags first (foreign key constraint)
    await supabase.from("blog_post_tags").delete().eq("post_id", id)

    // Delete the post
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting post:", error)
      return { success: false, error: "Failed to delete post" }
    }

    // Revalidate blog pages
    revalidatePath("/blog")
    if (post?.slug) {
      revalidatePath(`/blog/${post.slug}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Delete post error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Helper: Handle post tags (create if not exist, link to post)
 */
async function handlePostTags(
  supabase: ReturnType<typeof getAdminClient>,
  postId: string,
  tags: string[]
) {
  for (const tagSlug of tags) {
    // Get or create tag
    let { data: tag } = await supabase
      .from("blog_tags")
      .select("id")
      .eq("slug", tagSlug)
      .single()

    if (!tag) {
      // Create new tag
      const tagName = tagSlug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      const { data: newTag } = await supabase
        .from("blog_tags")
        .insert({ slug: tagSlug, name: tagName })
        .select("id")
        .single()

      tag = newTag
    }

    if (tag) {
      // Link tag to post
      await supabase.from("blog_post_tags").insert({
        post_id: postId,
        tag_id: tag.id,
      })
    }
  }
}

// ============================================
// Tag Management Actions
// ============================================

export interface CreateTagInput {
  name: string
  slug: string
}

export interface UpdateTagInput extends CreateTagInput {
  id: string
}

/**
 * Create a new tag
 */
export async function createTag(input: CreateTagInput): Promise<ActionResult> {
  const supabase = getAdminClient()

  try {
    // Validate required fields
    if (!input.name || !input.slug) {
      return { success: false, error: "Name and slug are required" }
    }

    // Check for duplicate slug
    const { data: existing } = await supabase
      .from("blog_tags")
      .select("id")
      .eq("slug", input.slug)
      .single()

    if (existing) {
      return { success: false, error: "A tag with this slug already exists" }
    }

    // Insert the tag
    const { data: tag, error: tagError } = await supabase
      .from("blog_tags")
      .insert({
        name: input.name,
        slug: input.slug,
      })
      .select("id")
      .single()

    if (tagError || !tag) {
      console.error("Error creating tag:", tagError)
      return { success: false, error: "Failed to create tag" }
    }

    // Revalidate blog pages
    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true, id: tag.id }
  } catch (error) {
    console.error("Create tag error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Update an existing tag
 */
export async function updateTag(input: UpdateTagInput): Promise<ActionResult> {
  const supabase = getAdminClient()

  try {
    // Validate required fields
    if (!input.id || !input.name || !input.slug) {
      return { success: false, error: "ID, name, and slug are required" }
    }

    // Check for duplicate slug (excluding current tag)
    const { data: existing } = await supabase
      .from("blog_tags")
      .select("id")
      .eq("slug", input.slug)
      .neq("id", input.id)
      .single()

    if (existing) {
      return { success: false, error: "A tag with this slug already exists" }
    }

    // Update the tag
    const { error: updateError } = await supabase
      .from("blog_tags")
      .update({
        name: input.name,
        slug: input.slug,
      })
      .eq("id", input.id)

    if (updateError) {
      console.error("Error updating tag:", updateError)
      return { success: false, error: "Failed to update tag" }
    }

    // Revalidate blog pages
    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true, id: input.id }
  } catch (error) {
    console.error("Update tag error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

/**
 * Delete a tag
 */
export async function deleteTag(id: string): Promise<ActionResult> {
  const supabase = getAdminClient()

  try {
    // Delete post-tag associations first (foreign key constraint)
    await supabase.from("blog_post_tags").delete().eq("tag_id", id)

    // Delete the tag
    const { error } = await supabase
      .from("blog_tags")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting tag:", error)
      return { success: false, error: "Failed to delete tag" }
    }

    // Revalidate blog pages
    revalidatePath("/blog")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Delete tag error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
