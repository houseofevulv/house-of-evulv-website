/* eslint-disable @next/next/no-img-element -- animated SVGs, served as files so each element keeps its own motion */

/*
  The House of Evulv emblem, alive: the animated tree, dove and lotus (public/brand/motion) laid over the emblem's
  open ring, each in its exact place in the emblem file (house-of-evulv_emblem_gold-and-silver.svg, 1000 x 1059).
  At rest, or for visitors who ask for reduced motion, it is the emblem as drawn.
*/
const M = "/brand/motion/house-of-evulv";

// Position and width of each element inside the emblem, as a share of its width and height (measured from the file)
const PARTS = [
  { src: `${M}_motion-tree-of-life_gold-and-silver.svg`, w: 1000, h: 1594, style: { left: "17.08%", top: "0%", width: "66.55%" } },
  { src: `${M}_motion-lotus_gold-and-silver.svg`, w: 1000, h: 955, style: { left: "59.07%", top: "55.98%", width: "30.54%" } },
  { src: `${M}_motion-dove_gold-and-silver.svg`, w: 1000, h: 930, style: { left: "1.52%", top: "42.46%", width: "42.87%" } },
];

export function LiveEmblem({ className = "", eager }: { className?: string; eager?: boolean }) {
  const loading = eager ? "eager" : "lazy";
  return (
    <div role="img" aria-label="House of Evulv emblem" className={`relative aspect-[1000/1059] ${className}`}>
      <img
        src={`${M}_emblem-ring_gold-and-silver.svg`}
        width={1000}
        height={1059}
        alt=""
        loading={loading}
        decoding="async"
        className="absolute inset-0 block h-full w-full"
      />
      {PARTS.map((p) => (
        <img
          key={p.src}
          src={p.src}
          width={p.w}
          height={p.h}
          alt=""
          loading={loading}
          decoding="async"
          className="absolute block h-auto"
          style={p.style}
        />
      ))}
    </div>
  );
}
