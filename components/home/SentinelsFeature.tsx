import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FlankedLabel } from "@/components/Ornament";

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
      className="on-dark flex scroll-mt-4 flex-col gap-8 rounded-[22px] bg-navy px-5 py-7 text-ivory md:gap-12 md:rounded-[28px] md:p-12 lg:p-16"
    >
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-center lg:gap-x-6">
        {/* The seal alone: it already carries its two sentinels */}
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-ivory/20 px-6 py-9 text-center md:rounded-[20px] md:py-12 lg:order-2 lg:col-span-5 lg:col-start-8">
          <Logo name="sentinelsSeal" className="h-auto w-[200px] md:w-[260px] lg:w-[300px]" />
          <FlankedLabel>The Grand Honours</FlankedLabel>
          <p className="t-eyebrow m-0 text-on-dark-2">Lagos · December 2026</p>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-6 lg:gap-7">
          <p className="t-eyebrow m-0 text-gold">Our Flagship Institution</p>
          <h2 className="t-feature m-0">Courage deserves more than applause.</h2>
          <p className="m-0 max-w-[560px] text-base leading-[1.6] text-on-dark md:text-[19px]">
            The Sentinels of Peace™ Grand Honours is conceived as an enduring national institution dedicated to
            identifying, honouring and amplifying extraordinary individuals and organisations advancing peace,
            responsible citizenship, community resilience and national development.
          </p>
          <p className="m-0 max-w-[560px] text-[15px] leading-[1.6] text-on-dark-2 md:text-base">
            Its inaugural gathering will convene leaders from government, business, diplomacy, peace and security
            institutions, traditional institutions, humanitarian organisations, the professions, media, academia and
            entertainment.
          </p>
          <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
            <Link href="/sentinels-of-peace#partner" className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
              Join the founding circle →
            </Link>
            <Link
              href="/sentinels-of-peace"
              className="btn min-h-12 border border-ivory px-[23px] py-[14px] font-semibold text-ivory"
            >
              Visit the programme
            </Link>
          </div>
        </div>
      </div>

      <ol className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <li key={p.title} className="flex flex-col gap-2 rounded-2xl bg-ivory/[0.06] p-5">
            <span className="t-eyebrow text-gold">0{i + 1}</span>
            <h3 className="t-display m-0 text-xl md:text-2xl">{p.title}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-on-dark-2">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
