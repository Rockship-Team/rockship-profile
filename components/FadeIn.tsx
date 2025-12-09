"use client";

import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: string | number; // Support number (ms) or string
  duration?: number; // ms
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 700,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } // Trigger slightly before full view
    );

    const match = domRef.current;
    if (match) {
      observer.observe(match);
    }

    return () => {
      if (match) {
        observer.unobserve(match);
      }
    };
  }, []);

  // Handle delay normalization
  const delayMs = typeof delay === "number" ? delay : parseFloat(delay) || 0;
  const transitionDelay = `${delayMs}ms`;
  const transitionDuration = `${duration}ms`;

  return (
    <div
      ref={domRef}
      className={cn(
        "transform-gpu transition-all ease-[cubic-bezier(0.25,0.4,0.25,1)] will-change-[transform,opacity,filter]",
        isVisible
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

