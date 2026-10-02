import Link from "next/link";
import { KnightsBackdrop } from "@/components/KnightsBackdrop";
import { Logo } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { primaryAction } from "@/lib/cta";

/**
 * The seal is the hero and the one focal point: full colour on Sentinel Navy, then the title, the line and the two
 * actions. The seal already carries its knights, so the standalone pair stays in the background:
 * faint, rising once from the bottom edge on arrival, only their upper half showing. The ceremony date is given by the
 * header status and the ceremony band further down. What each part of the seal
 * means is set out in its own section further down (SealMeaning). A light crosses the seal once; after the arrival
 * everything is still, and nothing moves for reduced-motion visitors.
 */
export function Hero() {
  const action = primaryAction(true);

  return (
    <section className="hero-sentinels on-dark relative flex flex-col overflow-clip rounded-[22px] text-ivory md:rounded-[28px]">
      <KnightsBackdrop rise />
      <SiteHeader variant="sentinels" />
      <div
        id="content"
        className="relative flex flex-col items-center gap-6 px-5 pt-8 pb-28 text-center md:gap-7 md:px-8 md:pt-12 md:pb-16 lg:pb-20"
      >
        <div className="seal-light relative">
          <Logo name="sentinelsSeal" eager className="h-auto w-[200px] md:w-[260px] xl:w-[300px]" />
        </div>
        <p className="t-eyebrow rise-in m-0 text-gold [animation-delay:.1s]">By House of Evulv, first edition</p>
        <h1 className="t-sop-hero m-0">
          <span className="reveal-line">
            <span className="gilt" style={{ animationDelay: "0.2s" }}>
              Sentinels of Peace
            </span>
          </span>
        </h1>
        <p
          className="rise-in m-0 font-display text-xl leading-snug text-ivory italic md:text-[28px]"
          style={{ animationDelay: "0.45s" }}
        >
          Courage deserves more than applause.
        </p>
        <div
          className="rise-in flex flex-col gap-2.5 self-stretch pt-1 md:flex-row md:justify-center md:self-auto"
          style={{ animationDelay: "0.55s" }}
        >
          {action && (
            <Link href={action.href} className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
              {action.label}
            </Link>
          )}
          <Link href="#partner" className="btn min-h-12 border border-ivory px-[23px] py-[14px] font-semibold text-ivory">
            Become a partner
          </Link>
        </div>
      </div>
    </section>
  );
}
