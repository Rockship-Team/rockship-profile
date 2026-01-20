"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // seconds
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  viewTrigger?: boolean;
  staggerChildren?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 30,
  viewTrigger = true,
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

    // Remove blur filter entirely - it causes performance issues and hydration mismatch
    return {
      hidden: {
        opacity: 0,
        ...offsets[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay: delay / 1000,
          ease: [0.21, 0.45, 0.32, 0.9] as any,
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
      viewport={{ once: true, margin: "-50px" }}
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
