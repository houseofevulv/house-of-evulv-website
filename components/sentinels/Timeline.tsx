import { nominations, selection, steps } from "@/lib/content";
import { currentStepIndex, dayMonth } from "@/lib/dates";

export function Timeline() {
  const current = currentStepIndex();
  const { criteria, panel } = selection;
  const published = criteria.length > 0 || panel.length > 0;

  return (
    <section
      id="selection"
      className="flex scroll-mt-4 flex-col gap-[22px] rounded-[22px] bg-sage px-5 py-7 md:gap-12 md:rounded-[28px] md:p-12 lg:gap-24 lg:p-16"
    >
      <div className="flex flex-col gap-[22px] md:flex-row md:items-end md:justify-between">
        <h2 className="t-h2-52 m-0 max-w-[620px] text-forest">How an honouree is chosen</h2>
        {/* TODO(client): criteria and panel members go in content/site-content.json (selection) by this date */}
        <p className="m-0 max-w-[380px] text-[15px] leading-[1.55] text-sage-text md:text-[17px]">
          {published
            ? "Each shortlisted nomination is verified, then scored by an independent panel against the criteria below."
            : `Criteria and panel members are published on ${dayMonth(nominations.opens)}, the day nominations open.`}
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

      {published && (
        <div className="grid grid-cols-1 gap-8 border-t border-forest/20 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-x-6">
          {criteria.length > 0 && (
            <div className="flex flex-col gap-4 lg:col-span-7">
              <h3 className="m-0 text-[22px] font-bold tracking-[-0.025em] text-forest md:text-2xl">The criteria</h3>
              <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
                {criteria.map((c, i) => (
                  <li key={c.title} className="flex flex-col gap-1.5 rounded-2xl bg-bone/60 p-5">
                    <span className="text-[13px] font-bold text-forest/70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-bold tracking-[-0.015em] text-forest">{c.title}</span>
                    <span className="text-[15px] leading-normal text-sage-text">{c.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {panel.length > 0 && (
            <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
              <h3 className="m-0 text-[22px] font-bold tracking-[-0.025em] text-forest md:text-2xl">The panel</h3>
              <ul className="m-0 list-none border-t border-forest/20 p-0">
                {panel.map((m) => (
                  <li key={m.name} className="flex flex-col gap-0.5 border-b border-forest/20 py-3.5">
                    <span className="text-[17px] font-bold text-forest">{m.name}</span>
                    <span className="text-sm text-sage-text">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
