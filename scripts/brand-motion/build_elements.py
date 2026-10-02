"""Animated lotus and dove, in every colourway of the supplied elements.

Run: python3 scripts/brand-motion/build_elements.py
Writes public/brand/motion/house-of-evulv_motion-{lotus,dove}_{colourway}.svg (and a copy in the brand package).

Motion is slow and small on purpose: every movement is a sine-like swing (ease-in-out, alternate) around the
original pose, and no two loops share a period, so the pattern never visibly repeats.
"""

import re

from common import COLOURWAYS, ROOT, origin, path, read_element, wrap, write


def swing(cls: str, prop_from: str, prop_to: str, seconds: float, centred: bool = True, lag: float = 0.0) -> str:
    """An alternate ease-in-out loop. Centred loops start mid-swing, i.e. at the original pose."""
    delay = -(seconds / 2 if centred else 0) + lag
    return (
        f"@keyframes {cls}{{from{{transform:{prop_from}}}to{{transform:{prop_to}}}}}"
        f".{cls}{{animation:{cls} {seconds}s ease-in-out {delay:.2f}s infinite alternate both}}"
    )


# ---------- Lotus and water: the flower floats and leans in a breeze; the water lines ripple out of step ----------

def lotus(colourway: str) -> str:
    vb, layers = read_element("lotus-and-water", colourway)
    (main, m), (second, s) = layers
    assert len(m) == 11 and len(s) == 2, colourway
    # main subpaths: 0 top petal, 1-2 middle side petals, 3-4 outer side petals, 5 centre, 6-7 lower petals,
    # 8 the cup at the waterline, 9-10 the two water lines. second: the two inner petals.
    style = (
        swing("bob", "translateY(0)", "translateY(-7px)", 4.2, centred=False)
        + swing("sway", "rotate(-0.8deg)", "rotate(0.8deg)", 6.0)
        + origin("sway", 500, 745)
        # the outer petals are the lightest part of the flower, so they answer the breeze a beat late
        + swing("pl", "rotate(-1.4deg)", "rotate(1.1deg)", 6.0, lag=0.6)
        + origin("pl", 262, 478)
        + swing("pr", "rotate(-1.1deg)", "rotate(1.4deg)", 6.0, lag=0.6)
        + origin("pr", 738, 482)
        + swing("w1", "translateX(-6px)", "translateX(6px)", 7.0)
        + swing("w2", "translateX(5px)", "translateX(-5px)", 8.6)
    )
    flower = (
        path(main, [m[i] for i in (0, 1, 2, 5, 6, 7, 8)])
        + f'<g class="pl">{path(main, [m[3]])}</g>'
        + f'<g class="pr">{path(main, [m[4]])}</g>'
        + path(second, s)
    )
    body = (
        f'<g class="bob"><g class="sway">{flower}</g></g>'
        + f'<g class="w1">{path(main, [m[9]])}</g>'
        + f'<g class="w2">{path(main, [m[10]])}</g>'
    )
    return wrap(vb, "House of Evulv lotus and water, in motion", style, body)


# ---------- Dove: a slow wingbeat while gliding; the olive branch and its leaves move in the wind ----------

# The wing is cut from the body along the crease the artwork already draws between them, so the seam is invisible.
WING = "M430 -10L482 444L325 660L318 664L-10 664L-10 -10Z"
BODY = "M430 -10L1010 -10L1010 1010L-10 1010L-10 664L318 664L325 660L482 444Z"
# A wingbeat seen from the side is foreshortening across the wing root, so the wing scales perpendicular to the
# crease (points on the crease stay put and no seam can open) instead of rotating about the shoulder.
CREASE = 126.0  # direction of the crease, in degrees


def dove(colourway: str) -> str:
    vb, layers = read_element("dove", colourway)
    (branch, b), (bird, d) = layers
    assert len(b) == 5 and len(d) == 8, colourway
    # branch subpaths: 0 stem at the beak, 1 stem with two leaves, 2 top leaf, 3 right leaf, 4 lower leaf
    style = (
        # the bird rises on the downstroke and settles as the wing lifts: one beat every 7 seconds
        swing("glide", "translateY(0)", "translateY(-10px)", 3.5, centred=False)
        + swing("wing", f"rotate({CREASE}deg) scaleY(1) rotate({-CREASE}deg)",
                f"rotate({CREASE}deg) scaleY(0.93) rotate({-CREASE}deg)", 3.5, centred=False)
        + origin("wing", 482, 446)
        + swing("pitch", "rotate(-0.9deg)", "rotate(0.9deg)", 9.0)
        + origin("pitch", 470, 560)
        + swing("branch", "rotate(-2.2deg)", "rotate(2.6deg)", 2.9)
        + origin("branch", 686, 486)
        + swing("l2", "rotate(-6deg)", "rotate(5deg)", 2.2)
        + origin("l2", 899, 306)
        + swing("l3", "rotate(5deg)", "rotate(-6deg)", 2.6)
        + origin("l3", 906, 392)
        + swing("l4", "rotate(-5deg)", "rotate(6deg)", 2.4)
        + origin("l4", 834, 438)
    )
    defs = (
        f'<defs><clipPath id="hoe-dove-wing"><path d="{WING}"/></clipPath>'
        f'<clipPath id="hoe-dove-body"><path d="{BODY}"/></clipPath></defs>'
    )
    olive = (
        f'<g class="branch">{path(branch, b[:2])}'
        f'<g class="l2">{path(branch, [b[2]])}</g>'
        f'<g class="l3">{path(branch, [b[3]])}</g>'
        f'<g class="l4">{path(branch, [b[4]])}</g></g>'
    )
    bird_path = path(bird, d)
    body = (
        defs
        + '<g class="glide"><g class="pitch">'
        + olive
        + f'<g clip-path="url(#hoe-dove-body)">{bird_path}</g>'
        + f'<g class="wing"><g clip-path="url(#hoe-dove-wing)">{bird_path}</g></g>'
        + "</g></g>"
    )
    return wrap(vb, "House of Evulv dove, in motion", style, body)


def emblem_ring(colourway: str) -> str:
    """The emblem's open ring on its own, for the live emblem (components/LiveEmblem.tsx), which layers the animated
    tree, dove and lotus over it in their places in the emblem."""
    src = (ROOT / f"public/brand/house/house-of-evulv_emblem_{colourway}.svg").read_text()
    main = re.findall(r'<path fill="(#[0-9A-Fa-f]{6})" fill-rule="evenodd" d="([^"]+)"', src)[0]
    sub = [p for p in re.split(r"(?=M)", main[1]) if p.strip()]
    # subpaths 0 and 2 are the two arcs, 1 is the piece below the dove's tail
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1059" width="1000" height="1059">'
        f"<title>House of Evulv emblem ring</title>{path(main[0], [sub[0], sub[1], sub[2]])}</svg>\n"
    )


if __name__ == "__main__":
    for c in COLOURWAYS:
        write(f"house-of-evulv_emblem-ring_{c}.svg", emblem_ring(c))
    for c in COLOURWAYS:
        write(f"house-of-evulv_motion-lotus_{c}.svg", lotus(c))
        write(f"house-of-evulv_motion-dove_{c}.svg", dove(c))
    print("lotus and dove:", len(COLOURWAYS), "colourways each")
