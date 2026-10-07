"use server";

import { headers } from "next/headers";
import { emailConfigured, sendAlert } from "@/lib/email";
import { FIELD_ORDER, nominationSchema, type FieldName, type NominateState } from "@/lib/nomination";
import { nominations } from "@/lib/content";
import { nominationPhase, TIME_ZONE, weekdayDayMonth } from "@/lib/dates";
import { newReference } from "@/lib/reference";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";

const GENERIC_ERROR =
  "We couldn't send your nomination just now. Please try again in a few minutes, or email it to hello@houseofevulv.com.";

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
  const received = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, dateStyle: "full", timeStyle: "short" }).format(
    new Date()
  );

  const reference = newReference();

  // The email is the only record of the nomination, so if it cannot be sent the nominator is asked to try again
  if (!emailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[nominate] RESEND_API_KEY or FORMS_ALERT_TO is missing; nomination not delivered");
      return { status: "error", errors: {}, message: GENERIC_ERROR };
    }
    console.warn("[nominate] Email is not configured; nomination not sent.", reference);
  } else {
    try {
      await sendAlert({
        subject: `Nomination ${reference}: ${n.nomineeName}`,
        intro: `${n.category}, received ${received} (Lagos time)`,
        fields: [
          { label: "Reference", value: reference },
          { label: "Nominee", value: n.nomineeName },
          { label: "Organisation", value: n.organisation },
          { label: "Category", value: n.category },
          { label: "State", value: n.state },
          { label: "Link", value: n.link },
          { label: "Nominated by", value: n.nominatorName },
          { label: "Contact", value: n.nominatorContact },
        ],
        note: { label: "What they did", value: n.description },
        sender: { name: n.nominatorName, contact: n.nominatorContact },
      });
    } catch (err) {
      console.error("[nominate] alert email failed", reference, err);
      return { status: "error", errors: {}, message: GENERIC_ERROR };
    }
  }

  return { status: "success", reference };
}
