import type { ReactNode } from "react";

/** Page gutter: 8px mobile, 16px desktop. Sections sit inside as rounded panels. */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-[1440px] flex-col gap-2 p-2 md:gap-4 md:p-4">{children}</div>;
}
