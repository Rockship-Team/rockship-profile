import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { FeatureFlagProvider } from "@/components/FeatureFlagProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// Self-hosted DM Sans rather than next/font/google. The Google Fonts download
// runs at `next build` time and intermittently fails CI with "Error: fetch
// failed"; shipping the woff2 in-repo removes that network step and keeps the
// build hermetic (and protects the live self-hosted build too). This is the
// variable font (latin subset), so one file covers the 400/500/700 weights the
// design uses via Tailwind's font-normal / font-medium / font-bold.
const dmSans = localFont({
  src: "./fonts/dm-sans-latin.woff2",
  weight: "100 1000",
  variable: "--font-dm-sans",
  display: "swap",
  // Preload for faster font loading
  preload: true,
});

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image URLs. Its absence was the console
  // warning called out in the rebrand brief.
  metadataBase: new URL("https://rockship.co"),
  title: {
    default: "Rockship — Senior Engineering Teams for Companies Building Internationally",
    template: "%s | Rockship",
  },
  description:
    "Rockship places senior product engineers with teams in the US, Europe, Singapore and Japan. Team augmentation and dedicated product teams — sometimes called staff augmentation, but you get a senior team, not headcount.",
  keywords: [
    "team augmentation",
    "staff augmentation",
    "dedicated development team",
    "hire senior engineers",
    "software engineering partner",
    "Rockship",
    "Vietnam software development",
  ],
  authors: [{ name: "Rockship" }],
  creator: "Rockship",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rockship.co",
    title: "Rockship — Senior engineers who ship outcomes, not tickets",
    description:
      "Senior product engineers placed with teams in the US, Europe, Singapore and Japan — from architecture to production.",
    siteName: "Rockship",
    // Image comes from app/opengraph-image.tsx, generated at build time.
    // The previous /og-image.jpg and /twitter-image.jpg were referenced here
    // but never existed on disk, so every social preview was broken.
  },
  twitter: {
    card: "summary_large_image",
    title: "Rockship — Senior engineers who ship outcomes, not tickets",
    description:
      "Senior product engineers placed with teams in the US, Europe, Singapore and Japan.",
    creator: "@rockshipai",
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
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        {/* Preconnect to CDN for faster resource fetching */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for potential external resources */}
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
        {/* Preload critical above-the-fold assets */}
        <link rel="preload" href="/rockship.svg" as="image" type="image/svg+xml" />
      </head>
      <body
        className={cn(
          dmSans.className,
          dmSans.variable,
          "bg-white text-[#1D1D1F]",
        )}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics />
        <FeatureFlagProvider>{children}</FeatureFlagProvider>
      </body>
    </html>
  );
}
