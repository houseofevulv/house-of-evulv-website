import { Logo } from "@/components/Logo";
import { RingBackdrop } from "@/components/Ornament";

export function Mark() {
  return (
    <section
      id="mark"
      className="on-dark relative flex scroll-mt-4 flex-col items-center overflow-clip rounded-[22px] bg-espresso px-5 py-14 text-center text-ivory md:rounded-[28px] md:px-12 md:py-24 lg:py-32"
    >
      <RingBackdrop className="opacity-[0.1]" />
      <Logo name="houseEmblem" className="relative h-auto w-[150px] md:w-[200px] lg:w-[230px]" />
      <p className="t-eyebrow relative m-0 pt-10 text-gold md:pt-14">Our Official Mark</p>
      {/* <h2 className="t-h2-48 relative m-0 max-w-[720px] pt-3 md:pt-4">A living emblem of humanity’s renewal.</h2> */}
      <h2 className="t-h2-48 relative m-0 max-w-[720px] pt-3 md:pt-4">A living emblem of renewal.</h2>
      <p className="relative m-0 max-w-[640px] pt-6 text-base leading-[1.7] text-on-dark md:pt-8 md:text-[17px]">
        The tree signifies life, rooted wisdom and continuous evolution. The silver dove bearing the golden olive branch
        embodies peace, reconciliation and healing. Silver expresses clarity and integrity; gold affirms the enduring
        worth of purpose and a humanity restored, elevated and continually becoming.
      </p>
      {/* <p className="t-eyebrow relative m-0 pt-8 text-gold md:pt-12">Peace. Healing. Evolution.</p> */}
    </section>
  );
}
