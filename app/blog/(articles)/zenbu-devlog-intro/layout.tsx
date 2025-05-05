import type { Metadata } from "next";

const title = "What is zenbu";
const description = "zenbu devlog intro";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2025-04-27",
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
