import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rebuilding React from scratch",
  description:
    "A detailed explanation of the architecture I used to rebuild react",
  openGraph: {
    title: "Rebuilding React from scratch",
    description:
      "A detailed explanation of the architecture I used to rebuild react",
    type: "article",
    publishedTime: "2024-08-23",
  },
  twitter: {
    card: "summary",
    title: "Rebuilding React from scratch",
    description:
      "A detailed explanation of the architecture I used to rebuild react",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
