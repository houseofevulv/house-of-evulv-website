import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";

// Shared pieces for the Open Graph images (app/**/opengraph-image.tsx). Rendered at build time.

export const OG_SIZE = { width: 1200, height: 630 };

export const C = {
  bone: "#F3F1EC",
  ink: "#121614",
  forest: "#16302B",
  forestInk: "#0B1A17",
  lime: "#C3DD6E",
  onDark: "#DCE3DD",
  onDark2: "#C9D3CD",
  onDark3: "#9FB0A8",
  ruleDark: "#2E4A42",
  muted: "#4F5752",
};

const root = process.cwd();

export async function ogFonts() {
  const load = (w: number) => readFile(join(root, `assets/fonts/Manrope-${w}.ttf`));
  const [w500, w700, w800] = await Promise.all([load(500), load(700), load(800)]);
  return [
    { name: "Manrope", data: w500, weight: 500 as const, style: "normal" as const },
    { name: "Manrope", data: w700, weight: 700 as const, style: "normal" as const },
    { name: "Manrope", data: w800, weight: 800 as const, style: "normal" as const },
  ];
}

/** Resized copies of the site photos live in assets/og */
export async function ogPhoto(name: string) {
  const buf = await readFile(join(root, `assets/og/${name}.jpg`));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

export async function ogSvg(path: string) {
  const buf = await readFile(join(root, "public", path));
  return `data:image/svg+xml;base64,${buf.toString("base64")}`;
}

/** The page gutter and rounded panel used across the site */
export function Frame({ children, background = C.bone }: { children: ReactNode; background?: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 16, background, fontFamily: "Manrope" }}>
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
        background: C.forest,
        color: C.bone,
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      <div style={{ width: 10, height: 10, borderRadius: 999, background: C.lime }} />
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
