import Link from "next/link";
import { Logo } from "@/components/Logo";
import { contact, partnership } from "@/lib/content";

// The client's one-line promise for each tier; names and places come from the same list as the Sentinels page
const promises: Record<string, string> = {
  Founding: "Institutional legacy",
  Strategic: "Shared impact",
  Programme: "Purposeful activation",
  Media: "National amplification",
};

export function Partnership() {
  return (
    // The heading and intro centred across the top; below them the Sentinels badge in gold on the left and the tiers
    // and actions on the right. No panel, straight on the ivory. Phones and tablets: everything stacks, centred.
    <section
      id="partnership"
      className="flex scroll-mt-4 flex-col items-center px-4 py-16 text-center md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      <h2 className="t-h2-48 m-0 max-w-[720px]">Stand at the founding edge of history.</h2>
      <p className="m-0 max-w-[640px] pt-6 text-base leading-[1.7] text-body md:pt-8 md:text-[17px]">
        We invite select institutions to participate as Strategic and Founding Partners of The Sentinels of Peace™ Grand
        Honours. Partnership is designed around shared values, institutional visibility and meaningful national impact.
      </p>

      <div className="grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 pt-12 md:gap-14 md:pt-20 lg:grid-cols-12 lg:gap-x-6 lg:text-left">
        <div className="flex justify-center lg:col-span-5">
          <Logo name="sentinelsBadgeGold" alt="" className="h-auto w-[220px] md:w-[300px] lg:w-[min(100%,420px)]" />
        </div>
        <div className="flex flex-col items-center lg:col-span-7 lg:items-start">
          {/* No cards: each tier is a plain link that opens the support form with that tier already chosen */}
          <p className="t-eyebrow m-0 text-muted">Choose where you stand</p>
          <ul className="m-0 grid w-full max-w-[640px] list-none grid-cols-1 gap-y-2 p-0 pt-4 sm:grid-cols-2 md:pt-8">
            {partnership.tiers.map((t) => (
              <li key={t.name}>
                <Link
                  href={`/sentinels-of-peace?partner=${t.name}#support`}
                  className="group flex min-h-11 flex-col items-center gap-1.5 px-3 py-5 no-underline lg:items-start lg:px-0"
                >
                  <span className="t-display text-2xl text-ink group-hover:text-bronze md:text-[28px]">
                    {t.name}{" "}
                    <span aria-hidden="true" className="inline-block text-bronze transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="text-[15px] font-semibold text-body">{promises[t.name]}</span>
                  <span className="text-[13px] text-muted">{t.limit}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-3 self-stretch pt-8 md:flex-row md:justify-center md:gap-5 md:self-center md:pt-12 lg:self-start lg:justify-start">
            <a
              href={partnership.briefMailto}
              className="btn min-h-12 self-stretch bg-espresso px-6 py-[15px] font-bold text-ivory md:self-auto md:py-4"
            >
              Request the partnership brief
            </a>
            <span className="text-[15px] text-body md:text-base">
              Or call{" "}
              <a href={contact.phoneHref} className="lnk inline-flex min-h-11 items-center font-bold text-espresso underline md:min-h-0">
                {contact.phoneDisplay}
              </a>
            </span>
          </div>
          <Link
            href="/sentinels-of-peace#partner"
            className="lnk mt-4 inline-flex min-h-11 items-center text-[15px] font-bold text-espresso underline"
          >
            Compare what each partnership includes
          </Link>
        </div>
      </div>
    </section>
  );
}
