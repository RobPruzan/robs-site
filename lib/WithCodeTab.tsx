import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ResettableTabsContent,
} from "@/components/ui/tabs";
import { readFile } from "fs/promises";

import { PrismEditor } from "./PrismEditor";
import { ComponentProps, Suspense } from "react";
import { SuspenseLoader } from "./SupsenseLoader";
import { Loader2 } from "lucide-react";

const WithCodeTabContent = ({
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
        <FileCodeEditorContent replace={replace} filePath={filePath} />
      </TabsContent>
    </Tabs>
  );
};

export const FileCodeEditorContent = async ({
  filePath,
  noCheck = true,
  replace = (x) => x,
}: {
  filePath: string;
  noCheck?: boolean;
  replace?: (content: string) => string;
}) => {
  const fileContent = await readFile(filePath, "utf-8");

  const afterNoChecked = noCheck
    ? fileContent.replace("// @ts-nocheck\n", "").replace("// @ts-ignore\n", "")
    : fileContent;
  return (
    <PrismEditor
      code={replace(afterNoChecked.replace(`"use client";\n`, ""))}
    />
  );
};

export const SuspenseEditor = (props: {
  filePath: string;
  noCheck?: boolean;
  replace?: (content: string) => string;
}) => {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" size={20} />}>
      <FileCodeEditorContent {...props}/>
    </Suspense>
  );
};

export const WithMultiCodeTabContent = ({
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

export const WithCodeTab = (
  props: ComponentProps<typeof WithCodeTabContent>
) => (
  <SuspenseLoader>
    <WithCodeTabContent {...props} />
  </SuspenseLoader>
);
export const FileCodeEditor = (
  props: ComponentProps<typeof FileCodeEditorContent>
) => (
  <SuspenseLoader>
    <FileCodeEditorContent {...props} />
  </SuspenseLoader>
);
export const WithMultiCodeTab = (
  props: ComponentProps<typeof WithMultiCodeTabContent>
) => (
  <SuspenseLoader>
    <WithMultiCodeTabContent {...props} />
  </SuspenseLoader>
);
