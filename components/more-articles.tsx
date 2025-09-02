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
import { useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";

export const MoreArticles = ({
  directoryNames,
}: {
  directoryNames: Array<string>;
}) => {
  const pathname = usePathname();
  const exclude = pathname.split("/").at(-1)!;
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [displayCount, setDisplayCount] = useState(6);
  
  // Shuffle function with seed for consistency
  const shuffleArray = useCallback((array: string[], seed: number) => {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    
    // Use seed to generate consistent random numbers
    const random = (i: number) => {
      const x = Math.sin(seed + i) * 10000;
      return x - Math.floor(x);
    };
    
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(random(currentIndex) * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    
    return shuffled;
  }, []);
  
  const handleRefresh = () => {
    setShuffleSeed(prev => prev + 1);
    setDisplayCount(6); // Reset to initial count on shuffle
  };
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };
  
  const allFilteredArticles = directoryNames
    .filter((name) => showArticles.includes(name) && name !== exclude);
  
  const sortedOrShuffled = shuffleSeed === 0 
    ? allFilteredArticles.sort((a, b) => {
        const aDate = createdAtMap[a];
        const bDate = createdAtMap[b];
        return bDate.getTime() - aDate.getTime();
      })
    : shuffleArray(allFilteredArticles, shuffleSeed);
  
  const filteredArticles = sortedOrShuffled.slice(0, displayCount);
  
  return (
    <div className="w-full mt-16 mx-auto max-w-none md:max-w-3xl">
      <div className="border-t border-border pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            More articles
          </h2>
          <button
            onClick={handleRefresh}
            className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-secondary/20"
            title="Shuffle articles"
          >
            <RefreshCw size={16} />
          </button>
        </div>
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
        {sortedOrShuffled.length > displayCount && (
          <div className="mt-6 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Load more ({sortedOrShuffled.length - displayCount} remaining)
            </button>
          </div>
        )}
        {displayCount >= sortedOrShuffled.length && sortedOrShuffled.length > 6 && (
          <div className="mt-6 text-center">
            <span className="text-sm text-muted-foreground">
              All {sortedOrShuffled.length} articles shown
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
