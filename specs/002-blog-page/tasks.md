# Tasks: Blog Page

**Input**: Design documents from `/specs/002-blog-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Manual visual testing only (no automated tests requested)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

Based on plan.md structure:
- **Pages**: `app/blog/`
- **Components**: `components/blog/`
- **Types**: `types/`
- **Data/Utils**: `lib/`
- **Hooks**: `hooks/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create TypeScript types, data layer, and utility functions shared by all user stories

- [x] T001 [P] Create BlogPost, BlogSection, and TopicTag TypeScript interfaces in `types/blog.ts`
- [x] T002 [P] Create static blog post data with 6 sample posts (including sections for TOC) in `lib/blog-data.ts`
- [x] T003 [P] Create blog utility functions (getTopicTags, filterPosts, formatDate) in `lib/blog-utils.ts`
- [x] T004 Add "Blog" link to navigation after "About" with isExternal flag in `components/Navbar.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create reusable components that multiple user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 [P] Create BlogCard component with glass morphism styling in `components/blog/BlogCard.tsx`
- [x] T006 [P] Create EmptyState component for no results in `components/blog/EmptyState.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse All Blog Posts (Priority: P1) 🎯 MVP

**Goal**: Display all blog posts in a responsive card grid layout with hero section

**Independent Test**: Navigate to /blog and verify posts display in responsive grid (3→2→1 columns)

### Implementation for User Story 1

- [x] T007 [P] [US1] Create BlogHero component with title and description in `components/blog/BlogHero.tsx`
- [x] T008 [P] [US1] Create BlogGrid component for responsive card layout in `components/blog/BlogGrid.tsx`
- [x] T009 [US1] Create blog listing page server component with generateMetadata in `app/blog/page.tsx`
- [x] T010 [US1] Create BlogPageClient component for client-side state management in `app/blog/BlogPageClient.tsx`
- [x] T011 [US1] Add FadeIn animations to blog cards with stagger effect in `app/blog/BlogPageClient.tsx`

**Checkpoint**: User Story 1 complete - blog listing shows all posts with responsive grid

---

## Phase 4: User Story 4 - Read Blog Post Detail (Priority: P1)

**Goal**: Display full blog post content with two-column layout and sticky TOC sidebar

**Independent Test**: Click any blog card and verify navigation to detail page with full content and TOC

### Implementation for User Story 4

- [x] T012 [P] [US4] Create TableOfContents component with active section tracking in `components/blog/TableOfContents.tsx`
- [x] T013 [US4] Create blog detail page server component with generateStaticParams and generateMetadata in `app/blog/[slug]/page.tsx`
- [x] T014 [US4] Create BlogDetailClient component with two-column layout in `app/blog/[slug]/BlogDetailClient.tsx`
- [x] T015 [US4] Add Intersection Observer for active section tracking in `app/blog/[slug]/BlogDetailClient.tsx`
- [x] T016 [US4] Add markdownToHtml function with section IDs for TOC navigation in `app/blog/[slug]/BlogDetailClient.tsx`
- [x] T017 [US4] Style markdown/content typography following design system in `app/blog/[slug]/BlogDetailClient.tsx`
- [x] T018 [US4] Add back navigation link to blog listing in `app/blog/[slug]/BlogDetailClient.tsx`

**Checkpoint**: User Story 4 complete - clicking cards navigates to full post with TOC sidebar

---

## Phase 5: User Story 2 - Filter Posts by Topic (Priority: P2)

**Goal**: Allow filtering blog posts by topic tags with visual feedback

**Independent Test**: Click topic filter buttons and verify only matching posts appear

### Implementation for User Story 2

- [x] T019 [P] [US2] Create TopicFilter component with pill buttons in `components/blog/TopicFilter.tsx`
- [x] T020 [US2] Add active state styling (bg-rockship-accent) to TopicFilter in `components/blog/TopicFilter.tsx`
- [x] T021 [US2] Integrate TopicFilter into blog listing page in `app/blog/BlogPageClient.tsx`
- [x] T022 [US2] Add useState for selectedTopic and wire to filterPosts in `app/blog/BlogPageClient.tsx`
- [x] T023 [US2] Show EmptyState when no posts match filter in `app/blog/BlogPageClient.tsx`

**Checkpoint**: User Story 2 complete - topic filtering works with visual feedback

---

## Phase 6: User Story 3 - Search Blog Posts (Priority: P2)

**Goal**: Allow searching blog posts by keywords in title and excerpt

**Independent Test**: Type in search field and verify only matching posts appear with debounce

### Implementation for User Story 3

- [x] T024 [P] [US3] Create useDebounce hook for search input in `hooks/useDebounce.ts`
- [x] T025 [P] [US3] Create BlogSearch component with search icon in `components/blog/BlogSearch.tsx`
- [x] T026 [US3] Integrate BlogSearch into blog listing page in `app/blog/BlogPageClient.tsx`
- [x] T027 [US3] Add useState for searchQuery with debounce (300ms) in `app/blog/BlogPageClient.tsx`
- [x] T028 [US3] Combine search + topic filter with AND logic in `app/blog/BlogPageClient.tsx`

**Checkpoint**: User Story 3 complete - search works with debounce and combines with topic filter

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements, accessibility, and performance optimization

- [x] T029 [P] Verify keyboard navigation works on all interactive elements
- [x] T030 [P] Add aria-labels to search and filter controls for screen readers
- [x] T031 [P] Ensure animations respect prefers-reduced-motion in all components
- [x] T032 Run `pnpm build` and fix any TypeScript or build errors
- [x] T033 Visual testing on mobile (320px, 768px) and desktop (1024px, 1440px)
- [x] T034 Run Lighthouse audit and verify Performance 90+, Accessibility 100

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on T001-T003 (types and data)
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion
- **User Story 4 (Phase 4)**: Depends on Phase 2 completion (parallel with US1)
- **User Story 2 (Phase 5)**: Depends on Phase 3 (needs blog grid to filter)
- **User Story 3 (Phase 6)**: Depends on Phase 3 (needs blog grid to search)
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

```
Phase 1: Setup
    ↓
Phase 2: Foundational
    ↓
    ├── US1 (Browse) ←── US2 (Filter) depends on grid
    │       ↓
    │       └──────────── US3 (Search) depends on grid
    │
    └── US4 (Detail) can run parallel with US1
            ↓
        Phase 7: Polish
```

### Within Each User Story

- Components before page integration
- Page structure before interactivity
- Core features before enhancements

### Parallel Opportunities

**Phase 1 - All parallel:**
- T001, T002, T003 (different files)

**Phase 2 - All parallel:**
- T005, T006 (different components)

**Phase 3 (US1) - Partial parallel:**
- T007, T008 (parallel - different components)
- T009-T011 sequential (same file/dependencies)

**Phase 4 (US4) - Can run parallel with Phase 3:**
- T012 can start as soon as Phase 2 completes
- T013-T018 are sequential (same file)

**Phase 5 (US2) - Partial parallel:**
- T019 can start while T020-T023 wait
- T021-T023 sequential (same file)

**Phase 6 (US3) - Partial parallel:**
- T024, T025 (parallel - different files)
- T026-T028 sequential (same file)

---

## Parallel Example: Phase 1

```bash
# Launch all Phase 1 tasks together:
Task: "Create BlogPost, BlogSection, and TopicTag TypeScript interfaces in types/blog.ts"
Task: "Create static blog post data with 6 sample posts in lib/blog-data.ts"
Task: "Create blog utility functions in lib/blog-utils.ts"
```

## Parallel Example: User Story 1 + User Story 4

```bash
# After Phase 2 completes, launch both stories in parallel:
# Developer A: User Story 1
Task: "Create BlogHero component in components/blog/BlogHero.tsx"
Task: "Create BlogGrid component in components/blog/BlogGrid.tsx"

# Developer B: User Story 4
Task: "Create TableOfContents component in components/blog/TableOfContents.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 4 Only)

1. Complete Phase 1: Setup (types, data, utils)
2. Complete Phase 2: Foundational (BlogCard, EmptyState)
3. Complete Phase 3: User Story 1 (browse posts)
4. Complete Phase 4: User Story 4 (read detail with TOC)
5. **STOP and VALIDATE**: Test browsing and reading posts
6. Deploy/demo if ready - users can browse and read all posts

### Incremental Delivery

1. **MVP (US1 + US4)**: Users can browse and read posts with TOC navigation
2. **+Filter (US2)**: Users can filter by topic
3. **+Search (US3)**: Users can search posts
4. **+Polish**: Accessibility, performance verified

### Task Counts

| Phase | Tasks | Parallel |
|-------|-------|----------|
| Setup | 4 | 3 |
| Foundational | 2 | 2 |
| US1 (Browse) | 5 | 2 |
| US4 (Detail) | 7 | 1 |
| US2 (Filter) | 5 | 1 |
| US3 (Search) | 5 | 2 |
| Polish | 6 | 3 |
| **Total** | **34** | **14** |

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Manual visual testing only (no automated tests)
- Each user story is independently testable
- Commit after each task or logical group
- US1 + US4 together form MVP (browse + read with TOC)
