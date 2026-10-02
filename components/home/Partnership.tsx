import Link from "next/link";
import { Logo } from "@/components/Logo";
import { contact, partnership } from "@/lib/content";
import { TierCarousel } from "./TierCarousel";

// The client's one-line promise for each tier; names and places come from the same list as the Sentinels page
const promises: Record<string, string> = {
  Founding: "Institutional legacy",
  Strategic: "Shared impact",
  Programme: "Purposeful activation",
  Media: "National amplification",
};

// Media leads here; the Sentinels page keeps the tiers in their own order
const ORDER = ["Media", "Founding", "Strategic", "Programme"];
const tiers = [...partnership.tiers].sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name));

export function Partnership() {
  return (
    // The heading and intro centred across the top; below them the Sentinels badge in gold on the left and the tiers
    // and actions on the right. No panel, straight on the ivory. Phones and tablets: everything stacks, centred.
    <section
      id="partnership"
      className="flex scroll-mt-4 flex-col items-center px-4 py-16 text-center md:px-12 md:py-28 lg:px-16 lg:py-32"
    >
      <p className="t-eyebrow m-0 text-bronze">Strategic Partnership</p>
      <h2 className="t-h2-48 m-0 max-w-[720px] pt-3 md:pt-4">Stand at the founding edge of history.</h2>
      <p className="m-0 max-w-[640px] pt-6 text-base leading-[1.7] text-body md:pt-8 md:text-[17px]">
        We invite select institutions to participate as Strategic and Founding Partners of The Sentinels of Peace™ Grand
        Honours. Partnership is designed around shared values, institutional visibility and meaningful national impact.
      </p>

      <div className="grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 pt-12 md:gap-14 md:pt-20 lg:grid-cols-12 lg:gap-x-6 lg:text-left">
        <div className="flex justify-center lg:col-span-5">
          <Logo name="sentinelsBadgeGold" alt="" className="h-auto w-[220px] md:w-[300px] lg:w-[min(100%,420px)]" />
        </div>
        <div className="flex flex-col items-center lg:col-span-7 lg:items-start">
          {/* One tier at a time, each on its own colour; every card opens the support form with its tier chosen.
              "Partner" is in each name, so no one reads a tier as a fee to be honoured: these are sponsors. */}
          <p className="t-eyebrow m-0 pb-4 text-muted md:pb-6">Choose where you stand</p>
          <TierCarousel
            tiers={tiers.map((t) => ({
              name: t.name,
              promise: promises[t.name],
              limit: t.limit,
              href: `/sentinels-of-peace?partner=${t.name}#support`,
            }))}
          />
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
