import { useEffect, useRef } from "react";

// Animation variants for framer-motion style animations using CSS
export const ANIMATION_VARIANTS = {
  fadeIn: {
    className: "animate-fade-in",
    delay: 0,
    staggerDelay: 0,
  },
  fadeInDelayed: {
    className: "animate-fade-in",
    delay: 200,
    staggerDelay: 0,
  },
  slideUp: {
    className: "animate-slide-up",
    delay: 300,
    staggerDelay: 0,
  },
  slideIn: {
    className: "animate-slide-in",
    delay: 200,
    staggerDelay: 0,
  },
  scaleIn: {
    className: "animate-scale-in",
    delay: 100,
    staggerDelay: 0,
  },
  staggered: {
    className: "animate-fade-in",
    delay: 0,
    staggerDelay: 100, // ms between each child
  },
};

// Type definitions
type AnimationHookProps = {
  variant: keyof typeof ANIMATION_VARIANTS;
  staggerChildren?: boolean;
  initialDelay?: number;
  threshold?: number;
};

type StaggerProps = {
  childCount: number;
  staggerDelay?: number;
  initialDelay?: number;
};

// Generic hook to handle animations with references for any HTML element type
export function useAnimation<T extends HTMLElement>({
  variant,
  staggerChildren = false,
  initialDelay = 0,
  threshold = 0.2,
}: AnimationHookProps) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const variantConfig = ANIMATION_VARIANTS[variant];

    // Handle entering viewport animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Apply animation after the initial delay
            setTimeout(() => {
              element.classList.add(variantConfig.className);

              // Handle staggered children if needed
              if (staggerChildren) {
                const children = Array.from(element.children);
                children.forEach((child, index) => {
                  const delay =
                    variantConfig.delay + index * variantConfig.staggerDelay;
                  setTimeout(() => {
                    (child as HTMLElement).classList.add(
                      variantConfig.className
                    );
                  }, delay);
                });
              }
            }, initialDelay);

            // Once animated, no need to observe
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [variant, staggerChildren, initialDelay, threshold]);

  return elementRef;
}

// Function to calculate staggered animation delays
export const getStaggerDelay = ({
  childCount,
  staggerDelay = 100,
  initialDelay = 0,
}: StaggerProps) => {
  return Array.from({ length: childCount }).map(
    (_, index) => initialDelay + index * staggerDelay
  );
};

// Class utility to apply animation classes with specific delays
export const getAnimationClass = (
  variant: keyof typeof ANIMATION_VARIANTS,
  delay = 0
) => {
  const baseClass = ANIMATION_VARIANTS[variant].className;
  return `opacity-0 ${baseClass} [animation-delay:${delay}ms]`;
};
