import { ImageResponse } from "next/og";
import { C, Frame, asJpeg, OG_SIZE, StatusPill, ogFonts, ogPhoto, ogSvg } from "@/lib/og";
import { event, nominations } from "@/lib/content";
import { dayMonthShort, weekdayDayMonth } from "@/lib/dates";

export const alt = `${event.name}: nominate someone whose work deserves a name.`;
export const size = OG_SIZE;
export const contentType = "image/jpeg";

// The ceremony date is shown only once confirmed; the venue stays off until confirmed, since platforms cache previews for weeks.
export default async function Image() {
  const [fonts, logo, a, b] = await Promise.all([
    ogFonts(),
    ogSvg("brand/sentinels-of-peace/svg/horizontal-forest.svg"),
    ogPhoto("award-presentation"),
    ogPhoto("medal-pinning"),
  ]);
  const photo = (src: string, h: number, pos: string) => (
    <img src={src} alt="" width={236} height={h} style={{ width: 236, height: h, borderRadius: 20, objectFit: "cover", objectPosition: pos }} />
  );

  return asJpeg(
    new ImageResponse(
    (
      <Frame>
        <div style={{ flex: 1, display: "flex", gap: 16 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "40px 36px 40px 40px",
              color: C.ink,
            }}
          >
            {/* 488x120 viewBox; brand rule: horizontal lock-up, never the full seal at small sizes */}
            <img src={logo} alt="" width={366} height={90} style={{ width: 366, height: 90 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", fontSize: 56, lineHeight: 1, fontWeight: 700, letterSpacing: "-0.045em", color: C.ink }}>
                Nominate someone whose work deserves a name.
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
                <StatusPill>
                  Nominations {dayMonthShort(nominations.opens)} to {dayMonthShort(nominations.closes)}
                </StatusPill>
                {event.ceremonyDateConfirmed && (
                  <div style={{ display: "flex", fontSize: 22, fontWeight: 700, color: C.muted, paddingLeft: 4 }}>
                    Grand Honours, {weekdayDayMonth(event.ceremonyDate)}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              width: 520,
              display: "flex",
              gap: 16,
              padding: 16,
              borderRadius: 28,
              background: C.forest,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>{photo(a, 566, "center 22%")}</div>
            <div style={{ display: "flex", flexDirection: "column", paddingTop: 64 }}>{photo(b, 502, "46% center")}</div>
          </div>
        </div>
      </Frame>
    ),
    { ...size, fonts }
    )
  );
}
