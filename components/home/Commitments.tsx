import { Photo } from "@/components/Photo";

export function Commitments() {
  return (
    <section
      id="commitments"
      className="flex scroll-mt-4 flex-col gap-2 px-2 pb-6 md:gap-10 md:px-6 md:pt-10 md:pb-16 lg:px-12"
    >
      <div className="mx-2 mb-3 flex flex-col gap-4 md:mx-0 md:mb-0 md:flex-row md:items-end md:justify-between md:px-4">
        <h2 className="t-h2-48 m-0 max-w-[640px]">Three commitments decide what we take on.</h2>
        <p className="m-0 hidden max-w-[360px] text-[17px] leading-[1.55] text-muted md:block">
          Every programme has to serve at least one of them, and we report against it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(320px,auto))]">
        <Photo
          as="article"
          src="/images/handshake-close.jpg"
          alt="Two people shaking hands across a table"
          sizes="(min-width: 1024px) 58vw, 100vw"
          position="32% 55%"
          mobilePosition="30% 55%"
          className="flex h-[360px] flex-col justify-end rounded-[20px] md:col-span-2 md:h-[440px] md:rounded-3xl lg:col-span-7 lg:row-span-2 lg:h-auto"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,17,0)_40%,rgba(10,20,17,.75)_100%)] md:bg-[linear-gradient(180deg,rgba(10,20,17,0)_45%,rgba(10,20,17,.72)_100%)]"
          />
          <div className="relative flex flex-col gap-2 p-[22px] text-bone md:gap-3 md:p-9">
            <h3 className="t-tile-44 m-0">Peace</h3>
            <p className="m-0 max-w-[460px] text-[15px] leading-normal text-on-dark md:text-lg">
              Conditions where people and communities live with dignity and understand one another.
            </p>
          </div>
        </Photo>

        <article className="flex gap-6 rounded-[20px] bg-sage p-[22px] md:rounded-3xl md:p-8 lg:col-span-5">
          <div className="flex grow flex-col justify-between gap-2 md:gap-6">
            <h3 className="t-tile-36 m-0 text-forest">Healing</h3>
            <p className="m-0 text-[15px] leading-normal text-sage-text md:text-base md:leading-[1.55]">
              Helping people recover identity, hope and capacity after hard experiences.
            </p>
          </div>
          <Photo
            src="/images/healing-woman-seated.jpg"
            alt="Woman seated in a studio portrait"
            sizes="170px"
            position="center 40%"
            tone="sage"
            className="hidden w-[170px] shrink-0 rounded-2xl lg:block"
          />
        </article>

        <article className="on-dark flex gap-6 rounded-[20px] bg-forest p-[22px] text-bone md:rounded-3xl md:p-8 lg:col-span-5">
          <div className="flex grow flex-col justify-between gap-2 md:gap-6">
            <h3 className="t-tile-36 m-0 text-lime">Evolution</h3>
            <p className="m-0 text-[15px] leading-normal text-on-dark md:text-base md:leading-[1.55]">
              Helping people and institutions grow in how they think, lead and contribute.
            </p>
          </div>
          <Photo
            src="/images/young-speaker-podium.jpg"
            alt="A young woman speaking at a podium"
            sizes="170px"
            position="center 22%"
            tone="dark"
            className="hidden w-[170px] shrink-0 rounded-2xl lg:block"
          />
        </article>
      </div>
    </section>
  );
}
