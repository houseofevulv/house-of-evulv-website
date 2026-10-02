"use client";

import { useEffect, useRef, useState } from "react";

/**
 * For a tall element whose content is pinned with `position: sticky`: returns which of `count` steps the reader has
 * scrolled to, so a row of items can be shown one at a time. Attach `ref` to the tall element.
 */
export function usePinnedStep<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const travel = height - window.innerHeight;
      const progress = travel > 0 ? Math.min(Math.max(-top / travel, 0), 1) : 0;
      setActive(Math.min(count - 1, Math.floor(progress * count)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return { ref, active };
}
