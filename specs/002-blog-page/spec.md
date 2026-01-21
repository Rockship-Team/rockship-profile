# Feature Specification: Blog Page

**Feature Branch**: `002-blog-page`
**Created**: 2026-01-21
**Status**: Draft
**Input**: User description: "tôi muốn tạo page blog, layout tương tự hình, style thì theo style hệ thống hiện tại"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse All Blog Posts (Priority: P1)

As a visitor, I want to see all blog posts displayed in a card grid layout so that I can quickly scan available content and find articles of interest.

**Why this priority**: This is the core functionality - without displaying posts, the blog page has no value. Users need to see content first before filtering or searching.

**Independent Test**: Can be fully tested by navigating to /blog and verifying posts are displayed in a responsive grid layout. Delivers immediate value by showcasing available content.

**Acceptance Scenarios**:

1. **Given** I am on the homepage, **When** I navigate to the blog page, **Then** I see a hero section with "Blog" title and description, followed by a grid of blog post cards.
2. **Given** I am viewing the blog page, **When** I scroll down, **Then** I see all blog posts displayed in a responsive grid (3 columns on large screens, 2 on medium, 1 on small).
3. **Given** I am viewing a blog post card, **When** I look at the card, **Then** I see the post title, publication date, summary/excerpt, and topic tags.

---

### User Story 2 - Filter Posts by Topic (Priority: P2)

As a visitor, I want to filter blog posts by topic so that I can focus on content relevant to my interests.

**Why this priority**: Filtering enhances discoverability after users can see all posts. It's essential for blogs with multiple categories but not critical for basic functionality.

**Independent Test**: Can be tested by clicking different topic filter buttons and verifying only posts with matching topics appear.

**Acceptance Scenarios**:

1. **Given** I am on the blog page, **When** I look at the filter section, **Then** I see an "All" button (active by default) and topic filter buttons with post counts.
2. **Given** I am viewing all posts, **When** I click on a specific topic button (e.g., "series"), **Then** only posts tagged with that topic are displayed.
3. **Given** I have filtered by a topic, **When** I click the "All" button, **Then** all posts are displayed again.
4. **Given** I have filtered by a topic, **When** the filtered results appear, **Then** the active topic button is visually highlighted (filled/selected state).

---

### User Story 3 - Search Blog Posts (Priority: P2)

As a visitor, I want to search for blog posts by keywords so that I can quickly find specific content.

**Why this priority**: Search is equally important as filtering for user experience, allowing users to find content by title or content keywords.

**Independent Test**: Can be tested by entering a search query and verifying only matching posts appear in results.

**Acceptance Scenarios**:

1. **Given** I am on the blog page, **When** I look at the search section, **Then** I see a search input field with placeholder text "Search posts...".
2. **Given** I am on the blog page, **When** I type a keyword in the search field, **Then** the post list is filtered to show only posts whose title or summary contains the search term.
3. **Given** I have entered a search term, **When** I clear the search field, **Then** all posts (or filtered posts if a topic is selected) are displayed again.

---

### User Story 4 - Read Blog Post Detail (Priority: P1)

As a visitor, I want to click on a blog post card to read the full article so that I can consume the complete content.

**Why this priority**: Reading full posts is equally critical as browsing - users need to access full content for the blog to deliver value.

**Independent Test**: Can be tested by clicking on any blog post card and verifying navigation to a detail page with full content.

**Acceptance Scenarios**:

1. **Given** I am viewing the blog post grid, **When** I click on a blog post card, **Then** I am navigated to the blog post detail page.
2. **Given** I am on a blog post detail page, **When** the page loads, **Then** I see a two-column layout with main content on the left and "On This Page" sidebar navigation on the right.
3. **Given** I am on a blog post detail page, **When** I view the header, **Then** I see the post title, author name, publication date, and reading time.
4. **Given** I am on a blog post detail page, **When** I scroll the content, **Then** the "On This Page" sidebar remains sticky and shows section navigation links.
5. **Given** I am on a blog post detail page with sections, **When** I click a section link in the sidebar, **Then** I smoothly scroll to that section.
6. **Given** I am on a blog post detail page, **When** I want to return, **Then** I can navigate back to the blog listing page via a back button.

---

### Edge Cases

- What happens when no posts match the search query? Display empty state with message "No posts found matching your search."
- What happens when no posts exist for a topic? The topic filter button should not appear if no posts have that topic.
- What happens when a user combines search and topic filter? Both filters should work together (AND logic) - show posts matching both search term AND selected topic.
- How does the system handle very long post titles? Titles should be truncated with ellipsis after a reasonable length on cards.
- What happens on mobile devices? Layout should be fully responsive with single-column card grid and touch-friendly filter buttons.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a blog listing page at the /blog route.
- **FR-002**: System MUST show a hero section with page title "Blog" and a descriptive subtitle.
- **FR-003**: System MUST display blog posts in a responsive card grid layout.
- **FR-004**: Each blog card MUST display: post title, publication date, summary/excerpt (2-3 lines max), and topic tags.
- **FR-005**: System MUST provide topic filter buttons that show the count of posts per topic.
- **FR-006**: System MUST include an "All" filter option that displays all posts.
- **FR-007**: System MUST highlight the currently active filter button.
- **FR-008**: System MUST provide a search input field to filter posts by keyword.
- **FR-009**: Search MUST filter posts based on title and summary content.
- **FR-010**: System MUST support combining search and topic filters (AND logic).
- **FR-011**: Blog post cards MUST be clickable and navigate to the post detail page.
- **FR-012**: System MUST display an empty state message when no posts match the current filters.
- **FR-013**: System MUST follow the existing Rockship design system (dark theme, glass morphism, gradient text).
- **FR-014**: Blog post detail page MUST display full article content with proper typography.
- **FR-015**: Blog post detail page MUST show post metadata (title, date, topic tags).
- **FR-016**: Blog post detail page MUST use a two-column layout on desktop: main content (left) + "On This Page" sidebar (right).
- **FR-017**: Blog post detail page sidebar MUST be sticky and follow user scroll.
- **FR-018**: Blog post detail page sidebar MUST display navigation links to article sections.
- **FR-019**: Clicking sidebar section links MUST smooth scroll to the corresponding section.
- **FR-020**: Blog post detail page MUST collapse to single-column layout on mobile (sidebar hidden or inline).

### Key Entities

- **Blog Post**: Represents an individual blog article. Key attributes: title, slug (URL-friendly identifier), publication date, summary/excerpt, full content, topic tags.
- **Topic Tag**: Represents a category/tag for blog posts. Key attributes: name, slug, post count (computed).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can find and access any blog post within 3 clicks from the homepage.
- **SC-002**: Topic filtering provides results within 500ms of user interaction (no page reload).
- **SC-003**: Search provides results as user types (debounced, within 300ms after user stops typing).
- **SC-004**: Blog page achieves visual consistency score of 95%+ match with existing design system.
- **SC-005**: Page is fully accessible via keyboard navigation and screen readers.
- **SC-006**: Page renders correctly and is fully functional on all screen sizes (mobile, tablet, desktop).
- **SC-007**: 100% of blog post cards display all required information (title, date, excerpt, tags).

## Clarifications

### Session 2026-01-21

- Q: Should a Blog section be added to the landing page? → A: No, only add "Blog" link in header navigation after "About".
- Q: What layout should the blog detail page have? → A: Two-column layout with main content on left and "On This Page" sticky sidebar on right. Style should remain consistent with current Rockship system (dark theme, glass morphism).

## Scope Boundaries

### In Scope
- Blog listing page at /blog route
- Blog post detail pages at /blog/[slug] route
- Adding "Blog" link to header navigation (positioned after "About")
- Search and topic filtering functionality

### Out of Scope
- Blog section on the landing page (explicitly excluded)
- CMS or admin interface for managing posts
- Comments or user interactions on blog posts
- Newsletter subscription functionality

## Assumptions

- Blog posts will be stored as static data initially (markdown files or JSON data in the codebase).
- The existing navigation (Navbar) will be extended to include a "Blog" link, positioned after the "About" link.
- Topic tags will be derived from blog post metadata rather than managed separately.
- The design will follow the established Rockship dark theme with glass morphism effects, as documented in the existing design system.
- Smooth animations will use Framer Motion consistent with other pages in the application.
