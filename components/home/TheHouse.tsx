export function TheHouse() {
  return (
    <section
      id="about"
      className="grid scroll-mt-4 grid-cols-1 gap-8 px-4 py-14 md:px-12 md:py-24 lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:py-[120px]"
    >
      <div className="flex flex-col gap-3 md:gap-4 lg:col-span-5">
        <p className="t-eyebrow m-0 text-bronze">The House</p>
        <h2 className="t-h2-48 m-0 max-w-[480px]">We create what the future remembers.</h2>
      </div>
      <div className="flex max-w-[620px] flex-col lg:col-span-6 lg:col-start-7">
        <p className="t-quote m-0">Not every idea deserves a stage. The right idea deserves an institution.</p>
        <p className="m-0 pt-6 text-base leading-[1.7] text-body md:pt-8 md:text-[17px]">
          House of Evulv is a creative, strategic and impact-driven enterprise shaping premium initiatives at the
          intersection of culture, leadership, civic distinction and human progress. We bring ambitious visions to life
          through intelligent design, influential partnerships and impeccable execution.
        </p>
        <p className="m-0 pt-4 text-base leading-[1.7] text-body md:pt-5 md:text-[17px]">
          Our work is anchored upon three enduring ideals: peace that restores order, healing that renews the human
          spirit, and evolution that transforms noble intention into lasting progress.
        </p>
        <p className="t-eyebrow m-0 pt-8 text-bronze md:pt-10">Purpose, polished into permanence.</p>
      </div>
    </section>
  );
}
