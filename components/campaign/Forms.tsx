"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { inviteCampaign, nominatePeacemaker } from "@/app/actions/campaign";
import {
  INVITE_COPY,
  INVITE_FIELDS,
  INVITE_KINDS,
  PEACEMAKER_FIELDS,
  PEACEMAKER_WHERE,
  STORY_MAX,
  type FormState,
  type InviteField,
  type InviteKind,
  type PeacemakerField,
} from "@/lib/campaign";

type Tone = "gold" | "navy";
const TONES = {
  gold: {
    label: "text-black",
    control: "border-[#a8843a] bg-ivory text-black placeholder:text-[#6b5a35]",
    error: "text-[#7a1209]",
    note: "text-black/75",
    button: "bg-black text-ivory",
  },
  navy: {
    label: "text-on-dark",
    control: "border-rule-dark-2 bg-black text-on-dark placeholder:text-on-dark-3",
    error: "text-[#ffb4a8]",
    note: "text-on-dark-2",
    button: "bg-gold text-black",
  },
};

/** Shared form plumbing: submit through the server action, show field errors, focus the first one, then thank */
function useCampaignForm<F extends string>(fields: readonly F[], action: (d: FormData) => Promise<FormState<F>>) {
  const [state, setState] = useState<FormState<F>>({ status: "idle" });
  const [errors, setErrors] = useState<Partial<Record<F, string>>>({});
  const [pending, start] = useTransition();
  const [renderedAt, setRenderedAt] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => setRenderedAt(Date.now()), []);
  useEffect(() => {
    if (state.status === "error") {
      const first = fields.find((f) => state.errors[f]);
      const el = first && formRef.current?.elements.namedItem(first);
      if (el instanceof HTMLElement) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        el.focus({ preventScroll: true });
      }
    }
    if (state.status === "success") doneRef.current?.focus();
  }, [state, fields]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    start(async () => {
      try {
        const result = await action(data);
        setState(result);
        setErrors(result.status === "error" ? result.errors : {});
      } catch {
        setState({ status: "error", errors: {}, message: "We couldn't reach the server. Check your connection and try again." });
      }
    });
  };
  const clear = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as F;
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest as Partial<Record<F, string>>);
  };
  const a11y = (id: F) => ({
    id: `${String(fields[0])}-${id}`,
    name: id,
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${String(fields[0])}-${id}-error` : undefined,
  });
  return { state, errors, pending, renderedAt, formRef, doneRef, onSubmit, clear, a11y };
}

function Field({ htmlFor, label, error, tone, className = "", children }: {
  htmlFor: string;
  label: string;
  error?: string;
  tone: Tone;
  className?: string;
  children: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={htmlFor} className={`text-sm font-semibold ${t.label}`}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className={`m-0 text-[13px] font-semibold ${t.error}`}>
          {error}
        </p>
      )}
    </div>
  );
}

function Honeypot({ renderedAt }: { renderedAt: number }) {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="hp_note" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" data-bwignore data-form-type="other" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="rendered_at" value={renderedAt} />
    </>
  );
}

function Done({ heading, body, tone, doneRef }: { heading: string; body: string; tone: Tone; doneRef: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <div aria-live="polite" className="flex flex-col gap-3">
      <h3 ref={doneRef} tabIndex={-1} className={`t-display m-0 text-[28px] leading-[1.1] outline-none ${tone === "gold" ? "text-black" : "text-ivory"}`}>
        {heading}
      </h3>
      <p className={`m-0 text-base leading-[1.6] ${TONES[tone].note}`}>{body}</p>
    </div>
  );
}

const control = "w-full min-h-[52px] rounded-xl border px-4 py-3 text-base font-medium";

/** Put forward someone who keeps the peace: always on the page, black on gold */
export function PeacemakerForm() {
  const f = useCampaignForm(PEACEMAKER_FIELDS, nominatePeacemaker);
  const t = TONES.gold;
  const [count, setCount] = useState(0);
  const border = (id: PeacemakerField) => (f.errors[id] ? "border-[#7a1209]" : "");
  if (f.state.status === "success") {
    return (
      <Done
        tone="gold"
        doneRef={f.doneRef}
        heading={`Thank you, ${f.state.name}.`}
        body="Your nomination has reached the team. If we need more about them, we will be in touch using the details you gave."
      />
    );
  }
  return (
    <form ref={f.formRef} method="post" noValidate onSubmit={f.onSubmit} onInput={f.clear} onChange={f.clear} className="relative grid grid-cols-1 gap-[18px] md:grid-cols-2">
      <Honeypot renderedAt={f.renderedAt} />
      <Field htmlFor={f.a11y("nominee").id} label="Their name" error={f.errors.nominee} tone="gold" className="md:col-span-2">
        <input {...f.a11y("nominee")} type="text" autoComplete="off" maxLength={120} className={`${control} ${t.control} ${border("nominee")}`} />
      </Field>
      <Field htmlFor={f.a11y("where").id} label="Where they keep the peace" error={f.errors.where} tone="gold">
        <select {...f.a11y("where")} defaultValue="" className={`${control} ${t.control} ${border("where")}`}>
          <option value="" disabled>Choose one</option>
          {PEACEMAKER_WHERE.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </Field>
      <Field htmlFor={f.a11y("town").id} label="Town and state" error={f.errors.town} tone="gold">
        <input {...f.a11y("town")} type="text" maxLength={120} className={`${control} ${t.control} ${border("town")}`} />
      </Field>
      <Field htmlFor={f.a11y("story").id} label="What have they done?" error={f.errors.story} tone="gold" className="md:col-span-2">
        <textarea
          {...f.a11y("story")}
          rows={4}
          maxLength={STORY_MAX}
          onChange={(e) => setCount(e.target.value.length)}
          placeholder="A moment or a habit that shows who they are"
          className={`${control} ${t.control} ${border("story")} min-h-[128px] resize-y`}
        />
        <span className="self-end text-[13px] text-black/70">
          {count.toLocaleString("en-GB")} / {STORY_MAX.toLocaleString("en-GB")}
        </span>
      </Field>
      <Field htmlFor={f.a11y("name").id} label="Your name" error={f.errors.name} tone="gold">
        <input {...f.a11y("name")} type="text" autoComplete="name" maxLength={120} className={`${control} ${t.control} ${border("name")}`} />
      </Field>
      <Field htmlFor={f.a11y("contact").id} label="Your email or WhatsApp" error={f.errors.contact} tone="gold">
        <input {...f.a11y("contact")} type="text" autoComplete="email" className={`${control} ${t.control} ${border("contact")}`} />
      </Field>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-normal text-black">
          <input {...f.a11y("consent")} type="checkbox" className="mt-0.5 size-5 shrink-0 accent-black" />
          <span>
            I agree that House of Evulv may contact me, and them, about this nomination, as set out in the{" "}
            <a href="/privacy" className="font-semibold text-black underline">privacy notice</a> (NDPA 2023).
          </span>
        </label>
        {f.errors.consent && <p id={`${f.a11y("consent").id}-error`} className={`m-0 text-[13px] font-semibold ${t.error}`}>{f.errors.consent}</p>}
      </div>
      {f.state.status === "error" && f.state.message && (
        <p role="alert" className="m-0 rounded-xl bg-black/10 px-4 py-3 text-sm font-semibold text-black md:col-span-2">{f.state.message}</p>
      )}
      <div className="flex md:col-span-2 md:justify-end">
        <button type="submit" disabled={f.pending} className={`btn min-h-[52px] w-full px-7 font-bold md:w-auto ${t.button} disabled:opacity-60`}>
          {f.pending ? "Sending…" : "Nominate them"}
        </button>
      </div>
    </form>
  );
}

/** Ask the campaign to come: pick school, community or organisation, then the form appears in that wording */
export function InviteForm({ states }: { states: string[] }) {
  const f = useCampaignForm(INVITE_FIELDS, inviteCampaign);
  const t = TONES.navy;
  const [kind, setKind] = useState<InviteKind | null>(null);
  const copy = kind ? INVITE_COPY[kind] : null;
  const border = (id: InviteField) => (f.errors[id] ? "border-[#ffb4a8]" : "");

  if (f.state.status === "success" && copy) {
    return <Done tone="navy" doneRef={f.doneRef} heading={`Thank you, ${f.state.name}.`} body={`${copy.done} We will be in touch to plan it.`} />;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <p id="invite-kind-label" className="m-0 text-[15px] font-semibold text-ivory">This request is for a</p>
        <div role="group" aria-labelledby="invite-kind-label" className="grid w-full grid-cols-3 gap-1 rounded-full border border-ivory/30 p-1">
          {INVITE_KINDS.map((k) => {
            const on = k === kind;
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                aria-controls="invite-form"
                onClick={() => setKind(k)}
                className={`min-h-12 cursor-pointer rounded-full px-2 text-[15px] font-bold transition-colors md:t-display md:min-h-14 md:text-base md:font-normal ${
                  on ? "bg-gold text-black" : "text-ivory hover:bg-ivory/10"
                }`}
              >
                {INVITE_COPY[k].label}
              </button>
            );
          })}
        </div>
        {!kind && <p className="m-0 text-sm text-on-dark-3">Choose one to open the form.</p>}
      </div>

      {copy && (
        <form id="invite-form" ref={f.formRef} method="post" noValidate onSubmit={f.onSubmit} onInput={f.clear} onChange={f.clear} className="relative grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <Honeypot renderedAt={f.renderedAt} />
          <input type="hidden" name="kind" value={kind ?? ""} />
          <Field htmlFor={f.a11y("place").id} label={copy.nameLabel} error={f.errors.place} tone="navy" className="md:col-span-2">
            <input {...f.a11y("place")} type="text" autoComplete="organization" maxLength={160} className={`${control} ${t.control} ${border("place")}`} />
          </Field>
          <Field htmlFor={f.a11y("town").id} label="Town or city" error={f.errors.town} tone="navy">
            <input {...f.a11y("town")} type="text" autoComplete="address-level2" maxLength={80} className={`${control} ${t.control} ${border("town")}`} />
          </Field>
          <Field htmlFor={f.a11y("state").id} label="State" error={f.errors.state} tone="navy">
            <select {...f.a11y("state")} defaultValue="" className={`${control} ${t.control} ${border("state")}`}>
              <option value="" disabled>Choose a state</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field htmlFor={f.a11y("name").id} label="Your name" error={f.errors.name} tone="navy">
            <input {...f.a11y("name")} type="text" autoComplete="name" maxLength={120} className={`${control} ${t.control} ${border("name")}`} />
          </Field>
          <Field htmlFor={f.a11y("role").id} label="Your role" error={f.errors.role} tone="navy">
            <input {...f.a11y("role")} type="text" autoComplete="organization-title" maxLength={80} placeholder={copy.rolePlaceholder} className={`${control} ${t.control} ${border("role")}`} />
          </Field>
          <Field htmlFor={f.a11y("contact").id} label="Email or WhatsApp number" error={f.errors.contact} tone="navy" className="md:col-span-2">
            <input {...f.a11y("contact")} type="text" autoComplete="email" className={`${control} ${t.control} ${border("contact")}`} />
          </Field>
          <Field htmlFor={f.a11y("message").id} label="Anything we should know?" error={f.errors.message} tone="navy" className="md:col-span-2">
            <textarea {...f.a11y("message")} rows={3} maxLength={1000} placeholder={copy.messagePlaceholder} className={`${control} ${t.control} ${border("message")} min-h-[112px] resize-y`} />
          </Field>
          {kind === "school" && (
            <p className="m-0 text-sm text-on-dark-2 md:col-span-2">We only ask for the details of school staff, never of pupils.</p>
          )}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="flex items-start gap-3 text-sm leading-normal text-on-dark-2">
              <input {...f.a11y("consent")} type="checkbox" className="mt-0.5 size-5 shrink-0 accent-gold" />
              <span>
                I agree that House of Evulv may contact me about this request, as set out in the{" "}
                <a href="/privacy" className="font-semibold text-ivory underline">privacy notice</a> (NDPA 2023).
              </span>
            </label>
            {f.errors.consent && <p id={`${f.a11y("consent").id}-error`} className={`m-0 text-[13px] font-semibold ${t.error}`}>{f.errors.consent}</p>}
          </div>
          {f.state.status === "error" && f.state.message && (
            <p role="alert" className="m-0 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-ivory md:col-span-2">{f.state.message}</p>
          )}
          <div className="flex md:col-span-2 md:justify-end">
            <button type="submit" disabled={f.pending} className={`btn min-h-[52px] w-full px-7 font-bold md:w-auto ${t.button} disabled:opacity-60`}>
              {f.pending ? "Sending…" : copy.submit}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
