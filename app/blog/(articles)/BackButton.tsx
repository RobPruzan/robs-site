"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isDevlog } from "@/lib/utils";

export function BackButton() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  // Determine if this is a Zenbu devlog article
  const isZenbuDevlog = slug ? isDevlog[slug] : false;

  return (
    <div className="flex items-center gap-4 absolute top-2 md:top-0">
      <Link href={isZenbuDevlog ? "/zenbu-devlog" : "/blog"} className="">
        <ArrowLeft size={20} />
      </Link>
    </div>
  );
}
