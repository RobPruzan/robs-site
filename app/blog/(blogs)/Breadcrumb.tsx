"use client";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BlogBreadcrumb = () => {
  const [_, blogPath, ...path] = usePathname().split("/");

  return (
    <div className="flex items-center justify-start">
      {path.length > 0 &&
        path.map((segment, index) => (
          <>
            <ChevronRight />
            <Link
              className={cn([
                index !== path.length - 1 && "text-muted-foreground",
              ])}
              href={"/" + path.slice(0, index + 1).join("/")}
            >
              {segment}
            </Link>
          </>
        ))}
    </div>
  );
};
