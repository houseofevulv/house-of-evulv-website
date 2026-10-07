"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { support } from "@/lib/content";
import { TIME_ZONE } from "@/lib/dates";
import { emailConfigured, sendAlert } from "@/lib/email";
import { isEmail, isNigerianPhone } from "@/lib/nomination";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";
import { SUPPORT_FIELDS, SUPPORT_MESSAGE_MAX, type SupportField, type SupportState } from "@/lib/support-fields";

const GENERIC_ERROR =
  "We couldn't send your message just now. Please try again in a few minutes, or email hello@houseofevulv.com.";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Keep your name under 120 characters."),
  organisation: z.string().trim().max(160, "Keep the organisation under 160 characters."),
  contact: z
    .string()
    .trim()
    .min(1, "Enter your email or WhatsApp number.")
    .refine(
      (v) => isEmail(v) || isNigerianPhone(v),
      "Enter a valid email, or a Nigerian number starting with +234 or 0 (11 digits)."
    ),
  supportType: z.enum(support.types as [string, ...string[]], { error: "Choose how you would like to help." }),
  amount: z.string().trim().max(60, "Keep this short, for example ₦50,000."),
  message: z.string().trim().max(SUPPORT_MESSAGE_MAX, `Keep your message under ${SUPPORT_MESSAGE_MAX} characters.`),
  consent: z.literal("on", { error: "Tick the box so we can contact you." }),
});

/** A pledge of support, emailed to the House (the email is the record) */
export async function pledgeSupport(formData: FormData): Promise<SupportState> {
  if (looksLikeBot(formData)) return { status: "error", errors: {}, message: GENERIC_ERROR };

  const parsed = schema.safeParse(Object.fromEntries(SUPPORT_FIELDS.map((k) => [k, formData.get(k) ?? ""])));
  if (!parsed.success) {
    const errors: Partial<Record<SupportField, string>> = {};
    for (const issue of parsed.error.issues) errors[issue.path[0] as SupportField] ??= issue.message;
    return { status: "error", errors };
  }

  const h = await headers();
  if (rateLimited(`support:${clientIp(h)}`)) {
    return {
      status: "error",
      errors: {},
      message: "You have sent several messages in the last hour. Please wait a while, or email hello@houseofevulv.com.",
    };
  }

  const s = parsed.data;
  const received = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, dateStyle: "full", timeStyle: "short" }).format(
    new Date()
  );

  // The email is the only record of the pledge, so if it cannot be sent the supporter is asked to try again
  if (!emailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[support] RESEND_API_KEY or FORMS_ALERT_TO is missing; pledge not delivered");
      return { status: "error", errors: {}, message: GENERIC_ERROR };
    }
    console.warn("[support] Email is not configured; pledge not sent.", s.supportType);
  } else {
    try {
      await sendAlert({
        subject: `Support pledge from ${s.name}`,
        intro: `${s.supportType}, received ${received} (Lagos time)`,
        fields: [
          { label: "Name", value: s.name },
          { label: "Organisation", value: s.organisation },
          { label: "Contact", value: s.contact },
          { label: "How they want to help", value: s.supportType },
          { label: "Amount", value: s.amount },
        ],
        note: { label: "Message", value: s.message },
        sender: { name: s.name, contact: s.contact },
      });
    } catch (err) {
      console.error("[support] alert email failed", err);
      return { status: "error", errors: {}, message: GENERIC_ERROR };
    }
  }

  return { status: "success", name: s.name.split(" ")[0] };
}
