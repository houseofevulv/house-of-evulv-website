"""Sentinels of Peace: the seal's circle and lettering as flat vector marks, still and animated.

Run: python3 scripts/brand-motion/build_sentinels.py
Writes to public/brand/motion (and a copy in the brand package):
  sentinels-of-peace_badge_{white,navy}.svg          the seal's circle with its lettering, one colour
  sentinels-of-peace_badge-frame_{white,navy}.svg    the circle alone, to hold a portrait, a year or a number
  sentinels-of-peace_lettering_{gold,white,navy}.svg the arched name and its star, standing on their own
  and the still versions of each in public/brand/sentinels (and 02 Sentinels of Peace/SVG).

The animated versions play once when they appear, then rest as the still mark: the rim draws up both sides to
the star, the star turns into place, the name rises letter by letter from left to right, then the dots and side
arcs follow. Afterwards the star catches the light once every nine seconds.

Proportions follow the seal artwork (sentinels-of-peace_seal_original.png): a heavy outer rim with a hairline
inside it, the star at the top between two short arcs, the name arched over the top, a dot at each end of the
name and an arc down each side. The lettering is Libre Bodoni Bold (SIL Open Font License), outlined.
"""

import math
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

from common import PACKAGE, ROOT, write

STILL = ROOT / "public/brand/sentinels"
STILL_PACKAGE = PACKAGE.parent / "02 Sentinels of Peace/SVG"

FONT = TTFont(Path(__file__).parent / "fonts/LibreBodoni-Bold.ttf")
GLYPHS = FONT.getGlyphSet()
CMAP = FONT.getBestCmap()

C = 500.0  # centre of the 1000 x 1000 drawing
RIM_OUT, RIM_IN = 492.0, 462.0
HAIR_R, HAIR_W = 446.0, 3.0
TEXT_R, CAP = 334.0, 64.0  # baseline radius and capital height of the lettering
TRACK = 0.08  # letter spacing, as a share of the capital height
STAR_R, STAR = 432.0, 22.0  # star centre radius and half-length of its long points
FLANK_R, FLANK = 432.0, (97.5, 122.0)  # the short arcs either side of the star (degrees from the right)
DOT_R, DOT = 362.0, 8.0
SIDE_R, SIDE = 392.0, (200.0, 240.0)  # an arc down each side, below the dots
LINE = 4.0

NAVY, WHITE, GOLD = "#10234F", "#FFFFFF", "#C9A54C"


def pt(r, deg):
    a = math.radians(deg)
    return C + r * math.cos(a), C - r * math.sin(a)


def f(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def arc(r, a0, a1):
    """An arc from angle a0 to a1 (degrees, anticlockwise from the right), as path data for a stroke."""
    x0, y0 = pt(r, a0)
    x1, y1 = pt(r, a1)
    large = 1 if abs(a1 - a0) > 180 else 0
    sweep = 0 if a1 > a0 else 1
    return f"M{f(x0)} {f(y0)}A{f(r)} {f(r)} 0 {large} {sweep} {f(x1)} {f(y1)}"


def star(cx, cy, s):
    """A four-pointed star, long points up and down, as on the seal."""
    w, k = s * 0.62, s * 0.16
    pts = [(cx, cy - s), (cx + k, cy - k), (cx + w, cy), (cx + k, cy + k),
           (cx, cy + s), (cx - k, cy + k), (cx - w, cy), (cx - k, cy - k)]
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"


def dot(cx, cy, r):
    return f"M{f(cx - r)} {f(cy)}a{f(r)} {f(r)} 0 1 0 {f(2 * r)} 0a{f(r)} {f(r)} 0 1 0 {f(-2 * r)} 0Z"


def lettering(text="SENTINELS OF PEACE"):
    """Each letter as its own outlined path, set on the arc and centred at the top. Returns ([d], span in degrees)."""
    cap = FONT["OS/2"].sCapHeight
    s = CAP / cap
    track = TRACK * CAP
    widths = []
    for ch in text:
        g = CMAP[ord(ch)]
        widths.append(GLYPHS[g].width * s)
    total = sum(widths) + track * (len(text) - 1)
    span = math.degrees(total / TEXT_R)
    paths, run = [], 0.0
    for ch, w in zip(text, widths):
        mid = run + w / 2
        run += w + track
        if ch == " ":
            continue
        a = 90 + span / 2 - math.degrees(mid / TEXT_R)  # angle of the letter's centre
        x, y = pt(TEXT_R, a)
        rot = math.radians(90 - a)  # clockwise turn so the letter stands on the circle
        cos, sin = math.cos(rot), math.sin(rot)
        # font units (y up) -> letter centred on (0, baseline), y down -> turned -> placed on the arc
        ox = -w / 2
        pen = SVGPathPen(GLYPHS, ntos=f)
        GLYPHS[CMAP[ord(ch)]].draw(
            TransformPen(pen, (s * cos, s * sin, s * sin, -s * cos, x + ox * cos, y + ox * sin))
        )
        paths.append(pen.getCommands())
    return paths, span


def parts():
    """Every piece of the badge, as (name, kind, d): kind is 'fill' or 'line' (a stroke of LINE width)."""
    letters, span = lettering()
    out = [("rim", "ring", None), ("hair", "hairline", None)]
    out.append(("star", "fill", star(*pt(STAR_R, 90), STAR)))
    out.append(("flank-l", "line", arc(FLANK_R, FLANK[0], FLANK[1])))
    out.append(("flank-r", "line", arc(FLANK_R, 180 - FLANK[0], 180 - FLANK[1])))
    end = span / 2 + 6.5  # the dots sit just past each end of the name
    out.append(("dot-l", "fill", dot(*pt(DOT_R, 90 + end), DOT)))
    out.append(("dot-r", "fill", dot(*pt(DOT_R, 90 - end), DOT)))
    out.append(("side-l", "line", arc(SIDE_R, SIDE[0], SIDE[1])))
    out.append(("side-r", "line", arc(SIDE_R, 180 - SIDE[0], 180 - SIDE[1])))
    for i, d in enumerate(letters):
        out.append((f"l{i}", "letter", d))
    return out


def bbox_of(d):
    import re
    nums = [float(v) for v in re.findall(r"-?\d+\.?\d*", d)]
    return nums[0::2], nums[1::2]


def svg(kind, colour, motion):
    """kind: 'badge', 'frame' or 'lettering'."""
    items = parts()
    if kind == "frame":
        items = [p for p in items if p[0] in ("rim", "hair", "star", "flank-l", "flank-r")]
    if kind == "lettering":
        items = [p for p in items if p[0] in ("star", "dot-l", "dot-r") or p[1] == "letter"]
        xs, ys = [], []
        for _, _, d in items:
            x, y = bbox_of(d)
            xs += x
            ys += y
        m = 14
        x0, y0 = min(xs) - m, min(ys) - m
        vb = f"{f(x0)} {f(y0)} {f(max(xs) + m - x0)} {f(max(ys) + m - y0)}"
    else:
        vb = "0 0 1000 1000"

    css, body, letter_i = [], [], 0
    line = f'fill="none" stroke="{colour}" stroke-width="{f(LINE)}" stroke-linecap="round"'

    def draw(cls, delay, dur):
        css.append(f".{cls}{{stroke-dasharray:1;animation:draw {dur}s cubic-bezier(.55,0,.25,1) {delay}s both}}")

    for name, k, d in items:
        if k == "ring":
            r, w = (RIM_OUT + RIM_IN) / 2, RIM_OUT - RIM_IN
            if motion:
                for side, a1 in (("rim-l", 270), ("rim-r", -90)):
                    body.append(f'<path class="{side}" pathLength="1" d="{arc(r, a1, 90)}" fill="none" stroke="{colour}" stroke-width="{f(w)}"/>')
                    draw(side, 0.1, 1.5)
            else:
                body.append(f'<circle cx="500" cy="500" r="{f(r)}" fill="none" stroke="{colour}" stroke-width="{f(w)}"/>')
        elif k == "hairline":
            if motion:
                for side, a1 in (("hair-l", 270), ("hair-r", -90)):
                    body.append(f'<path class="{side}" pathLength="1" d="{arc(HAIR_R, a1, 90)}" fill="none" stroke="{colour}" stroke-width="{f(HAIR_W)}"/>')
                    draw(side, 0.35, 1.5)
            else:
                body.append(f'<circle cx="500" cy="500" r="{f(HAIR_R)}" fill="none" stroke="{colour}" stroke-width="{f(HAIR_W)}"/>')
        elif name == "star":
            sx, sy = pt(STAR_R, 90)
            if motion:
                start = 0.2 if kind == "lettering" else 1.3
                css.append(
                    f".star{{transform-box:view-box;transform-origin:{f(sx)}px {f(sy)}px;"
                    f"animation:star .8s cubic-bezier(.3,1.3,.5,1) {start}s both}}"
                    f".glint{{transform-box:view-box;transform-origin:{f(sx)}px {f(sy)}px;"
                    f"animation:glint 9s ease-in-out {start + 3}s infinite}}"
                )
                body.append(f'<g class="star"><g class="glint"><path fill="{colour}" d="{d}"/></g></g>')
            else:
                body.append(f'<path fill="{colour}" d="{d}"/>')
        elif k == "line":
            if motion:
                delay = 1.6 if name.startswith("flank") else 2.9
                body.append(f'<path class="{name}" pathLength="1" d="{d}" {line}/>')
                draw(name, delay, 0.9)
            else:
                body.append(f'<path d="{d}" {line}/>')
        elif name.startswith("dot"):
            if motion:
                cx, cy = (pt(DOT_R, 90 + lettering()[1] / 2 + 6.5) if name == "dot-l" else pt(DOT_R, 90 - lettering()[1] / 2 - 6.5))
                start = 1.5 if kind == "lettering" else 2.7
                css.append(f".{name}{{transform-box:view-box;transform-origin:{f(cx)}px {f(cy)}px;animation:pop .5s ease-out {start}s both}}")
                body.append(f'<path class="{name}" fill="{colour}" d="{d}"/>')
            else:
                body.append(f'<path fill="{colour}" d="{d}"/>')
        else:  # a letter
            if motion:
                xs, ys = bbox_of(d)
                mx, my = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
                dist = math.hypot(mx - C, my - C)
                ux, uy = (mx - C) / dist, (my - C) / dist  # outward from the centre
                start = (0.5 if kind == "lettering" else 1.7) + 0.055 * letter_i
                css.append(
                    f".{name}{{animation:rise .7s cubic-bezier(.2,.7,.2,1) {start:.3f}s both;"
                    f"--dx:{f(-ux * 14)}px;--dy:{f(-uy * 14)}px}}"
                )
                letter_i += 1
                body.append(f'<path class="{name}" fill="{colour}" d="{d}"/>')
            else:
                body.append(f'<path fill="{colour}" d="{d}"/>')

    names = {"badge": "badge", "frame": "badge frame", "lettering": "lettering"}
    title = f"Sentinels of Peace {names[kind]}" + (", in motion" if motion else "")
    w, h = vb.split()[2:]
    keyframes = (
        "@keyframes draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}"
        "@keyframes star{from{opacity:0;transform:rotate(-90deg) scale(.2)}to{opacity:1;transform:none}}"
        "@keyframes glint{0%,84%,100%{transform:none}90%{transform:scale(1.18) rotate(8deg)}}"
        "@keyframes pop{from{opacity:0;transform:scale(0)}to{opacity:1;transform:none}}"
        "@keyframes rise{from{opacity:0;transform:translate(var(--dx),var(--dy))}to{opacity:1;transform:none}}"
    )
    style = (
        f"<style>{keyframes}{''.join(css)}@media (prefers-reduced-motion: reduce){{*{{animation:none!important}}}}</style>"
        if motion
        else ""
    )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}">'
        f"<title>{title}</title>{style}{''.join(body)}</svg>\n"
    )


if __name__ == "__main__":
    sets = {"badge": ("white", "navy"), "frame": ("white", "navy"), "lettering": ("gold", "white", "navy")}
    colours = {"white": WHITE, "navy": NAVY, "gold": GOLD}
    for kind, names in sets.items():
        stem = {"badge": "badge", "frame": "badge-frame", "lettering": "lettering"}[kind]
        for n in names:
            write(f"sentinels-of-peace_{stem}_{n}.svg", svg(kind, colours[n], False), STILL, STILL_PACKAGE)
            write(f"sentinels-of-peace_motion-{stem}_{n}.svg", svg(kind, colours[n], True))
    print("sentinels badge, frame and lettering written")
