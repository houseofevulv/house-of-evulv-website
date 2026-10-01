import { RingBackdrop } from "@/components/Ornament";
import { contact } from "@/lib/content";

export function ContactBand() {
  const linkCls = "lnk inline-flex min-h-11 items-center no-underline md:min-h-0";
  return (
    <section
      id="contact"
      className="on-dark relative flex scroll-mt-4 flex-col justify-between gap-8 overflow-clip rounded-[22px] bg-black px-5 py-7 text-ivory md:gap-24 md:rounded-[28px] md:p-12 lg:gap-32 lg:p-16"
    >
      {/* The open ring of the emblem, as a quiet ornament */}
      <RingBackdrop className="!top-full !left-[82%] opacity-[0.12]" />
      <div className="relative flex items-start justify-between gap-8">
        <div className="flex flex-col gap-3">
          <p className="t-eyebrow m-0 text-gold">Begin a conversation</p>
          <h2 className="t-h2-48 m-0 max-w-[700px]">Let us create something worthy of remembrance.</h2>
        </div>
        <p className="m-0 hidden shrink-0 text-right text-[17px] leading-[1.7] font-medium text-on-dark md:block">
          Partnership &amp; Enquiries
          <br />
          <a href={contact.phoneHref} className={`${linkCls} text-ivory`}>
            {contact.phoneDisplay}
          </a>
          <br />
          {contact.city}
        </p>
      </div>
      <div className="relative flex flex-col gap-2.5">
        <p className="t-eyebrow m-0 text-on-dark-2 md:hidden">Partnership &amp; Enquiries</p>
        <a href={`mailto:${contact.email}`} className={`t-contact-email self-start break-all text-gold ${linkCls}`}>
          {contact.email}
        </a>
        <a href={contact.phoneHref} className={`${linkCls} self-start text-base font-medium text-ivory md:hidden`}>
          {contact.phoneDisplay}
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="btn mt-3 min-h-12 bg-gold px-6 py-[15px] font-bold text-black md:mt-6 md:self-start"
        >
          Write to the House →
        </a>
      </div>
    </section>
  );
}
