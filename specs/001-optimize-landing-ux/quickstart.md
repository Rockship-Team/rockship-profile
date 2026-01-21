# Quickstart: Tối Ưu Trải Nghiệm Landing Page

**Branch**: `001-optimize-landing-ux`
**Date**: 2026-01-21

## Prerequisites

- Node.js 18+
- pnpm installed (`npm install -g pnpm`)
- Project cloned và dependencies installed

## Setup

```bash
# Clone và checkout branch
git checkout 001-optimize-landing-ux

# Install dependencies (nếu chưa)
pnpm install

# Start dev server
pnpm dev
```

Dev server chạy tại http://localhost:3000

---

## Kiểm Tra Animation Hiện Tại

### FadeIn Component

```tsx
import { FadeIn, FadeInStagger } from '@/components/FadeIn';

// Basic usage
<FadeIn>
  <h1>Heading fades in</h1>
</FadeIn>

// With options
<FadeIn
  delay={200}           // ms before animation
  duration={0.5}        // animation duration in seconds
  direction="up"        // up | down | left | right | none
  distance={30}         // pixels to travel
>
  <Content />
</FadeIn>

// Stagger children
<FadeInStagger delay={0} stagger={0.1}>
  <FadeIn><Item1 /></FadeIn>
  <FadeIn><Item2 /></FadeIn>
  <FadeIn><Item3 /></FadeIn>
</FadeInStagger>
```

### Accessibility Testing

```bash
# Open Chrome DevTools > Rendering > Emulate CSS media features
# Set "prefers-reduced-motion" to "reduce"
# Verify animations are disabled/minimal
```

---

## File Structure

```
components/
├── FadeIn.tsx              # Primary animation wrapper
├── landing/
│   ├── Hero.tsx            # Uses FadeIn with stagger
│   └── Solutions.tsx       # Uses SpotlightCard
├── ui/
│   └── skeleton.tsx        # [NEW] Loading states
└── animations/             # [NEW] Animation utilities
    └── variants.ts         # Animation presets

hooks/
├── useReducedMotion.ts     # Accessibility hook
├── useIntersectionObserver.ts
├── useAnimationTier.ts     # [NEW] Device-based quality
└── useSmoothScroll.ts      # [NEW] Smooth navigation

lib/
├── utils.ts                # cn() utility
└── animation-config.ts     # [NEW] Centralized timing
```

---

## Key Patterns

### 1. Scroll-Triggered Animations

```tsx
// FadeIn auto-triggers on viewport entry
<FadeIn viewTrigger={true}>
  <Section />
</FadeIn>
```

### 2. Hover Effects (Tailwind)

```tsx
// Lift effect for cards
<div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  Card content
</div>

// Scale effect for buttons
<button className="transition-transform duration-200 hover:scale-[1.02]">
  Button
</button>
```

### 3. Smooth Scroll

```tsx
// In Navbar or any navigation
const { scrollTo } = useSmoothScroll();

<button onClick={() => scrollTo('solutions')}>
  Go to Solutions
</button>
```

### 4. Loading States

```tsx
import { Skeleton, SkeletonShimmer } from '@/components/ui/skeleton';

// While loading
<Skeleton className="h-10 w-3/4" />

// Shimmer variant
<SkeletonShimmer className="h-40 w-full rounded-lg" />
```

---

## Testing Checklist

### Manual Testing

- [ ] **Desktop Chrome**: All animations smooth at 60fps
- [ ] **Desktop Firefox**: All animations work
- [ ] **Desktop Safari**: All animations work
- [ ] **Mobile Safari (iOS)**: 30fps minimum, no lag
- [ ] **Mobile Chrome (Android)**: 30fps minimum
- [ ] **Reduced motion**: Animations disabled/minimal

### Performance Testing

```bash
# Run Lighthouse audit
# DevTools > Lighthouse > Generate report

# Targets:
# - Performance: 90+
# - Accessibility: 100
# - Best Practices: 95+
```

### Accessibility Testing

1. Enable "prefers-reduced-motion: reduce" in OS settings
2. Navigate landing page
3. Verify: No unnecessary motion, content still visible

---

## Common Issues

### Animation not triggering

```tsx
// Ensure viewTrigger is true (default)
<FadeIn viewTrigger={true}>
  <Content />
</FadeIn>

// Check viewport margin - element might be out of trigger zone
// Default is -50px
```

### Hover effect not working

```tsx
// Use Tailwind transition utilities
<div className="transition-all duration-300 hover:...">

// NOT just the hover state
<div className="hover:...">  // Missing transition!
```

### Scroll not smooth

```css
/* Ensure globals.css has: */
html {
  scroll-behavior: smooth;
}
```

---

## Build & Deploy

```bash
# Build for production
pnpm build

# If build fails, check for:
# - TypeScript errors
# - ESLint warnings
# - Undefined CSS classes

# Run production build locally
pnpm start
```

---

## Documentation

- [Feature Spec](./spec.md) - User requirements
- [Implementation Plan](./plan.md) - Technical approach
- [Research](./research.md) - Design decisions
- [Data Model](./data-model.md) - Animation configurations
- [Constitution](/.specify/memory/constitution.md) - Quality standards
