import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "testing",
  description: "hello",
  openGraph: {
    title: "testing",
    description: "hello",
    type: "article",
    publishedTime: "2025-08-27",
  },
  twitter: {
    card: "summary_large_image",
    title: "testing",
    description: "hello",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
