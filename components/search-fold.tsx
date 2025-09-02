"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, ChevronDown, ChevronRight } from "lucide-react";
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
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [showAllMatches, setShowAllMatches] = useState<Set<string>>(new Set());
  const [subSearchQueries, setSubSearchQueries] = useState<Record<string, string>>({});
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
      setHasSearched(false);
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsStreaming(true);
    setHasSearched(false); // Reset until we get results
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
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete lines
        const lines = buffer.split('\n');
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              setIsStreaming(false);
              setHasSearched(true);
            } else if (data && data !== '') {
              try {
                // Parse the JSON data
                const result = JSON.parse(data) as SearchResult;
                streamResults.push(result);
                // Clear old results only when first new result arrives
                if (firstResult) {
                  setResults([result]);
                  // Auto-expand first results
                  setExpandedResults(new Set([result.slug]));
                  firstResult = false;
                } else {
                  // Update results immediately for instant feedback
                  setResults([...streamResults]);
                  // Auto-expand all results by default
                  setExpandedResults(new Set(streamResults.map(r => r.slug)));
                }
              } catch (e) {
                // Only log if it's not an empty string
                if (data.length > 0) {
                  console.error('Parse error for data:', data, e);
                }
              }
            }
          }
        }
      }
      
      // Process any remaining data in buffer
      if (buffer && buffer.startsWith('data: ')) {
        const data = buffer.slice(6).trim();
        if (data && data !== '[DONE]' && data !== '') {
          try {
            const result = JSON.parse(data) as SearchResult;
            streamResults.push(result);
            setResults([...streamResults]);
          } catch (e) {
            console.error('Parse error for remaining buffer:', data, e);
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

  // Toggle expanded state for a result
  const toggleExpanded = (slug: string) => {
    setExpandedResults(prev => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  // Handle sub-search query change
  const handleSubSearchChange = (slug: string, subQuery: string) => {
    setSubSearchQueries(prev => ({
      ...prev,
      [slug]: subQuery
    }));
  };

  // Filter matches based on sub-search
  const getFilteredMatches = (result: SearchResult) => {
    const subQuery = subSearchQueries[result.slug] || '';
    if (!subQuery) return result.matches;
    
    return result.matches.filter(match => 
      match.context.toLowerCase().includes(subQuery.toLowerCase()) ||
      match.text.toLowerCase().includes(subQuery.toLowerCase())
    );
  };

  // Focus input when opened (but not on mobile to prevent zoom)
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Check if mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                       window.innerWidth < 768;
      
      if (!isMobile) {
        inputRef.current.focus();
      }
    } else if (!isOpen) {
      // Clear everything when closed
      setQuery("");
      setResults([]);
      setHasSearched(false);
      setExpandedResults(new Set());
      setShowAllMatches(new Set());
      setSubSearchQueries({});
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
              className="flex-1 bg-transparent text-white text-base md:text-sm font-mono outline-none placeholder:text-white/30"
              autoComplete="off"
              spellCheck={false}
              style={{ fontSize: '16px' }} // Prevents zoom on iOS when font-size < 16px
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
            {results.map((result, index) => {
              const isExpanded = expandedResults.has(result.slug);
              const filteredMatches = getFilteredMatches(result);
              
              return (
                <div
                  key={`${result.slug}-${index}`}
                  className="border-b border-white/5 last:border-0"
                >
                  {/* Article header - clickable to expand/collapse */}
                  <div className="py-3">
                    <div 
                      className="flex items-center justify-between cursor-pointer hover:bg-white/[0.02] -mx-2 px-2 py-1 rounded"
                      onClick={() => toggleExpanded(result.slug)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-white/40">
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                        <h3 className="text-white/80 font-mono text-sm">
                          {highlightMatch(result.title, query)}
                        </h3>
                        <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                          result.type === "brain" 
                            ? "bg-purple-500/20 text-purple-300" 
                            : "bg-blue-500/20 text-blue-300"
                        }`}>
                          {result.type}
                        </span>
                      </div>
                      <span className="text-white/30 text-xs font-mono">
                        {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                      </span>
                    </div>
                    
                    {/* Expanded content with sub-search and matches */}
                    {isExpanded && (
                      <div className="mt-3 ml-6 space-y-3">
                        {/* Sub-search input */}
                        {result.matches.length > 5 && (
                          <div className="flex items-center gap-2 mb-3">
                            <Search className="text-white/30" size={14} />
                            <input
                              type="text"
                              placeholder="Filter matches..."
                              value={subSearchQueries[result.slug] || ''}
                              onChange={(e) => handleSubSearchChange(result.slug, e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 bg-white/5 text-white text-xs font-mono outline-none placeholder:text-white/20 px-2 py-1 rounded"
                              style={{ fontSize: '14px' }}
                            />
                            <span className="text-white/30 text-xs">
                              {filteredMatches.length}/{result.matches.length}
                            </span>
                          </div>
                        )}
                        
                        {/* Match list */}
                        <div className={`space-y-2 ${showAllMatches.has(result.slug) ? 'max-h-[300px] overflow-y-auto border border-white/10 rounded-lg p-2 bg-white/[0.02]' : ''}`}>
                          {filteredMatches.length === 0 ? (
                            <div className="text-white/30 text-xs font-mono py-2">
                              No matches found for filter
                            </div>
                          ) : (
                            (() => {
                              const showAll = showAllMatches.has(result.slug);
                              const matchesToShow = showAll ? filteredMatches : filteredMatches.slice(0, 3);
                              const hasMore = filteredMatches.length > 3;
                              
                              return (
                                <>
                                  {matchesToShow.map((match, matchIdx) => (
                              <Link
                                key={matchIdx}
                                href={(() => {
                                  // Build URL with search params for shareable links
                                  const lines = match.context.split('\n');
                                  const matchingLine = lines.find(line => 
                                    line.toLowerCase().includes(query.toLowerCase())
                                  ) || match.text;
                                  
                                  const params = new URLSearchParams({
                                    q: query,
                                    text: matchingLine.trim(),
                                    line: match.lineNumber.toString(),
                                    context: match.context,
                                    idx: matchIdx.toString(),
                                    before: lines[0] || '',
                                    after: lines[lines.length - 1] || ''
                                  });
                                  
                                  return `/blog/${result.slug}?${params.toString()}`;
                                })()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onClose();
                                }}
                                className="block p-2 rounded hover:bg-white/5 group"
                              >
                                <div className="text-xs font-mono">
                                  <div className="text-white/30 mb-1">Line {match.lineNumber}</div>
                                  <div className="text-white/50 leading-relaxed">
                                    {(() => {
                                      const context = match.context;
                                      // Clean up MDX/markdown syntax
                                      const cleaned = context
                                        .replace(/^#+\s/gm, '')
                                        .replace(/\*\*(.*?)\*\*/g, '$1')
                                        .replace(/\*(.*?)\*/g, '$1')
                                        .replace(/`(.*?)`/g, '$1')
                                        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                                        .replace(/^[-*+]\s/gm, '• ')
                                        .trim();
                                      
                                      // Highlight both main query and sub-query
                                      let highlighted = highlightMatch(cleaned, query);
                                      const subQuery = subSearchQueries[result.slug];
                                      if (subQuery && subQuery !== query) {
                                        // This is a bit hacky but works for highlighting multiple terms
                                        if (typeof highlighted === 'string') {
                                          highlighted = highlightMatch(highlighted, subQuery);
                                        }
                                      }
                                      
                                      return highlighted;
                                    })()}
                                  </div>
                                </div>
                              </Link>
                                  ))}
                                  {hasMore && !showAll && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowAllMatches(prev => {
                                          const newSet = new Set(prev);
                                          newSet.add(result.slug);
                                          return newSet;
                                        });
                                      }}
                                      className="w-full text-center text-xs font-mono py-2 px-3 mt-2 rounded-md bg-white/10 hover:bg-white/15 text-white/70 hover:text-white/90 border border-white/20 hover:border-white/30 transition-all"
                                    >
                                      ↓ Show {filteredMatches.length - 3} more matches ↓
                                    </button>
                                  )}
                                  {hasMore && showAll && (
                                    <>
                                      {filteredMatches.length > 5 && (
                                        <div className="text-center text-xs text-white/30 font-mono py-1">
                                          ↕ Scroll for more results ↕
                                        </div>
                                      )}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setShowAllMatches(prev => {
                                            const newSet = new Set(prev);
                                            newSet.delete(result.slug);
                                            return newSet;
                                          });
                                        }}
                                        className="w-full text-center text-xs font-mono py-1.5 px-2 rounded hover:bg-white/5 text-white/40 hover:text-white/60"
                                      >
                                        ↑ Show less
                                      </button>
                                    </>
                                  )}
                                </>
                              );
                            })()
                          )}
                        </div>
                        
                        {/* Quick link to article */}
                        <Link
                          href={`/blog/${result.slug}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/60 font-mono"
                        >
                          Go to article →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Only show "no results" after we've actually completed a search */}
            {!isStreaming && hasSearched && query && query.length >= 2 && results.length === 0 && (
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