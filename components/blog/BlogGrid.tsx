"use client"

import { cn } from "@/lib/utils"
import { BlogPost } from "@/types/blog"
import { BlogCard } from "./BlogCard"
import { EmptyState } from "./EmptyState"
import { FadeIn } from "@/components/FadeIn"

interface BlogGridProps {
  posts: BlogPost[]
  className?: string
}

export function BlogGrid({ posts, className }: BlogGridProps) {
  if (posts.length === 0) {
    return <EmptyState />
  }

  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
      className
    )}>
      {posts.map((post, index) => (
        <FadeIn
          key={post.slug}
          direction="up"
          delay={index * 100}
        >
          <BlogCard post={post} />
        </FadeIn>
      ))}
    </div>
  )
}
