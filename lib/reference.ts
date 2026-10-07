import { randomInt } from "node:crypto";
import { nominations } from "./content";

// "SOP-26-XXXX" -> prefix "SOP-26-", 4 characters
const match = /^(.*?)(X+|0+)$/.exec(nominations.referenceFormat);
const prefix = match?.[1] ?? "SOP-26-";
const width = match?.[2].length ?? 4;

// No 0/O, 1/I/L: easy to read back over the phone
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

/**
 * A reference for a new nomination, e.g. SOP-26-7KQ4. Nothing is stored, so it is random rather than counted:
 * about 920,000 possibilities, and the nomination email it appears in also carries the full details and time.
 */
export function newReference() {
  return prefix + Array.from({ length: width }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
}
