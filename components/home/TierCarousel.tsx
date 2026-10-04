"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type Tier = {
  name: string;
  promise: string;
  limit: string;
  href: string;
  /** The tier's column of the comparison table: what you support, recognition, contribution */
  details: { label: string; value: string }[];
};

// One brand colour per tier, shared by its card, the badge and the progress bar: black, espresso, bronze, gold
const SKINS = [
  { colour: "#0b0907", card: "bg-black text-ivory", sub: "text-on-dark-2", ring: "border-ivory/40", rule: "border-ivory/15" },
  { colour: "#1e1712", card: "bg-espresso text-ivory", sub: "text-on-dark-2", ring: "border-ivory/40", rule: "border-ivory/15" },
  { colour: "#7e6029", card: "bg-bronze text-ivory", sub: "text-ivory/75", ring: "border-ivory/50", rule: "border-ivory/20" },
  { colour: "#c9a54c", card: "bg-gold text-espresso", sub: "text-espresso/70", ring: "border-espresso/35", rule: "border-espresso/15" },
];

const INTERVAL = 5000;
const BADGE = "/brand/sentinels/sentinels-of-peace_badge_white.svg";

/**
 * The partnership tiers: on the left the Sentinels badge with the current tier's name in its centre, on the right one
 * card at a time with what that tier involves. Badge and card share one colour per tier and change together every
 * five seconds. Arrows step through (and wrap round), touch screens swipe. The rotation pauses on hover or focus, off
 * screen and in hidden tabs, has its own pause button (WCAG 2.2.2), and does not run for reduced-motion visitors.
 * Each card is the link that opens the support form with its tier chosen. `children`: the actions under the cards.
 */
export function TierCarousel({ tiers, children }: { tiers: Tier[]; children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false); // hover or keyboard focus inside the cards
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + tiers.length) % tiers.length;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Wrapping round jumps straight there, rather than sliding back past every card
      const wraps = Math.abs(next - Math.round(el.scrollLeft / el.clientWidth)) > 1;
      el.scrollTo({ left: next * el.clientWidth, behavior: reduce || wraps ? "auto" : "smooth" });
      setIndex(next);
    },
    [tiers.length],
  );

  // Follow swipes, once the cards settle, so the badge never flickers through the cards a slide passes
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let settle = 0;
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => el.clientWidth && setIndex(Math.round(el.scrollLeft / el.clientWidth)), 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(settle);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Only rotate while on screen, in a visible tab, and when motion is welcome
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    const onVis = () => document.hidden && setVisible(false);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // The next card five seconds after the last change, manual or automatic
  const running = !paused && !held && visible && !reduced;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [running, index, go]);

  const skin = SKINS[index % SKINS.length];
  const current = tiers[index];
  const control =
    "flex size-11 cursor-pointer items-center justify-center rounded-full border border-espresso/25 bg-white text-espresso transition-transform duration-150 hover:-translate-y-0.5";

  return (
    <div ref={root} className="grid w-full grid-cols-1 items-center gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-6 lg:text-left">
      {/* The badge, in the current tier's colour, with its name in the centre */}
      <div className="flex justify-center lg:col-span-5">
        <div className="relative aspect-square w-[240px] [container-type:inline-size] md:w-[320px] lg:w-[min(100%,420px)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-colors duration-700 motion-reduce:transition-none"
            style={{
              backgroundColor: skin.colour,
              WebkitMask: `url(${BADGE}) center / contain no-repeat`,
              mask: `url(${BADGE}) center / contain no-repeat`,
            }}
          />
          <p
            key={current.name}
            aria-hidden="true"
            className="tier-name absolute inset-x-[18%] top-[40%] m-0 flex flex-col items-center text-center transition-colors duration-700 motion-reduce:transition-none"
            style={{ color: skin.colour }}
          >
            {/* Sized to the badge: the longest name, Programme (6.7em wide in Bungee), fills about 54% of it and
                stays clear of the lettering round the ring */}
            <span className="t-display text-[8cqw] leading-none">{current.name}</span>
            <span className="pt-[1.5cqw] text-[max(11px,3.1cqw)] font-bold tracking-[0.16em] uppercase">Partner</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center lg:col-span-7 lg:items-start">
        <p className="t-eyebrow m-0 pb-4 text-muted md:pb-6">Choose where you stand</p>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Partnership tiers"
          className="w-full max-w-[560px]"
          onMouseEnter={() => setHeld(true)}
          onMouseLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
        >
          <ul
            ref={track}
            className="no-scrollbar m-0 flex w-full snap-x snap-mandatory list-none overflow-x-auto overscroll-x-contain rounded-3xl p-0"
          >
            {tiers.map((t, i) => {
              const s = SKINS[i % SKINS.length];
              return (
                <li key={t.name} aria-roledescription="slide" aria-label={`${t.name} Partner, ${i + 1} of ${tiers.length}`} className="w-full shrink-0 snap-start">
                  <Link
                    href={t.href}
                    tabIndex={i === index ? 0 : -1}
                    aria-label={`${t.name} Partner: ${t.promise}. Open the support form for this partnership`}
                    className={`group flex min-h-[300px] flex-col rounded-3xl p-7 text-left no-underline md:p-9 ${s.card}`}
                  >
                    <span className="t-display text-[26px] leading-tight md:text-[32px]">{t.promise}</span>
                    <span className={`pt-1.5 text-sm ${s.sub}`}>{t.limit}</span>
                    <span className="flex flex-col pt-5">
                      {t.details.map((d) => (
                        <span key={d.label} className={`grid grid-cols-1 gap-0.5 border-t py-2.5 sm:grid-cols-[150px_1fr] sm:gap-4 ${s.rule}`}>
                          <span className={`text-[13px] font-semibold ${s.sub}`}>{d.label}</span>
                          <span className="text-[15px] leading-snug">{d.value}</span>
                        </span>
                      ))}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-auto flex size-11 items-center justify-center self-end rounded-full border text-lg transition-transform duration-200 group-hover:translate-x-1 ${s.ring}`}
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
                  className="h-1 rounded-full transition-all duration-300"
                  style={{ width: i === index ? 32 : 12, backgroundColor: i === index ? skin.colour : "rgb(30 23 18 / 0.2)" }}
                />
              ))}
            </div>
            <p aria-live="polite" className="sr-only">
              {current.name} Partner, {index + 1} of {tiers.length}
            </p>
            <div className="flex gap-2">
              {!reduced && (
                <button
                  type="button"
                  className={control}
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Play the tier rotation" : "Pause the tier rotation"}
                >
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
                    {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
                  </svg>
                </button>
              )}
              <button type="button" className={control} onClick={() => go(index - 1)} aria-label="Previous partnership tier">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4l-6 6 6 6" />
                </svg>
              </button>
              <button type="button" className={control} onClick={() => go(index + 1)} aria-label="Next partnership tier">
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 4l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
