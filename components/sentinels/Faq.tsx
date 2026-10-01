import Link from "next/link";
import { contact, event, faq, nominations, steps } from "@/lib/content";
import { weekdayDayMonth } from "@/lib/dates";

/** Fills the {tokens} in FAQ answers from the content file, so dates are never typed twice */
function fill(text: string) {
  const announcement = steps.find((s) => s.id === "announcement");
  const tokens: Record<string, string> = {
    opens: weekdayDayMonth(nominations.opens),
    closes: weekdayDayMonth(nominations.closes),
    announcement: announcement ? weekdayDayMonth(announcement.start) : weekdayDayMonth(nominations.outcomeBy),
    ceremony: event.ceremonyDateDisplay,
    email: contact.email,
  };
  return text.replace(/\{(\w+)\}/g, (m, k: string) => tokens[k] ?? m);
}

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="flex scroll-mt-4 flex-col gap-6 px-4 py-10 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:p-12 lg:p-16"
    >
      <div className="flex flex-col gap-4 md:col-span-4 lg:col-span-4">
        <h2 id="faq-heading" className="t-h2-56 m-0">
          Questions
        </h2>
        <p className="m-0 max-w-[340px] text-[15px] leading-[1.55] text-muted md:text-base">
          Can&apos;t find your answer? Email{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold text-espresso underline">
            {contact.email}
          </a>{" "}
          or call{" "}
          <a href={contact.phoneHref} className="font-semibold whitespace-nowrap text-espresso underline">
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>

      {/* TODO(client): items with confirmed=false in content/site-content.json (faq) are unverified */}
      <div className="border-t border-rule-2 md:col-span-8 lg:col-span-7 lg:col-start-6">
        {(nominations.public ? faq.publicItems : faq.items).map((item) => (
          <details key={item.q} className="group border-b border-rule-2">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold text-ink md:py-5 md:text-xl [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden="true"
                className="relative size-5 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-5 before:-translate-y-1/2 before:bg-espresso after:absolute after:top-0 after:left-1/2 after:h-5 after:w-0.5 after:-translate-x-1/2 after:bg-espresso after:transition-transform after:duration-200 group-open:after:scale-y-0"
              />
            </summary>
            <div className="flex flex-col gap-3 pr-10 pb-5 text-base leading-[1.6] text-body md:text-[17px]">
              <p className="m-0">{fill(item.a)}</p>
              {item.links && (
                <p className="m-0 flex flex-wrap gap-x-5">
                  {item.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="lnk inline-flex min-h-11 items-center font-semibold text-espresso underline md:min-h-0"
                    >
                      {l.label}
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
