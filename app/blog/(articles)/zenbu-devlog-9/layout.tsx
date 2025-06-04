import type { Metadata } from "next";

const title = "a tool to build tools";
const description = "zenbu devlog #9";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2025-06-04",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
