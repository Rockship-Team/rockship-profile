"use client";

import { useCallback } from "react";

/**
 * Hook for smooth scrolling to anchor elements
 * Uses native scroll-behavior: smooth with fallback
 */
export const useSmoothScroll = () => {
  const scrollTo = useCallback((targetId: string) => {
    // Remove leading # if present
    const id = targetId.startsWith("#") ? targetId.slice(1) : targetId;
    const element = document.getElementById(id);

    if (element) {
      // Use native scrollIntoView with smooth behavior
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        scrollTo(href);
      }
    },
    [scrollTo]
  );

  return { scrollTo, handleAnchorClick };
};

export default useSmoothScroll;
