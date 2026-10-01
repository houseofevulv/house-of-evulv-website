/* eslint-disable @next/next/no-img-element -- SVG logos need no optimisation */

/*
  House of Evulv Identity 2 marks, from public/brand. Rules from the brand manual:
  - Colourway by background: gold-and-silver or white on espresso, black and photographs; bronze or espresso on ivory.
    Evulv Gold is never used on light backgrounds.
  - Smallest sizes on screen: horizontal 200px wide, full logo 240px, emblem 96px, Sentinels seal 120px.
    Below that, use the icon or the crest (24px minimum).
  - Files are used exactly as supplied: no stretching, recolouring, effects or retyping the name.
*/
const H = "/brand/house/house-of-evulv";
const S = "/brand/sentinels/sentinels-of-peace";
const E = "/brand/elements/house-of-evulv_element";

const LOGOS = {
  // House of Evulv
  houseHorizontal: { src: `${H}_horizontal_gold-and-silver.svg`, w: 1628, h: 600, alt: "House of Evulv" },
  houseHorizontalLight: { src: `${H}_horizontal_bronze.svg`, w: 1628, h: 600, alt: "House of Evulv" },
  houseLogo: { src: `${H}_logo_gold-and-silver.svg`, w: 975, h: 1407, alt: "House of Evulv: peace, healing, evolution" },
  houseFull: {
    src: `${H}_full-logo_gold-and-silver.svg`,
    w: 1085,
    h: 1553,
    alt: "House of Evulv: peace, healing, evolution. Elevating humanity, evolving consciousness.",
  },
  houseEmblem: { src: `${H}_emblem_gold-and-silver.svg`, w: 1000, h: 1059, alt: "House of Evulv emblem" },
  houseIcon: { src: `${H}_icon_gold-and-silver.svg`, w: 1000, h: 1059, alt: "House of Evulv" },
  // Sentinels of Peace
  sentinelsHorizontal: { src: `${S}_horizontal_gold-and-silver.svg`, w: 1815, h: 640, alt: "Sentinels of Peace, by House of Evulv" },
  sentinelsSeal: { src: `${S}_seal_gold-and-silver.svg`, w: 1000, h: 1000, alt: "Sentinels of Peace seal" },
  sentinelsSealLight: { src: `${S}_seal_bronze.svg`, w: 1000, h: 1000, alt: "Sentinels of Peace seal" },
  sentinelsCrest: { src: `${S}_crest_gold-and-silver.svg`, w: 700, h: 1016, alt: "Sentinels of Peace crest" },
  // Elements of the emblem, one for each word of the tagline
  dove: { src: `${E}-dove_gold-and-silver.svg`, w: 1000, h: 930, alt: "Dove carrying an olive branch" },
  doveWhite: { src: `${E}-dove_white.svg`, w: 1000, h: 930, alt: "Dove carrying an olive branch" },
  doveLight: { src: `${E}-dove_bronze.svg`, w: 1000, h: 930, alt: "Dove carrying an olive branch" },
  lotus: { src: `${E}-lotus-and-water_gold-and-silver.svg`, w: 1000, h: 955, alt: "Lotus rising from still water" },
  lotusLight: { src: `${E}-lotus-and-water_bronze.svg`, w: 1000, h: 955, alt: "Lotus rising from still water" },
  tree: { src: `${E}-tree-of-life_gold-and-silver.svg`, w: 1000, h: 1594, alt: "Tree of life growing from a strand of DNA" },
  treeLight: { src: `${E}-tree-of-life_bronze.svg`, w: 1000, h: 1594, alt: "Tree of life growing from a strand of DNA" },
  ring: { src: `${E}-open-ring_gold.svg`, w: 1000, h: 942, alt: "" },
  leaf: { src: `${E}-leaf_gold.svg`, w: 400, h: 881, alt: "" },
  leafLight: { src: `${E}-leaf_bronze.svg`, w: 400, h: 881, alt: "" },
} as const;

export type LogoName = keyof typeof LOGOS;

type Props = {
  name: LogoName;
  /** Set the rendered size with a class (e.g. w-[200px] or h-24); the other dimension follows the logo's proportions */
  className?: string;
  /** Pass "" when the mark is decorative or sits beside text that already names it */
  alt?: string;
  /** Load straight away: for marks at the top of the page */
  eager?: boolean;
};

export function Logo({ name, className = "", alt, eager }: Props) {
  const l = LOGOS[name];
  return (
    <img
      src={l.src}
      width={l.w}
      height={l.h}
      alt={alt ?? l.alt}
      className={`block ${className}`}
      decoding="async"
      loading={eager ? "eager" : "lazy"}
    />
  );
}
