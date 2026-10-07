import "server-only";
import { Resend } from "resend";
import { isEmail, isNigerianPhone } from "./nomination";

/*
  Form submissions are delivered by email only: there is no database or spreadsheet, so the email is the record.
  FORMS_ALERT_TO: the inbox that receives them (comma-separated for several). FORMS_FROM: the sender, on a domain
  verified in Resend. The older NOMINATIONS_* names still work.
*/
const alertTo = () => process.env.FORMS_ALERT_TO || process.env.NOMINATIONS_ALERT_TO || "";
const sender = () =>
  process.env.FORMS_FROM || process.env.NOMINATIONS_FROM || "House of Evulv Website <website@houseofevulv.com>";

export type AlertField = { label: string; value: string };

export type Alert = {
  /** Subject line, also the heading */
  subject: string;
  /** A short line under the heading, e.g. what kind of submission this is */
  intro: string;
  /** Short answers, shown as a two-column table */
  fields: AlertField[];
  /** A long answer shown in full under the table (a message, a description) */
  note?: AlertField;
  /** The person who filled the form, for the reply button */
  sender: { name: string; contact: string };
};

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && alertTo());
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** How to answer the sender: email them, or open a WhatsApp chat with their Nigerian number */
function replyLink(contact: string) {
  if (isEmail(contact)) return { href: `mailto:${contact.trim()}`, label: "Reply by email", email: contact.trim() };
  if (isNigerianPhone(contact)) {
    const digits = contact.replace(/\D/g, "").replace(/^0/, "234");
    return { href: `https://wa.me/${digits}`, label: "Message on WhatsApp", email: undefined };
  }
  return null;
}

// Brand colours, inline because email clients ignore stylesheets
const ESPRESSO = "#1E1712";
const MUTED = "#5F5347";
const RULE = "#E6DED1";
const IVORY = "#F7F3EC";
const GOLD = "#C9A54C";

function html(a: Alert, reply: ReturnType<typeof replyLink>) {
  const rows = a.fields
    .filter((f) => f.value)
    .map(
      (f) =>
        `<tr><td valign="top" width="150" style="width:150px;padding:10px 16px 10px 0;border-top:1px solid ${RULE};color:${MUTED};font-size:13px;font-weight:600">${esc(f.label)}</td>` +
        `<td valign="top" style="padding:10px 0;border-top:1px solid ${RULE};font-size:15px;word-break:break-word">${esc(f.value)}</td></tr>`
    )
    .join("");
  const note = a.note?.value
    ? `<p style="margin:24px 0 6px;color:${MUTED};font-size:13px;font-weight:600">${esc(a.note.label)}</p>` +
      `<div style="padding:14px 16px;background:${IVORY};border-radius:8px;font-size:15px;line-height:1.55;white-space:pre-wrap">${esc(a.note.value)}</div>`
    : "";
  const button = reply
    ? `<p style="margin:28px 0 0"><a href="${esc(reply.href)}" style="display:inline-block;padding:12px 22px;background:${ESPRESSO};color:#fff;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none">${reply.label}</a></p>`
    : "";

  return `<!doctype html><html><body style="margin:0;padding:24px 12px;background:${IVORY}">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;font-family:Helvetica,Arial,sans-serif;color:${ESPRESSO}">
<tr><td style="padding:18px 28px;background:${ESPRESSO};color:${GOLD};font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">House of Evulv · Website</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0;font-size:22px;line-height:1.3">${esc(a.subject)}</h1>
<p style="margin:6px 0 20px;color:${MUTED};font-size:14px">${esc(a.intro)}</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
${note}${button}
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid ${RULE};color:${MUTED};font-size:12px;line-height:1.5">Sent from the form on houseofevulv.com. ${
    reply?.email ? `Replying to this email answers ${esc(a.sender.name)} directly.` : "Use the contact details above to answer."
  } This email is the only copy of the submission: keep it.</td></tr>
</table></td></tr></table></body></html>`;
}

function text(a: Alert) {
  return [
    a.subject,
    a.intro,
    "",
    ...a.fields.filter((f) => f.value).map((f) => `${f.label}: ${f.value}`),
    ...(a.note?.value ? ["", `${a.note.label}:`, a.note.value] : []),
    "",
    "Sent from the form on houseofevulv.com. This email is the only copy of the submission: keep it.",
  ].join("\n");
}

/** Emails a form submission to the House. Throws if it could not be sent, since nothing else keeps it. */
export async function sendAlert(a: Alert) {
  const reply = replyLink(a.sender.contact);
  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: sender(),
    to: alertTo()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    replyTo: reply?.email ? `${a.sender.name.replace(/[<>",]/g, "")} <${reply.email}>` : undefined,
    subject: a.subject,
    text: text(a),
    html: html(a, reply),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}
