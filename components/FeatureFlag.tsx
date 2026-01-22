"use client"

import { ReactNode } from "react"
import { useFeatureFlag } from "@/hooks/useFeatureFlag"

interface FeatureFlagProps {
  flag: string
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Component to conditionally render content based on feature flag
 *
 * @example
 * // Enable with URL: ?featureFlag=blog
 *
 * <FeatureFlag flag="blog">
 *   <BlogSection />
 * </FeatureFlag>
 *
 * // With fallback
 * <FeatureFlag flag="newFeature" fallback={<OldFeature />}>
 *   <NewFeature />
 * </FeatureFlag>
 */
export function FeatureFlag({ flag, children, fallback = null }: FeatureFlagProps) {
  const { isEnabled, isInitialized } = useFeatureFlag()

  // Don't render anything until initialized to avoid hydration mismatch
  if (!isInitialized) {
    return null
  }

  if (isEnabled(flag)) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
