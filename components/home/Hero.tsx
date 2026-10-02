import Link from "next/link";
import { LiveEmblem } from "@/components/LiveEmblem";
import { RingBackdrop } from "@/components/Ornament";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * No photograph: the headline beside the living emblem. A warm light sits behind the emblem and the open ring turns
 * slowly in the background; the headline rises line by line on arrival. Motion stops for reduced-motion visitors.
 */
export function Hero() {
  return (
    <section className="hero-home on-dark relative flex min-h-[min(720px,100svh)] flex-col overflow-clip rounded-[22px] text-ivory md:rounded-[28px] lg:min-h-[820px]">
      <RingBackdrop className="ring-turn !top-[30%] opacity-[0.1] lg:!top-[52%] lg:!left-[76%] lg:!w-[1000px]" />
      <SiteHeader variant="home" />
      <div
        id="content"
        className="relative grid grow grid-cols-1 content-center gap-10 px-5 pt-6 pb-10 md:gap-14 md:px-12 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-x-6 lg:px-16 lg:pb-24"
      >
        <LiveEmblem
          eager
          className="w-[170px] justify-self-center md:w-[230px] lg:order-2 lg:col-span-5 lg:w-[min(100%,420px)] lg:justify-self-end"
        />
        <div className="flex flex-col lg:col-span-7">
          <h1 className="m-0 text-[clamp(44px,6.4vw,92px)] leading-[1.02] font-semibold tracking-[-0.015em]">
            <span className="reveal-line">
              <span style={{ animationDelay: "0.15s" }}>Where vision</span>
            </span>
            <span className="reveal-line">
              <span style={{ animationDelay: "0.3s" }}>
                becomes <em className="gilt font-semibold">legacy.</em>
              </span>
            </span>
          </h1>
          <p className="rise-in m-0 max-w-[520px] pt-6 text-base leading-[1.65] text-on-dark md:pt-8 md:text-lg" style={{ animationDelay: "0.55s" }}>
            House of Evulv conceives and produces consequential platforms that foster peace, inspire healing and advance
            the evolution of people, institutions and society.
          </p>
          <div className="rise-in flex flex-col gap-2.5 pt-8 md:flex-row md:gap-3 md:pt-10" style={{ animationDelay: "0.7s" }}>
            <Link href="#sentinels" className="btn min-h-12 bg-gold px-7 py-[15px] font-bold text-black">
              Discover our flagship →
            </Link>
            <Link href="#commitments" className="btn min-h-12 border border-ivory/60 px-7 py-[14px] font-semibold text-ivory">
              Explore our ideology
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
