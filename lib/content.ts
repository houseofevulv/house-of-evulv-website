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

type FaqItem = { q: string; a: string; confirmed: boolean; links?: { href: string; label: string }[] };

export type SocialLink = { platform: "instagram" | "tiktok" | "facebook"; label: string; url: string; pending?: boolean };

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
    social: SocialLink[];
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
    /** false for 2026: honourees are selected, not publicly nominated */
    public: boolean;
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
    banks: { bankName: string; accountName: string; accountNumber: string }[];
    useConfirmed: boolean;
  };
  support: { types: string[] };
  selection: {
    criteria: { title: string; body: string }[];
    panel: { name: string; role: string }[];
  };
  faq: {
    /** Shown while nominations.public is false (2026, selected edition) */
    items: FaqItem[];
    /** Shown when public nominations return */
    publicItems: FaqItem[];
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
  support,
  selection,
  faq,
} = content;

/**
 * Extras package (FEATURE_FULL=true): nominator confirmation email, honouree announcements, visitor figures.
 * The client chose Essentials, so this stays false. Our Story is part of both packages and is always on.
 */
export const isFull = process.env.FEATURE_FULL === "true";

/** The founder's portrait, or null until the client supplies a real one. No stand-in: the site must not show anyone else as him. */
export const founderPhoto = founder.photo;
export const founderPhotoAlt = `Portrait of ${founder.name}`;
