import { isFull, nominations, steps } from "@/lib/content";
import { dayMonth, dayMonthShort, nominationPhase, weekdayDayMonth } from "@/lib/dates";
import { NominationForm, type AfterStep } from "./NominationForm";

export function Nominate() {
  const phase = nominationPhase();
  const announcement = steps.find((s) => s.id === "announcement");

  const after: AfterStep[] = [
    {
      when: "Same day",
      // Core shows the reference on screen; the confirmation email is a Full-package feature.
      text: isFull ? "You receive a reference number by email." : "You receive a reference number as soon as you submit.",
    },
    {
      when: `By ${dayMonthShort(nominations.verificationBy)}`,
      text: "If your nominee is shortlisted, we call you and one referee to confirm the details.",
    },
    { when: `By ${dayMonthShort(nominations.outcomeBy)}`, text: "Every nominator hears the outcome, shortlisted or not." },
  ];

  return (
    <section
      id="nominate"
      className="on-dark grid scroll-mt-4 grid-cols-1 gap-5 rounded-[22px] bg-forest px-3 pt-7 pb-3 text-bone md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-12 lg:p-16"
    >
      <div className="flex flex-col gap-3.5 px-2 md:gap-6 md:px-0 lg:col-span-5">
        <h2 className="t-nominate m-0">Nominate someone whose work deserves a name.</h2>
        <p className="m-0 max-w-[420px] text-base leading-[1.55] text-on-dark-2 md:text-lg">
          Anyone can nominate, including the nominee&apos;s colleagues, neighbours or the people they helped. It takes about ten
          minutes.
        </p>
      </div>

      <div className="on-light rounded-[20px] bg-bone px-[18px] py-[22px] text-ink md:rounded-[22px] md:px-9 md:pt-9 md:pb-8 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
        {/* The form is shown before opening day too, so people can see what's asked; the server accepts
            submissions only while nominations are open. */}
        {phase !== "closed" ? (
          <>
            {phase === "before" && (
              <p className="m-0 mb-6 flex items-start gap-2.5 rounded-xl border border-rule-2 bg-white px-4 py-3 text-sm leading-normal font-medium text-body">
                <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 rounded-full bg-forest" />
                <span>
                  Nominations open on <b className="text-ink">{weekdayDayMonth(nominations.opens)}</b>. You can read through
                  the form now; it accepts nominations from that day until {weekdayDayMonth(nominations.closes)}.
                </span>
              </p>
            )}
            <NominationForm after={after} contactHint={isFull ? "For the reference number" : "So we can reach you"} />
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <h3 className="m-0 text-[28px] leading-[1.1] font-bold tracking-[-0.03em]">Nominations are closed</h3>
            <p className="m-0 text-base leading-[1.6] text-body">
              Thank you to everyone who sent a nomination. Honourees are announced on{" "}
              {announcement ? weekdayDayMonth(announcement.start) : dayMonth(nominations.outcomeBy)}.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col px-2 pt-1 pb-3 md:p-0 lg:col-span-5 lg:self-end">
        <h3 className="m-0 pb-3 text-[15px] font-bold md:pb-3.5">After you submit</h3>
        <ol className="m-0 list-none p-0">
          {after.map((s, i) => (
            <li
              key={s.when}
              className={`grid grid-cols-[84px_1fr] gap-3 border-t border-rule-dark py-3.5 text-[15px] leading-normal md:grid-cols-[96px_1fr] md:gap-4 md:py-4 ${
                i === after.length - 1 ? "border-b" : ""
              }`}
            >
              <b className="text-lime">{s.when}</b>
              <span className="text-on-dark-2">{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
