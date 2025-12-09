import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rockship AI Solutions Showcase",
  description: "Showcase of innovative AI solutions by Rockship",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "bg-rockship-950 text-white")}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
