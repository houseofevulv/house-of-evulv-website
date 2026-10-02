/* eslint-disable @next/next/no-img-element -- the tree is an animated SVG */
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * No photograph and no repeat of the logo (it is already in the header): one element of the emblem at full scale.
 * The tree of life stands on the right, almost the height of the panel, its crown moving in a breeze and its DNA
 * turning; the open ring turns slowly behind the crown in a warm light. On phones the tree stands behind the text.
 * The headline rises line by line on arrival. Motion stops for reduced-motion visitors.
 */
export function Hero() {
  return (
    <section className="hero-home on-dark relative flex min-h-[min(720px,100svh)] flex-col overflow-clip rounded-[22px] text-ivory md:min-h-[760px] md:rounded-[28px] lg:min-h-[840px]">
      <div aria-hidden="true" className="hero-tree pointer-events-none absolute">
        <Logo name="ring" alt="" className="ring-turn absolute top-[24%] left-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14]" />
        <img
          src="/brand/motion/house-of-evulv_motion-tree-of-life_gold-and-silver.svg"
          width={1000}
          height={1594}
          alt=""
          className="relative block h-full w-full object-contain object-right-bottom"
        />
      </div>
      <SiteHeader variant="home" />
      <div id="content" className="relative flex grow flex-col justify-end px-5 pt-6 pb-10 md:justify-center md:px-12 md:pb-16 lg:px-16 lg:pb-20">
        <div className="flex max-w-[620px] flex-col md:max-w-[56%] lg:max-w-[52%] xl:max-w-[56%]">
          <h1 className="m-0 text-[clamp(46px,6.6vw,96px)] leading-[1.02] font-semibold tracking-[-0.015em]">
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
          <div className="rise-in flex flex-col gap-2.5 pt-8 sm:flex-row sm:flex-wrap sm:gap-3 md:pt-10" style={{ animationDelay: "0.7s" }}>
            <Link href="#sentinels" className="btn min-h-12 bg-gold px-7 py-[15px] font-bold whitespace-nowrap text-black">
              Discover our flagship →
            </Link>
            <Link href="#commitments" className="btn min-h-12 border border-ivory/60 px-7 py-[14px] font-semibold whitespace-nowrap text-ivory">
              Explore our ideology
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
