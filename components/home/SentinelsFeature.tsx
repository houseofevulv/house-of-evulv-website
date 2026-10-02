import Link from "next/link";
import { Logo } from "@/components/Logo";

const pillars = [
  { title: "Recognise", body: "Distinguished service, sacrifice and moral courage." },
  { title: "Convene", body: "Influential voices across sectors and generations." },
  { title: "Amplify", body: "Stories that restore faith in leadership and humanity." },
  { title: "Advance", body: "Partnerships that translate honour into social impact." },
];

export function SentinelsFeature() {
  return (
    <section
      id="sentinels"
      className="on-dark flex scroll-mt-4 flex-col items-center rounded-[22px] bg-navy px-5 py-14 text-center text-ivory md:rounded-[28px] md:px-12 md:py-24 lg:py-32"
    >
      {/* The seal alone: it already carries its two sentinels */}
      <Logo name="sentinelsSeal" className="h-auto w-[190px] md:w-[240px] lg:w-[270px]" />
      <p className="t-eyebrow m-0 pt-6 text-on-dark-2 md:pt-8">The Grand Honours · Lagos · December 2026</p>

      <p className="t-eyebrow m-0 pt-12 text-gold md:pt-20">Our Flagship Institution</p>
      <h2 className="t-feature m-0 max-w-[820px] pt-3 md:pt-4">Courage deserves more than applause.</h2>
      <p className="m-0 max-w-[660px] pt-6 text-base leading-[1.65] text-on-dark md:pt-8 md:text-lg">
        The Sentinels of Peace™ Grand Honours is conceived as an enduring national institution dedicated to identifying,
        honouring and amplifying extraordinary individuals and organisations advancing peace, responsible citizenship,
        community resilience and national development.
      </p>
      <p className="m-0 max-w-[660px] pt-4 text-[15px] leading-[1.65] text-on-dark-2 md:pt-5 md:text-base">
        Its inaugural gathering will convene leaders from government, business, diplomacy, peace and security
        institutions, traditional institutions, humanitarian organisations, the professions, media, academia and
        entertainment.
      </p>
      <div className="flex flex-col gap-2.5 self-stretch pt-8 md:flex-row md:gap-3 md:self-center md:pt-10">
        <Link href="/sentinels-of-peace#partner" className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
          Join the founding circle →
        </Link>
        <Link
          href="/sentinels-of-peace"
          className="btn min-h-12 border border-ivory/60 px-[23px] py-[14px] font-semibold text-ivory"
        >
          Visit the programme
        </Link>
      </div>

      <ol className="m-0 grid w-full max-w-[1100px] list-none grid-cols-1 gap-x-6 gap-y-10 p-0 pt-14 sm:grid-cols-2 md:pt-24 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <li key={p.title} className="flex flex-col items-center">
            <span className="t-eyebrow text-gold">0{i + 1}</span>
            <h3 className="t-display m-0 pt-3 text-xl md:text-2xl">{p.title}</h3>
            <p className="m-0 max-w-[240px] pt-2 text-[15px] leading-[1.6] text-on-dark-2">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
