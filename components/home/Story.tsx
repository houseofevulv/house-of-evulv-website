import Link from "next/link";
import { Photo } from "@/components/Photo";
import { founder, founderPhoto, founderPhotoAlt } from "@/lib/content";

/** Founder portrait and quote. On the Our Story page the link to that page is left out. */
export function Story({ onStoryPage = false }: { onStoryPage?: boolean }) {
  return (
    <section
      id="story"
      className="flex scroll-mt-4 flex-col gap-5 px-4 py-10 md:grid md:grid-cols-12 md:items-stretch md:gap-x-6 md:gap-y-0 md:px-12 md:py-16"
    >
      {/* TODO(client): the founder's portrait. Set founder.photo in content/site-content.json; until then the quote runs full width. */}
      {founderPhoto && (
      <Photo
        src={founderPhoto}
        alt={founderPhotoAlt}
        sizes="(min-width: 1440px) 546px, (min-width: 768px) 40vw, 100vw"
        position="center 30%"
        priority={onStoryPage}
        className="h-[360px] rounded-[20px] md:col-span-5 md:aspect-[546/532] md:h-auto md:w-full md:self-start md:rounded-3xl lg:self-stretch"
      />
      )}
      <div
        className={`flex flex-col gap-5 md:justify-between md:gap-10 md:py-3 ${
          founderPhoto ? "md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7" : "md:col-span-12 lg:col-span-10 lg:col-start-2"
        }`}
      >
        <h2 className="m-0 hidden text-[15px] font-semibold text-muted md:block">{onStoryPage ? "From the founder" : "Our story"}</h2>
        <blockquote className="t-quote m-0">
          <p className="m-0">“{founder.quote}”</p>
        </blockquote>
        <div className="flex items-end justify-between gap-6">
          <div>
            {/* TODO(client): confirm the founder's name as it should appear (founder.nameConfirmed = false) */}
            <div className="text-base font-bold md:text-lg">{founder.name}</div>
            <div className="pt-0.5 text-sm text-muted md:pt-1 md:text-[15px]">{founder.title}</div>
          </div>
          {!onStoryPage && (
            <Link href="/our-story" className="lnk inline-flex min-h-11 shrink-0 items-center text-[15px] font-bold text-forest underline md:min-h-0">
              Read the full story
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
