"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const ContentNavbar = () => {
  const [base, ...path] = usePathname().split("/");

  return (
    <div className="border-b-2 w-full lg:w-1/2 justify-start gap-x-5 flex py-2">
      {/* -48px for the p-6 padding in page layout*/}
      <Link
        className={cn([path.at(0) !== "" && "text-muted-foreground"])}
        href={"/"}
      >
        Profile
      </Link>
      <Link
        href={"/blog"}
        className={cn([path.at(0) !== "blog" && "text-muted-foreground"])}
      >
        Blog
      </Link>
    </div>
  );
};
