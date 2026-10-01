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
    <section
      id="commitments"
      className="flex scroll-mt-4 flex-col gap-6 px-2 pb-8 md:gap-10 md:px-6 md:pt-10 md:pb-16 lg:px-12"
    >
      <div className="mx-2 flex flex-col gap-4 md:mx-0 md:flex-row md:items-end md:justify-between md:px-4">
        <div className="flex flex-col gap-4">
          <p className="t-eyebrow m-0 text-bronze">The Evulv Ideology</p>
          <h2 className="t-h2-48 m-0 max-w-[640px]">
            Three forces. <br className="hidden md:block" />
            One human future.
          </h2>
        </div>
        <p className="m-0 max-w-[400px] text-base leading-[1.55] text-muted md:text-[17px]">
          Our philosophy is not ornamental language. It is the compass by which we conceive, choose and execute every
          initiative.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 lg:gap-6">
        {ideals.map((c) => (
          <article key={c.title} className="flex flex-col gap-5">
            <div className="flex aspect-[5/4] items-center justify-center rounded-[20px] bg-espresso md:aspect-square md:rounded-3xl">
              <Logo name={c.mark} className={`h-auto ${c.art}`} />
            </div>
            <div className="flex flex-col gap-2.5 px-2 md:px-1">
              <div className="flex items-baseline gap-3">
                <span className="t-eyebrow text-muted">{c.numeral}</span>
                <h3 className="t-tile-36 m-0 text-bronze">{c.title}</h3>
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-body md:text-base">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
