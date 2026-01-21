# Data Model: Animation Configuration

**Date**: 2026-01-21
**Branch**: `001-optimize-landing-ux`

## Overview

Feature này không có database entities truyền thống. Thay vào đó, "data model" là cấu hình cho animation system - các constants và types được sử dụng xuyên suốt components.

---

## Animation Configuration Entity

### AnimationConfig

Centralized configuration cho tất cả animations trong landing page.

```typescript
// lib/animation-config.ts

export interface AnimationConfig {
  duration: {
    fast: number;      // 0.2s - micro-interactions (hover, focus)
    normal: number;    // 0.3s - standard transitions
    slow: number;      // 0.5s - emphasis reveals (hero, headers)
  };
  easing: {
    smooth: number[];  // Custom cubic-bezier for smooth animations
    bounce: number[];  // Overshoot effect
    sharp: number[];   // Snappy transitions
  };
  distance: {
    small: number;     // 20px - subtle movements
    medium: number;    // 30px - default
    large: number;     // 50px - dramatic reveals
  };
  stagger: {
    fast: number;      // 0.05s between children
    normal: number;    // 0.1s between children
    slow: number;      // 0.15s between children
  };
}
```

### AnimationTier

Device-based animation quality levels.

```typescript
export type AnimationTier = 'high' | 'medium' | 'low';

export interface TierConfig {
  tier: AnimationTier;
  fps: number;           // Target frame rate
  enableSpotlight: boolean;
  enableParticles: boolean;
  particleDensity: number; // 0-1 multiplier
}

// Tier configurations
export const tierConfigs: Record<AnimationTier, TierConfig> = {
  high: {
    tier: 'high',
    fps: 60,
    enableSpotlight: true,
    enableParticles: true,
    particleDensity: 1.0,
  },
  medium: {
    tier: 'medium',
    fps: 45,
    enableSpotlight: false,
    enableParticles: true,
    particleDensity: 0.5,
  },
  low: {
    tier: 'low',
    fps: 30,
    enableSpotlight: false,
    enableParticles: false,
    particleDensity: 0,
  },
};
```

---

## FadeIn Component Props

### FadeInProps (Enhanced)

Extended interface for FadeIn component.

```typescript
export interface FadeInProps {
  children: ReactNode;
  className?: string;

  // Timing
  delay?: number;           // ms - default 0
  duration?: number;        // seconds - default 0.5

  // Direction & movement
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;        // pixels - default 30

  // Scale (NEW)
  scale?: number;           // starting scale - e.g., 0.95 for zoom-in

  // Trigger options
  viewTrigger?: boolean;    // default true
  viewportMargin?: string;  // default "-50px"
  once?: boolean;           // default true - animate once or every view

  // Children animation
  staggerChildren?: number; // seconds between children
}
```

---

## Skeleton Component Props

### SkeletonProps

```typescript
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'shimmer';
  width?: string | number;
  height?: string | number;
}
```

### Skeleton Presets

Common skeleton patterns cho landing page:

```typescript
export const skeletonPresets = {
  // Text skeletons
  heading: { height: 40, width: '60%' },
  subheading: { height: 24, width: '80%' },
  paragraph: { height: 16, width: '100%' },

  // Card skeletons
  cardImage: { height: 200, width: '100%' },
  cardTitle: { height: 24, width: '70%' },
  cardDescription: { height: 16, width: '90%' },

  // Avatar/icon
  avatar: { height: 48, width: 48, borderRadius: '50%' },
  icon: { height: 24, width: 24 },
};
```

---

## Hover Effect Types

### HoverVariant

Standard hover effect configurations.

```typescript
export type HoverVariant = 'lift' | 'glow' | 'scale' | 'spotlight';

export interface HoverConfig {
  variant: HoverVariant;
  duration: number;         // transition duration in ms
  intensity: 'subtle' | 'normal' | 'strong';
}

export const hoverPresets: Record<HoverVariant, string> = {
  lift: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  glow: 'transition-all duration-200 hover:shadow-[0_0_20px_-5px_var(--color-rockship-accent)]',
  scale: 'transition-transform duration-200 hover:scale-[1.02]',
  spotlight: 'spotlight-card', // Custom class with mouse tracking
};
```

---

## State Transitions

### Animation States

```
┌──────────┐     viewport enter      ┌──────────┐
│  Hidden  │ ────────────────────────►│ Visible  │
│ (initial)│                          │(animated)│
└──────────┘                          └──────────┘
     ▲                                      │
     │        viewport exit (if once=false) │
     └──────────────────────────────────────┘
```

### Loading States

```
┌──────────┐      data ready       ┌──────────┐
│ Skeleton │ ──────────────────────►│ Content  │
│ (loading)│      fade transition   │(rendered)│
└──────────┘                        └──────────┘
```

---

## Validation Rules

| Config | Valid Range | Default | Notes |
|--------|-------------|---------|-------|
| duration.fast | 0.1 - 0.3s | 0.2s | Micro-interactions |
| duration.normal | 0.2 - 0.5s | 0.3s | Standard |
| duration.slow | 0.4 - 0.8s | 0.5s | Hero reveals |
| distance | 10 - 100px | 30px | Larger = more dramatic |
| scale | 0.8 - 1.0 | 0.95 | Starting scale for zoom-in |
| stagger | 0.03 - 0.2s | 0.1s | Between children |

---

## Relationships

```
AnimationConfig
    │
    ├── FadeIn (uses duration, easing, distance)
    │
    ├── HoverEffect (uses duration)
    │
    └── Skeleton (uses shimmer timing)

AnimationTier
    │
    ├── Sparkles (particleDensity)
    │
    ├── SpotlightCard (enableSpotlight)
    │
    └── Hero3D (fps, quality)
```

---

## File Locations

| Entity | File Path |
|--------|-----------|
| AnimationConfig | `lib/animation-config.ts` |
| FadeIn (enhanced) | `components/FadeIn.tsx` |
| Skeleton | `components/ui/skeleton.tsx` |
| Hover utilities | `app/globals.css` |
| useAnimationTier | `hooks/useAnimationTier.ts` |
| useSmoothScroll | `hooks/useSmoothScroll.ts` |
