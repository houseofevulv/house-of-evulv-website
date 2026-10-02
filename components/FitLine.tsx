import type { ReactNode } from "react";

/**
 * One line of display type that fills the width of its container exactly and never wraps, at any screen size.
 * `em` is the line's width in Libre Bodoni at a font size of 1 (measured with fontTools from the font file; kerning,
 * the slight negative tracking and the SemiBold weight only make the real line narrower, so it always fits).
 * The size is a share of the container's width, through container query units.
 */
export function FitLine({
  children,
  em,
  className = "",
  as: Tag = "p",
  ariaHidden,
}: {
  children: ReactNode;
  em: number;
  className?: string;
  as?: "p" | "h2" | "span" | "div";
  ariaHidden?: boolean;
}) {
  return (
    <span className="block w-full [container-type:inline-size]" aria-hidden={ariaHidden || undefined}>
      <Tag
        className={`m-0 block font-display leading-[0.95] font-semibold tracking-[-0.02em] whitespace-nowrap ${className}`}
        style={{ fontSize: `calc(100cqw / ${em})` }}
      >
        {children}
      </Tag>
    </span>
  );
}
