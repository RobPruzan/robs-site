import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface SearchResult {
  title: string;
  slug: string;
  type: "blog" | "brain";
  matches: Array<{
    text: string;
    lineNumber: number;
    context: string;
  }>;
  matchCount: number;
}

function searchInFile(content: string, query: string): Array<{ text: string; lineNumber: number; context: string }> {
  const lines = content.split('\n');
  const matches: Array<{ text: string; lineNumber: number; context: string }> = [];
  const lowerQuery = query.toLowerCase();
  
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(lowerQuery)) {
      // Get context (1 line before and after if available)
      const startIdx = Math.max(0, index - 1);
      const endIdx = Math.min(lines.length - 1, index + 1);
      const contextLines = lines.slice(startIdx, endIdx + 1);
      
      matches.push({
        text: line,
        lineNumber: index + 1,
        context: contextLines.join('\n')
      });
    }
  });
  
  return matches;
}

async function searchArticles(query: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  
  // Search in blog articles
  const blogDir = path.join(process.cwd(), 'app/blog/(articles)');
  
  try {
    const articleDirs = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const dir of articleDirs) {
      const articlePath = path.join(blogDir, dir);
      const mdxPath = path.join(articlePath, 'page.mdx');
      
      if (fs.existsSync(mdxPath)) {
        try {
          const content = fs.readFileSync(mdxPath, 'utf-8');
          const { data, content: mdxContent } = matter(content);
          
          // Search in content
          const matches = searchInFile(mdxContent, query);
          
          // Also search in title
          const titleMatches = data.title && data.title.toLowerCase().includes(query.toLowerCase());
          
          if (matches.length > 0 || titleMatches) {
            // Determine if it's a brain article (devlog)
            const isBrain = dir.includes('devlog') || dir.includes('zenbu');
            
            results.push({
              title: data.title || dir,
              slug: dir,
              type: isBrain ? "brain" : "blog",
              matches: matches.slice(0, 5), // Limit to 5 matches per file
              matchCount: matches.length
            });
          }
        } catch (error) {
          console.error(`Error reading ${mdxPath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading blog directory:', error);
  }
  
  // Sort by match count
  results.sort((a, b) => b.matchCount - a.matchCount);
  
  return results;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }
  
  try {
    const results = await searchArticles(query);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}