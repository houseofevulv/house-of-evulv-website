import { categories } from "@/lib/content";

export function Categories() {
  return (
    <section id="categories" className="flex scroll-mt-4 flex-col gap-5 px-4 py-10 md:gap-10 md:p-12 lg:p-16 lg:pb-[136px]">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2 className="t-h2-56 m-0">Honour categories</h2>
        {/* TODO(client): categories are a draft; confirm the final list */}
        <p className="m-0 max-w-[360px] text-sm leading-[1.55] text-muted md:text-[15px]">
          Draft list for the first edition. Final categories are confirmed before shortlisting begins.
        </p>
      </div>
      <ul className="m-0 list-none border-t border-rule-2 p-0">
        {categories.map((c) => (
          <li
            key={c.title}
            className="flex flex-col gap-1.5 border-b border-rule-2 py-[18px] transition-colors md:grid md:grid-cols-12 md:items-center md:gap-x-6 md:rounded-xl md:px-4 md:py-[26px] md:hover:bg-row-hover"
          >
            <h3 className="t-category m-0 md:col-span-5">{c.title}</h3>
            <p className="m-0 text-[15px] leading-normal text-body md:col-span-5 md:text-[17px]">{c.body}</p>
            <p className="m-0 text-[13px] font-semibold text-muted md:col-span-2 md:text-right md:text-sm">{c.eligible}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
