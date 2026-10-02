// Render an animated SVG at chosen times, for checking motion by eye.
// node scripts/brand-motion/frames.mjs <file.svg> <outPrefix> <bg> <t1,t2,...> [width]
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
const [, , file, out, bg = "#2a1d17", times = "0,1,2,3", width = "400", reduced] = process.argv;
const svg = readFileSync(file, "utf8");
const vb = svg.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
const w = +width, h = Math.round((w * vb[3]) / vb[2]);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: reduced ? "reduce" : "no-preference" });
await p.setContent(`<html><body style="margin:0;background:${bg}">${svg.replace("<svg ", `<svg style="display:block;width:${w}px;height:${h}px" `)}</body></html>`);
for (const t of times.split(",").map(Number)) {
  await p.evaluate((t) => {
    const s = document.querySelector("svg");
    s.pauseAnimations?.(); s.setCurrentTime?.(t);
    for (const a of document.getAnimations()) { a.pause(); a.currentTime = t * 1000; }
  }, t);
  await p.waitForTimeout(50);
  await p.screenshot({ path: `${out}-${String(t).padStart(5, "0")}.png` });
}
await b.close();
