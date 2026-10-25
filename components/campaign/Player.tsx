"use client";

/* eslint-disable @next/next/no-img-element -- the poster is a single pre-sized frame */
import { useRef, useState, type ReactNode } from "react";

/**
 * A video that shows only its poster and a play button until pressed, so nothing downloads until someone asks for it.
 * Pressing swaps in the native player with its own controls and starts it. `children` sits over the poster (a title,
 * a caption) and goes away once the video plays.
 */
export function Player({
  src,
  poster,
  label,
  className = "",
  big = false,
  children,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
  big?: boolean;
  children?: ReactNode;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  if (playing) {
    return (
      <video
        ref={ref}
        src={src}
        poster={poster}
        controls
        autoPlay
        playsInline
        className={`bg-black object-contain ${className}`}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${label}`}
      className={`group relative block cursor-pointer overflow-hidden bg-black p-0 text-left ${className}`}
    >
      <img src={poster} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
      {/* A dark fall-off at the foot of the frame so the overlaid text stays readable on any frame */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 to-transparent" />
      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black shadow-[0_8px_30px_rgba(0,0,0,.35)] transition-transform duration-200 group-hover:scale-105 ${
          big ? "size-20 md:size-28" : "size-14 md:size-16"
        }`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={big ? "ml-1 size-8 md:size-11" : "ml-0.5 size-6 md:size-7"}>
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </span>
      {children}
    </button>
  );
}
