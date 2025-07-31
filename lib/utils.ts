// lib/utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// `cn` merges Tailwind classes and conditional class names safely
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
