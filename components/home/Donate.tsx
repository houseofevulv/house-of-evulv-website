import Link from "next/link";
import { BankDetails } from "@/components/BankDetails";
import { Logo } from "@/components/Logo";
import { contact, donate } from "@/lib/content";
import { GIFT_USES, giveLink } from "@/lib/giving";

/*
  Giving options come from content/site-content.json (donate): a payment page link, bank accounts, or neither.
  With a payment page the gold button opens it; with only bank accounts, the accounts take its place.
*/
export function Donate() {
  const give = giveLink();
  const { banks, paymentProvider, paymentUrl } = donate;
  // With bank details and no payment page, the accounts are the way to give; the gold button would only repeat them
  const showGive = Boolean(paymentUrl) || banks.length === 0;

  return (
    <section
      id="donate"
      className="on-dark grid scroll-mt-4 grid-cols-1 gap-6 rounded-[22px] bg-espresso p-3 pb-7 text-ivory md:gap-10 md:rounded-[28px] md:p-12 lg:grid-cols-12 lg:gap-x-6 lg:p-16"
    >
      {/* A single knight, facing right towards the text: the clean cut-out straight on the espresso, at 85% so it
          settles into the panel, its plinth fading out. (The manual shows the knights as a pair; this single use is at
          the owner's request.) */}
      <div className="flex items-end justify-center pt-4 lg:col-span-5 lg:pt-0">
        <Logo
          name="knightLeft"
          alt=""
          className="h-[300px] w-auto opacity-85 [mask-image:linear-gradient(to_bottom,#000_82%,transparent)] md:h-[420px] lg:h-[min(560px,100%)] xl:h-[600px]"
        />
      </div>

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

        <BankDetails />

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3">
            {showGive && (
              <a
                href={give.href}
                {...(give.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="btn min-h-12 bg-gold px-7 py-4 text-base font-bold text-black"
              >
                {paymentUrl ? "Give now" : "Give to the work"}
                {give.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            )}
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
              : `Questions about giving, or another way to help? Call ${contact.phoneDisplay}.`}
          </p>
        </div>

      </div>
    </section>
  );
}
