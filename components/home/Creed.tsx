/** On the home page it follows Partnership on the same ground, so it carries top padding only when `standalone` */
export function Creed({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id="creed"
      className={`flex flex-col items-center px-4 pb-16 text-center md:px-12 md:pb-28 lg:pb-36 ${
        standalone ? "pt-16 md:pt-28 lg:pt-36" : ""
      }`}
    >
      <h2 className="t-eyebrow m-0 text-bronze">Our Creed</h2>
      <blockquote className="t-quote m-0 max-w-[820px] pt-6 md:pt-8">
        <p className="m-0">“Peace is not the silence after conflict; it is the courage that prevents the first blow.”</p>
      </blockquote>
      <p className="m-0 pt-6 text-[15px] font-bold text-muted md:pt-8">House of Evulv</p>
    </section>
  );
}
