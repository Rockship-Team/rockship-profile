"use client"

import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react"
import { useState, useCallback } from "react"
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { CalloutType } from "./CalloutExtension"
import { useResizable } from "./useResizable"
import { NodeToolbar, ResizeHandles, SizeIndicator } from "./NodeToolbar"

const calloutConfig: Record<
  CalloutType,
  {
    icon: typeof Info
    bgColor: string
    borderColor: string
    iconColor: string
    titleColor: string
    defaultTitle: string
  }
> = {
  info: {
    icon: Info,
    bgColor: "bg-blue-500/10",
    borderColor: "border-l-blue-500",
    iconColor: "text-blue-500",
    titleColor: "text-blue-400",
    defaultTitle: "Info",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-500/10",
    borderColor: "border-l-green-500",
    iconColor: "text-green-500",
    titleColor: "text-green-400",
    defaultTitle: "Success",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-500/10",
    borderColor: "border-l-yellow-500",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-400",
    defaultTitle: "Warning",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-500/10",
    borderColor: "border-l-red-500",
    iconColor: "text-red-500",
    titleColor: "text-red-400",
    defaultTitle: "Error",
  },
  mission: {
    icon: Lightbulb,
    bgColor: "bg-green-500/5",
    borderColor: "border-l-green-500",
    iconColor: "text-green-500",
    titleColor: "text-green-400",
    defaultTitle: "Mission",
  },
}

export function CalloutNodeView({
  node,
  updateAttributes,
  deleteNode,
  selected,
  editor,
  getPos,
}: NodeViewProps) {
  const { type, title, width } = node.attrs as {
    type: CalloutType
    title: string
    width: number | null
  }

  const [showTypeMenu, setShowTypeMenu] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleText, setTitleText] = useState(title)

  const config = calloutConfig[type] || calloutConfig.info
  const Icon = config.icon
  const displayTitle = title || config.defaultTitle

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
    minWidth: 200,
    minHeight: 80,
    onWidthChange: useCallback(
      (newWidth: number | null) => updateAttributes({ width: newWidth }),
      [updateAttributes]
    ),
    onHeightChange: useCallback(() => {}, []),
  })

  const handleTypeChange = (newType: CalloutType) => {
    updateAttributes({ type: newType })
    setShowTypeMenu(false)
  }

  const handleTitleSave = () => {
    updateAttributes({ title: titleText })
    setIsEditingTitle(false)
  }

  const handleSelectNode = () => {
    const pos = getPos()
    if (typeof pos === "number" && editor) {
      editor.chain().focus().setNodeSelection(pos).run()
    }
  }

  return (
    <NodeViewWrapper
      className="my-4 group relative"
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
          {/* Type selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTypeMenu(!showTypeMenu)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded text-xs",
                "text-gray-300 hover:text-white hover:bg-rockship-800",
                "transition-colors"
              )}
            >
              <Icon className="w-3 h-3" />
              <span className="capitalize">{type}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showTypeMenu && (
              <div
                className={cn(
                  "absolute top-full right-0 mt-1 z-50",
                  "w-32 rounded-lg overflow-hidden",
                  "bg-rockship-900 border border-white/10",
                  "shadow-xl shadow-black/30"
                )}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                {(Object.keys(calloutConfig) as CalloutType[]).map((calloutType) => {
                  const itemConfig = calloutConfig[calloutType]
                  const ItemIcon = itemConfig.icon
                  return (
                    <button
                      key={calloutType}
                      type="button"
                      onClick={() => handleTypeChange(calloutType)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-xs text-left",
                        "hover:bg-rockship-800 transition-colors",
                        type === calloutType
                          ? "text-white bg-rockship-800/50"
                          : "text-gray-400"
                      )}
                    >
                      <ItemIcon className={cn("w-3 h-3", itemConfig.iconColor)} />
                      <span className="capitalize">{calloutType}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-px h-5 bg-white/10" />
        </NodeToolbar>
      )}

      <div
        className={cn(
          "relative rounded-lg border-l-4 p-4",
          config.bgColor,
          config.borderColor,
          selected && "ring-2 ring-rockship-accent ring-offset-2 ring-offset-rockship-950",
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

        {/* Header - clickable area for selection */}
        <div
          className={cn(
            "flex items-center justify-between gap-2 mb-2 -mx-4 -mt-4 px-4 py-2",
            "cursor-pointer select-none rounded-t-lg",
            "hover:bg-black/10 transition-colors",
            config.bgColor
          )}
          contentEditable={false}
          onClick={handleSelectNode}
        >
          <div className="flex items-center gap-2">
            <Icon className={cn("w-5 h-5 flex-shrink-0", config.iconColor)} />
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
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "bg-transparent font-semibold text-sm outline-none",
                  "border-b border-current",
                  config.titleColor
                )}
                autoFocus
              />
            ) : (
              <span
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditingTitle(true)
                }}
                className={cn(
                  "font-semibold text-sm cursor-text",
                  config.titleColor
                )}
              >
                {displayTitle}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            {selected ? "Editing" : "Click to select"}
          </span>
        </div>

        {/* Content */}
        <NodeViewContent className="text-gray-300 text-sm [&>p]:m-0" />
      </div>
    </NodeViewWrapper>
  )
}
