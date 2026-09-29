import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { Commitments } from "@/components/home/Commitments";
import { ContactBand } from "@/components/home/ContactBand";
import { Donate } from "@/components/home/Donate";
import { Hero } from "@/components/home/Hero";
import { SentinelsFeature } from "@/components/home/SentinelsFeature";
import { Statement } from "@/components/home/Statement";
import { Story } from "@/components/home/Story";
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
  logo: `${site.url}/brand/house-of-evulv/png/favicon-512.png`,
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
          <Statement />
          <Commitments />
          <SentinelsFeature />
          <Story />
          <Donate />
          <ContactBand />
        </main>
        <SiteFooter variant="home" />
      </PageShell>
    </>
  );
}
