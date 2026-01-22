"use client"

import { NodeViewWrapper, NodeViewProps } from "@tiptap/react"
import { useState, useCallback } from "react"
import {
  Rocket,
  Star,
  RefreshCw,
  Check,
  Code,
  Plus,
  Pencil,
  X,
  Save,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimelineItem } from "./TimelineExtension"
import { useResizable } from "./useResizable"
import { NodeToolbar, ResizeHandles, SizeIndicator } from "./NodeToolbar"

const iconMap = {
  rocket: Rocket,
  star: Star,
  refresh: RefreshCw,
  check: Check,
  code: Code,
}

interface TimelineItemEditorProps {
  item: TimelineItem
  onSave: (item: TimelineItem) => void
  onCancel: () => void
}

function TimelineItemEditor({ item, onSave, onCancel }: TimelineItemEditorProps) {
  const [editedItem, setEditedItem] = useState(item)

  return (
    <div className="p-4 bg-rockship-900 border border-white/10 rounded-lg space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Date</label>
          <input
            type="text"
            value={editedItem.date}
            onChange={(e) => setEditedItem({ ...editedItem, date: e.target.value })}
            className="w-full px-3 py-1.5 text-sm bg-rockship-800 border border-white/10 rounded text-white"
            placeholder="January 2025"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Position</label>
          <select
            value={editedItem.position}
            onChange={(e) =>
              setEditedItem({ ...editedItem, position: e.target.value as "left" | "right" })
            }
            className="w-full px-3 py-1.5 text-sm bg-rockship-800 border border-white/10 rounded text-white"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Title</label>
        <input
          type="text"
          value={editedItem.title}
          onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
          className="w-full px-3 py-1.5 text-sm bg-rockship-800 border border-white/10 rounded text-white"
          placeholder="Event Title"
        />
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Description</label>
        <textarea
          value={editedItem.description}
          onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
          className="w-full px-3 py-1.5 text-sm bg-rockship-800 border border-white/10 rounded text-white resize-none"
          rows={2}
          placeholder="Event description..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 block mb-1">Link URL (optional)</label>
          <input
            type="text"
            value={editedItem.link || ""}
            onChange={(e) => setEditedItem({ ...editedItem, link: e.target.value })}
            className="w-full px-3 py-1.5 text-sm bg-rockship-800 border border-white/10 rounded text-white"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Link Text</label>
          <input
            type="text"
            value={editedItem.linkText || ""}
            onChange={(e) => setEditedItem({ ...editedItem, linkText: e.target.value })}
            className="w-full px-3 py-1.5 text-sm bg-rockship-800 border border-white/10 rounded text-white"
            placeholder="View more"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-500 block mb-1">Icon</label>
        <div className="flex gap-2">
          {(Object.keys(iconMap) as Array<keyof typeof iconMap>).map((iconKey) => {
            const IconComponent = iconMap[iconKey]
            return (
              <button
                key={iconKey}
                type="button"
                onClick={() => setEditedItem({ ...editedItem, icon: iconKey })}
                className={cn(
                  "p-2 rounded transition-colors",
                  editedItem.icon === iconKey
                    ? "bg-rockship-accent text-white"
                    : "bg-rockship-800 text-gray-400 hover:text-white"
                )}
              >
                <IconComponent className="w-4 h-4" />
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 text-sm text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(editedItem)}
          className="px-3 py-1.5 text-sm bg-rockship-accent text-white rounded hover:bg-rockship-accent/90"
        >
          <Save className="w-4 h-4 inline mr-1" />
          Save
        </button>
      </div>
    </div>
  )
}

export function TimelineNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
  editor,
  getPos,
}: NodeViewProps) {
  const { items, width } = node.attrs as { items: TimelineItem[]; width: number | null }
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    containerRef,
    currentWidth,
    isResizing,
    resizeDirection,
    handleResizeStart,
    resetSize,
  } = useResizable({
    initialWidth: width,
    initialHeight: null,
    minWidth: 400,
    minHeight: 80,
    onWidthChange: useCallback(
      (newWidth: number | null) => updateAttributes({ width: newWidth }),
      [updateAttributes]
    ),
    onHeightChange: useCallback(() => {}, []),
  })

  const addItem = () => {
    const newItem: TimelineItem = {
      id: crypto.randomUUID(),
      date: "Month Year",
      title: "New Event",
      description: "Description of the event",
      icon: "star",
      position: items.length % 2 === 0 ? "left" : "right",
    }
    updateAttributes({ items: [...items, newItem] })
    setEditingId(newItem.id)
  }

  const updateItem = (updatedItem: TimelineItem) => {
    updateAttributes({
      items: items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    })
    setEditingId(null)
  }

  const deleteItem = (id: string) => {
    updateAttributes({
      items: items.filter((item) => item.id !== id),
    })
  }

  const handleSelectNode = () => {
    const pos = getPos()
    if (typeof pos === "number" && editor) {
      editor.chain().focus().setNodeSelection(pos).run()
    }
  }

  return (
    <NodeViewWrapper
      className="my-8 group relative"
      style={{ width: currentWidth ? `${currentWidth}px` : undefined }}
      ref={containerRef}
    >
      {/* Toolbar - positioned outside the ring container */}
      {selected && (
        <NodeToolbar
          onDelete={deleteNode}
          showResetSize={!!currentWidth}
          onResetSize={resetSize}
          position="top-right"
          className="-top-12 right-0"
        >
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-rockship-800 rounded"
          >
            <Plus className="w-3 h-3" />
            Add Event
          </button>
          <div className="w-px h-5 bg-white/10" />
        </NodeToolbar>
      )}

      <div
        className={cn(
          "relative",
          selected && "ring-2 ring-rockship-accent ring-offset-4 ring-offset-rockship-950 rounded-lg",
          isResizing && "select-none"
        )}
      >
        {/* Resize handles */}
        <ResizeHandles
          show={selected}
          isResizing={isResizing}
          resizeDirection={resizeDirection}
          onResizeStart={handleResizeStart}
        />

        {/* Size indicator */}
        <SizeIndicator show={isResizing} width={currentWidth} height={null} />

        {/* Selection Header Bar */}
        <div
          className={cn(
            "flex items-center justify-between px-4 py-2 mb-4",
            "bg-rockship-900/50 border border-white/10 rounded-lg",
            "cursor-pointer select-none",
            "hover:bg-rockship-900/70 transition-colors"
          )}
          contentEditable={false}
          onClick={handleSelectNode}
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-rockship-accent" />
            <span className="text-sm text-gray-400">
              Timeline · {items.length} event{items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {selected ? "Click events to edit" : "Click to select"}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 -translate-x-1/2" />

          {/* Items */}
          <div className="space-y-8">
            {items.map((item) => {
              const Icon = iconMap[item.icon || "star"]
              const isLeft = item.position === "left"

              if (editingId === item.id) {
                return (
                  <div key={item.id} className="px-4" contentEditable={false}>
                    <TimelineItemEditor
                      item={item}
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
                    "relative flex items-center gap-4 group/item cursor-pointer",
                    isLeft ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      "w-[calc(50%-2rem)] p-4 rounded-lg relative",
                      "bg-rockship-900/50 border border-white/10",
                      "transition-all duration-300 ease-out",
                      "group-hover/item:border-rockship-accent/50 group-hover/item:bg-rockship-900/70",
                      isLeft ? "text-right" : "text-left"
                    )}
                  >
                    {/* Left/Right border highlight on hover */}
                    <div
                      className={cn(
                        "absolute top-0 bottom-0 w-1 rounded-full",
                        "bg-gradient-to-b from-rockship-accent via-rockship-accent to-rockship-accent/50",
                        "opacity-0 group-hover/item:opacity-100 transition-opacity duration-300",
                        isLeft ? "right-0 translate-x-0.5" : "left-0 -translate-x-0.5"
                      )}
                    />
                    {/* Edit/Delete buttons */}
                    {selected && (
                      <div
                        className={cn(
                          "absolute top-2 opacity-0 group-hover/item:opacity-100 transition-opacity",
                          "flex gap-1",
                          isLeft ? "left-2" : "right-2"
                        )}
                        contentEditable={false}
                      >
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

                    <span className="text-sm text-rockship-accent">{item.date}</span>
                    <h4 className="font-semibold text-white mt-1 group-hover/item:text-rockship-accent transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-rockship-accent hover:underline mt-2"
                      >
                        {item.linkText || "Learn more"}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="z-10">
                    <div className="w-10 h-10 rounded-full bg-rockship-accent flex items-center justify-center border-4 border-rockship-950 transition-transform duration-300 group-hover/item:scale-125">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="w-[calc(50%-2rem)]" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div
            className="text-center py-8 text-gray-500"
            contentEditable={false}
          >
            <p>No timeline events yet.</p>
            <button
              type="button"
              onClick={addItem}
              className="mt-2 px-4 py-2 text-sm bg-rockship-accent text-white rounded hover:bg-rockship-accent/90"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add First Event
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
