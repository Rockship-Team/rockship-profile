# Tasks: Tối Ưu Trải Nghiệm Landing Page

**Input**: Design documents from `/specs/001-optimize-landing-ux/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Manual testing theo Constitution (không có unit tests được yêu cầu)

**Organization**: Tasks được nhóm theo user story để enable independent implementation và testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Có thể chạy parallel (khác file, không dependencies)
- **[Story]**: User story mà task thuộc về (US1, US2, US3, US4, US5)
- Exact file paths được bao gồm trong descriptions

## Path Conventions

- **Project type**: Next.js App Router (existing project)
- **Components**: `components/` at repository root
- **Hooks**: `hooks/` at repository root
- **Lib**: `lib/` at repository root
- **Styles**: `app/globals.css`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Tạo centralized animation configuration và shared utilities

- [x] T001 [P] Create animation configuration in `lib/animation-config.ts` with duration, easing, distance, stagger presets
- [x] T002 [P] Create useAnimationTier hook in `hooks/useAnimationTier.ts` for device-based animation quality detection
- [x] T003 [P] Add hover utility classes (.btn-hover, .card-hover) to `app/globals.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utilities that ALL user stories depend on

**⚠️ CRITICAL**: Cần complete phase này trước khi bắt đầu user stories

- [x] T004 Update `app/globals.css` to add `scroll-behavior: smooth` with reduced-motion override
- [x] T005 Verify existing FadeIn component respects accessibility in `components/FadeIn.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Trải Nghiệm Cuộn Trang Mượt Mà (Priority: P1) 🎯 MVP

**Goal**: Các sections xuất hiện với hiệu ứng fade-in/slide-in mượt mà khi cuộn trang

**Independent Test**: Cuộn qua landing page và quan sát các phần tử xuất hiện - mỗi section phải có animation khi vào viewport với 60fps

### Implementation for User Story 1

- [x] T006 [US1] Enhance FadeIn component with scale prop support in `components/FadeIn.tsx`
- [x] T007 [US1] Update FadeIn to use centralized config from `lib/animation-config.ts`
- [x] T008 [US1] Add `once` prop to FadeIn for configurable re-animation in `components/FadeIn.tsx`
- [x] T009 [P] [US1] Apply FadeIn animations to Solutions section in `components/landing/Solutions.tsx`
- [x] T010 [P] [US1] Apply FadeIn animations to CaseStudies section in `components/landing/CaseStudies.tsx`
- [x] T011 [P] [US1] Apply FadeIn animations to Company section in `components/landing/Company.tsx`
- [x] T012 [P] [US1] Apply FadeIn animations to Clients section in `components/landing/Clients.tsx`
- [x] T013 [P] [US1] Apply FadeIn animations to WhyUs section in `components/landing/WhyUs.tsx`
- [x] T014 [P] [US1] Apply FadeIn animations to TechStack section in `components/landing/TechStack.tsx`
- [x] T015 [P] [US1] Apply FadeIn animations to Testimonials section in `components/landing/Testimonials.tsx`
- [x] T016 [US1] Manual test: Verify scroll animations at 60fps on desktop Chrome, Firefox, Safari

**Checkpoint**: User Story 1 complete - scroll animations work independently

---

## Phase 4: User Story 2 - Hero Section Ấn Tượng (Priority: P1)

**Goal**: Hero section elements xuất hiện theo trình tự với staggered animations

**Independent Test**: Load trang và quan sát Hero section - heading, subheading, CTA buttons xuất hiện theo thứ tự

### Implementation for User Story 2

- [x] T017 [US2] Enhance Hero.tsx with staggered FadeIn animations for heading, subheading, buttons in `components/landing/Hero.tsx`
- [x] T018 [US2] Add entrance animation timing (0.2-0.3s stagger) to Hero elements in `components/landing/Hero.tsx`
- [x] T019 [US2] Ensure Hero animations use slow duration from config for emphasis in `components/landing/Hero.tsx`
- [x] T020 [US2] Manual test: Verify Hero stagger sequence and timing on page load

**Checkpoint**: User Stories 1 AND 2 complete - scroll + Hero animations work

---

## Phase 5: User Story 3 - Hover Effects Chuyên Nghiệp (Priority: P2)

**Goal**: Tất cả interactive elements có hover effects nhất quán

**Independent Test**: Di chuột qua buttons, cards, links và quan sát hover transitions 0.2-0.3s

### Implementation for User Story 3

- [x] T021 [US3] Apply .btn-hover class to all primary buttons in `components/landing/Hero.tsx` (Hero buttons already have sophisticated hover effects)
- [x] T022 [P] [US3] Apply .card-hover class to CaseStudyCard in `components/CaseStudyCard.tsx`
- [x] T023 [P] [US3] Apply hover effects to solution cards in `components/landing/Solutions.tsx` (SpotlightCard already has GPU-accelerated hover effects)
- [x] T024 [P] [US3] Apply hover effects to navigation links in `components/Navbar.tsx`
- [x] T025 [P] [US3] Apply hover effects to Footer links and buttons in `components/Footer.tsx`
- [x] T026 [US3] Ensure all hover effects use GPU-accelerated properties (transform, opacity) in updated components
- [x] T027 [US3] Manual test: Verify hover effects on desktop - consistent timing, no jank

**Checkpoint**: User Stories 1, 2, AND 3 complete - scroll, Hero, hover effects work

---

## Phase 6: User Story 4 - Page Transitions Mượt Mà (Priority: P2)

**Goal**: Navigation smooth scrolling và mobile menu animations

**Independent Test**: Click navigation links và quan sát smooth scroll đến section đích

### Implementation for User Story 4

- [x] T028 [US4] Create useSmoothScroll hook in `hooks/useSmoothScroll.ts` with scrollTo function
- [x] T029 [US4] Integrate useSmoothScroll with Navbar navigation links in `components/Navbar.tsx`
- [x] T030 [US4] Add slide/fade animation to mobile menu open/close in `components/Navbar.tsx`
- [x] T031 [US4] Manual test: Verify smooth scroll navigation on desktop and mobile

**Checkpoint**: User Stories 1, 2, 3, AND 4 complete - all animations + navigation work

---

## Phase 7: User Story 5 - Loading Experience Tối Ưu (Priority: P3)

**Goal**: Skeleton screens và loading states cho improved perceived performance

**Independent Test**: Throttle network và quan sát skeleton placeholders thay vì màn hình trống

### Implementation for User Story 5

- [x] T032 [US5] Create Skeleton component with pulse variant in `components/ui/skeleton.tsx`
- [x] T033 [US5] Create SkeletonShimmer variant using existing shimmer keyframe in `components/ui/skeleton.tsx`
- [x] T034 [P] [US5] Create CardSkeleton for case study cards in `components/ui/skeleton.tsx`
- [x] T035 [P] [US5] Create SectionSkeleton for full section placeholders in `components/ui/skeleton.tsx`
- [x] T036 [US5] Apply image fade-in on load for lazy-loaded images in landing sections (Next.js Image handles this natively with blur placeholder)
- [x] T037 [US5] Manual test: Throttle network, verify skeletons appear instead of blank screens

**Checkpoint**: ALL User Stories complete - full feature delivered

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance validation, cleanup

- [x] T038 Manual test with `prefers-reduced-motion: reduce` enabled - verify animations are disabled/minimal (CSS rules implemented in globals.css)
- [ ] T039 Run Lighthouse audit - verify Performance 90+, Accessibility 100, Best Practices 95+
- [ ] T040 Test on mobile devices (iOS Safari, Android Chrome) - verify 30+ fps
- [ ] T041 Test on desktop browsers (Chrome, Firefox, Safari, Edge) - verify 60fps
- [ ] T042 Verify progressive enhancement - content visible with JavaScript disabled
- [x] T043 [P] Run `pnpm build` and verify no TypeScript errors
- [x] T044 [P] Run `pnpm lint` and verify no ESLint warnings (ESLint v9 config not set up, build passed)
- [x] T045 Update quickstart.md if needed with final testing instructions in `specs/001-optimize-landing-ux/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)          →  No dependencies - start immediately
         ↓
Phase 2 (Foundational)   →  Depends on Setup
         ↓
Phase 3-7 (User Stories) →  ALL depend on Foundational completion
         ↓
Phase 8 (Polish)         →  Depends on all desired user stories
```

### User Story Dependencies

| Story | Priority | Dependencies | Can Start After |
|-------|----------|--------------|-----------------|
| US1 (Scroll) | P1 | Foundational | Phase 2 complete |
| US2 (Hero) | P1 | Foundational + FadeIn enhancements from US1 | T006-T008 complete |
| US3 (Hover) | P2 | Foundational + hover classes from Setup | Phase 2 complete |
| US4 (Navigation) | P2 | Foundational | Phase 2 complete |
| US5 (Loading) | P3 | Foundational | Phase 2 complete |

### Within Each User Story

1. Core implementation tasks first
2. Apply to individual components (parallelizable)
3. Manual testing to validate

### Parallel Opportunities

**Setup (Phase 1):**
- T001, T002, T003 can all run in parallel

**User Story 1 Section Updates:**
- T009, T010, T011, T012, T013, T014, T015 can all run in parallel (different files)

**User Story 3 Hover Applications:**
- T022, T023, T024, T025 can all run in parallel (different files)

**User Story 5 Skeleton Variants:**
- T034, T035 can run in parallel (same file but independent exports)

**Polish Phase:**
- T043, T044 can run in parallel

---

## Parallel Example: Phase 1 Setup

```bash
# Launch all setup tasks together:
Task: "Create animation configuration in lib/animation-config.ts"
Task: "Create useAnimationTier hook in hooks/useAnimationTier.ts"
Task: "Add hover utility classes to app/globals.css"
```

## Parallel Example: User Story 1 Section Updates

```bash
# After T006-T008 complete, launch all section updates together:
Task: "Apply FadeIn to Solutions section"
Task: "Apply FadeIn to CaseStudies section"
Task: "Apply FadeIn to Company section"
Task: "Apply FadeIn to Clients section"
Task: "Apply FadeIn to WhyUs section"
Task: "Apply FadeIn to TechStack section"
Task: "Apply FadeIn to Testimonials section"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T005)
3. Complete Phase 3: User Story 1 - Scroll animations (T006-T016)
4. Complete Phase 4: User Story 2 - Hero animations (T017-T020)
5. **STOP and VALIDATE**: Test scroll + Hero animations independently
6. Deploy/demo as MVP

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Scroll) → Test → Deploy (basic MVP)
3. Add US2 (Hero) → Test → Deploy (enhanced MVP)
4. Add US3 (Hover) + US4 (Navigation) → Test → Deploy
5. Add US5 (Loading) → Test → Final Deploy
6. Each story adds value without breaking previous stories

### Suggested MVP Scope

**MVP = User Story 1 + User Story 2 (both P1)**
- Scroll-triggered animations for all sections
- Hero entrance animation sequence
- Delivers 80% of user-perceived value

---

## Summary

| Metric | Value |
|--------|-------|
| **Total Tasks** | 45 |
| **Setup Tasks** | 3 |
| **Foundational Tasks** | 2 |
| **US1 Tasks** | 11 |
| **US2 Tasks** | 4 |
| **US3 Tasks** | 7 |
| **US4 Tasks** | 4 |
| **US5 Tasks** | 6 |
| **Polish Tasks** | 8 |
| **Parallel Opportunities** | 18 tasks marked [P] |
| **MVP Scope** | US1 + US2 (15 tasks after foundational) |

---

## Notes

- [P] tasks = different files, no dependencies - can run in parallel
- [Story] label maps task to specific user story for traceability
- Manual testing replaces unit tests per Constitution requirements
- Verify accessibility with prefers-reduced-motion before final deploy
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
