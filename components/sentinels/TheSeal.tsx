import { Logo } from "@/components/Logo";

// Meanings as set out in the brand manual, section 03
const parts = [
  { name: "The guards", meaning: "Two sentinels stand watch on either side, spears upright. Those who keep the peace." },
  { name: "The shield", meaning: "Protection. It holds what the sentinels guard." },
  { name: "The dove and olive", meaning: "Peace itself, at the centre of the shield, an olive branch in its beak." },
  { name: "The sword", meaning: "Pointed down and at rest beneath the dove. Strength held in reserve." },
  { name: "The laurels", meaning: "Honour, rising on both sides of the sword." },
  { name: "The steps and star", meaning: "The podium of recognition, and a guiding star above the name." },
];

/** Sentinel Navy panel: the seal in full colour, with the two knights standing guard either side from 1024px */
export function TheSeal() {
  return (
    <section
      id="seal"
      aria-labelledby="seal-heading"
      className="on-dark flex scroll-mt-4 flex-col gap-10 rounded-[22px] bg-navy px-5 py-10 text-ivory md:gap-14 md:rounded-[28px] md:p-12 lg:p-16"
    >
      <div className="flex items-end justify-center gap-10 xl:gap-20">
        {/* Knights: a pair, facing inward, never below 300px tall (brand manual, "The Sentinels") */}
        <Logo name="knightLeft" className="hidden h-[380px] w-auto lg:block xl:h-[440px]" />
        <div className="flex max-w-[560px] flex-col items-center gap-7 text-center">
          <Logo name="sentinelsSeal" className="h-auto w-[240px] md:w-[300px]" />
          <div className="flex flex-col gap-3">
            <p className="t-eyebrow m-0 text-gold">The seal</p>
            <h2 id="seal-heading" className="t-h2-48 m-0">
              Honour for those who stand guard over peace.
            </h2>
          </div>
        </div>
        <Logo name="knightRight" className="hidden h-[380px] w-auto lg:block xl:h-[440px]" />
      </div>
      <dl className="m-0 grid grid-cols-1 border-t border-ivory/20 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
        {parts.map((p) => (
          <div key={p.name} className="flex flex-col gap-1 border-b border-ivory/20 py-4">
            <dt className="text-[15px] font-bold text-gold">{p.name}</dt>
            <dd className="m-0 text-[15px] leading-normal text-on-dark">{p.meaning}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
