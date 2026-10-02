const ideals = [
  { word: "Peace", clause: "that restores order" },
  { word: "Healing", clause: "that renews the human spirit" },
  { word: "Evolution", clause: "that transforms noble intention into lasting progress" },
];

const tile = "rounded-[20px] p-6 md:rounded-[28px] md:p-10 lg:p-12";

/**
 * The House, as a bento the full width of the hero card: the statement large on sand, the lead on espresso, the
 * description on a white card, the three ideals across one wide band and the closing line set very large.
 */
export function TheHouse() {
  return (
    <section id="about" aria-labelledby="house-heading" className="grid scroll-mt-4 grid-cols-1 gap-2 md:gap-4 lg:grid-cols-12">
      <div className={`${tile} flex min-h-[360px] flex-col justify-between gap-12 bg-sand md:min-h-[520px] lg:col-span-8 lg:row-span-2`}>
        <p className="t-eyebrow m-0 text-bronze">The House</p>
        <h2 id="house-heading" className="m-0 text-[clamp(46px,7.4vw,118px)] leading-[0.98] font-semibold tracking-[-0.02em] text-espresso">
          We create what the future remembers.
        </h2>
      </div>

      <div className={`${tile} on-dark flex flex-col justify-end bg-espresso text-ivory lg:col-span-4`}>
        <p className="m-0 font-display text-[clamp(26px,2.6vw,38px)] leading-[1.18] italic">
          Not every idea deserves a stage. The right idea deserves an <span className="text-gold">institution.</span>
        </p>
      </div>

      <div className={`${tile} flex flex-col justify-end border border-card-border bg-white lg:col-span-4`}>
        <p className="m-0 text-base leading-[1.7] text-body md:text-[17px]">
          House of Evulv is a creative, strategic and impact-driven enterprise shaping premium initiatives at the
          intersection of culture, leadership, civic distinction and human progress. We bring ambitious visions to life
          through intelligent design, influential partnerships and impeccable execution.
        </p>
      </div>

      <div className={`${tile} border border-sand-deep lg:col-span-12`}>
        <p className="t-eyebrow m-0 text-bronze">Our work is anchored upon three enduring ideals</p>
        <ol className="m-0 grid list-none grid-cols-1 gap-8 p-0 pt-8 md:grid-cols-3 md:gap-6 md:pt-12">
          {ideals.map((i) => (
            <li key={i.word} className="flex flex-col gap-2 border-t border-sand-deep pt-5 md:pt-6">
              <span className="font-display text-[clamp(44px,5.4vw,84px)] leading-none font-semibold tracking-[-0.02em] text-espresso">
                {i.word}
              </span>
              <span className="text-[17px] leading-snug text-body md:text-lg">{i.clause}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={`${tile} on-dark bg-espresso py-12 text-ivory md:py-16 lg:col-span-12 lg:py-20`}>
        <p className="m-0 font-display text-[clamp(40px,7vw,112px)] leading-[1.02] font-semibold tracking-[-0.02em]">
          Purpose, polished <em className="text-gold">into permanence.</em>
        </p>
      </div>
    </section>
  );
}
