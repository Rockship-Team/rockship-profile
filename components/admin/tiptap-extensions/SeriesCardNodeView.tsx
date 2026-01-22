"use client"

import { NodeViewWrapper, NodeViewProps } from "@tiptap/react"
import { useState } from "react"
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Save,
  GripVertical,
  Link as LinkIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { SeriesItem } from "./SeriesCardExtension"

interface SeriesItemEditorProps {
  item: SeriesItem
  index: number
  onSave: (item: SeriesItem) => void
  onCancel: () => void
}

function SeriesItemEditor({ item, index, onSave, onCancel }: SeriesItemEditorProps) {
  const [editedItem, setEditedItem] = useState(item)

  return (
    <div className="p-3 bg-rockship-800 border border-white/10 rounded space-y-2">
      <div>
        <label className="text-xs text-gray-500 block mb-1">Title</label>
        <input
          type="text"
          value={editedItem.title}
          onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
          className="w-full px-3 py-1.5 text-sm bg-rockship-900 border border-white/10 rounded text-white"
          placeholder={`Part ${index + 1}`}
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">Link (slug)</label>
        <input
          type="text"
          value={editedItem.slug}
          onChange={(e) => setEditedItem({ ...editedItem, slug: e.target.value })}
          className="w-full px-3 py-1.5 text-sm bg-rockship-900 border border-white/10 rounded text-white"
          placeholder="/blog/post-slug"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`current-${item.id}`}
          checked={editedItem.isCurrent}
          onChange={(e) => setEditedItem({ ...editedItem, isCurrent: e.target.checked })}
          className="rounded border-white/20 bg-rockship-900"
        />
        <label htmlFor={`current-${item.id}`} className="text-xs text-gray-400">
          Current article
        </label>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-2 py-1 text-xs text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(editedItem)}
          className="px-2 py-1 text-xs bg-rockship-accent text-white rounded hover:bg-rockship-accent/90"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export function SeriesCardNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const { title, items, currentIndex } = node.attrs as {
    title: string
    items: SeriesItem[]
    currentIndex: number
  }

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleText, setTitleText] = useState(title)

  const addItem = () => {
    const newItem: SeriesItem = {
      id: crypto.randomUUID(),
      title: `Part ${items.length + 1}`,
      slug: "#",
      isCurrent: false,
    }
    updateAttributes({ items: [...items, newItem] })
    setEditingId(newItem.id)
  }

  const updateItem = (updatedItem: SeriesItem) => {
    // If this item is marked as current, unmark others
    let updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) return updatedItem
      if (updatedItem.isCurrent && item.isCurrent) {
        return { ...item, isCurrent: false }
      }
      return item
    })

    // Find new current index
    const newCurrentIndex = updatedItems.findIndex((i) => i.isCurrent)

    updateAttributes({
      items: updatedItems,
      currentIndex: newCurrentIndex >= 0 ? newCurrentIndex : currentIndex,
    })
    setEditingId(null)
  }

  const deleteItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id)
    const newCurrentIndex = newItems.findIndex((i) => i.isCurrent)
    updateAttributes({
      items: newItems,
      currentIndex: newCurrentIndex >= 0 ? newCurrentIndex : 0,
    })
  }

  const handleTitleSave = () => {
    updateAttributes({ title: titleText })
    setIsEditingTitle(false)
  }

  const completedCount = currentIndex + 1
  const totalCount = items.length
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <NodeViewWrapper className="my-6">
      <div
        className={cn(
          "rounded-xl border border-white/10 bg-rockship-900/50 overflow-hidden",
          selected && "ring-2 ring-rockship-accent ring-offset-2 ring-offset-rockship-950"
        )}
      >
        {/* Toolbar */}
        {selected && (
          <div
            className={cn(
              "flex items-center justify-between px-4 py-2",
              "bg-rockship-900 border-b border-white/10"
            )}
            contentEditable={false}
          >
            <span className="text-xs text-gray-500">Series Card</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-rockship-800 rounded"
              >
                <Plus className="w-3 h-3" />
                Add Part
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button
                type="button"
                onClick={deleteNode}
                className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Card content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-rockship-accent uppercase tracking-wider">
              SERIES
            </span>
            {isEditingTitle ? (
              <input
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTitleSave()
                  if (e.key === "Escape") {
                    setTitleText(title)
                    setIsEditingTitle(false)
                  }
                }}
                className="block w-full mt-1 text-xl font-bold bg-transparent border-b border-rockship-accent text-white outline-none"
                autoFocus
              />
            ) : (
              <h3
                onClick={() => setIsEditingTitle(true)}
                className="text-xl font-bold text-white mt-1 cursor-text hover:text-rockship-accent transition-colors"
                contentEditable={false}
              >
                {title}
              </h3>
            )}
          </div>

          {/* Items list */}
          <div className="space-y-2">
            {items.map((item, index) => {
              if (editingId === item.id) {
                return (
                  <div key={item.id} contentEditable={false}>
                    <SeriesItemEditor
                      item={item}
                      index={index}
                      onSave={updateItem}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                )
              }

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 group",
                    "transition-colors"
                  )}
                  contentEditable={false}
                >
                  {/* Number badge */}
                  <span
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                      item.isCurrent
                        ? "bg-rockship-accent text-white"
                        : index <= currentIndex
                        ? "bg-rockship-accent/20 text-rockship-accent"
                        : "bg-white/5 text-gray-500"
                    )}
                  >
                    {index + 1}
                  </span>

                  {/* Title */}
                  <a
                    href={item.slug}
                    className={cn(
                      "flex-1 text-sm transition-colors",
                      item.isCurrent
                        ? "text-white font-medium"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {item.title}
                  </a>

                  {/* Current badge */}
                  {item.isCurrent && (
                    <span className="text-xs text-rockship-accent">(Current)</span>
                  )}

                  {/* Edit/Delete buttons */}
                  {selected && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => setEditingId(item.id)}
                        className="p-1 rounded text-gray-500 hover:text-white hover:bg-rockship-800"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="p-1 rounded text-gray-500 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>
                Part {completedCount} of {totalCount}
              </span>
              <span>{Math.round(progressPercent)}% Complete</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-rockship-accent rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div
            className="text-center py-4 text-gray-500 border-t border-white/10"
            contentEditable={false}
          >
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 text-sm text-rockship-accent hover:underline"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add first part
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
