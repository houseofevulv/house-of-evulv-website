import { nominations } from "./content";

// Shared by the client form and the server action. Keep zod out of this file so it stays out of the browser bundle.

export const DESCRIPTION_MIN = 80;
export const DESCRIPTION_MAX = nominations.descriptionMaxChars;

/** Field order on the page, used to focus the first invalid field */
export const FIELD_ORDER = [
  "nomineeName",
  "organisation",
  "category",
  "state",
  "description",
  "link",
  "nominatorName",
  "nominatorContact",
  "consent",
] as const;

export type FieldName = (typeof FIELD_ORDER)[number];

export type NominateState =
  | { status: "idle" }
  | { status: "error"; errors: Partial<Record<FieldName, string>>; message?: string }
  | { status: "success"; reference: string };
