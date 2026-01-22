"use client"

import { useState, useRef, useEffect } from "react"
import { X, ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogTagRow } from "@/lib/supabase/types"

interface TagMultiSelectProps {
  availableTags: BlogTagRow[]
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

export function TagMultiSelect({ availableTags, selectedTags, onChange }: TagMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleTag = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      onChange(selectedTags.filter((t) => t !== tagSlug))
    } else {
      onChange([...selectedTags, tagSlug])
    }
  }

  const removeTag = (tagSlug: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selectedTags.filter((t) => t !== tagSlug))
  }

  const getTagName = (slug: string) => {
    const tag = availableTags.find((t) => t.slug === slug)
    return tag?.name || slug
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Select Trigger */}
      <div
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 rounded-lg text-left cursor-pointer",
          "bg-rockship-900/50 border border-white/10",
          "text-white",
          "focus:outline-none focus:ring-2 focus:ring-rockship-accent/50 focus:border-transparent",
          "flex items-center justify-between gap-2"
        )}
      >
        <div className="flex-1 flex flex-wrap gap-2 min-h-[24px]">
          {selectedTags.length === 0 ? (
            <span className="text-gray-500">Select tags...</span>
          ) : (
            selectedTags.map((tagSlug) => (
              <span
                key={tagSlug}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded",
                  "bg-rockship-accent/20 text-rockship-300 text-sm"
                )}
              >
                {getTagName(tagSlug)}
                <span
                  role="button"
                  onClick={(e) => removeTag(tagSlug, e)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </span>
              </span>
            ))
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full mt-2 py-2 rounded-lg",
            "bg-rockship-900 border border-white/10",
            "shadow-xl max-h-60 overflow-y-auto"
          )}
        >
          {availableTags.length === 0 ? (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No tags available. Create tags first.
            </div>
          ) : (
            availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.slug)
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.slug)}
                  className={cn(
                    "w-full px-4 py-2 text-left flex items-center justify-between",
                    "hover:bg-white/5 transition-colors",
                    isSelected && "bg-rockship-accent/10"
                  )}
                >
                  <span className={cn("text-sm", isSelected ? "text-white" : "text-gray-300")}>
                    {tag.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-rockship-accent" />}
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
