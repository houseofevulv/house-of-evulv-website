import { nominations } from "./content";

// "SOP-26-0000" -> prefix "SOP-26-", width 4
const match = /^(.*?)(0+)$/.exec(nominations.referenceFormat);
const prefix = match?.[1] ?? "SOP-26-";
const width = match?.[2].length ?? 4;

/** Nomination number n (1-based) as a reference, e.g. 1 -> SOP-26-0001 */
export function formatReference(n: number) {
  return `${prefix}${String(n).padStart(width, "0")}`;
}
