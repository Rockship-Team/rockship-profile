"use client"

import { NodeViewWrapper, NodeViewProps, useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import {
  Plus,
  Trash2,
  LayoutGrid,
  Eye,
  EyeOff,
  Palette,
  GripVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { GridRow, GridCell } from "./GridExtension"
import { useResizable } from "./useResizable"
import { NodeToolbar, ResizeHandles, SizeIndicator } from "./NodeToolbar"
import { CalloutExtension } from "./CalloutExtension"
import { TimelineExtension } from "./TimelineExtension"
import { SeriesCardExtension } from "./SeriesCardExtension"
import { ImageExtension } from "./ImageExtension"

interface GridCellEditorProps {
  cell: GridCell
  onUpdate: (content: string) => void
  minHeight?: number
}

// Mini Tiptap editor for grid cells - renders custom components properly
function GridCellEditor({ cell, onUpdate, minHeight }: GridCellEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const isInternalUpdate = useRef(false)

  // Create mini editor with same extensions as main editor
  const cellEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      CalloutExtension,
      TimelineExtension,
      SeriesCardExtension,
      ImageExtension,
    ],
    content: cell.content || "",
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[60px] p-2 outline-none text-white text-sm",
          "prose prose-invert prose-sm max-w-none",
          "[&_.ProseMirror]:outline-none"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      if (!isInternalUpdate.current) {
        const html = editor.getHTML()
        onUpdate(html)
      }
    },
    immediatelyRender: false,
  })

  // Sync content from parent when cell.content changes externally
  useEffect(() => {
    if (cellEditor && cell.content !== cellEditor.getHTML()) {
      isInternalUpdate.current = true
      cellEditor.commands.setContent(cell.content || "")
      isInternalUpdate.current = false
    }
  }, [cell.content, cellEditor])

  // Handle drag and drop
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(true)
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "copy"
      }
      setIsDragOver(true)
    }

    const handleDragLeave = (e: DragEvent) => {
      const relatedTarget = e.relatedTarget as Node
      if (!container.contains(relatedTarget)) {
        setIsDragOver(false)
      }
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      setIsDragOver(false)

      if (!cellEditor) return

      // Get content from dataTransfer or stored content
      let htmlContent = e.dataTransfer?.getData("text/html") || ""
      const textContent = e.dataTransfer?.getData("text/plain") || ""

      if (!htmlContent && !textContent) {
        const storedContent = (window as unknown as { __draggedContent?: string }).__draggedContent
        if (storedContent) {
          htmlContent = storedContent
          ;(window as unknown as { __draggedContent?: string }).__draggedContent = undefined
        }
      }

      // Clean up HTML
      if (htmlContent) {
        const tempDiv = document.createElement("div")
        tempDiv.innerHTML = htmlContent
        tempDiv.querySelectorAll("meta").forEach(el => el.remove())
        htmlContent = tempDiv.innerHTML.trim()
      }

      const droppedContent = htmlContent || textContent
      if (!droppedContent) return

      // Insert content at end of editor
      cellEditor.chain().focus().setTextSelection(cellEditor.state.doc.content.size).insertContent(droppedContent).run()
    }

    container.addEventListener("dragenter", handleDragEnter, true)
    container.addEventListener("dragover", handleDragOver, true)
    container.addEventListener("dragleave", handleDragLeave, true)
    container.addEventListener("drop", handleDrop, true)

    return () => {
      container.removeEventListener("dragenter", handleDragEnter, true)
      container.removeEventListener("dragover", handleDragOver, true)
      container.removeEventListener("dragleave", handleDragLeave, true)
      container.removeEventListener("drop", handleDrop, true)
    }
  }, [cellEditor])

  const hasContent = cellEditor && cellEditor.state.doc.content.size > 2

  // Handle drag start for dragging content OUT of the cell
  const handleDragStart = (e: React.DragEvent) => {
    if (cellEditor && hasContent) {
      const html = cellEditor.getHTML()
      e.dataTransfer.setData("text/html", html)
      e.dataTransfer.setData("text/plain", cellEditor.getText())
      e.dataTransfer.effectAllowed = "copyMove"
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full group/cell",
        isDragOver && "ring-2 ring-rockship-accent ring-inset"
      )}
      data-grid-cell-dropzone="true"
    >
      {/* Drop overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-rockship-accent/20 pointer-events-none rounded">
          <div className="px-3 py-1.5 text-xs rounded-full bg-rockship-accent text-white">
            Drop here
          </div>
        </div>
      )}

      {/* Drag handle */}
      {hasContent && (
        <div
          draggable="true"
          onDragStart={handleDragStart}
          className={cn(
            "absolute top-1 right-1 z-10 p-1 rounded cursor-grab active:cursor-grabbing",
            "bg-rockship-800/80 text-gray-400 hover:text-white hover:bg-rockship-700",
            "opacity-0 group-hover/cell:opacity-100 transition-opacity"
          )}
          title="Drag content to another location"
        >
          <GripVertical className="w-3 h-3" />
        </div>
      )}

      {/* Mini Tiptap editor - renders custom components properly */}
      <div
        style={{ minHeight: minHeight ? `${minHeight - 24}px` : undefined }}
        className="w-full min-h-[60px] h-full [&_.ProseMirror]:min-h-[60px] [&_.ProseMirror]:p-2 [&_.ProseMirror]:outline-none"
      >
        {cellEditor ? (
          <EditorContent editor={cellEditor} />
        ) : (
          <div className="p-2 text-gray-500 text-sm">Loading...</div>
        )}
      </div>
    </div>
  )
}

export function GridNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
  editor,
  getPos,
}: NodeViewProps) {
  const attrs = node.attrs as {
    columns: number
    rows: GridRow[]
    width: number | null
    height: number | null
    showBorder?: boolean
    backgroundColor: string | null
  }
  const columns = attrs.columns
  const rows = attrs.rows
  const width = attrs.width
  const height = attrs.height
  // Default to true for backward compatibility with existing grids
  const showBorder = attrs.showBorder !== false
  const backgroundColor = attrs.backgroundColor || "#05060B"

  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const handleSelectNode = () => {
    const pos = getPos()
    if (typeof pos === "number" && editor) {
      editor.chain().focus().setNodeSelection(pos).run()
    }
  }

  // Predefined color palette
  const colorPalette = [
    { name: "Default", value: "#05060B" },
    { name: "Dark", value: "#1a1a2e" },
    { name: "Navy", value: "#0f172a" },
    { name: "Slate", value: "#1e293b" },
    { name: "Gray", value: "#374151" },
    { name: "Zinc", value: "#27272a" },
    { name: "Purple", value: "#2d1b4e" },
    { name: "Blue", value: "#1e3a5f" },
    { name: "Green", value: "#1a3a2f" },
    { name: "Red", value: "#3f1e1e" },
  ]

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const {
    containerRef,
    currentWidth,
    currentHeight,
    isResizing,
    resizeDirection,
    handleResizeStart,
    resetSize,
  } = useResizable({
    initialWidth: width,
    initialHeight: height,
    minWidth: 300,
    minHeight: 100,
    onWidthChange: useCallback(
      (newWidth: number | null) => updateAttributes({ width: newWidth }),
      [updateAttributes]
    ),
    onHeightChange: useCallback(
      (newHeight: number | null) => updateAttributes({ height: newHeight }),
      [updateAttributes]
    ),
  })

  const setColumns = (newColumns: number) => {
    // Update existing rows to have the correct number of cells
    const updatedRows = rows.map((row) => {
      if (row.cells.length < newColumns) {
        // Add new cells
        return {
          ...row,
          cells: [
            ...row.cells,
            ...Array.from({ length: newColumns - row.cells.length }, () => ({
              id: crypto.randomUUID(),
              content: "",
            })),
          ],
        }
      } else if (row.cells.length > newColumns) {
        // Remove excess cells
        return {
          ...row,
          cells: row.cells.slice(0, newColumns),
        }
      }
      return row
    })
    updateAttributes({ columns: newColumns, rows: updatedRows })
  }

  const addRow = () => {
    const newRow: GridRow = {
      id: crypto.randomUUID(),
      cells: Array.from({ length: columns }, () => ({
        id: crypto.randomUUID(),
        content: "",
      })),
    }
    updateAttributes({ rows: [...rows, newRow] })
  }

  const deleteRow = (rowId: string) => {
    updateAttributes({
      rows: rows.filter((row) => row.id !== rowId),
    })
  }

  const updateCellContent = (rowId: string, cellId: string, content: string) => {
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          cells: row.cells.map((cell) =>
            cell.id === cellId ? { ...cell, content } : cell
          ),
        }
      }
      return row
    })
    updateAttributes({ rows: newRows })
  }

  const getGridColsClass = (cols: number) => {
    // Responsive: on mobile (< md) use fewer columns
    switch (cols) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      default:
        return "grid-cols-1 sm:grid-cols-2"
    }
  }

  // Get border class based on responsive column changes
  const getCellBorderClass = (cellIndex: number, cols: number) => {
    if (!showBorder) return ""
    if (cellIndex === 0) return ""

    switch (cols) {
      case 1:
        return ""
      case 2:
        return "sm:border-l border-t sm:border-t-0 border-white/10"
      case 3:
        return cellIndex % 2 === 1
          ? "sm:border-l border-t sm:border-t-0 border-white/10"
          : "md:border-l border-t md:border-t-0 border-white/10"
      case 4:
        return cellIndex % 2 === 1
          ? "sm:border-l border-t sm:border-t-0 border-white/10"
          : "md:border-l border-t md:border-t-0 border-white/10"
      default:
        return "sm:border-l border-t sm:border-t-0 border-white/10"
    }
  }

  // Calculate row height if component has a fixed height
  const rowCount = rows.length || 1
  const rowHeight = currentHeight ? Math.floor(currentHeight / rowCount) : undefined

  return (
    <NodeViewWrapper
      className="my-6 group relative max-w-full"
      style={{
        width: currentWidth ? `min(${currentWidth}px, 100%)` : undefined,
        height: currentHeight ? `${currentHeight}px` : undefined,
      }}
      ref={containerRef}
    >
      {/* Toolbar - positioned above the border */}
      {selected && (
        <NodeToolbar
          onDelete={deleteNode}
          showResetSize={!!(currentWidth || currentHeight)}
          onResetSize={resetSize}
          position="top-right"
          className="-top-12 right-0"
        >
          {/* Column controls */}
          <div className="flex items-center gap-0.5 px-1">
            <span className="text-xs text-gray-500 mr-1">Cols:</span>
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setColumns(num)}
                className={cn(
                  "w-6 h-6 flex items-center justify-center text-xs rounded",
                  columns === num
                    ? "bg-rockship-accent text-white"
                    : "text-gray-400 hover:text-white hover:bg-rockship-800"
                )}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-white/10" />

          <button
            type="button"
            onClick={addRow}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-rockship-800 rounded"
          >
            <Plus className="w-3 h-3" />
            Row
          </button>

          <div className="w-px h-5 bg-white/10" />

          {/* Border toggle */}
          <button
            type="button"
            onClick={() => updateAttributes({ showBorder: !showBorder })}
            className={cn(
              "flex items-center gap-1 px-2 py-1 text-xs rounded",
              showBorder
                ? "text-gray-300 hover:text-white hover:bg-rockship-800"
                : "text-gray-500 hover:text-gray-300 hover:bg-rockship-800"
            )}
            title={showBorder ? "Hide border" : "Show border"}
          >
            {showBorder ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>

          {/* Background color picker */}
          <div className="relative" ref={colorPickerRef}>
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 text-xs rounded",
                "text-gray-300 hover:text-white hover:bg-rockship-800"
              )}
              title="Background color"
            >
              <Palette className="w-3.5 h-3.5" />
              <span
                className="w-3 h-3 rounded-sm border border-white/20"
                style={{ backgroundColor }}
              />
            </button>

            {showColorPicker && (
              <div className="absolute top-full right-0 mt-1 p-2 bg-rockship-900 border border-white/10 rounded-lg shadow-xl z-50 min-w-[160px]">
                <div className="grid grid-cols-5 gap-1.5">
                  {colorPalette.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => {
                        updateAttributes({ backgroundColor: color.value })
                        setShowColorPicker(false)
                      }}
                      className={cn(
                        "w-6 h-6 rounded border transition-all",
                        backgroundColor.toLowerCase() === color.value?.toLowerCase()
                          ? "border-rockship-accent ring-1 ring-rockship-accent"
                          : "border-white/20 hover:border-white/40"
                      )}
                      style={{ backgroundColor: color.value || "transparent" }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/10">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => updateAttributes({ backgroundColor: e.target.value })}
                    className="w-full h-6 rounded cursor-pointer"
                    title="Custom color"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-white/10" />
        </NodeToolbar>
      )}

      {/* Resize handles - positioned outside the overflow container */}
      <ResizeHandles
        show={selected}
        isResizing={isResizing}
        resizeDirection={resizeDirection}
        onResizeStart={handleResizeStart}
      />

      {/* Size indicator */}
      <SizeIndicator
        show={isResizing}
        width={currentWidth}
        height={currentHeight}
      />

      <div
        className={cn(
          "relative rounded-lg overflow-hidden h-full",
          showBorder && "border border-white/10",
          selected && "ring-2 ring-rockship-accent ring-offset-4 ring-offset-rockship-950",
          isResizing && "select-none"
        )}
        style={{ backgroundColor: backgroundColor || undefined }}
      >
        {/* Selection Header Bar - easy to click to select */}
        <div
          className={cn(
            "flex items-center justify-between px-3 py-1.5",
            "bg-rockship-900/80",
            showBorder && "border-b border-white/10",
            "cursor-pointer select-none",
            "hover:bg-rockship-800/80 transition-colors"
          )}
          contentEditable={false}
          onClick={handleSelectNode}
        >
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-500">
              Grid {columns}×{rows.length}
            </span>
          </div>
          <span className="text-xs text-gray-600">
            {selected ? "Click cells to edit" : "Click to select"}
          </span>
        </div>

        {/* Grid Content */}
        <div
          className="h-full"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {rows.map((row, rowIndex) => (
            <div
              key={row.id}
              className={cn(
                "grid gap-0 relative group/row flex-1",
                getGridColsClass(columns),
                rowIndex > 0 && showBorder && "border-t border-white/10"
              )}
              style={{ minHeight: rowHeight ? `${rowHeight}px` : undefined }}
            >
              {/* Row delete button */}
              {selected && rows.length > 1 && (
                <button
                  type="button"
                  onClick={() => deleteRow(row.id)}
                  className={cn(
                    "absolute -left-8 top-1/2 -translate-y-1/2 z-10",
                    "w-6 h-6 flex items-center justify-center rounded",
                    "text-gray-500 hover:text-red-400 hover:bg-red-500/10",
                    "opacity-0 group-hover/row:opacity-100 transition-opacity"
                  )}
                  contentEditable={false}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {row.cells.map((cell, cellIndex) => (
                <div
                  key={cell.id}
                  className={cn(
                    "relative",
                    getCellBorderClass(cellIndex, columns)
                  )}
                  style={{ minHeight: rowHeight ? `${rowHeight}px` : '80px' }}
                  data-grid-cell="true"
                >
                  <GridCellEditor
                    cell={cell}
                    onUpdate={(content) =>
                      updateCellContent(row.id, cell.id, content)
                    }
                    minHeight={rowHeight}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {rows.length === 0 && (
          <div
            className="text-center py-8 text-gray-500"
            contentEditable={false}
          >
            <LayoutGrid className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No grid rows yet.</p>
            <button
              type="button"
              onClick={addRow}
              className="mt-2 px-4 py-2 text-sm bg-rockship-accent text-white rounded hover:bg-rockship-accent/90"
            >
              <Plus className="w-4 h-4 inline mr-1" />
              Add First Row
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
