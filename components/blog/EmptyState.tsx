"use client"

import { cn } from "@/lib/utils"
import { SearchX } from "lucide-react"

interface EmptyStateProps {
  message?: string
  className?: string
}

export function EmptyState({
  message = "No posts found matching your search.",
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-4",
      className
    )}>
      <div className="w-16 h-16 rounded-full bg-rockship-900/60 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-rockship-400" />
      </div>
      <p className="text-lg text-gray-400 text-center max-w-md">
        {message}
      </p>
    </div>
  )
}
