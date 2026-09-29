import { ImageResponse } from "next/og";
import { C, Frame, asJpeg, OG_SIZE, ogFonts, ogPhoto, ogSvg } from "@/lib/og";
import { site } from "@/lib/content";

export const alt = `${site.name}: we honour and support the people who keep communities at peace.`;
export const size = OG_SIZE;
export const contentType = "image/jpeg";

export default async function Image() {
  const [fonts, hero, logo] = await Promise.all([
    ogFonts(),
    ogPhoto("hero-crowd-flag"),
    ogSvg("brand/house-of-evulv/svg/horizontal-no-tagline-reversed.svg"),
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
            background: "#2A443D",
            color: C.bone,
            padding: "36px 44px 44px",
          }}
        >
          <img
            src={hero}
            alt=""
            width={1168}
            height={598}
            style={{ position: "absolute", top: 0, left: 0, width: 1168, height: 598, objectFit: "cover", objectPosition: "center 62%" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1168,
              height: 598,
              backgroundImage:
                "linear-gradient(180deg, rgba(10,20,17,.6) 0%, rgba(10,20,17,0) 30%, rgba(10,20,17,.15) 45%, rgba(10,20,17,.85) 100%)",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <img src={logo} alt="" width={177} height={46} style={{ width: 177, height: 46 }} />
            <div style={{ fontSize: 20, fontWeight: 500, color: C.onDark }}>{site.tagline}</div>
          </div>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 0.98, fontWeight: 700, letterSpacing: "-0.045em", maxWidth: 940 }}>
            We honour and support the people who keep communities at peace.
          </div>
        </div>
      </Frame>
    ),
    { ...size, fonts }
    )
  );
}
