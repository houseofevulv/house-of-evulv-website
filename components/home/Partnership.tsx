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
      className="flex scroll-mt-4 flex-col items-center px-4 py-16 text-center md:px-12 md:py-28 lg:py-36"
    >
      <p className="t-eyebrow m-0 text-bronze">Strategic Partnership</p>
      <h2 className="t-h2-48 m-0 max-w-[720px] pt-3 md:pt-4">Stand at the founding edge of history.</h2>
      <p className="m-0 max-w-[640px] pt-6 text-base leading-[1.7] text-body md:pt-8 md:text-[17px]">
        We invite select institutions to participate as Strategic and Founding Partners of The Sentinels of Peace™ Grand
        Honours. Partnership is designed around shared values, institutional visibility and meaningful national impact.
      </p>
      <ul className="m-0 grid w-full max-w-[1100px] list-none grid-cols-1 gap-3 p-0 pt-10 sm:grid-cols-2 md:gap-4 md:pt-14 lg:grid-cols-4">
        {tiers.map((t) => (
          <li key={t.name} className="flex flex-col gap-2 rounded-[20px] bg-sand px-5 py-7 md:py-9">
            <span className="t-display text-lg text-ink">{t.name}</span>
            <span className="text-[15px] text-muted">{t.promise}</span>
          </li>
        ))}
      </ul>
      <a
        href={`mailto:${contact.email}?subject=${subject}`}
        className="btn mt-10 min-h-12 self-stretch bg-espresso px-6 py-[15px] font-bold text-ivory md:mt-14 md:self-center"
      >
        Express interest →
      </a>
    </section>
  );
}
