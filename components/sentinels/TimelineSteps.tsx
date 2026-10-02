"use client";

import type { ReactNode } from "react";
import { usePinnedStep } from "@/lib/usePinnedStep";

type Step = { id: string; when: string; title: string; body: string };

/**
 * The selection steps. From 1024px a five-column row, from 640px a vertical list. Below 640px the block is tall and
 * pins under its heading (`children`): scrolling down brings the steps in from the right one at a time, with a rail
 * showing where the reader is and which stage is current today.
 */
export function TimelineSteps({ steps, current, children }: { steps: Step[]; current: number; children: ReactNode }) {
  const { ref, active } = usePinnedStep<HTMLDivElement>(steps.length);

  return (
    <div ref={ref} className="max-sm:h-[380svh]">
      <div className="flex flex-col gap-[22px] max-sm:sticky max-sm:top-0 max-sm:h-svh max-sm:justify-center max-sm:gap-9 md:gap-12 lg:gap-24">
        {children}

        <div className="max-sm:overflow-hidden">
          {/* Rail, phones only: one dot per step, gold for today's stage, solid for the one on screen */}
          <div aria-hidden="true" className="flex items-center pb-7 sm:hidden">
            {steps.map((s, i) => (
              <span key={s.id} className="flex grow items-center last:grow-0">
                <span
                  className={`block size-3.5 rounded-full border-2 border-espresso transition-transform duration-500 ${
                    i === current ? "bg-gold" : i === active ? "bg-espresso" : "bg-transparent"
                  } ${i === active ? "scale-125" : ""}`}
                />
                {i < steps.length - 1 && (
                  <span className={`h-0.5 grow bg-espresso transition-opacity duration-500 ${i < active ? "opacity-70" : "opacity-20"}`} />
                )}
              </span>
            ))}
          </div>

          <ol
            style={{ "--shift": active } as React.CSSProperties}
            className="m-0 list-none p-0 max-sm:flex max-sm:transition-transform max-sm:duration-500 max-sm:ease-out max-sm:[transform:translateX(calc(var(--shift)*-100%))] motion-reduce:transition-none lg:grid lg:grid-cols-5 lg:gap-4"
          >
            {steps.map((s, i) => {
              const now = i === current;
              const last = i === steps.length - 1;
              return (
                <li
                  key={s.id}
                  aria-current={now ? "step" : undefined}
                  className="relative max-sm:w-full max-sm:shrink-0 max-sm:pr-6 sm:pb-[22px] sm:pl-[30px] sm:last:pb-0 lg:flex lg:flex-col lg:gap-3.5 lg:p-0"
                >
                  {/* Connector: vertical from 640px, horizontal from 1024px. Drawn as the steps scroll into view
                      where the browser supports it; otherwise, and under reduced motion, it is simply there. */}
                  {!last && (
                    <span
                      aria-hidden="true"
                      className="draw-y absolute top-4 -bottom-0.5 left-1.5 w-0.5 bg-espresso opacity-25 max-sm:hidden lg:hidden"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute top-0.5 left-0 max-sm:hidden lg:static lg:flex lg:items-center lg:gap-2.5"
                  >
                    <span
                      className={`block size-3.5 rounded-full border-2 border-espresso ${now ? "bg-gold" : "bg-transparent"}`}
                    />
                    <span className="draw-x hidden h-0.5 grow bg-espresso opacity-25 lg:block" />
                  </span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-bold text-espresso lg:text-sm">
                    <span className="sm:hidden">
                      {i + 1} of {steps.length} ·{" "}
                    </span>
                    {s.when}
                    {now && (
                      <>
                        <span className="sr-only"> (current stage)</span>
                        <span aria-hidden="true" className="rounded-full bg-gold px-2.5 py-0.5 text-xs text-black sm:hidden">
                          Now
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="m-0 py-1 text-[28px] font-bold text-espresso sm:text-[22px] lg:py-0 lg:text-2xl">{s.title}</h3>
                  <p className="m-0 text-base leading-[1.55] text-sand-text sm:text-[15px] sm:leading-normal">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
