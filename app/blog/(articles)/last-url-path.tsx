import { MoreArticles } from "@/components/more-articles";
import { getDirectories } from "@/lib/getDirectories";

export const MoreArticlesWithURLPath = async () => {
  const directoryNames = await getDirectories("./app/blog/(articles)");
  return <MoreArticles directoryNames={directoryNames} />;
};
