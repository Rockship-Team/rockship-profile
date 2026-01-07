"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: string | number; // Support number (ms) or string
  duration?: number; // ms
  disableAnimation?: boolean; // Optional override
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 700,
  disableAnimation,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Throttle state updates with requestAnimationFrame
            if (rafId !== null) {
              cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(() => {
              setIsVisible(true);
              observer.unobserve(entry.target);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      } // Trigger slightly before full view
    );

    const match = domRef.current;
    if (match) {
      observer.observe(match);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (match) {
        observer.unobserve(match);
      }
    };
  }, []);

  // Skip animation if user prefers reduced motion or explicitly disabled
  const shouldAnimate = !disableAnimation && !prefersReducedMotion;

  // Handle delay normalization
  const delayMs = typeof delay === "number" ? delay : parseFloat(delay) || 0;
  const transitionDelay = shouldAnimate ? `${delayMs}ms` : "0ms";
  const transitionDuration = shouldAnimate ? `${duration}ms` : "0ms";

  return (
    <div
      ref={domRef}
      className={cn(
        "transform-gpu transition-all ease-[cubic-bezier(0.25,0.4,0.25,1)]",
        // Only add will-change if animation is enabled
        shouldAnimate && "will-change-[transform,opacity,filter]",
        (isVisible || !shouldAnimate)
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-8 blur-sm",
        className
      )}
      style={{
        transitionDelay,
        transitionDuration,
      }}
    >
      {children}
    </div>
  );
}

