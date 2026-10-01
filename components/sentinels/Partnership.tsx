import { contact, partnership } from "@/lib/content";

const { tiers, rows, briefMailto } = partnership;

export function Partnership() {
  return (
    <section
      id="partner"
      className="flex scroll-mt-4 flex-col gap-4 px-2 py-10 md:gap-10 md:px-12 md:pt-20 md:pb-12 lg:px-16 lg:pt-[88px] lg:pb-16"
    >
      <div className="flex flex-col gap-3.5 px-2 md:flex-row md:items-end md:justify-between md:gap-10 md:px-0">
        <h2 className="t-h2-56 m-0 max-w-[640px] !leading-[1.04]">Partner with the inaugural edition</h2>
        <p className="m-0 max-w-[400px] text-[15px] leading-[1.55] text-body md:text-[17px]">
          Partners fund the research, honouree documentation and the ceremony. Terms are agreed with each partner in advance.
        </p>
      </div>

      {/* Mobile: one card per tier */}
      <div className="flex flex-col gap-4 md:hidden">
        {tiers.map((t, ti) => (
          <article
            key={t.name}
            className={`rounded-[20px] border p-[22px] ${
              t.highlight ? "on-dark border-espresso bg-espresso text-ivory" : "border-card-border bg-white"
            }`}
          >
            <h3 className="m-0 text-2xl font-bold">{t.name}</h3>
            <p className={`m-0 pt-0.5 text-sm ${t.highlight ? "text-gold" : "text-muted"}`}>{t.limit}</p>
            <dl className="mt-4 mb-0">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt
                    className={`border-t pt-3 text-[13px] font-bold ${
                      t.highlight ? "border-rule-dark text-on-dark-3" : "border-rule-2 text-muted"
                    }`}
                  >
                    {r.label}
                  </dt>
                  <dd className="mx-0 mt-1 mb-3 text-[15px] leading-normal">{r.cells[ti]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      {/* 768px up: comparison table; scrolls sideways inside its card below 1024px */}
      <div className="hidden overflow-hidden rounded-3xl border border-card-border bg-white md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] table-fixed border-collapse text-left">
            <caption className="sr-only">Partnership tiers compared</caption>
            <colgroup>
              <col className="w-[220px]" />
              {tiers.map((t) => (
                <col key={t.name} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-table-rule">
                <td className="sticky left-0 z-10 bg-white" />
                {tiers.map((t) => (
                  <th
                    key={t.name}
                    scope="col"
                    className={`px-6 py-7 align-top font-normal ${t.highlight ? "on-dark bg-espresso text-ivory" : "bg-white text-ink"}`}
                  >
                    <span className="t-display block text-xl">{t.name}</span>
                    <span className={`block pt-1.5 text-sm ${t.highlight ? "text-gold" : "text-muted"}`}>{t.limit}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-table-rule last:border-b-0">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white p-6 align-top text-[15px] font-bold text-muted lg:h-[132px]"
                  >
                    {r.label}
                  </th>
                  {r.cells.map((c, i) => (
                    <td key={i} className="border-l border-table-rule-2 p-6 align-top text-base leading-normal text-ink">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-2 pt-1 md:flex-row md:items-center md:gap-5 md:p-0">
        <a href={briefMailto} className="btn min-h-12 bg-espresso px-5 py-[15px] font-bold text-ivory md:px-6 md:py-4">
          Request the partnership brief
        </a>
        <span className="text-center text-[15px] text-body md:text-left md:text-base">
          Or call{" "}
          <a href={contact.phoneHref} className="lnk inline-flex min-h-11 items-center font-bold text-espresso underline md:min-h-0">
            {contact.phoneDisplay}
          </a>
        </span>
      </div>
    </section>
  );
}
