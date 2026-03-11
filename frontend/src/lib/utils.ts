import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes safely.
 * It combines clsx (conditional classes) with tailwind-merge
 * to prevent duplicate or conflicting Tailwind styles.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 
