import { Logo, type LogoName } from "@/components/Logo";

// Each ideal has its own element of the emblem (brand manual, section 02)
const ideals: { title: string; mark: LogoName; body: string; art: string }[] = [
  {
    title: "Peace",
    mark: "dove",
    body: "We cultivate the conditions in which dignity, justice and mutual understanding can flourish. Peace is the architecture upon which every enduring society must rise.",
    art: "w-[62%]",
  },
  {
    title: "Healing",
    mark: "lotus",
    body: "We believe progress begins where wounds are acknowledged and humanity is restored. Healing reconnects people to hope, purpose and one another.",
    art: "w-[62%]",
  },
  {
    title: "Evolution",
    mark: "tree",
    body: "We transform insight into action and action into advancement. Evolution is our commitment to becoming wiser, stronger and more useful to the world.",
    art: "w-[40%]",
  },
];

export function Ideology() {
  return (
    // A square-cornered espresso band that runs to both edges of the screen: the shadow paints past the page gutter
    // and the 1440px shell, and the clip-path keeps it from spilling above or below
    <section
      id="commitments"
      className="on-dark -mx-2 grid scroll-mt-0 grid-cols-1 gap-12 bg-espresso px-6 py-16 text-ivory shadow-[0_0_0_100vmax_var(--color-espresso)] [clip-path:inset(0_-100vmax)] md:-mx-4 md:gap-16 md:px-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:px-20 lg:py-32"
    >
      <div className="flex flex-col lg:col-span-4">
        <p className="t-eyebrow m-0 text-gold">The Evulv Ideology</p>
        <h2 className="t-h2-48 m-0 pt-3 md:pt-4">
          Three forces, <br />
          one human future.
        </h2>
        <p className="m-0 max-w-[400px] pt-6 text-base leading-[1.65] text-on-dark md:pt-8 md:text-[17px]">
          Our philosophy is not ornamental language. It is the compass by which we conceive, choose and execute every
          initiative.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 lg:col-span-7 lg:col-start-6 lg:gap-8">
        {ideals.map((c) => (
          <article key={c.title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="flex size-[120px] items-center justify-center rounded-full border border-gold/40 md:size-[140px]">
              <Logo name={c.mark} className={`h-auto ${c.art}`} />
            </div>
            <h3 className="t-eyebrow m-0 pt-6 text-gold md:pt-7">{c.title}</h3>
            <p className="m-0 max-w-[320px] pt-2.5 text-[15px] leading-[1.65] text-on-dark-2">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
