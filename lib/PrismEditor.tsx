"use client";
import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-dark.css";

import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import { useTheme } from "next-themes";

export const PrismEditor = ({
  code,
  language = "tsx",
}: {
  code: string;
  language?: "tsx" | "python";
}) => {
  // const { theme } = useTheme();

  return (
    <div
      style={{
        maxHeight: "600px",
        overflowY: "auto",
      }}
    >
      <Editor
        className="outline-none border-0 ring-0 "
        readOnly
        value={code}
        onValueChange={() => {}}
        highlight={(code) => highlight(code, languages.tsx, language)}
        padding={10}
        style={
          {
            // backgroundColor: theme === "dark" ? "inherit" : "#FDF6E3",
            // backgroundColor: "#FDF6E3",
          }
        }
        textareaClassName="code-editor"
      />
    </div>
  );
};
