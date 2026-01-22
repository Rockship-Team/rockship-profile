# Feature Specification: Supabase Integration for Blog Page

**Feature Branch**: `003-supabase-blog-integration`
**Created**: 2026-01-21
**Updated**: 2026-01-22
**Status**: Implementation Complete (Pending Manual Testing)
**Input**: User description: "use skills supabase to implement supabase with blog page"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Blog Posts from Database (Priority: P1)

A visitor navigates to the blog page and sees all published blog posts retrieved from Supabase database instead of static data.

**Why this priority**: This is the core functionality - replacing static data with dynamic database content. Without this, no other features work.

**Independent Test**: Can be fully tested by navigating to /blog page and verifying posts load from Supabase. Delivers value by enabling dynamic content management.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they navigate to the blog page, **Then** they see a list of all published blog posts sorted by publication date (newest first)
2. **Given** a visitor on the blog page, **When** posts are loading, **Then** they see a loading state
3. **Given** a visitor on the blog page, **When** no posts exist in the database, **Then** they see an appropriate empty state message

---

### User Story 2 - Read Individual Blog Post (Priority: P1)

A visitor can click on a blog post from the listing and read the full article content retrieved from Supabase.

**Why this priority**: Reading individual posts is essential blog functionality and required alongside the listing.

**Independent Test**: Can be tested by clicking any blog post card and verifying the full content loads from Supabase with correct formatting.

**Acceptance Scenarios**:

1. **Given** a visitor on the blog listing page, **When** they click on a post title or card, **Then** they are navigated to the individual post page showing full content
2. **Given** a visitor on a blog post page, **When** the post slug is valid, **Then** they see the full post content including title, author, date, reading time, and body
3. **Given** a visitor accessing a non-existent post slug, **When** the page loads, **Then** they see a 404 not found page

---

### User Story 3 - Search and Filter Blog Posts (Priority: P2)

A visitor can search for blog posts by keywords and filter by topic tags.

**Why this priority**: Enhances discoverability but not essential for basic blog functionality.

**Independent Test**: Can be tested by entering search terms and selecting topic filters, verifying results update correctly from Supabase queries.

**Acceptance Scenarios**:

1. **Given** a visitor on the blog page, **When** they type a search query, **Then** the posts filter to show only those matching the query in title or content
2. **Given** a visitor on the blog page, **When** they select a topic tag, **Then** the posts filter to show only those with that tag
3. **Given** a visitor using both search and topic filter, **When** results are displayed, **Then** only posts matching both criteria appear

---

### User Story 4 - Admin Authenticates to Access Admin Panel (Priority: P2)

A content administrator accesses the admin panel at `/admin/post` by providing basic auth credentials stored in environment variables.

**Why this priority**: Authentication is required before any admin operations can be performed.

**Independent Test**: Can be tested by accessing `/admin/post` and verifying basic auth prompt appears, and correct credentials grant access.

**Acceptance Scenarios**:

1. **Given** a user accessing `/admin/post`, **When** they provide correct credentials from env variables, **Then** they gain access to the admin panel
2. **Given** a user accessing `/admin/post`, **When** they provide incorrect credentials, **Then** they are denied access with appropriate error message
3. **Given** an authenticated admin, **When** their session is active, **Then** they can perform CRUD operations on posts

---

### User Story 5 - Admin Creates New Blog Post (Priority: P2)

A content administrator can create new blog posts via the `/admin/post` interface.

**Why this priority**: Content creation enables the dynamic nature of the blog.

**Independent Test**: Can be tested by logging into admin panel, creating a new post, and verifying it appears on the public blog page.

**Acceptance Scenarios**:

1. **Given** an authenticated admin on `/admin/post`, **When** they fill out the post form and submit, **Then** the post is saved to Supabase and appears on the public blog listing
2. **Given** an admin creating a post, **When** they save as draft (unpublished), **Then** the post does not appear on the public blog page
3. **Given** an admin creating a post, **When** required fields are missing, **Then** the form shows validation errors

---

### User Story 6 - Admin Updates Existing Blog Post (Priority: P3)

A content administrator can edit existing blog posts via the `/admin/post` interface.

**Why this priority**: Edit functionality is valuable but can be deferred after initial integration.

**Independent Test**: Can be tested by modifying a post via admin panel and verifying changes appear on the public blog.

**Acceptance Scenarios**:

1. **Given** an authenticated admin on `/admin/post`, **When** they select a post and update its content, **Then** the changes are saved to Supabase and appear on the public blog page
2. **Given** an admin updating a post, **When** they change the slug, **Then** the old URL returns 404 and new URL shows the post

---

### User Story 7 - Admin Deletes Blog Post (Priority: P3)

A content administrator can delete blog posts via the `/admin/post` interface.

**Why this priority**: Delete functionality completes the CRUD operations for admin.

**Independent Test**: Can be tested by deleting a post via admin panel and verifying it no longer appears on the public blog.

**Acceptance Scenarios**:

1. **Given** an authenticated admin on `/admin/post`, **When** they select a post and confirm deletion, **Then** the post is removed from Supabase and no longer appears on the public blog
2. **Given** an admin attempting to delete, **When** they click delete, **Then** they see a confirmation dialog before final deletion

---

### Edge Cases

- What happens when Supabase connection fails? → Display user-friendly error message and fallback gracefully
- How does the system handle concurrent edits to the same post? → Supabase handles this at database level; last write wins
- What happens when a post has no sections defined? → Post displays without table of contents
- How are very long posts handled? → Content renders with standard markdown processing; no truncation on detail page
- What happens when admin credentials env vars are not set? → Application fails to start with clear error message
- What happens when admin attempts unauthorized action? → Return 401 Unauthorized and redirect to login

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST retrieve all published blog posts from Supabase database
- **FR-002**: System MUST display posts sorted by publication date (newest first)
- **FR-003**: System MUST support querying individual posts by slug
- **FR-004**: System MUST support filtering posts by search query (title and content matching)
- **FR-005**: System MUST support filtering posts by topic tags
- **FR-006**: System MUST distinguish between published and draft posts, showing only published on public pages
- **FR-007**: System MUST handle database connection errors gracefully with user-friendly messages
- **FR-008**: System MUST enforce data integrity for required post fields (slug, title, content, publishedAt)
- **FR-009**: System MUST support markdown content storage and rendering
- **FR-010**: System MUST generate appropriate metadata (SEO) for each blog post page
- **FR-011**: System MUST implement Row Level Security (RLS) policies for blog data
- **FR-012**: System MUST provide an admin interface at `/admin/post` for managing blog posts (create, read, update, delete)
- **FR-013**: System MUST protect `/admin/post` with basic authentication using credentials from environment variables
- **FR-014**: System MUST validate required fields before saving posts in admin interface
- **FR-015**: System MUST show confirmation dialog before deleting posts

### Key Entities

- **BlogPost**: Represents a blog article with slug (unique identifier), title, excerpt, content (markdown), publishedAt date, author, reading time estimate, and publication status
- **BlogSection**: Represents navigational sections within a post (for table of contents) with id, title, and heading level
- **Tag**: Represents topic categories for posts; many-to-many relationship with BlogPost

## Clarifications

### Session 2026-01-21

- Q: Where will admin manage posts? → A: `/admin/post` page for create, edit, delete operations
- Q: What authentication for admin? → A: Basic auth with credentials from environment variables (hardcoded in env)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Blog page loads and displays posts within 2 seconds under normal conditions
- **SC-002**: Search results update within 500ms of user input
- **SC-003**: 100% of existing static blog posts are migrated to Supabase without data loss
- **SC-004**: All existing blog URLs continue to work after migration (no broken links)
- **SC-005**: System handles up to 1000 blog posts without performance degradation
- **SC-006**: Database operations complete successfully 99.9% of the time
