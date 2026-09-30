import { nominations } from "./content";
import { nominationPhase } from "./dates";

/**
 * The programme's main call to action. With public nominations (future editions) it is "Nominate someone" while
 * nominations are open; for the 2026 edition, where honourees are selected, it is supporting the programme.
 * Returns null when there is nothing to act on (public nominations have closed).
 */
export function primaryAction(onSentinelsPage = false) {
  const base = onSentinelsPage ? "" : "/sentinels-of-peace";
  if (nominations.public) {
    return nominationPhase() === "closed" ? null : { href: `${base}#nominate`, label: "Nominate someone", short: "Nominate" };
  }
  return { href: `${base}#support`, label: "Support the programme", short: "Support" };
}
