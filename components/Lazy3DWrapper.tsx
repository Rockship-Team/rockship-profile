"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

interface Lazy3DWrapperProps {
  children: React.ReactNode;
  /** Placeholder to show while loading */
  fallback?: React.ReactNode;
  /** Delay before showing 3D content (ms) to prioritize main content */
  loadDelay?: number;
  /** Only render when element is visible */
  lazyVisible?: boolean;
  /** CSS class for container */
  className?: string;
  /** Show a shimmer effect while loading */
  shimmer?: boolean;
  /** IntersectionObserver options */
  observerOptions?: {
    rootMargin?: string;
    threshold?: number;
  };
}

const ShimmerPlaceholder = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-rockship-950 via-rockship-900/50 to-rockship-950 animate-shimmer">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-rockship-800)_0%,_transparent_70%)] opacity-30" />
  </div>
);

/**
 * Wrapper component for lazy loading 3D content with various optimization strategies
 *
 * Features:
 * - Delayed rendering to prioritize main content
 * - Visibility-based rendering with IntersectionObserver
 * - Progressive loading with shimmer effect
 * - Memory cleanup on unmount
 */
export function Lazy3DWrapper({
  children,
  fallback,
  loadDelay = 100,
  lazyVisible = true,
  className = "",
  shimmer = true,
  observerOptions = { rootMargin: "50px", threshold: 0.1 },
}: Lazy3DWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazyVisible);
  const [isVisible, setIsVisible] = useState(!lazyVisible);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle load delay
  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, loadDelay);
      return () => clearTimeout(timer);
    }
  }, [shouldLoad, loadDelay, isLoaded]);

  // Handle visibility detection
  useEffect(() => {
    if (!lazyVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShouldLoad(true);
          // Once loaded, no need to observe anymore
          observer.disconnect();
        }
      },
      {
        rootMargin: observerOptions.rootMargin,
        threshold: observerOptions.threshold,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazyVisible, observerOptions.rootMargin, observerOptions.threshold]);

  const showContent = isLoaded && isVisible;
  const showFallback = !showContent;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Fallback/Loading state */}
      {showFallback && (
        <div className="absolute inset-0">
          {fallback || (shimmer && <ShimmerPlaceholder />)}
        </div>
      )}

      {/* Main 3D content */}
      {showContent && (
        <Suspense fallback={fallback || (shimmer && <ShimmerPlaceholder />)}>
          {children}
        </Suspense>
      )}
    </div>
  );
}

/**
 * HOC for wrapping 3D components with lazy loading
 */
export function withLazy3D<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<Lazy3DWrapperProps, "children"> = {}
) {
  return function Lazy3DComponent(props: P) {
    return (
      <Lazy3DWrapper {...options}>
        <Component {...props} />
      </Lazy3DWrapper>
    );
  };
}

export default Lazy3DWrapper;
