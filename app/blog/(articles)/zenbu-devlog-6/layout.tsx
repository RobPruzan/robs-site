import type { Metadata } from "next";

const title = "Your software";
const description = "zenbu devlog #6";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2025-05-02",
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
