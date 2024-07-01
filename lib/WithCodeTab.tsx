import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { readFile } from "fs/promises";
import { run } from "./utils";

import { getDirectories } from "./getDirectories";
import { Editor } from "./Editor";

export const WithCodeTab = ({
  children,
  filePath,
}: {
  children: React.ReactNode;
  filePath: string;
}) => {
  return (
    <Tabs defaultValue="canvas" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="canvas">Canvas</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="canvas">{children}</TabsContent>
      <TabsContent value="code">
        <FileCodeEditor filePath={filePath} />
      </TabsContent>
    </Tabs>
  );
};

export const FileCodeEditor = async ({ filePath }: { filePath: string }) => {
  const fileContent = await readFile(filePath, "utf-8");
  return (
    <Editor code={fileContent.replace(`"use client";\n`, "")} language="tsx" />
  );
};
