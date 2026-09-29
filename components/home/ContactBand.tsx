import { contact } from "@/lib/content";

export function ContactBand() {
  const linkCls = "lnk inline-flex min-h-11 items-center text-forest-ink no-underline md:min-h-0";
  return (
    <section
      id="contact"
      className="flex scroll-mt-4 flex-col justify-between gap-8 rounded-[22px] bg-lime px-5 py-7 text-forest-ink md:gap-24 md:rounded-[28px] md:p-12 lg:gap-32 lg:p-16"
    >
      <div className="flex items-start justify-between gap-8">
        <h2 className="t-h2-48 m-0 max-w-[700px]">Partner with us, or bring us a programme worth building.</h2>
        <p className="m-0 hidden shrink-0 text-right text-[17px] leading-[1.7] font-medium md:block">
          <a href={contact.phoneHref} className={linkCls}>
            {contact.phoneDisplay}
          </a>
          <br />
          {contact.city}
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <a href={`mailto:${contact.email}`} className={`t-contact-email self-start break-all ${linkCls}`}>
          {contact.email}
        </a>
        <a href={contact.phoneHref} className={`${linkCls} self-start text-base font-medium md:hidden`}>
          {contact.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
