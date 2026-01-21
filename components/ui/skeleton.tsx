"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "pulse" | "shimmer";
}

/**
 * Base Skeleton component with pulse animation
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "pulse",
}) => {
  return (
    <div
      className={cn(
        "bg-rockship-800/50 rounded-lg",
        variant === "pulse" && "animate-pulse",
        variant === "shimmer" && "animate-shimmer bg-gradient-to-r from-rockship-800/50 via-rockship-700/50 to-rockship-800/50 bg-[length:200%_100%]",
        className
      )}
    />
  );
};

/**
 * Shimmer variant skeleton using existing shimmer keyframe
 */
export const SkeletonShimmer: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-rockship-800/50 via-rockship-700/50 to-rockship-800/50 bg-[length:200%_100%] animate-shimmer rounded-lg",
        className
      )}
    />
  );
};

/**
 * Card skeleton for case study cards
 */
export const CardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-rockship-900/60 backdrop-blur-md border border-white/8 rounded-2xl p-6 h-full",
        className
      )}
    >
      {/* Header row */}
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="w-16 h-6" variant="shimmer" />
        <Skeleton className="w-5 h-5 rounded-full" variant="shimmer" />
      </div>

      {/* Logo area */}
      <Skeleton className="w-3/4 h-8 mb-6" variant="shimmer" />
      <Skeleton className="w-12 h-1 mb-6" variant="shimmer" />

      {/* Title */}
      <Skeleton className="w-full h-6 mb-2" variant="shimmer" />
      <Skeleton className="w-2/3 h-6" variant="shimmer" />

      {/* Bottom link */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
        <Skeleton className="w-24 h-4" variant="shimmer" />
        <Skeleton className="w-4 h-4" variant="shimmer" />
      </div>
    </div>
  );
};

/**
 * Section skeleton for full section placeholders
 */
export const SectionSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn("py-16 md:py-32", className)}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <Skeleton className="w-32 h-8 mx-auto mb-6" variant="shimmer" />
          <Skeleton className="w-full h-10 mb-4" variant="shimmer" />
          <Skeleton className="w-3/4 h-10 mx-auto mb-6" variant="shimmer" />
          <Skeleton className="w-2/3 h-6 mx-auto" variant="shimmer" />
        </div>

        {/* Grid of card skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Image skeleton with fade-in on load
 */
export const ImageSkeleton: React.FC<{
  className?: string;
  aspectRatio?: string;
}> = ({ className, aspectRatio = "aspect-video" }) => {
  return (
    <Skeleton
      className={cn(aspectRatio, className)}
      variant="shimmer"
    />
  );
};

export default Skeleton;
