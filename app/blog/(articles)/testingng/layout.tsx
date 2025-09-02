import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "testingng",
  description: "hello",
  openGraph: {
    title: "testingng",
    description: "hello",
    type: "article",
    publishedTime: "2025-08-27",
  },
  twitter: {
    card: "summary_large_image",
    title: "testingng",
    description: "hello",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
