// Shared by the support form and its server action. Keep zod out so it stays out of the browser bundle.

export const SUPPORT_MESSAGE_MAX = 1000;

/** Field order on the page, used to focus the first invalid field */
export const SUPPORT_FIELDS = ["name", "organisation", "contact", "supportType", "amount", "message", "consent"] as const;

export type SupportField = (typeof SUPPORT_FIELDS)[number];

export type SupportState =
  | { status: "idle" }
  | { status: "error"; errors: Partial<Record<SupportField, string>>; message?: string }
  | { status: "success"; name: string };
