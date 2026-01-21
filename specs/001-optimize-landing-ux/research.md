# Research: Tối Ưu Trải Nghiệm Landing Page

**Date**: 2026-01-21
**Branch**: `001-optimize-landing-ux`

## Executive Summary

Dự án đã có hệ thống animation tốt với Framer Motion và accessibility hooks. Research này xác định các quyết định kỹ thuật để mở rộng và chuẩn hóa hệ thống hiện có thay vì xây dựng lại.

---

## R1: Framer Motion vs GSAP Decision

### Decision: Framer Motion làm primary, GSAP chỉ cho 3D/complex sequences

### Rationale

| Library | Use Case | Performance | DX |
|---------|----------|-------------|-----|
| Framer Motion | UI animations, scroll-triggered, hover | Tốt, React-native | Excellent - declarative API |
| GSAP | Timeline sequences, ScrollTrigger, 3D | Tốt nhất cho complex | Good - imperative API |

**Analysis**:
- Codebase đã dùng Framer Motion cho FadeIn, FadeInStagger - pattern đã established
- GSAP chỉ dùng cho 3D components (Hero3D) - tránh mixing
- Framer Motion v12+ có `whileInView` API tốt, đủ cho scroll animations
- Không cần thêm dependency mới (GSAP ScrollTrigger) vì Framer Motion đủ dùng

### Alternatives Considered

1. **GSAP ScrollTrigger cho tất cả scroll animations**
   - Rejected: Mixing 2 animation libraries tăng complexity
   - Bundle size impact (~45KB GSAP + ~35KB Framer Motion)

2. **Chỉ dùng CSS animations**
   - Rejected: Thiếu flexibility cho stagger, accessibility hooks
   - Khó maintain consistent timing

---

## R2: Scroll Animation Strategy

### Decision: Enhance FadeIn component với thêm animation variants

### Rationale

**Current FadeIn capabilities**:
- ✅ Direction: up, down, left, right, none
- ✅ Delay, duration, distance
- ✅ Viewport trigger với `whileInView`
- ✅ Stagger support
- ✅ Reduced motion respect

**Gaps to fill**:
- ❌ Scale animations (zoom in/out)
- ❌ Rotate animations
- ❌ Blur-in effect (careful với performance)
- ❌ Exit animations khi scroll out (optional feature)

### Implementation Approach

Tạo centralized animation config thay vì hardcode trong FadeIn:

```typescript
// lib/animation-config.ts
export const animationConfig = {
  duration: {
    fast: 0.2,      // micro-interactions
    normal: 0.3,    // standard reveals
    slow: 0.5,      // hero/emphasis
  },
  easing: {
    smooth: [0.21, 0.45, 0.32, 0.9], // existing
    bounce: [0.68, -0.55, 0.265, 1.55],
    sharp: [0.4, 0, 0.2, 1],
  },
  distance: {
    small: 20,
    medium: 30,
    large: 50,
  }
}
```

### Alternatives Considered

1. **Separate ScrollReveal component**
   - Rejected: Duplicate code với FadeIn, confusion
   - Better to extend existing component

2. **GSAP ScrollTrigger**
   - Rejected: Overkill cho simple scroll animations
   - Framer Motion `whileInView` đủ dùng

---

## R3: Hover Effect Patterns

### Decision: CSS-first với Tailwind, Framer Motion cho complex cases

### Rationale

**Performance priority**: CSS hover > Framer Motion hover

| Approach | Performance | Complexity | Use Case |
|----------|-------------|------------|----------|
| Tailwind CSS | Best (GPU) | Simple | scale, shadow, color |
| Framer Motion | Good | Medium | spring physics, gesture |
| Custom hook | Varies | Complex | mouse tracking (SpotlightCard) |

**Standard hover patterns** (CSS-first):
```css
/* Button hover - 200ms */
.btn-hover {
  @apply transition-all duration-200
         hover:scale-[1.02] hover:shadow-lg;
}

/* Card hover - 300ms lift effect */
.card-hover {
  @apply transition-all duration-300
         hover:-translate-y-1 hover:shadow-xl;
}
```

### Implementation Approach

1. **Create reusable hover classes** trong globals.css
2. **HoverLift component** (wrapper) cho consistent card effects
3. **Giữ SpotlightCard** pattern cho premium cards

### Alternatives Considered

1. **Framer Motion `whileHover` cho tất cả**
   - Rejected: Overkill, CSS đủ cho simple hovers
   - Reserve Framer Motion cho spring physics

---

## R4: Smooth Scroll Implementation

### Decision: CSS scroll-behavior: smooth + JS fallback

### Rationale

**Current state**: `scroll-behavior: auto` trong globals.css

**Browser support for CSS smooth scroll**: 95%+ (2024 data)

| Approach | Performance | Accessibility | Support |
|----------|-------------|---------------|---------|
| CSS scroll-behavior | Best | Good | 95%+ |
| Lenis/Locomotive | Medium | Issues | 100% |
| scrollIntoView API | Good | Good | 97%+ |

### Implementation

```css
/* globals.css - update */
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

**JS enhancement** cho navigation clicks:

```typescript
// hooks/useSmoothScroll.ts
export const useSmoothScroll = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return { scrollTo };
};
```

### Alternatives Considered

1. **Lenis smooth scroll library**
   - Rejected: Adds 15KB, accessibility concerns
   - Known issues with keyboard navigation, screen readers

2. **GSAP ScrollToPlugin**
   - Rejected: Already have GSAP but don't need extra plugin
   - Native CSS + JS sufficient

---

## R5: Loading States & Skeleton Patterns

### Decision: shadcn/ui Skeleton + custom shimmer effect

### Rationale

**Existing assets**:
- shimmer keyframe đã có trong globals.css
- Dự án đã dùng shadcn/ui pattern

**Skeleton types needed**:
1. **Text skeleton** - single line shimmer
2. **Card skeleton** - placeholder for cards
3. **Image skeleton** - aspect-ratio preserving
4. **Section skeleton** - full section placeholder

### Implementation

```typescript
// components/ui/skeleton.tsx (shadcn pattern)
export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-rockship-800",
        className
      )}
      {...props}
    />
  )
}

// Shimmer variant (uses existing keyframe)
export function SkeletonShimmer({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-rockship-800",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-rockship-700/50 before:to-transparent",
        "before:animate-shimmer",
        className
      )}
      {...props}
    />
  )
}
```

### Alternatives Considered

1. **Framer Motion skeleton**
   - Rejected: CSS shimmer performs better
   - Framer not needed for loading states

2. **Content-aware skeletons**
   - Rejected: Over-engineering
   - Simple shapes sufficient for landing page

---

## R6: Mobile Optimization Strategy

### Decision: Progressive degradation với feature detection

### Rationale

**Current patterns in codebase** (from Sparkles, Hero3D):
- Disable 3D on mobile (< 768px)
- Reduce particle count to 15%
- Lower FPS (30 vs 60)
- Disable complex mouse effects

**Animation optimization tiers**:

| Tier | Device | Animations |
|------|--------|------------|
| High | Desktop | Full effects, 60fps, spotlight |
| Medium | Tablet | Reduced particles, no spotlight |
| Low | Mobile | Minimal, 30fps, CSS-only hovers |

### Implementation

```typescript
// hooks/useAnimationTier.ts
type AnimationTier = 'high' | 'medium' | 'low';

export const useAnimationTier = (): AnimationTier => {
  const [tier, setTier] = useState<AnimationTier>('high');

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 768) setTier('low');
    else if (width < 1024) setTier('medium');
    else setTier('high');
  }, []);

  return tier;
};
```

### Alternatives Considered

1. **Same animations everywhere**
   - Rejected: Performance issues on mobile
   - Battery drain concerns

2. **User-selectable quality**
   - Rejected: Over-engineering for landing page
   - Auto-detection sufficient

---

## Summary of Decisions

| Topic | Decision | Confidence |
|-------|----------|------------|
| Animation library | Framer Motion primary, GSAP for 3D only | High |
| Scroll animations | Enhance FadeIn, centralized config | High |
| Hover effects | CSS-first, Tailwind utilities | High |
| Smooth scroll | CSS scroll-behavior + JS fallback | High |
| Loading states | shadcn Skeleton + shimmer | High |
| Mobile optimization | 3-tier progressive degradation | High |

---

## Next Steps (Phase 1)

1. Create `lib/animation-config.ts` with centralized timing
2. Extend `FadeIn` component with new variants
3. Create `components/ui/skeleton.tsx`
4. Add smooth scroll CSS + hook
5. Create hover utility classes
6. Document in `quickstart.md`
