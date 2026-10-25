import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/*
  Link-preview fetchers: they read a page only to draw its card when someone shares a link (WhatsApp uses
  facebookexternalhit), and they obey robots.txt, so a blanket Disallow leaves every shared link bare. They never
  add the site to search results, so they are let in even while the site is closed to search engines.
*/
const PREVIEW_BOTS = ["facebookexternalhit", "Facebot", "Twitterbot", "LinkedInBot", "WhatsApp", "TelegramBot", "Slackbot", "Discordbot"];

export default function robots(): MetadataRoute.Robots {
  // Closed to search engines until launch: set ALLOW_INDEXING=true on the production domain only.
  if (process.env.ALLOW_INDEXING !== "true") {
    return { rules: [{ userAgent: PREVIEW_BOTS, allow: "/" }, { userAgent: "*", disallow: "/" }] };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", site.url).toString() };
}
