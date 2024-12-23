import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isEmail = (str: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailPattern.test(str)
}
