"use client"

import { useEffect, useRef } from "react"
import { AlertTriangle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
}: DeleteConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-50 m-auto",
        "w-full max-w-md p-0",
        "bg-transparent backdrop:bg-black/60"
      )}
      onClick={(e) => {
        // Close when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className={cn(
          "bg-rockship-900 border border-white/10 rounded-xl",
          "p-6 shadow-2xl"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Delete Post</h3>
          </div>
          <button
            onClick={onClose}
            className={cn(
              "p-1 rounded-lg",
              "text-gray-400 hover:text-white hover:bg-white/10",
              "transition-colors"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-300">
            Are you sure you want to delete{" "}
            <span className="font-medium text-white">&ldquo;{title}&rdquo;</span>?
          </p>
          <p className="text-gray-400 text-sm mt-2">
            This action cannot be undone. The post will be permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-rockship-800/50 hover:bg-rockship-800/70",
              "text-gray-300 hover:text-white",
              "transition-colors"
            )}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              "px-4 py-2 rounded-lg",
              "bg-red-500 hover:bg-red-600",
              "text-white font-medium",
              "transition-colors"
            )}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  )
}
