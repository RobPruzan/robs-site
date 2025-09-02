"use client";

import { getDirectories } from "@/lib/getDirectories";
import {
  showArticles,
  createdAtMap,
  articleNameMap,
  descriptionMap,
} from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MoreArticles = ({
  directoryNames,
}: {
  directoryNames: Array<string>;
}) => {
  const pathname = usePathname();
  const exclude = pathname.split("/").at(-1)!;
  return (
    <div className="w-full border-t border-muted-foreground mt-10 gap-y-3 flex flex-col">
      <h2 className="mt-2">More articles</h2>
      {directoryNames
        .filter((name) => showArticles.includes(name) && name !== exclude)
        .sort((a, b) => {
          const aDate = createdAtMap[a];
          const bDate = createdAtMap[b];
          return bDate.getTime() - aDate.getTime();
        })
        .map((name) => (
          <div
            key={name}
            className="flex items-center gap-x-1 w-full justify-between"
          >
            <div className="flex gap-x-4">
              -
              <Link
                className="underline underline-offset-4"
                href={`/blog/${name}`}
              >
                {name.includes("devlog")
                  ? descriptionMap[name]
                  : articleNameMap[name as keyof typeof articleNameMap] ?? name}
              </Link>
            </div>
            <span>{createdAtMap[name].toLocaleDateString()}</span>
          </div>
        ))}
    </div>
  );
};
