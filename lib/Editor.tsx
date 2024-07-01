"use client";
import CodeEditor from "@uiw/react-textarea-code-editor";
export const Editor = ({
  code,
  language,
}: {
  language: string;
  code: string;
}) => (
  <CodeEditor
    value={code}
    language={language}
    padding={15}
    className="rounded-md "
    style={{
      // backgroundColor: "#1F2937 !important",

      fontFamily:
        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
    }}
  />
);
