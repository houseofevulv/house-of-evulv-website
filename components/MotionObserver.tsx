"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fallback for browsers without CSS scroll-driven animations (stable Firefox, older Safari). Holds back the
 * `.reveal` and `.reveal-photo` elements that are still below the fold, then lets each settle in once when it
 * arrives. Content is fully visible in the server HTML and stays visible if this never runs.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-photo"));
    const below = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
    if (below.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("reveal-done");
          el.classList.remove("reveal-pending");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    for (const el of below) {
      el.classList.add("reveal-pending");
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const el of below) el.classList.remove("reveal-pending");
    };
  }, [pathname]);

  return null;
}
