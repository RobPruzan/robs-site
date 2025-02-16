import { getDirectories } from "@/lib/getDirectories";
import { articleNameMap, createdAtMap, showArticles } from "@/lib/utils";
import { BlogList } from "./BlogList";

export default async function Page() {
  const directoryNames = await getDirectories("./app/blog/(articles)");

  const articles = directoryNames
    .filter((name) => showArticles.includes(name))
    .sort((a, b) => {
      const aDate = createdAtMap[a];
      const bDate = createdAtMap[b];
      return bDate.getTime() - aDate.getTime();
    })
    .map((name) => ({
      name,
      title: articleNameMap[name as keyof typeof articleNameMap],
      date: createdAtMap[name],
    }));

  return <BlogList articles={articles} />;
}
