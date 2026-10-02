"use client";

import { useEffect, useRef } from "react";

/**
 * Gives the hero scene depth: as the pointer moves over the panel, its layers shift by different amounts
 * (see .scene [data-depth] in globals.css). Mouse and trackpad only, and never for reduced-motion visitors.
 */
export function HeroParallax() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const panel = ref.current?.closest("section");
    if (!panel) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        panel.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      panel.style.setProperty("--px", "0");
      panel.style.setProperty("--py", "0");
    };
    panel.addEventListener("pointermove", move);
    panel.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      panel.removeEventListener("pointermove", move);
      panel.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <span ref={ref} hidden />;
}
