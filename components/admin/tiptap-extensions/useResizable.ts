"use client"

import { useState, useCallback, useRef, useEffect } from "react"

export type ResizeDirection = "e" | "w" | "s" | "se" | "sw" | "n" | "ne" | "nw" | null

interface UseResizableOptions {
  initialWidth: number | null
  initialHeight: number | null
  minWidth?: number
  minHeight?: number
  onWidthChange: (width: number | null) => void
  onHeightChange: (height: number | null) => void
}

export function useResizable({
  initialWidth,
  initialHeight,
  minWidth = 200,
  minHeight = 80,
  onWidthChange,
  onHeightChange,
}: UseResizableOptions) {
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection>(null)
  const [currentWidth, setCurrentWidth] = useState<number | null>(initialWidth)
  const [currentHeight, setCurrentHeight] = useState<number | null>(initialHeight)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number>(0)
  const startYRef = useRef<number>(0)
  const startWidthRef = useRef<number>(0)
  const startHeightRef = useRef<number>(0)

  // Sync from props
  useEffect(() => {
    setCurrentWidth(initialWidth)
  }, [initialWidth])

  useEffect(() => {
    setCurrentHeight(initialHeight)
  }, [initialHeight])

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, direction: ResizeDirection) => {
      e.preventDefault()
      e.stopPropagation()

      if (!containerRef.current) return

      setIsResizing(true)
      setResizeDirection(direction)
      startXRef.current = e.clientX
      startYRef.current = e.clientY
      startWidthRef.current = containerRef.current.offsetWidth
      startHeightRef.current = containerRef.current.offsetHeight
    },
    []
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeDirection) return

      const deltaX = e.clientX - startXRef.current
      const deltaY = e.clientY - startYRef.current

      // Handle width changes
      if (resizeDirection.includes("e")) {
        const newWidth = startWidthRef.current + deltaX
        const maxWidth = containerRef.current?.parentElement?.offsetWidth || 1200
        setCurrentWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)))
      } else if (resizeDirection.includes("w")) {
        const newWidth = startWidthRef.current - deltaX
        const maxWidth = containerRef.current?.parentElement?.offsetWidth || 1200
        setCurrentWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)))
      }

      // Handle height changes
      if (resizeDirection.includes("s")) {
        const newHeight = startHeightRef.current + deltaY
        setCurrentHeight(Math.max(minHeight, newHeight))
      } else if (resizeDirection.includes("n")) {
        const newHeight = startHeightRef.current - deltaY
        setCurrentHeight(Math.max(minHeight, newHeight))
      }
    }

    const handleMouseUp = () => {
      if (isResizing) {
        if (currentWidth) {
          onWidthChange(currentWidth)
        }
        if (currentHeight) {
          onHeightChange(currentHeight)
        }
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
  }, [isResizing, resizeDirection, currentWidth, currentHeight, onWidthChange, onHeightChange, minWidth, minHeight])

  const resetSize = useCallback(() => {
    setCurrentWidth(null)
    setCurrentHeight(null)
    onWidthChange(null)
    onHeightChange(null)
  }, [onWidthChange, onHeightChange])

  return {
    containerRef,
    currentWidth,
    currentHeight,
    isResizing,
    resizeDirection,
    handleResizeStart,
    resetSize,
  }
}

// Shared component for resize handles
export interface ResizeHandlesProps {
  isResizing: boolean
  resizeDirection: ResizeDirection
  onResizeStart: (e: React.MouseEvent, direction: ResizeDirection) => void
}
