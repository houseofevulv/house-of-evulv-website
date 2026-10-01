import { readingOgImage } from "@/lib/og-reading";
import { OG_SIZE } from "@/lib/og";

export const alt = "House of Evulv privacy notice";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return readingOgImage({
    label: "Nigeria Data Protection Act 2023",
    title: "Privacy notice",
    subtitle: "What we collect, why we collect it, and how to exercise your rights.",
  });
}
