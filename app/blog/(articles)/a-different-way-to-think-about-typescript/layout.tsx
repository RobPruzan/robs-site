import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A different way to think about TypeScript",
  description:
    "Thinking of TypeScript as a functional language that operates on sets",
  openGraph: {
    title: "A different way to think about TypeScript",
    description:
      "Thinking of TypeScript as a functional language that operates on sets",
    type: "article",
    publishedTime: "2024-07-27",
  },
  twitter: {
    card: "summary_large_image",
    title: "A different way to think about TypeScript",
    description:
      "Thinking of TypeScript as a functional language that operates on sets",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
