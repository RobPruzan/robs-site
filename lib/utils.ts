import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { statSync } from "fs";
import { readdir } from "fs/promises";
import { join } from "path";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const run = <T>(f: () => T) => f();

