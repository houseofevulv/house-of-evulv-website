import { readingOgImage } from "@/lib/og-reading";
import { OG_SIZE } from "@/lib/og";
import { event } from "@/lib/content";

export const alt = `${event.name}: nomination terms`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return readingOgImage({
    label: event.name,
    title: "Nomination terms",
    subtitle: "Who can nominate, how nominations are verified, and how honourees are chosen.",
  });
}
