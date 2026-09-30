import { nominations, steps } from "./content";

export const TIME_ZONE = "Africa/Lagos";

/** Today's date in Lagos as YYYY-MM-DD. DEBUG_TODAY overrides it outside production. */
export function todayInLagos(now: Date = new Date()): string {
  const override = process.env.DEBUG_TODAY;
  if (override && process.env.VERCEL_ENV !== "production" && /^\d{4}-\d{2}-\d{2}$/.test(override)) {
    return override;
  }
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export type Phase = "before" | "open" | "closed";

export function nominationPhase(today = todayInLagos()): Phase {
  if (today < nominations.opens) return "before";
  if (today > nominations.closes) return "closed";
  return "open";
}

/** Index of the step in progress, or the next one coming up. After the last step, the last step. */
export function currentStepIndex(today = todayInLagos()): number {
  const i = steps.findIndex((s) => today <= s.end);
  return i === -1 ? steps.length - 1 : i;
}

// ISO dates in the JSON are calendar dates, so format them at UTC midnight.
const at = (iso: string) => new Date(`${iso}T00:00:00Z`);
const fmt = (opts: Intl.DateTimeFormatOptions) => (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(at(iso)).replace(",", "");

/** "19 October" */
export const dayMonth = fmt({ day: "numeric", month: "long" });
/** "19 Oct". en-GB writes September as "Sept"; the site uses three-letter months throughout. */
export const dayMonthShort = (iso: string) => fmt({ day: "numeric", month: "short" })(iso).replace("Sept", "Sep");
/** "Friday 20 November" */
export const weekdayDayMonth = fmt({ weekday: "long", day: "numeric", month: "long" });

export type Status = { phase: Phase; home: string; sentinels: string; sentinelsMobile: string };

export function nominationStatus(today = todayInLagos()): Status {
  const phase = nominationPhase(today);
  const closes = dayMonth(nominations.closes);
  if (phase === "before") {
    const t = `Nominations open ${dayMonth(nominations.opens)}`;
    return { phase, home: t, sentinels: t, sentinelsMobile: t };
  }
  if (phase === "closed") {
    const t = "Nominations closed";
    return { phase, home: t, sentinels: t, sentinelsMobile: t };
  }
  return {
    phase,
    home: `Nominations open until ${closes}`,
    sentinels: `Closes ${closes}`,
    sentinelsMobile: `Nominations close ${closes}`,
  };
}
