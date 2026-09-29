import raw from "@/content/site-content.json";

export type Step = {
  id: string;
  start: string;
  end: string;
  when: string;
  title: string;
  body: string;
};

export type Category = { title: string; body: string; eligible: string };

export type PartnerTier = { name: string; limit: string; highlight: boolean };

export type SiteContent = {
  site: { name: string; tagline: string; description: string; url: string; copyrightYear: number };
  contact: {
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    city: string;
    hours: string;
    streetAddress: string | null;
    rcNumber: string | null;
  };
  founder: {
    name: string;
    nameConfirmed: boolean;
    title: string;
    quote: string;
    photo: string | null;
  };
  event: {
    name: string;
    shortName: string;
    edition: string;
    ceremonyDate: string;
    ceremonyDateDisplay: string;
    ceremonyDateConfirmed: boolean;
    venue: string;
    venueShort: string;
    venueAddress: string;
    venueConfirmed: boolean;
  };
  nominations: {
    opens: string;
    closes: string;
    closesDisplay: string;
    verificationBy: string;
    outcomeBy: string;
    referenceFormat: string;
    descriptionMaxChars: number;
  };
  steps: Step[];
  categories: Category[];
  partnership: {
    tiers: PartnerTier[];
    rows: { label: string; cells: string[] }[];
    briefMailto: string;
  };
  states: string[];
  donate: {
    paymentUrl: string | null;
    paymentProvider: string | null;
    bank: { bankName: string; accountName: string; accountNumber: string } | null;
    useConfirmed: boolean;
  };
  selection: {
    criteria: { title: string; body: string }[];
    panel: { name: string; role: string }[];
  };
  faq: {
    items: { q: string; a: string; confirmed: boolean; links?: { href: string; label: string }[] }[];
  };
};

export const content = raw as SiteContent;

export const {
  site,
  contact,
  founder,
  event,
  nominations,
  steps,
  categories,
  partnership,
  states,
  donate,
  selection,
  faq,
} = content;

/**
 * Extras package (FEATURE_FULL=true): nominator confirmation email, honouree announcements, visitor figures.
 * The client chose Essentials, so this stays false. Our Story is part of both packages and is always on.
 */
export const isFull = process.env.FEATURE_FULL === "true";

/** Stand-in used until the client supplies the founder's portrait. TODO(client): replace. */
export const founderPhoto = founder.photo ?? "/images/founder-standin.jpg";
export const founderPhotoAlt = founder.photo ? founder.name : "Stand-in portrait";
