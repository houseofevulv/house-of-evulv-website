/* eslint-disable @next/next/no-img-element -- the knights are animated SVGs */
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FlankedLabel } from "@/components/Ornament";
import { SiteHeader } from "@/components/SiteHeader";
import { primaryAction } from "@/lib/cta";
import { event, nominations, steps } from "@/lib/content";
import { weekdayDayMonth } from "@/lib/dates";

/**
 * The seal is the hero: full colour on Sentinel Navy, with the two knights standing guard either side from 1024px
 * (a pair, facing inward, 300px tall or more, as the brand manual requires). One message and one main action: the
 * meaning of each part of the seal is set out in its own section further down (SealMeaning).
 * On arrival the badge frame draws itself large and faint behind the seal, the knights rise in four measured steps
 * onto a gold floor line and catch the light once, the title rises into place and a light crosses the seal once.
 * Then everything is still: the knight and frame files are the _once builds, whose loops play a single time
 * (scripts/brand-motion/build_site_variants.py). All motion stops for reduced-motion visitors.
 */
const MOTION = "/brand/motion/sentinels-of-peace";

function Knight({ side }: { side: "left" | "right" }) {
  return (
    <div className="knight-rise hidden h-[420px] overflow-hidden lg:block xl:h-[520px]">
      <img
        src={`${MOTION}_motion-knight-${side}_light_once.svg`}
        width={side === "left" ? 406 : 398}
        height={900}
        alt=""
        className="block h-full w-auto"
      />
    </div>
  );
}
export function Hero() {
  const action = primaryAction(true);
  const announcement = steps.find((s) => s.id === "announcement");
  // The venue stays off the site until the client announces it
  const meta = [
    { label: "Ceremony", value: weekdayDayMonth(event.ceremonyDate) },
    { label: "City", value: "Lagos" },
    nominations.public
      ? { label: "Nominations close", value: weekdayDayMonth(nominations.closes) }
      : { label: "Honourees announced", value: weekdayDayMonth(announcement?.start ?? nominations.outcomeBy) },
  ];

  return (
    <section className="hero-sentinels on-dark relative flex flex-col overflow-clip rounded-[22px] text-ivory md:rounded-[28px]">
      <img
        src={`${MOTION}_motion-badge-frame_white_once.svg`}
        width={1000}
        height={1000}
        alt=""
        className="pointer-events-none absolute top-[230px] left-1/2 block h-auto w-[640px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.08] md:top-[300px] md:w-[900px] xl:top-[320px] xl:w-[1000px]"
      />
      <SiteHeader variant="sentinels" />
      <div id="content" className="flex flex-col gap-10 px-5 pt-8 pb-10 md:gap-14 md:px-8 md:pt-12 md:pb-12 lg:px-10 lg:pb-14">
        <div className="relative flex items-end justify-center gap-8 xl:gap-16">
          <span aria-hidden="true" className="floor-line absolute right-0 bottom-0 left-0 hidden h-px bg-gold/50 lg:block" />
          <Knight side="left" />
          <div className="flex max-w-[620px] flex-col items-center gap-6 text-center md:gap-7">
            <div className="seal-light relative">
              <Logo name="sentinelsSeal" eager className="h-auto w-[220px] md:w-[280px] xl:w-[320px]" />
            </div>
            <FlankedLabel className="rise-in [animation-delay:.1s]">By House of Evulv, first edition</FlankedLabel>
            <h1 className="t-sop-hero m-0">
              <span className="reveal-line">
                <span className="gilt" style={{ animationDelay: "0.2s" }}>
                  Sentinels of Peace
                </span>
              </span>
            </h1>
            <p className="rise-in m-0 font-display text-xl leading-snug text-ivory italic md:text-[28px]" style={{ animationDelay: "0.45s" }}>
              Courage deserves more than applause.
            </p>
            <div
              className="rise-in flex flex-col gap-2.5 self-stretch pt-1 md:flex-row md:justify-center md:self-auto"
              style={{ animationDelay: "0.55s" }}
            >
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
          <Knight side="right" />
        </div>

        {/* The essentials only: when, where, and the next date. What the seal means has its own section below. */}
        <dl className="rise-in m-0 flex flex-col items-center gap-x-10 gap-y-3 border-t border-ivory/15 pt-6 text-center [animation-delay:.65s] sm:flex-row sm:flex-wrap sm:justify-center md:pt-8">
          {meta.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2">
              <dt className="text-sm text-on-dark-3">{m.label}</dt>
              <dd className="m-0 text-[15px] font-semibold text-ivory md:text-base">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
