"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createTag, updateTag } from "@/actions/blog"
import type { BlogTagRow } from "@/lib/supabase/types"

interface TagFormModalProps {
  isOpen: boolean
  onClose: () => void
  tag?: BlogTagRow | null
  mode: "create" | "edit"
}

export function TagFormModal({ isOpen, onClose, tag, mode }: TagFormModalProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && tag) {
        setName(tag.name)
        setSlug(tag.slug)
      } else {
        setName("")
        setSlug("")
      }
      setError(null)
    }
  }, [isOpen, mode, tag])

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleNameChange = (value: string) => {
    setName(value)
    if (mode === "create" || !slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !slug) {
      setError("Name and slug are required")
      return
    }

    startTransition(async () => {
      if (mode === "create") {
        const result = await createTag({ name, slug })
        if (result.success) {
          onClose()
          router.refresh()
        } else {
          setError(result.error || "Failed to create tag")
        }
      } else if (tag) {
        const result = await updateTag({ id: tag.id, name, slug })
        if (result.success) {
          onClose()
          router.refresh()
        } else {
          setError(result.error || "Failed to update tag")
        }
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-rockship-900 border border-white/10 rounded-xl w-full max-w-md mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {mode === "create" ? "Add New Tag" : "Edit Tag"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="tag-name" className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="tag-name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Artificial Intelligence"
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "bg-rockship-950/50 border border-white/10",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent"
              )}
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="tag-slug" className="block text-sm font-medium text-gray-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="tag-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g., artificial-intelligence"
              pattern="[a-z0-9-]+"
              className={cn(
                "w-full px-4 py-3 rounded-lg",
                "bg-rockship-950/50 border border-white/10",
                "text-white placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent"
              )}
            />
            <p className="text-xs text-gray-500 mt-1">
              Only lowercase letters, numbers, and hyphens
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className={cn(
                "px-4 py-2 rounded-lg",
                "bg-white/5 hover:bg-white/10",
                "text-gray-300 font-medium",
                "transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !name || !slug}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
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
              ) : mode === "create" ? (
                "Add Tag"
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
