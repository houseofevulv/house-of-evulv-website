"""Clean cut-outs of the two Sentinels knights, from the seal artwork.

Run: python3 scripts/brand-motion/knights.py
The first cut-outs (sentinels-of-peace_knight-*_original.png) lost the knights' feet to a straight crop, had holes
where dark armour was mistaken for background, and kept a slice of the seal's dark field behind the helmet.
This rebuilds each mask in the seal's own coordinates:
  - the old cut-out's mask is the starting point;
  - everything behind a traced back edge (helmet, collar, cloak) is removed;
  - the legs, boots and the plinth each knight stands on are added from the seal.
Outputs, beside the originals: sentinels-of-peace_knight-{left,right}_clean.png and the pair, plus web WebP files.
"""

from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
PNG = ROOT / "brand identity assets/House of Evulv Identity/02 Sentinels of Peace/PNG"
WEB = ROOT / "public/brand/sentinels"

SEAL = cv2.imread(str(PNG / "sentinels-of-peace_seal_original.png"), cv2.IMREAD_UNCHANGED)
H, W = SEAL.shape[:2]

# Where each original cut-out sits in the seal (found by template matching, score 0.998)
ORIGIN = {"left": (243, 660), "right": (1846, 662)}

# Traced in seal pixels. "back": the knight's back edge from above the helmet to the cloak's hem; everything on the
# far side of it is the seal's field. "add": legs, boots and plinth, which the first cut-out lost.
TRACE = {
    "left": {
        "back": [(700, 600), (652, 872), (630, 900), (616, 950), (604, 985), (590, 1030), (563, 1068), (530, 1110),
                 (505, 1150), (480, 1200), (452, 1260), (430, 1330), (410, 1420), (388, 1520), (356, 1630),
                 (312, 1730), (262, 1815), (230, 1880), (200, 2300)],
        "side": -1,  # the field is on the left of the back edge
        "add": [
            [(543, 1965), (534, 2044), (521, 2094), (506, 2137), (497, 2156), (676, 2156), (676, 2140), (650, 2122),
             (615, 2104), (600, 2104), (630, 2070), (585, 1990), (560, 1960)],
            [(744, 1982), (738, 2040), (734, 2075), (712, 2110), (700, 2152), (905, 2156), (905, 2140), (870, 2126),
             (836, 2104), (812, 2072), (809, 2020), (806, 1985)],
            [(484, 2151), (950, 2150), (956, 2160), (942, 2217), (484, 2217)],
        ],
        # the seal's field showing between the hem, the rear leg and the spear
        "remove": [
            [(686, 2000), (712, 1958), (746, 1978), (740, 2040), (736, 2075), (714, 2110), (702, 2150), (678, 2150),
             (678, 2138), (655, 2115), (652, 2085)],
            [(811, 1955), (851, 1955), (851, 2112), (838, 2106), (812, 2074)],
            [(806, 1855), (744, 1970), (712, 1970), (770, 1855)],  # straightens the flap's ragged edge
        ],
    },
    "right": {
        "back": [(2080, 600), (2111, 866), (2147, 891), (2170, 938), (2179, 984), (2186, 996), (2205, 1050),
                 (2222, 1095), (2250, 1135), (2272, 1172), (2285, 1215), (2300, 1290), (2318, 1380), (2340, 1480),
                 (2368, 1580), (2405, 1680), (2448, 1770), (2502, 1852), (2540, 1900), (2600, 2300)],
        "side": 1,  # the field is on the right of the back edge
        "add": [
            [(1881, 2137), (1925, 2119), (1962, 2097), (1987, 2062), (2006, 2012), (2016, 1940), (2089, 1930),
             (2125, 2010), (2082, 2100), (2080, 2156), (1878, 2156)],
            [(2205, 1995), (2245, 1985), (2259, 2044), (2273, 2112), (2287, 2130), (2291, 2156), (2104, 2156),
             (2106, 2140), (2150, 2108), (2173, 2104), (2190, 2075), (2200, 2030)],
            [(1830, 2151), (2288, 2151), (2288, 2207), (1836, 2207), (1828, 2160)],
        ],
        # the seal's field showing below the point of the hem, between the two boots
        "remove": [
            [(2152, 2078), (2203, 1999), (2201, 2030), (2190, 2075), (2173, 2102), (2150, 2106), (2106, 2138),
             (2083, 2150), (2083, 2100)],
        ],
    },
}


def side_mask(points, side):
    """1 on the knight's side of a traced edge, 0 on the field's side (anti-aliased)."""
    poly = list(points)
    if side < 0:  # close the region to the left of the edge
        poly += [(-10, points[-1][1]), (-10, points[0][1])]
    else:
        poly += [(W + 10, points[-1][1]), (W + 10, points[0][1])]
    field = np.zeros((H * 4, W * 4), np.uint8)
    cv2.fillPoly(field, [np.array(poly, np.int32) * 4], 255, lineType=cv2.LINE_AA)
    field = cv2.resize(field, (W, H), interpolation=cv2.INTER_AREA)
    return 255 - field


def fill(polys):
    m = np.zeros((H * 4, W * 4), np.uint8)
    for p in polys:
        cv2.fillPoly(m, [np.array(p, np.int32) * 4], 255, lineType=cv2.LINE_AA)
    return cv2.resize(m, (W, H), interpolation=cv2.INTER_AREA)


def knight_mask(side):
    old = cv2.imread(str(PNG / f"sentinels-of-peace_knight-{side}_original.png"), cv2.IMREAD_UNCHANGED)
    ox, oy = ORIGIN[side]
    m = np.zeros((H, W), np.uint8)
    m[oy:oy + old.shape[0], ox:ox + old.shape[1]] = old[:, :, 3]
    t = TRACE[side]
    m = np.minimum(m, side_mask(t["back"], t["side"]))
    m = np.maximum(m, fill(t["add"]))
    if t.get("remove"):
        m = np.minimum(m, 255 - fill(t["remove"]))
    return m


def cut(side):
    m = knight_mask(side)
    out = SEAL.copy()
    out[:, :, 3] = np.minimum(SEAL[:, :, 3], m)
    ys, xs = np.where(out[:, :, 3] > 8)
    return out[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def webp(img, path, height):
    from PIL import Image
    w = round(img.shape[1] * height / img.shape[0])
    small = cv2.resize(img, (w, height), interpolation=cv2.INTER_AREA)
    Image.fromarray(cv2.cvtColor(small, cv2.COLOR_BGRA2RGBA)).save(path, "WEBP", quality=88, method=6)
    return w, height


if __name__ == "__main__":
    left, right = cut("left"), cut("right")
    # the pair: facing inward, standing on one ground line, as far apart as in the first pair file
    gap = 396
    h = max(left.shape[0], right.shape[0])
    pair = np.zeros((h, left.shape[1] + gap + right.shape[1], 4), np.uint8)
    pair[h - left.shape[0]:, :left.shape[1]] = left
    pair[h - right.shape[0]:, left.shape[1] + gap:] = right
    for name, img in (("knight-left", left), ("knight-right", right), ("knights-pair", pair)):
        cv2.imwrite(str(PNG / f"sentinels-of-peace_{name}_clean.png"), img)
        size = webp(img, WEB / f"sentinels-of-peace_{name}-clean.webp", 900)
        print(name, img.shape[1], "x", img.shape[0], "-> web", size)
