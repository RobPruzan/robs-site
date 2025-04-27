import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zenbu Devlog Intro",
  description: "Introduction to my new project and why I'm building it",
  openGraph: {
    title: "Zenbu Devlog Intro",
    description: "Intro to my new project and why I'm building it",
    type: "article",
    publishedTime: "2024-09-22",
  },
  twitter: {
    card: "summary",
    title: "Zenbu Devlog Intro",
    description: "Introduction to my new project and why I'm building it",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
