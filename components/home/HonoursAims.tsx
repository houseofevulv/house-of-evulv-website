import { ShieldTile } from "@/components/ShieldTile";

const pillars = [
  { title: "Recognise", body: "Distinguished service, sacrifice and moral courage." },
  { title: "Convene", body: "Influential voices across sectors and generations." },
  { title: "Amplify", body: "Stories that restore faith in leadership and humanity." },
  { title: "Advance", body: "Partnerships that translate honour into social impact." },
];

/**
 * What the honours do, in its own section right under the Sentinels band: four tiles of equal weight, each shaped like
 * the shield at the centre of the seal, navy lit from the top in a gold frame. Parallel aims, so no numbering.
 */
export function HonoursAims() {
  return (
    <section className="flex justify-center px-4 py-12 md:px-12 md:py-20 lg:py-24">
      <ul className="m-0 grid w-full max-w-[480px] list-none grid-cols-2 gap-x-3 gap-y-4 p-0 max-[359px]:max-w-[220px] max-[359px]:grid-cols-1 sm:gap-x-6 sm:gap-y-6 lg:max-w-[1000px] lg:grid-cols-4">
        {pillars.map((p, i) => (
          <li key={p.title} className="reveal">
            <ShieldTile id={`pillar-${i}`}>
              <h3 className="t-display m-0 text-lg leading-tight text-gold sm:text-xl lg:text-2xl">{p.title}</h3>
              <p className="m-0 pt-1.5 text-[13px] leading-[1.45] text-on-dark sm:pt-2 sm:text-[15px] sm:leading-normal">
                {p.body}
              </p>
            </ShieldTile>
          </li>
        ))}
      </ul>
    </section>
  );
}
