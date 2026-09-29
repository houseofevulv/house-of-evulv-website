import Link from "next/link";
import type { ReactNode } from "react";
import { contact, partnership, site } from "@/lib/content";
import { Logo } from "./Logo";

// Mobile: every footer link is a 44px tap target. Desktop: plain text links.
const linkCls = "lnk inline-flex min-h-11 items-center self-start text-muted no-underline md:min-h-0";
const headCls = "pb-1 text-[13px] font-bold text-ink md:pb-0";
const colCls = "flex flex-col md:gap-3";

function Col({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`${colCls} ${className}`}>
      <h2 className={`m-0 ${headCls}`}>{title}</h2>
      {children}
    </div>
  );
}

export function SiteFooter({ variant }: { variant: "home" | "sentinels" | "page" }) {
  const sop = variant === "sentinels" ? "" : "/sentinels-of-peace";
  const home = variant === "home" ? "" : "/";

  return (
    <footer className="flex flex-col gap-7 px-4 pt-8 pb-6 text-[15px] text-muted md:gap-24 md:px-12 md:pt-14 md:pb-4">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-10">
        {variant !== "sentinels" ? (
          <div className="col-span-2 flex flex-col gap-2.5 md:col-span-12 md:gap-3.5 lg:col-span-4">
            <Logo name="house" className="h-7 self-start md:h-8" />
            <p className="m-0 max-w-[300px] leading-[1.55]">
              Programmes in peace, healing and human development, run from Lagos.
            </p>
          </div>
        ) : (
          <div className="col-span-2 flex flex-col gap-2.5 md:col-span-12 md:gap-3.5 lg:col-span-4">
            <Logo name="sentinels" className="h-10 self-start md:h-11" />
            {/* The brief's "Presented by" block */}
            <div className="flex flex-col gap-2 pt-2 md:pt-3">
              <span className="text-[13px] font-semibold text-muted">Grand Honours presented by</span>
              <Link href="/" className="lnk self-start">
                <Logo name="house" className="h-7" />
              </Link>
            </div>
          </div>
        )}

        {variant !== "sentinels" ? (
          <>
            <Col title="The House" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
              <Link href={`${home}#about`} className={linkCls}>About</Link>
              <Link href={`${home}#commitments`} className={linkCls}>Commitments</Link>
              <Link href="/our-story" className={linkCls}>Our story</Link>
              <Link href={`${home}#donate`} className={linkCls}>Donate</Link>
            </Col>
            <Col title="Sentinels of Peace" className="md:col-span-3 lg:col-span-2">
              <Link href={`${sop}#nominate`} className={linkCls}>Nominate</Link>
              <Link href={`${sop}#categories`} className={linkCls}>Categories</Link>
              <Link href={`${sop}#partner`} className={linkCls}>Partnership</Link>
            </Col>
            <Col title="Office" className="hidden md:col-span-4 md:flex lg:col-span-3">
              {/* TODO(client): street address and RC number, if they want them shown */}
              <span className="leading-normal">{contact.city}</span>
              <span>{contact.hours}</span>
            </Col>
          </>
        ) : (
          <>
            <Col title="This edition" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
              <Link href="#categories" className={linkCls}>Categories</Link>
              <Link href="#selection" className={linkCls}>Selection</Link>
              <Link href="#nominate" className={linkCls}>Nominate</Link>
            </Col>
            <Col title="Partners" className="md:col-span-3 lg:col-span-2">
              <Link href="#partner" className={linkCls}>Partnership tiers</Link>
              <a href={partnership.briefMailto} className={`${linkCls} max-md:hidden`}>Request the brief</a>
              <a href={`mailto:${contact.email}?subject=Press`} className={linkCls}>Press enquiries</a>
            </Col>
            <Col title="Contact" className="col-span-2 md:col-span-4 lg:col-span-3">
              <a href={`mailto:${contact.email}`} className={linkCls}>{contact.email}</a>
              <a href={contact.phoneHref} className={linkCls}>{contact.phoneDisplay}</a>
              <span className="hidden md:inline">{contact.city}</span>
            </Col>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-rule pt-4 text-[13px] md:flex-row md:items-center md:justify-between md:pt-5">
        <span>© {site.copyrightYear} {site.name}</span>
        <div className="flex flex-wrap gap-x-4 md:gap-6">
          <Link href="/privacy" className="lnk inline-flex min-h-11 items-center text-muted underline md:min-h-0">
            Privacy notice (NDPA 2023)
          </Link>
          <Link href="/nomination-terms" className="lnk inline-flex min-h-11 items-center text-muted underline md:min-h-0">
            Nomination terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
