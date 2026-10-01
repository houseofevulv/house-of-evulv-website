import { Logo } from "@/components/Logo";

// Meanings as set out in the brand manual, section 03
const parts = [
  { name: "The guards", meaning: "Two sentinels stand watch on either side, spears upright. Those who keep the peace." },
  { name: "The shield", meaning: "Protection. It holds what the sentinels guard." },
  { name: "The dove and olive", meaning: "Peace itself, at the centre of the shield. The same dove as House of Evulv." },
  { name: "The sword", meaning: "Pointed down and at rest beneath the dove. Strength held in reserve." },
  { name: "The laurels", meaning: "Honour, rising on both sides of the sword." },
  { name: "The steps and star", meaning: "The podium of recognition, and a guiding star above the name." },
];

export function TheSeal() {
  return (
    <section
      id="seal"
      aria-labelledby="seal-heading"
      className="on-dark grid scroll-mt-4 grid-cols-1 items-center gap-8 rounded-[22px] bg-espresso px-5 py-9 text-ivory md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:gap-x-6 lg:p-16"
    >
      <div className="flex justify-center lg:col-span-5">
        <Logo name="sentinelsSeal" className="h-auto w-[240px] md:w-[320px] lg:w-[380px]" />
      </div>
      <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
        <div className="flex flex-col gap-3">
          <p className="t-eyebrow m-0 text-gold">The seal</p>
          <h2 id="seal-heading" className="t-h2-48 m-0">
            Honour for those who stand guard over peace.
          </h2>
        </div>
        <dl className="m-0 border-t border-rule-dark">
          {parts.map((p) => (
            <div key={p.name} className="grid grid-cols-1 gap-1 border-b border-rule-dark py-3.5 md:grid-cols-[180px_1fr] md:gap-6">
              <dt className="text-[15px] font-bold text-ivory">{p.name}</dt>
              <dd className="m-0 text-[15px] leading-normal text-on-dark-2">{p.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
