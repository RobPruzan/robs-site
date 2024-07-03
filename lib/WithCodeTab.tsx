import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ResettableTabsContent,
} from "@/components/ui/tabs";
import { readFile } from "fs/promises";

import { PrismEditor } from "./PrismEditor";

export const WithCodeTab = ({
  children,
  filePath,
  name = "Code",
  resettable = true,
  replace = (x) => x,
}: {
  children?: React.ReactNode;
  filePath: string;
  name?: string;
  noCheck?: boolean;
  resettable?: boolean;
  replace?: (content: string) => string;
}) => {
  return (
    <Tabs
      style={{
        overflowX: "auto",
      }}
      defaultValue={children ? "canvas" : "code"}
      className="w-[400px]"
    >
      <TabsList>
        {children && <TabsTrigger value="canvas">Canvas</TabsTrigger>}

        <TabsTrigger value="code">{name}</TabsTrigger>
      </TabsList>
      {resettable ? (
        <ResettableTabsContent value="canvas">{children}</ResettableTabsContent>
      ) : (
        <TabsContent value="canvas">{children}</TabsContent>
      )}

      <TabsContent value="code">
        <FileCodeEditor replace={replace} filePath={filePath} />
      </TabsContent>
    </Tabs>
  );
};

export const FileCodeEditor = async ({
  filePath,
  noCheck = false,
  replace = (x) => x,
}: {
  filePath: string;
  noCheck?: boolean;
  replace?: (content: string) => string;
}) => {
  const fileContent = await readFile(filePath, "utf-8");

  const afterNoChecked = noCheck
    ? fileContent.replace("// @ts-nocheck\n", "")
    : fileContent;
  return (
    <PrismEditor
      code={replace(afterNoChecked.replace(`"use client";\n`, ""))}
    />
  );
};

export const WithMultiCodeTab = ({
  children,
  filePaths,
  resettable = true,
  replace = (x) => x,
}: {
  children?: React.ReactNode;
  filePaths: Array<{ path: string; name: string }>;
  resettable?: boolean;
  replace?: (content: string) => string;
}) => {
  return (
    <Tabs
      style={{
        overflowX: "auto",
      }}
      defaultValue={children ? "canvas" : filePaths.at(0)?.name}
      // className="w-[400px]"
    >
      <TabsList
        style={
          {
            // paddingLeft: "50px",
            // maxWidth: "100%",
            // overflowX: "auto",
          }
        }
        // className="max-w-[200px] overflow-auto min-w-0"
      >
        {children && <TabsTrigger value="canvas">Canvas</TabsTrigger>}
        {filePaths.map(({ name }) => (
          <TabsTrigger value={name}>{name}</TabsTrigger>
        ))}
      </TabsList>
      {resettable ? (
        <ResettableTabsContent value="canvas">{children}</ResettableTabsContent>
      ) : (
        <TabsContent value="canvas">{children}</TabsContent>
      )}

      {filePaths.map(({ name, path }) => (
        <TabsContent value={name}>
          <FileCodeEditor replace={replace} filePath={path} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
