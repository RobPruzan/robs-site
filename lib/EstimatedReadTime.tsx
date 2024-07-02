import { readFile } from "fs/promises";

export const EstimatedReadTime = async ({ path }: { path: string }) => {
  const wordCount = (await readFile(path, "utf-8")).split(" ").length;

  return (
    <div className="text-muted-foreground text-sm">
      Estimated Reading Time: {(wordCount / 200).toFixed(1)}m
    </div>
  );
};
