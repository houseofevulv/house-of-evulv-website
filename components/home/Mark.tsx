import { Logo } from "@/components/Logo";
import { RingBackdrop } from "@/components/Ornament";

export function Mark() {
  return (
    <section
      id="mark"
      className="on-dark relative grid scroll-mt-4 grid-cols-1 items-center gap-10 overflow-clip rounded-[22px] bg-espresso px-5 py-12 text-ivory md:grid-cols-12 md:gap-x-6 md:rounded-[28px] md:px-12 md:py-20 lg:px-16 lg:py-24"
    >
      <RingBackdrop className="md:!left-[21%] opacity-[0.12]" />
      <Logo name="houseEmblem" className="relative mx-auto h-auto w-[160px] md:col-span-5 md:w-[220px] lg:w-[280px]" />
      <div className="relative flex flex-col md:col-span-7 lg:col-span-5 lg:col-start-7">
        <p className="t-eyebrow m-0 text-gold">Our Official Mark</p>
        <h2 className="t-h2-48 m-0 pt-3 md:pt-4">A living emblem of humanity’s renewal.</h2>
        <p className="m-0 pt-6 text-base leading-[1.7] text-on-dark md:pt-8 md:text-[17px]">
          The tree signifies life, rooted wisdom and continuous evolution. The silver dove bearing the golden olive
          branch embodies peace, reconciliation and healing. Silver expresses clarity and integrity; gold affirms the
          enduring worth of purpose and a humanity restored, elevated and continually becoming.
        </p>
        <p className="t-eyebrow m-0 pt-8 text-gold md:pt-10">Peace. Healing. Evolution.</p>
      </div>
    </section>
  );
}
