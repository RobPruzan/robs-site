import type { Metadata } from "next";

const title = "session replay to mp4, and fast";
const description =
  "converting a session replay to an mp4 without waiting 40 minutes";
const imageUrl = "/replay/dep-graph.png";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2025-05-01",
    images: [
      {
        url: imageUrl,
        alt: "Session replay dependency graph",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
