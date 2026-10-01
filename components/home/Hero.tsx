import Link from "next/link";
import { Logo } from "@/components/Logo";
import { RingBackdrop } from "@/components/Ornament";
import { SiteHeader } from "@/components/SiteHeader";

/** No photograph: the headline set large against the emblem, which sits inside its own open ring */
export function Hero() {
  return (
    <section className="on-dark relative flex min-h-[min(720px,100svh)] flex-col overflow-clip rounded-[22px] bg-espresso text-ivory md:rounded-[28px] lg:min-h-[860px]">
      <RingBackdrop className="!top-[34%] opacity-[0.1] lg:!top-[52%] lg:!left-[76%] lg:!w-[1100px]" />
      <SiteHeader variant="home" />
      <div
        id="content"
        className="relative grid grow grid-cols-1 content-between gap-8 px-5 pt-4 pb-7 md:px-10 md:pb-12 lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pb-16"
      >
        <Logo
          name="houseEmblem"
          eager
          alt=""
          className="h-auto w-[150px] justify-self-center md:w-[220px] lg:order-2 lg:col-span-5 lg:w-[min(100%,400px)] lg:self-center lg:justify-self-end"
        />
        <h1 className="t-display m-0 text-[clamp(44px,8.6vw,124px)] leading-[0.98] font-bold tracking-[0.01em] lg:col-span-7 lg:self-center">
          Where vision <br />
          becomes <br />
          <span className="text-gold">legacy.</span>
        </h1>
        <div className="flex flex-col gap-6 lg:order-3 lg:col-span-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="m-0 max-w-[560px] text-base leading-[1.6] text-on-dark md:text-lg">
            House of Evulv conceives and produces consequential platforms that foster peace, inspire healing and advance
            the evolution of people, institutions and society.
          </p>
          <div className="flex shrink-0 flex-col gap-2.5 md:flex-row md:gap-3">
            <Link href="#sentinels" className="btn min-h-12 bg-gold px-7 py-[15px] font-bold text-black">
              Discover our flagship →
            </Link>
            <Link href="#commitments" className="btn min-h-12 border border-ivory px-7 py-[14px] font-semibold text-ivory">
              Explore our ideology
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
