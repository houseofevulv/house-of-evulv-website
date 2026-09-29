import { Photo } from "@/components/Photo";

export function WhyItExists() {
  return (
    <section
      id="why"
      className="flex scroll-mt-4 flex-col gap-4 px-4 py-10 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-0 md:px-12 md:py-20 lg:px-16 lg:pt-[104px] lg:pb-16"
    >
      <h2 className="t-h2-56 m-0 md:col-span-7">Much of the work that keeps a community stable is never recorded.</h2>
      <div className="flex flex-col gap-4 text-base leading-[1.6] text-body md:col-span-5 md:col-start-8 md:gap-5 md:pt-2.5 md:text-lg lg:col-span-4 lg:col-start-9">
        <p className="m-0">
          Mediators, first responders, community leaders, public servants and civic groups prevent violence and help people
          recover from it. Few of them are ever named.
        </p>
        <p className="m-0">
          The Grand Honours names them, documents what they did, and puts them in the same room as the institutions able to
          support their work.
        </p>
      </div>
      <Photo
        src="/images/community-rooftops.jpg"
        alt="Rooftops of a densely built Nigerian city stretching to the horizon"
        sizes="(min-width: 1440px) 1312px, 100vw"
        position="center 60%"
        className="mt-4 aspect-[4/3] w-full rounded-[20px] md:col-span-12 md:mt-14 md:aspect-[21/9] md:rounded-3xl lg:mt-20"
      />
    </section>
  );
}
