"use client";

import { cn } from "@/lib/utils";
import { animationConfig } from "@/lib/animation-config";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // seconds
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number; // starting scale for zoom-in effect (e.g., 0.95)
  viewTrigger?: boolean;
  viewportMargin?: string; // viewport margin for trigger
  once?: boolean; // animate once or every time element enters viewport
  staggerChildren?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = animationConfig.duration.slow,
  direction = "up",
  distance = animationConfig.distance.medium,
  scale,
  viewTrigger = true,
  viewportMargin = "-50px",
  once = true,
  staggerChildren = 0,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    }

    const offsets = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: { x: 0, y: 0 },
    };

    // Build hidden state with optional scale
    const hiddenState: Record<string, number> = {
      opacity: 0,
      ...offsets[direction],
    };
    if (scale !== undefined) {
      hiddenState.scale = scale;
    }

    // Build visible state
    const visibleState: Record<string, number> = {
      opacity: 1,
      x: 0,
      y: 0,
    };
    if (scale !== undefined) {
      visibleState.scale = 1;
    }

    return {
      hidden: hiddenState,
      visible: {
        ...visibleState,
        transition: {
          duration,
          delay: delay / 1000,
          ease: animationConfig.easing.smooth as [number, number, number, number],
          staggerChildren: staggerChildren / 1000,
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView={viewTrigger ? "visible" : undefined}
      animate={!viewTrigger ? "visible" : undefined}
      viewport={{ once, margin: viewportMargin }}
      variants={getVariants()}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
