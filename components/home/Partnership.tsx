import { contact } from "@/lib/content";

const tiers = [
  { name: "Founding Partnership", promise: "Institutional legacy" },
  { name: "Strategic Partnership", promise: "Shared impact" },
  { name: "Programme Partnership", promise: "Purposeful activation" },
  { name: "Media Partnership", promise: "National amplification" },
];

const subject = encodeURIComponent("Partnership interest: The Sentinels of Peace Grand Honours");

export function Partnership() {
  return (
    <section
      id="partnership"
      className="grid scroll-mt-4 grid-cols-1 gap-8 px-4 py-10 md:px-12 md:py-16 lg:grid-cols-12 lg:gap-x-6 lg:px-16"
    >
      <div className="flex flex-col gap-5 lg:col-span-6">
        <p className="t-eyebrow m-0 text-bronze">Strategic Partnership</p>
        <h2 className="t-h2-48 m-0 max-w-[560px]">Stand at the founding edge of history.</h2>
        <p className="m-0 max-w-[520px] text-base leading-[1.65] text-body md:text-[17px]">
          We invite select institutions to participate as Strategic and Founding Partners of The Sentinels of Peace™
          Grand Honours. Partnership is designed around shared values, institutional visibility and meaningful national
          impact.
        </p>
        <a
          href={`mailto:${contact.email}?subject=${subject}`}
          className="btn min-h-12 bg-espresso px-6 py-[15px] font-bold text-ivory md:self-start"
        >
          Express interest →
        </a>
      </div>
      <ul className="m-0 flex list-none flex-col p-0 lg:col-span-5 lg:col-start-8">
        {tiers.map((t) => (
          <li
            key={t.name}
            className="flex flex-col gap-1 border-t border-rule-2 py-4 last:border-b md:flex-row md:items-baseline md:justify-between md:gap-6 md:py-5"
          >
            <span className="t-display text-lg text-ink md:text-xl">{t.name}</span>
            <span className="text-[15px] text-muted">{t.promise}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
