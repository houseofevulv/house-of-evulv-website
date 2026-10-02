import { Logo } from "@/components/Logo";
import { SEAL_PARTS } from "@/lib/seal";

/**
 * What each part of the seal stands for. Kept out of the hero so the hero carries one message; set like "The emblem"
 * on Our Story: the seal on its own navy field (it is used on dark grounds only), the parts listed beside it.
 */
export function SealMeaning() {
  return (
    <section
      aria-labelledby="seal-heading"
      className="grid grid-cols-1 items-center gap-8 px-2 py-10 md:gap-10 md:px-12 md:py-20 lg:grid-cols-12 lg:gap-x-6 lg:px-16"
    >
      <div className="field-navy flex aspect-[5/4] items-center justify-center rounded-[20px] md:rounded-3xl lg:col-span-5 lg:aspect-square">
        <Logo name="sentinelsSeal" alt="" className="h-auto w-[56%]" />
      </div>
      <div className="flex flex-col gap-6 px-2 md:px-0 lg:col-span-6 lg:col-start-7">
        <h2 id="seal-heading" className="t-h2-48 reveal m-0">
          The seal
        </h2>
        <dl className="m-0 border-t border-rule-2">
          {SEAL_PARTS.map((p) => (
            <div key={p.name} className="grid grid-cols-1 gap-1 border-b border-rule-2 py-3.5 md:grid-cols-[180px_1fr] md:gap-6">
              <dt className="text-[15px] font-bold text-ink">{p.name}</dt>
              <dd className="m-0 text-[15px] leading-normal text-body">{p.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
