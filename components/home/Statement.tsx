import { Photo } from "@/components/Photo";

function Chip({ src, alt, position = "center 22%" }: { src: string; alt: string; position?: string }) {
  return (
    <Photo
      as="span"
      src={src}
      alt={alt}
      sizes="128px"
      position={position}
      className={`inline-block h-8 w-16 rounded-full align-middle md:h-[clamp(32px,4.1667vw,60px)] md:w-[clamp(64px,calc(9.5238vw_-_9.143px),128px)]`}
    />
  );
}

export function Statement() {
  return (
    <section id="about" className="scroll-mt-4 px-4 pt-12 pb-10 md:px-16 md:pt-[120px] md:pb-20">
      <p className="t-statement m-0 max-w-[1180px] text-ink">
        Our programmes reach elders{" "}
        <Chip
          src="/images/elder-portrait-bw.jpg"
          alt="An elder with a white beard, wearing a hat and glasses"
          position="center 32%"
        /> and mediators, women
        rebuilding after loss<span className="md:hidden">,</span>{" "}
        <span className="hidden md:inline">
          <Chip src="/images/woman-blazer.jpg" alt="Woman in a black blazer, smiling" />{" "}
        </span>
        and young people <Chip src="/images/young-speaker-portrait.jpg" alt="A young woman speaking into a microphone" position="45% 42%" />{" "}
        preparing to lead.{" "}
        <span className="hidden text-statement-grey md:inline">
          The first is a national honours programme, held in Lagos this December.
        </span>
      </p>
    </section>
  );
}
