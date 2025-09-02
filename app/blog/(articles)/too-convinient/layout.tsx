import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "too convinient",
  description: "its usually much harder",
  openGraph: {
    title: "too convinient",
    description: "its usually much harder",
    type: "article",
    publishedTime: "2025-09-02",
  },
  twitter: {
    card: "summary_large_image",
    title: "too convinient",
    description: "its usually much harder",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
