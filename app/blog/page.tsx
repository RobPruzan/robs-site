import { getDirectories } from "@/lib/getDirectories";
import { readdirSync, statSync } from "fs";
import { readdir } from "fs/promises";
import Link from "next/link";
import { join } from "path";

export default async function Page() {
  const directoryNames = await getDirectories("./app/blog/(articles)");
  return (
    <div className="w-full flex flex-col gap-y-2">
      {directoryNames.map((name) => (
        <Link className="underline" href={`/blog/${name}`}>
          {name}
        </Link>
      ))}
    </div>
  );
}
