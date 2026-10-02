"""Shared helpers for the brand motion generators.

The motion files are built from the supplied artwork in public/brand, so they stay true to it.
Every animated file obeys two rules:
  - its resting pose is the original artwork, so a paused or reduced-motion render is the still mark;
  - under prefers-reduced-motion the motion stops (CSS animations off, SMIL layers swapped for the still art).
"""

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ELEMENTS = ROOT / "public/brand/elements"
OUT = ROOT / "public/brand/motion"
PACKAGE = ROOT / "brand identity assets/House of Evulv Identity/06 Motion"

COLOURWAYS = ["gold-and-silver", "gold-and-ivory", "gold", "white", "bronze", "espresso", "black"]

REDUCED = "@media (prefers-reduced-motion: reduce){*{animation:none!important}}"


def read_element(name: str, colourway: str):
    """Return (viewBox, [(fill, [subpath d, ...]), ...]) for a supplied element file."""
    src = (ELEMENTS / f"house-of-evulv_element-{name}_{colourway}.svg").read_text()
    vb = re.search(r'viewBox="([^"]+)"', src).group(1)
    layers = []
    for fill, d in re.findall(r'<path fill="(#[0-9A-Fa-f]{6})" fill-rule="evenodd" d="([^"]+)"', src):
        layers.append((fill, [p for p in re.split(r"(?=M)", d) if p.strip()]))
    return vb, layers


def path(fill: str, subpaths, cls: str = "") -> str:
    c = f' class="{cls}"' if cls else ""
    return f'<path{c} fill="{fill}" fill-rule="evenodd" d="{"".join(subpaths)}"/>'


def wrap(viewbox: str, title: str, style: str, body: str) -> str:
    w, h = viewbox.split()[2:]
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" width="{w}" height="{h}">'
        f"<title>{title}</title><style>{style}{REDUCED}</style>{body}</svg>\n"
    )


def origin(cls: str, x: float, y: float) -> str:
    return f".{cls}{{transform-box:view-box;transform-origin:{x:.1f}px {y:.1f}px}}"


def write(filename: str, svg: str, out: Path = OUT, package: Path = PACKAGE):
    out.mkdir(parents=True, exist_ok=True)
    (out / filename).write_text(svg)
    package.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(out / filename, package / filename)
