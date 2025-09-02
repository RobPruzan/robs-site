import { MoreArticles } from "@/components/more-articles";
import { MoreArticlesWithURLPath } from "./last-url-path";
import { BackButton } from "./BackButton";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 pt-8 pb-4 relative">
        <BackButton />

        <article
          className="mx-auto prose prose-invert 
          prose-p:text-white/80 prose-p:font-mono prose-p:leading-relaxed
          prose-headings:font-mono prose-headings:text-white/90
          prose-code:text-white/90 prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-[#0A0A0B] prose-pre:border prose-pre:border-white/[0.08]
          max-w-none md:max-w-3xl
          prose-a:text-white/60 prose-a:no-underline hover:prose-a:text-white/80
        "
        >
          {children}
        </article>

        <MoreArticlesWithURLPath />
      </div>
    </div>
  );
}
