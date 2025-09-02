"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface SearchMatch {
  text: string;
  lineNumber: number;
  context: string;
}

interface SearchResult {
  title: string;
  slug: string;
  type: "blog" | "brain";
  matches: SearchMatch[];
  matchCount: number;
}

export function SearchFold({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Stream search results
  const performSearch = useCallback(async (searchQuery: string) => {
    // Cancel previous search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!searchQuery.trim()) {
      // Don't clear results when query is empty - keep last results
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsStreaming(true);
    // DON'T clear results - keep showing previous results while new ones load

    try {
      const response = await fetch(`/api/search-stream?q=${encodeURIComponent(searchQuery)}`, {
        signal: abortController.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      const streamResults: SearchResult[] = [];
      let firstResult = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              setIsStreaming(false);
            } else if (data) {
              try {
                const result = JSON.parse(data) as SearchResult;
                streamResults.push(result);
                // Clear old results only when first new result arrives
                if (firstResult) {
                  setResults([result]);
                  firstResult = false;
                } else {
                  // Update results immediately for instant feedback
                  setResults([...streamResults]);
                }
              } catch (e) {
                console.error('Parse error:', e);
              }
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Search error:", error);
      }
    } finally {
      setIsStreaming(false);
    }
  }, []);

  // Instant search - NO DEBOUNCE, immediate execution
  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else if (!isOpen) {
      // Clear everything when closed
      setQuery("");
      setResults([]);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Function to highlight matching text
  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-500/30 text-yellow-200 font-bold">{part}</span> : 
        part
    );
  };

  return (
    <div 
      className={`overflow-hidden ${
        isOpen ? 'max-h-[80vh] mb-8' : 'max-h-0'
      }`}
    >
      <div className="bg-[#0A0A0B] border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 pb-6">
          {/* Search Header */}
          <div className="flex items-center gap-3 mb-4">
            <Search className="text-white/40 flex-shrink-0" size={18} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 bg-transparent text-white text-sm font-mono outline-none placeholder:text-white/30"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/60 flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto mt-4">
            {/* Show results as they stream in */}
            {results.map((result, index) => (
              <div
                key={`${result.slug}-${index}`}
                className="border-b border-white/5 last:border-0"
              >
                <Link
                  href={`/blog/${result.slug}`}
                  onClick={onClose}
                  className="block py-3 hover:bg-white/[0.02] group"
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-white/80 font-mono text-sm group-hover:text-white">
                      {highlightMatch(result.title, query)}
                    </h3>
                    <span className="text-white/20 text-xs font-mono">
                      {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  
                  {/* Show match snippets - clean and minimal */}
                  {result.matches.length > 0 && result.matches[0].context && (
                    <div className="mt-2 text-xs font-mono text-white/40 leading-relaxed">
                      <span className="text-white/20">L{result.matches[0].lineNumber}: </span>
                      {(() => {
                        const context = result.matches[0].context;
                        // Clean up MDX/markdown syntax for display
                        const cleaned = context
                          .replace(/^#+\s/gm, '') // Remove headers
                          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
                          .replace(/\*(.*?)\*/g, '$1') // Remove italic
                          .replace(/`(.*?)`/g, '$1') // Remove inline code
                          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
                          .replace(/^[-*+]\s/gm, '• ') // Convert lists
                          .trim();
                        
                        // Truncate if too long
                        const maxLength = 200;
                        const truncated = cleaned.length > maxLength 
                          ? cleaned.substring(0, maxLength) + '...'
                          : cleaned;
                        
                        return highlightMatch(truncated, query);
                      })()}
                    </div>
                  )}
                </Link>
              </div>
            ))}

            {/* Only show "no results" if we truly found nothing after searching */}
            {!isStreaming && query && results.length === 0 && (
              <div className="text-white/30 font-mono text-xs py-4">
                No results for &quot;{query}&quot;
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}