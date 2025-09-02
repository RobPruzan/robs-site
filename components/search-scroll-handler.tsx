"use client";

import { useEffect, useLayoutEffect } from "react";

export function SearchScrollHandler() {
  // Use useLayoutEffect to run before paint but after DOM is ready
  // Fall back to useEffect for SSR
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
  
  useIsomorphicLayoutEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Check for search scroll target in sessionStorage
    const scrollTargetStr = sessionStorage.getItem('searchScrollTarget');
    
    if (scrollTargetStr) {
      try {
        const scrollTarget = JSON.parse(scrollTargetStr);
        const { query, text } = scrollTarget;
        
        // Clear the storage so we don't scroll again on refresh
        sessionStorage.removeItem('searchScrollTarget');
        
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
            
            // Function to find text in DOM
            const findAndScrollToText = (searchText: string) => {
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
              while (node = walker.nextNode()) {
                const nodeText = node.textContent || '';
                const searchLower = searchText.toLowerCase();
                const nodeLower = nodeText.toLowerCase();
                
                // Check if this text node contains our search text
                if (nodeLower.includes(searchLower)) {
                  // Create a temporary span to wrap the matching text
                  const parent = node.parentElement;
                  if (parent) {
                    // Find the exact position of the match
                    const matchIndex = nodeLower.indexOf(searchLower);
                    
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
                }
              }
              
              return false;
            };
            
            // Try to find exact text first
            if (!findAndScrollToText(text)) {
              // If not found, try with just the query
              findAndScrollToText(query);
            }
            
            // Re-enable scroll restoration after scrolling
            setTimeout(() => {
              if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
              }
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