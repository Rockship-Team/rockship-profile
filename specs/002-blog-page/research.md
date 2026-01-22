# Research: Blog Page Implementation

**Feature**: 002-blog-page
**Date**: 2026-01-21

## Research Summary

This document captures technical decisions and best practices research for implementing the Blog Page feature.

---

## Decision 1: Blog Data Storage

**Decision**: Use static TypeScript data in `lib/blog-data.ts`

**Rationale**:
- Project is a showcase/portfolio site, not a content-heavy blog platform
- Avoids database setup complexity and hosting costs
- Type-safe data structure with full IntelliSense support
- Fast build times with static generation
- Easy to migrate to CMS/database later if needed

**Alternatives Considered**:
- MDX files: More complex setup, overkill for showcase
- Headless CMS (Sanity, Contentful): Added complexity, external dependency
- Database (Supabase): Unnecessary for static content

---

## Decision 2: Blog Card Design Pattern

**Decision**: Follow existing CaseStudyCard pattern from `components/CaseStudyCard.tsx`

**Rationale**:
- Maintains design consistency across the site
- Reuses proven glass morphism styling
- Established hover effects and animations
- Responsive behavior already tested

**Key Styling Patterns** (from existing codebase):
```typescript
// Card container
"bg-rockship-900/60 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] rounded-2xl"

// Hover effect
"card-hover hover:border-white/20 hover:shadow-2xl hover:shadow-rockship-accent/10 -translate-y-1"

// Tag styling
"px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10"
```

---

## Decision 3: Search Implementation

**Decision**: Client-side search with debounced input

**Rationale**:
- Static data makes server-side search unnecessary
- Instant feedback improves user experience
- Debouncing (300ms) prevents excessive re-renders
- Simple implementation with `useMemo` for filtering

**Implementation Pattern**:
```typescript
const [searchQuery, setSearchQuery] = useState('')
const debouncedSearch = useDebounce(searchQuery, 300)

const filteredPosts = useMemo(() => {
  return posts.filter(post =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
}, [posts, debouncedSearch])
```

---

## Decision 4: Topic Filter UI

**Decision**: Horizontal pill buttons with post counts, matching reference design

**Rationale**:
- Direct match to provided UI mockup
- Clear visual feedback for active state
- Shows content distribution at a glance
- Touch-friendly on mobile

**Active State Pattern**:
- Active: `bg-rockship-accent text-white`
- Inactive: `bg-white/5 border border-white/10 text-gray-300 hover:border-white/20`

---

## Decision 5: Blog Post Detail Layout

**Decision**: Two-column layout with main content and sticky "On This Page" sidebar

**Rationale**:
- Matches reference design provided by user
- Improves navigation for long-form content
- Sticky sidebar provides persistent navigation
- Responsive: collapses to single column on mobile

**Layout Structure**:
- Full-width hero with title, author, date, reading time, tags
- Two-column layout on desktop (lg+):
  - Left: Main content area (flex-1)
  - Right: Sticky "On This Page" sidebar (w-64)
- Single column on mobile/tablet (sidebar hidden)
- Back navigation link to blog listing

**Sidebar Features**:
- "On This Page" heading with section links
- Intersection Observer tracks active section
- Active section highlighted with rockship-accent color
- Smooth scroll to sections on click
- Glass morphism styling consistent with site

**Implementation**:
```typescript
// TableOfContents component
<nav className="sticky top-32">
  <div className="bg-rockship-900/60 backdrop-blur-md border border-white/10 rounded-xl p-6">
    <h2>On This Page</h2>
    <ul>
      {sections.map(section => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={activeSection === section.id ? 'text-rockship-accent' : 'text-gray-400'}
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>
```

---

## Decision 6: URL Structure

**Decision**: `/blog` for listing, `/blog/[slug]` for detail pages

**Rationale**:
- Standard blog URL pattern
- SEO-friendly slugs
- Easy to implement with Next.js App Router
- Supports static generation with `generateStaticParams`

---

## Decision 7: Animation Approach

**Decision**: Use Framer Motion with FadeIn component pattern

**Rationale**:
- Consistent with existing site animations
- Respects `prefers-reduced-motion`
- Stagger animations for card grid
- Smooth page transitions

**Animation Config** (from `lib/animation-config.ts`):
- Duration: 0.3s (normal)
- Stagger: 0.1s between cards
- Easing: smooth [0.21, 0.45, 0.32, 0.9]

---

## Decision 8: Navigation Update

**Decision**: Add "Blog" link to Navbar after "About"

**Rationale**:
- User explicitly requested this placement
- Maintains existing nav structure
- Simple modification to `components/Navbar.tsx`

**Implementation**:
```typescript
const navLinks = [
  { label: "Solutions", href: "#platform" },
  { label: "How It Works", href: "#solutions" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Why Us", href: "#why-us" },
  { label: "About", href: "#company" },
  { label: "Blog", href: "/blog", isExternal: true },  // NEW
]
```

---

## Decision 9: Table of Contents Section Tracking

**Decision**: Use Intersection Observer API for active section tracking

**Rationale**:
- Native browser API, no external dependencies
- Efficient performance with minimal re-renders
- Standard approach for TOC highlighting
- Works well with smooth scroll

**Implementation**:
```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    },
    { rootMargin: "-100px 0px -66%", threshold: 0 }
  )

  sections.forEach((section) => {
    const element = document.getElementById(section.id)
    if (element) observer.observe(element)
  })

  return () => observer.disconnect()
}, [sections])
```

**Root Margin Explanation**:
- `-100px 0px -66%`: Top margin accounts for sticky header, bottom margin ensures early activation as user scrolls

---

## Technology Best Practices

### Next.js App Router
- Use `generateMetadata` for SEO on both listing and detail pages
- Use `generateStaticParams` for static generation of detail pages
- Server Components for initial render, Client Components for interactivity

### Tailwind CSS v4
- Use existing theme colors (`rockship-*`)
- Use `cn()` utility for conditional classes
- Follow established spacing scale

### Accessibility
- Proper heading hierarchy (h1 for title, h2 for cards)
- Focus states on all interactive elements
- ARIA labels for search and filter controls
- Keyboard navigation support

---

## Resolved Items

All technical decisions have been made. No NEEDS CLARIFICATION items remain.
