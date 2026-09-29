import type { Metadata } from "next";
import { site } from "./content";

/**
 * Open Graph fields for a page. A page's `openGraph` replaces the layout's rather than merging with it,
 * so every page builds the full set here. The image comes from the route's opengraph-image.tsx.
 */
export function pageOpenGraph(path: string, title: string, description: string): Metadata["openGraph"] {
  return { title, description, url: path, siteName: site.name, locale: "en_NG", type: "website" };
}

/**
 * Base for absolute URLs in metadata (preview images, canonical links). Until launch the real domain isn't
 * connected, so previews point at the project's public Vercel address; ALLOW_INDEXING=true switches to site.url.
 */
export function metadataBaseUrl() {
  if (process.env.ALLOW_INDEXING === "true") return new URL(site.url);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(process.env.NODE_ENV === "production" ? site.url : "http://localhost:3100");
}
