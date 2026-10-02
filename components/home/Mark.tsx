import { Logo } from "@/components/Logo";
import { RingBackdrop } from "@/components/Ornament";

export function Mark() {
  return (
    // Square-edged black band running to both screen edges, butted against the ideology band above so the two read as
    // one dark spread. Rounded panels are kept for the heroes, the Sentinels feature and the contact band.
    <section
      id="mark"
      className="on-dark relative -mx-2 -mt-2 grid scroll-mt-4 grid-cols-1 items-center gap-10 overflow-clip bg-black px-6 py-16 text-ivory md:-mx-4 md:gap-14 md:px-16 md:py-24 lg:grid-cols-12 lg:gap-x-6 lg:px-20 lg:py-32 md:-mt-4 shadow-[0_0_0_100vmax_var(--color-black)] [clip-path:inset(0_-100vmax)]"
    >
      <RingBackdrop className="opacity-[0.1] lg:!left-[25%]" />
      <Logo
        name="houseEmblem"
        className="relative h-auto w-[150px] justify-self-center md:w-[200px] lg:col-span-5 lg:w-[260px]"
      />
      <div className="relative flex flex-col lg:col-span-6 lg:col-start-7">
        {/* <h2 className="t-h2-48 relative m-0 max-w-[720px] pt-3 md:pt-4">A living emblem of humanity’s renewal.</h2> */}
        <h2 className="t-h2-48 reveal m-0 max-w-[560px]">A living emblem of renewal.</h2>
        <p className="m-0 max-w-[560px] pt-6 text-base leading-[1.7] text-on-dark md:pt-8 md:text-[17px]">
          The tree signifies life, rooted wisdom and continuous evolution. The silver dove bearing the golden olive branch
          embodies peace, reconciliation and healing. Silver expresses clarity and integrity; gold affirms the enduring
          worth of purpose and a humanity restored, elevated and continually becoming.
        </p>
      </div>
    </section>
  );
}
