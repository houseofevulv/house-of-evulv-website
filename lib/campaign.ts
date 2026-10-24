// Shared by the 100 Days of Peace page, its forms and their server actions. Keep zod out of here, so it stays
// out of the browser bundle.
import { event } from "./content";

export const CAMPAIGN_DAYS = 100;

/**
 * Where the countdown stands on a given Lagos date (YYYY-MM-DD): the hundred days end on the ceremony day.
 * Day 1 is 100 days before it. Before the campaign starts this is day 0; on and after the ceremony, day 100.
 */
export function campaignDay(today: string) {
  const end = Date.UTC(...ymd(event.ceremonyDate));
  const now = Date.UTC(...ymd(today));
  const left = Math.round((end - now) / 86_400_000);
  const day = Math.min(CAMPAIGN_DAYS, Math.max(0, CAMPAIGN_DAYS + 1 - left));
  return { day, left: Math.max(0, left) };
}

function ymd(date: string): [number, number, number] {
  const [y, m, d] = date.split("-").map(Number);
  return [y, m - 1, d];
}

/* Invite the campaign: who is asking, and the wording that follows the choice */
export const INVITE_KINDS = ["school", "community", "organisation"] as const;
export type InviteKind = (typeof INVITE_KINDS)[number];

export const INVITE_COPY: Record<InviteKind, { label: string; nameLabel: string; rolePlaceholder: string; messagePlaceholder: string; submit: string; done: string }> = {
  school: {
    label: "School",
    nameLabel: "School name",
    rolePlaceholder: "e.g. Principal",
    messagePlaceholder: "Optional: class sizes, good dates for a visit",
    submit: "Request a visit",
    done: "Your request for a school visit has reached the team.",
  },
  community: {
    label: "Community",
    nameLabel: "Community, estate or association",
    rolePlaceholder: "e.g. Chairman, youth leader",
    messagePlaceholder: "Optional: expected numbers, a venue, good dates",
    submit: "Request a gathering",
    done: "Your request for a community gathering has reached the team.",
  },
  organisation: {
    label: "Organisation",
    nameLabel: "Organisation name",
    rolePlaceholder: "e.g. Programme lead",
    messagePlaceholder: "Optional: audience size, good dates",
    submit: "Request a session",
    done: "Your request for a session has reached the team.",
  },
};

export const INVITE_FIELDS = ["kind", "place", "town", "state", "name", "role", "contact", "message", "consent"] as const;
export type InviteField = (typeof INVITE_FIELDS)[number];

export const PEACEMAKER_WHERE = ["Workplace", "Community", "School"] as const;
export const PEACEMAKER_FIELDS = ["nominee", "where", "town", "story", "name", "contact", "consent"] as const;
export type PeacemakerField = (typeof PEACEMAKER_FIELDS)[number];
export const STORY_MAX = 1200;

export type FormState<F extends string> =
  | { status: "idle" }
  | { status: "error"; errors: Partial<Record<F, string>>; message?: string }
  | { status: "success"; name: string };
