import type { Metadata, Viewport } from "next";
import { Bungee, Inter } from "next/font/google";
import { MotionObserver } from "@/components/MotionObserver";
import { site } from "@/lib/content";
import { metadataBaseUrl } from "@/lib/metadata";
import "./globals.css";

// Body: Inter. Headings: Bungee, which has a single weight (400). Both chosen by the client after wearingfine.com.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: `${site.name} | Peace, healing and human development`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // noindex until launch; see app/robots.ts
  robots: process.env.ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/brand/icons/house-of-evulv_favicon.svg", type: "image/svg+xml" },
      { url: "/brand/icons/house-of-evulv_favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icons/house-of-evulv_app-icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/brand/icons/house-of-evulv_favicon.ico",
    apple: { url: "/brand/icons/house-of-evulv_app-icon-180.png", sizes: "180x180" },
  },
  openGraph: {
    siteName: site.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1E1712",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${inter.variable} ${bungee.variable}`} data-scroll-behavior="smooth">
      <body>
        <a
          href="#content"
          className="sr-only rounded-xl bg-espresso px-5 py-3 font-bold text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        {children}
        <MotionObserver />
      </body>
    </html>
  );
}
