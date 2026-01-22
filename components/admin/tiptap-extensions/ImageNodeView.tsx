"use client"

import { NodeViewWrapper, NodeViewProps } from "@tiptap/react"
import { useState, useCallback, useRef, useEffect } from "react"
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  GripVertical,
  Upload,
  Loader2,
  Maximize2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { ImageAlignment } from "./ImageExtension"
import { uploadImage } from "@/lib/supabase/storage"

type ResizeDirection = "e" | "w" | "se" | "sw" | null

export function ImageNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const { src, alt, caption, alignment, width } = node.attrs as {
    src: string
    alt: string
    caption: string
    alignment: ImageAlignment
    width: number | null
  }

  const [isEditing, setIsEditing] = useState(false)
  const [captionText, setCaptionText] = useState(caption || "")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Resize state
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null)
  const [currentWidth, setCurrentWidth] = useState<number | null>(width)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number>(0)
  const startWidthRef = useRef<number>(0)

  // Sync width from props
  useEffect(() => {
    setCurrentWidth(width)
  }, [width])

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      e.preventDefault()
      e.stopPropagation()

      if (!containerRef.current) return

      setIsResizing(true)
      setResizeDirection(direction)
      startXRef.current = e.clientX
      startWidthRef.current = containerRef.current.offsetWidth
    },
    []
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return

      const deltaX = e.clientX - startXRef.current
      let newWidth: number

      // Calculate new width based on direction
      if (resizeDirection === "e" || resizeDirection === "se") {
        newWidth = startWidthRef.current + deltaX
      } else {
        newWidth = startWidthRef.current - deltaX
      }

      // Clamp width between 100px and 100% of container
      const minWidth = 100
      const maxWidth = containerRef.current?.parentElement?.offsetWidth || 800
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))

      setCurrentWidth(newWidth)
    }

    const handleMouseUp = () => {
      if (isResizing && currentWidth) {
        updateAttributes({ width: currentWidth })
      }
      setIsResizing(false)
      setResizeDirection(null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, resizeDirection, currentWidth, updateAttributes])

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file")
        return
      }

      // Validate file size (5MB limit based on bucket config)
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("Image must be less than 5MB")
        return
      }

      setIsUploading(true)
      setUploadError(null)

      try {
        const result = await uploadImage(file)
        if (result.error) {
          setUploadError(result.error)
        } else {
          updateAttributes({ src: result.url })
        }
      } catch (error) {
        setUploadError("Failed to upload image")
        console.error("Upload error:", error)
      } finally {
        setIsUploading(false)
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    },
    [updateAttributes]
  )

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleAlignmentChange = useCallback(
    (newAlignment: ImageAlignment) => {
      updateAttributes({ alignment: newAlignment })
    },
    [updateAttributes]
  )

  const handleCaptionSave = useCallback(() => {
    updateAttributes({ caption: captionText })
    setIsEditing(false)
  }, [captionText, updateAttributes])

  const handleCaptionKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        handleCaptionSave()
      }
      if (e.key === "Escape") {
        setCaptionText(caption || "")
        setIsEditing(false)
      }
    },
    [caption, handleCaptionSave]
  )

  const alignmentClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  }

  return (
    <NodeViewWrapper
      className={cn(
        "relative my-4 group",
        alignmentClasses[alignment]
      )}
      style={{
        maxWidth: "100%",
        width: currentWidth ? `${currentWidth}px` : undefined,
      }}
      ref={containerRef}
    >
      {/* Toolbar - shown when selected */}
      {selected && (
        <div
          className={cn(
            "absolute -top-10 left-1/2 -translate-x-1/2 z-10",
            "flex items-center gap-1 p-1 rounded-lg",
            "bg-rockship-900 border border-white/10",
            "shadow-lg shadow-black/20"
          )}
          contentEditable={false}
        >
          {/* Drag handle */}
          <div
            className="p-1.5 cursor-grab text-gray-500 hover:text-gray-300"
            data-drag-handle
          >
            <GripVertical className="w-4 h-4" />
          </div>

          <div className="w-px h-5 bg-white/10" />

          {/* Alignment buttons */}
          <button
            type="button"
            onClick={() => handleAlignmentChange("left")}
            className={cn(
              "p-1.5 rounded transition-colors",
              alignment === "left"
                ? "bg-rockship-accent text-white"
                : "text-gray-400 hover:text-white hover:bg-rockship-800"
            )}
            title="Align left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignmentChange("center")}
            className={cn(
              "p-1.5 rounded transition-colors",
              alignment === "center"
                ? "bg-rockship-accent text-white"
                : "text-gray-400 hover:text-white hover:bg-rockship-800"
            )}
            title="Align center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleAlignmentChange("right")}
            className={cn(
              "p-1.5 rounded transition-colors",
              alignment === "right"
                ? "bg-rockship-accent text-white"
                : "text-gray-400 hover:text-white hover:bg-rockship-800"
            )}
            title="Align right"
          >
            <AlignRight className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-white/10" />

          {/* Reset width button */}
          {currentWidth && (
            <button
              type="button"
              onClick={() => {
                setCurrentWidth(null)
                updateAttributes({ width: null })
              }}
              className={cn(
                "p-1.5 rounded transition-colors",
                "text-gray-400 hover:text-white hover:bg-rockship-800"
              )}
              title="Reset to original size"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}

          {/* Replace image button */}
          <button
            type="button"
            onClick={triggerFileUpload}
            disabled={isUploading}
            className={cn(
              "p-1.5 rounded transition-colors",
              "text-gray-400 hover:text-white hover:bg-rockship-800",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
            title="Replace image"
          >
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
          </button>

          {/* Delete button */}
          <button
            type="button"
            onClick={deleteNode}
            className="p-1.5 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Delete image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden file input for upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload error message */}
      {uploadError && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 mt-1 z-10",
            "px-3 py-1.5 rounded text-sm",
            "bg-red-500/10 border border-red-500/20 text-red-400"
          )}
          contentEditable={false}
        >
          {uploadError}
        </div>
      )}

      {/* Image container */}
      <figure
        className={cn(
          "relative rounded-lg overflow-hidden",
          "border-2 transition-colors",
          selected ? "border-rockship-accent" : "border-transparent",
          isResizing && "select-none"
        )}
      >
        {/* Resize handles - shown when selected */}
        {selected && src && (
          <>
            {/* East (right) handle */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "e")}
              className={cn(
                "absolute top-1/2 -right-1 -translate-y-1/2 z-20",
                "w-2 h-12 cursor-e-resize",
                "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
                "transition-opacity hover:opacity-100",
                isResizing && resizeDirection === "e" && "opacity-100"
              )}
              contentEditable={false}
            />

            {/* West (left) handle */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "w")}
              className={cn(
                "absolute top-1/2 -left-1 -translate-y-1/2 z-20",
                "w-2 h-12 cursor-w-resize",
                "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
                "transition-opacity hover:opacity-100",
                isResizing && resizeDirection === "w" && "opacity-100"
              )}
              contentEditable={false}
            />

            {/* Southeast (bottom-right) corner handle */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "se")}
              className={cn(
                "absolute -bottom-1 -right-1 z-20",
                "w-4 h-4 cursor-se-resize",
                "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
                "transition-opacity hover:opacity-100",
                isResizing && resizeDirection === "se" && "opacity-100"
              )}
              contentEditable={false}
            />

            {/* Southwest (bottom-left) corner handle */}
            <div
              onMouseDown={(e) => handleResizeStart(e, "sw")}
              className={cn(
                "absolute -bottom-1 -left-1 z-20",
                "w-4 h-4 cursor-sw-resize",
                "bg-rockship-accent rounded-full opacity-0 group-hover:opacity-100",
                "transition-opacity hover:opacity-100",
                isResizing && resizeDirection === "sw" && "opacity-100"
              )}
              contentEditable={false}
            />
          </>
        )}

        {/* Width indicator during resize */}
        {isResizing && currentWidth && (
          <div
            className={cn(
              "absolute top-2 left-1/2 -translate-x-1/2 z-30",
              "px-2 py-1 rounded text-xs font-medium",
              "bg-rockship-900/90 text-white border border-white/10"
            )}
            contentEditable={false}
          >
            {Math.round(currentWidth)}px
          </div>
        )}
        {/* Upload overlay when uploading */}
        {isUploading && (
          <div
            className={cn(
              "absolute inset-0 z-10",
              "flex items-center justify-center",
              "bg-rockship-900/80"
            )}
          >
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm">Uploading...</span>
            </div>
          </div>
        )}

        {/* Image or upload placeholder */}
        {src ? (
          <img
            src={src}
            alt={alt || ""}
            className={cn(
              "w-full h-auto block",
              isUploading && "opacity-50",
              isResizing && "pointer-events-none"
            )}
            draggable={false}
          />
        ) : (
          <div
            onClick={triggerFileUpload}
            className={cn(
              "flex flex-col items-center justify-center gap-3",
              "min-h-[200px] cursor-pointer",
              "bg-rockship-800/50 hover:bg-rockship-800/70",
              "transition-colors"
            )}
          >
            <Upload className="w-10 h-10 text-gray-500" />
            <span className="text-sm text-gray-400">
              Click to upload an image
            </span>
            <span className="text-xs text-gray-600">
              PNG, JPG, GIF up to 5MB
            </span>
          </div>
        )}

        {/* Caption */}
        <figcaption
          className={cn(
            "px-4 py-2 text-sm text-center",
            "bg-rockship-900/80 text-gray-400",
            "border-t border-white/10"
          )}
        >
          {isEditing ? (
            <input
              type="text"
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              onBlur={handleCaptionSave}
              onKeyDown={handleCaptionKeyDown}
              placeholder="Add a caption..."
              className={cn(
                "w-full bg-transparent text-center",
                "text-gray-300 placeholder-gray-600",
                "outline-none border-b border-rockship-accent"
              )}
              autoFocus
            />
          ) : (
            <span
              onClick={() => setIsEditing(true)}
              className={cn(
                "cursor-text inline-block min-w-[100px]",
                !caption && "text-gray-600 italic"
              )}
            >
              {caption || "Click to add caption..."}
            </span>
          )}
        </figcaption>
      </figure>
    </NodeViewWrapper>
  )
}
