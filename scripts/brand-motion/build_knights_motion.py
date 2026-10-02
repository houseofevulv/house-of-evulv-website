"""The Sentinels knights in motion. Run knights.py first; this reads its clean cut-outs.

Run: python3 scripts/brand-motion/build_knights_motion.py
Writes to public/brand/motion (and a copy in the brand package):
  sentinels-of-peace_motion-knight-{left,right}_light.svg, sentinels-of-peace_motion-knights-pair_light.svg
      Sentinels stand still, so only light moves: a soft band passes across the gold (never the navy) every
      ten seconds.
  sentinels-of-peace_motion-knights-pair_rise.svg
      A gold floor line draws out from the centre; the two knights rise through it together in four measured
      steps, a short lift and a pause each, until they stand on their plinths. The line fades and the light
      passes across them once, then every twelve seconds.
Under prefers-reduced-motion each file shows the knights at rest.
"""

import base64
import io

import cv2
import numpy as np
from PIL import Image

from common import PACKAGE, write

PNG = PACKAGE.parent / "02 Sentinels of Peace/PNG"
HEIGHT = 900  # embedded at the size the site uses


def load(name):
    img = cv2.imread(str(PNG / f"sentinels-of-peace_{name}_clean.png"), cv2.IMREAD_UNCHANGED)
    w = round(img.shape[1] * HEIGHT / img.shape[0])
    return cv2.resize(img, (w, HEIGHT), interpolation=cv2.INTER_AREA)


def data_uri(img, mode="RGBA", quality=86):
    buf = io.BytesIO()
    Image.fromarray(img, mode).save(buf, "WEBP", quality=quality, method=6)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


def gold_mask(img):
    """Where the artwork is gold: warm hue, saturated, lit. Soft-edged, as a white-on-black luminance mask."""
    hsv = cv2.cvtColor(img[:, :, :3], cv2.COLOR_BGR2HSV)
    h, s, v = hsv[:, :, 0].astype(int), hsv[:, :, 1].astype(int), hsv[:, :, 2].astype(int)
    gold = ((h >= 8) & (h <= 34) & (s >= 70) & (v >= 90)).astype(np.float32)
    gold *= img[:, :, 3] / 255.0
    gold = cv2.GaussianBlur(gold, (0, 0), 1.2)
    g = (np.clip(gold, 0, 1) * 255).astype(np.uint8)
    return np.dstack([g, g, g])


def light(w, h, delay, period):
    """A diagonal band of light that crosses the artwork once per period and is off-canvas the rest of the time."""
    # A wide rectangle, transparent except for a soft diagonal stripe in its middle, slid from left to right.
    span = 1.6 * w + h * 0.5
    travel = w + span
    sweep = 2.4 / period * 100  # the crossing takes 2.4 s of each period
    css = (
        f"@keyframes sweep{{0%{{transform:translateX(0)}}{sweep:.1f}%,100%{{transform:translateX({travel:.0f}px)}}}}"
        f".beam{{mix-blend-mode:screen;transform-box:view-box;"
        f"animation:sweep {period}s cubic-bezier(.45,0,.35,1) {delay}s infinite both}}"
    )
    rect = f'<rect class="beam" x="{-span:.0f}" y="0" width="{span:.0f}" height="{h}" fill="url(#beam)"/>'
    # the stripe leans like light from the upper left; it sits at the middle of the rectangle
    mid = -span / 2
    lean = h * 0.45
    defs = (
        f'<linearGradient id="beam" gradientUnits="userSpaceOnUse" x1="{mid - w * 0.3:.0f}" y1="0" '
        f'x2="{mid + w * 0.3:.0f}" y2="{lean:.0f}">'
        '<stop offset=".3" stop-color="#fff" stop-opacity="0"/>'
        '<stop offset=".5" stop-color="#fff4d6" stop-opacity=".6"/>'
        '<stop offset=".7" stop-color="#fff" stop-opacity="0"/></linearGradient>'
    )
    return css, defs, rect


def svg(name, title, rise=False):
    img = load(name)
    h, w = img.shape[:2]
    art = data_uri(cv2.cvtColor(img, cv2.COLOR_BGRA2RGBA))
    mask = data_uri(gold_mask(img), "RGB", 70)
    # the first pass waits until the knights have risen, when a page shows them rising (components/sentinels/Hero.tsx)
    css, beam_defs, beam = light(w, h, delay=4.6, period=12 if rise else 10)
    defs = (
        f"<defs>{beam_defs}"
        f'<mask id="gold" maskUnits="userSpaceOnUse" x="0" y="0" width="{w}" height="{h}">'
        f'<image href="{mask}" width="{w}" height="{h}"/></mask>'
        f'<clipPath id="floor"><rect x="0" y="-{h}" width="{w}" height="{2 * h}"/></clipPath></defs>'
    )
    figure = f'<image href="{art}" width="{w}" height="{h}"/><g mask="url(#gold)">{beam}</g>'
    if rise:
        # four lifts of decreasing height, each followed by a pause; ease-out on every lift
        e = "animation-timing-function:cubic-bezier(.22,.8,.3,1)"
        stops = [(0, 1.0), (14, 0.72), (24, 0.72), (38, 0.46), (48, 0.46), (62, 0.22), (72, 0.22), (90, 0.0)]
        frames = "".join(f"{p}%{{transform:translateY({v * h:.0f}px);{e}}}" for p, v in stops) + "100%{transform:none}"
        cx = w / 2
        css += (
            f"@keyframes rise{{{frames}}}"
            ".rise{animation:rise 3.6s .7s both}"
            "@keyframes floor{0%{transform:scaleX(0);opacity:1}18%{transform:scaleX(1);opacity:1}"
            "80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}"
            f".floor{{opacity:0;transform-box:view-box;transform-origin:{cx:.0f}px 0;animation:floor 5.2s ease-out both}}"
        )
        body = (
            f'<g clip-path="url(#floor)"><g class="rise">{figure}</g></g>'
            f'<rect class="floor" x="0" y="{h - 3}" width="{w}" height="3" fill="#C9A54C"/>'
        )
    else:
        body = figure
    style = f"<style>{css}@media (prefers-reduced-motion: reduce){{*{{animation:none!important}}}}</style>"
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
        f"<title>{title}</title>{style}{defs}{body}</svg>\n"
    )


if __name__ == "__main__":
    write("sentinels-of-peace_motion-knight-left_light.svg", svg("knight-left", "Sentinels of Peace, left knight"))
    write("sentinels-of-peace_motion-knight-right_light.svg", svg("knight-right", "Sentinels of Peace, right knight"))
    write("sentinels-of-peace_motion-knights-pair_light.svg", svg("knights-pair", "Sentinels of Peace, the knights"))
    write(
        "sentinels-of-peace_motion-knights-pair_rise.svg",
        svg("knights-pair", "Sentinels of Peace, the knights rising", rise=True),
    )
    print("knights motion written")
