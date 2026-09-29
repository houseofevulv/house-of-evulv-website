import Link from "next/link";
import { Photo } from "@/components/Photo";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/content";

export function Hero() {
  return (
    <Photo
      as="section"
      src="/images/durbar-riders.jpg"
      alt="Horsemen in ceremonial regalia at a durbar, watched by a crowd"
      sizes="(min-width: 1440px) 1408px, 100vw"
      position="center 45%"
      mobilePosition="34% center"
      priority
      tone="dark"
      className="on-dark flex min-h-[min(720px,100svh)] flex-col justify-between rounded-[22px] md:min-h-[720px] md:rounded-[28px] lg:min-h-[860px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,17,.5)_0%,rgba(10,20,17,0)_25%,rgba(10,20,17,0)_40%,rgba(10,20,17,.82)_100%)] md:bg-[linear-gradient(180deg,rgba(10,20,17,.55)_0%,rgba(10,20,17,0)_28%,rgba(10,20,17,0)_45%,rgba(10,20,17,.78)_100%)]"
      />
      <SiteHeader variant="home" />
      <div
        id="content"
        className="relative flex flex-col gap-5 px-5 pb-6 text-bone lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-10 lg:pb-11"
      >
        <h1 className="t-home-hero m-0 max-w-[940px]">We honour and support the people who keep communities at peace.</h1>
        <div className="flex shrink-0 flex-col gap-5 lg:w-[340px] lg:gap-[22px] lg:pb-2">
          <p className="m-0 text-base leading-[1.55] text-on-dark md:text-[17px]">
            <span className="md:hidden">
              A social impact platform in Lagos, running programmes in peace, healing and human development.
            </span>
            <span className="hidden md:inline">{site.description}</span>
          </p>
          <Link
            href="/sentinels-of-peace"
            className="btn bg-lime px-5 py-[15px] font-bold text-forest-ink md:self-start md:bg-bone md:px-6 md:py-4"
          >
            See the Sentinels of Peace
          </Link>
        </div>
      </div>
    </Photo>
  );
}
