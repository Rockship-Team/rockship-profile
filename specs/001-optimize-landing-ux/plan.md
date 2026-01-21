# Implementation Plan: Tối Ưu Trải Nghiệm Landing Page

**Branch**: `001-optimize-landing-ux` | **Date**: 2026-01-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-optimize-landing-ux/spec.md`

## Summary

Tối ưu trải nghiệm người dùng trên landing page bằng cách cải thiện và mở rộng hệ thống animation hiện có. Dự án đã có nền tảng animation mạnh với Framer Motion và GSAP, cùng với các hooks accessibility như `useReducedMotion`. Mục tiêu là:
1. Chuẩn hóa và mở rộng FadeIn component để hỗ trợ nhiều kiểu animation hơn
2. Thêm hover effects nhất quán cho tất cả interactive elements
3. Cải thiện smooth scrolling navigation
4. Thêm loading states/skeleton screens

## Technical Context

**Language/Version**: TypeScript 5.x với React 19, Next.js 16
**Primary Dependencies**:
- Framer Motion v12.23.25 (UI animations)
- GSAP v3.14.1 + @gsap/react (complex sequences)
- React Three Fiber + Three.js (3D - out of scope)
- tsParticles (particle effects)
- Tailwind CSS v4 (styling)

**Storage**: N/A (không có data persistence)
**Testing**: Manual testing theo Constitution (visual, mobile, accessibility)
**Target Platform**: Web (Chrome, Firefox, Safari, Edge latest)
**Project Type**: Web application (Next.js App Router)
**Performance Goals**: 60fps desktop, 30+ fps mobile, LCP < 2.5s
**Constraints**:
- prefers-reduced-motion compliance
- Mobile-first approach
- GPU-accelerated properties only (transform, opacity)
- Progressive enhancement (JS disabled fallback)

**Scale/Scope**: Single landing page enhancement

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Requirement | Status | Notes |
|-----------|-------------|--------|-------|
| **I. Code Quality First** | TypeScript strict, components in proper folders, cn() utility, ESLint pass | ✅ PASS | All new components will follow existing patterns |
| **II. Testing Standards** | Visual testing on desktop/mobile, animation testing with prefers-reduced-motion, build pass, Lighthouse 90+ | ✅ PASS | Manual testing required for each animation |
| **III. UX Consistency** | Respect prefers-reduced-motion, focus states, consistent timing (200ms micro, 300-500ms reveals), loading states | ✅ PASS | Existing hooks (useReducedMotion) support this |
| **IV. Performance** | FCP < 1.8s, LCP < 2.5s, CLS < 0.1, 60fps desktop, 30fps mobile, GPU-accelerated properties only | ✅ PASS | Only transform/opacity animations |

**Pre-Design Gate**: ✅ PASSED - No violations detected

## Project Structure

### Documentation (this feature)

```text
specs/001-optimize-landing-ux/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (animation configs)
├── quickstart.md        # Phase 1 output
├── contracts/           # N/A (no API for this feature)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
components/
├── landing/           # Landing page sections (existing)
│   ├── Hero.tsx       # ✅ Already has FadeIn animations
│   ├── Solutions.tsx  # ✅ Has SpotlightCard hover effects
│   ├── CaseStudies.tsx
│   ├── Clients.tsx
│   ├── Company.tsx
│   └── ...
├── FadeIn.tsx         # ✅ Primary animation component (to enhance)
├── Sparkles.tsx       # ✅ Particle effects (existing)
├── ui/                # shadcn/ui components
│   └── skeleton.tsx   # To create for loading states
└── animations/        # New folder for animation utilities
    ├── variants.ts    # Animation variant configs
    ├── ScrollReveal.tsx  # Scroll-triggered wrapper
    └── HoverLift.tsx  # Consistent hover effect wrapper

hooks/
├── useReducedMotion.ts      # ✅ Existing - accessibility
├── useIntersectionObserver.ts # ✅ Existing - scroll detection
└── useSmoothScroll.ts       # New - smooth navigation

lib/
└── animation-config.ts      # Centralized animation timing/easing
```

**Structure Decision**: Extend existing component structure. New animation utilities go in `components/animations/`. Centralized config in `lib/animation-config.ts`.

## Complexity Tracking

> No violations detected. No complexity justifications needed.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |

---

## Phase 0: Outline & Research

### Research Tasks

Based on Technical Context, the following research is needed:

1. **Framer Motion Best Practices for Scroll Animations**
   - Current FadeIn uses `whileInView` - evaluate if this is optimal
   - Research stagger animations for child elements
   - Research exit animations for scroll-up scenarios

2. **GSAP vs Framer Motion Decision**
   - When to use GSAP vs Framer Motion
   - Best practices for mixing both libraries
   - Performance implications

3. **Skeleton/Loading State Patterns**
   - Best practices for Next.js loading states
   - shadcn/ui skeleton component patterns
   - Shimmer vs pulse animations

4. **Smooth Scroll Implementation**
   - Native CSS scroll-behavior vs JavaScript
   - Lenis/Locomotive vs native solutions
   - Accessibility considerations

5. **Hover Effect Patterns**
   - GPU-accelerated hover effects
   - Mobile touch feedback equivalents
   - Consistent timing across components

### Research Output Location
See: [research.md](./research.md)
