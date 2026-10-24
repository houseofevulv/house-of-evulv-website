"use server";

import { headers } from "next/headers";
import { z } from "zod";
import {
  INVITE_COPY,
  INVITE_FIELDS,
  INVITE_KINDS,
  PEACEMAKER_FIELDS,
  PEACEMAKER_WHERE,
  STORY_MAX,
  type FormState,
  type InviteField,
  type PeacemakerField,
} from "@/lib/campaign";
import { states } from "@/lib/content";
import { TIME_ZONE } from "@/lib/dates";
import { emailConfigured, sendAlert, type Alert } from "@/lib/email";
import { isEmail, isNigerianPhone } from "@/lib/nomination";
import { clientIp, looksLikeBot, rateLimited } from "@/lib/spam";

const GENERIC_ERROR =
  "We couldn't send this just now. Please try again in a few minutes, or email hello@houseofevulv.com.";
const BUSY = "You have sent several messages in the last hour. Please wait a while, or email hello@houseofevulv.com.";

const contact = z
  .string()
  .trim()
  .min(1, "Enter an email or WhatsApp number.")
  .refine((v) => isEmail(v) || isNigerianPhone(v), "Enter a valid email, or a Nigerian number starting with +234 or 0 (11 digits).");
const name = z.string().trim().min(2, "Enter your name.").max(120, "Keep this under 120 characters.");
const consent = z.literal("on", { error: "Tick the box so we can contact you." });

const inviteSchema = z.object({
  kind: z.enum(INVITE_KINDS, { error: "Choose school, community or organisation." }),
  place: z.string().trim().min(2, "Enter the name.").max(160, "Keep this under 160 characters."),
  town: z.string().trim().min(2, "Enter the town or city.").max(80, "Keep this under 80 characters."),
  state: z.enum(states as [string, ...string[]], { error: "Choose a state." }),
  name,
  role: z.string().trim().max(80, "Keep this under 80 characters."),
  contact,
  message: z.string().trim().max(1000, "Keep your message under 1,000 characters."),
  consent,
});

const peacemakerSchema = z.object({
  nominee: z.string().trim().min(2, "Enter their name.").max(120, "Keep this under 120 characters."),
  where: z.enum(PEACEMAKER_WHERE, { error: "Choose where they keep the peace." }),
  town: z.string().trim().min(2, "Enter their town and state.").max(120, "Keep this under 120 characters."),
  story: z.string().trim().min(20, "Tell us a little more: at least a sentence or two.").max(STORY_MAX, `Keep this under ${STORY_MAX} characters.`),
  name,
  contact,
  consent,
});

const received = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, dateStyle: "full", timeStyle: "short" }).format(new Date());

/** The email is the only record, so a submission counts only once it is sent */
async function deliver(form: string, alert: Alert): Promise<boolean> {
  if (!emailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[${form}] RESEND_API_KEY or FORMS_ALERT_TO is missing; not delivered`);
      return false;
    }
    console.warn(`[${form}] Email is not configured; not sent.`, alert.subject);
    return true;
  }
  try {
    await sendAlert(alert);
    return true;
  } catch (err) {
    console.error(`[${form}] alert email failed`, err);
    return false;
  }
}

function parse<F extends string>(schema: z.ZodType, fields: readonly F[], formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(fields.map((k) => [k, formData.get(k) ?? ""])));
  if (parsed.success) return { data: parsed.data as Record<F, string> };
  const errors: Partial<Record<F, string>> = {};
  for (const issue of parsed.error.issues) errors[issue.path[0] as F] ??= issue.message;
  return { errors };
}

/** A school, community or organisation asking the campaign to visit */
export async function inviteCampaign(formData: FormData): Promise<FormState<InviteField>> {
  if (looksLikeBot(formData, "invite")) return { status: "error", errors: {}, message: GENERIC_ERROR };
  const r = parse(inviteSchema, INVITE_FIELDS, formData);
  if (!r.data) return { status: "error", errors: r.errors };
  if (rateLimited(`invite:${clientIp(await headers())}`)) return { status: "error", errors: {}, message: BUSY };

  const v = r.data;
  const kind = v.kind as keyof typeof INVITE_COPY;
  const ok = await deliver("invite", {
    subject: `100 Days of Peace: ${INVITE_COPY[kind].label.toLowerCase()} request from ${v.place}`,
    intro: `${INVITE_COPY[kind].label} visit request, received ${received()} (Lagos time)`,
    fields: [
      { label: INVITE_COPY[kind].nameLabel, value: v.place },
      { label: "Town or city", value: v.town },
      { label: "State", value: v.state },
      { label: "Contact person", value: v.name },
      { label: "Role", value: v.role },
      { label: "Contact", value: v.contact },
    ],
    note: { label: "Anything we should know", value: v.message },
    sender: { name: v.name, contact: v.contact },
  });
  if (!ok) return { status: "error", errors: {}, message: GENERIC_ERROR };
  return { status: "success", name: v.name.split(" ")[0] };
}

/** Someone who keeps the peace, put forward to be found and celebrated within the 100 days */
export async function nominatePeacemaker(formData: FormData): Promise<FormState<PeacemakerField>> {
  if (looksLikeBot(formData, "peacemaker")) return { status: "error", errors: {}, message: GENERIC_ERROR };
  const r = parse(peacemakerSchema, PEACEMAKER_FIELDS, formData);
  if (!r.data) return { status: "error", errors: r.errors };
  if (rateLimited(`peacemaker:${clientIp(await headers())}`)) return { status: "error", errors: {}, message: BUSY };

  const v = r.data;
  const ok = await deliver("peacemaker", {
    subject: `100 Days of Peace: ${v.nominee} put forward by ${v.name}`,
    intro: `${v.where} peacemaker, received ${received()} (Lagos time)`,
    fields: [
      { label: "Their name", value: v.nominee },
      { label: "Where they keep the peace", value: v.where },
      { label: "Town and state", value: v.town },
      { label: "Put forward by", value: v.name },
      { label: "Contact", value: v.contact },
    ],
    note: { label: "What they have done", value: v.story },
    sender: { name: v.name, contact: v.contact },
  });
  if (!ok) return { status: "error", errors: {}, message: GENERIC_ERROR };
  return { status: "success", name: v.name.split(" ")[0] };
}
