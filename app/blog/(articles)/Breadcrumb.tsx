"use client";
import { articleNameMap, cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BlogBreadcrumb = () => {
  const [_, blogPath, ...path] = usePathname().split("/");

  return (
    <div className="flex items-center justify-start">
      {path.length > 0 &&
        path.map((segment, index) => (
          <div key={index} className="flex items-end overflow-x-auto">
            <ChevronRight />
            <Link
              className={cn([
                index !== path.length - 1 && "text-muted-foreground",
              ])}
              href={"/" + path.slice(0, index + 1).join("/")}
            >
              {articleNameMap[segment as keyof typeof articleNameMap]}
            </Link>
          </div>
        ))}
    </div>
  );
};
