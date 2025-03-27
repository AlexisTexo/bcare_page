import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generates a random ID with a given prefix
 */
export function generateId(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Format a number with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

/**
 * Truncate a string if it's longer than the max length
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Check if the user's device is a mobile device
 */
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

/**
 * Wait for a specified time using a promise
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Apply a blur effect to the page content
 */
export function blurPageContent(shouldBlur: boolean): void {
  const mainContent = document.getElementById("main-content");
  if (!mainContent) return;

  if (shouldBlur) {
    mainContent.classList.add("blur-sm", "transition-all", "duration-300");
  } else {
    mainContent.classList.remove("blur-sm");
  }
}

/**
 * Get viewport dimensions
 */
export function getViewportDimensions(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
