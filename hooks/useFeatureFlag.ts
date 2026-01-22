"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "feature_flags"

type FeatureFlags = Set<string>

function getStoredFlags(): FeatureFlags {
  if (typeof window === "undefined") return new Set()

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return new Set(JSON.parse(stored))
    }
  } catch {
    // Invalid JSON, return empty set
  }
  return new Set()
}

function saveFlags(flags: FeatureFlags): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...flags]))
}

function parseUrlFlags(): string[] {
  if (typeof window === "undefined") return []

  const params = new URLSearchParams(window.location.search)
  const flagParam = params.get("featureFlag")

  if (!flagParam) return []

  // Support comma-separated flags: featureFlag=blog,feature2
  return flagParam.split(",").map((f) => f.trim()).filter(Boolean)
}

/**
 * Hook to manage feature flags
 *
 * Usage:
 * - Add ?featureFlag=blog to URL to enable blog feature
 * - Add ?featureFlag=blog,feature2 to enable multiple features
 * - Flags are persisted in localStorage
 *
 * @example
 * const { isEnabled, enableFlag, disableFlag, clearAllFlags } = useFeatureFlag()
 *
 * if (isEnabled("blog")) {
 *   // Show blog feature
 * }
 */
export function useFeatureFlag() {
  const [flags, setFlags] = useState<FeatureFlags>(new Set())
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize flags from localStorage and URL on mount
  useEffect(() => {
    const storedFlags = getStoredFlags()
    const urlFlags = parseUrlFlags()

    // Merge URL flags with stored flags
    const mergedFlags = new Set(storedFlags)
    urlFlags.forEach((flag) => mergedFlags.add(flag))

    // If URL had new flags, save them
    if (urlFlags.length > 0) {
      saveFlags(mergedFlags)
    }

    setFlags(mergedFlags)
    setIsInitialized(true)
  }, [])

  const isEnabled = useCallback(
    (flag: string): boolean => {
      return flags.has(flag)
    },
    [flags]
  )

  const enableFlag = useCallback((flag: string): void => {
    setFlags((prev) => {
      const newFlags = new Set(prev)
      newFlags.add(flag)
      saveFlags(newFlags)
      return newFlags
    })
  }, [])

  const disableFlag = useCallback((flag: string): void => {
    setFlags((prev) => {
      const newFlags = new Set(prev)
      newFlags.delete(flag)
      saveFlags(newFlags)
      return newFlags
    })
  }, [])

  const toggleFlag = useCallback((flag: string): void => {
    setFlags((prev) => {
      const newFlags = new Set(prev)
      if (newFlags.has(flag)) {
        newFlags.delete(flag)
      } else {
        newFlags.add(flag)
      }
      saveFlags(newFlags)
      return newFlags
    })
  }, [])

  const clearAllFlags = useCallback((): void => {
    setFlags(new Set())
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const getAllFlags = useCallback((): string[] => {
    return [...flags]
  }, [flags])

  return {
    isEnabled,
    enableFlag,
    disableFlag,
    toggleFlag,
    clearAllFlags,
    getAllFlags,
    isInitialized,
  }
}

/**
 * Simple check for feature flag (for use outside of React components)
 * Note: This won't trigger re-renders
 */
export function checkFeatureFlag(flag: string): boolean {
  const flags = getStoredFlags()
  return flags.has(flag)
}
