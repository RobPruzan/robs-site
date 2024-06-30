"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => {
          setTheme("dark");
        }}
        className={cn(["flex dark:hidden", className])}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        <span className="sr-only">Switch to dark theme</span>
      </Button>
      <Button
        variant={"ghost"}
        onClick={() => {
          setTheme("light");
        }}
        className={cn(["hidden dark:flex", className])}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        <span className="sr-only">Switch to light theme</span>
      </Button>
    </>
  );
};
