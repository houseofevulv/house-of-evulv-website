import type { Metadata } from "next";
import {
  CampaignClose,
  CampaignHero,
  CampaignInvite,
  CampaignNominate,
  CampaignStatement,
  CampaignStreams,
  CampaignUpdates,
  CampaignVoices,
} from "@/components/campaign/Sections";
import { PageShell } from "@/components/PageShell";
import { SiteFooter } from "@/components/SiteFooter";
import { campaign } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";

// The countdown follows today's date in Lagos; re-render hourly.
export const revalidate = 3600;

const title = `${campaign.name} | House of Evulv`;
const description = `${campaign.tagline} ${campaign.lede}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/100-days-of-peace" },
  openGraph: pageOpenGraph("/100-days-of-peace", title, description),
};

export default function CampaignPage() {
  return (
    <PageShell>
      <main className="flex flex-col gap-2 md:gap-4">
        <CampaignHero />
        <CampaignStatement />
        <CampaignStreams />
        <CampaignUpdates />
        <CampaignVoices />
        <CampaignNominate />
        <CampaignInvite />
        <CampaignClose />
      </main>
      <SiteFooter variant="campaign" />
    </PageShell>
  );
}
