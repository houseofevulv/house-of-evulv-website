"""Animated tree of life: the DNA trunk turns and its pattern climbs into the figure.

Run: python3 scripts/brand-motion/build_tree.py
Writes public/brand/motion/house-of-evulv_motion-tree-of-life_{colourway}.svg (and a copy in the brand package).

The figure, arms and leaves are the supplied artwork, untouched. Below y=1000 the helix is generated: two strands
with the drawing's measurements (33 wide, swinging 140 either side of centre, a crossing every 300), rungs between
them, pointed tips at the foot and, at each crossing, a gap in whichever strand is behind. As the helix turns, the
strand in front alternates from one crossing to the next, which is what makes it read as a real twist. At the top
the strands start 12 either side of the centre line, so together they exactly fill the base of the torso and the
helix grows out of the figure with no visible join.

The animation is SMIL path morphing (it runs in <img> and CSS backgrounds in every current browser). Under
prefers-reduced-motion the generated helix is hidden and the original drawing is shown.
"""

import math
import re

from common import COLOURWAYS, ELEMENTS, wrap, write

P = 600.0  # one full turn of the helix, in drawing units (crossings every P/2)
Y0 = 1100.0  # a crossing sits here at rest, as in the drawing
TOP, FOOT = 1000.0, 1594.0
R_FULL, SPLIT = 140.0, 12.0
WIDTH, DEPTH = 33.0, 0.10  # strand width; how much wider the front strand is than the back one
GAP = 10.0  # space between a strand and whatever passes behind or between it
RUNG = 19.0  # rung thickness
LOOP = 14.0  # seconds per turn
FRAMES = 30
STEP = 12.0  # sampling step along the strands


def smooth(a: float, b: float, y: float) -> float:
    t = min(1.0, max(0.0, (y - a) / (b - a)))
    return t * t * (3 - 2 * t)


def centre(y):
    return 486 - 24 * smooth(TOP, 1220, y)


def swing(y):
    return R_FULL * smooth(TOP, 1170, y)


def split(y):
    return SPLIT * (1 - smooth(TOP, 1080, y))


def theta(y, phase):
    return 2 * math.pi * (y - Y0) / P + phase


def offset(y, phase):
    """Signed distance of strand A from the centre line (strand B is the mirror image)."""
    return -(split(y) + swing(y) * math.sin(theta(y, phase)))


def width(y, phase, strand):
    depth = math.cos(theta(y, phase)) * swing(y) / R_FULL * (1 if strand == "A" else -1)
    return WIDTH * (1 + DEPTH * depth) * (1 - smooth(1515, FOOT, y))


def x_of(y, phase, strand):
    o = offset(y, phase)
    return centre(y) + (o if strand == "A" else -o)


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def strand_outline(phase, strand):
    ys = [TOP - 1 + i * STEP for i in range(int((FOOT + 2 - TOP) / STEP) + 1)]
    left, right = [], []
    for y in ys:
        x = x_of(y, phase, strand)
        dx = (x_of(y + 0.5, phase, strand) - x_of(y - 0.5, phase, strand)) / 1.0
        n = math.hypot(1, dx)
        nx, ny = 1 / n, -dx / n  # unit normal to the centre line
        h = width(y, phase, strand) / 2
        left.append((x - h * nx, y - h * ny))
        right.append((x + h * nx, y + h * ny))
    pts = left + right[::-1]
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"


def rungs(phase):
    """Rungs are fixed to the strands, so they ride up with the pattern and shorten as the helix turns them."""
    shift = phase / (2 * math.pi) * P
    out = []
    for n in range(-2, 26):
        u = Y0 + 50 * n
        if (u - Y0) % 300 == 0:
            continue  # no rung at a crossing
        y = u - shift
        xa, xb = x_of(y, phase, "A"), x_of(y, phase, "B")
        lo, hi = sorted((xa, xb))
        wa = max(width(y, phase, "A"), width(y, phase, "B")) / 2
        inner = (hi - lo) / 2 - wa - GAP
        fade = smooth(1105, 1165, y) * (1 - smooth(1515, 1550, y))
        half = max(0.0, max(0.0, inner) * fade - 4)  # the 4 keeps a rung from appearing as a speck
        c = (lo + hi) / 2
        # ends follow the strands' slope, as in the drawing
        k = 0.5 * (x_of(y + 1, phase, "A") - x_of(y - 1, phase, "A")) * (1 if xa > xb else -1)
        thick = RUNG * min(1.0, half / 14)  # a rung only reaches full thickness once it has some length
        t, b = y - thick / 2, y + thick / 2
        s = max(-half, min(half, k * thick / 2))
        out.append(
            f"M{f(c - half + s)} {f(t)}L{f(c + half - s)} {f(t)}L{f(c + half + s)} {f(b)}L{f(c - half - s)} {f(b)}Z"
            if half > 0
            else f"M{f(c)} {f(y)}L{f(c)} {f(y)}L{f(c)} {f(y)}L{f(c)} {f(y)}Z"
        )
    return "".join(out)


def gaps(phase, behind):
    """At each crossing, a band along the front strand, used to cut the strand behind it."""
    shift = phase / (2 * math.pi) * P
    out = []
    for n in range(-2, 6):
        guess = Y0 + 300 * n - shift
        front = "A" if n % 2 == 0 else "B"  # at rest strand A is in front at the top crossing
        y = guess
        # the crossing is where the strands meet; near the top the split moves it slightly, so solve for it
        for _ in range(30):
            g = offset(y, phase)
            dg = (offset(y + 0.5, phase) - offset(y - 0.5, phase)) or 1e-6
            y -= g / dg
            if abs(g) < 1e-3:
                break
        if abs(y - guess) > 60:
            y = guess
        # in the neck under the torso the strands simply merge, as the torso flows into them in the drawing
        strength = smooth(1085, 1135, y) * (1 - smooth(1560, FOOT, y))
        if front == behind or strength == 0:
            out.append(f"M0 {f(y)}L0 {f(y)}L0 {f(y)}L0 {f(y)}Z")
            continue
        x = x_of(y, phase, front)
        dx = x_of(y + 0.5, phase, front) - x_of(y - 0.5, phase, front)
        n_ = math.hypot(1, dx)
        tx, ty = dx / n_, 1 / n_
        nx, ny = 1 / n_, -dx / n_
        h = (width(y, phase, front) / 2 + GAP) * strength
        L = 46
        pts = [(x - tx * L - nx * h, y - ty * L - ny * h), (x + tx * L - nx * h, y + ty * L - ny * h),
               (x + tx * L + nx * h, y + ty * L + ny * h), (x - tx * L + nx * h, y - ty * L + ny * h)]
        out.append("M" + "L".join(f"{f(a)} {f(b)}" for a, b in pts) + "Z")
    return "".join(out)


def animated(fill, cls, frames, extra=""):
    values = ";".join(frames)
    return (
        f'<path fill="{fill}"{extra} d="{frames[0]}">'
        f'<animate attributeName="d" dur="{LOOP}s" repeatCount="indefinite" calcMode="linear" values="{values}"/>'
        f"</path>"
    )


def tree(colourway: str) -> str:
    src = (ELEMENTS / f"house-of-evulv_element-tree-of-life_{colourway}.svg").read_text()
    vb = re.search(r'viewBox="([^"]+)"', src).group(1)
    layers = re.findall(r'<path fill="(#[0-9A-Fa-f]{6})" fill-rule="evenodd" d="([^"]+)"', src)
    (main, md), (second, sd) = layers
    m = [p for p in re.split(r"(?=M)", md) if p.strip()]
    assert len(m) == 30, colourway
    # main subpaths: 0-1 side branches, 2-7 rungs, 8-9 lower strand pieces, 10 arms, torso and the long strand,
    # 11 head, 12-29 gold leaves. Everything from the helix down is regenerated.
    keep = [m[i] for i in (0, 1, *range(11, 30))]
    still = f'<path fill="{main}" fill-rule="evenodd" d="{md}"/><path fill="{second}" fill-rule="evenodd" d="{sd}"/>'

    # FRAMES + 1 keyframes: the last is one full turn on, the same picture as the first, so the loop is seamless
    # while the rungs and crossings keep moving upwards instead of sliding back to their first positions
    phases = [2 * math.pi * k / FRAMES for k in range(FRAMES + 1)]
    sa = [strand_outline(p, "A") for p in phases]
    sb = [strand_outline(p, "B") for p in phases]
    rg = [rungs(p) for p in phases]
    ga = [gaps(p, "A") for p in phases]
    gb = [gaps(p, "B") for p in phases]

    defs = (
        "<defs>"
        f'<clipPath id="hoe-tree-top"><rect x="0" y="0" width="1000" height="{f(TOP + 1)}"/></clipPath>'
        f'<clipPath id="hoe-tree-foot"><rect x="0" y="{f(TOP - 1)}" width="1000" height="{f(FOOT - TOP + 2)}"/></clipPath>'
        '<mask id="hoe-tree-ma" maskUnits="userSpaceOnUse" x="0" y="900" width="1000" height="800">'
        f'<rect x="0" y="900" width="1000" height="800" fill="#fff"/>{animated("#000", "", ga)}</mask>'
        '<mask id="hoe-tree-mb" maskUnits="userSpaceOnUse" x="0" y="900" width="1000" height="800">'
        f'<rect x="0" y="900" width="1000" height="800" fill="#fff"/>{animated("#000", "", gb)}</mask>'
        "</defs>"
    )
    moving = (
        '<g class="moving">'
        f'<path fill="{main}" fill-rule="evenodd" d="{"".join(keep)}"/>'
        f'<path fill="{main}" fill-rule="evenodd" clip-path="url(#hoe-tree-top)" d="{m[10]}"/>'
        f'<path fill="{second}" fill-rule="evenodd" d="{sd}"/>'
        '<g clip-path="url(#hoe-tree-foot)">'
        + animated(main, "", rg)
        + f'<g mask="url(#hoe-tree-ma)">{animated(main, "", sa)}</g>'
        + f'<g mask="url(#hoe-tree-mb)">{animated(main, "", sb)}</g>'
        + "</g></g>"
    )
    style = ".still{display:none}@media (prefers-reduced-motion: reduce){.moving{display:none}.still{display:inline}}"
    return wrap(vb, "House of Evulv tree of life, in motion", style, defs + moving + f'<g class="still">{still}</g>')


if __name__ == "__main__":
    for c in COLOURWAYS:
        write(f"house-of-evulv_motion-tree-of-life_{c}.svg", tree(c))
    print("tree of life:", len(COLOURWAYS), "colourways")
