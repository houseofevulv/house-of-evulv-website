import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { contact, donate } from "@/lib/content";

/*
  Giving options come from content/site-content.json (donate). A payment link shows "Give online", bank details
  show with a copy button, and with neither the section invites people to get in touch.
*/
export function Donate() {
  const { paymentUrl, paymentProvider, bank } = donate;
  const hasOnline = Boolean(paymentUrl);

  return (
    <section
      id="donate"
      className="grid scroll-mt-4 grid-cols-1 gap-6 rounded-[22px] bg-sage px-5 py-7 md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:gap-x-6 lg:p-16"
    >
      <div className="flex flex-col gap-4 md:gap-6 lg:col-span-6">
        <p className="m-0 text-sm font-semibold text-forest md:text-[15px]">Support the work</p>
        <h2 className="t-h2-48 m-0 max-w-[620px] text-forest">Help us honour and support the people who keep the peace.</h2>
        {/* TODO(client): confirm how gifts are used (donate.useConfirmed = false) */}
        <p className="m-0 max-w-[520px] text-base leading-[1.6] text-sage-text md:text-lg">
          Gifts fund the Sentinels of Peace Grand Honours and our programmes in peace, healing and human development:
          finding and verifying nominees, documenting their work, and connecting them with people who can support it.
        </p>
      </div>

      <div className="on-light flex flex-col gap-5 rounded-[20px] bg-white p-[22px] md:rounded-3xl md:p-8 lg:col-span-5 lg:col-start-8 lg:self-end">
        {hasOnline && (
          <div className="flex flex-col gap-3">
            <a
              href={paymentUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn min-h-12 bg-forest px-6 py-4 font-bold text-bone"
            >
              Give online
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {paymentProvider && (
              <p className="m-0 text-center text-[13px] text-muted">Secure payment by {paymentProvider}</p>
            )}
          </div>
        )}

        {bank && (
          <div className="flex flex-col gap-3">
            <h3 className="m-0 text-[15px] font-bold text-ink">{hasOnline ? "Or give by bank transfer" : "Give by bank transfer"}</h3>
            <dl className="m-0 flex flex-col text-[15px]">
              <div className="flex justify-between gap-4 border-t border-rule-2 py-3">
                <dt className="text-muted">Bank</dt>
                <dd className="m-0 text-right font-semibold">{bank.bankName}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-rule-2 py-3">
                <dt className="text-muted">Account name</dt>
                <dd className="m-0 text-right font-semibold">{bank.accountName}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-y border-rule-2 py-2">
                <dt className="text-muted">Account number</dt>
                <dd className="m-0 flex items-center gap-3">
                  <span className="text-lg font-bold tracking-wide tabular-nums">{bank.accountNumber}</span>
                  <CopyButton value={bank.accountNumber} label="account number" />
                </dd>
              </div>
            </dl>
          </div>
        )}

        {!hasOnline && !bank && (
          <div className="flex flex-col gap-4">
            <h3 className="m-0 text-xl font-bold tracking-[-0.02em] text-ink">Give to House of Evulv</h3>
            <p className="m-0 text-[15px] leading-[1.6] text-body">
              Online giving is being set up. To give now, or to talk about a larger or recurring gift, get in touch and we
              will send you the details.
            </p>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent("Giving to House of Evulv")}`}
              className="btn min-h-12 bg-forest px-6 py-4 font-bold text-bone"
            >
              Talk to us about giving
            </a>
            <p className="m-0 text-center text-sm text-muted">
              Or call{" "}
              <a href={contact.phoneHref} className="lnk inline-flex min-h-11 items-center font-semibold text-forest underline md:min-h-0">
                {contact.phoneDisplay}
              </a>
            </p>
          </div>
        )}

        <p className="m-0 border-t border-rule-2 pt-4 text-sm leading-normal text-muted">
          Supporting as an organisation?{" "}
          <Link href="/sentinels-of-peace#partner" className="font-semibold text-forest underline">
            See partnership tiers
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
