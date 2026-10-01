"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

export type Slide = { src: string; alt: string; position: string; mobilePosition?: string };

const INTERVAL_MS = 7000;

/**
 * Crossfading background photos for the Sentinels hero.
 * WCAG 2.2.2: auto-advancing content has a pause control. Visitors who prefer reduced motion get a still image,
 * and rotation stops while the tab is hidden.
 * The pause button and position dots are placed into the element whose id is `controlsSlot`, so they sit in the
 * hero's content rather than under the photo scrim.
 */
export function HeroSlides({ slides, controlsSlot }: { slides: Slide[]; controlsSlot: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => setSlot(document.getElementById(controlsSlot)), [controlsSlot]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const running = !paused && !reduced && slides.length > 1;

  useEffect(() => {
    if (!running) return;
    let id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    const onVisibility = () => {
      window.clearInterval(id);
      if (!document.hidden) id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [running, slides.length]);

  return (
    <>
      <div aria-roledescription="slideshow" aria-label="Photographs of honours and ceremony" className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ "--pos": s.position, "--pos-m": s.mobilePosition ?? s.position } as CSSProperties}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1440px) 1408px, 100vw"
              className="object-cover object-[var(--pos-m)] md:object-[var(--pos)]"
            />
          </div>
        ))}
      </div>

      {slot &&
        slides.length > 1 &&
        createPortal(
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {slides.map((s, i) => (
              <span
                key={s.src}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-gold" : "w-1.5 bg-ivory/50"}`}
              />
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="flex size-11 items-center justify-center rounded-xl bg-ivory/12 text-ivory backdrop-blur-sm"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                </svg>
              )}
            </button>
          )}
        </div>,
          slot
        )}
    </>
  );
}
