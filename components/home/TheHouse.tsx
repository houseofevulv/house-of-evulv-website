import { FitLine } from "@/components/FitLine";
import { Divider } from "@/components/Ornament";

export function TheHouse() {
  return (
    <section
      id="about"
      className="flex scroll-mt-4 flex-col items-center px-4 pt-8 pb-16 text-center md:px-12 md:pt-12 md:pb-28 lg:pt-14 lg:pb-36"
    >
      {/* The name as one line the full width of the hero card, softened; it never wraps, at any width.
          em: the line's width in Libre Bodoni Bold at size 1, measured with fontTools (see FitLine). */}
      <h2 className="reveal m-0 w-full">
        <FitLine as="span" em={6.87} className="text-espresso/35">
          House of Evulv
        </FitLine>
      </h2>
      {/* One headline only: this line supports it, so it is set as a lead, not a second statement */}
      <p className="m-0 max-w-[520px] pt-5 text-[17px] leading-[1.55] font-medium text-muted md:pt-6 md:text-xl">
        Not every idea deserves a stage. The right idea deserves an institution.
      </p>
      <p className="m-0 max-w-[640px] pt-8 text-base leading-[1.7] text-body md:pt-12 md:text-[17px]">
        House of Evulv is a creative, strategic and impact-driven enterprise shaping premium initiatives at the
        intersection of culture, leadership, civic distinction and human progress. We bring ambitious visions to life
        through intelligent design, influential partnerships and impeccable execution.
      </p>
      <p className="m-0 max-w-[640px] pt-4 text-base leading-[1.7] text-body md:pt-5 md:text-[17px]">
        Our work is anchored upon three enduring ideals: peace that restores order, healing that renews the human
        spirit, and evolution that transforms noble intention into lasting progress.
      </p>
      <Divider tone="light" className="pt-10 md:pt-14" />
      <p className="t-display m-0 pt-5 text-lg leading-snug text-bronze md:text-xl">Purpose, polished into permanence.</p>
    </section>
  );
}
