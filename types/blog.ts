// Blog-related TypeScript types
// Re-export Supabase types for convenience
export type {
  BlogSection,
  BlogPostRow,
  BlogPostInsert,
  BlogPostUpdate,
  BlogTagRow,
  BlogPostWithTags
} from "@/lib/supabase/types"

// Legacy interface for backward compatibility with existing components
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: Date
  tags: string[]
  author?: string
  readingTime?: string
  sections?: {
    id: string
    title: string
    level: 1 | 2 | 3
  }[]
}

export interface TopicTag {
  name: string
  slug: string
  count: number
}

export interface BlogFilterState {
  searchQuery: string
  selectedTopic: string | null // null = "All"
}
