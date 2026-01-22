"use client"

import { FileText, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyBlogStateProps {
  hasFilters?: boolean
  onClearFilters?: () => void
  className?: string
}

export function EmptyBlogState({
  hasFilters = false,
  onClearFilters,
  className,
}: EmptyBlogStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-rockship-800/50 flex items-center justify-center mb-6">
        {hasFilters ? (
          <Search className="w-8 h-8 text-gray-400" />
        ) : (
          <FileText className="w-8 h-8 text-gray-400" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {hasFilters ? "No posts match your search" : "No blog posts yet"}
      </h3>

      <p className="text-gray-400 max-w-md mb-6">
        {hasFilters
          ? "Try adjusting your search query or clearing the filters to see all posts."
          : "Check back soon for new articles about AI solutions, infrastructure, and cloud development."}
      </p>

      {hasFilters && onClearFilters && (
        <button
          onClick={onClearFilters}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-rockship-800/50 hover:bg-rockship-800/70",
            "text-white text-sm font-medium",
            "transition-colors duration-200"
          )}
        >
          <X className="w-4 h-4" />
          Clear filters
        </button>
      )}
    </div>
  )
}
