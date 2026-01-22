import { Plus } from "lucide-react"
import { getAllPostsForAdmin } from "@/lib/supabase/queries"
import { PostList } from "@/components/admin/PostList"
import { cn } from "@/lib/utils"

// Force dynamic rendering (no pre-rendering at build time)
export const dynamic = "force-dynamic"

export default async function AdminPostPage() {
  const posts = await getAllPostsForAdmin()

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">
            Manage your blog posts. {posts.length} post{posts.length !== 1 ? "s" : ""} total.
          </p>
        </div>
        <a
          href="/admin/post/new"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-rockship-accent hover:bg-rockship-accent/90",
            "text-white font-medium",
            "transition-colors duration-200"
          )}
        >
          <Plus className="w-4 h-4" />
          New Post
        </a>
      </div>

      {/* Post List */}
      <div className="bg-rockship-900/60 backdrop-blur-md border border-white/8 rounded-xl">
        <PostList posts={posts} />
      </div>
    </div>
  )
}
