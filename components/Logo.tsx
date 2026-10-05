/* eslint-disable @next/next/no-img-element -- logos are SVG or pre-sized WebP and need no optimisation */

/*
  House of Evulv Identity 2 marks, from public/brand. Rules from the brand manual:
  - Colourway by background: gold-and-silver or white on espresso, black and photographs; bronze or espresso on ivory.
    Evulv Gold is never used on light backgrounds.
  - Smallest sizes on screen: horizontal 200px wide, full logo 240px, emblem 96px, Sentinels seal 120px.
    Below that, use the icon or the crest (24px minimum).
  - The Sentinels seal is used in full colour, as created. Its knights may flank content as a pair on espresso, black
    or Sentinel Navy only, never recoloured, flipped, cropped or shown singly.
  - Files are used exactly as supplied: no stretching, recolouring, effects or retyping the name.
*/
const H = "/brand/house/house-of-evulv";
const S = "/brand/sentinels/sentinels-of-peace";
const E = "/brand/elements/house-of-evulv_element";

const LOGOS = {
  // House of Evulv
  houseHorizontal: { src: `${H}_horizontal_gold-and-silver.svg`, w: 1628, h: 600, alt: "House of Evulv" },
  houseHorizontalLight: { src: `${H}_horizontal_bronze.svg`, w: 1628, h: 600, alt: "House of Evulv" },
  // The name alone, cropped from the horizontal logo: for the navigation bars
  houseWordmark: { src: `${H}_wordmark-horizontal_gold.svg`, w: 975, h: 390, alt: "House of Evulv" },
  houseLogo: { src: `${H}_logo_gold-and-silver.svg`, w: 975, h: 1407, alt: "House of Evulv: peace, healing, evolution" },
  houseFull: {
    src: `${H}_full-logo_gold-and-silver.svg`,
    w: 1085,
    h: 1553,
    alt: "House of Evulv: peace, healing, evolution. Elevating humanity, evolving consciousness.",
  },
  // The metallic emblem (gold and silver in relief), cut from the client's artwork: dark backgrounds only
  houseEmblem: { src: `${H}_emblem_metallic.webp`, w: 640, h: 676, alt: "House of Evulv emblem" },
  houseIcon: { src: `${H}_icon_gold-and-silver.svg`, w: 1000, h: 1059, alt: "House of Evulv" },
  houseIconWhite: { src: `${H}_icon_white.svg`, w: 1000, h: 1059, alt: "House of Evulv" },
  // Sentinels of Peace: the seal artwork as created (full colour, gold on Sentinel Navy), supplied as images
  sentinelsHorizontal: { src: `${S}_horizontal-gold.webp`, w: 1200, h: 416, alt: "Sentinels of Peace, by House of Evulv" },
  sentinelsHorizontalLight: { src: `${S}_horizontal-bronze.webp`, w: 1200, h: 416, alt: "Sentinels of Peace, by House of Evulv" },
  sentinelsSeal: { src: `${S}_seal.webp`, w: 1000, h: 949, alt: "Sentinels of Peace seal" },
  sentinelsFull: { src: `${S}_full-logo.webp`, w: 1000, h: 1004, alt: "Sentinels of Peace, by House of Evulv" },
  // The badge: a medal ring with the name arched along its top and a star (scripts/brand-motion/build_sentinels.py)
  sentinelsBadgeWhite: { src: `${S}_badge_white.svg`, w: 1000, h: 1000, alt: "" },
  sentinelsBadgeGold: { src: `${S}_badge_gold.svg`, w: 1000, h: 1000, alt: "" },
  sentinelsCrest: { src: `${S}_crest.webp`, w: 480, h: 709, alt: "Sentinels of Peace crest" },
  // The two knights: always as a pair, facing inward, on dark backgrounds, 300px tall or more.
  // Beside the seal (which carries them) they appear only as a faint backdrop: see components/KnightsBackdrop.tsx.
  // Clean cut-outs from the seal, each on its own plinth (scripts/brand-motion/knights.py).
  knightLeft: { src: `${S}_knight-left-clean.webp`, w: 406, h: 900, alt: "" },
  knightRight: { src: `${S}_knight-right-clean.webp`, w: 398, h: 900, alt: "" },
  // Elements of the emblem, one for each word of the tagline
  dove: { src: `${E}-dove_gold-and-silver.svg`, w: 1000, h: 930, alt: "Dove carrying an olive branch" },
  doveWhite: { src: `${E}-dove_white.svg`, w: 1000, h: 930, alt: "Dove carrying an olive branch" },
  doveLight: { src: `${E}-dove_bronze.svg`, w: 1000, h: 930, alt: "Dove carrying an olive branch" },
  lotus: { src: `${E}-lotus-and-water_gold-and-silver.svg`, w: 1000, h: 955, alt: "Lotus rising from still water" },
  lotusLight: { src: `${E}-lotus-and-water_bronze.svg`, w: 1000, h: 955, alt: "Lotus rising from still water" },
  tree: { src: `${E}-tree-of-life_gold-and-silver.svg`, w: 1000, h: 1594, alt: "Tree of life growing from a strand of DNA" },
  treeLight: { src: `${E}-tree-of-life_bronze.svg`, w: 1000, h: 1594, alt: "Tree of life growing from a strand of DNA" },
  // The same three elements cut from the metallic emblem (dark backgrounds only)
  doveMetallic: { src: `${E}-dove_metallic.webp`, w: 360, h: 388, alt: "Dove carrying an olive branch" },
  lotusMetallic: { src: `${E}-lotus_metallic.webp`, w: 360, h: 376, alt: "Lotus rising from still water" },
  treeMetallic: { src: `${E}-tree_metallic.webp`, w: 300, h: 464, alt: "Tree of life growing from a strand of DNA" },
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

/*
  The gold-and-silver lockups pair the metallic emblem with the wordmark from the supplied logo files (the same
  lettering, cropped to the name). Widths keep each lockup's proportions: horizontal 1628 by 600, stacked 975 by 1407.
*/
const LOCKUPS: Partial<Record<LogoName, "horizontal" | "stacked">> = {
  houseHorizontal: "horizontal",
  houseLogo: "stacked",
};

export function Logo({ name, className = "", alt, eager }: Props) {
  const l = LOGOS[name];
  const lockup = LOCKUPS[name];
  const loading = eager ? "eager" : "lazy";
  if (lockup === "horizontal") {
    return (
      <span role="img" aria-label={alt ?? l.alt} className={`flex aspect-[1628/600] items-center gap-[4%] ${className}`}>
        <img src={`${H}_emblem_metallic-160.webp`} width={160} height={169} alt="" className="block h-full w-auto" decoding="async" loading={loading} />
        <img src={`${H}_wordmark-horizontal_gold.svg`} width={975} height={390} alt="" className="block h-auto min-w-0 flex-1" decoding="async" loading={loading} />
      </span>
    );
  }
  if (lockup === "stacked") {
    return (
      <span role="img" aria-label={alt ?? l.alt} className={`flex flex-col items-center gap-[6%] ${className}`}>
        <img src={`${H}_emblem_metallic.webp`} width={640} height={676} alt="" className="block h-auto w-[84%]" decoding="async" loading={loading} />
        <img src={`${H}_wordmark-stacked_gold.svg`} width={975} height={467} alt="" className="block h-auto w-full" decoding="async" loading={loading} />
      </span>
    );
  }
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
