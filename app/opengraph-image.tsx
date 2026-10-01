import { ImageResponse } from "next/og";
import { C, DISPLAY, Frame, asJpeg, OG_SIZE, ogFonts, ogPhoto, ogSvg } from "@/lib/og";
import { site } from "@/lib/content";

export const alt = `${site.name}: we honour and support the people who keep communities at peace.`;
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default async function Image() {
  const [fonts, hero, logo] = await Promise.all([
    ogFonts(),
    ogPhoto("durbar-riders"),
    ogSvg("brand/house/house-of-evulv_horizontal_gold-and-silver.svg"),
  ]);
  return asJpeg(
    new ImageResponse(
    (
      <Frame>
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 28,
            overflow: "hidden",
            background: C.espresso,
            color: C.ivory,
            padding: "36px 44px 44px",
          }}
        >
          <img
            src={hero}
            alt=""
            width={1168}
            height={598}
            style={{ position: "absolute", top: 0, left: 0, width: 1168, height: 598, objectFit: "cover", objectPosition: "center 45%" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1168,
              height: 598,
              backgroundImage:
                "linear-gradient(180deg, rgba(14,10,7,.82) 0%, rgba(14,10,7,.25) 34%, rgba(14,10,7,.3) 48%, rgba(14,10,7,.9) 100%)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={logo} alt="" width={244} height={90} style={{ width: 244, height: 90 }} />
            <div style={{ fontSize: 20, fontWeight: 500, color: C.onDark }}>{site.tagline}</div>
          </div>
          <div style={{ display: "flex", fontSize: 54, lineHeight: 1.1, maxWidth: 1000, color: C.gold, ...DISPLAY }}>
            We honour and support the people who keep communities at peace.
          </div>
        </div>
      </Frame>
    ),
    { ...size, fonts }
    )
  );
}
