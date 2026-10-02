import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactBand } from "@/components/home/ContactBand";
import { Creed } from "@/components/home/Creed";
import { Donate } from "@/components/home/Donate";
import { Hero } from "@/components/home/Hero";
import { HonoursAims } from "@/components/home/HonoursAims";
import { Ideology } from "@/components/home/Ideology";
import { Mark } from "@/components/home/Mark";
import { Partnership } from "@/components/home/Partnership";
import { SentinelsFeature } from "@/components/home/SentinelsFeature";
import { Statement } from "@/components/home/Statement";
import { TheHouse } from "@/components/home/TheHouse";
import { contact, site } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";

// Status text and dates depend on today's date in Lagos; re-render hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Peace, healing and human development` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph("/", `${site.name} | Peace, healing and human development`, site.description),
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/icons/house-of-evulv_app-icon-512.png`,
  description: site.description,
  email: contact.email,
  telephone: contact.phoneHref.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <PageShell>
        <main className="flex flex-col gap-2 md:gap-4">
          <Hero />
          <TheHouse />
          <Ideology />
          <Mark />
          <Statement />
          <SentinelsFeature />
          <HonoursAims />
          <Partnership />
          <Creed />
          <Donate />
          <ContactBand />
        </main>
        <SiteFooter variant="home" />
      </PageShell>
    </>
  );
}
