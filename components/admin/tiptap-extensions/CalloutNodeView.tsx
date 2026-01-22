"use client"

import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react"
import { useState } from "react"
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Trash2,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { CalloutType } from "./CalloutExtension"

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
}: NodeViewProps) {
  const { type, title } = node.attrs as {
    type: CalloutType
    title: string
  }

  const [showTypeMenu, setShowTypeMenu] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleText, setTitleText] = useState(title)

  const config = calloutConfig[type] || calloutConfig.info
  const Icon = config.icon
  const displayTitle = title || config.defaultTitle

  const handleTypeChange = (newType: CalloutType) => {
    updateAttributes({ type: newType })
    setShowTypeMenu(false)
  }

  const handleTitleSave = () => {
    updateAttributes({ title: titleText })
    setIsEditingTitle(false)
  }

  return (
    <NodeViewWrapper className="my-4">
      <div
        className={cn(
          "relative rounded-lg border-l-4 p-4",
          config.bgColor,
          config.borderColor,
          selected && "ring-2 ring-rockship-accent ring-offset-2 ring-offset-rockship-950"
        )}
      >
        {/* Toolbar */}
        {selected && (
          <div
            className={cn(
              "absolute -top-10 right-2 z-10",
              "flex items-center gap-1 p-1 rounded-lg",
              "bg-rockship-900 border border-white/10",
              "shadow-lg shadow-black/20"
            )}
            contentEditable={false}
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
                    "absolute top-full right-0 mt-1 z-20",
                    "w-32 rounded-lg overflow-hidden",
                    "bg-rockship-900 border border-white/10",
                    "shadow-xl shadow-black/30"
                  )}
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

            <div className="w-px h-4 bg-white/10" />

            {/* Delete */}
            <button
              type="button"
              onClick={deleteNode}
              className="p-1 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10"
              title="Delete callout"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-2 mb-2" contentEditable={false}>
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
              className={cn(
                "bg-transparent font-semibold text-sm outline-none",
                "border-b border-current",
                config.titleColor
              )}
              autoFocus
            />
          ) : (
            <span
              onClick={() => setIsEditingTitle(true)}
              className={cn(
                "font-semibold text-sm cursor-text",
                config.titleColor
              )}
            >
              {displayTitle}
            </span>
          )}
        </div>

        {/* Content */}
        <NodeViewContent className="text-gray-300 text-sm [&>p]:m-0" />
      </div>
    </NodeViewWrapper>
  )
}
