// Source - https://stackoverflow.com/a
// Posted by Jon Catmull
// Retrieved 2025-11-20, License - CC BY-SA 4.0
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
