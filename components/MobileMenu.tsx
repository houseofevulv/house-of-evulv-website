"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Phase } from "@/lib/dates";
import { Logo } from "./Logo";
import { StatusDot } from "./StatusDot";

type NavLink = { href: string; label: string };

type Props = {
  groups: { title: string; links: NavLink[] }[];
  status: string;
  phase: Phase;
  /** Main call to action at the foot of the menu, or null for none */
  action: { href: string; label: string } | null;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  /** Background of the trigger; slightly stronger over the home photo */
  triggerTone?: "photo" | "panel";
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ groups, status, phase, action, email, phoneDisplay, phoneHref, triggerTone = "panel" }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) triggerRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    // The menu is for small screens; close it if the viewport grows past the breakpoint.
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const lastGroup = groups.length - 1;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`flex size-11 items-center justify-center rounded-xl text-ivory nav:hidden ${
          triggerTone === "photo" ? "bg-ivory/16" : "bg-ivory/12"
        }`}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 9h16M4 15h16" />
        </svg>
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="on-dark fixed inset-0 z-50 flex overflow-y-auto overscroll-contain bg-ivory"
          style={{
            paddingTop: "calc(8px + env(safe-area-inset-top))",
            paddingRight: "calc(8px + env(safe-area-inset-right))",
            paddingBottom: "calc(8px + env(safe-area-inset-bottom))",
            paddingLeft: "calc(8px + env(safe-area-inset-left))",
          }}
        >
          <div className="flex min-h-full flex-1 flex-col rounded-[22px] bg-espresso text-ivory">
            <div className="flex h-[92px] shrink-0 items-center justify-between pr-3 pl-4">
              <Link href="/" onClick={close} className="-m-1 p-1">
                <Logo name="houseHorizontal" eager className="h-auto w-[200px]" />
              </Link>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="flex size-11 items-center justify-center rounded-xl bg-ivory/12 text-ivory"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Main" className="flex flex-col px-5 py-6">
              {groups.map((g, gi) => (
                <div key={g.title}>
                  <h2 className="t-eyebrow pt-5 pb-2 text-gold">{g.title}</h2>
                  <ul className="m-0 list-none p-0">
                    {g.links.map((l, li) => (
                      <li
                        key={l.href}
                        className={`border-t border-rule-dark ${gi === lastGroup && li === g.links.length - 1 ? "border-b" : ""}`}
                      >
                        <Link
                          href={l.href}
                          onClick={close}
                          className="flex min-h-15 items-center text-[28px] font-bold text-ivory no-underline"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3.5 p-5">
              <p className="m-0 flex items-center gap-2 text-sm text-on-dark-2">
                <StatusDot phase={phase} />
                {status}
              </p>
              {action && (
                <Link href={action.href} onClick={close} className="btn min-h-12 bg-gold px-5 py-[15px] font-bold text-black">
                  {action.label}
                </Link>
              )}
              <div className="flex flex-col gap-1.5 text-sm">
                <a href={`mailto:${email}`} className="inline-flex min-h-11 items-center self-start text-ivory underline">
                  {email}
                </a>
                <a href={phoneHref} className="inline-flex min-h-11 items-center self-start text-ivory underline">
                  {phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
