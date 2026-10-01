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
      className="grid scroll-mt-4 grid-cols-1 gap-10 px-4 py-14 md:gap-14 md:px-12 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:px-16 lg:py-[120px]"
    >
      <div className="flex flex-col lg:col-span-5">
        <p className="t-eyebrow m-0 text-bronze">Strategic Partnership</p>
        <h2 className="t-h2-48 m-0 pt-3 md:pt-4">Stand at the founding edge of history.</h2>
        <p className="m-0 max-w-[480px] pt-6 text-base leading-[1.7] text-body md:pt-8 md:text-[17px]">
          We invite select institutions to participate as Strategic and Founding Partners of The Sentinels of Peace™
          Grand Honours. Partnership is designed around shared values, institutional visibility and meaningful national
          impact.
        </p>
        <a
          href={`mailto:${contact.email}?subject=${subject}`}
          className="btn mt-8 min-h-12 bg-espresso px-6 py-[15px] font-bold text-ivory md:mt-10 md:self-start"
        >
          Express interest →
        </a>
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 md:gap-4 lg:col-span-6 lg:col-start-7">
        {tiers.map((t) => (
          <li key={t.name} className="flex flex-col gap-2 rounded-[20px] bg-sand p-6 md:p-8">
            <span className="t-display text-lg text-ink md:text-xl">{t.name}</span>
            <span className="text-[15px] text-muted">{t.promise}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
