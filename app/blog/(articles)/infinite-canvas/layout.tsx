import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building a Multiplayer Infinite Canvas with React and WebSockets",
  description:
    "Learn how to implement a pannable and zoomable infinite canvas in React, and integrate multiplayer functionality using WebSockets. This guide covers rendering geometry, panning, zooming, and real-time collaboration.",
  openGraph: {
    title: "Building a Multiplayer Infinite Canvas with React and WebSockets",
    description:
      "Comprehensive guide on implementing an infinite canvas with multiplayer support using React and WebSockets.",
    type: "article",
    publishedTime: "2024-06-30",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building a Multiplayer Infinite Canvas with React and WebSockets",
    description:
      "Learn to create a multiplayer infinite canvas using React and WebSockets, covering rendering, panning, zooming, and real-time collaboration.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
