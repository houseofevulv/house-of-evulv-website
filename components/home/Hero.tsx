import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { GoldLight } from "./GoldLight";
import { HeroParallax } from "./HeroParallax";
import { MotionToggle } from "./MotionToggle";

/**
 * The metallic emblem on midnight, the text on the right. The open ring turns slowly behind the emblem (the site's
 * one loop, with a pause button), and on desktops the layers shift slightly with the pointer. On phones the emblem
 * sits above the headline. Motion stops for reduced-motion visitors.
 */
export function Hero() {
  return (
    // Full width: the panel steps out of the page gutter to both edges of the screen at every size (past the 1440px
    // page frame on wide screens), square-edged. Its contents stay in the 1440px frame.
    <section className="hero-home scene on-dark relative -mx-2 -mt-2 flex min-h-[min(760px,100svh)] flex-col overflow-clip text-ivory md:-mx-4 md:-mt-4 md:min-h-[760px] lg:min-h-[840px] min-[90rem]:mx-[calc(704px_-_50vw)]">
      <HeroParallax />
      <div className="relative mx-auto flex w-full max-w-[1440px] grow flex-col">
      {/* The metallic emblem is the hero's mark (the header shows the wordmark alone, so it is not shown twice). The open
          ring turns slowly behind it, and a light crosses the metal once on arrival. */}
      <div aria-hidden="true" className="hero-emblem pointer-events-none absolute">
        <div data-depth="3" className="absolute inset-0">
          <Logo
            name="ring"
            alt=""
            className="ring-turn absolute top-1/2 left-1/2 h-auto w-[128%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
          />
        </div>
        <div data-depth="2" className="emblem-light rise-in relative h-full w-full" style={{ animationDelay: "0.2s" }}>
          <Logo name="houseEmblem" alt="" eager className="h-full w-full" />
        </div>
      </div>

      <GoldLight />

      <SiteHeader variant="home" />
      <div
        id="content"
        className="relative flex grow flex-col justify-end px-5 pt-[340px] pb-[124px] md:justify-center md:px-12 md:pt-6 md:pb-[150px] lg:px-16 lg:pb-[170px]"
      >
        {/* Text on the right, opposite the scene, as in the official mark band */}
        <div className="flex max-w-[620px] flex-col md:ml-auto md:max-w-[64%] lg:max-w-[56%] xl:max-w-[52%]">
          <h1 className="t-home-display m-0">
            <span className="reveal-line">
              <span style={{ animationDelay: "0.1s" }}>Where vision</span>
            </span>
            <span className="reveal-line">
              <span style={{ animationDelay: "0.18s" }}>
                becomes <em className="gilt font-semibold">legacy.</em>
              </span>
            </span>
          </h1>
          <p className="rise-in m-0 max-w-[520px] pt-6 text-base leading-[1.65] text-on-dark md:pt-8 md:text-lg" style={{ animationDelay: "0.45s" }}>
            House of Evulv conceives and produces consequential platforms that foster peace, inspire healing and advance
            the evolution of people, institutions and society.
          </p>
          {/* One primary action in gold; the second is a quiet text link, so the hero keeps a single focal point */}
          <div
            className="rise-in flex flex-col gap-2.5 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3 md:pt-10"
            style={{ animationDelay: "0.55s" }}
          >
            <Link href="#sentinels" className="btn min-h-12 bg-gold px-7 py-[15px] font-bold whitespace-nowrap text-black">
              Discover our flagship →
            </Link>
            <Link
              href="#commitments"
              className="lnk inline-flex min-h-11 items-center justify-center font-semibold whitespace-nowrap text-ivory underline decoration-ivory/50 underline-offset-[6px]"
            >
              Explore our ideology
            </Link>
          </div>
        </div>
      </div>
      <MotionToggle />
      </div>
    </section>
  );
}
