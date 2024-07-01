"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { BlogBreadcrumb } from "./blog/(articles)/Breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";

export const ContentNavbar = () => {
  const [_, ...path] = usePathname().split("/");

  return (
    <div className="border-b-2 w-full lg:w-1/2 justify-start items-end gap-x-7 flex pt-2 pb-px">
      {/* -48px for the p-6 padding in page layout*/}
      <Link
        className={cn([path.at(0) !== "" && "text-muted-foreground"])}
        href={"/"}
      >
        Profile
      </Link>
      <div className="flex items-center">
        <Link
          href={"/blog"}
          className={cn([path.at(-1) !== "blog" && "text-muted-foreground"])}
        >
          Blog
        </Link>
        <BlogBreadcrumb />
      </div>
      <ThemeToggle className="ml-auto h-fit w-fit py-2 px-3" />
    </div>
  );
};
