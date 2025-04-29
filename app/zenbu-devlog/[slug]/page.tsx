import { redirect } from "next/navigation";
import { getDirectories } from "@/lib/getDirectories";
import { isDevlog, showArticles } from "@/lib/utils";

export async function generateStaticParams() {
  const directoryNames = await getDirectories("./app/blog/(articles)");

  return directoryNames
    .filter((name) => showArticles.includes(name) && isDevlog[name])
    .map((slug) => ({
      slug,
    }));
}

export default function ZenbuDevlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/blog/${params.slug}`);
}
