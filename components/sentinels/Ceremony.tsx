import { event } from "@/lib/content";

export function Ceremony() {
  return (
    <section className="on-dark flex flex-col items-center rounded-[22px] bg-espresso px-5 py-14 text-center text-ivory md:rounded-[28px] md:px-12 md:py-24 lg:py-32">
      <h2 className="t-eyebrow m-0 text-gold">The ceremony</h2>
      {/* The venue stays off the site until the client announces it */}
      <p className="t-h2-56 m-0 max-w-[820px] pt-3 !leading-[1.1] md:pt-4">
        {event.ceremonyDateDisplay}, Lagos.
      </p>
      <p className="m-0 max-w-[520px] pt-6 text-[15px] leading-[1.6] text-on-dark md:pt-8 md:text-[17px]">
        Attendance is by invitation. Partners and honourees receive places for their guests.
      </p>
    </section>
  );
}
