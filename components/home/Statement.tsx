import { FitLine } from "@/components/FitLine";

/** The House's statement as one line the full width of the page, softened, leading into the Sentinels band */
export function Statement() {
  return (
    <section className="px-4 py-12 md:px-12 md:py-20 lg:py-24">
      {/* em: the line's width in Libre Bodoni Bold at size 1, measured with fontTools (see FitLine) */}
      <h2 className="reveal m-0 w-full text-center">
        <FitLine as="span" em={17.81} className="text-espresso/35">
          We create what the future remembers.
        </FitLine>
      </h2>
    </section>
  );
}
