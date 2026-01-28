"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

// Constants
const SCROLL_TARGET_KEY = "scrollTarget";
const SCROLL_EVENT_NAME = "checkScrollTarget";
const NAVIGATION_DELAY_MS = 500;
const SCROLL_RETRY_INTERVAL_MS = 150;
const SCROLL_INITIAL_DELAY_MS = 300;
const MAX_SCROLL_ATTEMPTS = 20;

/**
 * Scroll to an element by ID with smooth behavior
 */
const scrollToElement = (id: string): boolean => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
};

/**
 * Retry scrolling until element is found (for dynamic imports)
 */
const retryScroll = (targetId: string) => {
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToElement(targetId)) return;
    if (attempts < MAX_SCROLL_ATTEMPTS) {
      attempts++;
      setTimeout(tryScroll, SCROLL_RETRY_INTERVAL_MS);
    }
  };

  setTimeout(tryScroll, SCROLL_INITIAL_DELAY_MS);
};

/**
 * Hook for smooth scrolling to anchor elements
 * Handles cross-page navigation (e.g., from /blog to /#section)
 */
export const useSmoothScroll = () => {
  const pathname = usePathname();
  const router = useRouter();

  const scrollTo = useCallback((targetId: string) => {
    const id = targetId.replace(/^#/, "");
    scrollToElement(id);
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const href = e.currentTarget.getAttribute("href");
      if (!href?.startsWith("#")) return;

      e.preventDefault();
      const targetId = href.slice(1);

      if (pathname === "/") {
        scrollTo(href);
      } else {
        sessionStorage.setItem(SCROLL_TARGET_KEY, targetId);
        router.push("/");
        setTimeout(() => {
          window.dispatchEvent(new Event(SCROLL_EVENT_NAME));
        }, NAVIGATION_DELAY_MS);
      }
    },
    [scrollTo, pathname, router]
  );

  return { scrollTo, handleAnchorClick };
};

/**
 * Hook to handle scroll target from sessionStorage (use in HomePage)
 */
export const useScrollTarget = () => {
  useEffect(() => {
    const handleScrollTarget = () => {
      const target = sessionStorage.getItem(SCROLL_TARGET_KEY);
      if (target) {
        sessionStorage.removeItem(SCROLL_TARGET_KEY);
        retryScroll(target);
      }
    };

    handleScrollTarget();
    window.addEventListener(SCROLL_EVENT_NAME, handleScrollTarget);
    return () => window.removeEventListener(SCROLL_EVENT_NAME, handleScrollTarget);
  }, []);
};

export default useSmoothScroll;
