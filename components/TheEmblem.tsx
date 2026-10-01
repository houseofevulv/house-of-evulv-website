import { Logo } from "@/components/Logo";

// Meanings as set out in the brand manual, section 02
const elements = [
  { name: "Tree of life", meaning: "Twenty-one leaves in gold and silver, crowning a figure with arms raised." },
  { name: "Helix", meaning: "The trunk of the tree, drawn as a strand of DNA." },
  { name: "Dove", meaning: "Flying in from the left, an olive branch held in its beak." },
  { name: "Lotus and water", meaning: "Rising on the right from two lines of still water." },
  { name: "Open ring", meaning: "A circle left open at the top, where the crown of the tree rises through it." },
];

export function TheEmblem() {
  return (
    <section
      aria-labelledby="emblem-heading"
      className="grid grid-cols-1 items-center gap-8 px-2 pb-10 md:gap-10 md:px-12 md:pb-20 lg:grid-cols-12 lg:gap-x-6"
    >
      <div className="flex aspect-[5/4] items-center justify-center rounded-[20px] bg-espresso md:rounded-3xl lg:col-span-5 lg:aspect-square">
        <Logo name="houseEmblem" className="h-auto w-[58%]" />
      </div>
      <div className="flex flex-col gap-6 px-2 md:px-0 lg:col-span-6 lg:col-start-7">
        <div className="flex flex-col gap-3">
          <p className="t-eyebrow m-0 text-bronze">The emblem</p>
          <h2 id="emblem-heading" className="t-h2-48 m-0">
            Five elements in one circle.
          </h2>
        </div>
        <dl className="m-0 border-t border-rule-2">
          {elements.map((e) => (
            <div key={e.name} className="grid grid-cols-1 gap-1 border-b border-rule-2 py-3.5 md:grid-cols-[180px_1fr] md:gap-6">
              <dt className="text-[15px] font-bold text-ink">{e.name}</dt>
              <dd className="m-0 text-[15px] leading-normal text-body">{e.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
