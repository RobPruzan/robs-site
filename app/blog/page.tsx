import { getDirectories } from "@/lib/getDirectories";
import Link from "next/link";
const showArticles = ["infinite-canvas"]
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
