import { FitLine } from "@/components/FitLine";
import { Logo } from "@/components/Logo";

export function TheHouse() {
  return (
    <section
      id="about"
      className="relative flex scroll-mt-4 flex-col items-center overflow-clip px-4 pt-8 pb-32 text-center md:px-12 md:pt-12 md:pb-40 lg:pt-14 lg:pb-44"
    >
      {/* The lotus on still water, faint, in each bottom corner: bronze, as the emblem's elements are on ivory. The
          bottom padding is at least the lotus's height, so it always sits below the text, never behind it. */}
      <Logo
        name="lotusLight"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-[110px] -translate-x-[8%] opacity-[0.14] md:w-[150px] lg:w-[170px]"
      />
      <Logo
        name="lotusLight"
        alt=""
        className="pointer-events-none absolute right-0 bottom-0 h-auto w-[110px] translate-x-[8%] opacity-[0.14] md:w-[150px] lg:w-[170px]"
      />
      {/* The name as one line the full width of the hero card, softened; it never wraps, at any width.
          em: the line's width in Libre Bodoni Bold at size 1, measured with fontTools (see FitLine). */}
      <h2 className="reveal relative m-0 w-full">
        <FitLine as="span" em={6.87} className="text-espresso/35">
          House of Evulv
        </FitLine>
      </h2>
      {/* Lead line, set aside for now:
      <p className="relative m-0 max-w-[520px] pt-5 text-[17px] leading-[1.55] font-medium text-muted md:pt-6 md:text-xl">
        Not every idea deserves a stage. The right idea deserves an institution.
      </p>
      */}
      <p className="relative m-0 max-w-[640px] pt-8 text-base leading-[1.7] text-body md:pt-12 md:text-[17px]">
        House of Evulv is a creative, strategic and impact-driven enterprise shaping premium initiatives at the
        intersection of culture, leadership, civic distinction and human progress. We bring ambitious visions to life
        through intelligent design, influential partnerships and impeccable execution.
      </p>
      <p className="relative m-0 max-w-[640px] pt-4 text-base leading-[1.7] text-body md:pt-5 md:text-[17px]">
        Our work is anchored upon three enduring ideals: peace that restores order, healing that renews the human
        spirit, and evolution that transforms noble intention into lasting progress.
      </p>
    </section>
  );
}
