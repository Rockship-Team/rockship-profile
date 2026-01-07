import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect when an element is visible in the viewport
 * Useful for lazy-loading animations and performance optimization
 */
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);

        // Track if element has ever been intersected
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "50px", // Start 50px before element enters viewport
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options, hasIntersected]);

  return { targetRef, isIntersecting, hasIntersected };
};

/**
 * Hook to pause/resume animations based on visibility
 * Returns whether animations should be active
 */
export const useAnimationOnScreen = () => {
  const { isIntersecting, hasIntersected, targetRef } = useIntersectionObserver();

  // Only animate when element is visible or has been visible once
  const shouldAnimate = isIntersecting || hasIntersected;

  return {
    targetRef,
    shouldAnimate,
    isVisible: isIntersecting,
  };
};
