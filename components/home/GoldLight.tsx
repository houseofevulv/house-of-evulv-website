/**
 * The gold light from the client's "100 Days of Peace" artwork, kept quiet: a glowing horizon arc with two stars,
 * gold and navy ribbons along the foot of the hero (both stretch to the full width of the screen), and a few soft lights in the air. Decorative only. The lights
 * twinkle slowly (paused with the hero's motion button, and still for reduced-motion visitors); the arc catches a
 * light once on arrival.
 */
const BOKEH = [
  { left: "6%", top: "58%", size: 14, delay: "0s", o: 0.6 },
  { left: "12%", top: "16%", size: 9, delay: "1.8s", o: 0.7 },
  { left: "47%", top: "9%", size: 6, delay: "3.1s", o: 0.75 },
  { left: "70%", top: "12%", size: 8, delay: "0.9s", o: 0.65 },
  { left: "89%", top: "28%", size: 18, delay: "2.4s", o: 0.5 },
  { left: "94%", top: "60%", size: 24, delay: "4s", o: 0.45 },
  { left: "36%", top: "72%", size: 10, delay: "5.2s", o: 0.5 },
];

// On the horizon: x 330 and 1180 of 1440, y 153 and 170 of 300 in the band's viewBox
const FLARES = [
  { left: "22.9%", top: "51%", size: 84, o: 0.9 },
  { left: "81.9%", top: "56.7%", size: 56, o: 0.65 },
];

export function GoldLight() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {BOKEH.map((b) => (
        <span
          key={b.left + b.top}
          className="bokeh-twinkle absolute rounded-full blur-[1.5px]"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            opacity: b.o,
            animationDelay: b.delay,
            background: "radial-gradient(circle, rgb(255 236 180) 0%, rgb(232 190 96 / 0.7) 35%, rgb(208 169 79 / 0.2) 60%, transparent 75%)",
          }}
        />
      ))}

      {/* Two stars where the light catches the horizon: round glows only, so nothing runs beside the curved line */}
      <div className="absolute inset-x-0 bottom-0 h-[150px] md:h-[200px] lg:h-[240px]">
        {FLARES.map((f) => (
          <span
            key={f.left}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: f.left,
              top: f.top,
              width: f.size,
              height: f.size,
              opacity: f.o,
              background: "radial-gradient(circle, #fff6dc 0%, rgb(243 210 124 / 0.75) 18%, rgb(208 169 79 / 0.25) 45%, transparent 70%)",
            }}
          />
        ))}
      </div>

      <svg
        className="absolute inset-x-0 bottom-0 h-[150px] w-full md:h-[200px] lg:h-[240px]"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gl-arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#b8862e" stopOpacity="0" />
            <stop offset="0.2" stopColor="#b8862e" stopOpacity="0.7" />
            <stop offset="0.5" stopColor="#f8e1a0" />
            <stop offset="0.8" stopColor="#b8862e" stopOpacity="0.7" />
            <stop offset="1" stopColor="#b8862e" stopOpacity="0" />
          </linearGradient>
          {/* Below the horizon the globe is a shade darker than the sky; the glowing line lights its edge */}
          <linearGradient id="gl-rim" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#040914" stopOpacity="0.35" />
            <stop offset="1" stopColor="#040914" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="gl-ribbon" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#8c6420" />
            <stop offset="0.22" stopColor="#e9c46e" />
            <stop offset="0.4" stopColor="#a8792c" />
            <stop offset="0.62" stopColor="#f6dd96" />
            <stop offset="0.82" stopColor="#b88a36" />
            <stop offset="1" stopColor="#8c6420" />
          </linearGradient>
          <linearGradient id="gl-navy" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#0c1a3f" />
            <stop offset="0.5" stopColor="#24407f" />
            <stop offset="1" stopColor="#0c1a3f" />
          </linearGradient>
          <filter id="gl-blur" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="gl-soft" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* The globe under the horizon */}
        <path d="M-100 300 Q720 -80 1540 300 Z" fill="url(#gl-rim)" />
        {/* The horizon: a blurred glow under a fine bright line */}
        <path d="M-100 300 Q720 -80 1540 300" fill="none" stroke="url(#gl-arc)" strokeWidth="10" opacity="0.5" filter="url(#gl-blur)" vectorEffect="non-scaling-stroke" />
        <path
          className="gold-arc"
          d="M-100 300 Q720 -80 1540 300"
          pathLength={1000}
          fill="none"
          stroke="url(#gl-arc)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        {/* Ribbons along the foot: gold, navy, gold, with a soft glow under the first */}
        <path
          d="M0 258 C300 214 520 300 820 254 S1260 206 1440 244 L1440 258 C1260 222 1100 290 820 270 S300 230 0 274 Z"
          fill="url(#gl-ribbon)"
          opacity="0.55"
          filter="url(#gl-soft)"
        />
        <path
          d="M0 270 C320 236 560 306 860 270 S1270 232 1440 262 L1440 300 L0 300 Z"
          fill="url(#gl-navy)"
          opacity="0.85"
        />
        <path
          d="M0 258 C300 214 520 300 820 254 S1260 206 1440 244 L1440 254 C1260 220 1100 284 820 266 S300 228 0 268 Z"
          fill="url(#gl-ribbon)"
        />
        <path
          d="M0 290 C340 262 600 312 900 284 S1300 262 1440 280 L1440 286 C1300 270 1120 304 900 292 S340 274 0 298 Z"
          fill="url(#gl-ribbon)"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
