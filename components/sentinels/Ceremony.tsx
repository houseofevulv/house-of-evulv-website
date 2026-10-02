import { event } from "@/lib/content";

export function Ceremony() {
  return (
    // A square-edged band running to both screen edges, to break the run of rounded panels
    <section className="on-dark -mx-2 flex flex-col items-center bg-espresso px-5 py-16 text-center text-ivory shadow-[0_0_0_100vmax_var(--color-espresso)] [clip-path:inset(0_-100vmax)] md:-mx-4 md:px-12 md:py-28 lg:py-36">
      <h2 className="t-eyebrow m-0 text-gold">The ceremony</h2>
      {/* The venue stays off the site until the client announces it */}
      <p className="t-feature reveal m-0 max-w-[900px] pt-4 !leading-[1.1] md:pt-6">
        {event.ceremonyDateDisplay}, Lagos.
      </p>
      <p className="m-0 max-w-[520px] pt-6 text-[15px] leading-[1.6] text-on-dark md:pt-8 md:text-[17px]">
        Attendance is by invitation. Partners and honourees receive places for their guests.
      </p>
    </section>
  );
}
