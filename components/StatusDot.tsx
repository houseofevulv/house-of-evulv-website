import type { Phase } from "@/lib/dates";

export function StatusDot({ phase }: { phase: Phase }) {
  return (
    <span
      aria-hidden="true"
      className={`size-2 shrink-0 rounded-full ${phase === "open" ? "bg-gold" : "border border-on-dark-3"}`}
    />
  );
}
