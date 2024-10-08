import { getDirectories } from "@/lib/getDirectories";
import { articleNameMap, createdAtMap, showArticles } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
export default async function Page() {
  const directoryNames = await getDirectories("./app/blog/(articles)");
  return (
    <div className="w-full flex flex-col gap-y-2">
      {directoryNames
        .filter((name) => showArticles.includes(name))
        .sort((a, b) => {
          const aDate = createdAtMap[a];
          const bDate = createdAtMap[b];
          return bDate.getTime() - aDate.getTime();
        })
        .map((name) => (
          <div className="flex items-center gap-x-1 w-full justify-between">
            <div className="flex gap-x-4">
              -
              <Link
                className="underline underline-offset-4"
                href={`/blog/${name}`}
              >
                
                {articleNameMap[name as keyof typeof articleNameMap] ?? name}
              </Link>
            </div>
            <span>{createdAtMap[name].toLocaleDateString()}</span>
          </div>
        ))}
    </div>
  );
}
