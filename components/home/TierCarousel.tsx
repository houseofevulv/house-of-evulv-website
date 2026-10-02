"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type Tier = { name: string; promise: string; limit: string; href: string };

// Each tier on its own brand colour; the name in gold on the dark grounds
const SKINS = [
  { card: "bg-navy text-ivory", name: "text-gold", sub: "text-on-dark-2", ring: "border-ivory/40" },
  { card: "bg-espresso text-ivory", name: "text-gold", sub: "text-on-dark-2", ring: "border-ivory/40" },
  { card: "bg-bronze text-ivory", name: "text-ivory", sub: "text-ivory/80", ring: "border-ivory/50" },
  { card: "bg-sand text-espresso", name: "text-espresso", sub: "text-sand-text", ring: "border-espresso/30" },
];

/**
 * The partnership tiers as a carousel, one card at a time: arrow buttons step through them (and wrap round), touch
 * screens swipe (native scroll snap). Nothing moves on its own. Each card is the link that opens the support form
 * with that tier chosen.
 */
export function TierCarousel({ tiers }: { tiers: Tier[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = (i + tiers.length) % tiers.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    setIndex(next);
  };

  const arrow =
    "flex size-11 cursor-pointer items-center justify-center rounded-full border border-espresso/25 bg-white text-espresso transition-transform duration-150 hover:-translate-y-0.5";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Partnership tiers" className="w-full max-w-[560px]">
      <ul
        ref={track}
        className="no-scrollbar m-0 flex w-full snap-x snap-mandatory list-none overflow-x-auto overscroll-x-contain rounded-3xl p-0"
      >
        {tiers.map((t, i) => {
          const skin = SKINS[i % SKINS.length];
          return (
            <li
              key={t.name}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${tiers.length}`}
              className="w-full shrink-0 snap-start"
            >
              <Link
                href={t.href}
                tabIndex={i === index ? 0 : -1}
                className={`group flex min-h-[250px] flex-col justify-between rounded-3xl p-7 text-left no-underline md:min-h-[280px] md:p-9 ${skin.card}`}
              >
                <span className="flex flex-col">
                  <span className={`t-display text-[30px] leading-tight md:text-[38px] ${skin.name}`}>{t.name} Partner</span>
                  <span className="pt-3 text-[17px] font-semibold">{t.promise}</span>
                  <span className={`pt-1 text-sm ${skin.sub}`}>{t.limit}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-8 flex size-11 items-center justify-center self-end rounded-full border text-lg transition-transform duration-200 group-hover:translate-x-1 ${skin.ring}`}
                >
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-4 pt-5">
        <div aria-hidden="true" className="flex gap-2">
          {tiers.map((t, i) => (
            <span
              key={t.name}
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-bronze" : "w-3 bg-espresso/20"}`}
            />
          ))}
        </div>
        <p aria-live="polite" className="sr-only">
          {tiers[index]?.name} Partner, {index + 1} of {tiers.length}
        </p>
        <div className="flex gap-2">
          <button type="button" className={arrow} onClick={() => go(index - 1)} aria-label="Previous partnership tier">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 4l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" className={arrow} onClick={() => go(index + 1)} aria-label="Next partnership tier">
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 4l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
