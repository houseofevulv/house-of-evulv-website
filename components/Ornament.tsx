import type { ReactNode } from "react";
import { Logo } from "./Logo";

/*
  Design elements drawn from the brand artwork, for use anywhere on the site.
  - Divider: the hairline, three dots, hairline that sits under the tagline in the full logo.
  - FlankedLabel: a label between two hairlines, as in "— HOUSE OF —" and "— BY HOUSE OF EVULV —".
  - RingBackdrop: the emblem's open ring, faint, behind a dark panel's content.
  Colours follow the manual: gold with a silver centre on dark; bronze on light. Never gold on light.
*/

type Tone = "dark" | "light";

export function Divider({ tone = "dark", className = "" }: { tone?: Tone; className?: string }) {
  const line = tone === "dark" ? "bg-gold/70" : "bg-bronze/70";
  const dot = tone === "dark" ? "bg-gold" : "bg-bronze";
  const centre = tone === "dark" ? "bg-silver" : "bg-bronze";
  return (
    <div aria-hidden="true" className={`flex items-center gap-2.5 ${className}`}>
      <span className={`h-px w-14 md:w-20 ${line}`} />
      <span className={`size-1 rounded-full ${dot}`} />
      <span className={`size-1.5 rounded-full ${centre}`} />
      <span className={`size-1 rounded-full ${dot}`} />
      <span className={`h-px w-14 md:w-20 ${line}`} />
    </div>
  );
}

export function FlankedLabel({
  children,
  tone = "dark",
  as: Tag = "p",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  as?: "p" | "h2" | "span";
  className?: string;
}) {
  const line = tone === "dark" ? "bg-gold/70" : "bg-bronze/70";
  const text = tone === "dark" ? "text-gold" : "text-bronze";
  return (
    <Tag className={`t-eyebrow m-0 flex items-center justify-center gap-3 ${text} ${className}`}>
      <span aria-hidden="true" className={`h-px w-6 shrink-0 md:w-10 ${line}`} />
      <span>{children}</span>
      <span aria-hidden="true" className={`h-px w-6 shrink-0 md:w-10 ${line}`} />
    </Tag>
  );
}

/** Place inside a `relative overflow-clip` dark panel; content after it should be `relative` */
export function RingBackdrop({ className = "" }: { className?: string }) {
  return (
    <Logo
      name="ring"
      className={`pointer-events-none absolute top-1/2 left-1/2 h-auto w-[620px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07] md:w-[900px] ${className}`}
    />
  );
}
