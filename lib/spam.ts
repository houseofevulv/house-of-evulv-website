import "server-only";

const MIN_FILL_MS = 3000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

/** Hidden honeypot field filled, or the form sent within 3 seconds of rendering: almost certainly a bot */
export function looksLikeBot(formData: FormData) {
  const honeypot = String(formData.get("website") ?? "");
  const renderedAt = Number(formData.get("rendered_at") ?? 0);
  return honeypot !== "" || !renderedAt || Date.now() - renderedAt < MIN_FILL_MS;
}

/*
  Per-IP rate limit, held in memory. On Vercel each warm function instance keeps its own map, so this
  stops bursts from one client but is not a global guarantee. Move to Vercel KV / Upstash if abuse appears.
  Each form passes its own key prefix so the limits are counted separately.
*/
const hits = new Map<string, number[]>();
export function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

export function clientIp(h: Headers) {
  return h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
