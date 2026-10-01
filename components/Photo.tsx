import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  /** Rendered widths, so small screens never download the 2400px original */
  sizes: string;
  /** object-position from 768px up */
  position?: string;
  /** object-position below 768px, if different */
  mobilePosition?: string;
  priority?: boolean;
  /** Fallback colour while loading: light, dark (espresso) or sand */
  tone?: "light" | "dark" | "sand";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  as?: "div" | "section" | "article" | "span";
};

const tones = { light: "bg-photo-fallback", dark: "bg-espresso-mid", sand: "bg-sand-deep" };

export function Photo({
  src,
  alt,
  sizes,
  position = "center",
  mobilePosition,
  priority,
  tone = "light",
  className = "",
  style,
  children,
  as: Tag = "div",
}: Props) {
  const vars = { "--pos": position, "--pos-m": mobilePosition ?? position, ...style } as CSSProperties;
  return (
    <Tag className={`relative overflow-hidden ${tones[tone]} ${className}`} style={vars}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="photo-toned object-cover object-[var(--pos-m)] md:object-[var(--pos)]"
      />
      <span aria-hidden="true" className="photo-wash" />
      {children}
    </Tag>
  );
}
