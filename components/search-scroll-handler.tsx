"use client";

import { useEffect, useLayoutEffect } from "react";

export function SearchScrollHandler() {
  // Use useLayoutEffect to run before paint but after DOM is ready
  // Fall back to useEffect for SSR
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  
  useIsomorphicLayoutEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Read search params using raw JS to avoid SSR issues
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const text = urlParams.get('text');
    const lineNumber = urlParams.get('line');
    const fullContext = urlParams.get('context');
    const beforeContext = urlParams.get('before');
    const afterContext = urlParams.get('after');
    const matchIndex = parseInt(urlParams.get('idx') || '0', 10); // Get which match was clicked
    
    if (query && text) {
      try {
        
        // Disable Next.js scroll restoration temporarily
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        
        // Use requestAnimationFrame to ensure DOM is ready and painted
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Find all text nodes in the article
            const article = document.querySelector('article');
            if (!article) return;
            
            // Function to find text in DOM with context matching
            const findAndScrollToText = (searchText: string, targetMatchIndex: number = 0) => {
              const walker = document.createTreeWalker(
                article,
                NodeFilter.SHOW_TEXT,
                {
                  acceptNode: (node) => {
                    // Skip script and style nodes
                    const parent = node.parentElement;
                    if (parent?.tagName === 'SCRIPT' || parent?.tagName === 'STYLE') {
                      return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                  }
                }
              );
              
              let node;
              let currentMatchIndex = 0;
              const allMatches: { node: Node; index: number; parent: Element }[] = [];
              
              // First, collect all potential matches
              while (node = walker.nextNode()) {
                const nodeText = node.textContent || '';
                const searchLower = searchText.toLowerCase();
                const nodeLower = nodeText.toLowerCase();
                
                // Check all occurrences in this text node
                let searchIndex = 0;
                while ((searchIndex = nodeLower.indexOf(searchLower, searchIndex)) !== -1) {
                  const parent = node.parentElement;
                  if (parent) {
                    allMatches.push({ node, index: searchIndex, parent });
                  }
                  searchIndex += searchLower.length;
                }
              }
              
              // Select the match at the target index
              let targetMatch = allMatches[targetMatchIndex];
              
              // If the exact index doesn't exist, try to match by context
              if (!targetMatch && beforeContext && afterContext && allMatches.length > 0) {
                // Try to find the match with the right context
                for (let i = 0; i < allMatches.length; i++) {
                  const match = allMatches[i];
                  const parent = match.parent;
                  const parentText = parent.textContent || '';
                  
                  // Check if the surrounding context matches
                  if (parentText.includes(beforeContext) || parentText.includes(afterContext)) {
                    targetMatch = match;
                    break;
                  }
                }
              }
              
              // Fallback to the first match if nothing else works
              if (!targetMatch && allMatches.length > 0) {
                targetMatch = allMatches[0];
              }
              
              // Apply highlighting to the selected match
              if (targetMatch) {
                const { node, index, parent } = targetMatch;
                const nodeText = node.textContent || '';
                const matchIndex = index;
                
                // Split the text node
                const beforeText = nodeText.substring(0, matchIndex);
                const matchText = nodeText.substring(matchIndex, matchIndex + searchText.length);
                const afterText = nodeText.substring(matchIndex + searchText.length);
                
                // Create new nodes
                const beforeNode = document.createTextNode(beforeText);
                const matchSpan = document.createElement('span');
                matchSpan.textContent = matchText;
                matchSpan.style.backgroundColor = 'rgba(250, 204, 21, 0.3)'; // yellow-400 with opacity
                matchSpan.style.color = 'rgb(250, 204, 21)'; // yellow-400
                matchSpan.style.fontWeight = 'bold';
                matchSpan.id = 'search-scroll-target';
                
                const afterNode = document.createTextNode(afterText);
                
                // Replace the original text node
                parent.replaceChild(afterNode, node);
                parent.insertBefore(matchSpan, afterNode);
                if (beforeText) {
                  parent.insertBefore(beforeNode, matchSpan);
                }
                
                // Force immediate scroll without animation
                const rect = matchSpan.getBoundingClientRect();
                const absoluteTop = rect.top + window.pageYOffset;
                
                // Scroll instantly with offset for header
                window.scrollTo(0, absoluteTop - 100);
                
                return true;
              }
              
              return false;
            };
            
            // Try to find exact text first with the specific match index
            if (!findAndScrollToText(text, matchIndex)) {
              // If not found, try with just the query at the same index
              findAndScrollToText(query, matchIndex);
            }
            
            // Re-enable scroll restoration after scrolling
            setTimeout(() => {
              if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
              }
              
              // DON'T clean up URL params - keep them for shareability
              // The URL with params is what makes the link shareable
            }, 50);
          });
        });
      } catch (error) {
        console.error('Error parsing search scroll target:', error);
      }
    }
  }, []);
  
  return null;
}