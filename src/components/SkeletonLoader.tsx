import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type SkeletonType =
  | "card"
  | "text"
  | "image"
  | "button"
  | "header"
  | "avatar"
  | "profile"
  | "testimonial"
  | "stats";

interface SkeletonLoaderProps {
  type: SkeletonType;
  count?: number;
  className?: string;
  shimmer?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type,
  count = 1,
  className = "",
  shimmer = true,
}) => {
  const shimmerClass = shimmer
    ? "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-shimmer-gradient before:bg-[length:400px_100%]"
    : "";

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div
            className={cn(
              "glass-card p-6 shadow-subtle relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        );
      case "text":
        return (
          <div
            className={cn(
              "space-y-2 relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        );
      case "image":
        return (
          <Skeleton
            className={cn(
              "h-48 w-full rounded-md relative overflow-hidden",
              shimmerClass,
              className
            )}
          />
        );
      case "button":
        return (
          <Skeleton
            className={cn(
              "h-10 w-32 rounded-full relative overflow-hidden",
              shimmerClass,
              className
            )}
          />
        );
      case "header":
        return (
          <div
            className={cn(
              "space-y-4 text-center relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            <Skeleton className="h-6 w-1/3 mx-auto" />
            <Skeleton className="h-12 w-2/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        );
      case "avatar":
        return (
          <div
            className={cn(
              "flex items-center space-x-4 relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        );
      case "profile":
        return (
          <div
            className={cn(
              "space-y-6 relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            <div className="flex justify-center">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <div className="space-y-2 text-center">
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        );
      case "testimonial":
        return (
          <div
            className={cn(
              "glass-card p-6 shadow-medium relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        );
      case "stats":
        return (
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-4 relative overflow-hidden",
              shimmerClass,
              className
            )}
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-4 shadow-subtle">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-8 w-1/2 mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        );
      default:
        return (
          <Skeleton
            className={cn(
              "h-10 w-full relative overflow-hidden",
              shimmerClass,
              className
            )}
          />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-4">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
