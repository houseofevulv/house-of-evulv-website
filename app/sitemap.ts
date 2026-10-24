import type { MetadataRoute } from "next";
import { nominations, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/sentinels-of-peace", priority: 0.9 },
    { path: "/100-days-of-peace", priority: 0.8 },
    { path: "/our-story", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
    { path: nominations.public ? "/nomination-terms" : "/selection-terms", priority: 0.3 },
  ];
  return pages.map((p) => ({ url: new URL(p.path, site.url).toString(), changeFrequency: "weekly", priority: p.priority }));
}
