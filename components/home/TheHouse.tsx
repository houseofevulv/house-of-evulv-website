import { FitLine } from "@/components/FitLine";

const ideals = [
  { word: "Peace", clause: "that restores order" },
  { word: "Healing", clause: "that renews the human spirit" },
  { word: "Evolution", clause: "that transforms noble intention into lasting progress" },
];

/**
 * The House, on the page itself: the statement set as one line the full width of the hero card, in soft espresso,
 * the lead and the description beneath it, the three ideals, and the closing line full width in soft bronze.
 * Both wide lines fit the width at every screen size and never wrap.
 */
export function TheHouse() {
  return (
    <section id="about" aria-labelledby="house-heading" className="flex scroll-mt-4 flex-col px-4 py-14 md:px-12 md:py-24 lg:py-32">
      <p className="t-eyebrow m-0 text-bronze">The House</p>
      <h2 id="house-heading" className="sr-only">
        We create what the future remembers.
      </h2>
      <FitLine ariaHidden em={17.81} className="pt-4 text-espresso/30 md:pt-6">
        We create what the future remembers.
      </FitLine>

      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-12 md:gap-x-6 md:pt-16">
        <p className="m-0 font-display text-[clamp(26px,2.9vw,42px)] leading-[1.18] text-espresso italic md:col-span-6">
          Not every idea deserves a stage. The right idea deserves an <span className="text-bronze">institution.</span>
        </p>
        <p className="m-0 text-base leading-[1.7] text-body md:col-span-5 md:col-start-8 md:pt-2 md:text-[17px]">
          House of Evulv is a creative, strategic and impact-driven enterprise shaping premium initiatives at the
          intersection of culture, leadership, civic distinction and human progress. We bring ambitious visions to life
          through intelligent design, influential partnerships and impeccable execution.
        </p>
      </div>

      <div className="pt-14 md:pt-24">
        <p className="t-eyebrow m-0 text-bronze">Our work is anchored upon three enduring ideals</p>
        <ol className="m-0 grid list-none grid-cols-1 gap-6 p-0 pt-6 md:grid-cols-3 md:gap-6 md:pt-10">
          {ideals.map((i) => (
            <li key={i.word} className="flex flex-col gap-2 border-t border-rule-2 pt-5 md:pt-6">
              <span className="font-display text-[clamp(40px,4.6vw,72px)] leading-none font-semibold tracking-[-0.02em] text-espresso">
                {i.word}
              </span>
              <span className="text-base leading-snug text-body md:text-lg">{i.clause}</span>
            </li>
          ))}
        </ol>
      </div>

      <FitLine em={16.99} className="pt-14 text-bronze/45 md:pt-24">
        Purpose, polished into permanence.
      </FitLine>
    </section>
  );
}
