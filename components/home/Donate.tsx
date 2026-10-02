import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { Photo } from "@/components/Photo";
import { contact, donate } from "@/lib/content";
import { GIFT_USES, giveLink } from "@/lib/giving";

/*
  Giving options come from content/site-content.json (donate): a payment page link, bank details, or neither.
  The main button always works: it opens the payment page when there is one, otherwise an email to the House.
*/
export function Donate() {
  const give = giveLink();
  const { bank, paymentProvider, paymentUrl } = donate;

  return (
    <section
      id="donate"
      className="on-dark grid scroll-mt-4 grid-cols-1 gap-6 rounded-[22px] bg-espresso p-3 pb-7 text-ivory md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:gap-x-6 lg:p-16"
    >
      <Photo
        src="/images/medal-pinning.jpg"
        alt="A medal being pinned to a decorated uniform"
        sizes="(min-width: 1024px) 40vw, 100vw"
        position="46% center"
        mobilePosition="center 40%"
        tone="dark"
        className="reveal-photo photo-hover h-[300px] w-full rounded-2xl md:h-[420px] md:rounded-[20px] lg:col-span-5 lg:h-full lg:min-h-[560px]"
      />

      <div className="flex flex-col gap-7 px-2 md:px-0 lg:col-span-6 lg:col-start-7 lg:justify-center">
        <div className="flex flex-col gap-4">
          <h2 className="t-h2-48 reveal m-0">Help us honour and support the people who keep the peace.</h2>
          <p className="m-0 text-base leading-[1.6] text-on-dark-2 md:text-lg">
            Most of the people who hold communities together never receive recognition or backing. Your gift changes that.
          </p>
        </div>

        <div>
          <h3 className="t-eyebrow m-0 pb-3 text-on-dark-3">Your gift helps us</h3>
          <ol className="m-0 list-none p-0">
            {GIFT_USES.map((u, i) => (
              <li
                key={u.title}
                className={`grid grid-cols-[32px_1fr] gap-3 border-t border-rule-dark py-4 ${i === GIFT_USES.length - 1 ? "border-b" : ""}`}
              >
                <span className="text-[15px] font-bold text-gold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-bold">{u.title}</span>
                  <span className="text-[15px] leading-normal text-on-dark-2">{u.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
            <a
              href={give.href}
              {...(give.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="btn min-h-12 bg-gold px-7 py-4 text-base font-bold text-black"
            >
              {paymentUrl ? "Give now" : "Give to the work"}
              {give.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
            <Link
              href="/sentinels-of-peace#partner"
              className="btn min-h-12 border border-ivory px-[23px] py-[15px] font-semibold text-ivory"
            >
              Give as an organisation
            </Link>
          </div>
          <p className="m-0 text-[13px] leading-normal text-on-dark-3">
            {paymentUrl
              ? `Secure payment${paymentProvider ? ` by ${paymentProvider}` : ""}. Questions about giving: ${contact.email}.`
              : `Tell us how you would like to help and we will be in touch. Or call ${contact.phoneDisplay}.`}
          </p>
        </div>

        {bank && (
          <div className="on-light flex flex-col gap-3 rounded-2xl bg-ivory p-5 text-ink">
            <h3 className="t-eyebrow m-0 text-bronze">Give by bank transfer</h3>
            <dl className="m-0 flex flex-col text-[15px]">
              <div className="flex justify-between gap-4 border-t border-rule-2 py-2.5">
                <dt className="text-muted">Bank</dt>
                <dd className="m-0 text-right font-semibold">{bank.bankName}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-rule-2 py-2.5">
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
      </div>
    </section>
  );
}
