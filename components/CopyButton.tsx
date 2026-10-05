"use client";

import { useState } from "react";

/** Copies a value such as an account number, with a short confirmation announced to screen readers */
export function CopyButton({ value, label, tone = "light" }: { value: string; label: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the number stays visible and selectable
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className={`btn min-h-11 shrink-0 px-4 py-2.5 text-sm font-semibold ${
        tone === "dark" ? "border border-gold/50 text-gold" : "border border-rule-2 bg-white text-espresso"
      }`}
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
