"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "evulv-motion";

/**
 * The home hero's one loop (the slow ring) runs only while the hero is on screen and the tab is visible, and this
 * button stops it for good (WCAG 2.2.2 Pause, Stop, Hide). The choice is remembered on this device. Hidden for
 * visitors who ask for reduced motion, since nothing moves for them.
 */
export function MotionToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "paused") setPaused(true);
    } catch {
      // Storage blocked: start playing, the button still works for this visit
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (paused) root.dataset.motion = "paused";
    else delete root.dataset.motion;
  }, [paused]);

  useEffect(() => {
    const scene = ref.current?.closest<HTMLElement>(".scene");
    if (!scene) return;
    let onScreen = true;
    const sync = () => {
      if (onScreen && !document.hidden) delete scene.dataset.offscreen;
      else scene.dataset.offscreen = "";
    };
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(scene);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(KEY, next ? "paused" : "playing");
    } catch {
      // Not remembered, but applied
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      className="lnk absolute bottom-3 left-3 z-10 inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full px-3 text-[13px] font-semibold text-on-dark-2 motion-reduce:hidden md:bottom-6 md:left-6"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
        {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
      </svg>
      {paused ? "Play motion" : "Pause motion"}
    </button>
  );
}
