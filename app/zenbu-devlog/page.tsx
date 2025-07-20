import { getDirectories } from "@/lib/getDirectories";
import {
  articleNameMap,
  createdAtMap,
  descriptionMap,
  isDevlog,
  showArticles,
} from "@/lib/utils";
import { BlogList } from "../blog/BlogList";
import { Github } from "lucide-react";

export default async function ZenbuDevlogPage() {
  const directoryNames = await getDirectories("./app/blog/(articles)");

  const articles = directoryNames
    .filter((name) => showArticles.includes(name) && isDevlog[name])
    .sort((a, b) => {
      const aDate = createdAtMap[a];
      const bDate = createdAtMap[b];
      return bDate.getTime() - aDate.getTime();
    })
    .map((name) => ({
      name,
      title: articleNameMap[name as keyof typeof articleNameMap],
      date: createdAtMap[name],
      description: descriptionMap[name as keyof typeof descriptionMap],
      isZenbuDevlog: true,
    }));

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 pb-3">
      <div className="space-y-12">
        {/* <div className="-mt-2 -mb-4">
          <a
            href="https://github.com/RobPruzan/zenbu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white/90 transition-colors font-mono text-sm"
          >
            <Github size={16} />
          </a>
        </div> */}
        {articles.map((article) => (
          <a
            key={article.name}
            href={`/blog/${article.name}`}
            className="block group"
          >
            <article className="space-y-2">
              <h2 className="text-xl text-white/90 font-mono group-hover:underline">
                {article.description}
              </h2>
              {/* {article.description && (
                <p className="text-base text-white/60 font-mono">
                  {article.description}
                </p>
              )} */}
              <div className="text-white/40 text-sm font-mono">
                {article.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
}
