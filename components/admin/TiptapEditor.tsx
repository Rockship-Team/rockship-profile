"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { DOMSerializer, DOMParser as ProseMirrorDOMParser } from "@tiptap/pm/model"
import StarterKit from "@tiptap/starter-kit"
import { Markdown } from "@tiptap/markdown"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { Extension } from "@tiptap/core"

// Extend TextStyle to support fontSize attribute
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
      unsetFontSize: () => ReturnType
    }
  }
}

// Custom FontSize extension that extends TextStyle
const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize?.replace(/['"]+/g, "") || null,
            renderHTML: (attributes: { fontSize?: string | null }) => {
              if (!attributes.fontSize) return {}
              return { style: `font-size: ${attributes.fontSize}` }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run()
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run()
        },
    }
  },
})
import { useEffect, useCallback, useState, useRef } from "react"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Unlink,
  Minus,
  Sparkles,
  Wand2,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CheckCheck,
  Languages,
  FileText,
  PenLine,
  Loader2,
  ChevronDown,
  X,
  Plus,
  Info,
  Clock,
  Layers,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LayoutGrid,
} from "lucide-react"
import { CalloutExtension } from "./tiptap-extensions/CalloutExtension"
import { TimelineExtension } from "./tiptap-extensions/TimelineExtension"
import { SeriesCardExtension } from "./tiptap-extensions/SeriesCardExtension"
import { ImageExtension } from "./tiptap-extensions/ImageExtension"
import { GridExtension } from "./tiptap-extensions/GridExtension"
import { cn } from "@/lib/utils"
import { executeAIAction, type AIAction } from "@/services/editorAIService"
import { uploadImage } from "@/lib/supabase/storage"
import { marked } from "marked"
import { Plugin, PluginKey } from "@tiptap/pm/state"

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
})

// Helper function to detect if text is markdown
function detectMarkdown(text: string): boolean {
  // Patterns that indicate markdown content (works with or without newlines)
  const markdownPatterns = [
    /#{1,6}\s+\S/,                        // Headings: # Title, ## Subtitle
    /\*\*[^*]+\*\*/,                      // Bold: **text**
    /__[^_]+__/,                          // Bold: __text__
    /~~[^~]+~~/,                          // Strikethrough: ~~text~~
    /`[^`]+`/,                            // Inline code: `code`
    /```[\s\S]*?```/,                     // Code blocks: ```code```
    /\[([^\]]+)\]\(([^)]+)\)/,            // Links: [text](url)
    /!\[([^\]]*)\]\(([^)]+)\)/,           // Images: ![alt](url)
  ]

  // Count how many markdown patterns are found
  let matchCount = 0
  for (const pattern of markdownPatterns) {
    if (pattern.test(text)) {
      matchCount++
    }
  }

  // If we find at least 1 pattern, consider it markdown
  if (matchCount >= 1) return true

  return false
}

// Custom extension to handle markdown paste
const MarkdownPasteExtension = Extension.create({
  name: "markdownPaste",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("markdownPaste"),
        props: {
          handlePaste: (view, event) => {
            console.log("[MarkdownPaste] Paste event triggered")

            const clipboardData = event.clipboardData
            if (!clipboardData) {
              console.log("[MarkdownPaste] No clipboard data")
              return false
            }

            // If HTML content exists, let default handler process it
            const htmlContent = clipboardData.getData("text/html")
            console.log("[MarkdownPaste] HTML content:", htmlContent ? "yes" : "no")
            if (htmlContent && htmlContent.trim()) {
              console.log("[MarkdownPaste] Using default HTML handler")
              return false
            }

            // Get plain text
            const text = clipboardData.getData("text/plain")
            console.log("[MarkdownPaste] Plain text:", text?.substring(0, 100))
            if (!text || !text.trim()) return false

            // Check if it's markdown
            const isMarkdownText = detectMarkdown(text)
            console.log("[MarkdownPaste] Is markdown:", isMarkdownText)
            if (!isMarkdownText) return false

            // Prevent default paste
            event.preventDefault()

            try {
              // Convert markdown to HTML
              const html = marked.parse(text, { async: false }) as string
              console.log("[MarkdownPaste] Converted HTML:", html.substring(0, 200))

              // Create temp element and parse
              const tempDiv = document.createElement("div")
              tempDiv.innerHTML = html

              // Parse using ProseMirror
              const { state, dispatch } = view
              const parser = ProseMirrorDOMParser.fromSchema(state.schema)
              const doc = parser.parse(tempDiv)
              const slice = doc.slice(0, doc.content.size)

              // Insert content
              dispatch(state.tr.replaceSelection(slice))
              console.log("[MarkdownPaste] Success!")
              return true
            } catch (error) {
              console.error("[MarkdownPaste] Error:", error)
              return false
            }
          },
        },
      }),
    ]
  },
})

interface TiptapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "p-2 rounded transition-colors",
        isActive
          ? "bg-rockship-accent text-white"
          : "text-gray-400 hover:text-white hover:bg-rockship-800/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <div className="w-px h-6 bg-white/10 mx-1" />
}

// Font Size Combobox - allows both selection and manual input
const FONT_SIZES = ["12", "14", "16", "18", "20", "24", "28", "32", "36", "48", "64", "72"]

interface FontSizeComboboxProps {
  value: string
  onChange: (size: string) => void
}

function FontSizeCombobox({ value, onChange }: FontSizeComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Extract number from value (e.g., "24px" -> "24")
  const displayValue = value ? value.replace(/px$/, "") : ""

  useEffect(() => {
    setInputValue(displayValue)
  }, [displayValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "")
    setInputValue(val)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputValue) {
        onChange(`${inputValue}px`)
      }
      setIsOpen(false)
      inputRef.current?.blur()
    }
    if (e.key === "Escape") {
      setIsOpen(false)
      setInputValue(displayValue)
    }
  }

  const handleInputBlur = () => {
    // Apply value on blur if changed
    if (inputValue && inputValue !== displayValue) {
      onChange(`${inputValue}px`)
    }
  }

  const handleSelect = (size: string) => {
    onChange(`${size}px`)
    setInputValue(size)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={cn(
          "flex items-center h-8 rounded",
          "bg-rockship-800/50 border border-white/10",
          "hover:border-white/20 transition-colors",
          isOpen && "ring-1 ring-rockship-accent border-transparent"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder="Size"
          className={cn(
            "w-12 h-full px-2 bg-transparent text-sm text-center",
            "text-gray-300 placeholder-gray-500",
            "focus:outline-none"
          )}
          title="Font Size"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-1 h-full text-gray-400 hover:text-white"
        >
          <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-1 z-50",
            "w-20 max-h-48 overflow-y-auto rounded-lg",
            "bg-rockship-900 border border-white/10",
            "shadow-xl shadow-black/20"
          )}
        >
          {FONT_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSelect(size)}
              className={cn(
                "w-full px-3 py-1.5 text-sm text-left",
                "hover:bg-rockship-800/50 transition-colors",
                size === displayValue
                  ? "text-rockship-accent bg-rockship-accent/10"
                  : "text-gray-300"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface AIMenuProps {
  onAction: (action: AIAction, prompt?: string) => void
  hasSelection: boolean
  isLoading: boolean
  onClose: () => void
}

function AIMenu({ onAction, hasSelection, isLoading, onClose }: AIMenuProps) {
  const [showPromptInput, setShowPromptInput] = useState(false)
  const [prompt, setPrompt] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showPromptInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showPromptInput])

  const handleGenerate = () => {
    if (prompt.trim()) {
      onAction("generate", prompt)
      setPrompt("")
      setShowPromptInput(false)
    }
  }

  const aiActions = [
    {
      action: "generate" as AIAction,
      label: "Generate content",
      icon: PenLine,
      requiresSelection: false,
      needsPrompt: true,
    },
    {
      action: "continue" as AIAction,
      label: "Continue writing",
      icon: Wand2,
      requiresSelection: false,
      needsPrompt: false,
    },
    {
      action: "improve" as AIAction,
      label: "Improve writing",
      icon: Sparkles,
      requiresSelection: true,
      needsPrompt: false,
    },
    {
      action: "grammar" as AIAction,
      label: "Fix grammar",
      icon: CheckCheck,
      requiresSelection: true,
      needsPrompt: false,
    },
    {
      action: "shorter" as AIAction,
      label: "Make shorter",
      icon: ArrowDownWideNarrow,
      requiresSelection: true,
      needsPrompt: false,
    },
    {
      action: "longer" as AIAction,
      label: "Make longer",
      icon: ArrowUpWideNarrow,
      requiresSelection: true,
      needsPrompt: false,
    },
    {
      action: "summarize" as AIAction,
      label: "Summarize",
      icon: FileText,
      requiresSelection: true,
      needsPrompt: false,
    },
    {
      action: "translate" as AIAction,
      label: "Translate to Vietnamese",
      icon: Languages,
      requiresSelection: true,
      needsPrompt: false,
    },
  ]

  if (showPromptInput) {
    return (
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <button
            type="button"
            onClick={() => setShowPromptInput(false)}
            className="p-1 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-300">Generate content</span>
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGenerate()
              if (e.key === "Escape") setShowPromptInput(false)
            }}
            placeholder="Describe what to write..."
            className={cn(
              "flex-1 px-3 py-2 rounded text-sm",
              "bg-rockship-800 border border-white/10",
              "text-white placeholder-gray-500",
              "focus:outline-none focus:ring-1 focus:ring-rockship-accent"
            )}
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className={cn(
              "px-3 py-2 rounded text-sm font-medium",
              "bg-rockship-accent hover:bg-rockship-accent/90",
              "text-white transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-1">
      {aiActions.map(({ action, label, icon: Icon, requiresSelection, needsPrompt }) => {
        const isDisabled = requiresSelection && !hasSelection
        return (
          <button
            key={action}
            type="button"
            onClick={() => {
              if (needsPrompt) {
                setShowPromptInput(true)
              } else {
                onAction(action)
                onClose()
              }
            }}
            disabled={isDisabled || isLoading}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm text-left",
              "hover:bg-rockship-800/50 transition-colors",
              isDisabled
                ? "text-gray-600 cursor-not-allowed"
                : "text-gray-300 hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {requiresSelection && !hasSelection && (
              <span className="ml-auto text-xs text-gray-600">(select text)</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Write your content here...",
}: TiptapEditorProps) {
  const [showAIMenu, setShowAIMenu] = useState(false)
  const [isAILoading, setIsAILoading] = useState(false)
  const [aiError, setAIError] = useState<string | null>(null)
  const aiMenuRef = useRef<HTMLDivElement>(null)

  const [showInsertMenu, setShowInsertMenu] = useState(false)
  const insertMenuRef = useRef<HTMLDivElement>(null)

  const [isImageUploading, setIsImageUploading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  // Force re-render when editor state changes (for active button states)
  const [, setEditorState] = useState(0)

  // Track if we're updating from internal changes to prevent sync loops
  const isInternalUpdate = useRef(false)

  const editor = useEditor({
    immediatelyRender: false,
    onSelectionUpdate: () => {
      // Force re-render to update toolbar active states
      setEditorState((prev) => prev + 1)
    },
    onTransaction: () => {
      // Force re-render on any transaction
      setEditorState((prev) => prev + 1)
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Markdown,
      MarkdownPasteExtension,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-rockship-accent underline",
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      FontSize,
      // Custom extensions
      CalloutExtension,
      TimelineExtension,
      SeriesCardExtension,
      ImageExtension,
      GridExtension,
    ],
    content,
    // Use HTML format to support custom components
    editorProps: {
      attributes: {
        class: "tiptap min-h-[400px] p-4 outline-none",
      },
      handleDOMEvents: {
        dragstart: (view, event) => {
          // Store dragged content globally so grid cells can access it
          const { from, to } = view.state.selection
          if (from !== to) {
            // Get selected content as HTML using DOMSerializer
            const slice = view.state.doc.slice(from, to)
            const serializer = DOMSerializer.fromSchema(view.state.schema)
            const fragment = serializer.serializeFragment(slice.content)
            const div = document.createElement("div")
            div.appendChild(fragment)
            const html = div.innerHTML
            // Store in window for grid cells to access
            ;(window as unknown as { __draggedContent?: string }).__draggedContent = html
          }
          return false
        },
        dragend: () => {
          // Clear stored content
          ;(window as unknown as { __draggedContent?: string }).__draggedContent = undefined
          return false
        },
        drop: (view, event) => {
          const target = event.target as HTMLElement
          const gridCell = target.closest('[data-grid-cell-dropzone="true"]')
          if (gridCell) {
            // Clear the stored content since the drop was handled
            ;(window as unknown as { __draggedContent?: string }).__draggedContent = undefined
            return true // Prevent ProseMirror from handling
          }
          return false
        },
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      // Save as HTML to preserve custom components
      const html = updatedEditor.getHTML()
      // Mark this as an internal update to prevent sync loop
      isInternalUpdate.current = true
      onChange(html)
    },
  })

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setShowAIMenu(false)
      }
      if (insertMenuRef.current && !insertMenuRef.current.contains(event.target as Node)) {
        setShowInsertMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Sync external content changes (only when content prop changes from outside)
  useEffect(() => {
    if (editor && !isInternalUpdate.current) {
      const currentContent = editor.getHTML()
      // Only update if content is significantly different (not just whitespace)
      if (content && content.trim() !== currentContent.trim()) {
        editor.commands.setContent(content)
      }
    }
    isInternalUpdate.current = false
  }, [content, editor])

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    if (url === null) return

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  // Insert custom components
  const insertCallout = useCallback(
    (type: "info" | "success" | "warning" | "error" | "mission" = "info") => {
      if (!editor) return
      editor.chain().focus().setCallout({ type }).run()
      setShowInsertMenu(false)
    },
    [editor]
  )

  const insertTimeline = useCallback(() => {
    if (!editor) return
    editor.chain().focus().setTimeline().run()
    setShowInsertMenu(false)
  }, [editor])

  const insertSeriesCard = useCallback(() => {
    if (!editor) return
    editor.chain().focus().setSeriesCard().run()
    setShowInsertMenu(false)
  }, [editor])

  const insertImage = useCallback(() => {
    if (!editor) return
    // Insert an empty image block that will show upload placeholder
    editor.chain().focus().setImage({ src: "" }).run()
    setShowInsertMenu(false)
  }, [editor])

  const insertGrid = useCallback(
    (columns = 2) => {
      if (!editor) return
      editor.chain().focus().setGrid(columns).run()
      setShowInsertMenu(false)
    },
    [editor]
  )

  const handleImageFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !editor) return

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setAIError("Please select an image file")
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setAIError("Image must be less than 5MB")
        return
      }

      setIsImageUploading(true)

      try {
        const result = await uploadImage(file)
        if (result.error) {
          setAIError(result.error)
        } else {
          editor.chain().focus().setImage({ src: result.url }).run()
        }
      } catch (error) {
        setAIError("Failed to upload image")
        console.error("Upload error:", error)
      } finally {
        setIsImageUploading(false)
        setShowInsertMenu(false)
        // Reset input
        if (imageInputRef.current) {
          imageInputRef.current.value = ""
        }
      }
    },
    [editor]
  )

  const triggerImageUpload = useCallback(() => {
    imageInputRef.current?.click()
  }, [])

  const handleAIAction = useCallback(
    async (action: AIAction, prompt?: string) => {
      if (!editor) return

      setIsAILoading(true)
      setAIError(null)

      try {
        const { from, to } = editor.state.selection
        const selectedText = editor.state.doc.textBetween(from, to, " ")
        const fullText = editor.getMarkdown()

        let result: string

        if (action === "generate") {
          result = await executeAIAction({ action, prompt })
          // Insert at cursor position
          editor.chain().focus().insertContent(result, { contentType: "markdown" }).run()
        } else if (action === "continue") {
          result = await executeAIAction({ action, text: fullText })
          // Append to end
          editor.chain().focus().setTextSelection(editor.state.doc.content.size).insertContent("\n\n" + result, { contentType: "markdown" }).run()
        } else {
          // Actions that require selection
          if (!selectedText.trim()) {
            setAIError("Please select some text first")
            return
          }

          result = await executeAIAction({
            action,
            text: selectedText,
            language: action === "translate" ? "Vietnamese" : undefined,
          })

          // Replace selected text
          editor.chain().focus().deleteSelection().insertContent(result, { contentType: "markdown" }).run()
        }

        setShowAIMenu(false)
      } catch (error) {
        setAIError(error instanceof Error ? error.message : "AI action failed")
      } finally {
        setIsAILoading(false)
      }
    },
    [editor]
  )

  const hasSelection = editor
    ? editor.state.selection.from !== editor.state.selection.to
    : false

  if (!editor) {
    return (
      <div
        className={cn(
          "min-h-[400px] rounded-lg",
          "bg-rockship-900/50 border border-white/10",
          "flex items-center justify-center text-gray-500"
        )}
      >
        Loading editor...
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-lg",
        "bg-rockship-900/50 border border-white/10",
        "focus-within:ring-2 focus-within:ring-rockship-accent/50 focus-within:border-transparent"
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/10 bg-rockship-900/30 rounded-t-lg">
        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          title="Inline Code"
        >
          <Code className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Text Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="Justify"
        >
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Font Size - Combobox */}
        <FontSizeCombobox
          value={editor.getAttributes("textStyle").fontSize || ""}
          onChange={(size) => {
            if (size) {
              editor.chain().focus().setFontSize(size).run()
            } else {
              editor.chain().focus().unsetFontSize().run()
            }
          }}
        />

        <ToolbarDivider />

        {/* Links */}
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          title="Remove Link"
        >
          <Unlink className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Block elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Insert Custom Components */}
        <div className="relative" ref={insertMenuRef}>
          <button
            type="button"
            onClick={() => setShowInsertMenu(!showInsertMenu)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium",
              "bg-rockship-800/50 border border-white/10",
              "hover:bg-rockship-800 hover:border-white/20",
              "text-gray-300 hover:text-white transition-all",
              showInsertMenu && "bg-rockship-800 border-white/20 text-white"
            )}
          >
            <Plus className="w-4 h-4" />
            <span>Insert</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform", showInsertMenu && "rotate-180")} />
          </button>

          {/* Insert Dropdown Menu */}
          {showInsertMenu && (
            <div
              className={cn(
                "absolute top-full left-0 mt-1 z-50",
                "w-56 rounded-lg overflow-hidden",
                "bg-rockship-900 border border-white/10",
                "shadow-xl shadow-black/20"
              )}
            >
              <div className="py-1">
                <div className="px-3 py-1.5 text-xs text-gray-500 uppercase tracking-wider">
                  Custom Components
                </div>

                {/* Callout */}
                <button
                  type="button"
                  onClick={() => insertCallout("info")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-rockship-800/50"
                >
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Callout Box</span>
                </button>

                {/* Timeline */}
                <button
                  type="button"
                  onClick={insertTimeline}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-rockship-800/50"
                >
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Timeline</span>
                </button>

                {/* Series Card */}
                <button
                  type="button"
                  onClick={insertSeriesCard}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-rockship-800/50"
                >
                  <Layers className="w-4 h-4 text-green-400" />
                  <span>Series Card</span>
                </button>

                {/* Grid Layout */}
                <button
                  type="button"
                  onClick={() => insertGrid(2)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-rockship-800/50"
                >
                  <LayoutGrid className="w-4 h-4 text-cyan-400" />
                  <span>Grid Layout</span>
                </button>

                {/* Upload Image */}
                <button
                  type="button"
                  onClick={triggerImageUpload}
                  disabled={isImageUploading}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-rockship-800/50",
                    isImageUploading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Image className="w-4 h-4 text-orange-400" />
                  <span>{isImageUploading ? "Uploading..." : "Upload Image"}</span>
                </button>

                {/* Image from URL */}
                <button
                  type="button"
                  onClick={() => {
                    const url = window.prompt("Image URL")
                    if (url && editor) {
                      editor.chain().focus().setImage({ src: url }).run()
                    }
                    setShowInsertMenu(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-rockship-800/50"
                >
                  <LinkIcon className="w-4 h-4 text-orange-400" />
                  <span>Image from URL</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <ToolbarDivider />

        {/* AI Button */}
        <div className="relative" ref={aiMenuRef}>
          <button
            type="button"
            onClick={() => setShowAIMenu(!showAIMenu)}
            disabled={isAILoading}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium",
              "bg-gradient-to-r from-rockship-accent to-rockship-purple",
              "hover:from-rockship-accent/90 hover:to-rockship-purple/90",
              "text-white transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              showAIMenu && "ring-2 ring-white/20"
            )}
          >
            {isAILoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>AI</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform", showAIMenu && "rotate-180")} />
          </button>

          {/* AI Dropdown Menu */}
          {showAIMenu && (
            <div
              className={cn(
                "absolute top-full left-0 mt-1 z-50",
                "w-64 rounded-lg overflow-hidden",
                "bg-rockship-900 border border-white/10",
                "shadow-xl shadow-black/20"
              )}
            >
              <AIMenu
                onAction={handleAIAction}
                hasSelection={hasSelection}
                isLoading={isAILoading}
                onClose={() => setShowAIMenu(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* AI Error Message */}
      {aiError && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm flex items-center justify-between">
          <span>{aiError}</span>
          <button
            type="button"
            onClick={() => setAIError(null)}
            className="p-1 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden file input for image upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFileUpload}
        className="hidden"
      />

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
