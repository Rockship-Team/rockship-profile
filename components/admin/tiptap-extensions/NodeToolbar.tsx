"use client"

import { GripVertical, Trash2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ResizeDirection } from "./useResizable"

interface NodeToolbarProps {
  children?: React.ReactNode
  onDelete: () => void
  showResetSize?: boolean
  onResetSize?: () => void
  position?: "top-left" | "top-center" | "top-right"
  className?: string
}

export function NodeToolbar({
  children,
  onDelete,
  showResetSize = false,
  onResetSize,
  position = "top-right",
  className,
}: NodeToolbarProps) {
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-center": "top-2 left-1/2 -translate-x-1/2",
    "top-right": "top-2 right-2",
  }

  return (
    <div
      className={cn(
        "absolute z-20",
        "flex items-center gap-1 p-1 rounded-lg",
        "bg-rockship-900/95 border border-white/10",
        "shadow-lg shadow-black/30 backdrop-blur-sm",
        positionClasses[position],
        className
      )}
      contentEditable={false}
    >
      {/* Drag handle - enable native drag for Tiptap to intercept */}
      <div
        className="p-1.5 cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300 hover:bg-rockship-800 rounded transition-colors"
        data-drag-handle
        draggable="true"
      >
        <GripVertical className="w-4 h-4 pointer-events-none" />
      </div>

      <div className="w-px h-5 bg-white/10" />

      {children}

      {/* Reset size button */}
      {showResetSize && onResetSize && (
        <>
          <button
            type="button"
            onClick={onResetSize}
            className={cn(
              "p-1.5 rounded transition-colors",
              "text-gray-400 hover:text-white hover:bg-rockship-800"
            )}
            title="Reset to original size"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/10" />
        </>
      )}

      {/* Delete button */}
      <button
        type="button"
        onClick={onDelete}
        className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}

interface ResizeHandlesProps {
  show: boolean
  isResizing: boolean
  resizeDirection: ResizeDirection
  onResizeStart: (e: React.MouseEvent, direction: ResizeDirection) => void
}

export function ResizeHandles({
  show,
  isResizing,
  resizeDirection,
  onResizeStart,
}: ResizeHandlesProps) {
  if (!show) return null

  return (
    <>
      {/* East (right) handle */}
      <div
        onMouseDown={(e) => onResizeStart(e, "e")}
        className={cn(
          "absolute top-1/2 -right-1.5 -translate-y-1/2 z-20",
          "w-3 h-16 cursor-e-resize",
          "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
          "transition-opacity hover:opacity-100",
          isResizing && resizeDirection === "e" && "opacity-100"
        )}
        contentEditable={false}
      />

      {/* West (left) handle */}
      <div
        onMouseDown={(e) => onResizeStart(e, "w")}
        className={cn(
          "absolute top-1/2 -left-1.5 -translate-y-1/2 z-20",
          "w-3 h-16 cursor-w-resize",
          "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
          "transition-opacity hover:opacity-100",
          isResizing && resizeDirection === "w" && "opacity-100"
        )}
        contentEditable={false}
      />

      {/* South (bottom) handle */}
      <div
        onMouseDown={(e) => onResizeStart(e, "s")}
        className={cn(
          "absolute -bottom-1.5 left-1/2 -translate-x-1/2 z-20",
          "w-16 h-3 cursor-s-resize",
          "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
          "transition-opacity hover:opacity-100",
          isResizing && resizeDirection === "s" && "opacity-100"
        )}
        contentEditable={false}
      />

      {/* Southeast (bottom-right) corner handle */}
      <div
        onMouseDown={(e) => onResizeStart(e, "se")}
        className={cn(
          "absolute -bottom-1.5 -right-1.5 z-20",
          "w-4 h-4 cursor-se-resize",
          "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
          "transition-opacity hover:opacity-100",
          isResizing && resizeDirection === "se" && "opacity-100"
        )}
        contentEditable={false}
      />

      {/* Southwest (bottom-left) corner handle */}
      <div
        onMouseDown={(e) => onResizeStart(e, "sw")}
        className={cn(
          "absolute -bottom-1.5 -left-1.5 z-20",
          "w-4 h-4 cursor-sw-resize",
          "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
          "transition-opacity hover:opacity-100",
          isResizing && resizeDirection === "sw" && "opacity-100"
        )}
        contentEditable={false}
      />
    </>
  )
}

interface SizeIndicatorProps {
  show: boolean
  width: number | null
  height: number | null
}

export function SizeIndicator({ show, width, height }: SizeIndicatorProps) {
  if (!show || (!width && !height)) return null

  const parts: string[] = []
  if (width) parts.push(`${Math.round(width)}px`)
  if (height) parts.push(`${Math.round(height)}px`)

  return (
    <div
      className={cn(
        "absolute top-2 left-1/2 -translate-x-1/2 z-30",
        "px-2 py-1 rounded text-xs font-medium",
        "bg-rockship-900/90 text-white border border-white/10"
      )}
      contentEditable={false}
    >
      {parts.join(" × ")}
    </div>
  )
}

// Keep old name for backwards compatibility
export const WidthIndicator = SizeIndicator
