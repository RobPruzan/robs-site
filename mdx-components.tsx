import type { MDXComponents } from "mdx/types";
import { MDXCodeBlock } from "@/components/mdx-code-block";

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
      
      // Use the client component
      return <MDXCodeBlock code={code} language={language} />;
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
