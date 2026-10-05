import Link from "next/link";
import { BankDetails } from "@/components/BankDetails";
import { contact, donate } from "@/lib/content";
import { GIFT_USES } from "@/lib/giving";
import { SupportForm } from "./SupportForm";

/**
 * Sits where the nomination form was. For the 2026 edition honourees are selected, so the page's main action is
 * supporting the programme: a pledge form, plus direct online giving when the client has a payment page.
 */
export function SupportPledge() {
  const { paymentUrl, paymentProvider } = donate;
  return (
    <section
      id="support"
      className="on-dark grid scroll-mt-4 grid-cols-1 gap-5 rounded-[22px] bg-espresso px-3 pt-7 pb-3 text-ivory md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-12 lg:p-16"
    >
      <div className="flex flex-col gap-3.5 px-2 md:gap-6 md:px-0 lg:col-span-5">
        <p className="t-eyebrow m-0 text-gold">Support the programme</p>
        <h2 className="t-nominate m-0">Stand with the people who keep the peace.</h2>
        <p className="m-0 max-w-[440px] text-base leading-[1.55] text-on-dark-2 md:text-lg">
          The Grand Honours are more than one night on stage. Tell us how you would like to help, and we will be in touch
          to arrange it. It takes about two minutes.
        </p>
        {paymentUrl && (
          <div className="flex flex-col gap-2 pt-1">
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn min-h-12 self-start bg-gold px-6 py-4 font-bold text-black"
            >
              Give online now
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {paymentProvider && <span className="text-[13px] text-on-dark-3">Secure payment by {paymentProvider}</span>}
          </div>
        )}
        <BankDetails className="pt-3" />
      </div>

      <div className="on-light rounded-[20px] bg-ivory px-[18px] py-[22px] text-ink md:rounded-[22px] md:px-9 md:pt-9 md:pb-8 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
        <SupportForm paymentUrl={paymentUrl} />
      </div>

      <div className="flex flex-col px-2 pt-1 pb-3 md:p-0 lg:col-span-5 lg:self-end">
        {/* TODO(client): confirm how gifts are used (donate.useConfirmed = false) */}
        <h3 className="t-eyebrow m-0 pb-3 text-on-dark-3 md:pb-3.5">Where your support goes</h3>
        <ol className="m-0 list-none p-0">
          {GIFT_USES.map((u, i) => (
            <li
              key={u.title}
              className={`grid grid-cols-[32px_1fr] gap-3 border-t border-rule-dark py-3.5 text-[15px] leading-normal md:py-4 ${
                i === GIFT_USES.length - 1 ? "border-b" : ""
              }`}
            >
              <b className="text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</b>
              <span className="text-on-dark-2">
                <b className="text-ivory">{u.title}.</b> {u.body}
              </span>
            </li>
          ))}
        </ol>
        <p className="m-0 pt-4 text-sm text-on-dark-3">
          Supporting as an organisation? See the{" "}
          <Link href="#partner" className="font-semibold text-ivory underline">
            partnership tiers
          </Link>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-ivory underline">
            {contact.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
