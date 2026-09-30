import { readingOgImage } from "@/lib/og-reading";
import { OG_SIZE } from "@/lib/og";
import { event } from "@/lib/content";

export const alt = `${event.name}: selection terms`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return readingOgImage({
    label: event.name,
    title: "Selection terms",
    subtitle: "How honourees are chosen: independent panel, published criteria, no applications and no fees.",
  });
}
