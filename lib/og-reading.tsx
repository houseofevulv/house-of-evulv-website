import { ImageResponse } from "next/og";
import { C, Frame, OG_SIZE, ogFonts, ogSvg } from "./og";
import { site } from "./content";

/** Preview for the plain reading pages: a forest panel with the page title */
export async function readingOgImage({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  const [fonts, logo] = await Promise.all([ogFonts(), ogSvg("brand/house-of-evulv/svg/horizontal-no-tagline-reversed.svg")]);
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
            background: C.forest,
            color: C.bone,
            padding: "36px 48px 48px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={logo} alt="" width={177} height={46} style={{ width: 177, height: 46 }} />
            <div style={{ fontSize: 20, fontWeight: 500, color: C.onDark3 }}>{domain}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.lime }}>{label}</div>
            <div style={{ fontSize: 104, lineHeight: 0.95, fontWeight: 700, letterSpacing: "-0.05em" }}>{title}</div>
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
