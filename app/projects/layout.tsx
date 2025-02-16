import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Robby Pruzan",
  description: "Detailed overview of my projects and work",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <main className="px-6 py-16">
        <div className="max-w-[1000px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 