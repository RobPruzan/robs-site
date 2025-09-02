import type { MDXComponents } from "mdx/types";
import { PrismEditor } from "@/lib/PrismEditor";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children, ...props }: any) => {
      // Extract the code from the pre > code structure
      const codeElement = children?.props;
      if (!codeElement) return <pre {...props}>{children}</pre>;
      
      const className = codeElement.className || '';
      const language = className.replace(/language-/, '');
      const code = codeElement.children || '';
      
      // Map common languages to supported ones
      const languageMap: Record<string, "tsx" | "python"> = {
        typescript: "tsx",
        ts: "tsx", 
        javascript: "tsx",
        js: "tsx",
        jsx: "tsx",
        tsx: "tsx",
        swift: "tsx", // Use tsx highlighting for Swift
        python: "python",
        py: "python",
      };
      
      const mappedLanguage = languageMap[language] || "tsx";
      
      // Use PrismEditor for syntax highlighting
      return (
        <div className="my-4 rounded-lg overflow-hidden border border-white/[0.08]">
          <PrismEditor code={code} language={mappedLanguage} />
        </div>
      );
    },
    code: ({ children, ...props }: any) => {
      // Inline code styling
      return (
        <code 
          className="text-white/90 bg-white/5 px-1 py-0.5 rounded text-sm"
          {...props}
        >
          {children}
        </code>
      );
    },
  };
}
