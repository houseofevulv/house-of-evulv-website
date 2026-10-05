import { CopyButton } from "@/components/CopyButton";
import { contact, donate } from "@/lib/content";

/**
 * The House's accounts for gifts by transfer, on a dark panel: the account name once (it is the same for every
 * account), then a card per bank with the number large enough to read off a phone and a button to copy it.
 */
export function BankDetails({ className = "" }: { className?: string }) {
  const { banks } = donate;
  if (banks.length === 0) return null;
  const names = [...new Set(banks.map((b) => b.accountName))];

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-1.5">
        <h3 className="t-eyebrow m-0 text-gold">Give by bank transfer</h3>
        {names.length === 1 && (
          <p className="m-0 text-[15px] text-on-dark-2">
            Account name <span className="font-semibold text-ivory">{names[0]}</span>
          </p>
        )}
      </div>
      <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
        {banks.map((b) => (
          <li
            key={b.accountNumber}
            className="flex flex-col gap-3 rounded-2xl border border-gold/25 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgb(208_169_79/0.18)] md:p-5"
          >
            <span className="text-[13px] font-semibold tracking-[0.08em] text-on-dark-3 uppercase">{b.bankName}</span>
            <span className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-2xl font-bold tracking-[0.06em] text-ivory tabular-nums">{b.accountNumber}</span>
              <CopyButton value={b.accountNumber} label={`${b.bankName} account number`} tone="dark" />
            </span>
            {names.length > 1 && <span className="text-[13px] text-on-dark-2">{b.accountName}</span>}
          </li>
        ))}
      </ul>
      <p className="m-0 text-[13px] leading-normal text-on-dark-3">
        After you give, email {contact.email} with your name and the amount so we can thank you.
      </p>
    </div>
  );
}
