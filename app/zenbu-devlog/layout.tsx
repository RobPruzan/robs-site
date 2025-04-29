import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zenbu Devlog",
  description: "Development logs for the Zenbu project",
  openGraph: {
    title: "Zenbu Devlog",
    description: "Development logs for the Zenbu project",
  },
  twitter: {
    card: "summary",
    title: "Zenbu Devlog",
    description: "Development logs for the Zenbu project",
  },
};

export default function ZenbuDevlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 