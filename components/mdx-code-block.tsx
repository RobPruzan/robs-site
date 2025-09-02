"use client";

import { memo } from "react";
import { PrismEditor } from "@/lib/PrismEditor";

interface CodeBlockProps {
  code: string;
  language: string;
}

export const MDXCodeBlock = memo(function MDXCodeBlock({ code, language }: CodeBlockProps) {
  // Map common languages to supported ones
  const languageMap: Record<string, "tsx" | "python"> = {
    typescript: "tsx",
    ts: "tsx",
    javascript: "tsx",
    js: "tsx",
    jsx: "tsx",
    tsx: "tsx",
    swift: "tsx", // Use tsx highlighting for Swift
    python: "python",
    py: "python",
  };

  const mappedLanguage = languageMap[language] || "tsx";

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-white/[0.08]">
      <PrismEditor code={code} language={mappedLanguage} />
    </div>
  );
});