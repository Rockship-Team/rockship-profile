# Tasks: Supabase Integration for Blog Page

**Input**: Design documents from `/specs/003-supabase-blog-integration/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested - manual testing per Constitution (visual, mobile, Lighthouse audits)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and configure Supabase connection

- [x] T001 Install Supabase dependencies: `pnpm add @supabase/ssr @supabase/supabase-js`
- [x] T002 [P] Create `.env.local.example` with required environment variables template
- [x] T003 [P] Create Supabase browser client in `lib/supabase/client.ts`
- [x] T004 [P] Create Supabase server client in `lib/supabase/server.ts`
- [x] T005 [P] Create database TypeScript types in `lib/supabase/types.ts` per data-model.md
- [x] T006 Update `types/blog.ts` to export Supabase-compatible types

---

## Phase 2: Foundational (Database & Migration)

**Purpose**: Create database schema and migrate existing data - MUST complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create Supabase migration SQL file in `supabase/migrations/001_create_blog_tables.sql` with all tables, indexes, triggers per data-model.md
- [x] T008 Create RLS policies SQL in `supabase/migrations/002_blog_rls_policies.sql` per data-model.md
- [x] T009 Create seed script in `supabase/seed.sql` to migrate all 6 posts from `lib/blog-data.ts`
- [ ] T010 Run migrations in Supabase dashboard or via CLI (MANUAL)
- [ ] T011 Verify data migration: all posts and tags inserted correctly (MANUAL)

**Checkpoint**: Database ready with seeded data - user story implementation can now begin

---

## Phase 3: User Story 1 - View Blog Posts from Database (Priority: P1) 🎯 MVP

**Goal**: Replace static blog listing with Supabase data retrieval

**Independent Test**: Navigate to `/blog` and verify posts load from Supabase sorted by date

### Implementation for User Story 1

- [x] T012 [US1] Create `getPublishedPosts()` function in `lib/supabase/queries.ts` to fetch published posts with tags
- [x] T013 [US1] Create `getAllTags()` function in `lib/supabase/queries.ts` to fetch tags with counts
- [x] T014 [US1] Update `app/blog/page.tsx` to fetch posts from Supabase using server component
- [x] T015 [US1] Update `app/blog/BlogPageClient.tsx` to receive posts as props instead of importing static data
- [x] T016 [US1] Add loading state component in `components/blog/BlogListSkeleton.tsx`
- [x] T017 [US1] Add empty state component in `components/blog/EmptyBlogState.tsx`
- [x] T018 [US1] Add error boundary for database connection failures in `app/blog/error.tsx`
- [ ] T019 [US1] Verify blog listing works: shows posts sorted newest first (MANUAL)

**Checkpoint**: Blog listing page fully functional with Supabase data

---

## Phase 4: User Story 2 - Read Individual Blog Post (Priority: P1)

**Goal**: Fetch single blog post by slug from Supabase

**Independent Test**: Click any post card and verify full content loads from Supabase

### Implementation for User Story 2

- [x] T020 [US2] Create `getPostBySlug()` function in `lib/supabase/queries.ts`
- [x] T021 [US2] Create `getAllSlugs()` function in `lib/supabase/queries.ts` for static params generation
- [x] T022 [US2] Update `app/blog/[slug]/page.tsx` to fetch post from Supabase
- [x] T023 [US2] Update `generateStaticParams()` in `app/blog/[slug]/page.tsx` to use Supabase slugs
- [x] T024 [US2] Update `generateMetadata()` in `app/blog/[slug]/page.tsx` for SEO
- [x] T025 [US2] Ensure 404 handling works for non-existent slugs
- [ ] T026 [US2] Verify post detail page works: content, author, date, reading time display correctly (MANUAL)

**Checkpoint**: Blog detail pages fully functional - MVP complete (US1 + US2)

---

## Phase 5: User Story 3 - Search and Filter Blog Posts (Priority: P2)

**Goal**: Enable full-text search and tag filtering

**Independent Test**: Enter search query and select tag filter, verify results update correctly

### Implementation for User Story 3

- [x] T027 [US3] Create `searchPosts()` function in `lib/supabase/queries.ts` using PostgreSQL full-text search
- [x] T028 [US3] Create `getPostsByTag()` function in `lib/supabase/queries.ts`
- [x] T029 [US3] Update `app/blog/BlogPageClient.tsx` to call search/filter queries
- [x] T030 [US3] Add debounced search input handling in `hooks/useDebounce.ts` (if not exists)
- [x] T031 [US3] Update tag filter component to use Supabase tag query
- [ ] T032 [US3] Verify search works: results update within 500ms of input (MANUAL)
- [ ] T033 [US3] Verify combined search + tag filter works correctly (MANUAL)

**Checkpoint**: Public blog features complete (listing, detail, search, filter)

---

## Phase 6: User Story 4 - Admin Authentication (Priority: P2)

**Goal**: Protect admin routes with basic auth from environment variables

**Independent Test**: Access `/admin/post` and verify basic auth prompt appears

### Implementation for User Story 4

- [x] T034 [US4] Create basic auth utility in `lib/auth.ts` to validate credentials from env vars
- [x] T035 [US4] Create admin layout in `app/admin/layout.tsx` with auth check
- [x] T036 [US4] Create proxy config for admin route protection (Next.js 16 proxy pattern)
- [x] T037 [US4] Add `ADMIN_USERNAME` and `ADMIN_PASSWORD` to `.env.local.example`
- [ ] T038 [US4] Verify auth works: correct credentials grant access, wrong credentials show 401 (MANUAL)

**Checkpoint**: Admin routes protected with basic auth

---

## Phase 7: User Story 5 - Admin Creates New Blog Post (Priority: P2)

**Goal**: Admin can create new posts via form interface

**Independent Test**: Login to admin, create post, verify it appears on public blog

### Implementation for User Story 5

- [x] T039 [US5] Create `createPost` server action in `actions/blog.ts`
- [x] T040 [P] [US5] Create `PostForm` component in `components/admin/PostForm.tsx` with markdown textarea and preview toggle
- [x] T041 [P] [US5] Create `PostList` component in `components/admin/PostList.tsx` for admin listing
- [x] T042 [US5] Create admin page in `app/admin/post/page.tsx` with post list and create button
- [x] T043 [US5] Create `AdminPostClient.tsx` in `app/admin/post/AdminPostClient.tsx` (using PostForm/PostList instead)
- [x] T044 [US5] Create new post page in `app/admin/post/new/page.tsx` with PostForm
- [x] T045 [US5] Add form validation for required fields (slug, title, content)
- [x] T046 [US5] Add draft/publish toggle functionality
- [ ] T047 [US5] Verify create works: new post saved to Supabase, appears on public blog when published (MANUAL)

**Checkpoint**: Admin can create and publish new posts

---

## Phase 8: User Story 6 - Admin Updates Existing Blog Post (Priority: P3)

**Goal**: Admin can edit existing posts

**Independent Test**: Edit a post via admin, verify changes appear on public blog

### Implementation for User Story 6

- [x] T048 [US6] Create `updatePost` server action in `actions/blog.ts`
- [x] T049 [US6] Create `getPostById` function in `lib/supabase/queries.ts` for admin (includes drafts)
- [x] T050 [US6] Create edit post page in `app/admin/post/[id]/page.tsx`
- [x] T051 [US6] Create `EditPostClient.tsx` in `app/admin/post/[id]/EditPostClient.tsx` (using PostForm instead)
- [x] T052 [US6] Add edit links to `PostList` component
- [ ] T053 [US6] Verify update works: changes saved, old slug returns 404 if changed, new slug works (MANUAL)

**Checkpoint**: Admin can edit existing posts

---

## Phase 9: User Story 7 - Admin Deletes Blog Post (Priority: P3)

**Goal**: Admin can delete posts with confirmation

**Independent Test**: Delete a post via admin, verify it no longer appears on public blog

### Implementation for User Story 7

- [x] T054 [US7] Create `deletePost` server action in `actions/blog.ts`
- [x] T055 [P] [US7] Create `DeleteConfirmDialog` component in `components/admin/DeleteConfirmDialog.tsx`
- [x] T056 [US7] Add delete button to `PostList` component with confirmation
- [ ] T057 [US7] Verify delete works: post removed from Supabase, no longer on public blog (MANUAL)

**Checkpoint**: Full admin CRUD functionality complete

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, deprecation, and quality assurance

- [x] T058 [P] Remove or deprecate `lib/blog-data.ts` (add deprecation comment, keep for reference)
- [ ] T059 [P] Update `lib/blog-utils.ts` if needed for Supabase date handling
- [x] T060 [P] Add revalidation logic for blog pages after admin changes
- [x] T061 Run `pnpm build` and fix any TypeScript errors
- [ ] T062 Run `pnpm lint` and fix any linting warnings (pre-existing ESLint 9 config issue)
- [ ] T063 Manual testing: Desktop (Chrome, Firefox, Safari) per Constitution (MANUAL)
- [ ] T064 Manual testing: Mobile (iOS Safari, Android Chrome) per Constitution (MANUAL)
- [ ] T065 Lighthouse audit: verify Performance 90+, Accessibility 100, Best Practices 95+ (MANUAL)
- [ ] T066 Verify all existing blog URLs still work (no broken links) (MANUAL)
- [ ] T067 Final verification: all acceptance scenarios from spec.md pass (MANUAL)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-9)**: All depend on Foundational phase completion
- **Polish (Phase 10)**: Depends on desired user stories being complete

### User Story Dependencies

| Story | Priority | Can Start After | Notes |
|-------|----------|-----------------|-------|
| US1 - View Posts | P1 | Phase 2 | No dependencies on other stories |
| US2 - Read Post | P1 | Phase 2 | No dependencies, pairs well with US1 |
| US3 - Search/Filter | P2 | Phase 2 | Uses same queries as US1 |
| US4 - Admin Auth | P2 | Phase 2 | Required before US5-US7 |
| US5 - Create Post | P2 | US4 | Requires auth to be complete |
| US6 - Update Post | P3 | US5 | Uses PostForm from US5 |
| US7 - Delete Post | P3 | US5 | Uses PostList from US5 |

### Parallel Opportunities

**Within Setup (Phase 1):**
```
T002, T003, T004, T005 can all run in parallel
```

**After Foundational completes:**
```
US1, US2, US3 can start in parallel (independent public features)
US4 can start in parallel (admin auth is independent)
```

**Within User Story 5:**
```
T040 (PostForm) and T041 (PostList) can run in parallel
```

**Within Polish:**
```
T058, T059, T060 can all run in parallel
```

---

## Parallel Example: Phase 1 Setup

```bash
# Launch all parallel setup tasks together:
Task: "Create `.env.local.example` with required environment variables template"
Task: "Create Supabase browser client in `lib/supabase/client.ts`"
Task: "Create Supabase server client in `lib/supabase/server.ts`"
Task: "Create database TypeScript types in `lib/supabase/types.ts`"
```

---

## Implementation Strategy

### MVP First (US1 + US2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - creates database)
3. Complete Phase 3: User Story 1 (blog listing)
4. Complete Phase 4: User Story 2 (blog detail)
5. **STOP and VALIDATE**: Test public blog works end-to-end
6. Deploy/demo if ready - basic blog functionality live!

### Incremental Delivery

1. Setup + Foundational → Database ready
2. US1 + US2 → Public blog works (MVP!)
3. US3 → Search/filter added
4. US4 + US5 → Admin can create posts
5. US6 + US7 → Full admin CRUD
6. Polish → Production ready

### Suggested MVP Scope

**Minimum viable**: US1 (View Posts) + US2 (Read Post)
- Replaces static data with Supabase
- Public blog fully functional
- Can deploy and use while building admin features

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Manual testing required per Constitution (no automated tests in this feature)
