import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FlankedLabel } from "@/components/Ornament";
import { SiteHeader } from "@/components/SiteHeader";
import { primaryAction } from "@/lib/cta";
import { event, nominations, steps } from "@/lib/content";
import { weekdayDayMonth } from "@/lib/dates";
import { SEAL_PARTS } from "@/lib/seal";

/**
 * The seal is the hero: full colour on Sentinel Navy, with the two knights standing guard either side from 1024px
 * (a pair, facing inward, 300px tall or more, as the brand manual requires), and the meaning of each part beneath.
 */
export function Hero() {
  const action = primaryAction(true);
  const announcement = steps.find((s) => s.id === "announcement");
  // TODO(client): the venue is unconfirmed (event.venueConfirmed = false)
  const meta = [
    { label: "Ceremony", value: weekdayDayMonth(event.ceremonyDate) },
    { label: "Venue", value: event.venueShort },
    nominations.public
      ? { label: "Nominations close", value: weekdayDayMonth(nominations.closes) }
      : { label: "Honourees announced", value: weekdayDayMonth(announcement?.start ?? nominations.outcomeBy) },
  ];

  return (
    <section className="on-dark flex flex-col rounded-[22px] bg-navy text-ivory md:rounded-[28px]">
      <SiteHeader variant="sentinels" />
      <div id="content" className="flex flex-col gap-10 px-5 pt-8 pb-8 md:gap-14 md:px-8 md:pt-12 md:pb-12 lg:px-10 lg:pb-14">
        <div className="flex items-end justify-center gap-8 xl:gap-16">
          <Logo name="knightLeft" eager className="hidden h-[420px] w-auto lg:block xl:h-[520px]" />
          <div className="flex max-w-[620px] flex-col items-center gap-6 text-center md:gap-7">
            <Logo name="sentinelsSeal" eager className="h-auto w-[220px] md:w-[280px] xl:w-[320px]" />
            <FlankedLabel>By House of Evulv, first edition</FlankedLabel>
            <h1 className="t-sop-hero m-0 text-gold">Sentinels of Peace</h1>
            <p className="t-display m-0 text-lg leading-snug text-ivory md:text-2xl">
              Courage deserves more than applause.
            </p>
            <div className="flex flex-col gap-2.5 self-stretch pt-1 md:flex-row md:justify-center md:self-auto">
              {action && (
                <Link href={action.href} className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
                  {action.label}
                </Link>
              )}
              <Link href="#partner" className="btn min-h-12 border border-ivory px-[23px] py-[14px] font-semibold text-ivory">
                Become a partner
              </Link>
            </div>
          </div>
          <Logo name="knightRight" eager className="hidden h-[420px] w-auto lg:block xl:h-[520px]" />
        </div>

        <dl className="m-0 grid grid-cols-1 overflow-hidden rounded-2xl border border-ivory/20 md:grid-cols-3">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`flex items-baseline justify-between gap-4 px-5 py-4 md:block md:px-6 md:py-5 ${
                i > 0 ? "border-t border-ivory/20 md:border-t-0 md:border-l" : ""
              }`}
            >
              <dt className="t-eyebrow text-on-dark-3">{m.label}</dt>
              <dd className="m-0 text-right text-[15px] font-bold md:pt-2 md:text-left md:text-xl">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-5">
          <h2 className="t-eyebrow m-0 text-gold">The seal</h2>
          <dl className="m-0 grid grid-cols-1 border-t border-ivory/20 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
            {SEAL_PARTS.map((p) => (
              <div key={p.name} className="flex flex-col gap-1 border-b border-ivory/20 py-4">
                <dt className="text-[15px] font-bold text-gold">{p.name}</dt>
                <dd className="m-0 text-[15px] leading-normal text-on-dark">{p.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
