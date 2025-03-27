import React, { useState, useEffect } from "react";
import SkeletonLoader, { SkeletonType } from "./SkeletonLoader";

interface LoadingWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  skeletonType: SkeletonType;
  skeletonCount?: number;
  delay?: number;
  className?: string;
  showShimmer?: boolean;
}

/**
 * A wrapper component that shows skeleton loaders during loading
 * Can be used to simulate loading or wrap data-fetching components
 */
const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  isLoading: externalLoading,
  skeletonType,
  skeletonCount = 1,
  delay = 0,
  className = "",
  showShimmer = true,
}) => {
  // Internal loading state if external loading is not provided
  const [internalLoading, setInternalLoading] = useState(delay > 0);

  // Use external loading state if provided, otherwise use internal state
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (isLoading) {
    return (
      <div className={className}>
        <SkeletonLoader
          type={skeletonType}
          count={skeletonCount}
          shimmer={showShimmer}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
