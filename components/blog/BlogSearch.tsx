"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

interface BlogSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function BlogSearch({
  value,
  onChange,
  placeholder = "Search posts...",
  className
}: BlogSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-rockship-400" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-rockship-900/60 backdrop-blur-md border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-rockship-accent focus:ring-1 focus:ring-rockship-accent transition-colors"
        aria-label="Search blog posts"
      />
    </div>
  )
}
