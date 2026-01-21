"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { deleteTag } from "@/actions/blog"
import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import { TagFormModal } from "./TagFormModal"
import type { BlogTagRow } from "@/lib/supabase/types"

interface TagSectionProps {
  tags: BlogTagRow[]
}

export function TagSection({ tags }: TagSectionProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Delete dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [tagToDelete, setTagToDelete] = useState<BlogTagRow | null>(null)

  // Form modal state
  const [showFormModal, setShowFormModal] = useState(false)
  const [tagToEdit, setTagToEdit] = useState<BlogTagRow | null>(null)
  const [formMode, setFormMode] = useState<"create" | "edit">("create")

  const handleDeleteClick = (tag: BlogTagRow) => {
    setTagToDelete(tag)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!tagToDelete) return

    setDeletingId(tagToDelete.id)
    setShowDeleteDialog(false)

    startTransition(async () => {
      const result = await deleteTag(tagToDelete.id)

      if (result.success) {
        router.refresh()
      } else {
        alert(result.error || "Failed to delete tag")
      }

      setDeletingId(null)
      setTagToDelete(null)
    })
  }

  const handleAddClick = () => {
    setTagToEdit(null)
    setFormMode("create")
    setShowFormModal(true)
  }

  const handleEditClick = (tag: BlogTagRow) => {
    setTagToEdit(tag)
    setFormMode("edit")
    setShowFormModal(true)
  }

  const handleCloseModal = () => {
    setShowFormModal(false)
    setTagToEdit(null)
  }

  return (
    <section>
      {/* Header - same style as Blog Posts */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Tags</h2>
          <p className="text-gray-400 mt-1">
            Manage blog tags. {tags.length} tag{tags.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-rockship-accent hover:bg-rockship-accent/90",
            "text-white font-medium",
            "transition-colors duration-200"
          )}
        >
          <Plus className="w-4 h-4" />
          New Tag
        </button>
      </div>

      {/* Tag List Table */}
      <div className="bg-rockship-900/60 backdrop-blur-md border border-white/8 rounded-xl">
        {tags.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No tags yet. Create your first tag!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                    Name
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">
                    Slug
                  </th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tags.map((tag) => (
                  <tr
                    key={tag.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="text-white font-medium">{tag.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-400 text-sm">{tag.slug}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(tag)}
                          className={cn(
                            "p-2 rounded-lg",
                            "bg-rockship-800/50 hover:bg-rockship-800/70",
                            "text-gray-400 hover:text-white",
                            "transition-colors"
                          )}
                          title="Edit tag"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(tag)}
                          disabled={isPending && deletingId === tag.id}
                          className={cn(
                            "p-2 rounded-lg",
                            "bg-red-500/10 hover:bg-red-500/20",
                            "text-red-400 hover:text-red-300",
                            "transition-colors",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                          title="Delete tag"
                        >
                          {isPending && deletingId === tag.id ? (
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
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title={tagToDelete?.name || ""}
      />

      {/* Tag Form Modal */}
      <TagFormModal
        isOpen={showFormModal}
        onClose={handleCloseModal}
        tag={tagToEdit}
        mode={formMode}
      />
    </section>
  )
}
