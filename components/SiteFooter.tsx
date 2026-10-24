import Link from "next/link";
import type { ReactNode } from "react";
import { primaryAction } from "@/lib/cta";
import { contact, nominations, partnership, site } from "@/lib/content";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

// Mobile: every footer link is a 44px tap target. Desktop: plain text links.
const linkCls = "lnk inline-flex min-h-11 items-center self-start text-on-dark-2 no-underline md:min-h-0";
const colCls = "flex flex-col md:gap-3";

function Col({ title, className = "", children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={`${colCls} ${className}`}>
      <h2 className="t-eyebrow m-0 pb-1 text-gold md:pb-1">{title}</h2>
      {children}
    </div>
  );
}

/** Espresso panel closing every page, with the logo in its signature gold and silver */
export function SiteFooter({ variant }: { variant: "home" | "sentinels" | "page" | "campaign" }) {
  const sop = variant === "sentinels" ? "" : "/sentinels-of-peace";
  const home = variant === "home" ? "" : "/";
  const action = primaryAction(variant === "sentinels");
  const terms = nominations.public
    ? { href: "/nomination-terms", label: "Nomination terms" }
    : { href: "/selection-terms", label: "Selection terms" };

  return (
    <footer className="on-dark flex flex-col gap-10 rounded-[22px] bg-espresso px-5 pt-10 pb-6 text-[15px] text-on-dark-2 md:gap-16 md:rounded-[28px] md:px-12 md:pt-14 md:pb-6 lg:px-16">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-12 md:gap-y-10">
        {variant !== "sentinels" && variant !== "campaign" ? (
          <div className="col-span-2 flex flex-col gap-5 md:col-span-12 lg:col-span-4">
            <Logo name="houseLogo" className="h-auto w-[168px]" />
            <p className="m-0 max-w-[300px] leading-[1.55]">
              Programmes in peace, healing and human development, run from Lagos.
            </p>
            <SocialLinks links={contact.social} />
          </div>
        ) : (
          <div className="col-span-2 flex flex-col gap-6 md:col-span-12 lg:col-span-4">
            <Logo name="sentinelsHorizontal" className="h-auto w-[240px]" />
            <div className="flex flex-col gap-3">
              <span className="t-eyebrow text-on-dark-3">Grand Honours presented by</span>
              <Link href="/" className="lnk self-start">
                <Logo name="houseHorizontal" className="h-auto w-[200px]" />
              </Link>
            </div>
            <SocialLinks links={contact.social} />
          </div>
        )}

        {variant === "campaign" ? (
          <>
            <Col title="This campaign" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
              <a href="#invite" className={linkCls}>Invite the campaign</a>
              <a href="#nominate" className={linkCls}>Nominate someone</a>
              <Link href="/" className={linkCls}>House of Evulv</Link>
            </Col>
            <Col title="Sentinels of Peace" className="md:col-span-3 lg:col-span-2">
              <Link href="/sentinels-of-peace" className={linkCls}>The Grand Honours</Link>
              <Link href="/sentinels-of-peace#partner" className={linkCls}>Partnership tiers</Link>
              <Link href="/sentinels-of-peace#support" className={linkCls}>Give to the programme</Link>
            </Col>
            <Col title="Contact" className="col-span-2 md:col-span-4 lg:col-span-3">
              <a href={`mailto:${contact.email}`} className={linkCls}>{contact.email}</a>
              <a href={contact.phoneHref} className={linkCls}>{contact.phoneDisplay}</a>
              <span className="pt-2 md:pt-0">{contact.city}</span>
            </Col>
          </>
        ) : variant !== "sentinels" ? (
          <>
            <Col title="The House" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
              <Link href={`${home}#about`} className={linkCls}>About</Link>
              <Link href={`${home}#commitments`} className={linkCls}>Commitments</Link>
              <Link href="/our-story" className={linkCls}>Our story</Link>
              <Link href={`${home}#donate`} className={linkCls}>Donate</Link>
            </Col>
            <Col title="Sentinels of Peace" className="md:col-span-3 lg:col-span-2">
              {action && <Link href={action.href} className={linkCls}>{action.short}</Link>}
              <Link href={`${sop}#categories`} className={linkCls}>Categories</Link>
              <Link href={`${sop}#partner`} className={linkCls}>Partnership</Link>
            </Col>
            <Col title="Office" className="col-span-2 md:col-span-4 lg:col-span-3">
              {/* TODO(client): street address and RC number, if they want them shown */}
              <a href={`mailto:${contact.email}`} className={linkCls}>{contact.email}</a>
              <a href={contact.phoneHref} className={linkCls}>{contact.phoneDisplay}</a>
              <span className="pt-2 leading-normal md:pt-0">{contact.city}</span>
              <span>{contact.hours}</span>
            </Col>
          </>
        ) : (
          <>
            <Col title="This edition" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
              <Link href="#categories" className={linkCls}>Categories</Link>
              <Link href="#selection" className={linkCls}>Selection</Link>
              {nominations.public && action && <Link href={action.href} className={linkCls}>{action.short}</Link>}
              <Link href="#faq" className={linkCls}>Questions</Link>
            </Col>
            <Col title="Partners" className="md:col-span-3 lg:col-span-2">
              <Link href="#partner" className={linkCls}>Partnership tiers</Link>
              <Link href="#support" className={linkCls}>Give to the programme</Link>
              <a href={partnership.briefMailto} className={`${linkCls} max-md:hidden`}>Request the brief</a>
              <a href={`mailto:${contact.email}?subject=Press`} className={linkCls}>Press enquiries</a>
            </Col>
            <Col title="Contact" className="col-span-2 md:col-span-4 lg:col-span-3">
              <a href={`mailto:${contact.email}`} className={linkCls}>{contact.email}</a>
              <a href={contact.phoneHref} className={linkCls}>{contact.phoneDisplay}</a>
              <span className="pt-2 md:pt-0">{contact.city}</span>
            </Col>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-rule-dark pt-4 text-[13px] text-on-dark-3 md:flex-row md:items-center md:justify-between md:pt-5">
        <span>
          © {site.copyrightYear} {site.name}. All rights reserved.
          <br />
          {site.name} is a subsidiary of Evulv Global Ventures, a general merchandise business.
        </span>
        <div className="flex flex-wrap gap-x-4 md:gap-6">
          <Link href="/privacy" className="lnk inline-flex min-h-11 items-center text-on-dark-2 underline md:min-h-0">
            Privacy notice (NDPA 2023)
          </Link>
          <Link href={terms.href} className="lnk inline-flex min-h-11 items-center text-on-dark-2 underline md:min-h-0">
            {terms.label}
          </Link>
        </div>
      </div>
    </footer>
  );
}
