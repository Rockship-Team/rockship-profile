"use client"

import { cn, formatDate } from "@/lib/utils"
import { BlogPost } from "@/types/blog"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn("flex flex-col h-full w-full cursor-pointer group", className)}
    >
      <div className="relative h-full w-full flex flex-col bg-rockship-900/60 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-2xl p-1 card-hover hover:border-white/20 hover:shadow-2xl hover:shadow-rockship-accent/10">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

        {/* Card Content */}
        <div className="h-full flex flex-col p-6 rounded-xl bg-rockship-950/40 relative overflow-hidden">
          {/* Top Row: Arrow indicator */}
          <div className="flex items-center justify-between mb-4">
            <div />
            <ArrowUpRight className="w-5 h-5 text-rockship-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-semibold text-white mb-2 line-clamp-2 group-hover:text-rockship-50 transition-colors">
            {post.title}
          </h3>

          {/* Date */}
          <p className="text-sm text-rockship-400 mb-4">
            {formatDate(post.publishedAt)}
          </p>

          {/* Excerpt */}
          <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-rockship-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
