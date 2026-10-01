import { ImageResponse } from "next/og";
import { C, DISPLAY, Frame, OG_SIZE, ogFonts, ogSvg } from "./og";
import { site } from "./content";

/** Preview for the plain reading pages: a forest panel with the page title */
export async function readingOgImage({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  const [fonts, logo] = await Promise.all([ogFonts(), ogSvg("brand/house/house-of-evulv_horizontal_gold-and-silver.svg")]);
  const domain = new URL(site.url).hostname;
  return new ImageResponse(
    (
      <Frame>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 28,
            background: C.espresso,
            color: C.ivory,
            padding: "36px 48px 48px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={logo} alt="" width={244} height={90} style={{ width: 244, height: 90 }} />
            <div style={{ fontSize: 20, fontWeight: 500, color: C.onDark3 }}>{domain}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.gold, letterSpacing: "0.16em", textTransform: "uppercase" }}>{label}</div>
            <div style={{ fontSize: 84, lineHeight: 1, ...DISPLAY }}>{title}</div>
            <div style={{ display: "flex", maxWidth: 820, fontSize: 26, lineHeight: 1.4, fontWeight: 500, color: C.onDark2 }}>
              {subtitle}
            </div>
          </div>
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts }
  );
}
