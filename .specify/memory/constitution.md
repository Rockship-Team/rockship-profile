<!--
=============================================================================
SYNC IMPACT REPORT
=============================================================================
Version change: 0.0.0 → 1.0.0 (MAJOR - initial constitution establishment)

Modified principles:
- N/A (initial version)

Added sections:
- Core Principles (4 principles: Code Quality, Testing Standards, UX Consistency, Performance)
- Development Standards (code organization, styling, tooling)
- Quality Gates (PR review requirements, automated checks)
- Governance (amendment process, versioning, compliance)

Removed sections:
- N/A (initial version)

Templates requiring updates:
- .specify/templates/plan-template.md - ✅ No updates required (Constitution Check section exists)
- .specify/templates/spec-template.md - ✅ No updates required (compatible structure)
- .specify/templates/tasks-template.md - ✅ No updates required (phase structure supports principles)

Follow-up TODOs:
- None

=============================================================================
-->

# Rockship AI Solutions Showcase Constitution

## Core Principles

### I. Code Quality First

All code MUST adhere to strict quality standards that ensure maintainability, readability, and correctness.

**Non-Negotiable Rules:**
- TypeScript strict mode MUST be enabled; no `any` types without explicit justification
- All components MUST be written in the designated folders per CLAUDE.md conventions:
  - Components in `components/`
  - Pages in `app/`
  - API routes in `api/`
  - Server actions in `actions/`
  - Types in `types/`
- Use `cn()` utility for className composition; string concatenation for classNames is prohibited
- All CSS classes MUST be defined before use; undefined classes cause build failures
- ESLint MUST pass with zero warnings before merge
- Dead code MUST be removed, not commented out

**Rationale:** A showcase application represents Rockship AI's engineering standards. Poor code quality directly undermines credibility with potential clients evaluating technical capability.

---

### II. Testing Standards

Testing MUST validate functionality at appropriate levels while respecting project scope.

**Non-Negotiable Rules:**
- Visual components MUST be manually tested on:
  - Desktop (Chrome, Firefox, Safari)
  - Mobile devices (iOS Safari, Android Chrome)
  - Different viewport sizes (320px, 768px, 1024px, 1440px)
- 3D components MUST be tested for:
  - WebGL availability and fallback behavior
  - Quality level transitions (Shift+Q)
  - Memory disposal on unmount
- Animation components MUST be tested with:
  - `prefers-reduced-motion: reduce` enabled
  - Intersection observer triggers
- Build MUST complete without errors: `pnpm build`
- Lighthouse audits MUST achieve:
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 95+

**Rationale:** As a showcase, the application MUST work flawlessly across all target platforms. Testing ensures quality without mandating unit test coverage for a presentation-focused application.

---

### III. User Experience Consistency

User interactions MUST be consistent, accessible, and polished across all touchpoints.

**Non-Negotiable Rules:**
- All animations MUST respect `prefers-reduced-motion` preference
- All interactive elements MUST have visible focus states
- Glass morphism effects MUST use consistent parameters:
  - Background: `rgba(11, 16, 27, 0.6)` or `bg-rockship-900/60`
  - Blur: `backdrop-blur-md` (12px)
  - Border: `border-white/8` to `border-white/10`
- Color palette MUST use defined theme colors only (no hardcoded hex values outside `@theme`)
- Loading states MUST be provided for async operations
- Error states MUST be user-friendly with clear recovery actions
- Transitions MUST use consistent timing: 200ms for micro-interactions, 300-500ms for reveals

**Rationale:** Inconsistent UX erodes user trust and contradicts the "polished solutions" brand promise. Accessibility is non-negotiable for legal compliance and inclusive design.

---

### IV. Performance Requirements

The application MUST deliver exceptional performance across all device classes.

**Non-Negotiable Rules:**
- Core Web Vitals targets:
  - First Contentful Paint (FCP): < 1.8s
  - Largest Contentful Paint (LCP): < 2.5s
  - Cumulative Layout Shift (CLS): < 0.1
  - First Input Delay (FID): < 100ms
- Frame rate targets:
  - Desktop: 60 FPS stable
  - Mobile: 30+ FPS minimum
- 3D rendering MUST implement adaptive quality based on device capability
- Heavy components MUST be lazy-loaded with `next/dynamic`
- Images MUST use Next.js Image component with appropriate sizing
- GPU-accelerated properties MUST be used for animations (`transform`, `opacity` only)
- Three.js materials and geometries MUST be disposed on component unmount
- Pixel ratio MUST be capped at 2.0 to prevent excessive GPU load

**Rationale:** A slow showcase loses prospects before they engage with content. Performance directly impacts conversion and reflects engineering capability.

---

## Development Standards

### Code Organization

| Artifact Type | Location | Notes |
|--------------|----------|-------|
| React Components | `components/` | Reusable UI elements |
| Page Components | `app/` | Next.js App Router pages |
| API Routes | `api/` | Backend endpoints |
| Server Actions | `actions/` | Server-side mutations |
| Type Definitions | `types/` | Shared TypeScript types |
| Documentation | `docs/` | Technical documentation |
| Hooks | `hooks/` | Custom React hooks |
| Utilities | `lib/` | Shared utility functions |

### Styling Standards

- Tailwind CSS v4 MUST be used for all styling
- Custom CSS MUST be minimized; prefer Tailwind utilities
- `@theme` directive MUST define all custom colors
- `@layer` directive MUST organize custom styles appropriately
- `@utility` directive SHOULD be used for complex reusable patterns

### Tooling

- Package manager: pnpm (npm is prohibited)
- Build command: `pnpm build`
- Dev command: `pnpm dev` (with Turbopack)
- Lint command: `pnpm lint`

---

## Quality Gates

### Pull Request Requirements

Before any PR can be merged:

1. **Build Gate**: `pnpm build` MUST complete without errors
2. **Lint Gate**: `pnpm lint` MUST pass with zero warnings
3. **Visual Review**: Changes MUST be visually verified on desktop and mobile
4. **Performance Check**: Lighthouse audit MUST meet minimum scores
5. **Accessibility Check**: No new accessibility violations introduced

### Pre-Commit Checklist

For animation/3D features:
- [ ] Tested on mobile device
- [ ] FPS verified (60 desktop, 30+ mobile)
- [ ] Respects `prefers-reduced-motion`
- [ ] Uses GPU-accelerated properties only
- [ ] Three.js objects properly disposed
- [ ] No undefined CSS classes
- [ ] Uses `cn()` for conditional classes

---

## Governance

### Amendment Process

1. Propose changes via documented PR with rationale
2. Changes MUST be reviewed by at least one team member
3. Breaking changes to principles require explicit migration plan
4. All amendments MUST update the `LAST_AMENDED_DATE` and increment version

### Versioning Policy

Constitution versions follow semantic versioning:
- **MAJOR**: Removal or redefinition of core principles
- **MINOR**: Addition of new principles or significant guidance expansion
- **PATCH**: Clarifications, typo fixes, non-semantic refinements

### Compliance Review

- All PRs and code reviews MUST verify compliance with these principles
- Complexity beyond these standards MUST be explicitly justified
- Reference `docs/OPTIMIZATION_GUIDE.md` for detailed performance implementation guidance

---

**Version**: 1.0.0 | **Ratified**: 2026-01-21 | **Last Amended**: 2026-01-21
