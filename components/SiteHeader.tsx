import Link from "next/link";
import { contact } from "@/lib/content";
import { primaryAction } from "@/lib/cta";
import { siteStatus } from "@/lib/dates";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { StatusDot } from "./StatusDot";

const ourStory = "/our-story";

export const menuGroups = [
  {
    title: "The House",
    links: [
      { href: "/#about", label: "Our House" },
      { href: "/#commitments", label: "Our Ideology" },
      { href: ourStory, label: "Our story" },
      { href: "/#donate", label: "Donate" },
    ],
  },
  {
    title: "Sentinels of Peace",
    links: [
      { href: "/sentinels-of-peace", label: "The programme" },
      { href: "/sentinels-of-peace#categories", label: "Categories" },
      { href: "/sentinels-of-peace#partner", label: "Partnership" },
      { href: "/sentinels-of-peace#faq", label: "Questions" },
    ],
  },
];

const navLinks = {
  home: [
    { href: "#about", label: "Our House" },
    { href: "#commitments", label: "Our Ideology" },
    { href: "/sentinels-of-peace", label: "Sentinels of Peace" },
    { href: "#partnership", label: "Partnership" },
    { href: "#contact", label: "Contact" },
  ],
  sentinels: [
    { href: "#why", label: "Why it exists" },
    { href: "#categories", label: "Categories" },
    { href: "#selection", label: "Selection" },
    { href: "#partner", label: "Partnership" },
  ],
  // Pages without their own sections link back to the home anchors
  page: [
    { href: "/#about", label: "Our House" },
    { href: "/#commitments", label: "Our Ideology" },
    { href: "/sentinels-of-peace", label: "Sentinels of Peace" },
    { href: "/#partnership", label: "Partnership" },
    { href: "/#contact", label: "Contact" },
  ],
};

export function SiteHeader({ variant }: { variant: "home" | "sentinels" | "page" }) {
  const status = siteStatus();
  const action = primaryAction(variant === "sentinels");
  const menuAction = primaryAction();
  const onPhoto = variant === "home";
  // The two heroes are fields of espresso and Sentinel Navy with no photograph, so their header lets the field run
  // through to the top; other pages keep a solid espresso bar
  const bar = variant === "page" ? "bg-espresso" : "";

  return (
    <>
      {/* Logos never sit directly on photographs (brand manual, section 07): a solid bar wherever a photo could follow */}
      <header
        className={`relative flex h-[92px] shrink-0 items-center justify-between rounded-t-[22px] pr-3 pl-4 text-ivory md:rounded-t-[28px] nav:px-5 lg:h-[108px] lg:px-10 ${bar}`}
      >
        <Link href="/" className="lnk -m-1 p-1">
          {/* Horizontal logo: 200px is its smallest size on screen (brand manual, section 04) */}
          <Logo name="houseHorizontal" eager className="h-auto w-[200px] lg:w-[212px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-3 text-[13px] font-semibold nav:flex lg:gap-5 lg:text-sm xl:gap-7 xl:text-[15px] 2xl:gap-9">
          {navLinks[variant].map((l) => (
            <Link key={l.label} href={l.href} className="lnk py-3 whitespace-nowrap text-ivory no-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 nav:flex">
          {variant === "sentinels" ? (
            <>
              <span className="hidden items-center gap-2.5 text-sm font-medium whitespace-nowrap text-on-dark-2 min-[1380px]:flex">
                <StatusDot phase={status.phase} />
                {status.sentinels}
              </span>
              {action && (
                <Link href={action.href} className="btn bg-gold px-4 py-[13px] text-sm font-bold whitespace-nowrap text-black lg:px-5 lg:text-[15px]">
                  {action.label}
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/sentinels-of-peace"
                className="lnk hidden items-center gap-2.5 text-sm font-medium whitespace-nowrap text-on-dark no-underline min-[1380px]:flex"
              >
                <StatusDot phase={status.phase} />
                {status.home}
              </Link>
              <Link href={variant === "home" ? "#contact" : "/#contact"} className="btn bg-ivory px-4 py-[13px] text-sm font-bold whitespace-nowrap text-black lg:px-5 lg:text-[15px]">
                Partner with us
              </Link>
            </>
          )}
        </div>

        <MobileMenu
          groups={menuGroups}
          status={status.home}
          phase={status.phase}
          action={menuAction}
          email={contact.email}
          phoneDisplay={contact.phoneDisplay}
          phoneHref={contact.phoneHref}
          triggerTone={onPhoto ? "photo" : "panel"}
        />
      </header>
      {variant === "sentinels" && (
        <p className="relative m-0 flex items-center gap-2 px-5 pb-3.5 text-[13px] font-medium text-on-dark-2 nav:hidden">
          <StatusDot phase={status.phase} />
          {status.sentinelsMobile}
        </p>
      )}
    </>
  );
}
