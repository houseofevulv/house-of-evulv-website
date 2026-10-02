"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A sideways-scrolling area with two arrow buttons above it, for content wider than the screen (the partnership
 * table between 768 and about 1080px). Touch users swipe as usual; the arrows are for mouse and trackpad users, who
 * otherwise get no sign that more is hidden. They show only while something is cut off, each one dims at its end,
 * and a click moves by `step` pixels (one column) or by most of the visible width.
 */
export function ScrollArea({ children, label, step }: { children: ReactNode; label: string; step?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ scrollable: false, atStart: true, atEnd: true });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ scrollable: max > 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const move = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (step ?? el.clientWidth * 0.8), behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "flex size-11 items-center justify-center rounded-full border border-card-border bg-white text-espresso transition-opacity duration-150 disabled:cursor-default disabled:opacity-35 enabled:cursor-pointer";

  return (
    <div>
      {edges.scrollable && (
        <div className="flex items-center justify-end gap-2 pb-3">
          <button type="button" className={btn} onClick={() => move(-1)} disabled={edges.atStart} aria-label={`Scroll ${label} left`}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" className={btn} onClick={() => move(1)} disabled={edges.atEnd} aria-label={`Scroll ${label} right`}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
      {/* The card clips to its rounded corners; the layer inside it is what scrolls */}
      <div className="overflow-hidden rounded-3xl border border-card-border bg-white">
        <div ref={ref} className="overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
