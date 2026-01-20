"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PerformanceMetrics {
  fps: number;
  memory: number; // MB
  drawCalls: number;
  triangles: number;
}

interface Use3DPerformanceOptions {
  /** Target FPS for throttling (default: 60) */
  targetFps?: number;
  /** Enable low power mode for battery savings */
  lowPowerMode?: boolean;
  /** Callback when performance drops below threshold */
  onPerformanceDrop?: (metrics: PerformanceMetrics) => void;
}

/**
 * Custom hook for managing 3D rendering performance
 * Provides geometry caching, visibility detection, and adaptive quality
 */
export function use3DPerformance(options: Use3DPerformanceOptions = {}) {
  const { targetFps = 60, lowPowerMode = false, onPerformanceDrop } = options;

  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());
  const geometryCacheRef = useRef<Map<string, THREE.BufferGeometry>>(new Map());
  const materialCacheRef = useRef<Map<string, THREE.Material>>(new Map());

  // FPS monitoring with rolling average
  const updateFPS = useCallback(() => {
    const now = performance.now();
    const delta = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    const fps = 1000 / delta;
    frameTimesRef.current.push(fps);

    // Keep last 60 frames for average
    if (frameTimesRef.current.length > 60) {
      frameTimesRef.current.shift();
    }

    const avgFps =
      frameTimesRef.current.reduce((a, b) => a + b, 0) /
      frameTimesRef.current.length;

    // Check for performance drop
    if (avgFps < targetFps * 0.5 && !isLowPerformance) {
      setIsLowPerformance(true);
      onPerformanceDrop?.({
        fps: avgFps,
        memory: metrics.memory,
        drawCalls: metrics.drawCalls,
        triangles: metrics.triangles,
      });
    } else if (avgFps >= targetFps * 0.8 && isLowPerformance) {
      setIsLowPerformance(false);
    }

    return avgFps;
  }, [targetFps, isLowPerformance, onPerformanceDrop, metrics]);

  // Geometry caching to prevent recreation
  const getCachedGeometry = useCallback(
    (key: string, createFn: () => THREE.BufferGeometry) => {
      if (geometryCacheRef.current.has(key)) {
        return geometryCacheRef.current.get(key)!;
      }
      const geometry = createFn();
      geometryCacheRef.current.set(key, geometry);
      return geometry;
    },
    []
  );

  // Material caching
  const getCachedMaterial = useCallback(
    (key: string, createFn: () => THREE.Material) => {
      if (materialCacheRef.current.has(key)) {
        return materialCacheRef.current.get(key)!;
      }
      const material = createFn();
      materialCacheRef.current.set(key, material);
      return material;
    },
    []
  );

  // Dispose all cached resources
  const disposeCache = useCallback(() => {
    geometryCacheRef.current.forEach((geometry) => geometry.dispose());
    materialCacheRef.current.forEach((material) => material.dispose());
    geometryCacheRef.current.clear();
    materialCacheRef.current.clear();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disposeCache();
    };
  }, [disposeCache]);

  // Throttled render function
  const shouldRenderFrame = useCallback(() => {
    if (!lowPowerMode) return true;

    const now = performance.now();
    const delta = now - lastFrameTimeRef.current;
    const targetFrameTime = 1000 / (targetFps / 2); // Half FPS in low power mode

    return delta >= targetFrameTime;
  }, [lowPowerMode, targetFps]);

  return {
    isLowPerformance,
    metrics,
    updateFPS,
    getCachedGeometry,
    getCachedMaterial,
    disposeCache,
    shouldRenderFrame,
  };
}

/**
 * Hook for visibility-based rendering optimization
 */
export function useVisibilityOptimization(
  elementRef: React.RefObject<HTMLElement | null>,
  options: { rootMargin?: string; threshold?: number } = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        rootMargin: options.rootMargin || "50px",
        threshold: options.threshold || 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [elementRef, hasBeenVisible, options.rootMargin, options.threshold]);

  return {
    isVisible,
    hasBeenVisible,
    shouldRender: hasBeenVisible, // Only render after first visibility
    isPaused: !isVisible, // Pause when not visible
  };
}

/**
 * Utility to create optimized Three.js configurations
 */
export const optimizedThreeConfig = {
  // WebGL renderer options for performance
  rendererOptions: {
    antialias: false, // Disable for mobile
    alpha: true,
    powerPreference: "high-performance" as const,
    stencil: false,
    depth: true,
  },

  // Optimized shadow settings
  shadowOptions: {
    enabled: false, // Disable shadows for better performance
    mapSize: 512, // If enabled, use small shadow maps
    type: THREE.BasicShadowMap,
  },

  // Texture settings
  textureOptions: {
    minFilter: THREE.LinearMipMapLinearFilter,
    magFilter: THREE.LinearFilter,
    generateMipmaps: true,
    anisotropy: 4, // Lower anisotropy for mobile
  },

  // Geometry optimization
  geometryOptions: {
    mergeVertices: true,
    computeBoundingSphere: true,
  },
};
