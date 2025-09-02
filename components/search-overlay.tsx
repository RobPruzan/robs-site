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

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Perform search via API
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery("");
      setResults([]);
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

  if (!isOpen) return null;

  // Function to highlight matching text
  const highlightMatch = (text: string, searchQuery: string) => {
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-500/30 text-yellow-200">{part}</span> : 
        part
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm"
    >
      <div className="absolute inset-x-0 top-0 bg-[#0A0A0B] border-b border-white/10">
        <div className="max-w-4xl mx-auto p-6">
          {/* Search Header */}
          <div className="flex items-center gap-4 mb-6">
            <Search className="text-white/40" size={24} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search article content..."
              className="flex-1 bg-transparent text-white text-lg font-mono outline-none placeholder:text-white/30"
            />
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/60"
            >
              <X size={24} />
            </button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="text-white/40 font-mono text-sm py-8 text-center">
              Searching...
            </div>
          )}

          {/* No results */}
          {!isLoading && query.length >= 2 && results.length === 0 && (
            <div className="text-white/40 font-mono text-sm py-8 text-center">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {/* Search instruction */}
          {query.length < 2 && !isLoading && (
            <div className="text-white/40 font-mono text-sm py-8 text-center">
              Type at least 2 characters to search
            </div>
          )}

          {/* Search Results */}
          <div className="max-h-[70vh] overflow-y-auto space-y-4">
            {results.map((result) => (
              <Link
                key={result.slug}
                href={`/blog/${result.slug}`}
                onClick={onClose}
                className="block p-4 rounded-lg border border-white/10 hover:border-white/20 bg-black/20 hover:bg-black/40 group"
              >
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      result.type === "brain" 
                        ? "bg-purple-500/20 text-purple-300" 
                        : "bg-blue-500/20 text-blue-300"
                    }`}>
                      {result.type}
                    </span>
                    <h3 className="text-white/90 font-mono group-hover:text-white">
                      {result.title}
                    </h3>
                    <span className="text-white/30 text-xs font-mono ml-auto">
                      {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs font-mono">
                    /blog/{result.slug}
                  </p>
                </div>
                
                {/* Show match snippets */}
                {result.matches.length > 0 && (
                  <div className="space-y-2 mt-3 border-t border-white/5 pt-3">
                    {result.matches.slice(0, 3).map((match, idx) => (
                      <div key={idx} className="text-xs font-mono">
                        <div className="text-white/30 mb-1">Line {match.lineNumber}:</div>
                        <div className="text-white/60 bg-white/5 p-2 rounded overflow-x-auto whitespace-pre-wrap break-words">
                          {highlightMatch(match.context, query)}
                        </div>
                      </div>
                    ))}
                    {result.matches.length > 3 && (
                      <div className="text-white/30 text-xs font-mono">
                        ...and {result.matches.length - 3} more matches
                      </div>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Click outside to close */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
        style={{ zIndex: -1 }}
      />
    </div>
  );
}