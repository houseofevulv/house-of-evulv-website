import { ShieldTile } from "@/components/ShieldTile";

// Each aim with a line icon for the foot of its shield: a star of honour, people gathered, a voice carried, a rise
const pillars = [
  {
    title: "Recognise",
    body: "Distinguished service, sacrifice and moral courage.",
    icon: <path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z" />,
  },
  {
    title: "Convene",
    body: "Influential voices across sectors and generations.",
    icon: (
      <>
        <circle cx="12" cy="7.5" r="2.6" />
        <circle cx="5" cy="9.5" r="2" />
        <circle cx="19" cy="9.5" r="2" />
        <path d="M7.5 20v-1.2a4.5 4.5 0 0 1 9 0V20M1.8 19.5v-.8a3.4 3.4 0 0 1 4.6-3.2M22.2 19.5v-.8a3.4 3.4 0 0 0-4.6-3.2" />
      </>
    ),
  },
  {
    title: "Amplify",
    body: "Stories that restore faith in leadership and humanity.",
    icon: <path d="M3 10v4h3.5L13 18V6l-6.5 4zM16.5 9.5a3.5 3.5 0 0 1 0 5M19.2 7a7 7 0 0 1 0 10" />,
  },
  {
    title: "Advance",
    body: "Partnerships that translate honour into social impact.",
    icon: <path d="M3 17.5l6-6 4 4 8-8M15 7.5h6v6" />,
  },
];

/**
 * What the honours do, in its own section right under the Sentinels band: four tiles of equal weight, each shaped like
 * the shield at the centre of the seal, navy lit from the top in a gold frame, with a faint icon in its point.
 * Parallel aims, so no numbering.
 */
export function HonoursAims() {
  return (
    <section className="flex justify-center px-4 py-12 md:px-12 md:py-20 lg:py-24">
      <ul className="m-0 grid w-full max-w-[480px] list-none grid-cols-2 gap-x-3 gap-y-4 p-0 max-[359px]:max-w-[220px] max-[359px]:grid-cols-1 sm:gap-x-6 sm:gap-y-6 lg:max-w-[1000px] lg:grid-cols-4">
        {pillars.map((p, i) => (
          <li key={p.title} className="reveal">
            <ShieldTile id={`pillar-${i}`} icon={p.icon}>
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
