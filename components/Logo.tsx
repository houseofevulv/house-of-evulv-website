/* eslint-disable @next/next/no-img-element -- SVG logos need no optimisation */

// Brand marks from public/brand, used as in logos/Brand-Marks-Guide.pdf:
// the no-tagline House lockup at small widths, the Sentinels horizontal lockup for web, the seal at 64px or more.
const LOGOS = {
  house: { src: "/brand/house-of-evulv/svg/horizontal-no-tagline-forest.svg", w: 461, h: 120, alt: "House of Evulv" },
  houseReversed: { src: "/brand/house-of-evulv/svg/horizontal-no-tagline-reversed.svg", w: 461, h: 120, alt: "House of Evulv" },
  sentinels: { src: "/brand/sentinels-of-peace/svg/horizontal-forest.svg", w: 488, h: 120, alt: "Sentinels of Peace" },
  seal: { src: "/brand/sentinels-of-peace/svg/seal-forest.svg", w: 200, h: 200, alt: "Sentinels of Peace seal" },
} as const;

type Props = {
  name: keyof typeof LOGOS;
  /** Set the rendered height with a class (e.g. h-8); width follows the logo's proportions */
  className?: string;
  /** Pass "" when the logo sits beside text that already names it */
  alt?: string;
};

export function Logo({ name, className = "", alt }: Props) {
  const l = LOGOS[name];
  return <img src={l.src} width={l.w} height={l.h} alt={alt ?? l.alt} className={`block w-auto ${className}`} decoding="async" />;
}
