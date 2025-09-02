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
  
  const filteredArticles = directoryNames
    .filter((name) => showArticles.includes(name) && name !== exclude)
    .sort((a, b) => {
      const aDate = createdAtMap[a];
      const bDate = createdAtMap[b];
      return bDate.getTime() - aDate.getTime();
    })
    .slice(0, 6); // Show max 6 articles for cleaner layout
  
  return (
    <div className="w-full mt-16 mx-auto max-w-none md:max-w-3xl">
      <div className="border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-6 text-foreground">
          More articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.map((name, index) => {
            const title = name.includes("devlog")
              ? descriptionMap[name]
              : articleNameMap[name as keyof typeof articleNameMap] ?? name;
            const date = createdAtMap[name];
            
            return (
              <Link
                key={name}
                href={`/blog/${name}`}
                className="group relative p-4 rounded-lg border border-border/50 hover:border-border bg-background hover:bg-secondary/20 transition-all duration-200"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap mt-1">
                      {date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Read article →
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/0 group-hover:ring-primary/10 transition-all duration-200" />
              </Link>
            );
          })}
        </div>
        {directoryNames.filter((name) => showArticles.includes(name) && name !== exclude).length > 6 && (
          <div className="mt-6 text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all articles
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
