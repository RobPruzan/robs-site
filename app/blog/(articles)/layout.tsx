import { MoreArticles } from "@/components/more-articles";
import { MoreArticlesWithURLPath } from "./last-url-path";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <article className="w-full justify-start prose prose-sm max-w-none dark:prose-invert">
      {children}

      <MoreArticlesWithURLPath />
    </article>
  );
}
