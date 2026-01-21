/**
 * Centralized Animation Configuration
 *
 * This file contains all animation timing, easing, and distance presets
 * used throughout the landing page. Modifying values here will affect
 * all components that use these configurations.
 */

export interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    smooth: number[];
    bounce: number[];
    sharp: number[];
  };
  distance: {
    small: number;
    medium: number;
    large: number;
  };
  stagger: {
    fast: number;
    normal: number;
    slow: number;
  };
}

export const animationConfig: AnimationConfig = {
  // Duration in seconds
  duration: {
    fast: 0.2, // micro-interactions (hover, focus)
    normal: 0.3, // standard transitions
    slow: 0.5, // emphasis reveals (hero, headers)
  },

  // Cubic-bezier easing curves
  easing: {
    smooth: [0.21, 0.45, 0.32, 0.9], // existing FadeIn easing
    bounce: [0.68, -0.55, 0.265, 1.55], // overshoot effect
    sharp: [0.4, 0, 0.2, 1], // snappy transitions
  },

  // Distance in pixels for translate animations
  distance: {
    small: 20, // subtle movements
    medium: 30, // default
    large: 50, // dramatic reveals
  },

  // Stagger delay between children in seconds
  stagger: {
    fast: 0.05, // quick succession
    normal: 0.1, // default
    slow: 0.15, // deliberate sequence
  },
};

// Animation tier for device-based quality
export type AnimationTier = "high" | "medium" | "low";

export interface TierConfig {
  tier: AnimationTier;
  fps: number;
  enableSpotlight: boolean;
  enableParticles: boolean;
  particleDensity: number;
}

export const tierConfigs: Record<AnimationTier, TierConfig> = {
  high: {
    tier: "high",
    fps: 60,
    enableSpotlight: true,
    enableParticles: true,
    particleDensity: 1.0,
  },
  medium: {
    tier: "medium",
    fps: 45,
    enableSpotlight: false,
    enableParticles: true,
    particleDensity: 0.5,
  },
  low: {
    tier: "low",
    fps: 30,
    enableSpotlight: false,
    enableParticles: false,
    particleDensity: 0,
  },
};

// Hover effect presets (Tailwind classes)
export type HoverVariant = "lift" | "glow" | "scale" | "spotlight";

export const hoverPresets: Record<HoverVariant, string> = {
  lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
  glow: "transition-all duration-200 hover:shadow-[0_0_20px_-5px_var(--color-rockship-accent)]",
  scale: "transition-transform duration-200 hover:scale-[1.02]",
  spotlight: "spotlight-card",
};

// Export default config for easy import
export default animationConfig;
