import "server-only";
import { JWT } from "google-auth-library";

const SHEET = "Nominations";
const API = "https://sheets.googleapis.com/v4/spreadsheets";

export function sheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.NOMINATIONS_SHEET_ID
  );
}

let client: JWT | null = null;

async function token() {
  client ??= new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Google auth returned no access token");
  return token;
}

async function call(path: string, init: RequestInit) {
  const res = await fetch(`${API}/${process.env.NOMINATIONS_SHEET_ID}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await token()}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sheets API ${res.status}: ${await res.text()}`);
  return res.json();
}

/**
 * Appends one nomination row and returns its sheet row number.
 * Row 1 holds headers, so nomination n sits on row n + 1. The reference is derived from the row the
 * API actually wrote, which keeps it unique when two nominations arrive at once, then written into column B.
 */
export async function appendNomination(row: (string | boolean)[], toReference: (n: number) => string) {
  const rowNumber = await appendRow(SHEET, "A:L", row);
  const reference = toReference(rowNumber - 1);
  await call(`/values/${encodeURIComponent(`${SHEET}!B${rowNumber}`)}?valueInputOption=RAW`, {
    method: "PUT",
    body: JSON.stringify({ values: [[reference]] }),
  });
  return reference;
}

/** Appends one row to a tab and returns the sheet row number it landed on */
export async function appendRow(tab: string, columns: string, row: (string | boolean)[]) {
  const range = encodeURIComponent(`${tab}!${columns}`);
  const appended = await call(`/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [row] }),
  });
  const updated: string = appended.updates?.updatedRange ?? "";
  const rowNumber = Number(/!A(\d+)/.exec(updated)?.[1]);
  if (!rowNumber) throw new Error(`Could not read appended row from "${updated}"`);
  return rowNumber;
}
