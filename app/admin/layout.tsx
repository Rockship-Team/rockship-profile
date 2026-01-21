import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Rockship AI Blog",
  description: "Manage blog posts",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-rockship-950">
      {/* Admin Header */}
      <header className="bg-rockship-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/admin/post"
                className="text-xl font-bold text-white hover:text-rockship-accent transition-colors"
              >
                Blog Admin
              </a>
            </div>
            <nav className="flex items-center gap-4">
              <a
                href="/admin/post"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Posts
              </a>
              <a
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Blog
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
