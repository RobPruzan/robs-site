import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "doing stuff",
  description: "stuf fstuff",
  openGraph: {
    title: "doing stuff",
    description: "stuf fstuff",
    type: "article",
    publishedTime: "2025-08-27",
  },
  twitter: {
    card: "summary_large_image",
    title: "doing stuff",
    description: "stuf fstuff",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
