import { Photo } from "@/components/Photo";

const tile = "flex flex-col gap-2 rounded-[20px] p-[22px] md:rounded-3xl md:p-7";
const body = "m-0 text-[15px] leading-normal";

export function WhatItDoes() {
  return (
    <section
      aria-label="What the honours do"
      className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 md:px-6 md:pb-12 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(278px,auto))] lg:px-12"
    >
      <Photo
        as="article"
        src="/images/trophy-dark.jpg"
        alt="A star-topped trophy on a dark background"
        sizes="(min-width: 1024px) 50vw, 100vw"
        position="center 30%"
        className="flex h-[360px] flex-col justify-end rounded-[20px] md:col-span-2 md:h-[440px] md:rounded-3xl lg:col-span-6 lg:row-span-2 lg:h-auto"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,10,7,0)_40%,rgba(14,10,7,.75)_100%)]"
        />
        <div className="relative p-[22px] text-ivory md:p-8">
          <h3 className="t-tile-40 m-0">Recognise</h3>
          <p className="m-0 mt-2 max-w-[420px] text-[15px] leading-normal text-on-dark md:mt-2.5 md:text-[17px]">
            Distinguished service, sacrifice and moral courage.
          </p>
        </div>
      </Photo>
      <article className={`${tile} bg-sand md:justify-between lg:col-span-3`}>
        <h3 className="t-tile-28 m-0 text-espresso">Convene</h3>
        <p className={`${body} text-sand-text`}>
          Influential voices across sectors and generations.
        </p>
      </article>
      <article className={`${tile} border border-card-border bg-white md:justify-between lg:col-span-3`}>
        <h3 className="t-tile-28 m-0">Amplify</h3>
        <p className={`${body} text-body`}>
          Stories that restore faith in leadership and humanity.
        </p>
      </article>
      <article
        className={`${tile} on-dark bg-espresso text-ivory md:col-span-2 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-span-6`}
      >
        <h3 className="t-tile-28 m-0 text-gold">Advance</h3>
        <p className={`${body} max-w-[380px] text-on-dark`}>
          Partnerships that translate honour into social impact.
        </p>
      </article>
    </section>
  );
}
