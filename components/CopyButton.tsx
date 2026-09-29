"use client";

import { useState } from "react";

/** Copies a value such as an account number, with a short confirmation announced to screen readers */
export function CopyButton({ value, label }: { value: string; label: string }) {
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
      className="btn min-h-11 shrink-0 border border-rule-2 bg-white px-4 py-2.5 text-sm font-semibold text-forest"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
