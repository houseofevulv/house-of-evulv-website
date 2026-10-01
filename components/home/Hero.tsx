import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/content";

/** No photograph: the emblem in gold and silver on espresso, as on the cover of the brand manual */
export function Hero() {
  return (
    <section className="on-dark flex min-h-[min(720px,100svh)] flex-col rounded-[22px] bg-espresso text-ivory md:rounded-[28px] lg:min-h-[820px]">
      <SiteHeader variant="home" />
      <div
        id="content"
        className="flex grow flex-col items-center gap-9 px-5 pt-4 pb-8 md:gap-12 md:px-8 md:pb-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-10 lg:pb-16"
      >
        <div className="order-2 flex flex-col gap-6 self-stretch lg:order-1 lg:col-span-7 lg:gap-8 lg:self-center">
          <p className="t-eyebrow m-0 text-gold">Peace | Healing | Evolution</p>
          <h1 className="t-home-hero m-0 text-gold">We honour and support the people who keep communities at peace.</h1>
          <p className="m-0 max-w-[520px] text-base leading-[1.55] text-on-dark md:text-lg">{site.description}</p>
          <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
            <Link href="/sentinels-of-peace" className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
              See the Sentinels of Peace
            </Link>
            <Link href="/our-story" className="btn min-h-12 border border-ivory px-[23px] py-[14px] font-semibold text-ivory">
              Our story
            </Link>
          </div>
        </div>
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <Logo name="houseEmblem" eager alt="" className="h-auto w-[200px] md:w-[280px] lg:w-[420px]" />
        </div>
      </div>
    </section>
  );
}
