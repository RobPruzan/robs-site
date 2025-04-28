import { Monitoring } from "react-scan/monitoring/next";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AI_AGENT_NOTES, cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "./components/Navbar";

export const metadata: Metadata = {
  title: "Rob's blog",
  description: `log of things i've learned and built overtime`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={cn("min-h-screen bg-gradient-to-b from-[#0A0A0B] via-black to-[#0A0A0B] antialiased font-mono")}>
          {/* <Monitoring
            apiKey="KyyGrMdEBtKLD70b-06JjOOaxolZ2Gll"
            url="https://monitoring.react-scan.com/api/v1/ingest"
          /> */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0A0A0B] via-[#070707] to-[#0C0C0E] backdrop-blur-3xl">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
  );
}
