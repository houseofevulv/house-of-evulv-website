/* eslint-disable @next/next/no-img-element -- pre-sized WebP cut-outs, decorative */

const S = "/brand/sentinels/sentinels-of-peace";

/**
 * The seal's two knights as a faint backdrop: a pair, facing inward, standing at the two bottom corners of a dark
 * panel with only their upper half above its edge, fading out towards it. Used wherever the seal (which carries the
 * knights itself) is the focal point, so the mark is never shown twice at full strength.
 * The brand manual asks for the knights uncropped; this cropped, faint use is at the owner's request (October 2026).
 *
 * Place as the first child of a `relative overflow-clip` dark panel and make the content after it `relative`.
 * `rise`: the knights rise once into place on arrival (for a panel at the top of the page).
 */
export function KnightsBackdrop({ rise = false }: { rise?: boolean }) {
  return (
    <div aria-hidden="true" className="knights-backdrop pointer-events-none absolute inset-x-0 bottom-0">
      {(["left", "right"] as const).map((side) => (
        <div key={side} className={`knights-backdrop-${side} ${rise ? "knight-rise" : ""}`}>
          <img
            src={`${S}_knight-${side}-clean.webp`}
            width={side === "left" ? 406 : 398}
            height={900}
            alt=""
            loading={rise ? "eager" : "lazy"}
            decoding="async"
            className="block h-[var(--kh)] w-auto"
          />
        </div>
      ))}
    </div>
  );
}
