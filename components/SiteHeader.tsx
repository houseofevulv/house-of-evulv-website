import Link from "next/link";
import { contact } from "@/lib/content";
import { nominationStatus } from "@/lib/dates";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { StatusDot } from "./StatusDot";

const ourStory = "/our-story";

export const menuGroups = [
  {
    title: "The House",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#commitments", label: "Commitments" },
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
    { href: "#about", label: "About" },
    { href: "#commitments", label: "Commitments" },
    { href: "/sentinels-of-peace", label: "Sentinels of Peace" },
    { href: ourStory, label: "Our story" },
    { href: "#donate", label: "Donate" },
  ],
  sentinels: [
    { href: "#why", label: "Why it exists" },
    { href: "#categories", label: "Categories" },
    { href: "#selection", label: "Selection" },
    { href: "#partner", label: "Partnership" },
  ],
  // Pages without their own sections link back to the home anchors
  page: [
    { href: "/#about", label: "About" },
    { href: "/#commitments", label: "Commitments" },
    { href: "/sentinels-of-peace", label: "Sentinels of Peace" },
    { href: ourStory, label: "Our story" },
    { href: "/#donate", label: "Donate" },
  ],
};

export function SiteHeader({ variant }: { variant: "home" | "sentinels" | "page" }) {
  const status = nominationStatus();
  const onPhoto = variant === "home";

  return (
    <>
      <header className="relative flex h-16 shrink-0 items-center justify-between pr-3 pl-5 text-bone lg:h-22 lg:px-10">
        <Link href="/" className="lnk -m-1 p-1">
          <Logo name="houseReversed" className="h-[34px] lg:h-10" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 text-[15px] font-semibold lg:flex">
          {navLinks[variant].map((l) => (
            <Link key={l.label} href={l.href} className="lnk py-3 text-bone no-underline">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          {variant === "sentinels" ? (
            <>
              <span className="hidden items-center gap-2.5 text-sm font-medium text-on-dark-2 xl:flex">
                <StatusDot phase={status.phase} />
                {status.sentinels}
              </span>
              {status.phase !== "closed" && (
                <Link href="#nominate" className="btn bg-lime px-5 py-[13px] font-bold text-forest-ink">
                  Nominate someone
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/sentinels-of-peace"
                className="lnk hidden items-center gap-2.5 text-sm font-medium text-on-dark no-underline xl:flex"
              >
                <StatusDot phase={status.phase} />
                {status.home}
              </Link>
              <Link href={variant === "home" ? "#contact" : "/#contact"} className="btn bg-bone px-5 py-[13px] font-bold text-forest-ink">
                Partner with us
              </Link>
            </>
          )}
        </div>

        <MobileMenu
          groups={menuGroups}
          status={status.home}
          phase={status.phase}
          email={contact.email}
          phoneDisplay={contact.phoneDisplay}
          phoneHref={contact.phoneHref}
          triggerTone={onPhoto ? "photo" : "forest"}
        />
      </header>
      {variant === "sentinels" && (
        <p className="m-0 flex items-center gap-2 px-5 text-[13px] font-medium text-on-dark-2 lg:hidden">
          <StatusDot phase={status.phase} />
          {status.sentinelsMobile}
        </p>
      )}
    </>
  );
}
