import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <PageShell>
      <main className="on-dark flex min-h-[min(720px,100svh)] flex-col rounded-[22px] bg-espresso text-ivory md:min-h-[640px] md:rounded-[28px]">
        <SiteHeader variant="page" />
        <div id="content" className="flex grow flex-col justify-end gap-6 px-5 pt-16 pb-8 md:px-10 md:pb-11 lg:max-w-[900px]">
          <p className="t-eyebrow m-0 text-gold">Page not found</p>
          <h1 className="t-feature m-0">We couldn&apos;t find that page.</h1>
          <p className="m-0 max-w-[520px] text-base leading-[1.55] text-on-dark-2 md:text-[19px]">
            The link may be out of date, or the address may have a typo.
          </p>
          <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
            <Link href="/" className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
              Go to the homepage
            </Link>
            <Link
              href="/sentinels-of-peace"
              className="btn min-h-12 border border-ivory px-[23px] py-[14px] font-semibold text-ivory"
            >
              See the Sentinels of Peace
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter variant="page" />
    </PageShell>
  );
}
