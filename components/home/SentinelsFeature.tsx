import Link from "next/link";
import { Logo } from "@/components/Logo";
import { event, nominations } from "@/lib/content";
import { primaryAction } from "@/lib/cta";
import { SEAL_PARTS } from "@/lib/seal";
import { dayMonth, dayMonthShort } from "@/lib/dates";

function Row({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div
      className={`flex justify-between gap-4 border-t border-rule-dark py-3.5 text-[15px] md:py-[18px] md:text-base ${
        last ? "border-b" : ""
      }`}
    >
      <dt className="text-on-dark-3">{label}</dt>
      <dd className="m-0 text-right font-semibold">{children}</dd>
    </div>
  );
}

export function SentinelsFeature() {
  const action = primaryAction();
  return (
    <section
      id="sentinels"
      className="on-dark grid scroll-mt-4 grid-cols-1 gap-5 rounded-[22px] bg-espresso px-5 py-7 text-ivory md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:p-16"
    >
      <div className="contents lg:col-span-6 lg:flex lg:flex-col lg:justify-between lg:gap-12">
        <div className="contents lg:flex lg:flex-col lg:gap-7">
          <h2 className="t-feature m-0">The Sentinels of Peace Grand Honours</h2>
          <p className="order-2 m-0 max-w-[520px] text-base leading-[1.55] text-on-dark-2 md:text-[19px] lg:order-none">
            A national honours programme for <span className="md:hidden">people</span>
            <span className="hidden md:inline">individuals</span> and organisations whose work prevents conflict,
            protects lives or helps communities recover.
          </p>
        </div>
        <div className="order-3 flex flex-col gap-5 lg:order-none lg:gap-8">
          <dl className="m-0 flex flex-col">
            {/* TODO(client): the venue is unconfirmed (event.venueConfirmed = false) */}
            <Row label="When">{event.ceremonyDateDisplay}</Row>
            <Row label="Where">
              <span className="hidden xs:inline">{event.venue}</span>
              <span className="xs:hidden">{event.venueShort}</span>
            </Row>
            {nominations.public ? (
              <Row label="Nominations" last>
                <span className="hidden md:inline">
                  {dayMonth(nominations.opens)} to {dayMonth(nominations.closes)}
                </span>
                <span className="md:hidden">
                  {dayMonthShort(nominations.opens)} to {dayMonthShort(nominations.closes)}
                </span>
              </Row>
            ) : (
              <Row label="Selection" last>
                By an independent panel
              </Row>
            )}
          </dl>
          <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
            {/* Mobile leads with the main action; desktop leads with the programme */}
            {action && (
              <Link
                href={action.href}
                className="btn min-h-12 bg-gold px-5 py-[15px] font-bold text-black md:order-2 md:border md:border-ivory md:bg-transparent md:px-[23px] md:py-[15px] md:font-semibold md:text-ivory"
              >
                {action.label}
              </Link>
            )}
            <Link
              href="/sentinels-of-peace"
              className="btn min-h-12 border border-ivory px-[19px] py-[14px] font-semibold text-ivory md:order-1 md:border-0 md:bg-gold md:px-6 md:py-4 md:font-bold md:text-black"
            >
              Visit the programme
            </Link>
          </div>
        </div>
      </div>

      {/* The seal alone: it already carries its two sentinels */}
      <div className="order-1 flex flex-col items-center justify-center gap-6 rounded-2xl bg-navy px-6 py-9 text-center md:order-4 md:rounded-[20px] md:py-12 lg:order-none lg:col-span-5 lg:col-start-8">
        <Logo name="sentinelsSeal" className="h-auto w-[200px] md:w-[260px] lg:w-[300px]" />
        <div className="flex flex-col gap-2.5">
          <p className="t-eyebrow m-0 text-gold">The seal</p>
          <p className="t-display m-0 max-w-[340px] text-lg leading-snug text-ivory md:text-xl">
            Honour for those who stand guard over peace.
          </p>
        </div>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
          {SEAL_PARTS.map((p) => (
            <li key={p.name} className="rounded-full border border-ivory/25 px-3 py-1.5 text-[13px] font-semibold text-on-dark">
              {p.name.replace(/^The /, "").replace(/^./, (c) => c.toUpperCase())}
            </li>
          ))}
        </ul>
        <Link href="/sentinels-of-peace" className="lnk inline-flex min-h-11 items-center text-sm font-bold text-gold underline md:min-h-0">
          What the seal means
        </Link>
      </div>
    </section>
  );
}
