"use server";

import { headers } from "next/headers";
import { emailConfigured, sendNominationAlert } from "@/lib/email";
import { FIELD_ORDER, nominationSchema, type FieldName, type NominateState } from "@/lib/nomination";
import { nominations } from "@/lib/content";
import { nominationPhase, TIME_ZONE, weekdayDayMonth } from "@/lib/dates";
import { formatReference } from "@/lib/reference";
import { appendNomination, sheetsConfigured } from "@/lib/sheets";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";

let devCounter = 0;

const GENERIC_ERROR =
  "We couldn't send your nomination just now. Please try again in a few minutes, or email it to houseofevulv@gmail.com.";

export async function nominate(formData: FormData): Promise<NominateState> {
  // 2026 edition: honourees are selected, not nominated, so the form is off and the action refuses submissions.
  if (!nominations.public) {
    return { status: "error", errors: {}, message: "This edition does not take public nominations." };
  }
  const phase = nominationPhase();
  if (phase === "before") {
    return {
      status: "error",
      errors: {},
      message: `Nominations open on ${weekdayDayMonth(nominations.opens)}. Your answers are still here; please submit them from that day.`,
    };
  }
  if (phase === "closed") {
    return { status: "error", errors: {}, message: "Nominations have closed." };
  }

  // Spam checks. Bots get a generic message so they learn nothing.
  if (looksLikeBot(formData)) {
    return { status: "error", errors: {}, message: GENERIC_ERROR };
  }

  const h = await headers();
  const ip = `nominate:${clientIp(h)}`;
  const raw = Object.fromEntries(FIELD_ORDER.map((k) => [k, formData.get(k) ?? ""]));
  const parsed = nominationSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Partial<Record<FieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as FieldName;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors };
  }

  // Counted only for valid submissions, so correcting mistakes never locks someone out
  if (rateLimited(ip)) {
    return {
      status: "error",
      errors: {},
      message: "You have sent several nominations in the last hour. Please wait a while before sending another.",
    };
  }

  const n = parsed.data;
  const timestamp = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date());
  const userAgent = h.get("user-agent") ?? "";

  let reference: string;
  try {
    if (sheetsConfigured()) {
      reference = await appendNomination(
        [
          timestamp,
          "",
          n.nomineeName,
          n.organisation,
          n.category,
          n.state,
          n.description,
          n.link,
          n.nominatorName,
          n.nominatorContact,
          true,
          userAgent,
        ],
        formatReference
      );
    } else if (process.env.NODE_ENV !== "production") {
      console.warn("[nominate] Google Sheets is not configured; using a local reference.");
      reference = formatReference(++devCounter);
    } else {
      throw new Error("Google Sheets environment variables are missing");
    }
  } catch (err) {
    console.error("[nominate] storage failed", err);
    return { status: "error", errors: {}, message: GENERIC_ERROR };
  }

  // The row is saved; an alert failure must not lose the nominator their reference.
  if (emailConfigured()) {
    try {
      await sendNominationAlert(
        reference,
        [
          { label: "Received", value: `${timestamp} (Lagos)` },
          { label: "Reference", value: reference },
          { label: "Nominee", value: n.nomineeName },
          { label: "Organisation", value: n.organisation },
          { label: "Category", value: n.category },
          { label: "State", value: n.state },
          { label: "What they did", value: n.description },
          { label: "Link", value: n.link },
          { label: "Nominator", value: n.nominatorName },
          { label: "Nominator contact", value: n.nominatorContact },
          { label: "Consent", value: "Yes" },
          { label: "User agent", value: userAgent },
        ],
        n.nominatorContact.includes("@") ? n.nominatorContact : undefined
      );
    } catch (err) {
      console.error("[nominate] alert email failed", reference, err);
    }
  } else {
    console.warn("[nominate] Resend is not configured; no alert sent for", reference);
  }

  return { status: "success", reference };
}
