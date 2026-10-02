"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { pledgeSupport } from "@/app/actions/support";
import { partnership, support } from "@/lib/content";
import { SUPPORT_FIELDS, SUPPORT_MESSAGE_MAX, type SupportField, type SupportState } from "@/lib/support-fields";

const control =
  "w-full min-h-[50px] rounded-xl border bg-white px-4 py-3.5 text-base font-medium text-ink placeholder:text-[#9A8D7C] md:py-[15px]";
const fmt = (n: number) => n.toLocaleString("en-GB");

function Field({ id, label, error, className = "", children, hint }: {
  id: SupportField;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {hint}
      {error && (
        <p id={`${id}-error`} className="m-0 text-[13px] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

type Kind = "money" | "partner" | "kind" | "volunteer" | "other";

const kindOf = (type: string): Kind =>
  /money/i.test(type) ? "money" : /partner/i.test(type) ? "partner" : /kind/i.test(type) ? "kind" : /volunteer/i.test(type) ? "volunteer" : "other";

// Labels, placeholders and the button follow the kind of support chosen
const COPY: Record<Kind, { organisation: string; amountLabel: string; amount: string; message: string; note: string; submit: string; done: string }> = {
  money: {
    organisation: "Leave blank if giving personally",
    amountLabel: "Amount you would like to give",
    amount: "Optional, e.g. ₦50,000",
    message: "Optional: a category you care about, a region, or how you would like to be acknowledged.",
    note: "No payment is taken here. We contact you to arrange it.",
    submit: "Send my pledge",
    done: "Your pledge has reached the House.",
  },
  partner: {
    organisation: "The institution you represent",
    amountLabel: "Partnership of interest",
    amount: "",
    message: "Optional: what your institution hopes to achieve, and who we should send the partnership brief to.",
    note: "We reply with the partnership brief and arrange a conversation.",
    submit: "Send my enquiry",
    done: "Your partnership enquiry has reached the House.",
  },
  kind: {
    organisation: "Your company or organisation, if any",
    amountLabel: "What you can offer",
    amount: "e.g. media coverage, printing, transport",
    message: "Optional: when it is available, and anything we should know about using it.",
    note: "We contact you to agree the details.",
    submit: "Send my offer",
    done: "Your offer has reached the House.",
  },
  volunteer: {
    organisation: "Leave blank if volunteering personally",
    amountLabel: "Time you can give",
    amount: "e.g. weekends in November, or the ceremony day",
    message: "Optional: your skills or experience, and where you are based.",
    note: "We contact you about where you can help.",
    submit: "Offer my time",
    done: "Your offer to volunteer has reached the House.",
  },
  other: {
    organisation: "Leave blank if giving personally",
    amountLabel: "Amount or what you can offer",
    amount: "Optional",
    message: "Tell us how you would like to help.",
    note: "We contact you to arrange the next step.",
    submit: "Send my message",
    done: "Your message has reached the House.",
  },
};

/** Pledge of support: saved to the Google Sheet with an email alert. Online payment, if any, is a separate link. */
export function SupportForm({ paymentUrl }: { paymentUrl: string | null }) {
  const [state, setState] = useState<SupportState>({ status: "idle" });
  const [errors, setErrors] = useState<Partial<Record<SupportField, string>>>({});
  const [pending, startTransition] = useTransition();
  const [renderedAt, setRenderedAt] = useState(0);
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const [tier, setTier] = useState("");
  const kind = kindOf(type);
  const copy = COPY[kind];
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setRenderedAt(Date.now()), []);

  // Arriving from a partnership tier (?partner=Founding): choose "partner" and that tier
  useEffect(() => {
    const name = new URLSearchParams(window.location.search).get("partner");
    const option = support.types.find((t) => kindOf(t) === "partner");
    if (!option || !partnership.tiers.some((t) => t.name === name)) return;
    setType(option);
    setTier(`${name} Partnership`);
  }, []);

  useEffect(() => {
    if (state.status === "error") {
      const first = SUPPORT_FIELDS.find((f) => state.errors[f]);
      const el = first && formRef.current?.elements.namedItem(first);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        el.focus({ preventScroll: true });
      }
    }
    if (state.status === "success") doneRef.current?.focus();
  }, [state]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const result = await pledgeSupport(data);
        setState(result);
        setErrors(result.status === "error" ? result.errors : {});
      } catch {
        setState({ status: "error", errors: {}, message: "We couldn't reach the server. Check your connection and try again." });
      }
    });
  };

  const clear = (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as SupportField;
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const a11y = (id: SupportField, extra?: string) => ({
    id,
    name: id,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": [errors[id] && `${id}-error`, extra].filter(Boolean).join(" ") || undefined,
  });
  const border = (id: SupportField) => (errors[id] ? "border-error" : "border-rule-2");

  if (state.status === "success") {
    return (
      <div aria-live="polite" className="flex flex-col gap-4">
        <h3 ref={doneRef} tabIndex={-1} className="m-0 text-[28px] leading-[1.1] font-bold outline-none">
          Thank you, {state.name}.
        </h3>
        <p className="m-0 text-base leading-[1.6] text-body">
          {copy.done} We will be in touch using the details you gave to arrange the next step.
        </p>
        {paymentUrl && (
          <a
            href={paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn min-h-12 self-start bg-espresso px-6 py-4 font-bold text-ivory"
          >
            Give online now
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <form ref={formRef} method="post" noValidate onSubmit={onSubmit} onInput={clear} onChange={clear} className="flex flex-col gap-[22px] md:gap-6">
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="rendered_at" value={renderedAt} />

      <fieldset className="m-0 border-0 p-0">
        <legend className="t-display p-0 pb-3.5 text-lg">About you</legend>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
          <Field id="name" label="Your name" error={errors.name}>
            <input {...a11y("name")} type="text" autoComplete="name" required maxLength={120} className={`${control} ${border("name")}`} />
          </Field>
          <Field id="organisation" label="Organisation" error={errors.organisation}>
            <input
              {...a11y("organisation")}
              type="text"
              autoComplete="organization"
              maxLength={160}
              placeholder={copy.organisation}
              className={`${control} ${border("organisation")}`}
            />
          </Field>
          <Field id="contact" label="Email or WhatsApp number" error={errors.contact} className="md:col-span-2">
            <input
              {...a11y("contact")}
              type="text"
              inputMode="text"
              autoComplete="email"
              required
              placeholder="So we can reach you"
              className={`${control} ${border("contact")}`}
            />
          </Field>
        </div>
      </fieldset>

      <div className="border-t border-rule pt-5 md:pt-6">
        <fieldset className="m-0 border-0 p-0">
          <legend className="t-display p-0 pb-3.5 text-lg">Your support</legend>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
            <Field id="supportType" label="How would you like to help?" error={errors.supportType}>
              <select {...a11y("supportType")} required value={type} onChange={(e) => setType(e.target.value)} className={`${control} ${border("supportType")}`}>
                <option value="" disabled>
                  Choose one
                </option>
                {support.types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field id="amount" label={copy.amountLabel} error={errors.amount}>
              {kind === "partner" ? (
                <select {...a11y("amount")} value={tier} onChange={(e) => setTier(e.target.value)} className={`${control} ${border("amount")}`}>
                  <option value="">Not sure yet</option>
                  {partnership.tiers.map((t) => (
                    <option key={t.name}>{t.name} Partnership</option>
                  ))}
                </select>
              ) : (
                <input
                  {...a11y("amount")}
                  type="text"
                  maxLength={60}
                  placeholder={copy.amount}
                  className={`${control} ${border("amount")}`}
                />
              )}
            </Field>
            <Field
              id="message"
              label="Anything we should know?"
              error={errors.message}
              className="md:col-span-2"
              hint={
                <span className="flex justify-end text-[13px] font-medium text-help" aria-live="polite" aria-atomic="true">
                  <span className="sr-only">Characters used: </span>
                  {fmt(count)} / {fmt(SUPPORT_MESSAGE_MAX)}
                </span>
              }
            >
              <textarea
                {...a11y("message")}
                rows={4}
                maxLength={SUPPORT_MESSAGE_MAX}
                onChange={(e) => setCount(e.target.value.length)}
                placeholder={copy.message}
                className={`${control} resize-y leading-normal ${border("message")}`}
              />
            </Field>
            <div className="flex flex-col gap-2 md:col-span-2">
              <div className="flex items-start gap-3 text-sm leading-normal font-medium text-body">
                <input {...a11y("consent")} type="checkbox" required className="mt-px size-6 shrink-0 accent-espresso md:size-5" />
                <label htmlFor="consent">
                  I agree that House of Evulv may contact me about my support, as set out in the{" "}
                  <Link href="/privacy" className="font-semibold text-espresso underline">
                    privacy notice
                  </Link>{" "}
                  (NDPA 2023).
                </label>
              </div>
              {errors.consent && (
                <p id="consent-error" className="m-0 text-[13px] font-medium text-error">
                  {errors.consent}
                </p>
              )}
            </div>
          </div>
        </fieldset>
      </div>

      <div aria-live="polite" className="empty:hidden">
        {state.status === "error" && state.message && (
          <p className="m-0 rounded-xl border border-error/30 bg-white px-4 py-3 text-sm font-medium text-error">{state.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5">
        <p className="m-0 hidden text-[13px] text-help md:block">{copy.note}</p>
        <button
          type="submit"
          // Disabled until hydrated, so a tap before JavaScript loads never falls back to a native submit
          disabled={pending || renderedAt === 0}
          className="btn min-h-12 w-full border-0 bg-espresso px-7 py-[15px] text-base font-bold text-ivory disabled:cursor-wait disabled:opacity-70 md:w-auto md:py-[17px]"
        >
          {pending ? "Sending…" : copy.submit}
        </button>
      </div>
    </form>
  );
}
