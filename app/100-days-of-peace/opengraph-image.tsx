import { ImageResponse } from "next/og";
import { campaignDay } from "@/lib/campaign";
import { campaign, event } from "@/lib/content";
import { todayInLagos, weekdayDayMonth } from "@/lib/dates";
import { C, DISPLAY, Frame, GoldBand, OG_SIZE, ogFonts, ogPng } from "@/lib/og";

export const alt = `${campaign.name}: ${campaign.tagline}`;
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

// The day count on navy, as the page's hero: platforms cache previews, so it is refreshed hourly at most.
export default async function Image() {
  const [fonts, band] = await Promise.all([ogFonts(), ogPng("gold-band")]);
  const { day } = campaignDay(todayInLagos());
  return new ImageResponse(
    (
      <Frame background={C.black}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", gap: 22, borderRadius: 28, background: C.espresso, color: C.ivory, padding: "0 72px 110px" }}>
          <GoldBand src={band} />
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1, color: C.ivory, ...DISPLAY }}>{campaign.name}</div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.35, fontWeight: 500, color: C.onDark }}>{campaign.tagline}</div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: 40, color: C.gold, ...DISPLAY }}>{campaign.hashtag}</div>
            {day > 0 && (
              <div style={{ display: "flex", padding: "10px 20px", borderRadius: 999, border: `2px solid ${C.gold}`, color: C.gold, fontSize: 22, fontWeight: 700 }}>
                {`Day ${day} of 100 · Grand Honours, ${weekdayDayMonth(event.ceremonyDate)}`}
              </div>
            )}
          </div>
        </div>
      </Frame>
    ),
    { ...size, fonts }
  );
}
