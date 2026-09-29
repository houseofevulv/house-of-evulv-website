import { readingOgImage } from "@/lib/og-reading";
import { OG_SIZE } from "@/lib/og";
import { site } from "@/lib/content";

export const alt = `${site.name}: our story`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return readingOgImage({
    label: site.tagline,
    title: "Our story",
    subtitle: "Why the House exists, and the people it was built to honour and support.",
  });
}
