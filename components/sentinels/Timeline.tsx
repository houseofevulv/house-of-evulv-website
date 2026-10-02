import { selection, steps } from "@/lib/content";
import { currentStepIndex } from "@/lib/dates";
import { TimelineSteps } from "./TimelineSteps";

export function Timeline() {
  const current = currentStepIndex();
  const { criteria, panel } = selection;
  const published = criteria.length > 0 || panel.length > 0;

  return (
    <section
      id="selection"
      className="flex scroll-mt-4 flex-col gap-[22px] rounded-[22px] bg-sand px-5 py-7 md:gap-12 md:rounded-[28px] md:p-12 lg:gap-24 lg:p-16"
    >
      {/* The heading stays with the steps: on phones the two pin together while the steps slide past */}
      <TimelineSteps steps={steps.map(({ id, when, title, body }) => ({ id, when, title, body }))} current={current}>
        <div className="flex flex-col gap-[22px] md:flex-row md:items-end md:justify-between">
          <h2 className="t-h2-52 reveal m-0 max-w-[620px] text-espresso">How an honouree is chosen</h2>
          {/* TODO(client): criteria and panel members go in content/site-content.json (selection); confirm the timing */}
          <p className="m-0 max-w-[380px] text-[15px] leading-[1.55] text-sand-text md:text-[17px]">
            {published
              ? "Each candidate is verified, then scored by an independent panel against the criteria below."
              : "Criteria and panel members are published here before shortlisting begins."}
          </p>
        </div>
      </TimelineSteps>

      {published && (
        <div className="grid grid-cols-1 gap-8 border-t border-espresso/20 pt-8 md:pt-10 lg:grid-cols-12 lg:gap-x-6">
          {criteria.length > 0 && (
            <div className="flex flex-col gap-4 lg:col-span-7">
              <h3 className="m-0 text-[22px] font-bold text-espresso md:text-2xl">The criteria</h3>
              <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2">
                {criteria.map((c, i) => (
                  <li key={c.title} className="flex flex-col gap-1.5 rounded-2xl bg-ivory/60 p-5">
                    <span className="text-[13px] font-bold text-espresso/70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg font-bold text-espresso">{c.title}</span>
                    <span className="text-[15px] leading-normal text-sand-text">{c.body}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {panel.length > 0 && (
            <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
              <h3 className="m-0 text-[22px] font-bold text-espresso md:text-2xl">The panel</h3>
              <ul className="m-0 list-none border-t border-espresso/20 p-0">
                {panel.map((m) => (
                  <li key={m.name} className="flex flex-col gap-0.5 border-b border-espresso/20 py-3.5">
                    <span className="text-[17px] font-bold text-espresso">{m.name}</span>
                    <span className="text-sm text-sand-text">{m.role}</span>
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
