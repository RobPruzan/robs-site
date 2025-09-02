import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "test",
  description: "stuff",
  openGraph: {
    title: "test",
    description: "stuff",
    type: "article",
    publishedTime: "2025-08-27",
  },
  twitter: {
    card: "summary_large_image",
    title: "test",
    description: "stuff",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
