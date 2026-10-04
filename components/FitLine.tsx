import type { ReactNode } from "react";

/**
 * One line of display type that fills the width of its container exactly and never wraps, at any screen size.
 * `em` is the line's width in Bungee at a font size of 1 (measured with fontTools from the font file; kerning only
 * makes the real line narrower, so it always fits).
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
        className={`m-0 block font-display leading-[0.95] font-normal whitespace-nowrap ${className}`}
        style={{ fontSize: `calc(100cqw / ${em})` }}
      >
        {children}
      </Tag>
    </span>
  );
}
