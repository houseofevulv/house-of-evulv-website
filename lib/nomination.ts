import { z } from "zod";
import { categories, states } from "./content";
import { DESCRIPTION_MAX, DESCRIPTION_MIN } from "./nomination-fields";

export * from "./nomination-fields";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Nigerian mobile: +234 followed by 10 digits, or 0 followed by 10 digits. Spaces, dashes and brackets ignored. */
export function isNigerianPhone(value: string) {
  const v = value.replace(/[\s\-()]/g, "");
  return /^\+234\d{10}$/.test(v) || /^0\d{10}$/.test(v);
}

export const isEmail = (value: string) => EMAIL.test(value.trim());

const text = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, min <= 1 ? `Enter ${label}.` : `Enter ${label} (at least ${min} characters).`)
    .max(max, `Keep ${label} under ${max} characters.`);

export const nominationSchema = z.object({
  nomineeName: text("the nominee's full name", 2, 120),
  organisation: z.string().trim().max(160, "Keep the organisation under 160 characters."),
  category: z.enum(categories.map((c) => c.title) as [string, ...string[]], {
    error: "Choose a category.",
  }),
  state: z.enum(states as [string, ...string[]], { error: "Choose the state where the work happened." }),
  description: z
    .string()
    .trim()
    .min(DESCRIPTION_MIN, `Tell us a little more: at least ${DESCRIPTION_MIN} characters.`)
    .max(DESCRIPTION_MAX, `Keep this under ${DESCRIPTION_MAX.toLocaleString("en-GB")} characters.`),
  link: z
    .string()
    .trim()
    .refine((v) => {
      if (v === "") return true;
      try {
        const u = new URL(v);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    }, "Enter a full web address starting with http:// or https://, or leave this blank."),
  nominatorName: text("your name", 2, 120),
  nominatorContact: z
    .string()
    .trim()
    .min(1, "Enter your email or WhatsApp number.")
    .refine(
      (v) => isEmail(v) || isNigerianPhone(v),
      "Enter a valid email, or a Nigerian number starting with +234 or 0 (11 digits)."
    ),
  consent: z.literal("on", { error: "Tick the box to agree before submitting." }),
});

export type Nomination = z.infer<typeof nominationSchema>;
