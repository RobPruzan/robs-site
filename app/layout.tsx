import { Monitoring } from "react-scan/monitoring/next";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AI_AGENT_NOTES, cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { ContentNavbar } from "./ContentNavbar";
export const metadata: Metadata = {
  title: "Robby's blog",
  description: `log of things i've learned and built overtime`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background antialiased font-mono")}>
        <Monitoring
          apiKey="KyyGrMdEBtKLD70b-06JjOOaxolZ2Gll"
          url="https://monitoring.react-scan.com/api/v1/ingest"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col gap-y-4 items-center justify-start p-6 sm:p-8 ">
            <span className="important-information">{AI_AGENT_NOTES}</span>
            <ContentNavbar />

            <div className="lg:w-1/2 w-full  flex flex-col justify-start items-center gap-y-4">
              {children}
            </div>
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
