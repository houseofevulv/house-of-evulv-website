import "server-only";
import { Resend } from "resend";

export type AlertField = { label: string; value: string };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Alerts go to NOMINATIONS_ALERT_TO (the House's inbox for form submissions) */
export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOMINATIONS_ALERT_TO);
}

/** Emails the House a form submission as a labelled table */
export async function sendAlert(title: string, fields: AlertField[], replyTo?: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const rows = fields
    .map(
      (f) =>
        `<tr><th align="left" valign="top" style="padding:6px 16px 6px 0;color:#4F5752;font-weight:600">${esc(f.label)}</th>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${esc(f.value || "-")}</td></tr>`
    )
    .join("");

  const { error } = await resend.emails.send({
    from: process.env.NOMINATIONS_FROM || "House of Evulv <nominations@houseofevulv.com>",
    to: process.env.NOMINATIONS_ALERT_TO!.split(",").map((s) => s.trim()),
    replyTo,
    subject: title,
    text: [title, "", ...fields.map((f) => `${f.label}: ${f.value || "-"}`)].join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#121614"><h2 style="margin:0 0 16px">${esc(
      title
    )}</h2><table cellspacing="0" cellpadding="0">${rows}</table></div>`,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

/** Alert to the House for each new nomination */
export function sendNominationAlert(reference: string, fields: AlertField[], replyTo?: string) {
  return sendAlert(`New nomination ${reference}`, fields, replyTo);
}
