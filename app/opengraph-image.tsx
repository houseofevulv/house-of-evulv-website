import { ImageResponse } from "next/og";
import { C, DISPLAY, Frame, GoldBand, OG_SIZE, ogFonts, ogPng, ogSvg } from "@/lib/og";
import { site } from "@/lib/content";

export const alt = `${site.name}: we honour and support the people who keep communities at peace.`;
export const size = OG_SIZE;
export const contentType = "image/png";

// The metallic emblem over the wordmark on midnight, matching the home page
export default async function Image() {
  const [fonts, emblem, wordmark, band] = await Promise.all([
    ogFonts(),
    ogPng("house-emblem-metallic"),
    ogSvg("brand/house/house-of-evulv_wordmark-stacked_gold.svg"),
    ogPng("gold-band"),
  ]);
  return new ImageResponse(
    (
      <Frame background={C.black}>
        <div
          style={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            gap: 64,
            borderRadius: 28,
            background: C.espresso,
            color: C.ivory,
            padding: "0 72px 110px",
          }}
        >
          <GoldBand src={band} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <img src={emblem} alt="" width={250} height={264} style={{ width: 250, height: 264 }} />
            <img src={wordmark} alt="" width={210} height={101} style={{ width: 210, height: 101 }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", fontSize: 54, lineHeight: 1.12, color: C.gold, ...DISPLAY }}>
              Honouring those who keep the peace
            </div>
            <div style={{ display: "flex", fontSize: 24, lineHeight: 1.4, fontWeight: 500, color: C.onDark2 }}>
              We honour and support the people who keep communities at peace, through programmes in peace, healing and human development.
            </div>
          </div>
        </div>
      </Frame>
    ),
    { ...size, fonts }
  );
}
