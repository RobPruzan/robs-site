import { readFile } from "fs/promises";
import { ComponentProps } from "react";
import { SuspenseLoader } from "./SupsenseLoader";

export const EstimatedReadTimeContent = async ({ path }: { path: string }) => {
  const wordCount = (await readFile(path, "utf-8")).split(" ").length;

  return (
    <div className="text-muted-foreground text-sm">
      Estimated Reading Time: {(wordCount / 200).toFixed(1)}m
    </div>
  );
};



export const EstimatedReadTime = (props: ComponentProps<typeof EstimatedReadTimeContent>) => (
  <SuspenseLoader>
    <EstimatedReadTimeContent {...props} />
  </SuspenseLoader>
);