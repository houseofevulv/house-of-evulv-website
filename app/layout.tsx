import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/lib/content";
import { metadataBaseUrl } from "@/lib/metadata";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
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
      { url: "/brand/house-of-evulv/svg/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/house-of-evulv/png/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/brand/house-of-evulv/png/favicon.ico",
    apple: { url: "/brand/house-of-evulv/png/favicon-180.png", sizes: "180x180" },
  },
  openGraph: {
    siteName: site.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F3F1EC",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <a
          href="#content"
          className="sr-only rounded-xl bg-forest px-5 py-3 font-bold text-bone focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
