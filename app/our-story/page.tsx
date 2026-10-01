import type { Metadata } from "next";
import Link from "next/link";
import { Divider } from "@/components/Ornament";
import { PageShell } from "@/components/PageShell";
import { TheEmblem } from "@/components/TheEmblem";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { Story } from "@/components/home/Story";
import { event, site } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";

// The header shows the live nomination status; re-render hourly.
export const revalidate = 3600;

const lead =
  "A social impact platform in Lagos, built on one conviction: the people who keep communities at peace deserve to be seen, supported and followed.";

export const metadata: Metadata = {
  title: "Our story",
  description: lead,
  alternates: { canonical: "/our-story" },
  openGraph: pageOpenGraph("/our-story", `Our story | ${site.name}`, lead),
};

export default function OurStoryPage() {
  return (
    <PageShell>
      <main className="flex flex-col gap-2 md:gap-4">
        <section className="on-dark flex flex-col rounded-[22px] bg-espresso text-ivory md:rounded-[28px] lg:min-h-[560px]">
          <SiteHeader variant="page" />
          <div
            id="content"
            className="mt-auto flex flex-col gap-[18px] px-5 pt-16 pb-8 md:px-8 md:pt-24 md:pb-10 lg:gap-7 lg:px-10 lg:pb-12"
          >
            <p className="t-eyebrow m-0 text-gold">About {site.name}</p>
            <h1 className="t-sop-hero m-0 text-gold">Our story</h1>
            <Divider className="self-start" />
            <p className="m-0 max-w-[640px] text-base leading-[1.55] text-on-dark-2 md:text-xl">{lead}</p>
          </div>
        </section>

        <Story onStoryPage />

        {/* TODO(client): draft drawn from the site's own copy. Replace or extend with the founder's story when supplied. */}
        <section
          aria-labelledby="why-heading"
          className="flex flex-col gap-6 px-4 pt-4 pb-12 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:px-12 md:pt-8 md:pb-20 lg:pb-24"
        >
          <h2 id="why-heading" className="t-h2-48 m-0 md:col-span-4 lg:col-span-4">
            Why the House exists
          </h2>
          <div className="flex flex-col gap-5 text-[17px] leading-[1.6] text-body md:col-span-8 md:gap-6 md:text-xl lg:col-span-7 lg:col-start-6">
            <p className="m-0 font-semibold text-ink">
              Across Nigeria, peace is kept by people whose names rarely make the news: the elder who settles a dispute before
              it turns violent, the nurse who stays through a crisis, the young volunteer who organises a street after a flood.
              Their work holds communities together, and most of it is never recorded.
            </p>
            <p className="m-0">
              {site.name} exists to change that. We run programmes in three areas. <b className="text-ink">Peace</b>, so that
              people and communities live with dignity and understand one another. <b className="text-ink">Healing</b>, so
              that people recover identity, hope and capacity after hard experiences. <b className="text-ink">Evolution</b>,
              so that people and institutions grow in how they think, lead and contribute.
            </p>
            <p className="m-0">
              Our first programme is the {event.shortName} Grand Honours. It finds the people doing this work, verifies what
              they did, and brings them into the same room as the institutions able to support it. The
              first ceremony takes place in Lagos on {event.ceremonyDateDisplay}.
            </p>
            <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:gap-5">
              <Link href="/sentinels-of-peace" className="btn min-h-12 bg-espresso px-6 py-4 font-bold text-ivory">
                See the Sentinels of Peace
              </Link>
              <Link
                href="/#donate"
                className="lnk inline-flex min-h-11 items-center justify-center text-[15px] font-bold text-espresso underline md:min-h-0"
              >
                Support the work
              </Link>
            </div>
          </div>
        </section>

        <TheEmblem />

        <ContactBand />
      </main>
      <SiteFooter variant="page" />
    </PageShell>
  );
}
