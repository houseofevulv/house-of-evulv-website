import Link from "next/link";
import { CAMPAIGN_DAYS, campaignDay } from "@/lib/campaign";
import { campaign } from "@/lib/content";
import { todayInLagos } from "@/lib/dates";

/** The 100 Days of Peace, briefly: one navy strip under the hero, linking to the campaign page */
export function CampaignBand() {
  const { day, left } = campaignDay(todayInLagos());
  if (day < 1 || left < 1) return null;
  return (
    <Link
      href="/100-days-of-peace"
      className="group flex flex-col gap-3.5 border-b border-rule px-3 pt-5 pb-6 text-ink no-underline md:px-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-10 lg:px-10 lg:py-7"
    >
      <span className="flex items-baseline justify-between gap-4 lg:justify-start">
        <span className="t-display text-[19px] text-ink lg:text-[22px]">{campaign.name}</span>
        <span className="text-sm whitespace-nowrap text-muted lg:text-[15px]">
          Day <strong className="text-ink">{day}</strong>
          <span className="max-lg:hidden"> · {left} days to the Grand Honours</span>
        </span>
      </span>
      <span aria-hidden="true" className="grid grid-cols-[repeat(100,minmax(0,1fr))] items-center gap-px lg:gap-[3px]">
        {Array.from({ length: CAMPAIGN_DAYS }, (_, i) => (
          <span key={i} className={`rounded-[1px] ${i + 1 === day ? "h-[26px] bg-ink lg:h-[30px]" : i + 1 < day ? "h-[18px] bg-gold lg:h-[22px]" : "h-[18px] bg-sand-deep lg:h-[22px]"}`} />
        ))}
      </span>
      <span className="flex items-center justify-between gap-3 text-sm lg:justify-end">
        <span className="text-muted lg:hidden">{left} days to the Grand Honours</span>
        <span className="flex items-center gap-2 font-bold whitespace-nowrap text-bronze">
          Follow the campaign
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </span>
      </span>
    </Link>
  );
}
