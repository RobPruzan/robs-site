import { getDirectories } from "@/lib/getDirectories";
import { articleNameMap } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
const createdAtMap: Record<string, Date> = {
  "infinite-canvas": new Date("2024-06-30"),
  "a-different-way-to-think-about-typescript": new Date("2024-07-27"),
  "react-from-scratch": new Date("2024-08-23"),
  "null-but-not-null": new Date("2024-09-22"),
};

const showArticles = [
  "infinite-canvas",
  "a-different-way-to-think-about-typescript",
  "react-from-scratch",
  "null-but-not-null",
];
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
