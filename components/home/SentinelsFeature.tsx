import Link from "next/link";
import { Photo } from "@/components/Photo";
import { event, nominations } from "@/lib/content";
import { dayMonth, dayMonthShort, nominationPhase } from "@/lib/dates";

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
  const closed = nominationPhase() === "closed";
  return (
    <section
      id="sentinels"
      className="on-dark grid scroll-mt-4 grid-cols-1 gap-5 rounded-[22px] bg-forest px-5 py-7 text-bone md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 lg:p-16"
    >
      <div className="contents lg:col-span-6 lg:flex lg:flex-col lg:justify-between lg:gap-12">
        <div className="contents lg:flex lg:flex-col lg:gap-7">
          <h2 className="t-feature m-0">The Sentinels of Peace Grand Honours</h2>
          <p className="order-2 m-0 max-w-[520px] text-base leading-[1.55] text-on-dark-2 md:text-[19px] lg:order-none">
            A public honours programme for <span className="md:hidden">people</span>
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
            <Row label="Nominations" last>
              <span className="hidden md:inline">
                {dayMonth(nominations.opens)} to {dayMonth(nominations.closes)}
              </span>
              <span className="md:hidden">
                {dayMonthShort(nominations.opens)} to {dayMonthShort(nominations.closes)}
              </span>
            </Row>
          </dl>
          <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
            {/* Mobile leads with the nomination; desktop leads with the programme */}
            {!closed && (
              <Link
                href="/sentinels-of-peace#nominate"
                className="btn min-h-12 bg-lime px-5 py-[15px] font-bold text-forest-ink md:order-2 md:border md:border-bone md:bg-transparent md:px-[23px] md:py-[15px] md:font-semibold md:text-bone"
              >
                Nominate someone
              </Link>
            )}
            <Link
              href="/sentinels-of-peace"
              className="btn min-h-12 border border-bone px-[19px] py-[14px] font-semibold text-bone md:order-1 md:border-0 md:bg-lime md:px-6 md:py-4 md:font-bold md:text-forest-ink"
            >
              Visit the programme
            </Link>
          </div>
        </div>
      </div>

      <Photo
        src="/images/elder-chief.jpg"
        alt="An elder in a fila and coral beads, dressed for a ceremony"
        sizes="(min-width: 1440px) 520px, (min-width: 1024px) 38vw, 100vw"
        position="center 30%"
        mobilePosition="center 22%"
        tone="dark"
        className="order-1 h-[300px] rounded-2xl md:order-4 md:aspect-[4/3] md:h-auto md:w-full md:rounded-[20px] lg:order-none lg:col-span-5 lg:col-start-8 lg:aspect-[519/692]"
      >
        <p className="absolute right-5 bottom-5 left-5 m-0 hidden rounded-2xl bg-bone p-[22px] text-base leading-normal font-medium text-ink md:block">
          The public nominates. An independent panel reviews each nomination against published criteria.
        </p>
      </Photo>
    </section>
  );
}
