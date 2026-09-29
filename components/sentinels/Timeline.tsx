import { nominations, steps } from "@/lib/content";
import { currentStepIndex, dayMonth } from "@/lib/dates";

export function Timeline() {
  const current = currentStepIndex();

  return (
    <section
      id="selection"
      className="flex scroll-mt-4 flex-col gap-[22px] rounded-[22px] bg-sage px-5 py-7 md:gap-12 md:rounded-[28px] md:p-12 lg:gap-24 lg:p-16"
    >
      <div className="flex flex-col gap-[22px] md:flex-row md:items-end md:justify-between">
        <h2 className="t-h2-52 m-0 max-w-[620px] text-forest">How an honouree is chosen</h2>
        {/* TODO(client): confirm criteria and panel members will be published on this date */}
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.55] text-sage-text md:text-[17px]">
          Criteria and panel members are published on {dayMonth(nominations.opens)}, the day nominations open.
        </p>
      </div>

      <ol className="m-0 list-none p-0 lg:grid lg:grid-cols-5 lg:gap-4">
        {steps.map((s, i) => {
          const now = i === current;
          const last = i === steps.length - 1;
          return (
            <li
              key={s.id}
              aria-current={now ? "step" : undefined}
              className="relative pb-[22px] pl-[30px] last:pb-0 lg:flex lg:flex-col lg:gap-3.5 lg:p-0"
            >
              {/* Connector: vertical on small screens, horizontal from 1024px */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-4 -bottom-0.5 left-1.5 w-0.5 bg-forest opacity-25 lg:hidden"
                />
              )}
              <span aria-hidden="true" className="absolute top-0.5 left-0 lg:static lg:flex lg:items-center lg:gap-2.5">
                <span
                  className={`block size-3.5 rounded-full border-2 border-forest ${now ? "bg-lime" : "bg-transparent"}`}
                />
                <span className="hidden h-0.5 grow bg-forest opacity-25 lg:block" />
              </span>
              <div className="text-[13px] font-bold text-forest lg:text-sm">
                {s.when}
                {now && <span className="sr-only"> (current stage)</span>}
              </div>
              <h3 className="m-0 py-1 text-[22px] font-bold tracking-[-0.025em] text-forest lg:py-0 lg:text-2xl">
                {s.title}
              </h3>
              <p className="m-0 text-[15px] leading-normal text-sage-text">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
