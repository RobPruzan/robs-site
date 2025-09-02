import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello World: A New Beginning",
  description: "Welcome to my blog! Join me on my journey through web development, system design, and the exciting world of technology.",
  openGraph: {
    title: "Hello World: A New Beginning",
    description: "Welcome to my blog! Join me on my journey through web development, system design, and the exciting world of technology.",
    type: "article",
    publishedTime: "2025-08-29",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello World: A New Beginning",
    description: "Welcome to my blog! Join me on my journey through web development, system design, and the exciting world of technology.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
