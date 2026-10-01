import Link from "next/link";
import { Photo } from "@/components/Photo";
import { donate } from "@/lib/content";
import { GIFT_USES } from "@/lib/giving";

/** Closing call on the Sentinels page for individual supporters; organisations are pointed to partnership */
export function Support() {
  // With a payment page, give directly; otherwise go to the home section, which holds bank details and contacts.
  const give = donate.paymentUrl ? { href: donate.paymentUrl, external: true } : { href: "/#donate", external: false };

  return (
    <Photo
      as="section"
      src="/images/officer-helipad.jpg"
      alt="A uniformed officer standing watch beside a helicopter"
      sizes="(min-width: 1440px) 1408px, 100vw"
      position="center 45%"
      mobilePosition="55% center"
      tone="dark"
      className="on-dark flex min-h-[620px] items-end rounded-[22px] md:min-h-[560px] md:rounded-[28px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,7,.6)_0%,rgba(14,10,7,.78)_40%,rgba(14,10,7,.92)_75%)] md:bg-[linear-gradient(90deg,rgba(14,10,7,.9)_0%,rgba(14,10,7,.75)_45%,rgba(14,10,7,.1)_80%)]"
      />
      <div
        id="give"
        className="relative flex w-full scroll-mt-4 flex-col gap-6 px-5 py-7 text-ivory md:max-w-[640px] md:px-12 md:py-12 lg:px-16 lg:py-14"
      >
        <p className="t-eyebrow m-0 text-gold">Support the programme</p>
        <h2 className="t-h2-56 m-0">Stand with the people who keep the peace.</h2>
        <p className="m-0 text-base leading-[1.6] text-on-dark md:text-lg">
          The Grand Honours are more than one night on stage. Every gift goes into the work around it:
        </p>
        {/* TODO(client): confirm how gifts are used (donate.useConfirmed = false) */}
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] leading-normal text-on-dark md:text-base">
          {GIFT_USES.map((u) => (
            <li key={u.title} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-gold" />
              <span>
                <b className="text-ivory">{u.title}.</b> {u.body}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2.5 pt-1 md:flex-row md:gap-3">
          <Link
            href={give.href}
            {...(give.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn min-h-12 bg-gold px-7 py-4 text-base font-bold text-black"
          >
            Give to the programme
            {give.external && <span className="sr-only"> (opens in a new tab)</span>}
          </Link>
          <Link
            href="#partner"
            className="btn min-h-12 border border-ivory bg-black/20 px-[23px] py-[15px] font-semibold text-ivory backdrop-blur-sm"
          >
            Partner as an organisation
          </Link>
        </div>
      </div>
    </Photo>
  );
}
