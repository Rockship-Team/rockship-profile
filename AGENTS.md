- Always use bun instead of npm or pnpm (`bun install`, `bun run <script>`, `bun add`)
- The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
- Always write components in the "components" folder.
- Always write pages in the "app" folder.
- Always write API routes in the "api" folder.
- Always write server actions in the "actions" folder.
- Always write docs in the "docs" folder.
- Always write types in the "types" folder.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.
<!-- END:nextjs-agent-rules -->
