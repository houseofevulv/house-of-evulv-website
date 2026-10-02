/* eslint-disable @next/next/no-img-element -- the scene is made of animated SVGs */
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroParallax } from "./HeroParallax";

const M = "/brand/motion/house-of-evulv";

/**
 * The emblem unfolded into a scene. The tree of life stands on the right, its DNA fading at the root; the lotus
 * floats beside the trunk; the dove flies in on arrival and glides beside the crown. The
 * open ring turns behind the crown in a warm light, and on desktops the layers shift with the pointer for depth.
 * On phones the scene sits above the headline. Motion stops for reduced-motion visitors.
 */
export function Hero() {
  return (
    <section className="hero-home scene on-dark relative flex min-h-[min(760px,100svh)] flex-col overflow-clip rounded-[22px] text-ivory md:min-h-[760px] md:rounded-[28px] lg:min-h-[840px]">
      <HeroParallax />
      <div aria-hidden="true" className="hero-tree pointer-events-none absolute">
        <div data-depth="3" className="absolute inset-0">
          <Logo
            name="ring"
            alt=""
            className="ring-turn absolute top-[24%] left-1/2 h-auto w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
          />
        </div>

        <div data-depth="2" className="absolute inset-0">
          <img
            src={`${M}_motion-tree-of-life_gold-and-silver.svg`}
            width={1000}
            height={1594}
            alt=""
            className="tree-rooted relative block h-full w-full object-contain object-right-bottom"
          />
        </div>

        {/* In the emblem's own places, measured relative to the tree */}
        <div data-depth="2.5" className="absolute top-[55.9%] left-[63.1%] w-[45.9%]">
          <img src={`${M}_motion-lotus-flower_gold-and-silver.svg`} width={1000} height={955} alt="" className="block h-auto w-full" />
        </div>
        <div data-depth="4" className="absolute top-[42.4%] left-[-23.4%] w-[64.4%]">
          <div className="dove-arrive">
            <img src={`${M}_motion-dove_gold-and-silver.svg`} width={1000} height={930} alt="" className="block h-auto w-full" />
          </div>
        </div>
      </div>

      <SiteHeader variant="home" />
      <div
        id="content"
        data-depth="-1"
        className="relative flex grow flex-col justify-end px-5 pt-[300px] pb-10 md:justify-center md:px-12 md:pt-6 md:pb-[150px] lg:px-16 lg:pb-[170px]"
      >
        <div className="flex max-w-[620px] flex-col md:max-w-[52%] lg:max-w-[50%] xl:max-w-[54%]">
          <h1 className="m-0 text-[clamp(44px,6.4vw,96px)] leading-[1.02] font-semibold tracking-[-0.015em]">
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
