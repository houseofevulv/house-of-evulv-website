import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Divider, RingBackdrop } from "@/components/Ornament";
import { SiteHeader } from "@/components/SiteHeader";

/** No photograph: the emblem on espresso, the client's headline, one sentence, two actions (brand manual cover) */
export function Hero() {
  return (
    <section className="on-dark relative flex min-h-[min(680px,100svh)] flex-col overflow-clip rounded-[22px] bg-espresso text-ivory md:rounded-[28px] lg:min-h-[780px]">
      <RingBackdrop className="mt-10" />
      <SiteHeader variant="home" />
      <div
        id="content"
        className="relative flex grow flex-col items-center justify-center gap-7 px-5 pt-2 pb-10 text-center md:gap-9 md:px-8 md:pb-14 lg:pb-20"
      >
        <Logo name="houseEmblem" eager alt="" className="h-auto w-[150px] md:w-[210px] lg:w-[250px]" />
        <h1 className="t-home-hero m-0 max-w-[820px] text-gold">Where vision becomes legacy.</h1>
        <Divider />
        <p className="m-0 max-w-[620px] text-base leading-[1.6] text-on-dark md:text-lg">
          House of Evulv conceives and produces consequential platforms that foster peace, inspire healing and advance
          the evolution of people, institutions and society.
        </p>
        <div className="flex flex-col gap-2.5 self-stretch md:flex-row md:gap-3 md:self-center">
          <Link href="#sentinels" className="btn min-h-12 bg-gold px-7 py-[15px] font-bold text-black">
            Discover our flagship →
          </Link>
          <Link href="#commitments" className="btn min-h-12 border border-ivory px-7 py-[14px] font-semibold text-ivory">
            Explore our ideology
          </Link>
        </div>
      </div>
    </section>
  );
}
