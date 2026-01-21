"use client";

import { useEffect, useState } from "react";
import {
  type AnimationTier,
  type TierConfig,
  tierConfigs,
} from "@/lib/animation-config";

/**
 * Hook to detect device capability and return appropriate animation tier
 *
 * Tiers:
 * - high: Desktop (>= 1024px) - full effects, 60fps
 * - medium: Tablet (768-1023px) - reduced effects, 45fps
 * - low: Mobile (< 768px) - minimal effects, 30fps
 */
export const useAnimationTier = (): AnimationTier => {
  const [tier, setTier] = useState<AnimationTier>("high");

  useEffect(() => {
    const updateTier = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setTier("low");
      } else if (width < 1024) {
        setTier("medium");
      } else {
        setTier("high");
      }
    };

    // Initial check
    updateTier();

    // Listen for resize
    window.addEventListener("resize", updateTier);
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  return tier;
};

/**
 * Hook to get full tier configuration
 */
export const useAnimationTierConfig = (): TierConfig => {
  const tier = useAnimationTier();
  return tierConfigs[tier];
};

export default useAnimationTier;
