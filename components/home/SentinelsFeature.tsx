/* eslint-disable @next/next/no-img-element -- the knights are animated SVGs */
import Link from "next/link";
import { Logo } from "@/components/Logo";

const pillars = [
  { title: "Recognise", body: "Distinguished service, sacrifice and moral courage." },
  { title: "Convene", body: "Influential voices across sectors and generations." },
  { title: "Amplify", body: "Stories that restore faith in leadership and humanity." },
  { title: "Advance", body: "Partnerships that translate honour into social impact." },
];

const MOTION = "/brand/motion/sentinels-of-peace";

/** A knight that catches a passing light on its gold. Always shown as a pair, facing inward, 300px tall or more. */
function Knight({ side, className = "" }: { side: "left" | "right"; className?: string }) {
  return (
    <img
      src={`${MOTION}_motion-knight-${side}_light.svg`}
      width={side === "left" ? 406 : 398}
      height={900}
      alt=""
      loading="lazy"
      decoding="async"
      className={`block w-auto ${className}`}
    />
  );
}

/**
 * The flagship on the home page, in two parts on Sentinel Navy:
 * the knights stand guard either side of the introduction (as a pair above it on smaller screens), then the seal
 * sits on the left of what the honours do.
 */
export function SentinelsFeature() {
  return (
    <section
      id="sentinels"
      className="field-navy on-dark flex scroll-mt-4 flex-col rounded-[22px] px-5 py-14 text-ivory md:rounded-[28px] md:px-12 md:py-24 lg:py-28"
    >
      {/* Part one: the introduction between the two knights */}
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-end lg:justify-center lg:gap-10 xl:gap-16">
        <div aria-hidden="true" className="flex items-end gap-6 sm:gap-10 lg:hidden">
          <Knight side="left" className="h-[300px]" />
          <Knight side="right" className="h-[300px]" />
        </div>
        <Knight side="left" className="hidden h-[460px] lg:block xl:h-[540px]" />

        <div className="flex max-w-[660px] flex-col items-center text-center lg:pb-4">
          <p className="t-eyebrow m-0 text-on-dark-2">The Grand Honours · Lagos · December 2026</p>
          <p className="t-eyebrow m-0 pt-8 text-gold md:pt-10">Our Flagship Institution</p>
          <h2 className="t-feature m-0 pt-3 md:pt-4">Courage deserves more than applause.</h2>
          <p className="m-0 pt-6 text-base leading-[1.65] text-on-dark md:pt-8 md:text-lg">
            The Sentinels of Peace™ Grand Honours is conceived as an enduring national institution dedicated to
            identifying, honouring and amplifying extraordinary individuals and organisations advancing peace, responsible
            citizenship, community resilience and national development.
          </p>
          <p className="m-0 pt-4 text-[15px] leading-[1.65] text-on-dark-2 md:pt-5 md:text-base">
            Its inaugural gathering will convene leaders from government, business, diplomacy, peace and security
            institutions, traditional institutions, humanitarian organisations, the professions, media, academia and
            entertainment.
          </p>
          <div className="flex flex-col gap-2.5 self-stretch pt-8 md:flex-row md:gap-3 md:self-center md:pt-10">
            <Link href="/sentinels-of-peace#partner" className="btn min-h-12 bg-gold px-6 py-[15px] font-bold whitespace-nowrap text-black">
              Join the founding circle →
            </Link>
            <Link
              href="/sentinels-of-peace"
              className="btn min-h-12 border border-ivory/60 px-[23px] py-[14px] font-semibold whitespace-nowrap text-ivory"
            >
              Visit the programme
            </Link>
          </div>
        </div>

        <Knight side="right" className="hidden h-[460px] lg:block xl:h-[540px]" />
      </div>

      {/* Part two: the seal beside what the honours do */}
      <div className="mt-16 grid w-full max-w-[1100px] grid-cols-1 items-center gap-10 self-center border-t border-ivory/15 pt-14 md:mt-24 md:pt-20 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex justify-center lg:col-span-5">
          <Logo name="sentinelsSeal" className="h-auto w-[220px] md:w-[280px] lg:w-[min(100%,360px)]" />
        </div>
        <ol className="m-0 list-none border-t border-ivory/20 p-0 lg:col-span-7">
          {pillars.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[44px_1fr] items-baseline gap-x-4 border-b border-ivory/20 py-5 md:grid-cols-[56px_200px_1fr] md:gap-x-6 md:py-6">
              <span className="t-eyebrow text-gold tabular-nums">0{i + 1}</span>
              <h3 className="t-display m-0 text-xl md:text-2xl">{p.title}</h3>
              <p className="col-start-2 m-0 pt-1.5 text-[15px] leading-[1.6] text-on-dark-2 md:col-start-3 md:pt-0 md:text-base">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
