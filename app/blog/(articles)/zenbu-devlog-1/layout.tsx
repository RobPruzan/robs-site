

import type { Metadata } from "next";

const title = "Project snapshot";
const description = "zenbu devlog #1";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2024-04-27",
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
