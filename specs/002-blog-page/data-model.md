# Data Model: Blog Page

**Feature**: 002-blog-page
**Date**: 2026-01-21

## Entity Overview

```
┌─────────────────┐
│    BlogPost     │
├─────────────────┤
│ slug (PK)       │
│ title           │
│ excerpt         │
│ content         │
│ publishedAt     │
│ tags[]          │──────┐
│ author?         │      │
│ readingTime?    │      │
│ sections?[]     │──────┼──┐
└─────────────────┘      │  │
                         │  │
┌─────────────────┐      │  │
│   TopicTag      │◄─────┘  │
├─────────────────┤  (derived)
│ name            │         │
│ slug            │         │
│ count (computed)│         │
└─────────────────┘         │
                            │
┌─────────────────┐         │
│  BlogSection    │◄────────┘
├─────────────────┤  (for TOC)
│ id              │
│ title           │
│ level           │
└─────────────────┘
```

## Entities

### BlogPost

Represents an individual blog article.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| slug | string | ✅ | URL-friendly identifier (PK), e.g., "2025-year-in-review" |
| title | string | ✅ | Post title, max 100 characters recommended |
| excerpt | string | ✅ | Summary for cards, 2-3 sentences (150-200 chars) |
| content | string | ✅ | Full article content (markdown or HTML) |
| publishedAt | Date | ✅ | Publication date for display and sorting |
| tags | string[] | ✅ | Array of topic tag names, 1-5 tags per post |
| author | string | ❌ | Author name (optional for showcase) |
| readingTime | number | ❌ | Estimated reading time in minutes (optional) |
| sections | BlogSection[] | ❌ | Array of sections for TOC navigation (optional) |

**Validation Rules**:
- `slug`: lowercase, alphanumeric with hyphens only, unique
- `title`: non-empty, max 100 chars
- `excerpt`: non-empty, max 300 chars
- `tags`: at least 1 tag, max 5 tags per post
- `publishedAt`: valid date, not in future

**Sample Data**:
```typescript
{
  slug: "2025-year-in-review",
  title: "2025 Year In Review",
  excerpt: "As 2025 comes to an end, I pause to summarize the major Rockship AI milestones of the year.",
  content: "# 2025 Year In Review\n\nAs 2025 comes to an end...",
  publishedAt: new Date("2025-12-25"),
  tags: ["milestones", "workshops"],
  author: "Rockship Team",
  readingTime: 5,
  sections: [
    { id: "q1-foundation-building", title: "Q1: Foundation Building", level: 2 },
    { id: "q2-first-success-stories", title: "Q2: First Success Stories", level: 2 },
    { id: "looking-forward", title: "Looking Forward", level: 2 }
  ]
}
```

### TopicTag (Derived)

Represents a category/tag for blog posts. Computed from BlogPost tags.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Display name of the tag |
| slug | string | URL-friendly version (lowercase, hyphenated) |
| count | number | Number of posts with this tag (computed) |

**Computation**:
```typescript
function getTopicTags(posts: BlogPost[]): TopicTag[] {
  const tagCounts = new Map<string, number>()

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    count
  }))
}
```

### BlogSection (For TOC)

Represents a section within a blog post for Table of Contents navigation.

| Field | Type | Description |
|-------|------|-------------|
| id | string | HTML id attribute for the section heading (used for anchor links) |
| title | string | Display title of the section |
| level | 1 \| 2 \| 3 | Heading level (h1=1, h2=2, h3=3) for indentation |

**Sample Data**:
```typescript
{ id: "q1-foundation-building", title: "Q1: Foundation Building", level: 2 }
{ id: "type-safety-matters", title: "1. Type Safety Matters", level: 3 }
```

## TypeScript Types

```typescript
// types/blog.ts

export interface BlogSection {
  id: string
  title: string
  level: 1 | 2 | 3
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: Date
  tags: string[]
  author?: string
  readingTime?: number
  sections?: BlogSection[]
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
```

## Data Storage

Static data stored in `lib/blog-data.ts`:

```typescript
// lib/blog-data.ts

import { BlogPost } from '@/types/blog'

export const blogPosts: BlogPost[] = [
  {
    slug: "2025-year-in-review",
    title: "2025 Year In Review",
    excerpt: "As 2025 comes to an end, I pause to summarize the major Rockship AI milestones of the year.",
    content: `# 2025 Year In Review

As 2025 comes to an end, I pause to summarize the major Rockship AI milestones of the year...`,
    publishedAt: new Date("2025-12-25"),
    tags: ["milestones", "workshops"],
    readingTime: 5
  },
  // ... more posts
]

// Helper functions
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map(post => post.slug)
}

export function getPostsSortedByDate(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    b.publishedAt.getTime() - a.publishedAt.getTime()
  )
}
```

## Utility Functions

```typescript
// lib/blog-utils.ts

import { BlogPost, TopicTag, BlogFilterState } from '@/types/blog'

export function getTopicTags(posts: BlogPost[]): TopicTag[] {
  const tagCounts = new Map<string, number>()

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }))
    .sort((a, b) => b.count - a.count)
}

export function filterPosts(
  posts: BlogPost[],
  { searchQuery, selectedTopic }: BlogFilterState
): BlogPost[] {
  return posts.filter(post => {
    // Topic filter
    if (selectedTopic && !post.tags.includes(selectedTopic)) {
      return false
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      )
    }

    return true
  })
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```

## Sample Blog Posts (6 entries)

Based on the reference UI mockup:

| Slug | Title | Tags |
|------|-------|------|
| 2025-year-in-review | 2025 Year In Review | milestones, workshops |
| future-of-cdktf | The future of CDKTF | ocf |
| introducing-the-grid | Introducing: The Grid | grid, series |
| sdd-practical-approach | SDD: A Practical Approach | llm, grid, series |
| why-terraform-still-matters | Why Terraform still matters | llm, opinion, series |
| terraconstructs-overview | TerraConstructs Overview | workshops, typescript |

## State Transitions

No complex state transitions. Posts are static and read-only.

**Filter State**:
- Initial: `{ searchQuery: '', selectedTopic: null }`
- On search: `{ searchQuery: 'user input', selectedTopic: current }`
- On topic select: `{ searchQuery: current, selectedTopic: 'topic-name' }`
- On "All" click: `{ searchQuery: current, selectedTopic: null }`
