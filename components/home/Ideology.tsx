import { Logo, type LogoName } from "@/components/Logo";

// Each ideal has its own element of the emblem (brand manual, section 02)
const ideals: { numeral: string; title: string; mark: LogoName; body: string; art: string }[] = [
  {
    numeral: "I",
    title: "Peace",
    mark: "dove",
    body: "We cultivate the conditions in which dignity, justice and mutual understanding can flourish. Peace is the architecture upon which every enduring society must rise.",
    art: "w-[52%]",
  },
  {
    numeral: "II",
    title: "Healing",
    mark: "lotus",
    body: "We believe progress begins where wounds are acknowledged and humanity is restored. Healing reconnects people to hope, purpose and one another.",
    art: "w-[52%]",
  },
  {
    numeral: "III",
    title: "Evolution",
    mark: "tree",
    body: "We transform insight into action and action into advancement. Evolution is our commitment to becoming wiser, stronger and more useful to the world.",
    art: "w-[34%]",
  },
];

export function Ideology() {
  return (
    // Follows The House on the same ground, so it carries no top padding of its own
    <section
      id="commitments"
      className="flex scroll-mt-12 flex-col gap-10 px-4 pb-14 md:gap-14 md:px-12 md:pb-24 lg:gap-16 lg:px-16 lg:pb-[120px]"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-6">
        <div className="flex flex-col gap-3 md:gap-4 lg:col-span-6">
          <p className="t-eyebrow m-0 text-bronze">The Evulv Ideology</p>
          <h2 className="t-h2-48 m-0">
            Three forces. <br />
            One human future.
          </h2>
        </div>
        <p className="m-0 max-w-[460px] text-base leading-[1.65] text-muted md:text-[17px] lg:col-span-5 lg:col-start-8">
          Our philosophy is not ornamental language. It is the compass by which we conceive, choose and execute every
          initiative.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
        {ideals.map((c) => (
          <article key={c.title} className="flex flex-col gap-6 md:gap-7">
            <div className="flex aspect-[5/4] items-center justify-center rounded-[20px] bg-espresso md:aspect-square md:rounded-3xl">
              <Logo name={c.mark} className={`h-auto ${c.art}`} />
            </div>
            <div className="flex flex-col gap-3 md:pr-4">
              <span className="t-eyebrow text-muted">{c.numeral}</span>
              <h3 className="t-tile-36 m-0 text-bronze">{c.title}</h3>
              <p className="m-0 pt-1 text-[15px] leading-[1.65] text-body md:text-base">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
