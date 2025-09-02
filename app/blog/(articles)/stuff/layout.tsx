import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "stuff",
  description: "idk",
  openGraph: {
    title: "stuff",
    description: "idk",
    type: "article",
    publishedTime: "2025-08-27",
  },
  twitter: {
    card: "summary_large_image",
    title: "stuff",
    description: "idk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
