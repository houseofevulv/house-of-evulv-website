import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

// Shared pieces for the Open Graph images (app/**/opengraph-image.tsx). Rendered at build time.

export const OG_SIZE = { width: 1200, height: 630 };

// House of Evulv Identity 2 palette (brand manual, section 06)
export const C = {
  ivory: "#F6F2E8",
  ink: "#0C1529",
  espresso: "#0C1529",
  black: "#060B17",
  gold: "#D0A94F",
  bronze: "#7E6029",
  silver: "#CDD0D4",
  navy: "#10234F",
  onDark: "#E9E4D7",
  onDark2: "#C9CBCF",
  onDark3: "#9BA3B4",
  ruleDark: "#1F2D4C",
  muted: "#586072",
};

/** Heading style for preview images: Bungee, as on the site */
export const DISPLAY = { fontFamily: "Bungee", fontWeight: 400, letterSpacing: "0" } as const;

const root = process.cwd();

export async function ogFonts() {
  const load = (w: number) => readFile(join(root, `assets/fonts/Inter-${w}.ttf`));
  const bungee = await readFile(join(root, "assets/fonts/Bungee-400.ttf"));
  const [w500, w700, w800] = await Promise.all([load(500), load(700), load(800)]);
  return [
    { name: "Bungee", data: bungee, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: w500, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: w700, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: w800, weight: 800 as const, style: "normal" as const },
  ];
}

/** Resized copies of the site photos live in assets/og */
export async function ogPhoto(name: string) {
  const buf = await readFile(join(root, `assets/og/${name}.jpg`));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

/** PNG artwork prepared for previews, in assets/og */
export async function ogPng(name: string) {
  const buf = await readFile(join(root, `assets/og/${name}.png`));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export async function ogSvg(path: string) {
  const buf = await readFile(join(root, "public", path));
  return `data:image/svg+xml;base64,${buf.toString("base64")}`;
}

/**
 * The gold horizon and ribbons from the site's heroes, along the foot of a 1168px panel. A pre-rendered image
 * (assets/og/gold-band.png, with the panel's rounded bottom corners), since preview images cannot run the SVG effects.
 * Give the panel position: relative and keep its content above the bottom 120px.
 */
export function GoldBand({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      width={1168}
      height={170}
      style={{ position: "absolute", left: 0, bottom: 0, width: 1168, height: 170 }}
    />
  );
}

/** The page gutter and rounded panel used across the site */
export function Frame({ children, background = C.ivory }: { children: ReactNode; background?: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 16, background, fontFamily: "Inter" }}>
      {children}
    </div>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        borderRadius: 999,
        background: C.espresso,
        color: C.ivory,
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      <div style={{ width: 10, height: 10, borderRadius: 999, background: C.gold }} />
      {children}
    </div>
  );
}

/**
 * ImageResponse only renders PNG, which is heavy for photographs. WhatsApp often drops preview images much
 * over 300 KB, so photo previews are re-encoded as JPEG.
 */
export async function asJpeg(image: Response) {
  const sharp = (await import("sharp")).default;
  const jpeg = await sharp(Buffer.from(await image.arrayBuffer())).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg", "Cache-Control": "public, max-age=86400, immutable" },
  });
}
