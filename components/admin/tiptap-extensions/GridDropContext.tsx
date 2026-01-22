"use client"

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, startTransition } from "react"

interface GridDropContextValue {
  isDraggingExternal: boolean
  activeDropTarget: string | null
  setActiveDropTarget: (id: string | null) => void
  registerCell: (id: string, element: HTMLElement, onDrop: (content: string, isHtml?: boolean) => void) => void
  unregisterCell: (id: string) => void
}

const GridDropContext = createContext<GridDropContextValue | null>(null)

export function useGridDropContext() {
  return useContext(GridDropContext)
}

interface CellInfo {
  element: HTMLElement
  onDrop: (content: string, isHtml?: boolean) => void
}

export function GridDropProvider({ children }: { children: React.ReactNode }) {
  const [isDraggingExternal, setIsDraggingExternal] = useState(false)
  const [activeDropTarget, setActiveDropTarget] = useState<string | null>(null)
  const cellsRef = useRef<Map<string, CellInfo>>(new Map())
  const dragCounterRef = useRef(0)

  const registerCell = useCallback((id: string, element: HTMLElement, onDrop: (content: string) => void) => {
    cellsRef.current.set(id, { element, onDrop })
  }, [])

  const unregisterCell = useCallback((id: string) => {
    cellsRef.current.delete(id)
  }, [])

  // Find which cell (if any) is at the given coordinates
  const findCellAtPoint = useCallback((x: number, y: number): string | null => {
    for (const [id, info] of cellsRef.current.entries()) {
      const rect = info.element.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return id
      }
    }
    return null
  }, [])

  // Extract content from DataTransfer - returns both HTML and text
  const extractContent = useCallback((dataTransfer: DataTransfer): { content: string; html: string; isHtml: boolean } => {
    // Try HTML first to preserve formatting
    let htmlContent = dataTransfer.getData("text/html")
    let textContent = dataTransfer.getData("text/plain")

    // Clean up HTML from browser wrappers
    if (htmlContent) {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = htmlContent
      // Remove meta elements
      tempDiv.querySelectorAll("meta").forEach(el => el.remove())
      htmlContent = tempDiv.innerHTML.trim()
    }

    // Try files as fallback
    if (!htmlContent && !textContent && dataTransfer.files.length > 0) {
      const fileNames = Array.from(dataTransfer.files).map(f => f.name).join(", ")
      textContent = `[Files: ${fileNames}]`
    }

    return {
      content: textContent?.trim() || "",
      html: htmlContent || "",
      isHtml: !!htmlContent,
    }
  }, [])

  // Use refs for state that needs to be accessed in event handlers without causing re-renders
  const activeDropTargetRef = useRef<string | null>(null)

  // Helper to safely update state (deferred to avoid flushSync errors during React render)
  const safeSetIsDragging = useCallback((value: boolean) => {
    startTransition(() => {
      setIsDraggingExternal(value)
    })
  }, [])

  const safeSetActiveDropTarget = useCallback((value: string | null) => {
    activeDropTargetRef.current = value
    startTransition(() => {
      setActiveDropTarget(value)
    })
  }, [])

  useEffect(() => {
    // Use capture phase to intercept events before ProseMirror
    const handleDragEnter = (e: DragEvent) => {
      dragCounterRef.current++

      // Check if this is an external drag (not from within the editor)
      // External drags typically have files or text data
      if (dragCounterRef.current === 1) {
        safeSetIsDragging(true)
      }

      // Find if we're over a grid cell
      const cellId = findCellAtPoint(e.clientX, e.clientY)
      if (cellId) {
        safeSetActiveDropTarget(cellId)
      }
    }

    const handleDragOver = (e: DragEvent) => {
      const cellId = findCellAtPoint(e.clientX, e.clientY)

      if (cellId) {
        // We're over a grid cell - prevent default to allow drop
        e.preventDefault()
        e.stopPropagation()
        safeSetActiveDropTarget(cellId)
      } else if (activeDropTargetRef.current) {
        safeSetActiveDropTarget(null)
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      dragCounterRef.current--

      if (dragCounterRef.current === 0) {
        safeSetIsDragging(false)
        safeSetActiveDropTarget(null)
      }
    }

    const handleDrop = (e: DragEvent) => {
      const cellId = findCellAtPoint(e.clientX, e.clientY)

      if (cellId && e.dataTransfer) {
        const cellInfo = cellsRef.current.get(cellId)
        if (cellInfo) {
          const { content, html, isHtml } = extractContent(e.dataTransfer)
          const finalContent = isHtml ? html : content
          if (finalContent) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            cellInfo.onDrop(finalContent, isHtml)
          }
        }
      }

      // Reset state
      dragCounterRef.current = 0
      safeSetIsDragging(false)
      safeSetActiveDropTarget(null)
    }

    const handleDragEnd = () => {
      dragCounterRef.current = 0
      safeSetIsDragging(false)
      safeSetActiveDropTarget(null)
    }

    // Add listeners with capture phase to intercept before ProseMirror
    window.addEventListener("dragenter", handleDragEnter, true)
    window.addEventListener("dragover", handleDragOver, true)
    window.addEventListener("dragleave", handleDragLeave, true)
    window.addEventListener("drop", handleDrop, true)
    window.addEventListener("dragend", handleDragEnd, true)

    return () => {
      window.removeEventListener("dragenter", handleDragEnter, true)
      window.removeEventListener("dragover", handleDragOver, true)
      window.removeEventListener("dragleave", handleDragLeave, true)
      window.removeEventListener("drop", handleDrop, true)
      window.removeEventListener("dragend", handleDragEnd, true)
    }
  }, [findCellAtPoint, extractContent, safeSetIsDragging, safeSetActiveDropTarget])

  return (
    <GridDropContext.Provider
      value={{
        isDraggingExternal,
        activeDropTarget,
        setActiveDropTarget,
        registerCell,
        unregisterCell,
      }}
    >
      {children}
    </GridDropContext.Provider>
  )
}

// Hook for grid cell components
export function useDropTarget(id: string, onDrop: (content: string, isHtml?: boolean) => void) {
  const context = useContext(GridDropContext)
  const elementRef = useRef<HTMLElement | null>(null)
  const onDropRef = useRef(onDrop)

  // Keep onDrop ref updated
  useEffect(() => {
    onDropRef.current = onDrop
  }, [onDrop])

  const setElement = useCallback((element: HTMLElement | null) => {
    elementRef.current = element

    if (context && element) {
      context.registerCell(id, element, (content, isHtml) => onDropRef.current(content, isHtml))
    }
  }, [context, id])

  useEffect(() => {
    return () => {
      if (context) {
        context.unregisterCell(id)
      }
    }
  }, [context, id])

  const isOver = context?.activeDropTarget === id
  const isDragging = context?.isDraggingExternal ?? false

  return {
    isOver,
    isDragging,
    setDropRef: setElement,
  }
}
