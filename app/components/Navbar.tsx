"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isDevlog } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  // Check if current path is a devlog article
  const isDevlogArticle =
    pathname.startsWith("/blog/") &&
    Object.keys(isDevlog).some(
      (slug) => pathname === `/blog/${slug}` && isDevlog[slug]
    );

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl text-white/90 font-mono">
                Rob Pruzan
              </h1>
              <p className="text-white/40 font-mono text-sm max-w-xl mt-4">
                Next.js @vercel
              </p>
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex gap-6">
                <Link
                  href="/"
                  className={`text-sm font-mono ${
                    pathname === "/"
                      ? "text-white/90"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/blog"
                  className={`text-sm font-mono ${
                    pathname.startsWith("/blog") && !isDevlogArticle
                      ? "text-white/90"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/zenbu-devlog"
                  className={`text-sm font-mono ${
                    pathname.startsWith("/zenbu-devlog") || isDevlogArticle
                      ? "text-white/90"
                      : "text-white/60 hover:text-white/80"
                  }`}
                >
                  <span className="hidden sm:inline">Zenbu Devlog</span>
                  <span className="sm:hidden">Zenbu</span>
                </Link>
              </nav>
              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/RobPruzan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://x.com/RobKnight__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/robert-pruzan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
