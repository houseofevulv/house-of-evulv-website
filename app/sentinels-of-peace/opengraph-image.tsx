import { ImageResponse } from "next/og";
import { C, DISPLAY, Frame, OG_SIZE, ogFonts, ogPng } from "@/lib/og";
import { event, nominations } from "@/lib/content";
import { dayMonthShort, weekdayDayMonth } from "@/lib/dates";

export const alt = nominations.public
  ? `${event.name}: nominate someone whose work deserves a name.`
  : `${event.name}: honouring the people who keep communities at peace.`;
export const size = OG_SIZE;
export const contentType = "image/png";

// The seal in full colour on espresso, with the name in gold (brand manual, section 03).
// The venue stays off until confirmed, since platforms cache previews for weeks.
export default async function Image() {
  const [fonts, seal] = await Promise.all([ogFonts(), ogPng("sentinels-seal")]);
  const line = nominations.public
    ? `Nominations ${dayMonthShort(nominations.opens)} to ${dayMonthShort(nominations.closes)}`
    : `Grand Honours, ${weekdayDayMonth(event.ceremonyDate)}`;

  return new ImageResponse(
    (
      <Frame background={C.black}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 56,
            borderRadius: 28,
            background: C.espresso,
            color: C.ivory,
            padding: "0 64px",
          }}
        >
          <img src={seal} alt="" width={420} height={398} style={{ width: 420, height: 398 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.onDark3, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              By House of Evulv
            </div>
            <div style={{ display: "flex", fontSize: 66, lineHeight: 1.05, color: C.gold, ...DISPLAY }}>Sentinels of Peace</div>
            <div style={{ display: "flex", fontSize: 26, lineHeight: 1.4, fontWeight: 500, color: C.onDark }}>
              {nominations.public
                ? "Nominate someone whose work deserves a name."
                : "Honouring the people who keep communities at peace."}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 22px",
                  borderRadius: 999,
                  border: `2px solid ${C.gold}`,
                  color: C.gold,
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {line}
              </div>
            </div>
          </div>
        </div>
      </Frame>
    ),
    { ...size, fonts }
  );
}
