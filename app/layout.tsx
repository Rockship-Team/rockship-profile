import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rockship AI - Enterprise Generative AI & Intelligent Solutions",
    template: "%s | Rockship AI",
  },
  description:
    "Rockship AI provides enterprise-grade generative AI solutions, custom LLMs, computer vision pipelines, and secure cognitive infrastructure for the next generation of business.",
  keywords: [
    "Generative AI",
    "Enterprise AI",
    "LLM",
    "Computer Vision",
    "Machine Learning",
    "Rockship AI",
    "Artificial Intelligence Solutions",
  ],
  authors: [{ name: "Rockship AI Team" }],
  creator: "Rockship AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rockship.ai",
    title: "Rockship AI - Enterprise Generative AI & Intelligent Solutions",
    description:
      "Powering the next generation of business with secure, compliant, and scalable AI solutions.",
    siteName: "Rockship AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rockship AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rockship AI - Enterprise Generative AI",
    description: "Enterprise-grade generative AI infrastructure and solutions.",
    creator: "@rockshipai",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/rockship-symbol.svg",
    shortcut: "/rockship-symbol.svg",
    apple: "/rockship-symbol.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#02040a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          dmSans.className,
          dmSans.variable,
          "bg-rockship-950 text-white"
        )}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
