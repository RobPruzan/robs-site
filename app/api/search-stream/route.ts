import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";

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

function searchInFile(content: string, query: string): SearchMatch[] {
  const lines = content.split('\n');
  const matches: SearchMatch[] = [];
  const lowerQuery = query.toLowerCase();
  
  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(lowerQuery)) {
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

// Cache article content reading with 2 hour revalidation
const getCachedArticleContent = unstable_cache(
  async (mdxPath: string) => {
    try {
      const content = fs.readFileSync(mdxPath, 'utf-8');
      const { data, content: mdxContent } = matter(content);
      return { data, mdxContent };
    } catch (error) {
      console.error(`Error reading ${mdxPath}:`, error);
      return null;
    }
  },
  ['article-content'],
  {
    revalidate: 7200, // 2 hours in seconds
    tags: ['articles']
  }
);

// Cache directory listing with 2 hour revalidation
const getCachedArticleDirs = unstable_cache(
  async () => {
    const blogDir = path.join(process.cwd(), 'app/blog/(articles)');
    try {
      return fs.readdirSync(blogDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (error) {
      console.error('Error reading blog directory:', error);
      return [];
    }
  },
  ['article-dirs'],
  {
    revalidate: 7200, // 2 hours in seconds
    tags: ['articles']
  }
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query || query.trim().length < 1) {
    return new Response('No query', { status: 400 });
  }

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Get cached article directories
        const articleDirs = await getCachedArticleDirs();
        
        // Stream results as we find them
        for (const dir of articleDirs) {
          const articlePath = path.join(process.cwd(), 'app/blog/(articles)', dir);
          const mdxPath = path.join(articlePath, 'page.mdx');
          
          // Check if file exists before trying to read
          if (fs.existsSync(mdxPath)) {
            // Get cached article content
            const articleData = await getCachedArticleContent(mdxPath);
            
            if (articleData) {
              const { data, mdxContent } = articleData;
              
              // Search in content
              const matches = searchInFile(mdxContent, query);
              
              // Also search in title
              const titleMatches = data.title && data.title.toLowerCase().includes(query.toLowerCase());
              
              if (matches.length > 0 || titleMatches) {
                const isBrain = dir.includes('devlog') || dir.includes('zenbu');
                
                const result: SearchResult = {
                  title: data.title || dir,
                  slug: dir,
                  type: isBrain ? "brain" : "blog",
                  matches: matches, // Return all matches, no limit
                  matchCount: matches.length
                };
                
                // Stream this result immediately
                const data_str = `data: ${JSON.stringify(result)}\n\n`;
                controller.enqueue(encoder.encode(data_str));
              }
            }
          }
        }
        
        // Send done signal
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        console.error('Error in search stream:', error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}