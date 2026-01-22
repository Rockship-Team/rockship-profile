# Quickstart: Blog Page Implementation

**Feature**: 002-blog-page
**Date**: 2026-01-21

## Prerequisites

- Node.js 18+
- pnpm installed
- Repository cloned and on `002-blog-page` branch

## Quick Setup

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## Implementation Order

Follow this order for smooth development:

### 1. Types & Data (Foundation)

```bash
# Create files:
types/blog.ts          # TypeScript interfaces
lib/blog-data.ts       # Static blog post data
lib/blog-utils.ts      # Filter/search utilities
```

### 2. Components (Building Blocks)

```bash
# Create components in order:
components/blog/BlogCard.tsx       # Single post card
components/blog/BlogGrid.tsx       # Card grid container
components/blog/BlogHero.tsx       # Hero section
components/blog/BlogSearch.tsx     # Search input
components/blog/TopicFilter.tsx    # Topic filter buttons
components/blog/EmptyState.tsx     # No results state
```

### 3. Pages (Assembly)

```bash
# Create pages:
app/blog/page.tsx                  # Blog listing
app/blog/[slug]/page.tsx           # Blog detail
```

### 4. Navigation (Integration)

```bash
# Update:
components/Navbar.tsx              # Add Blog link after About
```

## Key Patterns to Follow

### Card Styling (from CaseStudyCard)

```tsx
<div className={cn(
  "bg-rockship-900/60 backdrop-blur-md",
  "border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]",
  "rounded-2xl p-6",
  "card-hover hover:border-white/20"
)}>
```

### Topic Tag Styling

```tsx
// Active state
"bg-rockship-accent text-white"

// Inactive state
"bg-white/5 border border-white/10 text-gray-300 hover:border-white/20"
```

### Animation Pattern

```tsx
import { FadeIn } from '@/components/FadeIn'

<FadeIn direction="up" delay={index * 0.1}>
  <BlogCard post={post} />
</FadeIn>
```

### Search with Debounce

```tsx
import { useDebounce } from '@/hooks/useDebounce'

const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 300)
```

## Verification Checklist

After implementation, verify:

- [ ] `/blog` displays all posts in grid
- [ ] Search filters posts by title/excerpt
- [ ] Topic filters work and show counts
- [ ] Combined search + topic filter works
- [ ] Empty state shows for no results
- [ ] `/blog/[slug]` shows full post content
- [ ] Navbar has "Blog" link after "About"
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations respect `prefers-reduced-motion`
- [ ] `pnpm build` passes without errors
- [ ] Lighthouse scores meet targets

## Common Issues

### Glass morphism not showing
Ensure `backdrop-blur-md` has a semi-transparent background like `bg-rockship-900/60`.

### Tags not filtering
Check that tag names in data match exactly (case-sensitive).

### Animations jerky on mobile
Use `transform` and `opacity` only. Avoid animating layout properties.

## Sample Data for Testing

Add at least 6 posts with varied tags to test:
- Filter showing/hiding posts
- Tag count display
- Empty state (search for non-existent term)
- Grid layout at different counts
