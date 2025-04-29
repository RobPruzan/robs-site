import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zenbu Devlog",
  description: "devlogs about zenbu",
  openGraph: {
    title: "Zenbu Devlog",
    description: "devlogs about zenbu",
  },
  twitter: {
    card: "summary",
    title: "Zenbu Devlog",
    description: "devlogs about zenbu",
  },
};

export default function ZenbuDevlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
