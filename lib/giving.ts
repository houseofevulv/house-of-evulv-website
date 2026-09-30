import { donate } from "./content";

/**
 * Where the main "Give" button goes. A payment page (Paystack or Flutterwave) when the client supplies one;
 * otherwise the support pledge form, so the button always works and never promises a payment flow that does not exist yet.
 */
export function giveLink() {
  if (donate.paymentUrl) return { href: donate.paymentUrl, external: true };
  // The pledge form on the Sentinels page, which reaches the House and records the offer
  return { href: "/sentinels-of-peace#support", external: false };
}

/**
 * What gifts pay for. Drawn from what the site already says the programme does.
 * TODO(client): confirm how gifts are used (donate.useConfirmed = false).
 */
export const GIFT_USES = [
  { title: "Find and verify honourees", body: "Researching candidates in all 36 states and the FCT, and checking every claim with a referee." },
  { title: "Record their work", body: "Writing up and publishing each honouree's story, so what they did is on the record." },
  { title: "Connect them with support", body: "Introducing honourees to partners who can fund, extend or replicate what they started." },
];
