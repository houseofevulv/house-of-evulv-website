import Link from "next/link";
import { KnightsBackdrop } from "@/components/KnightsBackdrop";
import { Logo } from "@/components/Logo";

const pillars = [
  { title: "Recognise", body: "Distinguished service, sacrifice and moral courage." },
  { title: "Convene", body: "Influential voices across sectors and generations." },
  { title: "Amplify", body: "Stories that restore faith in leadership and humanity." },
  { title: "Advance", body: "Partnerships that translate honour into social impact." },
];

/**
 * The flagship on the home page, on Sentinel Navy: the seal leads, then the introduction and its two actions, then
 * what the honours do. The seal carries its own knights, so the standalone pair stays in the background, faint, rising
 * from the bottom edge of the band.
 */
export function SentinelsFeature() {
  return (
    <section
      id="sentinels"
      className="field-navy on-dark relative flex scroll-mt-4 flex-col items-center overflow-clip rounded-[22px] px-5 pt-14 pb-20 text-center text-ivory md:rounded-[28px] md:px-12 md:pt-24 md:pb-32 lg:pt-28 lg:pb-40"
    >
      <KnightsBackdrop />
      <div className="relative flex max-w-[660px] flex-col items-center">
        <Logo name="sentinelsSeal" className="h-auto w-[180px] md:w-[220px] lg:w-[240px]" />
        <p className="m-0 pt-6 text-[15px] font-medium text-on-dark-2 md:pt-8">The Grand Honours · Lagos · December 2026</p>
        <h2 className="t-feature reveal m-0 pt-4 md:pt-5">Courage deserves more than applause.</h2>
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

      {/* What the honours do: parallel aims, so no numbering and no rules, just space */}
      <ul className="relative m-0 grid w-full max-w-[920px] list-none grid-cols-1 gap-x-8 gap-y-8 p-0 pt-16 sm:grid-cols-2 md:pt-24 lg:grid-cols-4">
        {pillars.map((p) => (
          <li key={p.title} className="flex flex-col items-center">
            <h3 className="t-display m-0 text-xl text-gold md:text-2xl">{p.title}</h3>
            <p className="m-0 max-w-[240px] pt-2 text-[15px] leading-[1.6] text-on-dark-2">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
