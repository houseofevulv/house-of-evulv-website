import { Photo } from "@/components/Photo";
import { event } from "@/lib/content";

export function Ceremony() {
  return (
    <Photo
      as="section"
      src="/images/reception-guests.jpg"
      alt="Guests greeting one another at a formal evening reception"
      sizes="(min-width: 1440px) 1408px, 100vw"
      position="center 35%"
      mobilePosition="40% center"
      tone="dark"
      className="on-dark flex min-h-[440px] items-end rounded-[22px] md:min-h-[520px] md:rounded-[28px]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,17,.1)_20%,rgba(10,20,17,.85)_100%)] md:bg-[linear-gradient(90deg,rgba(10,20,17,.8)_0%,rgba(10,20,17,.1)_70%)]"
      />
      <div className="relative flex flex-col gap-2.5 px-5 py-6 text-bone md:gap-3.5 md:px-12 md:py-12 lg:px-16 lg:py-14">
        <h2 className="m-0 text-sm font-semibold text-lime md:text-base">The ceremony</h2>
        {/* TODO(client): the venue is unconfirmed (event.venueConfirmed = false) */}
        <p className="t-h2-56 m-0 max-w-[720px] !leading-[1.04]">
          {event.ceremonyDateDisplay}, {event.venue}.
        </p>
        <p className="m-0 max-w-[520px] text-[15px] leading-[1.55] text-on-dark md:text-[17px]">
          Attendance is by invitation. Partners and honourees receive places for their guests.
        </p>
      </div>
    </Photo>
  );
}
