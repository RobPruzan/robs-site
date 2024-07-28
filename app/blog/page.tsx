import { getDirectories } from "@/lib/getDirectories";
import Image from "next/image";
import Link from "next/link";
const showArticles = ["infinite-canvas", "a-different-way-to-think-about-typescript"]
export default async function Page() {
  const directoryNames = await getDirectories("./app/blog/(articles)")
  return (
    <div className="w-full flex flex-col gap-y-2">

      {directoryNames.filter(name => showArticles.includes(name)).map((name) => (
        <Link className="underline" href={`/blog/${name}`}>
          {name}
        </Link>
      ))}

      {/* <ProximityChat /> */}
    </div>
  );
}
