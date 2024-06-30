"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { run } from "@/lib/utils";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <Button
        onClick={() => {
          setTheme("dark");
        }}
        className="flex dark:hidden"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        <span className="sr-only">Switch to dark theme</span>
      </Button>
      <Button
        onClick={() => {
          setTheme("light");
        }}
        className="hidden dark:flex"
      >
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        <span className="sr-only">Switch to light theme</span>
      </Button>
    </>
  );
};
