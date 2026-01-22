"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Markdown } from "@tiptap/markdown"
import Link from "@tiptap/extension-link"
import Underline from "@tiptap/extension-underline"
import Placeholder from "@tiptap/extension-placeholder"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { executeAIAction, type AIAction } from "@/services/editorAIService"

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

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Markdown,
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
    ],
    content,
    contentType: "markdown",
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[400px] p-4 outline-none",
          "prose prose-invert prose-rockship max-w-none",
          "prose-headings:text-white prose-p:text-gray-300",
          "prose-a:text-rockship-accent prose-strong:text-white",
          "prose-code:bg-rockship-800 prose-code:px-1 prose-code:rounded",
          "prose-blockquote:border-rockship-accent prose-blockquote:text-gray-400",
          "prose-ul:text-gray-300 prose-ol:text-gray-300",
          "prose-li:text-gray-300"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const markdown = editor.getMarkdown()
      onChange(markdown)
    },
  })

  // Close AI menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiMenuRef.current && !aiMenuRef.current.contains(event.target as Node)) {
        setShowAIMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getMarkdown()) {
      editor.commands.setContent(content, { contentType: "markdown" })
    }
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
        "rounded-lg overflow-hidden",
        "bg-rockship-900/50 border border-white/10",
        "focus-within:ring-2 focus-within:ring-rockship-accent/50 focus-within:border-transparent"
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-white/10 bg-rockship-900/30">
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

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
