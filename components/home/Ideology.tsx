"use client";

import { Logo, type LogoName } from "@/components/Logo";
import { usePinnedStep } from "@/lib/usePinnedStep";

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
  // Below 640px the band is tall and its content pins: scrolling down steps through the three ideals sideways
  const { ref, active } = usePinnedStep<HTMLElement>(ideals.length);

  return (
    // A square-cornered espresso band that runs to both edges of the screen: the shadow paints past the page gutter
    // and the 1440px shell, and the clip-path keeps it from spilling above or below
    <section
      ref={ref}
      id="commitments"
      className="on-dark -mx-2 bg-espresso text-ivory shadow-[0_0_0_100vmax_var(--color-espresso)] [clip-path:inset(0_-100vmax)] max-sm:h-[280svh] md:-mx-4"
    >
      <div className="grid grid-cols-1 gap-10 px-6 py-16 max-sm:sticky max-sm:top-0 max-sm:h-svh max-sm:content-center max-sm:py-8 md:gap-16 md:px-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:px-20 lg:py-32">
        {/* Phones: the pinned screen is its own small page, so the icon sits centred behind all of it, very faint,
            rather than on the left-aligned heading */}
        <Logo
          name="houseIconWhite"
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-[min(118vw,560px)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05] sm:hidden"
        />
        <div className="relative flex flex-col lg:col-span-4">
          {/* The House icon in plain white, faint, behind the heading: the tree, the figure and the helix in the open
              ring. The icon rather than the full emblem, since the dove and the lotus stand beside it as ideals.
              On phones it sits centred behind the whole pinned screen instead (below). */}
          <Logo
            name="houseIconWhite"
            alt=""
            className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-[380px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07] max-sm:hidden lg:w-[420px]"
          />
          <h2 className="t-h2-48 reveal relative m-0">
            Three forces, <br />
            one human future.
          </h2>
          <p className="relative m-0 max-w-[400px] pt-6 text-base leading-[1.65] text-on-dark md:pt-8 md:text-[17px]">
            Our philosophy is not ornamental language. It is the compass by which we conceive, choose and execute every
            initiative.
          </p>
        </div>

        <div className="relative max-sm:overflow-hidden lg:col-span-7 lg:col-start-6">
          <div
            style={{ "--shift": active } as React.CSSProperties}
            className="flex transition-transform duration-500 ease-out max-sm:[transform:translateX(calc(var(--shift)*-100%))] motion-reduce:transition-none sm:grid sm:grid-cols-3 sm:gap-6 lg:gap-8"
          >
            {ideals.map((c) => (
              <article key={c.title} className="flex w-full shrink-0 flex-col max-sm:pr-6">
                <div className="flex size-[120px] items-center justify-center rounded-full border border-gold/40 md:size-[140px]">
                  <Logo name={c.mark} className={`h-auto ${c.art}`} />
                </div>
                <h3 className="t-tile-28 m-0 pt-6 text-gold md:pt-7">{c.title}</h3>
                <p className="m-0 max-w-[320px] pt-2.5 text-[15px] leading-[1.65] text-on-dark-2">{c.body}</p>
              </article>
            ))}
          </div>
          {/* Which of the three is showing */}
          <div aria-hidden="true" className="flex gap-2 pt-8 sm:hidden">
            {ideals.map((c, i) => (
              <span
                key={c.title}
                className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-gold" : "w-3 bg-ivory/25"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
