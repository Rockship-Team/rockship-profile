"use client"

import { cn } from "@/lib/utils"
import { TopicTag } from "@/types/blog"

interface TopicFilterProps {
  tags: TopicTag[]
  selectedTopic: string | null
  onSelectTopic: (topic: string | null) => void
  className?: string
}

export function TopicFilter({
  tags,
  selectedTopic,
  onSelectTopic,
  className
}: TopicFilterProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto pb-2 touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:[&::-webkit-scrollbar]:block md:[scrollbar-width:thin] md:scrollbar-thin md:scrollbar-thumb-white/20 md:scrollbar-track-transparent",
        className
      )}
    >
      <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-2">
        {/* All Button */}
        <button
          onClick={() => onSelectTopic(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
            selectedTopic === null
              ? "bg-rockship-accent text-white"
              : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
          )}
          aria-pressed={selectedTopic === null}
          aria-label="Show all posts"
        >
          All
        </button>

        {/* Topic Buttons */}
        {tags.map((tag) => (
          <button
            key={tag.slug}
            onClick={() => onSelectTopic(tag.slug)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
              selectedTopic === tag.slug
                ? "bg-rockship-accent text-white"
                : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
            )}
            aria-pressed={selectedTopic === tag.slug}
            aria-label={`Filter by ${tag.name}`}
          >
            {tag.name}
            <span className="ml-1.5 text-xs opacity-70">({tag.count})</span>
          </button>
        ))}
      </div>
    </div>
  )
}
