import { Logo } from "@/components/Logo";
import { event } from "@/lib/content";

/**
 * The ceremony as a commemorative medal: on Sentinel Navy, the date is set inside the Sentinels badge (the ring with
 * the name arched along its top and the star), large and faint, like the face of an invitation. A square-edged band
 * running to both screen edges, to break the run of rounded panels.
 */
export function Ceremony() {
  return (
    <section className="field-navy on-dark relative -mx-2 flex flex-col items-center overflow-hidden px-5 py-14 text-center text-ivory shadow-[0_0_0_100vmax_var(--color-navy)] [clip-path:inset(0_-100vmax)] md:-mx-4 md:px-12 md:py-16 lg:py-14">
      <div className="relative flex w-full max-w-[380px] flex-col items-center justify-center md:max-w-[620px] lg:max-w-[760px]">
        {/* The badge, faint, framing the date; the content sits in its open centre */}
        <Logo
          name="sentinelsBadgeWhite"
          alt=""
          className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-[380px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.13] md:w-[620px] lg:w-[760px]"
        />
        <div className="relative flex aspect-square w-full flex-col items-center justify-center px-12 pt-10 md:px-20 md:pt-14 lg:px-24">
          <h2 className="t-eyebrow m-0 text-gold">The ceremony</h2>
          {/* The venue stays off the site until the client announces it */}
          {/* Sized to sit inside the arc of the lettering, in two lines from tablets up */}
          <p className="t-h2-56 reveal m-0 max-w-[480px] pt-4 !leading-[1.1] md:pt-5">
            {event.ceremonyDateDisplay}, Lagos.
          </p>
          <p className="m-0 max-w-[400px] pt-5 text-[14px] leading-[1.6] text-on-dark md:pt-7 md:text-[17px]">
            Attendance is by invitation. Partners and honourees receive places for their guests.
          </p>
        </div>
      </div>
    </section>
  );
}
