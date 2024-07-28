import { getDirectories } from "@/lib/getDirectories";
import { articleNameMap } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";




const showArticles = ["infinite-canvas", "a-different-way-to-think-about-typescript"]
export default async function Page() {
  const directoryNames = await getDirectories("./app/blog/(articles)")
  return (
    <div className="w-full flex flex-col gap-y-2">

      {directoryNames.filter(name => showArticles.includes(name)).map((name) => (
        <div className="flex items-center gap-x-1">

-
        <Link className="underline underline-offset-4" href={`/blog/${name}`}>
           {articleNameMap[name as keyof typeof articleNameMap]}
        </Link>
        </div>
      ))}

      {/* <ProximityChat /> */}
    </div>
  );
}
