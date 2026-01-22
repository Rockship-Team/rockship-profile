"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Save, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createPost, updatePost } from "@/actions/blog"
import type { CreatePostInput, UpdatePostInput } from "@/actions/blog"
import type { BlogPostWithTags, BlogTagRow } from "@/lib/supabase/types"
import { TagMultiSelect } from "./TagMultiSelect"
import { TiptapEditor } from "./TiptapEditor"

interface PostFormProps {
  post?: BlogPostWithTags
  mode: "create" | "edit"
  availableTags: BlogTagRow[]
}

export function PostForm({ post, mode, availableTags }: PostFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [slug, setSlug] = useState(post?.slug || "")
  const [title, setTitle] = useState(post?.title || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content || "")
  const [author, setAuthor] = useState(post?.author || "Rockship Team")
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false)
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || [])

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (mode === "create" && !slug) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setSlug(generatedSlug)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate content
    if (!content.trim()) {
      setError("Content is required")
      return
    }

    startTransition(async () => {
      if (mode === "create") {
        const input: CreatePostInput = {
          slug,
          title,
          excerpt,
          content,
          author,
          isPublished,
          tags: selectedTags,
        }

        const result = await createPost(input)

        if (result.success) {
          router.push("/admin")
          router.refresh()
        } else {
          setError(result.error || "Failed to create post")
        }
      } else {
        const input: UpdatePostInput = {
          id: post!.id,
          slug,
          title,
          excerpt,
          content,
          author,
          isPublished,
          tags: selectedTags,
        }

        console.log("Updating post with input:", input)
        const result = await updatePost(input)
        console.log("Update result:", result)

        if (result.success) {
          router.push("/admin")
          router.refresh()
        } else {
          setError(result.error || "Failed to update post")
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Title & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-rockship-900/50 border border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent"
            )}
            placeholder="Post title"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-2">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            required
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-rockship-900/50 border border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent"
            )}
            placeholder="post-url-slug"
          />
        </div>
      </div>

      {/* Author & Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className={cn(
              "w-full px-4 py-3 rounded-lg",
              "bg-rockship-900/50 border border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent"
            )}
            placeholder="Author name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <TagMultiSelect
            availableTags={availableTags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={cn(
            "w-full px-4 py-3 rounded-lg resize-none",
            "bg-rockship-900/50 border border-white/10",
            "text-white placeholder-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent"
          )}
          placeholder="Brief description of the post"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Content *
        </label>
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Write your post content here..."
        />
      </div>

      {/* Publish Toggle & Submit */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className={cn(
              "w-5 h-5 rounded",
              "bg-rockship-900/50 border border-white/20",
              "checked:bg-rockship-accent checked:border-rockship-accent",
              "focus:ring-2 focus:ring-rockship-accent/50"
            )}
          />
          <span className="text-gray-300">
            {isPublished ? "Published" : "Draft"}
          </span>
        </label>

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
            "bg-rockship-accent hover:bg-rockship-accent/90",
            "text-white font-medium",
            "transition-colors duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {mode === "create" ? "Create Post" : "Update Post"}
            </>
          )}
        </button>
      </div>
    </form>
  )
}
