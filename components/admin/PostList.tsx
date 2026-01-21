"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Pencil, Trash2, Eye, EyeOff, Loader2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { deletePost } from "@/actions/blog"
import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import type { BlogPostWithTags } from "@/lib/supabase/types"

interface PostListProps {
  posts: BlogPostWithTags[]
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPostWithTags | null>(null)

  const handleDeleteClick = (post: BlogPostWithTags) => {
    setPostToDelete(post)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    setDeletingId(postToDelete.id)
    setShowDeleteDialog(false)

    startTransition(async () => {
      const result = await deletePost(postToDelete.id)

      if (result.success) {
        router.refresh()
      } else {
        alert(result.error || "Failed to delete post")
      }

      setDeletingId(null)
      setPostToDelete(null)
    })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No posts yet. Create your first post!</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Title
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Date
              </th>
              <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                Tags
              </th>
              <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="text-white font-medium">{post.title}</p>
                    <p className="text-gray-500 text-sm">/{post.slug}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                      post.is_published
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    )}
                  >
                    {post.is_published ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Draft
                      </>
                    )}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-400 text-sm">
                  {formatDate(post.published_at || post.created_at)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-rockship-800/50 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-gray-500 text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end gap-2">
                    {post.is_published && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-2 rounded-lg",
                          "bg-rockship-800/50 hover:bg-rockship-800/70",
                          "text-gray-400 hover:text-white",
                          "transition-colors"
                        )}
                        title="View post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={`/admin/post/${post.id}`}
                      className={cn(
                        "p-2 rounded-lg",
                        "bg-rockship-800/50 hover:bg-rockship-800/70",
                        "text-gray-400 hover:text-white",
                        "transition-colors"
                      )}
                      title="Edit post"
                    >
                      <Pencil className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleDeleteClick(post)}
                      disabled={isPending && deletingId === post.id}
                      className={cn(
                        "p-2 rounded-lg",
                        "bg-red-500/10 hover:bg-red-500/20",
                        "text-red-400 hover:text-red-300",
                        "transition-colors",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      title="Delete post"
                    >
                      {isPending && deletingId === post.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title={postToDelete?.title || ""}
      />
    </>
  )
}
