import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { primaryAction } from "@/lib/cta";
import { event, nominations, steps } from "@/lib/content";
import { weekdayDayMonth } from "@/lib/dates";
import { HeroSlides, type Slide } from "./HeroSlides";

// Illustrative photographs; replace with the programme's own once the first edition has taken place.
const slides: Slide[] = [
  {
    src: "/images/medal-pinning.jpg",
    alt: "A medal being pinned to a decorated uniform",
    position: "center 40%",
    mobilePosition: "48% center",
  },
  {
    src: "/images/officer-helipad.jpg",
    alt: "A uniformed officer standing watch beside a helicopter",
    position: "center 45%",
    mobilePosition: "56% center",
  },
  {
    src: "/images/guard-of-honour.jpg",
    alt: "Guard of honour standing to attention on a red carpet",
    position: "center 45%",
    mobilePosition: "65% 45%",
  },
];

export function Hero() {
  const action = primaryAction(true);
  const announcement = steps.find((s) => s.id === "announcement");
  // TODO(client): the venue is unconfirmed (event.venueConfirmed = false)
  const meta = [
    { label: "Ceremony", value: weekdayDayMonth(event.ceremonyDate) },
    {
      label: "Venue",
      value: (
        <>
          <span className="hidden xs:inline lg:hidden">{event.venue}</span>
          <span className="xs:hidden lg:inline">{event.venueShort}</span>
        </>
      ),
    },
    nominations.public
      ? { label: "Nominations close", value: weekdayDayMonth(nominations.closes) }
      : { label: "Honourees announced", value: weekdayDayMonth(announcement?.start ?? nominations.outcomeBy) },
  ];

  return (
    <section className="on-dark relative flex min-h-[min(760px,100svh)] flex-col overflow-hidden rounded-[22px] bg-espresso-mid text-ivory md:min-h-[820px] md:rounded-[28px] lg:min-h-[900px]">
      <div className="absolute inset-0">
        <HeroSlides slides={slides} controlsSlot="hero-slide-controls" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,7,.55)_0%,rgba(14,10,7,.12)_16%,rgba(14,10,7,.62)_40%,rgba(14,10,7,.8)_60%,rgba(14,10,7,.94)_100%)] lg:bg-[linear-gradient(180deg,rgba(14,10,7,.5)_0%,rgba(14,10,7,0)_20%,rgba(14,10,7,0)_40%,rgba(14,10,7,.85)_100%),linear-gradient(90deg,rgba(14,10,7,.55)_0%,rgba(14,10,7,0)_65%)]"
        />
      </div>
      <div className="relative flex grow flex-col">
        <SiteHeader variant="sentinels" />
        <div
          id="content"
          className="mt-auto flex flex-col gap-7 px-5 pt-24 pb-6 md:px-8 md:pb-8 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-6 lg:gap-y-0 lg:px-10 lg:pb-10"
        >
          <div className="flex flex-col gap-[18px] lg:col-span-8 lg:gap-7">
            <p className="t-eyebrow m-0 text-gold">A House of Evulv programme, first edition</p>
            <h1 className="t-sop-hero m-0">Sentinels of Peace</h1>
            <p className="m-0 max-w-[560px] text-base leading-[1.55] text-on-dark md:text-xl">
              Grand Honours for the individuals and organisations whose work prevents conflict, protects lives and helps
              communities in Nigeria recover.
            </p>
            <dl className="m-0 flex flex-col md:grid md:max-w-[760px] md:grid-cols-3 md:gap-4 lg:pt-4">
              {meta.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex justify-between gap-4 border-t border-ivory/25 py-[13px] text-[15px] md:block md:border-b-0 md:pt-4 md:pb-0 ${
                    i === meta.length - 1 ? "border-b" : ""
                  }`}
                >
                  <dt className="text-on-dark-2 md:text-sm">{m.label}</dt>
                  <dd className="m-0 text-right font-semibold md:pt-1.5 md:text-left md:text-xl md:font-bold">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end">
            <div className="flex flex-col gap-2.5 md:flex-row lg:justify-end">
              {action && (
                <Link href={action.href} className="btn min-h-12 bg-gold px-6 py-[15px] font-bold text-black">
                  {action.label}
                </Link>
              )}
              <Link
                href="#partner"
                className="btn min-h-12 border border-ivory bg-black/20 px-[23px] py-[14px] font-semibold text-ivory backdrop-blur-sm"
              >
                Become a partner
              </Link>
            </div>
            {/* HeroSlides renders its pause button and position dots here */}
            <div id="hero-slide-controls" className="min-h-11" />
          </div>
        </div>
      </div>
    </section>
  );
}
