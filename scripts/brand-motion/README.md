# Brand motion

Generators for the animated brand files in `public/brand/motion` (copied to `brand identity assets/House of Evulv Identity/06 Motion`) and the new Sentinels of Peace marks. Every file is built from the supplied artwork, rests on it, and stays still under `prefers-reduced-motion`.

| Script | Builds |
| --- | --- |
| `build_elements.py` | Lotus and water, dove: all seven colourways |
| `build_tree.py` | Tree of life with a turning DNA helix: all seven colourways |
| `build_sentinels.py` | Sentinels badge, badge frame and lettering, still (`public/brand/sentinels`) and animated |
| `knights.py` | Clean knight cut-outs from the seal (PNG for the brand package, WebP for the site) |
| `build_knights_motion.py` | Knights catching the light; the pair rising (run `knights.py` first) |
| `build_site_variants.py` | The website's builds: `_still` (tree, lotus, dove at rest) and `_once` (knights, badge frame: each loop plays once), so no loop on the site runs past five seconds |
| `frames.mjs` | Renders an animated SVG at chosen moments, for checking motion by eye |

```bash
pip install fonttools numpy opencv-python-headless pillow
python3 scripts/brand-motion/build_elements.py
python3 scripts/brand-motion/build_tree.py
python3 scripts/brand-motion/build_sentinels.py
python3 scripts/brand-motion/knights.py && python3 scripts/brand-motion/build_knights_motion.py
python3 scripts/brand-motion/build_site_variants.py
node scripts/brand-motion/frames.mjs public/brand/motion/house-of-evulv_motion-dove_gold.svg /tmp/dove "#1E1712" 0,1,2,3
```

The lettering uses Libre Bodoni Bold, included in `fonts/` under the SIL Open Font License (`fonts/OFL.txt`).
