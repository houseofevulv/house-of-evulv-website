"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { nominate } from "@/app/actions/nominate";
import { Logo } from "@/components/Logo";
import { categories, nominations, states } from "@/lib/content";
import { DESCRIPTION_MAX, FIELD_ORDER, type FieldName, type NominateState } from "@/lib/nomination-fields";

export type AfterStep = { when: string; text: string };

const control =
  "w-full min-h-[50px] rounded-xl border bg-white px-4 py-3.5 text-base font-medium text-ink placeholder:text-[#9A8D7C] md:py-[15px]";
const fmt = (n: number) => n.toLocaleString("en-GB");

function Field({
  id,
  label,
  error,
  className = "",
  children,
  help,
}: {
  id: FieldName;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
  help?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {help}
      {error && (
        <p id={`${id}-error`} className="m-0 text-[13px] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function NominationForm({ after, contactHint }: { after: AfterStep[]; contactHint: string }) {
  const [state, setState] = useState<NominateState>({ status: "idle" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [pending, startTransition] = useTransition();
  const [renderedAt, setRenderedAt] = useState(0);
  const [count, setCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setRenderedAt(Date.now()), []);

  // Focus the first invalid field, scrolled clear of the top edge
  useEffect(() => {
    if (state.status !== "error") return;
    const first = FIELD_ORDER.find((f) => state.errors[f]);
    if (!first) return;
    const el = formRef.current?.elements.namedItem(first);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      el.focus({ preventScroll: true });
    }
  }, [state]);

  useEffect(() => {
    if (state.status === "success") doneRef.current?.focus();
  }, [state]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const result = await nominate(data);
        setState(result);
        setErrors(result.status === "error" ? result.errors : {});
      } catch {
        setState({
          status: "error",
          errors: {},
          message: "We couldn't reach the server. Check your connection and try again.",
        });
      }
    });
  };

  // Clear a field's error as soon as it is edited
  const clear = (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as FieldName;
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const a11y = (id: FieldName, extra?: string) => ({
    id,
    name: id,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": [errors[id] && `${id}-error`, extra].filter(Boolean).join(" ") || undefined,
  });
  const border = (id: FieldName) => (errors[id] ? "border-error" : "border-rule-2");

  if (state.status === "success") {
    return (
      <div aria-live="polite" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Logo name="sentinelsSeal" alt="" className="mb-3 h-auto w-[120px] self-start" />
          <h3 ref={doneRef} tabIndex={-1} className="m-0 text-[28px] leading-[1.1] font-bold outline-none">
            Nomination received
          </h3>
          <p className="m-0 text-[15px] leading-normal text-body">Your reference number is</p>
          <p className="m-0 text-[28px] leading-[1.2] font-bold text-espresso">{state.reference}</p>
          <p className="m-0 text-[15px] leading-normal text-body">Keep it for your records. Quote it if you contact us.</p>
        </div>
        <div>
          <h4 className="t-eyebrow m-0 pb-3.5 text-bronze">What happens next</h4>
          <ol className="m-0 list-none p-0">
            {after.map((s, i) => (
              <li
                key={s.when}
                className={`grid grid-cols-[84px_1fr] gap-3 border-t border-rule py-3.5 text-[15px] leading-normal md:grid-cols-[96px_1fr] md:gap-4 md:py-4 ${
                  i === after.length - 1 ? "border-b" : ""
                }`}
              >
                <b className="text-espresso">{s.when}</b>
                <span className="text-body">{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} method="post" noValidate onSubmit={onSubmit} onInput={clear} onChange={clear} className="flex flex-col gap-[22px] md:gap-7">
      {/* Spam traps: a field people never see, and the time the form was rendered */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="rendered_at" value={renderedAt} />

      <fieldset className="m-0 border-0 p-0">
        <legend className="t-display p-0 pb-3.5 text-lg">The nominee</legend>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
          <Field id="nomineeName" label="Full name" error={errors.nomineeName}>
            <input
              {...a11y("nomineeName")}
              type="text"
              autoComplete="off"
              required
              maxLength={120}
              placeholder="As they are publicly known"
              className={`${control} ${border("nomineeName")}`}
            />
          </Field>
          <Field id="organisation" label="Organisation" error={errors.organisation}>
            <input
              {...a11y("organisation")}
              type="text"
              autoComplete="off"
              maxLength={160}
              placeholder="Leave blank if none"
              className={`${control} ${border("organisation")}`}
            />
          </Field>
          <Field id="category" label="Category" error={errors.category}>
            {/* TODO(client): categories are a draft (see content/site-content.json) */}
            <select {...a11y("category")} required defaultValue="" className={`${control} ${border("category")}`}>
              <option value="" disabled>
                Choose one
              </option>
              {categories.map((c) => (
                <option key={c.title}>{c.title}</option>
              ))}
            </select>
          </Field>
          <Field id="state" label="State where the work happened" error={errors.state}>
            <select {...a11y("state")} required defaultValue="" className={`${control} ${border("state")}`}>
              <option value="" disabled>
                Choose a state
              </option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      <div className="border-t border-rule pt-5 md:pt-6">
        <fieldset className="m-0 border-0 p-0">
          <legend className="t-display p-0 pb-3.5 text-lg">Their work</legend>
          <div className="flex flex-col gap-3.5 md:gap-4">
            <Field
              id="description"
              label="What did they do, and who benefited?"
              error={errors.description}
              help={
                <span className="flex items-start justify-between gap-3 text-[13px] font-medium text-help">
                  <span id="description-help">Specific events count for more than general praise.</span>
                  <span className="whitespace-nowrap" aria-live="polite" aria-atomic="true">
                    <span className="sr-only">Characters used: </span>
                    {fmt(count)} / {fmt(DESCRIPTION_MAX)}
                  </span>
                </span>
              }
            >
              <textarea
                {...a11y("description", "description-help")}
                rows={6}
                required
                maxLength={DESCRIPTION_MAX}
                onChange={(e) => setCount(e.target.value.length)}
                placeholder="Where it happened, roughly when, and what changed for the people involved."
                className={`${control} resize-y leading-normal ${border("description")}`}
              />
            </Field>
            <Field id="link" label="Link to coverage or records" error={errors.link}>
              <input
                {...a11y("link")}
                type="url"
                inputMode="url"
                autoComplete="off"
                placeholder="Optional: news report, letter, photographs"
                className={`${control} ${border("link")}`}
              />
            </Field>
          </div>
        </fieldset>
      </div>

      <div className="border-t border-rule pt-5 md:pt-6">
        <fieldset className="m-0 border-0 p-0">
          <legend className="t-display p-0 pb-3.5 text-lg">About you</legend>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4">
            <Field id="nominatorName" label="Your name" error={errors.nominatorName}>
              <input
                {...a11y("nominatorName")}
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                className={`${control} ${border("nominatorName")}`}
              />
            </Field>
            <Field id="nominatorContact" label="Email or WhatsApp number" error={errors.nominatorContact}>
              <input
                {...a11y("nominatorContact")}
                type="text"
                inputMode="text"
                autoComplete="email"
                required
                placeholder={contactHint}
                className={`${control} ${border("nominatorContact")}`}
              />
            </Field>
            <div className="flex flex-col gap-2 md:col-span-2">
              <div className="flex items-start gap-3 text-sm leading-normal font-medium text-body">
                <input
                  {...a11y("consent")}
                  type="checkbox"
                  required
                  className="mt-px size-6 shrink-0 accent-espresso md:size-5"
                />
                <label htmlFor="consent">
                  I agree that House of Evulv may contact me and the nominee about this nomination, as set out in the{" "}
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
        {state.status === "error" && !state.message && Object.keys(state.errors).length > 0 && (
          <p className="sr-only">Some answers need attention. The first one is selected.</p>
        )}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5">
        <p className="m-0 hidden text-[13px] text-help md:block">
          Ref. numbers follow the format {nominations.referenceFormat}.
        </p>
        <button
          type="submit"
          // Disabled until hydrated, so a tap before JavaScript loads never falls back to a native submit
          disabled={pending || renderedAt === 0}
          className="btn min-h-12 w-full border-0 bg-espresso px-7 py-[15px] text-base font-bold text-ivory disabled:cursor-wait disabled:opacity-70 md:w-auto md:py-[17px]"
        >
          {pending ? "Sending…" : "Submit nomination"}
        </button>
      </div>
    </form>
  );
}
