import type { ReactNode } from "react";

/*
  A tile in the shape of the shield at the centre of the Sentinels of Peace seal (sentinels-of-peace_crest.webp):
  a shallow peak at the top, square shoulders, straight sides, then curving in to a point. Navy field lit from the
  top, inside a gold double frame, as on the crest. The shape is drawn once in a 100 x 130 box and stretched to the
  tile, which keeps that proportion; the strokes stay the same width at any size.
*/
const SHIELD = "M1 9 L50 1 L99 9 L99 74 C99 100 74 116 50 129 C26 116 1 100 1 74 Z";

/** `icon`: paths for a 24 x 24 line icon, set faint in the shield's lower point so it never competes with the text */
export function ShieldTile({ id, icon, children }: { id: string; icon?: ReactNode; children: ReactNode }) {
  const fill = `shield-fill-${id}`;
  return (
    <div className="relative aspect-[100/130] w-full">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 130"
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id={fill} cx="50%" cy="8%" r="95%">
            <stop offset="0%" stopColor="#2a4f9e" />
            <stop offset="45%" stopColor="#13306b" />
            <stop offset="100%" stopColor="#0a1a3f" />
          </radialGradient>
        </defs>
        <path d={SHIELD} fill={`url(#${fill})`} stroke="var(--color-gold)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        {/* The crest's inner gold line */}
        <path
          d={SHIELD}
          fill="none"
          stroke="var(--color-gold)"
          strokeOpacity="0.55"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          transform="translate(50 65) scale(0.9 0.92) translate(-50 -65)"
        />
      </svg>
      {/* Content starts at the same height in every tile, so titles line up; it stays clear of the narrowing point */}
      <div className="absolute inset-x-[13%] top-[19%] bottom-[26%] flex flex-col items-center justify-start text-center">
        {children}
      </div>
      {icon && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute bottom-[11%] left-1/2 block w-[17%] -translate-x-1/2 opacity-40"
        >
          {icon}
        </svg>
      )}
    </div>
  );
}
