"""
Site variants of the animated brand files, so no loop on the website runs for more than about five seconds
(WCAG 2.2.2 Pause, Stop, Hide). An animated SVG shown through <img> cannot be paused by the page, so the
variant is baked into the file:

- _still: the file's own reduced-motion state, always on (the scene comes to rest; the page animates the arrival)
- _once:  every looping animation plays a single time, then rests

Run after the other build scripts:  python3 scripts/brand-motion/build_site_variants.py
"""

from pathlib import Path

MOTION = Path(__file__).resolve().parents[2] / "public" / "brand" / "motion"
REDUCED = "@media (prefers-reduced-motion: reduce){"

STILL = [
    "house-of-evulv_motion-tree-of-life_gold-and-silver.svg",
    "house-of-evulv_motion-lotus-flower_gold-and-silver.svg",
    "house-of-evulv_motion-dove_gold-and-silver.svg",
]
ONCE = [
    "sentinels-of-peace_motion-knight-left_light.svg",
    "sentinels-of-peace_motion-knight-right_light.svg",
    "sentinels-of-peace_motion-badge-frame_white.svg",
]


def write(src: str, suffix: str, text: str) -> None:
    out = MOTION / src.replace(".svg", f"_{suffix}.svg")
    out.write_text(text, encoding="utf-8")
    print(f"wrote {out.relative_to(MOTION.parents[2])}")


for name in STILL:
    svg = (MOTION / name).read_text(encoding="utf-8")
    assert REDUCED in svg, f"{name}: no reduced-motion block"
    write(name, "still", svg.replace(REDUCED, "@media all{"))

for name in ONCE:
    svg = (MOTION / name).read_text(encoding="utf-8")
    assert 'repeatCount="indefinite"' not in svg, f"{name}: has SMIL loops"
    assert " infinite" in svg, f"{name}: nothing loops"
    write(name, "once", svg.replace(" infinite", " 1"))
