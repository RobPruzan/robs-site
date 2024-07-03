import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building a Multiplayer Infinite Canvas with React and WebSockets",
  description:
    "Making a pannable and zoomable infinite canvas with multiplayer support",
  openGraph: {
    title: "Building a Multiplayer Infinite Canvas with React and WebSockets",
    description:
      "Comprehensive guide on implementing an infinite canvas with multiplayer support using React and WebSockets.",
    type: "article",
    publishedTime: "2024-06-30",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Multiplayer Infinite Canvas",
    description:
      "Making a pannable and zoomable infinite canvas with multiplayer support",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
