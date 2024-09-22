import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "null, but also not null",
  description:
    "How the empty set can be useful in typescript",
  openGraph: {
    title: "null, but also not null",
    description:
      "How the empty set can be useful in typescript",
    type: "article",
    publishedTime: "2024-09-22",
  },
  twitter: {
    card: "summary",
    title: "null, but also not null",
    description:
      "How the empty set can be useful in typescript",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
