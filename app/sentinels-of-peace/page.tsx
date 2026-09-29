import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { Categories } from "@/components/sentinels/Categories";
import { Ceremony } from "@/components/sentinels/Ceremony";
import { Hero } from "@/components/sentinels/Hero";
import { Nominate } from "@/components/sentinels/Nominate";
import { Partnership } from "@/components/sentinels/Partnership";
import { Timeline } from "@/components/sentinels/Timeline";
import { WhatItDoes } from "@/components/sentinels/WhatItDoes";
import { WhyItExists } from "@/components/sentinels/WhyItExists";
import { event, site } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";

// Status, timeline and form state depend on today's date in Lagos; re-render hourly.
export const revalidate = 3600;

const title = "Sentinels of Peace Grand Honours | House of Evulv";
const description =
  "Grand Honours for the individuals and organisations whose work prevents conflict, protects lives and helps communities in Nigeria recover.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/sentinels-of-peace" },
  icons: {
    icon: [
      { url: "/brand/sentinels-of-peace/svg/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/sentinels-of-peace/png/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/brand/sentinels-of-peace/png/favicon-180.png", sizes: "180x180" },
  },
  openGraph: pageOpenGraph("/sentinels-of-peace", title, description),
};

// Event structured data only once the client confirms the date and venue.
const eventJsonLd =
  event.ceremonyDateConfirmed && event.venueConfirmed
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: event.ceremonyDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: event.venue,
          address: { "@type": "PostalAddress", streetAddress: event.venueAddress, addressCountry: "NG" },
        },
        organizer: { "@type": "Organization", name: site.name, url: site.url },
        description,
      }
    : null;

export default function SentinelsPage() {
  return (
    <>
      {eventJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      )}
      <PageShell>
        <main className="flex flex-col gap-2 md:gap-4">
          <Hero />
          <WhyItExists />
          <WhatItDoes />
          <Categories />
          <Timeline />
          <Ceremony />
          <Partnership />
          <Nominate />
        </main>
        <SiteFooter variant="sentinels" />
      </PageShell>
    </>
  );
}
