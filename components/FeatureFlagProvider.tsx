"use client"

import { ReactNode, useEffect } from "react"

const STORAGE_KEY = "feature_flags"

/**
 * Provider that automatically reads feature flags from URL and saves to localStorage
 * Add this to your root layout to enable URL-based feature flag activation
 *
 * Enable flags:  ?featureFlag=blog or ?featureFlag=blog,feature2
 * Disable flags: ?disableFlag=blog or ?disableFlag=blog,feature2
 * Clear all:     ?clearFlags=true
 */
export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const enableParam = params.get("featureFlag")
    const disableParam = params.get("disableFlag")
    const clearParam = params.get("clearFlags")

    let hasChanges = false

    // Get existing flags from localStorage
    let existingFlags: Set<string> = new Set()
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        existingFlags = new Set(JSON.parse(stored))
      }
    } catch {
      // Invalid JSON, start fresh
    }

    // Clear all flags if requested
    if (clearParam === "true") {
      existingFlags.clear()
      hasChanges = true
    }

    // Enable flags
    if (enableParam) {
      const flagsToEnable = enableParam.split(",").map((f) => f.trim()).filter(Boolean)
      flagsToEnable.forEach((flag) => existingFlags.add(flag))
      hasChanges = flagsToEnable.length > 0
    }

    // Disable flags
    if (disableParam) {
      const flagsToDisable = disableParam.split(",").map((f) => f.trim()).filter(Boolean)
      flagsToDisable.forEach((flag) => existingFlags.delete(flag))
      hasChanges = hasChanges || flagsToDisable.length > 0
    }

    // Save changes
    if (hasChanges) {
      if (existingFlags.size > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingFlags]))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    // Clean URL
    if (enableParam || disableParam || clearParam) {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("featureFlag")
      newUrl.searchParams.delete("disableFlag")
      newUrl.searchParams.delete("clearFlags")
      window.history.replaceState({}, "", newUrl.toString())
    }
  }, [])

  return <>{children}</>
}
