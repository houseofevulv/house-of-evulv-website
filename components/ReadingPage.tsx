import type { ReactNode } from "react";
import { PageShell } from "./PageShell";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Plain reading layout for legal and utility pages: header panel, 720px column, footer. */
export function ReadingPage({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <PageShell>
      <div className="on-dark rounded-[22px] bg-espresso md:rounded-[28px]">
        <SiteHeader variant="page" />
      </div>
      <main id="content" className="px-4 pt-10 pb-16 md:px-12 md:pt-20 md:pb-24">
        <article className="mx-auto max-w-[720px] text-base leading-[1.65] text-body md:text-[17px]">
          <h1 className="m-0 text-[36px] leading-[1.05] font-bold text-ink md:text-5xl">{title}</h1>
          {intro && <div className="mt-5 text-muted">{intro}</div>}
          <div className="prose-evulv mt-10">{children}</div>
        </article>
      </main>
      <SiteFooter variant="page" />
    </PageShell>
  );
}
