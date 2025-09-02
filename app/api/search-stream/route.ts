import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query || query.trim().length < 1) {
    return new Response('No query', { status: 400 });
  }

  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const blogDir = path.join(process.cwd(), 'app/blog/(articles)');
      
      try {
        const articleDirs = fs.readdirSync(blogDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        
        // Stream results as we find them
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
                const isBrain = dir.includes('devlog') || dir.includes('zenbu');
                
                const result: SearchResult = {
                  title: data.title || dir,
                  slug: dir,
                  type: isBrain ? "brain" : "blog",
                  matches: matches.slice(0, 5),
                  matchCount: matches.length
                };
                
                // Stream this result immediately
                const data_str = `data: ${JSON.stringify(result)}\n\n`;
                controller.enqueue(encoder.encode(data_str));
              }
            } catch (error) {
              console.error(`Error reading ${mdxPath}:`, error);
            }
          }
        }
        
        // Send done signal
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        console.error('Error reading blog directory:', error);
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