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
        src="/images/recognise-joy-flag.jpg"
        alt="Woman celebrating in front of a Nigerian flag"
        sizes="(min-width: 1024px) 50vw, 100vw"
        position="center 40%"
        className="flex h-[360px] flex-col justify-end rounded-[20px] md:col-span-2 md:h-[440px] md:rounded-3xl lg:col-span-6 lg:row-span-2 lg:h-auto"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,17,0)_40%,rgba(10,20,17,.75)_100%)]"
        />
        <div className="relative p-[22px] text-bone md:p-8">
          <h3 className="t-tile-40 m-0">Recognise</h3>
          <p className="m-0 mt-2 max-w-[420px] text-[15px] leading-normal text-on-dark md:mt-2.5 md:text-[17px]">
            Public honours for documented service in peace, security and community resilience.
          </p>
        </div>
      </Photo>
      <article className={`${tile} bg-sage md:justify-between lg:col-span-3`}>
        <h3 className="t-tile-28 m-0 text-forest">Convene</h3>
        <p className={`${body} text-sage-text`}>
          Government, business, diplomatic, traditional, humanitarian and civic leaders in one room.
        </p>
      </article>
      <article className={`${tile} border border-card-border bg-white md:justify-between lg:col-span-3`}>
        <h3 className="t-tile-28 m-0">Amplify</h3>
        <p className={`${body} text-body`}>
          Each honouree&apos;s story is written up and published so the work reaches more people.
        </p>
      </article>
      <article
        className={`${tile} on-dark bg-forest text-bone md:col-span-2 md:flex-row md:items-end md:justify-between md:gap-6 lg:col-span-6`}
      >
        <h3 className="t-tile-28 m-0 text-lime">Advance</h3>
        <p className={`${body} max-w-[380px] text-on-dark`}>
          Honourees are introduced to partners who can fund, extend or replicate what they started.
        </p>
      </article>
    </section>
  );
}
