import { Logo, type LogoName } from "@/components/Logo";

// Each commitment has its own element of the emblem (brand manual, section 02)
const commitments: { title: string; element: string; mark: LogoName; body: string; art: string }[] = [
  {
    title: "Peace",
    element: "The dove",
    mark: "dove",
    body: "Conditions where people and communities live with dignity and understand one another.",
    art: "w-[52%]",
  },
  {
    title: "Healing",
    element: "The lotus and water",
    mark: "lotus",
    body: "Helping people recover identity, hope and capacity after hard experiences.",
    art: "w-[52%]",
  },
  {
    title: "Evolution",
    element: "The tree of life",
    mark: "tree",
    body: "Helping people and institutions grow in how they think, lead and contribute.",
    art: "w-[34%]",
  },
];

export function Commitments() {
  return (
    <section
      id="commitments"
      className="flex scroll-mt-4 flex-col gap-6 px-2 pb-8 md:gap-10 md:px-6 md:pt-10 md:pb-16 lg:px-12"
    >
      <div className="mx-2 flex flex-col gap-4 md:mx-0 md:flex-row md:items-end md:justify-between md:px-4">
        <h2 className="t-h2-48 m-0 max-w-[640px]">Three commitments decide what we take on.</h2>
        <p className="m-0 max-w-[360px] text-base leading-[1.55] text-muted md:text-[17px]">
          Every programme has to serve at least one of them, and we report against it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 lg:gap-6">
        {commitments.map((c) => (
          <article key={c.title} className="flex flex-col gap-5">
            <div className="flex aspect-[5/4] items-center justify-center rounded-[20px] bg-espresso md:aspect-square md:rounded-3xl">
              <Logo name={c.mark} className={`h-auto ${c.art}`} />
            </div>
            <div className="flex flex-col gap-2.5 px-2 md:px-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="t-tile-36 m-0 text-bronze">{c.title}</h3>
                <span className="t-eyebrow text-muted">{c.element}</span>
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-body md:text-base">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
