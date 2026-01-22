// Database types for Supabase - generated from data-model.md

export interface BlogSection {
  id: string
  title: string
  level: 1 | 2 | 3
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          author: string | null
          reading_time: number | null
          sections: BlogSection[] | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
          search_vector?: unknown
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content: string
          author?: string | null
          reading_time?: number | null
          sections?: BlogSection[] | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: string
          author?: string | null
          reading_time?: number | null
          sections?: BlogSection[] | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

// Helper types for query results
export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"]
export type BlogPostInsert = Database["public"]["Tables"]["blog_posts"]["Insert"]
export type BlogPostUpdate = Database["public"]["Tables"]["blog_posts"]["Update"]

export type BlogTagRow = Database["public"]["Tables"]["blog_tags"]["Row"]
export type BlogTagInsert = Database["public"]["Tables"]["blog_tags"]["Insert"]

export type BlogPostTagRow = Database["public"]["Tables"]["blog_post_tags"]["Row"]

// Extended type with tags for frontend use
export interface BlogPostWithTags extends BlogPostRow {
  tags: string[]
}
